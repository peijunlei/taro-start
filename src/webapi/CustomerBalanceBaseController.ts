import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerBalanceBaseController';

/**
 *
 * APP - 设置/忘记支付密码
 *
 */
async function setPayPassword(
  balancePayPasswordRequest: ISetPayPasswordBalancePayPasswordRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/app/pay/pwd',

    {
      ...balancePayPasswordRequest,
    },
  );
  return result.context;
}

/**
 *
 * APP - 设置支付秘密时验证,进入下一步
 *
 */
async function validateCode(balancePayPasswordRequest: IValidateCodeBalancePayPasswordRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/app/validate/code',

    {
      ...balancePayPasswordRequest,
    },
  );
  return result.context;
}

/**
 *
 * APP - 设置支付密码或忘记支付密码时发送验证码
 *
 */
async function sendPayVerifyCode(request: ISendPayVerifyCodeRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/app/verify/code',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * H5 - 设置支付密码或忘记支付密码时发送验证码
 *
 */
async function balancePayPassword(request: IBalancePayPasswordRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/balancePayPassword',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 校验会员输入支付密码是否正确
 *
 */
async function checkCustomerPayPwd(request: ICheckCustomerPayPwdRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/checkCustomerPayPwd',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 校验会员支付密码是否可用
 *
 */
async function isPayPwdValid(): Promise<unknown> {
  let result = await sdk.post(
    '/isPayPwdValid',

    {},
  );
  return result.context;
}

/**
 *
 * H5 - 设置/忘记支付密码
 *
 */
async function passwordByForgot(
  balancePayPasswordRequest: IPasswordByForgotBalancePayPasswordRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/payPasswordByForgot',

    {
      ...balancePayPasswordRequest,
    },
  );
  return result.context;
}

/**
 *
 * H5 - 设置支付秘密时验证,进入下一步
 *
 */
async function validatePayCode(
  balancePayPasswordRequest: IValidatePayCodeBalancePayPasswordRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/validatePayPassword',

    {
      ...balancePayPasswordRequest,
    },
  );
  return result.context;
}

export default {
  setPayPassword,

  validateCode,

  sendPayVerifyCode,

  balancePayPassword,

  checkCustomerPayPwd,

  isPayPwdValid,

  passwordByForgot,

  validatePayCode,
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
 * via the `definition` "BalancePayPasswordRequest".
 */
export interface BalancePayPasswordRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
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
 * via the `definition` "CustomerCheckPayPasswordRequest".
 */
export interface CustomerCheckPayPasswordRequest {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 密码
   */
  payPassword?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISetPayPasswordBalancePayPasswordRequestReq".
 */
export interface ISetPayPasswordBalancePayPasswordRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IValidateCodeBalancePayPasswordRequestReq".
 */
export interface IValidateCodeBalancePayPasswordRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendPayVerifyCodeRequestReq".
 */
export interface ISendPayVerifyCodeRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IBalancePayPasswordRequestReq".
 */
export interface IBalancePayPasswordRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckCustomerPayPwdRequestReq".
 */
export interface ICheckCustomerPayPwdRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 密码
   */
  payPassword?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPasswordByForgotBalancePayPasswordRequestReq".
 */
export interface IPasswordByForgotBalancePayPasswordRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IValidatePayCodeBalancePayPasswordRequestReq".
 */
export interface IValidatePayCodeBalancePayPasswordRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
