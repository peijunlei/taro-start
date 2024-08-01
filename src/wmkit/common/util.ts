import moment from 'dayjs';
import Taro from '@tarojs/taro';
import api from 'api';
import {$$alert} from '@/utils/common-functions';
import {cache} from 'config';
import {msg, ValidConst, WMkit} from 'wmkit';
import {isLogin} from './kit';

/**
 * 把长整类型的时间转换成 yyyy-MM-dd 格式的时间
 */
export const formatDay = function (value) {
  var defaultFmt = 'YYYY-MM-DD';
  // var date = new Date(value);
  // return date.Format(defaultFmt);
  return moment(value).format(defaultFmt);
};

/**
 * 把长整类型的时间转换成yyyy-MM-dd hh:mm:ss格式的时间
 */
export const formatDate = function (value) {
  var defaultFmt = 'YYYY-MM-DD HH:mm:ss';
  // var date = new Date(value);
  // return date.Format(defaultFmt);
  return moment(value).format(defaultFmt);
};

/**
 * 把长整类型的时间转换成yyyy年MM月dd日 hh时mm分ss秒格式的时间
 */
export const formatChnDate = function (value) {
  var defaultFmt = 'YYYY年MM月DD日 HH时mm分ss秒';
  // var date = new Date(value);
  // return date.Format(defaultFmt);
  return moment(value).format(defaultFmt);
};

/**
 * 判断是否在微信中打开
 */
export const isWeixin = function () {
  if (!window) {
    return false;
  }
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua) {
    return ua.indexOf('micromessenger') > -1;
  } else {
    return false;
  }
};

/**
 * 获取小数点后数字长度
 * @author zhongjiewang
 * @param  {Number} num 数字
 * @return {Number}     长度
 */
function decimalLength(num) {
  var str = Number(num).toString();
  var index = str.indexOf('.');
  return index == -1 ? 0 : str.substr(index + 1).length;
}

/**
 * 小数点后补齐0作为整数
 * @author zhongjiewang
 * @param  {Number} num    数字
 * @param  {Number} length 补齐的长度
 * @return {Number}        整数
 */
function suffixInteger(num, length) {
  var str = Number(num).toString();
  var decimalLen = decimalLength(num);
  str += Math.pow(10, length - decimalLen)
    .toString()
    .substr(1);
  return Number(str.replace('.', ''));
}

/**
 * 浮点数相乘
 * 使用：num1.mul(num2);
 * return 相乘结果
 */
export const mul = function (num1, num2) {
  var r1 = decimalLength(num1);
  var r2 = decimalLength(num2);

  var max = Math.max(r1, r2);

  var n1 = suffixInteger(num1, max);
  var n2 = suffixInteger(num2, max);

  return (n1 * n2) / Math.pow(10, max * 2);
};

/**
 * 浮点数相加
 */
