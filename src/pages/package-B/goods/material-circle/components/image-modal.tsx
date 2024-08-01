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
import {msg, _} from 'wmkit';
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
    console.log('==========================>');
    console.log(main.showCheckbox);
    !main?.showCheckbox && this._createImage();
  }

  /**
    营销素材选择保存图片弹窗
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      main.imageModal && (
        <View className="imageModal">
          <View className="container">
            <View className="header">
              <Text className="title">文案已复制，分享时请粘贴</Text>
              <Image
                src={specCloseIcon}
                className="close"
                onClick={(e) => {
                  // action.commonChange('main.imageModal', false);
                  action.commonChange([
                    {
                      paths: 'main.imageModal',
                      value: false,
                    },
                    {
                      paths: 'main.showCheckbox',
                      value: false,
                    },
                  ]);
                }}
              />
            </View>

            <View className="images">
              {main.imageList.map((v, index) => {
                return (
                  <View style={{position: 'relative'}} key={index}>
                    <Canvas
                      canvasId={v.key || `goods${index}`}
                      key={v.key || `goods${index}`}
                      className={(index + 1) % 3 == 0 ? 'image image-last' : 'image'}
                    ></Canvas>
                    {this._renderVCheckbx(main.showCheckbox, v, index)}
                  </View>
                );
              })}
            </View>
            <View className="button" onClick={() => this._save(main.matterType)}>
              <Text className="btnText">保存</Text>
            </View>
          </View>
        </View>
      )
    );
  }

  _renderVCheckbx = (showCheckbox, v, index) => {
    return showCheckbox ? (
      <WMCheckbox
        style={{position: 'absolute', top: 0, right: 0}}
        checked={v.checked}
        onClick={() => this._toggleChecked(index)}
      />
    ) : (
      <View />
    );
  };

  _createImage = () => {
    let {
      actions: {action},
      main,
    } = this.props;

    main.imageList.map((v, index) => {
      let ctx = Taro.createCanvasContext(v.key || `goods${index}`, this.$scope);
      ctx.drawImage(v.imgSrcTemp, 0, 0, 0.28 * this.state.windowWidth, 0.28 * this.state.windowWidth);
      ctx.draw(false, () => {
        if (main?.imageModal && index === main.imageList.length - 1) {
          action.commonChange('main.showCheckbox', true);
        }
      });
    });
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
          // let canvasId = `${canvasString[type]}${index}`;
          const canvasId = v.key;
          Taro.canvasToTempFilePath(
            {
              x: 0,
              y: 0,
              canvasId: canvasId,
              success: (res) => {
                canvasTemp.push(res.tempFilePath);
                if (canvasTemp.length == main.imageList.filter((item) => item.checked == true).length) {
                  Promise.all(_.savePicToAlbumPromise(canvasTemp))
                    .then((res) => {
                      Taro.hideLoading();
                      Taro.showToast({
                        title: '保存成功',
                      });
                      //更新分享次数
                      api.distributionGoodsMatterController.deleteList({id: main.chooseMatterId});
                      //关闭弹窗
                      action.commonChange('main.imageModal', false);
                    })
                    .catch((err) => {
                      Taro.hideLoading();
                      if (
                        err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' ||
                        err.errMsg === 'saveImageToPhotosAlbum:fail auth deny' ||
                        err.errMsg === 'saveImageToPhotosAlbum:fail authorize no response'
                      ) {
                        Taro.showModal({
                          title: '提示',
                          content: '需要您授权保存相册',
                          showCancel: false,
                          success: (modalSuccess) => {
                            Taro.openSetting({
                              success(settingdata) {
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                  console.log('获取权限成功，给出再次点击图片保存到相册的提示。');
                                } else {
                                  console.log('获取权限失败，给出不给权限就无法正常使用的提示');
                                }
                              },
                            });
                          },
                        });
                      } else {
                        Taro.showToast({
                          title: '保存失败',
                        });
                        //关闭弹窗
                        action.commonChange('main.imageModal', false);
                      }
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
