import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './material-item.less';
import moment from 'dayjs';
import {Const} from 'config';
import { _, getPrivacySetting, msg } from 'wmkit';

const copytext = require('@/assets/image/goods/find/copytext.png');
const defaultImg = require('@/assets/image/common/default-img.png');
const full = require('@/assets/image/goods/find/full.png');
const save = require('@/assets/image/goods/find/save.png');
const friend = require('@/assets/image/goods/find/share-friend.png');
const wechat = require('@/assets/image/goods/find/share-wechat.png');
const storeDefaultImg = require('@/assets/image/goods/dianpujingxuan.png');
//@ts-ignore
const isH5 = __TARO_ENV === 'h5';
type IMaterialItemProps = T.IProps & T.IMaterialItemProps;
@connect<Partial<IMaterialItemProps>, T.IMaterialItemState>(store2Props, actions)
export default class MatericalItem extends Component<Partial<IMaterialItemProps>, T.IMaterialItemState> {
  constructor(props) {
    super(props);
    let key = props.matterItem ? props.matterItem.id : 0;
    this.state = {
      scrollHeigt: 0,
      key: key,
      overflowY: 'auto',
      height: 'auto',
    };
    // this.state = {
    //   scrollHeigth: 0,
    //   key: this.props.matterItem.get('id')
    // };
  }

  componentDidMount() {
    const {key} = this.state;
    !isH5 &&
      setTimeout(() => {
        const query = Taro.createSelectorQuery()
          .in(getCurrentInstance().page)
          .select(`#a${key}`)
          .boundingClientRect()
          .exec((rect) => {
            this.setState({
              scrollHeigt: rect && rect[0] ? rect[0].height : 0,
              overflowY: rect && rect[0] && rect && rect[0].height > 105 ? 'hidden' : 'auto',
              height: rect && rect[0] && rect && rect[0].height > 105 ? '190rpx' : 'auto',
            });
          });
      }, 1000);
    if (isH5) {
      let p = document.getElementById(`b${key}`);
      this.setState({
        scrollHeigt: p.scrollHeight,
      });
    }
  }

