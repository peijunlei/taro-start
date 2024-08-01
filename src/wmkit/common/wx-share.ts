import Taro from '@tarojs/taro';
import api from 'api';
import cache from '../config/cache';

function initShare(title: string, desc: string, imageUrl: string, distributionType: any) {
  getConfigInfo(title, desc, imageUrl, distributionType);
}

async function getConfigInfo(title: string, desc: string, imageUrl: string, distributionType: any) {
  let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
  let shareId;
  if (loginData) {
    shareId = await api.customerPointsController.shareRecord();
  }
  wx.ready(() => {
    let link = window.location.href;
    if (distributionType == 3) {
      //3 邀新注册,区分分销员和普通会员
      link =
        window.location.origin ||
        window.location.protocol +
          '//' +
          window.location.hostname +
          (window.location.port ? ':' + window.location.port : '');
      link = `${link + '/pages/package-A/login/register/index'}?inviteeId=${loginData.customerId}&shareTest=shareTest`;
    } else if (distributionType == 4) {
      link = window.location.origin;
      link = `${link + '/pages/package-B/distribution/store/social-c/shop-index-c/index'}?inviteeId=${
        loginData.customerId
      }&shareTest=shareTest`;
    } else if (loginData.customerId && shareId) {
      if (link.indexOf('?') != -1) {
        link = `${link}&shareUserId=${loginData.customerId}&shareId=${shareId}`;
      } else {
        link = `${link}?shareUserId=${loginData.customerId}&shareId=${shareId}`;
      }

      //0 不是分销商品 1 普通商品详情 2 小店商品详情页
      if (distributionType === 1) {
        link = `${link}&inviteeId=${loginData.customerId}&shareTest=shareTest`;
      } else if (distributionType === 2) {
        link = `${link}&id=${loginData.customerId}&shareTest=shareTest`;
      } else {
        link = `${link}&shareTest=shareTest`;
      }
    } else {
      if (link.indexOf('?') != -1) {
        link = `${link}&shareTest=shareTest`;
      } else {
        link = `${link}?shareTest=shareTest`;
      }
    }

    //好友
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imageUrl, // 分享图标
      success: function() {
        // 设置成功
      },
    });

    // 朋友圈
    wx.updateTimelineShareData({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imageUrl, // 分享图标
      success: function() {
        // 设置成功
      },
    });

    //旧版,用来适配Android
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imageUrl, // 分享图标
      success: function() {
        // 设置成功
      },
    });
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imageUrl, // 分享图标
      success: function() {
        // 设置成功
      },
    });
  });

  wx.error(function() {});
}

async function changeUrl(menu, link, params, distributionType?: any) {
  if (distributionType == 3) {
    return link;
  }
  let array = Object.entries(params);
  //Taro的参数列表有一项自带的参数，需排除
  array.reverse().forEach((param) => {
    if (link.indexOf('?') > -1) {
      link = link + `&${param[0]}=${param[1]}`;
    } else {
      link = link + `?${param[0]}=${param[1]}`;
    }
  });

  let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
  if (loginData && menu === 'menu') {
    const customerId = loginData.customerId;
    const shareId = await api.customerPointsController.shareRecord();
    if (link.indexOf('?') != -1) {
      link = `${link}&shareUserId=${customerId}&shareId=${shareId}`;
    } else {
      link = `${link}?shareUserId=${customerId}&shareId=${shareId}`;
    }
  }
  console.log('跳转链接----------->', link);
  return link;
}

export const wxShare = {initShare, changeUrl};
