import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CouponCodeBaseController';

/**
 *
 * 使用优惠券选择时的后台处理
 *
 */
async function checkoutCoupons(baseRequest: ICheckoutCouponsBaseRequestReq): Promise<CouponCheckoutResponse> {
  let result = await sdk.post<CouponCheckoutResponse>(
    '/coupon-code/checkout-coupons',

    {
      ...baseRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据活动和优惠券领券
 *
 */
async function customerFetchCoupon(baseRequest: ICustomerFetchCouponBaseRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/coupon-code/fetch-coupon',

    {
      ...baseRequest,
    },
  );
  return result.context;
}

/**
 *
 * APP/H5查询我的优惠券
 *
 */
async function listMyCouponList(request: IListMyCouponListRequestReq): Promise<CouponCodePageResponse> {
  let result = await sdk.post<CouponCodePageResponse>(
    '/coupon-code/my-coupon',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  checkoutCoupons,

  customerFetchCoupon,

  listMyCouponList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCheckoutBaseRequest".
 */
export interface CouponCheckoutBaseRequest {
  /**
   * 已勾选的优惠券码id集合
   */
  couponCodeIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponCheckoutResponse»".
 */
export interface BaseResponseCouponCheckoutResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCheckoutResponse;
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
export interface CouponCheckoutResponse {
  /**
   * 均摊完优惠券后的商品价格
   */
  checkGoodsInfos?: CheckGoodsInfoVO[];
  /**
   * 优惠券优惠总价
   */
  couponTotalPrice?: number;
  /**
   * 计算完优惠券均摊价的商品总价
   */
  totalPrice?: number;
  /**
   * 没有达到门槛的平台优惠券码id
   */
  unreachedIds?: string[];
  [k: string]: any;
}
export interface CheckGoodsInfoVO {
  /**
   * 商品id
   */
  goodsInfoId?: string;
  /**
   * 均摊价
   */
  splitPrice?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCheckoutResponse".
 */
export interface CouponCheckoutResponse1 {
  /**
   * 均摊完优惠券后的商品价格
   */
  checkGoodsInfos?: CheckGoodsInfoVO[];
  /**
   * 优惠券优惠总价
   */
  couponTotalPrice?: number;
  /**
   * 计算完优惠券均摊价的商品总价
   */
  totalPrice?: number;
  /**
   * 没有达到门槛的平台优惠券码id
   */
  unreachedIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CheckGoodsInfoVO".
 */
export interface CheckGoodsInfoVO1 {
  /**
   * 商品id
   */
  goodsInfoId?: string;
  /**
   * 均摊价
   */
  splitPrice?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponFetchBaseRequest".
 */
export interface CouponFetchBaseRequest {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
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
   * 优惠券使用状态，0(未使用)，1(使用)，2(已过期)
   */
  useStatus?: number;
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
 * via the `definition` "BaseResponse«CouponCodePageResponse»".
 */
export interface BaseResponseCouponCodePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCodePageResponse;
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
  sort?: Sort3;
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
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
  sort?: Sort3;
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
 * via the `definition` "ICheckoutCouponsBaseRequestReq".
 */
export interface ICheckoutCouponsBaseRequestReq {
  /**
   * 已勾选的优惠券码id集合
   */
  couponCodeIds?: string[];
  points?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICustomerFetchCouponBaseRequestReq".
 */
export interface ICustomerFetchCouponBaseRequestReq {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
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
