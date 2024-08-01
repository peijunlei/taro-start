import config from '@/service/config';
import Taro from '@tarojs/taro';
import {cache} from "config";
import {
  clickGoods as clickGoods1,
  clickGoodsUnLogin as clickGoodsUnLogin1,
} from 'api/IntelligentRecommendationController';
import {VAS} from 'wmkit';

/**
 * pv/uv收集埋点
 */
let sendUrl = config.pvUvHost + '/wm.gif';
let clientType = __TARO_ENV == 'h5' ? 'H5' : 'MINIPROGRAM';

function getUserId() {
  let userId = null;
  let itemStr = Taro.getStorageSync('b2b-wechat@login');
  if (itemStr) {
    userId = itemStr.customerId; //获取userId,HTML5写法,不支持低版本浏览器
  }
  return userId;
}

function uuid() {
  let s = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

function getCookieValue(key) {
  return Taro.getStorageSync('WM_UUID') ? Taro.getStorageSync(key) : 'cookieDisabled';
}

export const getSendId = () => {
  let sendId = getUserId();
  if (!sendId) {
    sendId = getCookieValue('WM_UUID');
    if (!sendId || sendId == 'cookieDisabled') {
      sendId = uuid(); //uuid不存在,则在cookie中创建一个uuid
      let e = new Date();
      e.setTime(e.getTime() + 157248e5); //半年
      Taro.setStorageSync('WM_UUID', sendId);
    }
  }
  return sendId;
};

// 智能推荐埋点-登录
async function clickGoods(params = {}) {
  let recommendSwitch = await VAS.checkRecommendAuth();
  if (recommendSwitch) {
    await clickGoods1(params);
  }
}

// 智能推荐埋点-未登录
async function clickGoodsUnLogin(params = {}) {
  let recommendSwitch = await VAS.checkRecommendAuth();
  if (recommendSwitch) {
    await clickGoodsUnLogin1(params);
  }
}

/**
 * 智能推荐埋点
 * */

export const buriedPoint = async (params = {}) => {
  // goodsId,(商品智能推荐-点击推荐商品id)
  // recommendType, (推荐类型  0:热门 1:相关性 2:用户兴趣推荐)
  // type, (坑位类型，0：购物车，1：商品详情，2：商品列表；3：个人中心；4：会员中心；5：收藏商品；6：支付成功页；7：分类；8:魔方)
  // eventType,(事件类型 0：浏览，1：点击，2：加购，3：下单)

  // customerId,(未登录接口需要传参)
  if (Taro.getStorageSync('b2b-wechat@login')) {
    clickGoods({
      ...params,
    });
  } else {
    clickGoodsUnLogin({
      ...params,
      customerId: getSendId(),
    });
  }
};

export function myPvUvStatis(_params, _saleType = 1) {
  if(_params['storeId'] == undefined || _params['storeId'] == -1){
    // let storeId = localStorage.getItem(cache.STORE_ID);
    let storeId = Taro.getStorageSync(cache.STORE_ID);
    if(storeId != undefined && storeId != '-1'){
      _params['storeId'] = storeId;
    }
  }
  //编辑参数
  //0:批发/1:零售
  let data = [];
  if (_saleType) {
    data = [
      {
        ..._params,
        id: getSendId(),
        url: getCurrentPageUrlWithArgs(),
        clientType: clientType,
      },
    ];
  } else {
    _params?.forEach((item) => {
      data.push({
        ...item,
        id: getSendId(),
        url: getCurrentPageUrlWithArgs(),
        clientType: clientType,
      });
    });
  }
  Taro.request({
    method: 'POST',
    header: {
      'Content-Type': 'application/json', // 默认值
    },
    url: sendUrl,
    data: data,
    success: (res) => {},
  }).catch((e) => {});
}

/**
 * 获取当前页url
 */
function getCurrentPageUrlWithArgs() {
  // 获取当前路由堆栈
  const paths = __TARO_ENV == 'h5' ? window.location : Taro.getCurrentPages();
  let pathName = '';
  // 区分h5和小程序
  if (__TARO_ENV == 'h5') {
    pathName = (paths as any).pathname || '';
  } else {
    pathName = (paths as any) && (paths as any).length ? '/' + (paths as any)[(paths as any).length - 1].route : '';
  }
  return pathName;
}
