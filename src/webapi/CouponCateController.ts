import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CouponCateController';

/**
 *
 * 查询优惠券分类列表
 *
 */
async function listCouponCate(): Promise<CouponCateVOArray> {
  let result = await sdk.get<CouponCateVOArray>(
    '/coupon-cate/list',

    {},
  );
  return result.context;
}

export default {
  listCouponCate,
};

/**
 * 内容
 */
export type CouponCateVOArray = CouponCateVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCateVOArray".
 */
export type CouponCateVOArray1 = CouponCateVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CouponCateVO»»".
 */
export interface BaseResponseListCouponCateVO {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCateVOArray;
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
export interface CouponCateVO {
  /**
   * 优惠券分类Id
   */
  couponCateId?: string;
  /**
   * 优惠券分类名称
   */
  couponCateName?: string;
  /**
   * 是否平台专用
   * * NO: 否
   * * YES: 是
   */
  onlyPlatformFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCateVO".
 */
export interface CouponCateVO1 {
  /**
   * 优惠券分类Id
   */
  couponCateId?: string;
  /**
   * 优惠券分类名称
   */
  couponCateName?: string;
  /**
   * 是否平台专用
   * * NO: 否
   * * YES: 是
   */
  onlyPlatformFlag?: 0 | 1;
  [k: string]: any;
}
export interface CouponCateVO2 {
  /**
   * 优惠券分类Id
   */
  couponCateId?: string;
  /**
   * 优惠券分类名称
   */
  couponCateName?: string;
  /**
   * 是否平台专用
   * * NO: 否
   * * YES: 是
   */
  onlyPlatformFlag?: 0 | 1;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