export const add = function (num1, num2) {
  var r1 = decimalLength(num1);
  var r2 = decimalLength(num2);

  var max = Math.max(r1, r2);

  var n1 = suffixInteger(num1, max);
  var n2 = suffixInteger(num2, max);

  return Number(((n1 + n2) / Math.pow(10, max)).toFixed(max));
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 返回值：arg1加上arg2的精确结果
 **/
export const sub = function (num1, num2) {
  var r1 = decimalLength(num1);
  var r2 = decimalLength(num2);

  var max = Math.max(r1, r2);

  var n1 = suffixInteger(num1, max);
  var n2 = suffixInteger(num2, max);
  return Number(((n1 - n2) / Math.pow(10, max)).toFixed(max));
};

/**
 * 除法函数
 * @param num1
 * @param num2
 * @returns {number}
 */
export function div(num1, num2) {
  var r1 = decimalLength(num1);
  var r2 = decimalLength(num2);

  var max = Math.max(r1, r2);

  var n1 = suffixInteger(num1, max);
  var n2 = suffixInteger(num2, max);

  return n1 / n2;
}

/**
 * 判断是否是空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = function (obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
};

/**
 * 为整数添加两位小数
 * 向下截取小数点后两位,如:1.036 -> 1.03
 */
export const addZeroFloor = (num) => {
  var f = parseFloat(num ? num : 0);
  f = Math.floor(f * 100) / 100;
  return f.toFixed(2);
};

/**
 * 为整数添加一位小数
 * 向下截取小数点后两位,如:1.036 -> 1.0
 */
export const addZeroFloorIndividual = (num) => {
  let f = parseFloat(num ? num : 0);
  f = div(Math.floor(mul(f, 10)), 10);
  return f;
};

/**
 * 计算销量
 */
export const goodsSalesNum = (num) => {
  let goodsSalesNum = parseFloat(num ? num : 0);
  let salesNum;
  if (goodsSalesNum <= 9999) {
    salesNum = goodsSalesNum;
  } else if (goodsSalesNum <= 99999) {
    salesNum = addZeroFloorIndividual(div(goodsSalesNum, 10000)) + '万+';
  } else if (goodsSalesNum <= 999999) {
    salesNum = Math.floor(div(goodsSalesNum, 10000)) + '万+';
  } else if (goodsSalesNum <= 9999999) {
    salesNum = Math.floor(div(goodsSalesNum, 10000)) + '万+';
  } else {
    salesNum = '999万+';
  }
  return salesNum;
};

/**
 * 为整数添加两位小数
 * 四舍五入
 */
export const addZero = function (num) {
  return new Number(num ? num : 0).toFixed(2);
};

export const parseNumber = function (num) {
  return new Number(num ? num : 0).toFixed(0);
};

/**
 * 格式化金额
 * @param s 金额数
 * @param n 显示小位数
 * @param fp 标准金额展示
 * @returns {string}
 */
export const fmoney = (s, n = 2, fp = undefined) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  var l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1];
  var t = '';
  for (var i = 0; i < l.length; i++) {
    if (fp) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    } else {
      t += l[i];
    }
  }

  return t.split('').reverse().join('') + '.' + r;
};
/**
 * 不四舍五入的取两位小数
 */
export const toFixed2 = (number: number | string) => {
  if (typeof number != 'string') {
    number = number + '';
  }
  let numberArray = number.split('.');
  if (numberArray[1]) {
    if (numberArray[1].length == 1) {
      numberArray[1] = numberArray[1] + '0';
    } else if (numberArray[1].length > 2) {
      numberArray[1] = numberArray[1].substring(0, 2);
    }
  } else {
    numberArray[1] = '00';
  }
  return parseFloat(numberArray.join('.')).toFixed(2);
};

/**
 * 手机号加密处理
 * @param mobile
 */
export const safeMobile = (mobile) => {
  if (!mobile) {
    return mobile;
  }

  let mobileStr = mobile + ' ';
  if (mobileStr.length > 7) {
    return `${mobileStr.slice(0, 3)}****${mobileStr.slice(7)}`;
  }
  return mobile + ' ';
};
/**
 * 产生指定位数的随机数
 * @param n
 * @returns {string}
 */
export const rndNum = (n) => {
  let rnd = '';
  for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
  return rnd;
};

/**
 * 微信登录处理
 */
export const _weChatLogin = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    await Taro.login({
      async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
        if (res.code) {
          const {openid} = await api.wechatLoginController.getWeappOpenId(res.code);
          resolve(openid);
        } else {
          reject(res.errMsg);
        }
      },
    });
  });
};

/**
 * 登录状态
 */
export const _isLogin = async (): Promise<boolean> => Boolean(Taro.getStorageSync('authInfo:token'));

