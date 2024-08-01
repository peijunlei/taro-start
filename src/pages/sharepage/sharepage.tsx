import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import api from 'api';
import { _ ,WMkit} from 'wmkit';
import { cache } from 'config';

export default class SharePage extends Component {
  componentWillMount() {
    this._init();
  }

  render() {
    return <View></View>;
  }

  _init = async () => {
    Taro.showLoading();
    //获取所有参数
    const options = getCurrentInstance().router.params;
    const exchangeCardKey = Object.keys(options)?.[0];
    if (exchangeCardKey?.indexOf('exchange-card') > -1) {
      const giftCardNo = exchangeCardKey.split('exchange-card')[1];
      Taro.redirectTo({
        url: `/pages/package-D/gift-card/exchange-card/index?giftCardNo=${giftCardNo}&share=1`,
      });
      return;
    }
    const scene = options.scene as any;
    // 对uri解码
    const decodeURI = decodeURIComponent(scene);
    console.log('decodeURI', '/' === decodeURI);
    //商城首页
    if ('/' === decodeURI) {
      Taro.switchTab({
        url: `/pages/index/index`,
      });
    }
    // 通过 “商品推广小程序码” 识别打开
    if (decodeURI && decodeURI.indexOf('EX') > -1) {
      // 切取decodeURI
      let redisKey = decodeURI.substring(2);
      // redisKey被加密，如：QR_CODE_LINK:A3A0BE2E313094E6，需通过当前接口解密
      const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;

      // 跳转至商品详情
      if (res) {
        Taro.redirectTo({ url: res });
      }
    }
    //通过识别商品码打开，由于scene入参限制32位，所以只传了skuId,skuId正好是32位的
    // if (scene && scene.indexOf('NM') > -1) {
    //   let redisKey = scene.substring(2);
    //   const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;
    //
    //   let skuId = res.split('/')[2];
    //   let shareUserId = res.split('/')[3];
    //   let shareId = res.split('/')[4];
    //   //Todo 跳转至普通商品详情
    //   Taro.redirectTo({
    //     url: `/pages/package-B/goods/goods-details/index?skuId=${skuId}&shareUserId=${shareUserId}`,
    //   });
    //   api.customerPointsController.share({customerId: shareUserId, shareId: shareId});
    // }
    //通过识别商品码打开，由于scene入参限制32位，所以只传了skuId,skuId正好是32位的
    if (scene && scene.indexOf('NM') > -1) {
      let redisKey = scene.substring(2);
      const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;

      let skuId = res.split('/')[2];
      let shareUserId = res.split('/')[3];
      let shareId = res.split('/')[4];
      //Todo 跳转至普通商品详情
      Taro.redirectTo({
        url: `/pages/package-B/goods/goods-details/index?skuId=${skuId}&shareUserId=${shareUserId}`,
      });
      api.customerPointsController.share({ customerId: shareUserId, shareId: shareId, token: window.token || '' });
    }
    //识别店铺码打开，decodeURI形如：/store-main/123456859
    if (decodeURI && decodeURI.indexOf('store-main') > -1) {
      //Todo 跳转至店铺首页
      return
    }
    //分销场景相关的,积分共用
    if (scene && scene.indexOf('FX') > -1) {
      //清除缓存
      await Taro.setStorageSync(cache.CHANNEL_TYPE, '');
      await Taro.setStorageSync(cache.INVITEE_ID, '');
      //分销传过来的，截取FX后面的时间戳，去后台查询真正的参数,因为scene的长度有限制，所以只能传一个加密的key,
      //再反解析出来
      let redisKey = scene.substring(2);
      try {
        //调用老接口，解析出url，将老的url与实际小程序里面的页面区分开来
        const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;
        //形如  /shop-index-c/%s,占位符表示inviteeId
        if (res.indexOf('shop-index-c') > -1) {
          const inviteeId = res.split('/')[2];
          const shareId = res.split('/')[3];
          //存储分销员ID
          await Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
          //分销渠道为店铺内
          await Taro.setStorageSync(cache.CHANNEL_TYPE, '2');
          //分享店铺，则进入分销员店铺精选页
          Taro.redirectTo({
            url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${inviteeId}`,
          });
          api.customerPointsController.share({ customerId: inviteeId, shareId: shareId, token: window.token || '' });
        }
        //邀新链接，形如/pages/package-A/login/register/index?inviteeId=%s%,占位符表示邀请人ID
        if (res.indexOf('register') > -1) {
          //searchToObj接受的是问号加上问号后面的字符串，所以先截取，再手动拼个符号
          const inviteeId = _.searchToObj(res.split('?')[1].padStart(res.split('?')[1].length + 1, '?')).inviteeId;
          //存储分销员ID
          await Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
          await Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
          Taro.redirectTo({
            url: `/pages/package-A/login/register/index?inviteeId=${inviteeId}`,
          });
        }
        //形如 /shop-index/goods-detail/%s/%s/%s?channel=%s,占位符以此表示inviteeId,spuId,skuId,渠道
        if (res.indexOf('/shop-index/goods-detail') > -1) {
          const inviteeId = res.split('/')[3];
          const spuId = res.split('/')[4];
          const skuId = res.split('/')[5].split('?')[0];
          const shareId = res.split('/')[6];
          //存储分销员ID
          await Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
          //分销渠道为店铺内
          await Taro.setStorageSync(cache.CHANNEL_TYPE, '2');
          //Todo 店铺内分享，跳转至分销商品详情页
          Taro.redirectTo({
            url: `/pages/package-B/distribution/shop/socia-details/index?id=${inviteeId}&goodsId=${spuId}&skuId=${skuId}`,
          });
          api.customerPointsController.share({ customerId: inviteeId, shareId: shareId, token: window.token || '' });
        }
        //形如 /goods-detail/%s?channel=%s&inviteeId=%s，店铺外分享，跳转至店铺外商品详情,积分商品也走这里
        if (res.indexOf('/goods-detail') > -1 && res.indexOf('/shop-index/goods-detail') == -1) {
          let skuId = res.split('?')[1];
          skuId = skuId.split('&')[0];
          skuId = skuId.split('=')[1];
          // const skuId = res.split('/')[2];
          const inviteeId = _.searchToObj(res).inviteeId;
          const channel = _.searchToObj(res).channel;
          //存储分销员ID
          await Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
          //分销渠道为商城
          await Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
          // pointsGoodsId
          const pointsGoodsId = _.searchToObj(res).pointsGoodsId;
          // pointsGoodsId
          const shareUserId = _.searchToObj(res).shareUserId;
          // pointsGoodsId
          const shareId = _.searchToObj(res).shareId;
          // 是积分商品
          if (pointsGoodsId) {
            Taro.redirectTo({
              url: `/pages/package-B/goods/goods-details/index?skuId=${skuId}&pointsGoodsId=${pointsGoodsId}&shareUserId=${shareUserId}`,
            });
          } else {
            //Todo 店铺外分享，跳转至普通商品详情页，并携带分销员ID
            Taro.redirectTo({
              url: `/pages/package-B/goods/goods-details/index?skuId=${skuId}&inviteeId=${inviteeId}`,
            });
          }

          api.customerPointsController.share({ customerId: shareUserId ? shareId : inviteeId, shareId: shareId, token: window.token || '' });
        }
        Taro.hideLoading();
      } catch (e) {
        Taro.showToast({
          title: '识别码出错，该码已经失效！',
          icon: 'none',
          duration: 2000,
        });
        Taro.hideLoading();
      }
    }
    //页面投放相关的
    if (scene && scene.indexOf('TF') > -1) {
      //页面投放传过来的，截取TF后面的页面id，去后台查询真正的参数,因为scene的长度有限制，所以只能传一个加密的key,
      try {
        //调用老接口，解析出url，将老的url与实际小程序里面的页面区分开来
        const res = (await api.distributionMiniProgramController.getSkuQrCode(scene)) as any;
        //跳转到页面
        Taro.redirectTo({
          url: `/pages/package-B/x-site/page-link/index${res}`,
        });
        Taro.hideLoading();
      } catch (e) {
        Taro.showToast({
          title: '识别码出错，该码已经失效！',
          icon: 'none',
          duration: 2000,
        });
        Taro.hideLoading();
      }
    }
    // 礼品卡卡详情和礼品卡登录页
    if (scene && scene.indexOf('EX') > -1) {
      let redisKey = scene.substring(2);
      const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;
      // 跳转到卡详情时type=0 通过扫码入口进入卡详情的话，这个时候卡详情只能预览
      // url = `/pages/package-D/gift-card/gift-card-detail/index?type=0&id=${id}`
      // 调整到登录卡的页面
      Taro.redirectTo({
        url: res,
      });
      Taro.hideLoading();
    }
    //邀请参团的码,scene的值为团号
    if (scene && scene.indexOf('G') > -1) {
      let redisKey = scene.substring(1);
      const res = (await api.distributionMiniProgramController.getSkuQrCode(redisKey)) as any;

      let grouponId = res.split('/')[2];
      let shareUserId = res.split('/')[3];
      let shareId = res.split('/')[4];
      //Todo,跳转到团详情页面
      Taro.redirectTo({
        url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${grouponId}&shareUserId=${shareUserId}`,
      });
      api.customerPointsController.share({ customerId: shareUserId, shareId: shareId, token: window.token || '' });
      Taro.hideLoading();
    }
    // 礼品卡扫码领卡
    if (scene && scene.indexOf('exchange-card') > -1) {
      let giftCardNo = scene.substring(7);
      Taro.redirectTo({
        url: `/pages/package-D/gift-card/exchange-card?share=1&giftCardNo=` + giftCardNo,
      });
      Taro.hideLoading();
    }
  };
}
