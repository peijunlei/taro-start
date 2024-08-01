import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CompanyController';

/**
 *
 * 供应商注册验证验证码
 *
 */
async function register(
  loginRequest: IRegisterLoginRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/company/register',

    {
      ...loginRequest,
    },
  );
  return result.context;
}

/**
 *
 * 供应商注册时发送验证码
 *
 */
async function sendVerifyCode(
  account: ISendVerifyCodeAccountReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/company/verify-code/{account}'.replace('{account}', account + ''),

    {},
  );
  return result.context;
}

export default {
  register,

  sendVerifyCode,
};

/**
 * 手机号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifyCodeAccountReq".
 */
export type ISendVerifyCodeAccountReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EmployeeLoginRequest".
 */
export interface EmployeeLoginRequest {
  /**
   * 账号
   */
  account?: string;
  /**
   * 授权码
   */
  code?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 回调地址
   */
  redirectUri?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse".
 */
export interface BaseResponse {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
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
 * via the `definition` "IRegisterLoginRequestReq".
 */
export interface IRegisterLoginRequestReq {
  /**
   * 账号
   */
  account?: string;
  /**
   * 授权码
   */
  code?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 回调地址
   */
  redirectUri?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
