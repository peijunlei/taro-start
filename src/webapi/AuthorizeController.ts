import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'AuthorizeController';

/**
 *
 * 解析手机号码
 *
 */
async function getPhoneNum(request: IGetPhoneNumRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/authorize/getPhoneNum',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getPhoneNum,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WechatAuthRequest".
 */
export interface WechatAuthRequest {
  /**
   * 微信临时授权码
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  sessionKey?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPhoneNumRequestReq".
 */
export interface IGetPhoneNumRequestReq {
  /**
   * 微信临时授权码
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  sessionKey?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
