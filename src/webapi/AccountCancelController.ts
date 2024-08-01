import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'AccountCancelController';

/**
 *
 * 账户注销API-检查会员账户
 *
 */
async function check(): Promise<AccountCancelCheckResponse> {
  let result = await sdk.get<AccountCancelCheckResponse>(
    '/account/cancel/check',

    {},
  );
  return result.context;
}

/**
 *
 * 账户注销API-执行注销账户
 *
 */
async function execute(
  code: IExecuteCodeReq,
): Promise<AccountCancelExecuteResponse> {
  let result = await sdk.get<AccountCancelExecuteResponse>(
    '/account/cancel/execute/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 发送解绑验证码
 *
 */
async function sendVerifyCode(
  customerAccount: ISendVerifyCodeCustomerAccountReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/account/cancel/sendVerifyCode/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

export default {
  check,

  execute,

  sendVerifyCode,
};

/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExecuteCodeReq".
 */
export type IExecuteCodeReq = string;
/**
 * customerAccount
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifyCodeCustomerAccountReq".
 */
export type ISendVerifyCodeCustomerAccountReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AccountCancelCheckResponse»".
 */
export interface BaseResponseAccountCancelCheckResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AccountCancelCheckResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AccountCancelCheckResponse {
  checkFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AccountCancelCheckResponse".
 */
export interface AccountCancelCheckResponse1 {
  checkFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AccountCancelExecuteResponse»".
 */
export interface BaseResponseAccountCancelExecuteResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AccountCancelExecuteResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AccountCancelExecuteResponse {
  accountCancelFlag?: boolean;
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AccountCancelExecuteResponse".
 */
export interface AccountCancelExecuteResponse1 {
  accountCancelFlag?: boolean;
  message?: string;
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

//create by moon https://github.com/creasy2010/moon
