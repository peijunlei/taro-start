import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export function $$alert(title) {
  Taro.showToast({
    title: title + '',
    icon: 'none',
    duration: 2000,
  });
}

export function ifLogin() {
  return !!Taro.getStorageSync('authInfo:token');
}

//登录信息加密传输
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

type HashUrl = string;

export function getHashParam<T>(search: HashUrl): T {
  let entrys = search.replace(/.*\?/, '').split('&');

  let result: any = {};

  entrys.forEach((item) => {
    let [key, value] = item.split('=');
    result[key] = decodeURIComponent(value);
  });
  return result;
}

interface IRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

/**
 * 通过指定className获取其DOM元素高度
 * @param node
 * @returns
 */
export const getClassNameHeight = async (node: string): Promise<number> => {
  const result = await getClassNameInfoMap(node);
  return result?.height ?? 0;
};

export const getDeliverFormat = (date, start, end) => {
  const str1 = dayjs(date).format('YYYY年M月D日');
  const s = start < 10 ? `0${start}` : start;
  const e = end < 10 ? `0${end}` : end;
  return `${str1} ${s}:00 - ${e}:00`;
};

/**
 * 通过指定className获取其DOM元素信息
 * @param node
 * @returns
 */
export const getClassNameInfoMap = async (node: string, index?: number): Promise<Partial<IRect>> => {
  const i = index ?? 0;
  const result = await getClassNameInfoList(node);
  return result?.[i] || {};
};

/**
 * 通过指定className获取其所有DOM元素信息
 * @param node
 * @returns
 */
export const getClassNameInfoList = (node: string): Promise<Array<IRect>> => {
  const query = Taro.createSelectorQuery();
  return new Promise((resolve) => {
    if (!node) {
      return resolve([]);
    }
    query
      .select(node)
      .boundingClientRect()
      .exec((rect) => {
        if (!Array.isArray(rect)) {
          return resolve([]);
        }
        resolve(rect);
      });
  });
};
