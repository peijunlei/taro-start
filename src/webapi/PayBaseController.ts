import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PayBaseController';

/**
 *
 * 授信支付校验
 *
 */
async function creditCheck(price: ICreditCheckPriceReq): Promise<unknown> {
  let result = await sdk.post<unknown>('/pay/creditCheck/{price}'.replace('{price}', price + ''), {});
  return result;
}

/**
 *
 * 授信支付
 *
 */
async function creditPay(payCommonRequest: IBalancePayPayCommonRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>('/pay/creditPay', {
    ...payCommonRequest,
  });
  return result;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingHEAD(request: IDefaultPayBatchUsingHEADRequestReq): Promise<unknown> {
  let result = await sdk.head(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatch(request: IDefaultPayBatchRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatch_(request: IDefaultPayBatch_RequestReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingOPTIONS(request: IDefaultPayBatchUsingOPTIONSRequestReq): Promise<unknown> {
  let result = await sdk.options(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingPATCH(request: IDefaultPayBatchUsingPATCHRequestReq): Promise<unknown> {
  let result = await sdk.patch(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询在线支付是否开启
 *
 */
async function queryGatewayIsOpen(type: IQueryGatewayIsOpenTypeReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/gateway/isopen/{type}'.replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingHEAD(): Promise<PayGatewayConfigResponse> {
  let result = await sdk.head<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfig(): Promise<PayGatewayConfigResponse> {
  let result = await sdk.put<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfig_(): Promise<PayGatewayConfigResponse> {
  let result = await sdk.deleteF<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingOPTIONS(): Promise<PayGatewayConfigResponse> {
  let result = await sdk.options<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingPATCH(): Promise<PayGatewayConfigResponse> {
  let result = await sdk.patch<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询支付记录状态
 *
 */
async function getRecordStatus(tid: IGetRecordStatusTidReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/record/status/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取授信配置
 *
 */
async function getCreditConfig(): Promise<PayGatewayVO> {
  let result = await sdk.get<PayGatewayVO>(
    '/pay/getCreditConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 授信还款支付前校验是否已支付成功
 *
 */
async function checkCreditRepayPayState(repayCode: ICheckCreditRepayPayStateRepayCodeReq): Promise<unknown> {
  let result = await sdk.get(
    '/pay/credit-repay/check/{repayCode}'.replace('{repayCode}', repayCode + ''),

    {},
  );
  return result.context;
}

export default {
  creditCheck,

  creditPay,

  defaultPayBatch,

  defaultPayBatchUsingHEAD,

  defaultPayBatch_,

  defaultPayBatchUsingOPTIONS,

  defaultPayBatchUsingPATCH,

  queryGatewayIsOpen,

  queryUnionB2bConfig,

  queryUnionB2bConfigUsingHEAD,

  queryUnionB2bConfig_,

  queryUnionB2bConfigUsingOPTIONS,

  queryUnionB2bConfigUsingPATCH,

  getRecordStatus,

  getCreditConfig,

  checkCreditRepayPayState,
};

/**
 * 还款单号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckCreditRepayPayStateRepayCodeReq".
 */
export type ICheckCreditRepayPayStateRepayCodeReq = string;

export type ICreditCheckPriceReq = number;

export interface IBalancePayPayCommonRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 支付渠道id
   */
  channelItemId: number;
  /**
   * 微信支付时必传，付款用户在商户 appid 下的唯一标识
   */
  openId?: string;
  /**
   * 唤起支付宝时使用
   */
  origin?: string;
  /**
   * 父订单id，用于多笔订单合并支付场景，合并支付时不能为空
   */
  parentTid: string;
  /**
   * 支付密码
   */
  payPassword: string;
  /**
   * 商户id-boss端取默认值
   */
  storeId?: number;
  /**
   * 支付成功后的前端回调url
   */
  successUrl?: string;
  /**
   * 终端类型
   * * PC: PC
   * * H5: H5
   * * APP: APP
   */
  terminal: 0 | 1 | 2;
  /**
   * 订单id，用于单笔订单支付场景，单笔支付时不能为空
   */
  tid: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

/**
 * 终端类型
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryGatewayIsOpenTypeReq".
 */
export type IQueryGatewayIsOpenTypeReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * 订单id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRecordStatusTidReq".
 */
export type IGetRecordStatusTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DefaultPayBatchRequest".
 */
export interface DefaultPayBatchRequest {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
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

/**
 * 内容
 */
export interface PayGatewayVO {
  /**
   * 网关别名
   */
  alias?: string;
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   * * CREDIT: 授信支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
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
 * via the `definition` "BaseResponse«boolean»".
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: boolean;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PayGatewayConfigResponse»".
 */
export interface BaseResponsePayGatewayConfigResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PayGatewayConfigResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PayGatewayConfigResponse {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  cashierUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  interfaceUrl?: string;
  merchantId?: string;
  /**
   * H5前端web地址
   */
  mobileWebUrl?: string;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  sellerEmail?: string;
  [k: string]: any;
}
/**
 * 支付网关
 */
export interface PayGatewayVO {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   * * EASYPAY: 易生支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO[];
  /**
   * 是否聚合支付
   */
  type?: boolean;

  [k: string]: any;
}
/**
 * 支付网关配置
 */
export interface PayGatewayConfigVO {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  cashierUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  interfaceUrl?: string;
  merchantId?: string;
  /**
   * H5前端web地址
   */
  mobileWebUrl?: string;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO1;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  sellerEmail?: string;
  [k: string]: any;
}
/**
 * 支付网关
 */
export interface PayGatewayVO1 {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   * * EASYPAY: 易生支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
export interface PayChannelItemVO {
  /**
   * 支付渠道
   */
  channel?: string;
  /**
   * 支付项代码，同一支付网关唯一
   */
  code?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  gateway?: PayGatewayVO2;
  /**
   * 支付渠道项id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 支付项名称
   */
  name?: string;
  /**
   * 终端
   * * PC: PC
   * * H5: H5
   * * APP: APP
   */
  terminal?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * 支付网关
 */
export interface PayGatewayVO2 {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   * * EASYPAY: 易生支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayConfigResponse".
 */
export interface PayGatewayConfigResponse1 {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  cashierUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  interfaceUrl?: string;
  merchantId?: string;
  /**
   * H5前端web地址
   */
  mobileWebUrl?: string;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  sellerEmail?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayVO".
 */
export interface PayGatewayVO3 {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   * * EASYPAY: 易生支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayConfigVO".
 */
export interface PayGatewayConfigVO1 {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  cashierUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  interfaceUrl?: string;
  merchantId?: string;
  /**
   * H5前端web地址
   */
  mobileWebUrl?: string;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO1;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  sellerEmail?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayChannelItemVO".
 */
export interface PayChannelItemVO1 {
  /**
   * 支付渠道
   */
  channel?: string;
  /**
   * 支付项代码，同一支付网关唯一
   */
  code?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  gateway?: PayGatewayVO2;
  /**
   * 支付渠道项id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 支付项名称
   */
  name?: string;
  /**
   * 终端
   * * PC: PC
   * * H5: H5
   * * APP: APP
   */
  terminal?: 0 | 1 | 2;
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
 * via the `definition` "IDefaultPayBatchRequestReq".
 */
export interface IDefaultPayBatchRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingHEADRequestReq".
 */
export interface IDefaultPayBatchUsingHEADRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatch_RequestReq".
 */
export interface IDefaultPayBatch_RequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingOPTIONSRequestReq".
 */
export interface IDefaultPayBatchUsingOPTIONSRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingPATCHRequestReq".
 */
export interface IDefaultPayBatchUsingPATCHRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
