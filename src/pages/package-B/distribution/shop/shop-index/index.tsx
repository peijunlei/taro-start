import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import InfoList from './components/info';
import ShareModal from './components/share-modal';
import GoodsShareModal from '@/pages/common/share-modal';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import {msg} from 'wmkit';

const defaultAvatar = require('@/assets/image/groupon/default-avatar.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ShopIndex extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    msg.on({
      'shop-goods': async () => {
        await this.props.actions.init();
      },
    });
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  async componentDidShow() {
    await this.props.actions.init();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;
    let headImg = main && main.customerInfo.headImg ? main.customerInfo.headImg : defaultAvatar;
    return (
      main && (
        <View className="packageBShopShopIndex">
          <View className="shop-head">
            <View className="head-left">
              <Image src={headImg} className="shop-img" />
              <View className="left-box">
                <Text className="left-top">
                  {main.customerInfo.customerName &&
                  main.customerInfo.customerName.length == 11 &&
                  main.customerInfo.customerName.indexOf('****') != -1
                    ? '*' + main.customerInfo.customerName.split('****')[1]
                    : main.customerInfo.customerName}
                  {/* {customerInfo.customerName ? customerInfo.customerName : '蒙娜丽莎'} */}的
                  {main.settingInfo.shopName ? main.settingInfo.shopName : '小店铺'}
                </Text>
                <View className="left-bottom">
                  <Text className="left-bottom-text">
                    {main.customerInfo.distributorLevelName ? main.customerInfo.distributorLevelName : '达人店主'}
                  </Text>
                </View>
              </View>
            </View>

            <View className="head-right">
              {/* {
              WMkit.isDistributorLoginForShare() &&
             <View className="left-bottom" onClick={() => WMkit.toMainPageAndClearInviteCache()}>
               <View className="left-bottom-text">返回自己店铺</View>
             </View>
            }             */}
              <View
                className="right"
                onClick={() => Taro.navigateTo({url: '/pages/package-B/distribution/shop/shop-edit/index'})}
              >
                <Image src={require('./img/shezhi.png')} className="right-img" />
                <Text className="right-text">编辑</Text>
              </View>
              <View
                className="choose"
                onClick={() => Taro.navigateTo({url: '/pages/package-B/distribution/shop/shop-goods/index'})}
              >
                <Image src={require('./img/xuanpin.png')} className="right-img" />
                <Text className="right-text">选品</Text>
              </View>
            </View>
          </View>
          <InfoList />
          <View className="register-btn">
            <View
              className="shop-bottom-btn"
              onClick={async () => {
                if (Taro.getEnv() == 'WEAPP') {
                  if (!main.isOpenWechat) {
                    Taro.showToast({
                      title: '功能不可用',
                      icon: 'none',
                      duration: 2000,
                    });
                    return;
                  }
                  action.commonChange('main.shareModalVisible', true);
                } else {
                  Taro.showToast({
                    title: '请使用微信浏览器进行分享！',
                    icon: 'none',
                    duration: 2000,
                  });
                }
              }}
            >
              <Image src={require('./img/fen.png')} className="btn-img" />
              <Text className="btn-text">分享店铺</Text>
            </View>
          </View>

          {/* 分销分享赚弹框 */}
          {main.goodsShareVisible && (
            <GoodsShare
              checkedSku={main.goodsInfo}
              onClose={() => action.commonChange('main.goodsShareVisible', false)}
              addSelfShop={(val) => action.commonChange('main.addSelfShop', val)}
              shareModalVisible={() => action.commonChange('main.goodsShareModalVisible', true)}
              isOpenWechat={main.isOpenWechat}
            />
          )}

          {main.shareModalVisible && (
            <ShareModal
              closeVisible={() => {
                //显示tab
                Taro.showTabBar();
                //弹窗关闭
                action.commonChange('main.shareModalVisible', false);
              }}
              shareModalVisible={main.shareModalVisible}
              baseInfo={main.baseInfo}
              inviteeId={main.inviteeId}
              headImg={headImg}
            />
          )}

          {main.goodsShareModalVisible ? (
            <GoodsShareModal
              shareType={1}
              closeVisible={() => {
                //弹窗关闭
                action.commonChange('main.goodsShareModalVisible', false);
              }}
              addSelfShop={false}
              goodsInfo={main.goodsInfo}
              shareModalVisible={main.goodsShareModalVisible}
            />
          ) : null}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