  render() {
    if (!this.props.main) return <View />;
    let {action, main, matterItem} = this.props;
    return (
      <View className='material-items'>
        <View className='top'>
          <View className='left'>
            <Image src={storeDefaultImg} className='img' />
            <View>
              <Text className='name'>官方精选</Text>
              <Text className='fs20 c999'>{moment(matterItem.updateTime).format('YYYY/MM/DD')}</Text>
            </View>
          </View>
          <View className='share'>
            <Text className='fs24 yellow'>{matterItem.recommendNum + ''}</Text>
            <Text className='fs24 c999'>次分享</Text>
          </View>
        </View>
        <View
          id={`b${this.state.key}`}
          style={{height: this.state.height, overflowY: this.state.overflowY as any}}
          className={this.props.visible && this.state.scrollHeigt > 105 ? 'content-all' : 'content-shrink'}
        >
          <Text id={`a${this.state.key}`} className='mb8 content-recommend'>
            {matterItem.recommend}
          </Text>
        </View>
        {this.state.scrollHeigt > 105 ? (
          this.props.visible ? (
            <View
              className='total'
              onClick={() => {
                this.setState({
                  overflowY: 'hidden',
                  height: '190rpx',
                });
                action.commonChange(`main.visibleMap.${matterItem.id}`, !main.visibleMap[matterItem.id]);
              }}
            >
              <Text className='text'>收起</Text>
              <Image src={full} className='icon' style={{transform: 'rotate(180deg)'}} />
            </View>
          ) : (
            <View
              className='total'
              onClick={() => {
                this.setState({
                  overflowY: 'auto',
                  height: 'auto',
                });
                action.commonChange(`main.visibleMap.${matterItem.id}`, !main.visibleMap[matterItem.id]);
              }}
            >
              <Text className='text'>全文</Text>
              <Image src={full} className='icon' />
            </View>
          )
        ) : null}

        <View className='images'>
          {matterItem.matterType == 0
            ? matterItem.matter.split(',').map((v, index) => {
                return (
                  <View>
                    <Image
                      src={v}
                      key={Math.random()}
                      className={(index + 1) % 3 == 0 ? 'image image-last' : 'image'}
                    />
                  </View>
                );
              })
            : matterItem.matterType == 1
            ? matterItem.matter &&
              JSON.parse(matterItem.matter).map((item, index) => {
                return (
                  <View style={{position: 'relative'}}>
                    <Image
                      src={item.imgSrc}
                      key={Math.random()}
                      className={(index + 1) % 3 == 0 ? 'image image-last' : 'image'}
                    />
                    {item.linkSrc && <Image src={item.linkSrc} key={Math.random()} className='image-link' />}
                  </View>
                );
              })
            : null}
        </View>
        {main.customer.forbiddenFlag == 0 && matterItem.matterType == 0 ? (
          <View
            className='box'
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-details/index?skuId=${matterItem.goodsInfo.goodsInfoId}`,
              })
            }
          >
            <View className='row-center'>
              <Image
                src={matterItem.goodsInfo.goodsInfoImg ? matterItem.goodsInfo.goodsInfoImg : defaultImg}
                className='img'
              />
              <View>
                <Text className='fs20 c333 mb16 goodsName'>{matterItem.goodsInfo.goodsInfoName}</Text>
                <Text className='fs24 yellow'>{`￥${matterItem.goodsInfo.marketPrice}`}元</Text>
              </View>
            </View>

            <View
              className='button'
              onClick={(e) => {
                e.stopPropagation();
                isH5
                  ? Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${matterItem.goodsInfo.goodsInfoId}`,
                    })
                  : action.shareBtn(matterItem);
              }}
            >
              <Text className='text'>分享赚{matterItem.goodsInfo.distributionCommission}元</Text>
            </View>
          </View>
        ) : null}
        <View className='bottom'>
          <View
            className='left'
            onClick={() => (Taro.getEnv() === 'WEAPP' ? this._click(0, matterItem) : this._click1(0, matterItem))}
          >
            <Image src={save} className='save' />
            <Text className='fs24 c333'>保存图片</Text>
          </View>
          {isH5 && (
            <View
              className='left'
              onClick={() => {
                Taro.setClipboardData({
                  data: matterItem.recommend,
                })
              }}
              style={{marginLeft: '10px'}}
            >
              <Image src={copytext} className='save' />
              <Text className='fs24 c333'>复制文案</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  _click1 = async (type, matterItem) => {
    Taro.showToast({
      title: '请长按保存图片',
      icon: 'none',
    });
  };

  _click = async (type, matterItem) => {
    //三个按钮公共一个页面，需要传递type类型0:保存，1：好友，2：朋友圈
    let {action} = this.props;
    //存入要保存的素材id
    action.commonChange('main.chooseMatterId', matterItem.id);
    if (matterItem.matterType == 0) {
      let matterList = matterItem.matter.split(',');
      let materialList = [];
      for (let i = 0; i < matterList.length; i++) {
        //网络资源要生成本地临时文件
        let result1 = await _.getTempFile(matterList[i]);
        let obj = {};
        obj['imgSrcTemp'] = result1;
        obj['checked'] = true;
        obj['imgSrc'] = matterList[i];
        obj['key'] = `${new Date().getTime().toString()}+${i}`;
        materialList.push(obj);
      }
      action.commonChange('main.imageList', materialList);
    } else {
      let matterList = JSON.parse(matterItem.matter);
      let materialList = [];
      for (let i = 0; i < matterList.length; i++) {
        let item = matterList[i];
        //网络资源要生成本地临时文件
        let result1 = await _.getTempFile(item['imgSrc']);
        item['imgSrcTemp'] = result1;
        item['checked'] = true;
        //营销素材有小程序码链接的
        if (item['linkSrc']) {
          let result2 = await _.getTempFile(item['linkSrc']);
          item['linkSrcTemp'] = result2;
        }
        item['key'] = `${new Date().getTime().toString()}+${i}`;
        materialList.push(item);
      }
      action.commonChange('main.imageList', materialList);
    }
    getPrivacySetting().then((res) => {
      if ((res as any).needAuthorization) {
        msg.emit('privacyModalVisible', {
          visible: true,
          privacyContractName: (res as any).privacyContractName,
          callback: () => {
            Taro.setClipboardData({
              data: matterItem.recommend,
            });
          },
        });
      } else {
        Taro.setClipboardData({
          data: matterItem.recommend,
        });
      }
    });
    
    //隐藏tabbar
    Taro.hideTabBar();
    //同时保存图文分享页
    await action.shareBtn(matterItem, false);
    await action.pictureShare();
    action.commonChange('main.buttonType', type);
    action.commonChange('main.imageModal', true);
  };
}

//create by moon https://github.com/creasy2010/moon
