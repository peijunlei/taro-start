import * as sdk from './fetch';

const controllerName = 'ThirdLoginController';

/**
 *
 * 绑定第三方账号 发送验证码
 *
 */
async function sendCode(id: ISendCodeIdReq, phone: ISendCodePhoneReq): Promise<ThirdLoginSendCodeResponse> {
  let result = await sdk.get<ThirdLoginSendCodeResponse>(
    '/third/login/bind/sendCode/{phone}/{id}'

      .replace('{id}', id + '')

      .replace('{phone}', phone + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询登录用户关联账号的状态
 *
 */
async function queryLinkedAccountFlags(): Promise<LinkedAccountFlagsQueryResponse> {
  let result = await sdk.get<LinkedAccountFlagsQueryResponse>(
    '/third/login/linked-account-flags',

    {},
  );
  return result.context;
}

/**
 *
 * 解绑
 *
 */
async function removeBind_(thirdLoginType: IRemoveBind_ThirdLoginTypeReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/third/login/remove/bind/{thirdLoginType}'.replace('{thirdLoginType}', thirdLoginType + ''),

    {},
  );
  return result.context;
}

export default {
  sendCode,

  queryLinkedAccountFlags,

  removeBind_,
};

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendCodeIdReq".
 */
export type ISendCodeIdReq = string;
/**
 * 手机号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendCodePhoneReq".
 */
export type ISendCodePhoneReq = string;
/**
 * 登录方式
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRemoveBind_ThirdLoginTypeReq".
 */
export type IRemoveBind_ThirdLoginTypeReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ThirdLoginSendCodeResponse»".
 */
export interface BaseResponseThirdLoginSendCodeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ThirdLoginSendCodeResponse;
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
 * 内容
 */
export interface ThirdLoginSendCodeResponse {
  /**
   * 是否注册
   */
  isRegister?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ThirdLoginSendCodeResponse".
 */
export interface ThirdLoginSendCodeResponse1 {
  /**
   * 是否注册
   */
  isRegister?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«LinkedAccountFlagsQueryResponse»".
 */
export interface BaseResponseLinkedAccountFlagsQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LinkedAccountFlagsQueryResponse;
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
 * 内容
 */
export interface LinkedAccountFlagsQueryResponse {
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 微信绑定状态
   */
  wxFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LinkedAccountFlagsQueryResponse".
 */
export interface LinkedAccountFlagsQueryResponse1 {
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 微信绑定状态
   */
  wxFlag?: boolean;
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

//create by moon https://github.com/creasy2010/moon
