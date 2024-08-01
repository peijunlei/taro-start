import {View, Button, Text, Image, Canvas} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import WMCheckbox from '@/pages/common/input-checkbox';
import * as T from '../types';
import api from 'api';
import './image-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import specCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
import {_, WMkit} from 'wmkit';
import {getGlobalData} from '@/service/config';
const isIphoneX = getGlobalData('isIphone');
const blank = require('@/assets/image/distribution/white-bg.png');
const friend = require('@/assets/image/goods/find/share-friend.png');
const wechat = require('@/assets/image/goods/find/share-wechat.png');
type IImageModalProps = T.IProps & T.IImageModalProps;

@connect<Partial<IImageModalProps>, T.IImageModalState>(store2Props, actions)
export default class ImageModal extends Component<Partial<IImageModalProps>, T.IImageModalState> {
  constructor(props: IImageModalProps) {
    super(props);
    Taro.getSystemInfo({
      success: (res) => {
        this.state = {
          // 获取窗口宽度，尺寸不写死，根据宽度动态计算
          windowWidth: res.windowWidth,
        };
      },
    });
  }

  componentDidUpdate() {
    let {
      actions: {action},
      main,
    } = this.props;
    this._createImage();
  }

  /**
   营销素材选择保存图片弹窗
   */
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      main.imageModal && (
        <View
          className="imageModal"
          catchMove
          onTouchMove={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            action.commonChange('main.imageModal', false);
          }}
        >
          <View
            className={isIphoneX ? 'container containerX' : 'container'}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <View className="header">
              <Text className="title">文案已复制，分享时请粘贴</Text>
              <Image
                src={specCloseIcon}
                className="close"
                onClick={(e) => {
                  action.commonChange('main.imageModal', false);
                  //显示tabbar
                  Taro.showTabBar();
                }}
              />
            </View>
            <View className="images">
              {main.matterType == 0 &&
                main.imageList.map((v, index) => {
                  return (
                    <View className="canvas-wrap" key={index}>
                      <Canvas
                        style={{display: 'block !important'}}
                        canvasId={`goods${v.key}`}
                        key={`goods${v.key}`}
                        className="image canvasShow"
                      />

                      <WMCheckbox
                        style={{position: 'absolute', top: '4px', right: '4px', width: '17px'}}
                        checked={v.checked}
                        onClick={() => this._toggleChecked(index)}
                      />
                    </View>
                  );
                })}
              {main.matterType == 1 &&
                main.imageList.map((v, index) => {
                  return (
                    <View style={{position: 'relative'}} key={index}>
                      <Canvas
                        disableScroll={true}
                        canvasId={`marketing${v.key}`}
                        key={`marketing${v.key}`}
                        className="image canvasShow"
                        style={{position: 'relative'}}
                      >
                        {/* <Canvas canvasId={`link${index}`} key={`link${index}`} className="image-link"/> */}
                      </Canvas>
                      <WMCheckbox
                        style={{position: 'absolute', top: '4px', left: '10px'}}
                        checked={v.checked}
                        onClick={() => this._toggleChecked(index)}
                      />
                    </View>
                  );
                })}
            </View>
            <View className={isIphoneX ? 'bottom-box bottomX' : 'bottom-box'}>
              {main.buttonType == 0 && (
                <View className="button" onClick={() => this._save(main.matterType)}>
                  <Text className="btnText">保存</Text>
                </View>
              )}
              {main.buttonType == 1 && (
                <View className="buttonImage" onClick={() => this._save(main.matterType)}>
                  <Image className="btnimg" src={friend} />
                  <text className="btntext">分享至朋友圈</text>
                </View>
              )}
              {main.buttonType == 2 && (
                <View open-type="share" className="buttonImage" onClick={(e) => this._shareToFriends(e)}>
                  <Image className="btnimg" src={wechat} />
                  <text className="btntext">分享给微信好友</text>
                </View>
              )}
            </View>
          </View>
        </View>
      )
    );
  }
  // 生成有圆角的矩形
  drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
    ctx.lineTo(width - radius + x, y);
    ctx.arc(width - radius + x, radius + y, radius, (Math.PI * 3) / 2, Math.PI * 2);
    ctx.lineTo(width + x, height + y - radius);
    ctx.arc(width - radius + x, height - radius + y, radius, 0, (Math.PI * 1) / 2);
    ctx.lineTo(radius + x, height + y);
    ctx.arc(radius + x, height - radius + y, radius, (Math.PI * 1) / 2, Math.PI);
    ctx.closePath();
  };
  _createImage = () => {
    let {
      actions: {action},
      main,
    } = this.props;
    if (main.matterType == 0) {
      main.imageList.map((v, index) => {
        let ctx = Taro.createCanvasContext(`goods${v.key}`, this.$scope);
        this.drawRoundedRect(ctx, 0, 0, 0.28 * this.state.windowWidth, 0.28 * this.state.windowWidth, 10);
        ctx.clip();
        ctx.drawImage(v.imgSrcTemp, 0, 0, 0.28 * this.state.windowWidth, 0.28 * this.state.windowWidth);
        ctx.draw();
      });
    }

    if (main.matterType == 1) {
      main.imageList.map((v, index) => {
        let ctx = Taro.createCanvasContext(`marketing${v.key}`, this.$scope);
        //宽高的单位为px而不是rpx
        ctx.drawImage(v.imgSrcTemp, 0, 0, 0.28 * this.state.windowWidth, 0.28 * this.state.windowWidth);
        if (v.linkSrc) {
          //码下面的背景图片
          ctx.drawImage(
            blank,
            0.2 * this.state.windowWidth,
            0.2 * this.state.windowWidth,
            0.08 * this.state.windowWidth,
            0.08 * this.state.windowWidth,
          );
          ctx.drawImage(
            v.linkSrcTemp,
            0.2 * this.state.windowWidth,
            0.2 * this.state.windowWidth,
            0.08 * this.state.windowWidth,
            0.08 * this.state.windowWidth,
          );
        }
        ctx.draw();
      });
    }
  };

  //切换选中状态
  _toggleChecked = (index) => {
    let {
      actions: {action},
      main,
    } = this.props;
    let checked = main.imageList[index].checked;
    //拷贝数组
    let newList = main.imageList.slice(0, main.imageList.length);
    newList.splice(index, 1, Object.assign(main.imageList[index], {checked: !checked}));
    action.commonChange('main.imageList', newList);
  };

  //保存图片至相册
  _save = async (type) => {
    //同步保存图文分享
    await this.props.onSaveShare();
    const canvasString = {
      0: 'goods',
      1: 'marketing',
    };
    let {
      actions: {action},
      main,
    } = this.props;
    if (main.imageList.filter((item) => item.checked == true).length < 1) {
      Taro.showToast({
        title: '请选择分享图片',
        icon: 'none',
      });
    } else {
      let canvasTemp = [];
      main.imageList
        .filter((item) => item.checked == true)
        .map((v) => {
          //获取下标
          // let index = main.imageList.indexOf(v);
          let canvasId = `${canvasString[type]}${v.key}`;
          Taro.canvasToTempFilePath(
            {
              x: 0,
              y: 0,
              canvasId: canvasId,
              success: (res) => {
                canvasTemp.push(res.tempFilePath);
                if (canvasTemp.length == main.imageList.filter((item) => item.checked == true).length) {
                  Promise.all([_.savePicToAlbumPromise(canvasTemp)])
                    .then((res1) => {
                      Taro.showToast({
                        title: '保存成功',
                      });
                      if (WMkit.isLogin()) {
                        //更新分享次数
                        api.distributionGoodsMatterController.deleteList({id: main.chooseMatterId});
                      }
                      //关闭弹窗
                      action.commonChange('main.imageModal', false);
                      action.commonChange('main.shareModalVisible', false);
                    })
                    .catch((err) => {
                      Taro.showToast({
                        title: '保存失败',
                      });
                      //关闭弹窗
                      action.commonChange('main.imageModal', false);
                    });
                }
              },
              fail: (error) => {
                console.log(`保存失败，原因是${error}`);
              },
              complete: () => {
                console.log(`完成`);
              },
            },
            this.$scope,
          );
        });
    }
  };

  _shareToFriends = (e) => {};
}

//create by moon https://github.com/creasy2010/moon
