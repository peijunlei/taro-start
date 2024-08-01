import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerBankInfoController';

/**
 *
 * 绑定的银行卡信息
 *
 */
async function addBankInfoCard(
  customerBankInfoAddRequest: IAddBankInfoCardCustomerBankInfoAddRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/customer/bank/addBankInfoCard',

    {
      ...customerBankInfoAddRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询用户绑定的银行卡信息
 *
 */
async function queryBoundedBankAllInfo(): Promise<CustomerBankInfoResponse> {
  let result = await sdk.get<CustomerBankInfoResponse>(
    '/customer/bank/all/detail-for-draw-cash',

    {},
  );
  return result.context;
}

/**
 *
 * 校验银行卡信息
 *
 */
async function checkBankCardInfo(
  bankNum: ICheckBankCardInfoBankNumReq,
  mobile: ICheckBankCardInfoMobileReq,
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/customer/bank/checkBankCardInfo/{mobile}/{bankNum}'

      .replace('{bankNum}', bankNum + '')

      .replace('{mobile}', mobile + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询用户绑定的银行卡信息
 *
 */
async function queryBoundedBankInfo(): Promise<
  CustomerBankInfoForDrawCashResponse
> {
  let result = await sdk.get<CustomerBankInfoForDrawCashResponse>(
    '/customer/bank/detail-for-draw-cash',

    {},
  );
  return result.context;
}

/**
 *
 * 绑定的银行卡信息
 *
 */
async function removeBankInfoCard(
  code: IRemoveBankInfoCardCodeReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/customer/bank/remove/bind/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 发送解绑第三方账号验证码
 *
 */
async function sendUnbindThirdVerifyCode(
  customerAccount: ISendUnbindThirdVerifyCodeCustomerAccountReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/customer/bank/sendUnbindThirdVerifyCode/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 发送验证码
 *
 */
async function sendVerifyCode(
  customerAccount: ISendVerifyCodeCustomerAccountReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/customer/bank/sendVerifyCode/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

export default {
  addBankInfoCard,

  queryBoundedBankAllInfo,

  checkBankCardInfo,

  queryBoundedBankInfo,

  removeBankInfoCard,

  sendUnbindThirdVerifyCode,

  sendVerifyCode,
};

/**
 * bankNum
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckBankCardInfoBankNumReq".
 */
export type ICheckBankCardInfoBankNumReq = string;
/**
 * mobile
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckBankCardInfoMobileReq".
 */
export type ICheckBankCardInfoMobileReq = string;
/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRemoveBankInfoCardCodeReq".
 */
export type IRemoveBankInfoCardCodeReq = string;
/**
 * customerAccount
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendUnbindThirdVerifyCodeCustomerAccountReq".
 */
export type ISendUnbindThirdVerifyCodeCustomerAccountReq = string;
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
 * via the `definition` "CustomerBankInfoAddRequest".
 */
export interface CustomerBankInfoAddRequest {
  /**
   * 银行预留手机号
   */
  bankMobile?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
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
 * via the `definition` "BaseResponse«CustomerBankInfoResponse»".
 */
export interface BaseResponseCustomerBankInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerBankInfoResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerBankInfoResponse {
  customerBankInfoVO?: CustomerBankInfoVO;
  [k: string]: any;
}
/**
 * 会员绑定银行卡信息信息
 */
export interface CustomerBankInfoVO {
  /**
   * 银行预留手机号
   */
  bankMobile?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * customerBankNoId
   */
  customerBankNoId?: string;
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBankInfoResponse".
 */
export interface CustomerBankInfoResponse1 {
  customerBankInfoVO?: CustomerBankInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBankInfoVO".
 */
export interface CustomerBankInfoVO1 {
  /**
   * 银行预留手机号
   */
  bankMobile?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * customerBankNoId
   */
  customerBankNoId?: string;
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«Map«string,object»»".
 */
export interface BaseResponseMapStringObject {
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
 * via the `definition` "BaseResponse«CustomerBankInfoForDrawCashResponse»".
 */
export interface BaseResponseCustomerBankInfoForDrawCashResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerBankInfoForDrawCashResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerBankInfoForDrawCashResponse {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBankInfoForDrawCashResponse".
 */
export interface CustomerBankInfoForDrawCashResponse1 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddBankInfoCardCustomerBankInfoAddRequestReq".
 */
export interface IAddBankInfoCardCustomerBankInfoAddRequestReq {
  /**
   * 银行预留手机号
   */
  bankMobile?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行卡号
   */
  bankNo?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export interface Undefined {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
