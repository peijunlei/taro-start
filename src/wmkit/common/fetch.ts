import {AsyncResult} from '@/typings/index';
import Taro from '@tarojs/taro';
import {WMkit} from "wmkit";
import config from "@/service/config";

/**
 * 拼装完整host
 * @param host
 * @param input
 */
interface IFetch {
  url?: string;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  body?: Object;
  contentType?: string;
}

async function Common<T = object>(params: IFetch): Promise<AsyncResult<T>> {
  let {url, body, method} = params;
  let methodUrl = `${WMkit.prefixUrl(config.host)}/` + url; // prefixHost(host, url);
  let contentType = 'application/json; charset=utf-8';
  let token = {data: ''};
  try {
    token.data = Taro.getStorageSync('authInfo:token');
  } catch (err) {}

  let Charset = 'utf8';
  const header = {
    // platform: 'wechat',
    // Charset,
    'Content-Type': contentType,
    // 'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token.data || '', //SSO登录信息校验，必传
  };
  url = methodUrl;

  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      data: body,
      header,
      method,
      success: async (res) => {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 400) {
          const json = (await res.data) as AsyncResult<T>;
          const cardCode = ['K-050415', 'K-050414', 'K-080406', 'K-080405', 'K-080401']; //充值卡失效code码
          let {message, context, code} = json;

          if (__DEV__ && code !== 'K-000000') {
            if (code !== 'K-050117' && code !== 'K-999999' && !cardCode.includes(code)) {
              Taro.showToast({
                title: `msg:${message},调用接口报错:${url},code[${code}]`,
                icon: 'none',
                duration: 10000,
              });
            }
            // AntdMsg.error(`调用接口报错:${url},请联系相关人员处理! code[${code}] ,msg:${message}`,20);
          }
          if (code === 'K-000015') {
            // location.href='#/account/login';
            Taro.redirectTo({
              url: '/pages/package-A/login/login/index',
            });
          } else if (code !== 'K-000000') {
            if (code !== 'K-050117' && code !== 'K-999999' && !cardCode.includes(code)) {
              //商品失效和优惠券失效
              Taro.showToast({
                title: `${message}`,
                icon: 'none',
                duration: 1000,
              });
            }
            reject(json); //抛出错误信息
            // throw new Error(content);
          }
          resolve(json);
        } else {
          // AntdMsg.error(`发生未知异常错误!!`,20);
          throw new Error('发生未知异常错误!!');
        }
      },
      fail: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
}

export default function Fetch<T = object>(url: string, params: IFetch): Promise<AsyncResult<T>> {
  const method = params.method;
  switch (method) {
    case 'GET':
      return get<T>(url, params.body);
    case 'POST':
      return post<T>(url, params.body);
    case 'PUT':
      return put<T>(url, params.body);
    case 'DELETE':
      return deleteF<T>(url, params.body);
    default:
      return get<T>(url, params.body);
  }
}

const MyFetch = <T = object>(params: IFetch) => {
  return Common<T>(params);
};

export function get<T = any>(url, data) {
  return MyFetch<T>({
    url,
    method: 'GET',
  });
}

export function put<T = any>(url, body) {
  return MyFetch<T>({
    url,
    method: 'PUT',
    body,
  });
}

export function post<T = any>(url, body) {
  return MyFetch<T>({
    url,
    method: 'POST',
    body,
  });
}

export function deleteF<T = any>(url, body) {
  return MyFetch<T>({
    url,
    method: 'DELETE',
    body,
  });
}

// export default { fetch };
