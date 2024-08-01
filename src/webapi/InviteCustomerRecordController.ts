import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'InviteCustomerRecordController';

/**
 *
 * 统计我邀请的好友信息
 *
 */
async function countInviteCustomer(): Promise<CountInviteCustomerResponse> {
  let result = await sdk.post<CountInviteCustomerResponse>(
    '/customer/count-invite-customer',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销配置信息
 *
 */
async function getDistributionSetting(): Promise<DistributionSettingVO> {
  let result = await sdk.get<DistributionSettingVO>(
    '/customer/get-distribution-setting',

    {},
  );
  return result.context;
}

/**
 *
 * 分页我邀请的客户信息
 *
 */
async function pageInviteCustomer(request: IPageInviteCustomerRequestReq): Promise<Page> {
  let result = await sdk.post<Page>(
    '/customer/page-invite-customer',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页我的顾客信息
 *
 */
async function pageMyCustomer(request: IPageMyCustomerRequestReq): Promise<MicroServicePage> {
  let result = await sdk.post<MicroServicePage>(
    '/customer/page-my-customer',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页我有效邀请的客户信息
 *
 */
async function pageValidInvite(request: IPageValidInviteRequestReq): Promise<Page> {
  let result = await sdk.post<Page>(
    '/customer/page-valid-invite-customer',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  countInviteCustomer,

  getDistributionSetting,

  pageInviteCustomer,

  pageMyCustomer,

  pageValidInvite,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CountInviteCustomerResponse»".
 */
export interface BaseResponseCountInviteCustomerResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CountInviteCustomerResponse;
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
export interface CountInviteCustomerResponse {
  /**
   * 邀新人数
   */
  inviteNum?: number;
  /**
   * 我的客户
   */
  myCustomerNum?: number;
  /**
   * 有效邀新人数
   */
  validInviteNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CountInviteCustomerResponse".
 */
export interface CountInviteCustomerResponse1 {
  /**
   * 邀新人数
   */
  inviteNum?: number;
  /**
   * 我的客户
   */
  myCustomerNum?: number;
  /**
   * 有效邀新人数
   */
  validInviteNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionSettingVO»".
 */
export interface BaseResponseDistributionSettingVO {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSettingVO;
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
export interface DistributionSettingVO {
  /**
   * 是否开启申请入口
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 基础邀新奖励限制
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  baseLimitType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 是否开启分销佣金
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: 0 | 1;
  /**
   * 佣金返利优先级
   * * INVITOR: 0：邀请人优先
   * * STORE: 1：店铺优先
   */
  commissionPriorityType?: 0 | 1;
  /**
   * 佣金提成脱钩
   * * UNLIMITED: 0：不限
   * * EQUAL: 1：分销员和邀请人平级时脱钩
   * * HIGHER: 2：分销员高于邀请人等级时脱钩
   */
  commissionUnhookType?: 0 | 1 | 2;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 是否开启分销商品审核
   * * NO: 否
   * * YES: 是
   */
  goodsAuditFlag?: 0 | 1;
  /**
   * 邀请人数
   */
  inviteCount?: number;
  /**
   * 邀新奖励规则说明
   */
  inviteDesc?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀新专题页海报
   */
  inviteImg?: string;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 邀新转发图片
   */
  inviteShareImg?: string;
  /**
   * 限制条件
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  limitType?: 0 | 1;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 购买商品时招募落地页海报
   */
  recruitImg?: string;
  /**
   * 招募邀新转发图片
   */
  recruitShareImg?: string;
  /**
   * 注册限制
   * * UNLIMITED: 0：不限
   * * INVITE: 1：仅限邀请注册
   */
  registerLimitType?: 0 | 1;
  /**
   * 每位奖励金额
   */
  rewardCash?: number;
  /**
   * 奖励现金上限(人数)
   */
  rewardCashCount?: number;
  /**
   * 是否开启奖励现金
   * * NO: 否
   * * YES: 是
   */
  rewardCashFlag?: 0 | 1;
  /**
   * 奖励上限类型
   * * UNLIMITED: 0：不限
   * * LIMITED: 1：限人数
   */
  rewardCashType?: 0 | 1;
  /**
   * 奖励优惠券上限(组数)
   */
  rewardCouponCount?: number;
  /**
   * 是否开启奖励优惠券
   * * NO: 否
   * * YES: 是
   */
  rewardCouponFlag?: 0 | 1;
  /**
   * 邀新奖励限制
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  rewardLimitType?: 0 | 1;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSettingVO".
 */
export interface DistributionSettingVO1 {
  /**
   * 是否开启申请入口
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 基础邀新奖励限制
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  baseLimitType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 是否开启分销佣金
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: 0 | 1;
  /**
   * 佣金返利优先级
   * * INVITOR: 0：邀请人优先
   * * STORE: 1：店铺优先
   */
  commissionPriorityType?: 0 | 1;
  /**
   * 佣金提成脱钩
   * * UNLIMITED: 0：不限
   * * EQUAL: 1：分销员和邀请人平级时脱钩
   * * HIGHER: 2：分销员高于邀请人等级时脱钩
   */
  commissionUnhookType?: 0 | 1 | 2;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 是否开启分销商品审核
   * * NO: 否
   * * YES: 是
   */
  goodsAuditFlag?: 0 | 1;
  /**
   * 邀请人数
   */
  inviteCount?: number;
  /**
   * 邀新奖励规则说明
   */
  inviteDesc?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀新专题页海报
   */
  inviteImg?: string;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 邀新转发图片
   */
  inviteShareImg?: string;
  /**
   * 限制条件
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  limitType?: 0 | 1;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 购买商品时招募落地页海报
   */
  recruitImg?: string;
  /**
   * 招募邀新转发图片
   */
  recruitShareImg?: string;
  /**
   * 注册限制
   * * UNLIMITED: 0：不限
   * * INVITE: 1：仅限邀请注册
   */
  registerLimitType?: 0 | 1;
  /**
   * 每位奖励金额
   */
  rewardCash?: number;
  /**
   * 奖励现金上限(人数)
   */
  rewardCashCount?: number;
  /**
   * 是否开启奖励现金
   * * NO: 否
   * * YES: 是
   */
  rewardCashFlag?: 0 | 1;
  /**
   * 奖励上限类型
   * * UNLIMITED: 0：不限
   * * LIMITED: 1：限人数
   */
  rewardCashType?: 0 | 1;
  /**
   * 奖励优惠券上限(组数)
   */
  rewardCouponCount?: number;
  /**
   * 是否开启奖励优惠券
   * * NO: 否
   * * YES: 是
   */
  rewardCouponFlag?: 0 | 1;
  /**
   * 邀新奖励限制
   * * UNLIMITED: 0：不限
   * * EFFECTIVE: 1：仅限有效邀新
   */
  rewardLimitType?: 0 | 1;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseQueryRequest".
 */
export interface BaseQueryRequest {
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
 * via the `definition` "BaseResponse«Page»".
 */
export interface BaseResponsePage {
  /**
   * 结果码
   */
  code: string;
  context?: Page;
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
export interface Page {
  content?: {
    [k: string]: any;
  }[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page".
 */
export interface Page1 {
  content?: {
    [k: string]: any;
  }[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Pageable".
 */
export interface Pageable1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageByCustomerIdRequest".
 */
export interface PageByCustomerIdRequest {
  /**
   * 分销员的customerId
   */
  customerId?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort5;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort5 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroServicePage»".
 */
export interface BaseResponseMicroServicePage {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePage;
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
export interface MicroServicePage {
  /**
   * 具体数据内容
   */
  content?: {
    [k: string]: any;
  }[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort6;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface Sort6 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage".
 */
export interface MicroServicePage1 {
  /**
   * 具体数据内容
   */
  content?: {
    [k: string]: any;
  }[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort6;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageInviteCustomerRequestReq".
 */
export interface IPageInviteCustomerRequestReq {
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageMyCustomerRequestReq".
 */
export interface IPageMyCustomerRequestReq {
  /**
   * 分销员的customerId
   */
  customerId?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort5;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageValidInviteRequestReq".
 */
export interface IPageValidInviteRequestReq {
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
