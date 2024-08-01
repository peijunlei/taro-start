import {AsyncResult} from '@/typings/index';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';
import {cache} from 'config';
// import { message as AntdMsg } from "antd";
// import config from "@/config";
//
import config from '@/service/config';
import * as sentry from 'sentry-mina';
/**
 * 拼装完整host
 * @param host
 * @param input
 */
// function prefixHost(host: string, input: string): string {
//   if (isString(input)) {
//     const hasPrefix = /^https?:\/\//.test(input as string);
//     return hasPrefix ? input : config[host as IApi] + input;
//   } else {
//     console.error("host,url错误");
//   }
// }

interface IFetch {
  host: string;
  url: string;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  data?: Object;
  contentType?: string;
}

async function Common<T = object>(params: IFetch): Promise<AsyncResult<T>> {
  let {host, url, data, method} = params;
  let methodUrl = host + url; // prefixHost(host, url);
  let contentType = 'application/json; charset=utf-8';
  let token = {data: ''};
  try {
    token.data = Taro.getStorageSync('authInfo:token') || Taro.getStorageSync(cache.ACCOUNT_TOKEN);
  } catch (err) {}

  let Charset = 'utf8';

  const channelType = WMkit.channelType() ? WMkit.channelType() : '1';

  const distributeChannel = {
    channelType: parseInt(channelType),
    inviteeId: WMkit.inviteeId() || null,
  };

  const header = {
    // platform: 'wechat',
    // Charset,
    'Content-Type': contentType,
    // 'Access-Control-Allow-Origin': '*'
    terminal: __TARO_ENV == 'h5' ? 'H5' : 'MINIPROGRAM',
    Authorization: 'Bearer ' + token.data || '', //SSO登录信息校验，必传
    'distribute-channel': JSON.stringify(distributeChannel),
  };
  url = methodUrl;

  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      data,
      header,
      method,
      success: async (res) => {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 400) {
          const json = (await res.data) as AsyncResult<T>;
          let {message, context, code} = json;

          //优惠券已领取
          if (code === 'K-080205') {
            Taro.showToast({
              title: message,
              icon: 'none',
              duration: 10000,
            });
            resolve(json);
          }

          if (code !== 'K-000000') {
            if (
              ![
                'K-000119',
                'K-050117',
                'K-999999',
                'K-050003',
                'K-130013',
                'K-180001',
                'K-030001',
                'K-050205',
                'K-130012',
                'K-100203',
                'K-050317',
                'K-600019',
                'K-050116',
                'K-180001',
                'K-050201',
                'K-170003',
                'K-050312',
                'K-600018',
                'K-000001',
                'K-081012',
                'K-081011',
                'K-081010',
                'K-081013',
                'K-081014',
                'K-081015',
                'K-050144',
                'K-080041',
                'K-080050',
                'K-080051',
                'K-080052',
                'K-050178',
                'K-080157',
                'K-130015',
                'K-050160',
                'K-130011'
              ].includes(code)
            ) {
              Taro.showToast({
                title: message,
                icon: 'none',
                duration: 2000,
              });
            }
          }
          //支付密码输入错误
          if (code === 'K-010204') {
            reject(json);
          }
          if (code === 'K-000015') {
            // location.href='#/account/login';
            Taro.redirectTo({
              url: '/pages/package-A/login/login/index',
            });
          } else if (code !== 'K-000000') {
            reject(json); //抛出错误信息
            Taro.getEnv() === Taro.ENV_TYPE.WEB && sentry.captureException(new Error(json.message));
          }
          resolve(json);
        } else {
          // AntdMsg.error(`发生未知异常错误!!`,20);
          Taro.getEnv() === Taro.ENV_TYPE.WEB && sentry.captureException('发生未知异常错误!!');
          throw new Error('发生未知异常错误!!');
        }
      },
      fail: (err) => {
        console.error(err);
        reject(err);
        Taro.getEnv() === Taro.ENV_TYPE.WEB && sentry.captureException(err);
      },
    });
  });
}

export function fetch<T = object>(params: IFetch): Promise<AsyncResult<T>> {
  return Common<T>(params);
}

let host = `${WMkit.prefixUrl(config.host)}`;

const MyFetch = <T = object>(params: IFetch) => {
  return Common<T>(params);
};

export function patch<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'PATCH',
  });
}

export function head<T = any>(url, data, option = {host}) {
  //TODO 把当前的权限 记录下来.
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'HEAD',
  });
}

export function options<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'OPTIONS',
    data,
  });
}

export function get<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'GET',
  });
}

export function put<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'PUT',
    data,
  });
}

export function post<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'POST',
    data,
  });
}

export function deleteF<T = any>(url, data, option = {host}) {
  return MyFetch<T>({
    host: option.host,
    url,
    method: 'DELETE',
    data,
  });
}

// export default { fetch };