export const formatVopText = (html, offset?: number) => {
  if (!html) return '';
  const info = Taro.getSystemInfoSync();
  const width = info.windowWidth - (offset || 0);
  let r = html.match(/width:(\S*)px/g);
  r.forEach((e) => (html = html.replace(e, 'width:' + width + 'px')));
  r = html.match(/ height:(\S*)px/g);
  r.forEach((e) => {
    const k = ((width / 750) * +e.match(/height:(\S*)px/)[1]) << 0;
    html = html.replace(e, 'height:' + k + 'px');
  });
  return html;
};

/**
 * 富文本处理
 * @param html
 */
export const formatRichText = (html, offset?: number) => {
  if (html) {
    if (html.startsWith('<style>.ssd-module-mobile-wrap')) return formatVopText(html, offset);
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
      match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
    });
    newContent = newContent.replace(/<ol[^>]*>/gi, function (match, capture) {
      match = match.replace('style="', 'style="margin: 0;padding:0;');
      return match;
    });
    newContent = newContent.replace(/<ul[^>]*>/gi, function (match, capture) {
      match = match.replace('style="', 'style="margin: 0;padding:0;');
      return match;
    });
    /* eslint-disable */
    newContent = newContent.replace(
      /<img/gi,
      '<img referrerpolicy="no-referrer" style="max-width:100%;height:auto;margin-top:0;margin-bottom:0;"',
    );
    // console.log('newContent', newContent);
    newContent = newContent.replace(
      '<h2 style="line-height: 0; text-align: center;">',
      '<h2 style="text-align: center;">',
    );
    /* eslint-disable */
    return newContent;
  } else {
    return '';
  }
};

//保存图片到相册
export const savePicToAlbum = (tempFilePath) => {
  try {
    Taro.saveImageToPhotosAlbum({
      filePath: tempFilePath,
    });
    Taro.showToast({
      title: '保存成功',
    });
  } catch (error) {
    console.log(`保存失败，原因是${error}`);
  }
};

