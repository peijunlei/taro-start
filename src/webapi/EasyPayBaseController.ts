import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'EasyPayBaseController';

/**
 *
 * 易生支付回调
 *
 */
async function consultOrderEasyPayCallBack(): Promise<unknown> {
  let result = await sdk.post(
    '/pay/consult/order/easyPayCallBack',

    {},
  );
  return result.context;
}

/**
 *
 * 推送咨询订单给易生支付
 *
 */
async function consultOrderPay(
  oid: IConsultOrderPayOidReq,
): Promise<EasyPayCreateOrderResponse> {
  let result = await sdk.get<EasyPayCreateOrderResponse>(
    '/pay/consultOrderPay/{oid}'.replace('{oid}', oid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 推送订单给易生支付
 *
 */
async function createDirectPayByUser(
  tid: ICreateDirectPayByUserTidReq,
): Promise<EasyPayCreateOrderResponse> {
  let result = await sdk.get<EasyPayCreateOrderResponse>(
    '/pay/createDirectPay/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 易生支付回调
 *
 */
async function easyPayCallBack(): Promise<unknown> {
  let result = await sdk.post(
    '/pay/easyPayCallBack',

    {},
  );
  return result.context;
}

/**
 *
 * 易生支付回调,前台回调页面
 *
 */
async function frontUrlCallBack(
  tid: IFrontUrlCallBackTidReq,
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/frontUrlCallBack/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 易生支付回调,前台回调页面
 *
 */
async function frontUrlCallBack(
  tid: IFrontUrlCallBackTidReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/frontUrlCallBack/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询易生支付内订单
 *
 */
async function queryOrderFromEasyPay(
  tid: IQueryOrderFromEasyPayTidReq,
): Promise<EasyPayQueryOrderResponse> {
  let result = await sdk.get<EasyPayQueryOrderResponse>(
    '/pay/queryOrderFromEasyPay/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询易生支付内订单
 *
 */
async function refundOrderToEasyPAy(
  tid: IRefundOrderToEasyPAyTidReq,
): Promise<EasyPayRefundOrderResponse> {
  let result = await sdk.get<EasyPayRefundOrderResponse>(
    '/pay/refundOrderToEasyPay/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

export default {
  consultOrderEasyPayCallBack,

  consultOrderPay,

  createDirectPayByUser,

  easyPayCallBack,

  frontUrlCallBack,

  frontUrlCallBack,

  queryOrderFromEasyPay,

  refundOrderToEasyPAy,
};

/**
 * oid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IConsultOrderPayOidReq".
 */
export type IConsultOrderPayOidReq = string;
/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICreateDirectPayByUserTidReq".
 */
export type ICreateDirectPayByUserTidReq = string;
/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFrontUrlCallBackTidReq".
 */
export type IFrontUrlCallBackTidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryOrderFromEasyPayTidReq".
 */
export type IQueryOrderFromEasyPayTidReq = string;
/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRefundOrderToEasyPAyTidReq".
 */
export type IRefundOrderToEasyPAyTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EasyPayCreateOrderResponse»".
 */
export interface BaseResponseEasyPayCreateOrderResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EasyPayCreateOrderResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EasyPayCreateOrderResponse {
  /**
   * 收银台地址
   */
  cashierUrl?: string;
  /**
   * 是否推送成功
   */
  isSuccessFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EasyPayCreateOrderResponse".
 */
export interface EasyPayCreateOrderResponse1 {
  /**
   * 收银台地址
   */
  cashierUrl?: string;
  /**
   * 是否推送成功
   */
  isSuccessFlag?: boolean;
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EasyPayQueryOrderResponse»".
 */
export interface BaseResponseEasyPayQueryOrderResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EasyPayQueryOrderResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EasyPayQueryOrderResponse {
  /**
   * 订单金额
   */
  amount?: number;
  /**
   * 返回码
   */
  code?: string;
  /**
   * 返回信息
   */
  msg?: string;
  /**
   * 订单号
   */
  outTradeNo?: string;
  /**
   * 订单状态
   */
  tradeStatus?: string;
  /**
   * 订单类型
   */
  tradeType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EasyPayQueryOrderResponse".
 */
export interface EasyPayQueryOrderResponse1 {
  /**
   * 订单金额
   */
  amount?: number;
  /**
   * 返回码
   */
  code?: string;
  /**
   * 返回信息
   */
  msg?: string;
  /**
   * 订单号
   */
  outTradeNo?: string;
  /**
   * 订单状态
   */
  tradeStatus?: string;
  /**
   * 订单类型
   */
  tradeType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EasyPayRefundOrderResponse»".
 */
export interface BaseResponseEasyPayRefundOrderResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EasyPayRefundOrderResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EasyPayRefundOrderResponse {
  /**
   * 返回码
   */
  code?: string;
  /**
   * 返回信息
   */
  msg?: string;
  /**
   * 交易流水
   */
  tradeNo?: string;
  /**
   * 订单状态
   */
  tradeStatus?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EasyPayRefundOrderResponse".
 */
export interface EasyPayRefundOrderResponse1 {
  /**
   * 返回码
   */
  code?: string;
  /**
   * 返回信息
   */
  msg?: string;
  /**
   * 交易流水
   */
  tradeNo?: string;
  /**
   * 订单状态
   */
  tradeStatus?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
