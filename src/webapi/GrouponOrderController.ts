import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GrouponOrderController';

/**
 *
 * 验证拼团订单是否可支付
 *
 */
async function getGrouponOrderStatusByOrderId(
  orderId: IGetGrouponOrderStatusByOrderIdOrderIdReq,
): Promise<GrouponOrderStatusGetByOrderIdResponse> {
  let result = await sdk.post<GrouponOrderStatusGetByOrderIdResponse>(
    '/groupon/order/check/{orderId}'.replace('{orderId}', orderId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据grouponNo查询拼团活动信息
 *
 */
async function getGrouponActivityByGrouponNo(
  grouponNo: IGetGrouponActivityByGrouponNoGrouponNoReq,
): Promise<GrouponActivityVO> {
  let result = await sdk.post<GrouponActivityVO>(
    '/groupon/order/query/activity/{grouponNo}'.replace('{grouponNo}', grouponNo + ''),

    {},
  );
  return result.context;
}

export default {
  getGrouponOrderStatusByOrderId,

  getGrouponActivityByGrouponNo,
};

/**
 * orderId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponOrderStatusByOrderIdOrderIdReq".
 */
export type IGetGrouponOrderStatusByOrderIdOrderIdReq = string;
/**
 * grouponNo
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponActivityByGrouponNoGrouponNoReq".
 */
export type IGetGrouponActivityByGrouponNoGrouponNoReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponOrderStatusGetByOrderIdResponse»".
 */
export interface BaseResponseGrouponOrderStatusGetByOrderIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponOrderStatusGetByOrderIdResponse;
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
export interface GrouponOrderStatusGetByOrderIdResponse {
  /**
   * 团订单验证状态
   */
  status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponOrderStatusGetByOrderIdResponse".
 */
export interface GrouponOrderStatusGetByOrderIdResponse1 {
  /**
   * 团订单验证状态
   */
  status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponActivityVO»".
 */
export interface BaseResponseGrouponActivityVO {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponActivityVO;
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
export interface GrouponActivityVO {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * 审核不通过原因
   */
  auditFailReason?: string;
  /**
   * 是否自动成团
   */
  autoGroupon?: boolean;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 团失败人数
   */
  failGrouponNum?: number;
  /**
   * 是否包邮
   */
  freeDelivery?: boolean;
  /**
   * spu编号
   */
  goodsId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 是否精选
   */
  sticky?: boolean;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 待成团人数
   */
  waitGrouponNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponActivityVO".
 */
export interface GrouponActivityVO1 {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * 审核不通过原因
   */
  auditFailReason?: string;
  /**
   * 是否自动成团
   */
  autoGroupon?: boolean;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 团失败人数
   */
  failGrouponNum?: number;
  /**
   * 是否包邮
   */
  freeDelivery?: boolean;
  /**
   * spu编号
   */
  goodsId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 是否精选
   */
  sticky?: boolean;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 待成团人数
   */
  waitGrouponNum?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
