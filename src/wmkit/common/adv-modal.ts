/**
 * @desc
 * @使用场景
 *
 * @coder
 * @Date
 */
import Taro from '@tarojs/taro';
import api from 'api';

const fetchModal = async (applicationPageName) => {
  const res = await api.PopupAdministrationQueryController.pageManagementAndPopupAdministrationList({
    applicationPageName: applicationPageName,
  });
  return res.popupAdministrationVOS;
};
/**
 * 全局弹窗
 */
const setModalShow = async (res, params, id) => {
  if (res.length > 0) {
    //获取到当前弹窗数组下标
    let index = res.map((item) => item.popupId).indexOf(id);
    //当前弹窗信息
    let currentModal = res.filter((item) => item.popupId == id);
    //弹窗频率信息
    let launchFrequency = currentModal[0].launchFrequency;
    //弹窗界面参数id
    let applicationPageName = params;
    //当前弹窗是否在设置时间内
    let popupStatus = currentModal[0].popupStatus;
    //当前弹窗id
    let popupId = currentModal[0].popupId;
    //当前弹窗背景图片地址
    let imgUrl = currentModal[0].popupUrl;
    //当前弹窗落地页
    let jumpPage = currentModal[0].jumpPage;
    //获取下一个弹窗的id
    let nextPopupId = '';
    if (index + 1 < res.length) {
      nextPopupId = res[index + 1].popupId;
    }
    //如果符合弹窗状态则执行
    if (popupStatus == 1) {
      //只弹出一次弹窗逻辑
      if (launchFrequency.split(',').length == 1) {
        if (!Taro.getStorageSync(`${applicationPageName}${popupId}`)) {
          Taro.setStorageSync(`${applicationPageName}${popupId}`, true);
          return {imgUrl, jumpPage, nextPopupId, showFlag: true};
        } else {
          return {imgUrl, jumpPage, nextPopupId, showFlag: false};
        }
      } else {
        //每隔N天弹出一次弹窗逻辑
        let day = launchFrequency.split(',')[1];
        if (!Taro.getStorageSync(`${applicationPageName}${popupId}`)) {
          Taro.setStorageSync(`${applicationPageName}${popupId}`, true);
          if (showMulitTimes(day, `${applicationPageName}${popupId}`))
            return {imgUrl, jumpPage, nextPopupId, showFlag: true};
        } else {
          if (!showMulitTimes(day, `${applicationPageName}${popupId}`))
            return {imgUrl, jumpPage, nextPopupId, showFlag: false};
        }
      }
    } else {
      return {imgUrl, jumpPage, nextPopupId, showFlag: false};
    }
  } else {
    return {};
  }
};
const handleUrl = async (params,isGiftCard?:boolean) => {
  let {info, linkKey} = params;
  switch (linkKey) {
    case 'goodsList':
      Taro.navigateTo({url: `/pages/package-B/goods/goods-details/index?skuId=${info.skuId}`});
      break;
    case 'storeList':
      return
      Taro.navigateTo({url: `/pages/package-A/store/store-main/index?storeId=${info.storeId}`});
      break;
    case 'categoryList':
      Taro.navigateTo({url: `/pages/package-B/goods/goods-list/index?cateId=${info.cateId}`});
      break;
    case 'promotionList':
      switch (info.cateKey) {
        case 'preOrder':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-details/index?skuId=${info.goodsInfoId}`});
          break;
        case 'preSell':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-details/index?skuId=${info.goodsInfoId}`});
          break;
        case 'groupon':
          let res = await api.goodsBaseController.checkGroupOnFlag(info.goodsInfoId);
          if (res.grouponGoodsInfoVO) {
            Taro.navigateTo({url: `/pages/package-B/goods/group-details/index?skuId=${info.goodsInfoId}`});
          } else {
            Taro.navigateTo({url: `/pages/package-B/goods/goods-details/index?skuId=${info.goodsInfoId}`});
          }
          break;
        case 'flash':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-details/index?skuId=${info.goodsInfoId}`});
          break;
        case 'full':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${info.marketingId}`});
          break;
        case 'comBuy':
          Taro.navigateTo({url: `/pages/package-B/goods/combination-goods/index?skuId=${info.goodsInfoId}`});
          break;
        case 'onePrice':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${info.marketingId}`});
          break;
        case 'halfPrice':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${info.marketingId}`});
          break;
      }
      break;
    case 'pageList':
      if(info.pageType==='channel'){
        let url = `/pages/package-F/channel/goods-list/index?channelId=${info.pageCode}`;
        if(isGiftCard) url = url.concat(`&isGiftCard=${1}`);
         Taro.navigateTo({
          url,
        });
        return
      }
      let url = `/pages/package-B/x-site/page-link/index?pageType=${info.pageType}&pageCode=${info.pageCode}`;
      if(info.storeId) url = url.concat(`&storeId=${info.storeId}`);
      if(isGiftCard) url = url.concat(`&isGiftCard=${1}`);
      Taro.navigateTo({
        url,
      });
      break;
    case 'userpageList':
      switch (info.key) {
        case 'myHome':
          Taro.switchTab({url: `/pages/index/index`});
          break;
        case 'category':
          Taro.navigateTo({url: `/pages/package-B/goods/all-list/index`});
          break;
        case 'allProduct':
          Taro.navigateTo({url: `/pages/package-B/goods/goods-list/index`});
          break;
        case 'cart':
          Taro.navigateTo({url: `/pages/package-B/goods/shop-cart-without-bottom/index`});
          break;
        case 'order':
          Taro.navigateTo({url: `/pages/package-C/order/order-list/index`});
          break;
        case 'myReturnOrder':
          Taro.navigateTo({url: `/pages/package-C/order/refund-list/index`});
          break;
        case 'UserCenter':
          Taro.switchTab({url: `/pages/user-center/index`});
          break;
        case 'follow':
          let token = Taro.getStorageSync('authInfo:token');
          if (token) {
            Taro.navigateTo({url: `/pages/package-A/customer/user-collection/index`});
          } else {
            Taro.navigateTo({url: `/pages/package-A/login/login/index`});
          }
          break;
        case 'likeStore':
          Taro.navigateTo({url: `/pages/package-A/store/store-attention/index`});
          break;
        case 'couponCenter':
          Taro.navigateTo({url: `/pages/package-A/coupon/coupon-center/index`});
          break;
        case 'grouponCenter':
          Taro.navigateTo({url: `/pages/package-B/groupon/groupon-center/index`});
          break;
        case 'xSiteGouWuDai':
          Taro.navigateTo({url: `/pages/package-B/flash-sale/spike-home/index`});
          break;
        case 'integral-mall':
          Taro.navigateTo({url: `/pages/package-A/customer/user/points-mall/index`});
          break;
        case 'member-center':
          Taro.navigateTo({url: `/pages/package-A/customer/user/member-center/index`});
          break;
        case 'chose-service':
          Taro.navigateTo({url: `/chose-service/0`});
          break;
      }
      break;
  }
};

//N天执行一次
function showMulitTimes(day, popupId) {
  const s = Taro.getStorageSync(`time${popupId}`);
  const e = diff(s, day);
  if (Taro.getStorageSync(`time${popupId}`) == '' || e == false) {
    Taro.setStorageSync(`time${popupId}`, Date.now());
    return true;
  } else {
    return false;
  }
}

function diff(t, day) {
  return Date.now() - t < 24 * 3600 * 1000 * day ? true : false;
}

export {fetchModal, setModalShow, handleUrl};
