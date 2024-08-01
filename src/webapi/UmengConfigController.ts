import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'UmengConfigController';

/**
 *
 * 新增友盟推送设备与会员关系
 *
 */
async function add(addReq: IAddAddReqReq): Promise<UmengTokenAddResponse> {
  let result = await sdk.post<UmengTokenAddResponse>(
    '/umengConfig/addToken',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 会员推送开关查询
 *
 */
async function getConfigDetail(): Promise<PushCustomerEnableByIdResponse> {
  let result = await sdk.get<PushCustomerEnableByIdResponse>(
    '/umengConfig/getConfigDetail',

    {},
  );
  return result.context;
}

/**
 *
 * 友盟推送配置查询
 *
 */
async function getUmengConfig(): Promise<UmengPushConfigByIdResponse> {
  let result = await sdk.get<UmengPushConfigByIdResponse>(
    '/umengConfig/getKey',

    {},
  );
  return result.context;
}

/**
 *
 * 会员推送开关保存
 *
 */
async function modifyConfig(
  modifyRequest: IModifyConfigModifyRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/umengConfig/modifyConfig',

    {
      ...modifyRequest,
    },
  );
  return result.context;
}

export default {
  add,

  getConfigDetail,

  getUmengConfig,

  modifyConfig,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UmengTokenAddRequest".
 */
export interface UmengTokenAddRequest {
  /**
   * 绑定时间
   */
  bindingTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 友盟推送会员设备token
   */
  devlceToken?: string;
  /**
   * token平台类型
   * * IOS:  0:iOS平台
   * * ANDROID:  1:android平台
   */
  platform?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«UmengTokenAddResponse»".
 */
export interface BaseResponseUmengTokenAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: UmengTokenAddResponse;
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
export interface UmengTokenAddResponse {
  umengTokenVO?: UmengTokenVO;
  [k: string]: any;
}
/**
 * 已新增的友盟推送设备与会员关系信息
 */
export interface UmengTokenVO {
  /**
   * 绑定时间
   */
  bindingTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 友盟推送会员设备token
   */
  devlceToken?: string;
  /**
   * id
   */
  id?: number;
  /**
   * token平台类型
   * * IOS:  0:iOS平台
   * * ANDROID:  1:android平台
   */
  platform?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UmengTokenAddResponse".
 */
export interface UmengTokenAddResponse1 {
  umengTokenVO?: UmengTokenVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UmengTokenVO".
 */
export interface UmengTokenVO1 {
  /**
   * 绑定时间
   */
  bindingTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 友盟推送会员设备token
   */
  devlceToken?: string;
  /**
   * id
   */
  id?: number;
  /**
   * token平台类型
   * * IOS:  0:iOS平台
   * * ANDROID:  1:android平台
   */
  platform?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PushCustomerEnableByIdResponse»".
 */
export interface BaseResponsePushCustomerEnableByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PushCustomerEnableByIdResponse;
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
export interface PushCustomerEnableByIdResponse {
  pushCustomerEnableVO?: PushCustomerEnableVO;
  [k: string]: any;
}
/**
 * 会员推送通知开关信息
 */
export interface PushCustomerEnableVO {
  /**
   * 账户资产通知 0:未启用 1:启用
   */
  accountAssets?: number;
  /**
   * 账号安全通知 0:未启用 1:启用
   */
  accountSecurity?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 分销业务通知 0:未启用 1:启用
   */
  distribution?: number;
  /**
   * 开启状态 0:未开启 1:启用
   */
  enableStatus?: number;
  /**
   * 订单进度通知 0:未启用 1:启用
   */
  orderProgressRate?: number;
  /**
   * 退单进度通知 0:未启用 1:启用
   */
  returnOrderProgressRate?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PushCustomerEnableByIdResponse".
 */
export interface PushCustomerEnableByIdResponse1 {
  pushCustomerEnableVO?: PushCustomerEnableVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PushCustomerEnableVO".
 */
export interface PushCustomerEnableVO1 {
  /**
   * 账户资产通知 0:未启用 1:启用
   */
  accountAssets?: number;
  /**
   * 账号安全通知 0:未启用 1:启用
   */
  accountSecurity?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 分销业务通知 0:未启用 1:启用
   */
  distribution?: number;
  /**
   * 开启状态 0:未开启 1:启用
   */
  enableStatus?: number;
  /**
   * 订单进度通知 0:未启用 1:启用
   */
  orderProgressRate?: number;
  /**
   * 退单进度通知 0:未启用 1:启用
   */
  returnOrderProgressRate?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«UmengPushConfigByIdResponse»".
 */
export interface BaseResponseUmengPushConfigByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: UmengPushConfigByIdResponse;
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
export interface UmengPushConfigByIdResponse {
  umengPushConfigVO?: UmengPushConfigVO;
  [k: string]: any;
}
/**
 * 友盟push接口配置信息
 */
export interface UmengPushConfigVO {
  /**
   * androidKeyId
   */
  androidKeyId?: string;
  /**
   * androidKeySecret
   */
  androidKeySecret?: string;
  /**
   * androidMsgSecret
   */
  androidMsgSecret?: string;
  /**
   * id
   */
  id?: number;
  /**
   * iosKeyId
   */
  iosKeyId?: string;
  /**
   * iosKeySecret
   */
  iosKeySecret?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UmengPushConfigByIdResponse".
 */
export interface UmengPushConfigByIdResponse1 {
  umengPushConfigVO?: UmengPushConfigVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UmengPushConfigVO".
 */
export interface UmengPushConfigVO1 {
  /**
   * androidKeyId
   */
  androidKeyId?: string;
  /**
   * androidKeySecret
   */
  androidKeySecret?: string;
  /**
   * androidMsgSecret
   */
  androidMsgSecret?: string;
  /**
   * id
   */
  id?: number;
  /**
   * iosKeyId
   */
  iosKeyId?: string;
  /**
   * iosKeySecret
   */
  iosKeySecret?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PushCustomerEnableModifyRequest".
 */
export interface PushCustomerEnableModifyRequest {
  /**
   * 账户资产通知 0:未启用 1:启用
   */
  accountAssets?: number;
  /**
   * 账号安全通知 0:未启用 1:启用
   */
  accountSecurity?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 分销业务通知 0:未启用 1:启用
   */
  distribution?: number;
  /**
   * 开启状态 0:未开启 1:启用
   */
  enableStatus?: number;
  /**
   * 订单进度通知 0:未启用 1:启用
   */
  orderProgressRate?: number;
  /**
   * 退单进度通知 0:未启用 1:启用
   */
  returnOrderProgressRate?: number;
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
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 绑定时间
   */
  bindingTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 友盟推送会员设备token
   */
  devlceToken?: string;
  /**
   * token平台类型
   * * IOS:  0:iOS平台
   * * ANDROID:  1:android平台
   */
  platform?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyConfigModifyRequestReq".
 */
export interface IModifyConfigModifyRequestReq {
  /**
   * 账户资产通知 0:未启用 1:启用
   */
  accountAssets?: number;
  /**
   * 账号安全通知 0:未启用 1:启用
   */
  accountSecurity?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 分销业务通知 0:未启用 1:启用
   */
  distribution?: number;
  /**
   * 开启状态 0:未开启 1:启用
   */
  enableStatus?: number;
  /**
   * 订单进度通知 0:未启用 1:启用
   */
  orderProgressRate?: number;
  /**
   * 退单进度通知 0:未启用 1:启用
   */
  returnOrderProgressRate?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
