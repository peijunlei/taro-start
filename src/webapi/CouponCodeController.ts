import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CouponCodeController';

/**
 *
 * 查询我的优惠券
 *
 */
async function listMyCouponList(
  request: IListMyCouponListRequestReq,
): Promise<CouponCodePageResponse> {
  let result = await sdk.post<CouponCodePageResponse>(
    '/coupon-code/list',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  listMyCouponList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCodePageRequest".
 */
export interface CouponCodePageRequest {
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 领取人id
   */
  customerId?: string;
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
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
   * 优惠券使用状态，0(未使用)，1(使用)，2(已过期)
   */
  useStatus?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponCodePageResponse»".
 */
export interface BaseResponseCouponCodePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCodePageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CouponCodePageResponse {
  couponCodeVos?: MicroServicePageCouponCodeVO;
  /**
   * 我的优惠券已过期总数
   */
  overDueCount?: number;
  /**
   * 我的优惠券未使用总数
   */
  unUseCount?: number;
  /**
   * 我的优惠券已使用总数
   */
  usedCount?: number;
  [k: string]: any;
}
/**
 * 我的优惠券列表
 */
export interface MicroServicePageCouponCodeVO {
  /**
   * 具体数据内容
   */
  content?: CouponCodeVO[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CouponCodeVO {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCodePageResponse".
 */
export interface CouponCodePageResponse1 {
  couponCodeVos?: MicroServicePageCouponCodeVO;
  /**
   * 我的优惠券已过期总数
   */
  overDueCount?: number;
  /**
   * 我的优惠券未使用总数
   */
  unUseCount?: number;
  /**
   * 我的优惠券已使用总数
   */
  usedCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CouponCodeVO»".
 */
export interface MicroServicePageCouponCodeVO1 {
  /**
   * 具体数据内容
   */
  content?: CouponCodeVO[];
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
  sort?: Sort;
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
 * via the `definition` "CouponCodeVO".
 */
export interface CouponCodeVO1 {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListMyCouponListRequestReq".
 */
export interface IListMyCouponListRequestReq {
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 领取人id
   */
  customerId?: string;
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
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
   * 优惠券使用状态，0(未使用)，1(使用)，2(已过期)
   */
  useStatus?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
