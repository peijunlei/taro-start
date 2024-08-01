import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PayController';

/**
 *
 * 支付校验
 *
 */
async function checkPayState(tid: ICheckPayStateTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/pay/aliPay/check/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * H5支付宝支付表单
 *
 */
async function aliPay(encrypted: IAliPayEncryptedReq): Promise<unknown> {
  let result = await sdk.get(
    '/pay/aliPay/{encrypted}'.replace('{encrypted}', encrypted + ''),

    {},
  );
  return result.context;
}

/**
 *
 * APP支付宝支付
 *
 */
async function appAliPay(payMobileRequest: IAppAliPayPayMobileRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/app/aliPay/',

    {
      ...payMobileRequest,
    },
  );
  return result.context;
}

/**
 *
 * 余额支付
 *
 */
async function balancePay(payMobileRequest: IBalancePayPayMobileRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/pay/balancePay',

    {
      ...payMobileRequest,
    },
  );
  return result.context;
}

/**
 *
 * 创建Charges
 *
 */
async function create(payMobileRequest: ICreatePayMobileRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/create',

    {
      ...payMobileRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据不同的支付方式获取微信支付对应的appId
 *
 */
async function getAppId(payGateway: IGetAppIdPayGatewayReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/getAppId/{payGateway}'.replace('{payGateway}', payGateway + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取小程序微信支付对应的openId
 *
 */
async function getLittleProgramOpenId(code: IGetLittleProgramOpenIdCodeReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/getOpenId/littleProgram/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取微信支付对应的openId
 *
 */
async function getOpenIdByChannel(
  code: IGetOpenIdByChannelCodeReq,
  payGateway: IGetOpenIdByChannelPayGatewayReq,
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/getOpenId/{payGateway}/{code}'

      .replace('{code}', code + '')

      .replace('{payGateway}', payGateway + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取支付网关配置
 *
 */
async function getWxConfig(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/getWxConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 获取微信openid
 *
 */
async function getWxOpenId(code: IGetWxOpenIdCodeReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/pay/getWxOpenId/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取可用支付项
 *
 */
async function items(type: IItemsTypeReq): Promise<PayChannelItemVOArray> {
  let result = await sdk.get<PayChannelItemVOArray>(
    '/pay/items/{type}'.replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 微信支付订单支付状态校验
 *
 */
async function checkOrderPayState(tid: ICheckOrderPayStateTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/pay/weiXinPay/checkOrderPayState/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 *  微信app支付统一下单接口
 *
 */
async function wxPayUnifiedorderForApp(
  weiXinPayRequest: IWxPayUnifiedorderForAppWeiXinPayRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/wxPayUnifiedorderForApp',

    {
      ...weiXinPayRequest,
    },
  );
  return result.context;
}

/**
 *
 * 微信浏览器内JSApi支付统一下单接口
 *
 */
async function wxPayUnifiedorderForJSApi(
  weiXinPayRequest: IWxPayUnifiedorderForJSApiWeiXinPayRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/wxPayUnifiedorderForJSApi',

    {
      ...weiXinPayRequest,
    },
  );
  return result.context;
}

/**
 *
 * 小程序内JSApi支付统一下单接口
 *
 */
async function wxPayUnifiedorderForLittleProgram(
  weiXinPayRequest: IWxPayUnifiedorderForLittleProgramWeiXinPayRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/pay/wxPayUnifiedorderForLittleProgram',

    {
      ...weiXinPayRequest,
    },
  );
  return result.context;
}

/**
 *
 * 非微信浏览器h5支付统一下单接口
 *
 */
async function wxPayUnifiedorderForMweb(
  weiXinPayRequest: IWxPayUnifiedorderForMwebWeiXinPayRequestReq,
): Promise<WxPayForMWebResponse> {
  let result = await sdk.post<WxPayForMWebResponse>(
    '/pay/wxPayUnifiedorderForMweb',

    {
      ...weiXinPayRequest,
    },
  );
  return result.context;
}

export default {
  checkPayState,

  aliPay,

  appAliPay,

  balancePay,

  create,

  getAppId,

  getLittleProgramOpenId,

  getOpenIdByChannel,

  getWxConfig,

  getWxOpenId,

  items,

  checkOrderPayState,

  wxPayUnifiedorderForApp,

  wxPayUnifiedorderForJSApi,

  wxPayUnifiedorderForLittleProgram,

  wxPayUnifiedorderForMweb,
};

/**
 * 内容
 */
export type PayChannelItemVOArray = PayChannelItemVO[];
/**
 * 订单号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckPayStateTidReq".
 */
export type ICheckPayStateTidReq = string;
/**
 * base64编码后的支付请求
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAliPayEncryptedReq".
 */
export type IAliPayEncryptedReq = string;
/**
 * payGateway
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetAppIdPayGatewayReq".
 */
export type IGetAppIdPayGatewayReq = 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'UNIONB2B' | 'PING' | 'BALANCE';
/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetLittleProgramOpenIdCodeReq".
 */
export type IGetLittleProgramOpenIdCodeReq = string;
/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetOpenIdByChannelCodeReq".
 */
export type IGetOpenIdByChannelCodeReq = string;
/**
 * payGateway
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetOpenIdByChannelPayGatewayReq".
 */
export type IGetOpenIdByChannelPayGatewayReq = 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'UNIONB2B' | 'PING' | 'BALANCE';
/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetWxOpenIdCodeReq".
 */
export type IGetWxOpenIdCodeReq = string;
/**
 * type
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IItemsTypeReq".
 */
export type IItemsTypeReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayChannelItemVOArray".
 */
export type PayChannelItemVOArray1 = PayChannelItemVO3[];
/**
 * 订单号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckOrderPayStateTidReq".
 */
export type ICheckOrderPayStateTidReq = string;

export interface IgnoreType {
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
 * via the `definition` "BaseResponse«object»".
 */
export interface BaseResponseObject {
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
 * via the `definition` "BaseResponse«List«PayChannelItemVO»»".
 */
export interface BaseResponseListPayChannelItemVO {
  /**
   * 结果码
   */
  code: string;
  context?: PayChannelItemVOArray;
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
  gateway?: PayGatewayVO;
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
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO1[];
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
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
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
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO1[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
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
  gateway?: PayGatewayVO;
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
 * via the `definition` "PayChannelItemVO".
 */
export interface PayChannelItemVO2 {
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
  gateway?: PayGatewayVO;
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
 * via the `definition` "PayGatewayVO".
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
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: PayChannelItemVO1[];
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
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
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
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WeiXinPayRequest".
 */
export interface WeiXinPayRequest {
  openid?: string;
  /**
   * 父订单号，合并支付必传
   */
  parentTid?: string;
  /**
   * 订单号，若单笔支付必传
   */
  tid?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«Map«string,string»»".
 */
export interface BaseResponseMapStringString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
    [k: string]: string;
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
 * via the `definition` "BaseResponse«WxPayForMWebResponse»".
 */
export interface BaseResponseWxPayForMWebResponse {
  /**
   * 结果码
   */
  code: string;
  context?: WxPayForMWebResponse;
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
export interface WxPayForMWebResponse {
  /**
   * 公众账号ID
   */
  appid?: string;
  /**
   * 设备号
   */
  device_info?: string;
  /**
   * 错误代码
   */
  err_code?: string;
  /**
   * 错误代码描述
   */
  err_code_des?: string;
  /**
   * 商户号
   */
  mch_id?: string;
  /**
   * mweb_url为拉起微信支付收银台的中间页面
   */
  mweb_url?: string;
  /**
   * 随机字符串
   */
  nonce_str?: string;
  /**
   * 预支付交易会话标识
   */
  prepay_id?: string;
  /**
   * 业务结果
   */
  result_code?: string;
  /**
   * 返回状态码
   */
  return_code?: string;
  /**
   * 返回信息
   */
  return_msg?: string;
  /**
   * 签名
   */
  sign?: string;
  /**
   * 交易类型
   */
  trade_type?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WxPayForMWebResponse".
 */
export interface WxPayForMWebResponse1 {
  /**
   * 公众账号ID
   */
  appid?: string;
  /**
   * 设备号
   */
  device_info?: string;
  /**
   * 错误代码
   */
  err_code?: string;
  /**
   * 错误代码描述
   */
  err_code_des?: string;
  /**
   * 商户号
   */
  mch_id?: string;
  /**
   * mweb_url为拉起微信支付收银台的中间页面
   */
  mweb_url?: string;
  /**
   * 随机字符串
   */
  nonce_str?: string;
  /**
   * 预支付交易会话标识
   */
  prepay_id?: string;
  /**
   * 业务结果
   */
  result_code?: string;
  /**
   * 返回状态码
   */
  return_code?: string;
  /**
   * 返回信息
   */
  return_msg?: string;
  /**
   * 签名
   */
  sign?: string;
  /**
   * 交易类型
   */
  trade_type?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAppAliPayPayMobileRequestReq".
 */
export interface IAppAliPayPayMobileRequestReq {
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
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export interface Undefined {
  [k: string]: string;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IBalancePayPayMobileRequestReq".
 */
export interface IBalancePayPayMobileRequestReq {
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICreatePayMobileRequestReq".
 */
export interface ICreatePayMobileRequestReq {
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
export interface PayChannelItemVO3 {
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
  gateway?: PayGatewayVO;
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
 * via the `definition` "IWxPayUnifiedorderForAppWeiXinPayRequestReq".
 */
export interface IWxPayUnifiedorderForAppWeiXinPayRequestReq {
  openid?: string;
  /**
   * 父订单号，合并支付必传
   */
  parentTid?: string;
  /**
   * 订单号，若单笔支付必传
   */
  tid?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWxPayUnifiedorderForJSApiWeiXinPayRequestReq".
 */
export interface IWxPayUnifiedorderForJSApiWeiXinPayRequestReq {
  openid?: string;
  /**
   * 父订单号，合并支付必传
   */
  parentTid?: string;
  /**
   * 订单号，若单笔支付必传
   */
  tid?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWxPayUnifiedorderForLittleProgramWeiXinPayRequestReq".
 */
export interface IWxPayUnifiedorderForLittleProgramWeiXinPayRequestReq {
  openid?: string;
  /**
   * 父订单号，合并支付必传
   */
  parentTid?: string;
  /**
   * 订单号，若单笔支付必传
   */
  tid?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWxPayUnifiedorderForMwebWeiXinPayRequestReq".
 */
export interface IWxPayUnifiedorderForMwebWeiXinPayRequestReq {
  openid?: string;
  /**
   * 父订单号，合并支付必传
   */
  parentTid?: string;
  /**
   * 订单号，若单笔支付必传
   */
  tid?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
