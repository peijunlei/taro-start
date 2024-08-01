import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'BossCustomerController';

/**
 *
 * 查询成长值说明
 *
 */
async function queryGrowthValueIntroduction(): Promise<unknown> {
  let result = await sdk.get(
    '/customer/growthValue/introduction',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询会员成长值
 *
 */
async function queryGrowthValue(
  customerGrowthValuePageRequest: IQueryGrowthValueCustomerGrowthValuePageRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/customer/queryToGrowthValue',

    {
      ...customerGrowthValuePageRequest,
    },
  );
  return result.context;
}

export default {
  queryGrowthValueIntroduction,

  queryGrowthValue,
};

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
 * via the `definition` "CustomerGrowthValuePageRequest".
 */
export interface CustomerGrowthValuePageRequest {
  /**
   * 内容备注
   */
  content?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 是否排除成长值为0的情况
   * * NO: 否
   * * YES: 是
   */
  excludeZeroFlag?: 0 | 1;
  /**
   * 成长值获取业务类型、0签到 1注册 2分享商品 3分享注册 4分享购买  5评论商品 6晒单 7上传头像/完善个人信息 8绑定微信 9添加收货地址 10关注店铺 11订单完成
   * * SIGNIN: 签到
   * * REGISTER: 注册
   * * SHARE: 分享商品
   * * SHAREREGISTER: 分享注册
   * * SHAREPURCHASE: 分享购买
   * * EVALUATE: 评论商品
   * * SHAREORDER: 晒单
   * * PERFECTINFO: 上传头像/完善个人信息
   * * BINDINGWECHAT: 绑定微信
   * * ADDSHIPPINGADDRESS: 添加收货地址
   * * FOCUSONSTORE: 关注店铺
   * * ORDERCOMPLETION: 订单完成
   */
  growthValueServiceType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /**
   * 大于或等于获取开始时间
   */
  gteGainStartDate?: string;
  /**
   * 小于或等于获取结束时间
   */
  lteGainEndDate?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 操作类型 0:扣除 1:增长
   * * DEDUCT: 扣除
   * * GROWTH: 增长
   */
  type?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryGrowthValueCustomerGrowthValuePageRequestReq".
 */
export interface IQueryGrowthValueCustomerGrowthValuePageRequestReq {
  /**
   * 内容备注
   */
  content?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 是否排除成长值为0的情况
   * * NO: 否
   * * YES: 是
   */
  excludeZeroFlag?: 0 | 1;
  /**
   * 成长值获取业务类型、0签到 1注册 2分享商品 3分享注册 4分享购买  5评论商品 6晒单 7上传头像/完善个人信息 8绑定微信 9添加收货地址 10关注店铺 11订单完成
   * * SIGNIN: 签到
   * * REGISTER: 注册
   * * SHARE: 分享商品
   * * SHAREREGISTER: 分享注册
   * * SHAREPURCHASE: 分享购买
   * * EVALUATE: 评论商品
   * * SHAREORDER: 晒单
   * * PERFECTINFO: 上传头像/完善个人信息
   * * BINDINGWECHAT: 绑定微信
   * * ADDSHIPPINGADDRESS: 添加收货地址
   * * FOCUSONSTORE: 关注店铺
   * * ORDERCOMPLETION: 订单完成
   */
  growthValueServiceType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /**
   * 大于或等于获取开始时间
   */
  gteGainStartDate?: string;
  /**
   * 小于或等于获取结束时间
   */
  lteGainEndDate?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 操作类型 0:扣除 1:增长
   * * DEDUCT: 扣除
   * * GROWTH: 增长
   */
  type?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
