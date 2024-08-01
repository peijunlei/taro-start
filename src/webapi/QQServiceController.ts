import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'QQServiceController';

/**
 *
 * 查询qq客服列表
 *
 */
async function qqDetail(
  storeId: IQqDetailStoreIdReq,
  type: IQqDetailTypeReq,
): Promise<OnlineServiceListResponse> {
  let result = await sdk.get<OnlineServiceListResponse>(
    `/customerService/qq/detail/{storeId}/${3}`

      .replace('{storeId}', storeId + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}
/**
 *
 * 查询企微客服列表
 *
 */
async function weChatDetail(
  storeId: IWeChatDetailStoreIdReq,
): Promise<CustomerServiceSettingByStoreIdResponse> {
  let result = await sdk.get<CustomerServiceSettingByStoreIdResponse>(
    '/customerService/weChat/detail/{storeId}'.replace(
      '{storeId}',
      storeId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  qqDetail,
  weChatDetail,
};

/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQqDetailStoreIdReq".
 */
export type IQqDetailStoreIdReq = number;

/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWeChatDetailStoreIdReq".
 */
export type IWeChatDetailStoreIdReq = number;
export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerServiceSettingByStoreIdResponse»".
 */
export interface BaseResponseCustomerServiceSettingByStoreIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerServiceSettingByStoreIdResponse;
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
export interface CustomerServiceSettingByStoreIdResponse {
  /**
   * 座席列表
   */
  qqOnlineServerItemRopList?: CustomerServiceSettingItemVO[];
  qqOnlineServerRop?: CustomerServiceSettingVO;
  /**
   * 座席列表
   */
  weChatOnlineServerItemRopList?: CustomerServiceSettingItemVO2[];
  weChatOnlineServerRop?: CustomerServiceSettingVO1;
  [k: string]: any;
}
export interface CustomerServiceSettingItemVO {
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 在线客服主键
   */
  customerServiceId?: number;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 在线客服头像
   */
  serviceIcon?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 在线客服链接
   */
  serviceUrl?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * 在线客服配置信息(qq)
 */
export interface CustomerServiceSettingVO {
  /**
   * 客服座席列表
   */
  customerServiceSettingItemVOList?: CustomerServiceSettingItemVO1[];
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 企业ID
   */
  enterpriseId?: string;
  /**
   * 在线客服组是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  groupStatus?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 推送平台类型：0：QQ客服 1：阿里云客服 2：企微客服
   * * QQ:  0：QQ客服
   * * ALIYUN:  1：阿里云云客服
   * * WECHAT:  2：企微客服
   */
  platformType?: 0 | 1 | 2;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服key
   */
  serviceKey?: string;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 客服链接
   */
  serviceUrl?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  status?: 0 | 1;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}
export interface CustomerServiceSettingItemVO1 {
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 在线客服主键
   */
  customerServiceId?: number;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 在线客服头像
   */
  serviceIcon?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 在线客服链接
   */
  serviceUrl?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}

/**
 * 在线客服配置信息(企微客服)
 */
export interface CustomerServiceSettingVO1 {
  /**
   * 客服座席列表
   */
  customerServiceSettingItemVOList?: CustomerServiceSettingItemVO1[];
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 企业ID
   */
  enterpriseId?: string;
  /**
   * 在线客服组是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  groupStatus?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 推送平台类型：0：QQ客服 1：阿里云客服 2：企微客服
   * * QQ:  0：QQ客服
   * * ALIYUN:  1：阿里云云客服
   * * WECHAT:  2：企微客服
   */
  platformType?: 0 | 1 | 2;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服key
   */
  serviceKey?: string;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 客服链接
   */
  serviceUrl?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  status?: 0 | 1;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}

export interface CustomerServiceSettingItemVO2 {
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 在线客服主键
   */
  customerServiceId?: number;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 在线客服头像
   */
  serviceIcon?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 在线客服链接
   */
  serviceUrl?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«OnlineServiceListResponse»".
 */
export interface BaseResponseOnlineServiceListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: OnlineServiceListResponse;
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
export interface OnlineServiceListResponse {
  /**
   * onlineerviceItem座席列表结果
   */
  qqOnlineServerItemRopList?: OnlineServiceItemVO[];
  qqOnlineServerRop?: OnlineServiceVO;
  [k: string]: any;
}
export interface OnlineServiceItemVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * onlineService客服信息
 */
export interface OnlineServiceVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceListResponse".
 */
export interface OnlineServiceListResponse1 {
  /**
   * onlineerviceItem座席列表结果
   */
  qqOnlineServerItemRopList?: OnlineServiceItemVO[];
  qqOnlineServerRop?: OnlineServiceVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceItemVO".
 */
export interface OnlineServiceItemVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceVO".
 */
export interface OnlineServiceVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 生效终端，0：PC, 1： H5, 2： APP
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQqDetailTypeReq".
 */
export interface IQqDetailTypeReq {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