//保存图片到相册-promise化，解决安卓手机保存不全的问题
export const savePicToAlbumPromise = (list) => {
  let promises = list.map((element) => {
    return new Promise((resolve, reject) => {
      Taro.saveImageToPhotosAlbum({
        filePath: element,
      })
        .then((res) => {
          resolve(1);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
  return promises;
};

//临时图片路径
export const getTempFile = (url) => {
  return new Promise(function (resolve, reject) {
    Taro.downloadFile({
      url: url,
      success: function (res) {
        resolve(res.tempFilePath);
      },
      fail: function (err) {},
    });
  });
};

const PUSHTYPE = {
  GOODS: 0,
  GOODSINFO: 1,
  GOODSGROUP: 2,
  CATE: 3,
  STORE: 4,
  MARKETING: 5,
  PAGE: 6,
  ACCOUNT: 7,
  PROPERTY: 8,
  ORDER: 9,
  RETUN_ORDER: 10,
  DISTRIBUTE: 11,
  USERPAGE: 12,
};

/**
 * 消息中心跳转处理
 */
export const pageReplace = async function (data) {
  switch (data?.type) {
    case PUSHTYPE.GOODS:
      await Taro.navigateTo({
        url: `/pages/package-B/goods/goods-details/index?skuId=${data.skuId}`,
      });
      break;
    case PUSHTYPE.GOODSINFO:
      break;
    case PUSHTYPE.GOODSGROUP:
      break;
    case PUSHTYPE.CATE:
      await Taro.navigateTo({
        url: `/pages/package-B/goods/goods-list/index?cateId=${data.cateId}`,
      });
      break;
    case PUSHTYPE.STORE:
      return;
      await Taro.navigateTo({
        url: `/pages/package-A/store/store-main/index?storeId=${data.storeId}`,
      });
      break;
    case PUSHTYPE.MARKETING:
      if (data.node == 0) {
        await Taro.navigateTo({
          url: `/pages/package-B/goods/group-details/index?skuId=${data.skuId}`,
        });
      } else if (data.node == 1) {
        await Taro.navigateTo({
          url: `/pages/package-B/goods/goods-details/index?skuId=${data.skuId}`,
        });
      } else if (data.node == 2) {
        await Taro.navigateTo({
          url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${data.mid}`,
        });
      } else if (data.node == 3) {
        await Taro.navigateTo({
          url: `/pages/package-B/goods/combination-goods/index?skuId=${data.skuId}`,
        });
      }
      break;
    case PUSHTYPE.PAGE:
      await Taro.navigateTo({
        url: `/pages/package-B/x-site/page-link/index?pageType=${data.pageType}&pageCode=${data.pageCode}`,
      });
      break;
    case PUSHTYPE.USERPAGE:
      // history.push(data.wechatPath);
      await Taro.navigateTo({
        url: `${data.wechatPath}`,
      });
      break;
    case PUSHTYPE.PROPERTY:
      if (data.node == 0 || data.node == 1) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/my-coupon/index`,
        });
      } else if (data.node == 2 || data.node == 3 || data.node == 4) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/user-integral/index`,
        });
      } else if (data.node == 5) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/user/growth-value/index`,
        });
      } else if (data.node == 6) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/balance/account-detail/index`,
        });
      } else if (data.node == 7 || data.node == 8 || data.node == 9) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/balance/deposit/deposit-detail/index?drawCashId=${data.id}`,
        });
      }
      break;
    case PUSHTYPE.ORDER:
      if (data.xuanKuaTradeFlag) {
        if (__TARO_ENV === 'h5') {
          window.location.href = data.orderQueryUrl;
        } else {
          // Taro.setStorageSync('movieOrderDetail', data.orderQueryUrl);
          // await Taro.navigateTo({ url: `/pages/package-B/x-site/movie-order-detail/index` });
        }
      } else if (
        data.node == 0 ||
        data.node == 1 ||
        data.node == 2 ||
        data.node == 3 ||
        data.node == 4 ||
        data.node == 5
      ) {
        // await Taro.navigateTo({
        //   url: `/pages/package-C/order/order-detail/index?id=${data.id}`,
        // });
      } else if (data.node == 6) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/evaluate-center/index`,
        });
      } else if (data.node == 7) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/evaluate-drying/index?storeId=${data.storeId}&orderId=${data.tid}&goodsInfoId=${data.skuId}&evaluateType=0`,
        });
      } else if (data.node == 8) {
        await Taro.navigateTo({
          url: `/pages/package-A/customer/evaluate-drying/index?storeId=${data.storeId}&orderId=${data.tid}&goodsInfoId=${data.skuId}&evaluateType=2`,
        });
      } else if (data.node == 9 || data.node == 10 || data.node == 11 || data.node == 12) {
        await Taro.navigateTo({
          url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${data.id}`,
        });
      } else if (data.node == 13) {
        await Taro.navigateTo({
          url: `/pages/package-B/goods/goods-details/index?skuId=${data.skuId}`,
        });
      } else if (data.node == 14) {
        // await Taro.navigateTo({
        //   url: `/pages/package-C/order/order-detail/index?id=${data.id}`,
        // });
      }
      break;
    case PUSHTYPE.RETUN_ORDER:
      if (data.node == 0 || data.node == 1 || data.node == 2 || data.node == 3 || data.node == 4 || data.node == 5) {
        await Taro.navigateTo({
          url: `/pages/package-C/order/return-detail/index?id=${data.id}`,
        });
      }
      break;
    case PUSHTYPE.DISTRIBUTE:
      if (data.node == 0) {
        await Taro.navigateTo({
          url: `/pages/package-B/distribution/promote-order-list/index`,
        });
      } else {
        await Taro.navigateTo({
          url: `/pages/package-B/distribution/my-customer/index?tab=${'1'}`,
        });
      }
      break;
  }
};

//将url问好后面携带的参数转变成对象方便解析
export const searchToObj = (str: string): any => {
  if (!str) {
    return;
  }
  str = str.substr(1);
  let arr = str.split('&'),
    obj = {},
    newArr = [];
  arr.map(function (value, index, arr) {
    newArr = value.split('=');
    if (newArr[0] != undefined) {
      obj[newArr[0]] = newArr[1];
    }
  });
  return obj;
};

export const TODAY = moment(new Date()).format('YYYY/MM/DD');

export const YESTERDAY = moment(new Date()).add(-1, 'days').format('YYYY/MM/DD');
export const THISYEAR = moment(new Date()).format('YYYY');
export const TWOWEEKBEFORE = moment().subtract(13, 'days').format('YYYY-MM-DD');

export const recoverTime = function (orginTime) {
  let time = moment(orginTime).format('YYYY/MM/DD');
  if (time === this.TODAY) {
    return moment(orginTime).format('HH:mm');
  } else if (time === this.YESTERDAY) {
    return '昨天';
  } else if (moment(orginTime).format('YYYY') === this.THISYEAR) {
    return moment(orginTime).format('MM/DD');
  } else {
    return moment(orginTime).format('YY/MM/DD');
  }
};

//授权登录 获取微信用户信息
export const getUserInfo = async (e) => {
  const userInfo = e.detail.userInfo;
  await Taro.setStorageSync(cache.AUTH_INFO, {nickName: userInfo.nickName, headimgurl: userInfo.avatarUrl});
  await Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
};

/**
 * 省市区初始化
 */
export const addressInit = async () => {
  const dataList = Taro.getStorageSync('mini::addressInfo');
  if (!dataList || !dataList.provinces || !dataList.cities || !dataList.areas) {
    const {provinces, cities, areas} = await api.platformAddressController.initAddressJson();
    await Taro.setStorageSync('mini::addressInfo', {
      provinces,
      areas,
      cities,
    });
  }
};

/**校验名称和联系人*/
export const _testName = (name: string) => {
  if (name == '') {
    Taro.showToast({
      title: '请填写名称！',
    });
    return false;
  } else if (name.length < 2 || name.length > 15) {
    Taro.showToast({
      title: '名称为2-15个字符！',
    });
    return false;
  }
  return true;
};
export const _testBusinessNatureType = (businessNatureType: any) => {
  if (businessNatureType == '') {
    Taro.showToast({
      title: '请选择公司性质！',
    });
    return false;
  }
  return true;
};
//校验公司名称
export const _testEnterpriseName = (name: any) => {
  if (name == '') {
    Taro.showToast({
      title: '请填写公司名称！',
    });
    return false;
  } else if (name.length < 2 || name.length > 60) {
    Taro.showToast({
      title: '公司名称为2-60个字符！',
    });
    return false;
  } else if (!ValidConst.companyName.test(name)) {
    Taro.showToast({
      title: '公司名称仅支持中文、英文、数字及“_”、“-”、()、（）',
    });
    return false;
  }
  return true;
};
//校验社会信用代码
export const _testSocialCreditCode = (code: any) => {
  if (code == '') {
    Taro.showToast({
      title: '请填写统一社会信用代码！',
    });
    return false;
  } else if (code.length < 8 || code.length > 30) {
    Taro.showToast({
      title: '统一社会信用代码为8-30个字符！',
    });
    return false;
  } else if (!ValidConst.enterpriseSocialCreditCode.test(code)) {
    Taro.showToast({
      title: '统一社会信用代码仅支持大写英文和数字！',
    });
    return false;
  }
  return true;
};
//校验营业执照
export const _testBusinessLicenseUrl = (url: any) => {
  if (url == '') {
    Taro.showToast({
      title: '请上传营业执照！',
    });
    return false;
  }
  return true;
};

export function Base64() {
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const _keyStrUrl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
  this.encode = function (input) {
    return encodebase(input, _keyStr);
  };
  // public method for decoding
  this.decode = function (input) {
    return decodebase(input, _keyStr);
  };
  this.urlEncode = function (input) {
    //将/号替换为_  将+号替换为-  后端采用 new String(Base64.getUrlDecoder().decode(encrypted.getBytes())) 进行解码
    return encodebase(input, _keyStrUrl);
  };
  this.urlDecode = function (input) {
    //将_号替换为/ 将-号替换为+
    return decodebase(input, _keyStrUrl);
  };
  const encodebase = (input, _keyStr) => {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };
  const decodebase = (input, _keyStr) => {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  };
  // private method for UTF-8 encoding
  const _utf8_encode = (string) => {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  // private method for UTF-8 decoding
  const _utf8_decode = (utftext) => {
    let string = '';
    let i = 0;
    let c,
      c2,
      c3 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  };
}

export const logout = async () => {
  if(__TARO_ENV==='h5'){
    sessionStorage.removeItem(cache.CHANNEL_ENTERPRISE_ID);
  }
  Promise.all([
    api.loginBaseController.logout(),
    Taro.removeStorageSync(cache.CUSTOMER_INFO),
    Taro.removeStorageSync(cache.LOGIN_DATA),
    Taro.removeStorageSync('authInfo:token'),
    Taro.removeStorageSync(cache.IS_DISTRIBUTOR),
    Taro.removeStorageSync(cache.DISTRIBUTOR_FLAG),
    Taro.removeStorageSync(cache.INVITEE_ID),
    // Taro.removeStorageSync(cache.AUTH_INFO),
    Taro.removeStorageSync('mini::shopCartSku'),
    Taro.removeStorageSync('mini::shopCartMarketing'),
    Taro.removeStorageSync('wecatAuthParams'),
    Taro.removeStorageSync('historyKeyList'), //清空本地搜索记录
    Taro.removeStorageSync('mini::shopCardAddress'), //清空购物车地址
    Taro.removeStorageSync('mini::confirmAddress'), //清空订单确认页地址
    Taro.removeStorageSync('purchase:info'), //清空订单确认页地址
  ]);
  //退出登录将店铺精选的购物车角标设为0
  msg.emit('shopCart-C-num', 0);
  msg.emit('refresh-reward');
  Taro.setStorageSync('recommend-goods-list', '1');
  // await setShopCartNum(true);
  if (WMkit.needLogin()) {
    Taro.redirectTo({
      url: '/pages/package-A/login/login/index',
    });
    return;
  }

  if (__TARO_ENV === 'weapp') {
    if (WMkit.inviteeId() && WMkit.channelType() == '2') {
      await Taro.navigateBack();
    } else {
      Taro.removeStorageSync(cache.INVITEE_ID);
      Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
      await Taro.switchTab({
        url: '/pages/user-center/index',
      });
    }
  }

  const isOpenDistributor = await WMkit.isOpenDistributor(); //是否开启分销功能
  if (isOpenDistributor) {
    //tab变为奖励中心
    Taro?.setTabBarItem?.({
      index: 2,
      text: '奖励中心',
      iconPath: require('@/assets/image/tab/reward.png').default,
      selectedIconPath: require('@/assets/image/tab/reward-curr.png').default,
    });
  } else {
    // Taro?.setTabBarItem?.({
    //   index: 1,
    //   text: '分类',
    //   iconPath: require('@/assets/image/common/goods.png').default,
    //   selectedIconPath: require('@/assets/image/common/goods-curr.png').default,
    // });
    // Taro?.setTabBarItem?.({
    //   index: 2,
    //   text: '发现',
    //   iconPath: require('@/assets/image/tab/material.png').default,
    //   selectedIconPath: require('@/assets/image/tab/material-red.png').default,
    // });
  }

  if (__TARO_ENV === 'h5') {
    if (WMkit.inviteeId() && WMkit.channelType() == '2') {
      await Taro.navigateTo({
        url: '/pages/package-B/distribution/store/social-c/shop-my-c/index',
      });
    } else {
      Taro.removeStorageSync(cache.INVITEE_ID);
      Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
      await Taro.switchTab({
        url: '/pages/user-center/index',
      });
    }
  }
};

interface Location {
  addrId: string;
  addrName: string;
  cityList?: Location[];
  districtList?: Location[];
}

/**Location[] => string[]   江苏省/南京市（雨花台区，鼓楼区，建邺区，江宁区，
 * @param data
 * @param parentNames
 * @returns
 */
export function convertToFormattedString(data, parentNames = []) {
  const result = [];
  for (const location of data) {
    const currentNames = [...parentNames, location.addrName];
    if (location.cityList) {
      const isExistDistrict = location.cityList.some((city) => city.districtList);
      if (isExistDistrict) {
        const cities = convertToFormattedString(location.cityList, currentNames);
        result.push(...cities);
      } else {
        const cities = location.cityList.map((city) => city.addrName).join(', ');
        result.push(`${currentNames.join('/')} (${cities})`);
      }
    } else if (location.districtList) {
      const isExistStreet = location.districtList.some((district) => district.streetList);
      if (isExistStreet) {
        const districts = convertToFormattedString(location.districtList, currentNames);
        result.push(...districts);
      } else {
        const districts = location.districtList.map((district) => district.addrName).join(', ');
        result.push(`${currentNames.join('/')} (${districts})`);
      }
    } else if (location.streetList) {
      const streets = location.streetList.map((street) => street.addrName).join(', ');
      result.push(`${currentNames.join('/')} (${streets})`);
    } else {
      result.push(currentNames.join('/'));
    }
  }
  return result;
}

export function getAddressInfoStr(address: {
  provinceName: string;
  cityName: string;
  areaName: string;
  streetName: string;
  houseNum: string;
  needComplete: boolean;
  deliveryAddress: string;
}) {
  const str1 = address.provinceName === address.cityName ? address.cityName : address.provinceName + address.cityName;
  const str2 = `${str1||''}${address.areaName ||''}${address.streetName || ''}`;
  return `${str2 || ''}${address.houseNum || address.deliveryAddress||''}`;
}
/**
 * 处理地址拼接
 * @param item
 */
export function getAddressStr(item: any) {
  if (!item.pname) return '';
  // 省市
  const str1 = item.pname === item.cityname ? item.cityname : item.pname + item.cityname;
  // 区
  const str2 = item.adname === item.address ? item.address : item.adname + item.address;
  return str1 + str2;
}

/**
 * 获取当前用户所在的企业信息
 */
export async function getEnterpriseInfo(): Promise<{
  /**
   * 0. 平台商城分类页    1  自定义页面
   */
  categoryPageSetting: number;
  mofangConfig: string;
}> {
  //  获取当前用户所在的企业id
  let currId = '-1';
  if (isLogin()) {
    currId = await api.customerBaseController.getUsedEnterpriseId();
  } else {
    if (__TARO_ENV === 'h5') {
      // h5 投放携带的企业id
      const id = sessionStorage.getItem(cache.CHANNEL_ENTERPRISE_ID);
      if (id) currId = id;
    }
  }
  if (currId === '-1') {
    return {
      categoryPageSetting: 0,
      mofangConfig: null,
    };
  }
  const res = await api.customerBaseController.getEnterpriseInfoById(currId);
  return res.enterpriseInfoVO;
}
// 判断是否是IOS设备的isSafari浏览器 需要结合 getSystemInfo组合判断
export function isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform;
  const iosPlatforms = ['iPad', 'iPhone', 'iPod'];
  if (
    ua.indexOf('applewebkit') > -1 &&
    ua.indexOf('mobile') > -1 &&
    ua.indexOf('safari') > -1 &&
    ua.indexOf('linux') === -1 &&
    ua.indexOf('android') === -1 &&
    ua.indexOf('chrome') === -1 &&
    ua.indexOf('ios') === -1 &&
    ua.indexOf('browser') === -1 &&
    iosPlatforms.includes(platform)
  ) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumber (phone:string) {
  // 1开头后面跟10位数字
  return /^1[3456789]\d{9}$/.test(phone);
}