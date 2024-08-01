import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SmallShopCouponCodeController';

/**
 *
 * 用户领券
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<SmallShopCouponCodeAddResponse> {
  let result = await sdk.post<SmallShopCouponCodeAddResponse>(
    '/smallshopcouponcode/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询优购码
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<SmallShopCouponPageResponse> {
  let result = await sdk.post<SmallShopCouponPageResponse>(
    '/smallshopcouponcode/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

export default {
  add,

  getPage,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponCodeAddRequest".
 */
export interface SmallShopCouponCodeAddRequest {
  /**
   * 获得优惠券时间
   */
  acquireTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 筛选条件时间标识
   */
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
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码id
   */
  scouponId: number;
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
   * 开始时间
   */
  startTime?: string;
  token?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
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
 * via the `definition` "BaseResponse«SmallShopCouponCodeAddResponse»".
 */
export interface BaseResponseSmallShopCouponCodeAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponCodeAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponCodeAddResponse {
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  smallShopCouponCodeVO?: SmallShopCouponCodeVO;
  [k: string]: any;
}
/**
 * 已新增的优购码信息
 */
export interface SmallShopCouponCodeVO {
  /**
   * 获得优惠券时间
   */
  acquireTime?: string;
  /**
   * 优购码抵扣金额
   */
  couponPrice?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码券码id
   */
  scouponCodeId?: string;
  /**
   * 优购码id
   */
  scouponId?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
   */
  useStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponCodeAddResponse".
 */
export interface SmallShopCouponCodeAddResponse1 {
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  smallShopCouponCodeVO?: SmallShopCouponCodeVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponCodeVO".
 */
export interface SmallShopCouponCodeVO1 {
  /**
   * 获得优惠券时间
   */
  acquireTime?: string;
  /**
   * 优购码抵扣金额
   */
  couponPrice?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码券码id
   */
  scouponCodeId?: string;
  /**
   * 优购码id
   */
  scouponId?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
   */
  useStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponCodePageRequest".
 */
export interface SmallShopCouponCodePageRequest {
  /**
   * 搜索条件:获得优惠券时间开始
   */
  acquireTimeBegin?: string;
  /**
   * 搜索条件:获得优惠券时间截止
   */
  acquireTimeEnd?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 筛选条件时间标识
   */
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
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码券码id
   */
  scouponCodeId?: string;
  /**
   * 批量查询-优购码券码idList
   */
  scouponCodeIdList?: string[];
  /**
   * 优购码id
   */
  scouponId?: number;
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
   * 搜索条件:开始时间开始
   */
  startTimeBegin?: string;
  /**
   * 搜索条件:开始时间截止
   */
  startTimeEnd?: string;
  token?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 搜索条件:使用时间开始
   */
  useDateBegin?: string;
  /**
   * 搜索条件:使用时间截止
   */
  useDateEnd?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
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
 * via the `definition` "BaseResponse«SmallShopCouponPageResponse»".
 */
export interface BaseResponseSmallShopCouponPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponPageResponse {
  smallShopCouponVOPage?: MicroServicePageSmallShopCouponVO;
  [k: string]: any;
}
/**
 * 优购码分页结果
 */
export interface MicroServicePageSmallShopCouponVO {
  /**
   * 具体数据内容
   */
  content?: SmallShopCouponVO[];
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
export interface SmallShopCouponVO {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponPageResponse".
 */
export interface SmallShopCouponPageResponse1 {
  smallShopCouponVOPage?: MicroServicePageSmallShopCouponVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«SmallShopCouponVO»".
 */
export interface MicroServicePageSmallShopCouponVO1 {
  /**
   * 具体数据内容
   */
  content?: SmallShopCouponVO[];
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
 * via the `definition` "SmallShopCouponVO".
 */
export interface SmallShopCouponVO1 {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
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
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 获得优惠券时间
   */
  acquireTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 筛选条件时间标识
   */
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
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码id
   */
  scouponId: number;
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
   * 开始时间
   */
  startTime?: string;
  token?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
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
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 搜索条件:获得优惠券时间开始
   */
  acquireTimeBegin?: string;
  /**
   * 搜索条件:获得优惠券时间截止
   */
  acquireTimeEnd?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 领取人id
   */
  customerId?: string;
  /**
   * 订单抵扣金额
   */
  deductibleAmount?: number;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 筛选条件时间标识
   */
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
   * 券码
   */
  scouponCode?: string;
  /**
   * 优购码券码id
   */
  scouponCodeId?: string;
  /**
   * 批量查询-优购码券码idList
   */
  scouponCodeIdList?: string[];
  /**
   * 优购码id
   */
  scouponId?: number;
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
   * 搜索条件:开始时间开始
   */
  startTimeBegin?: string;
  /**
   * 搜索条件:开始时间截止
   */
  startTimeEnd?: string;
  token?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 搜索条件:使用时间开始
   */
  useDateBegin?: string;
  /**
   * 搜索条件:使用时间截止
   */
  useDateEnd?: string;
  /**
   * 使用状态,0(未使用)，1(使用)
   */
  useStatus?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
