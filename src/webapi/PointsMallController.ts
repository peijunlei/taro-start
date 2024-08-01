import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PointsMallController';

/**
 *
 * 查询积分商品分类
 *
 */
async function getCateList(): Promise<PointsGoodsCateListResponse> {
  let result = await sdk.get<PointsGoodsCateListResponse>(
    '/pointsMall/cateList',

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询积分兑换券表
 *
 */
async function getById(pointsCouponId: IGetByIdPointsCouponIdReq): Promise<PointsCouponByIdResponse> {
  let result = await sdk.get<PointsCouponByIdResponse>(
    '/pointsMall/coupon/{pointsCouponId}'.replace('{pointsCouponId}', pointsCouponId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询会员信息
 *
 */
export async function findCustomerInfo(): Promise<CustomerInfoResponse> {
  let result = await sdk.get<CustomerInfoResponse>(
    '/pointsMall/customerInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 积分兑换优惠券
 *
 */
async function fetchPointsCoupon(
  pointsCouponId: IFetchPointsCouponPointsCouponIdReq,
): Promise<PointsTradeCommitResultVO> {
  let result = await sdk.post<PointsTradeCommitResultVO>(
    '/pointsMall/fetchPointsCoupon/{pointsCouponId}'.replace('{pointsCouponId}', pointsCouponId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询热门兑换
 *
 */
async function hotExchange(pointsGoodsPageReq: IHotExchangePointsGoodsPageReqReq): Promise<PointsGoodsPageResponse> {
  let result = await sdk.post<PointsGoodsPageResponse>(
    '/pointsMall/hotExchange',

    {
      ...pointsGoodsPageReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询积分商品
 *
 */
async function page(pointsGoodsPageReq: IPagePointsGoodsPageReqReq): Promise<PointsGoodsPageResponse> {
  let result = await sdk.post<PointsGoodsPageResponse>(
    '/pointsMall/page',

    {
      ...pointsGoodsPageReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询我能兑换的积分商品
 *
 */
async function pageCanExchange(
  pointsGoodsPageReq: IPageCanExchangePointsGoodsPageReqReq,
): Promise<PointsGoodsPageResponse> {
  let result = await sdk.post<PointsGoodsPageResponse>(
    '/pointsMall/pageCanExchange',

    {
      ...pointsGoodsPageReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询我能兑换的积分优惠券
 *
 */
async function pageCanExchangeCoupon(
  pointsCouponPageReq: IPageCanExchangeCouponPointsCouponPageReqReq,
): Promise<PointsCouponPageResponse> {
  let result = await sdk.post<PointsCouponPageResponse>(
    '/pointsMall/pageCanExchangeCoupon',

    {
      ...pointsCouponPageReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询积分优惠券
 *
 */
async function pageCoupon(pointsCouponPageReq: any): Promise<PointsCouponPageResponse> {
  let result = await sdk.post<PointsCouponPageResponse>(
    '/pointsMall/pageCoupon',

    {
      ...pointsCouponPageReq,
    },
  );
  return result.context;
}

export default {
  getCateList,

  getById,

  findCustomerInfo,

  fetchPointsCoupon,

  hotExchange,

  page,

  pageCanExchange,

  pageCanExchangeCoupon,

  pageCoupon,
};

/**
 * pointsCouponId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdPointsCouponIdReq".
 */
export type IGetByIdPointsCouponIdReq = number;
/**
 * pointsCouponId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFetchPointsCouponPointsCouponIdReq".
 */
export type IFetchPointsCouponPointsCouponIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PointsGoodsCateListResponse»".
 */
export interface BaseResponsePointsGoodsCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PointsGoodsCateListResponse;
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
export interface PointsGoodsCateListResponse {
  /**
   * 积分商品分类表列表结果
   */
  pointsGoodsCateVOList?: PointsGoodsCateVO[];
  [k: string]: any;
}
export interface PointsGoodsCateVO {
  /**
   * 积分商品分类主键
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 排序 默认0
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsGoodsCateListResponse".
 */
export interface PointsGoodsCateListResponse1 {
  /**
   * 积分商品分类表列表结果
   */
  pointsGoodsCateVOList?: PointsGoodsCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsGoodsCateVO".
 */
export interface PointsGoodsCateVO1 {
  /**
   * 积分商品分类主键
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 排序 默认0
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PointsCouponByIdResponse»".
 */
export interface BaseResponsePointsCouponByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PointsCouponByIdResponse;
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
export interface PointsCouponByIdResponse {
  pointsCouponVO?: PointsCouponVO;
  [k: string]: any;
}
/**
 * 积分兑换券表信息
 */
export interface PointsCouponVO {
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 兑换开始时间
   */
  beginTime?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  couponInfoVO?: CouponInfoVO;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 兑换状态 1: 进行中, 2: 暂停中,3: 未开始,4: 已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  pointsCouponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  /**
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 优惠券信息
 */
export interface CouponInfoVO {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
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
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsCouponByIdResponse".
 */
export interface PointsCouponByIdResponse1 {
  pointsCouponVO?: PointsCouponVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsCouponVO".
 */
export interface PointsCouponVO1 {
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 兑换开始时间
   */
  beginTime?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  couponInfoVO?: CouponInfoVO;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 兑换状态 1: 进行中, 2: 暂停中,3: 未开始,4: 已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  pointsCouponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  /**
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponInfoVO".
 */
export interface CouponInfoVO1 {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
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
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerInfoResponse»".
 */
export interface BaseResponseCustomerInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerInfoResponse;
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
export interface CustomerInfoResponse {
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInfoResponse".
 */
export interface CustomerInfoResponse1 {
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PointsTradeCommitResultVO»".
 */
export interface BaseResponsePointsTradeCommitResultVO {
  /**
   * 结果码
   */
  code: string;
  context?: PointsTradeCommitResultVO;
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
export interface PointsTradeCommitResultVO {
  /**
   * 交易积分数
   */
  points?: number;
  /**
   * 订单编号
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeCommitResultVO".
 */
export interface PointsTradeCommitResultVO1 {
  /**
   * 交易积分数
   */
  points?: number;
  /**
   * 订单编号
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsGoodsPageRequest".
 */
export interface PointsGoodsPageRequest {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 分类id
   */
  cateId?: number;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * SpuId
   */
  goodsId?: string;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * SKU市场价
   */
  goodsInfoMarketPrice?: number;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * SPU市场价
   */
  goodsMarketPrice?: number;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 兑换积分最大值
   */
  maxPoints?: number;
  /**
   * 库存最小值
   */
  minStock?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 批量查询-积分商品idList
   */
  pointsGoodsIdList?: string[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
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
 * via the `definition` "BaseResponse«PointsGoodsPageResponse»".
 */
export interface BaseResponsePointsGoodsPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PointsGoodsPageResponse;
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
export interface PointsGoodsPageResponse {
  pointsGoodsVOPage?: MicroServicePagePointsGoodsVO;
  [k: string]: any;
}
/**
 * 积分商品表分页结果
 */
export interface MicroServicePagePointsGoodsVO {
  /**
   * 具体数据内容
   */
  content?: PointsGoodsVO[];
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
export interface PointsGoodsVO {
  /**
   * 兑换开始时间
   */
  beginTime?: string;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  goods?: GoodsVO;
  /**
   * SpuId
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 可兑换的最大库存
   */
  maxStock?: number;
  /**
   * 兑换积分
   */
  points?: number;
  pointsGoodsCate?: PointsGoodsCateVO2;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 兑换状态 1: 进行中, 2: 暂停中,3: 未开始,4: 已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  pointsGoodsStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * 规格信息
   */
  specText?: string;
  /**
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * SPU信息
 */
export interface GoodsVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 商品类型
   */
  goodsType?: number;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 注水销量
   */
  shamSalesNum?: number;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * SKU信息
 */
export interface GoodsInfoVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterPriseAuditState?: 0 | 1 | 2 | 3;
  /**
   * 企业购商品审核被驳回的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  goods?: GoodsVO1;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 建议零售价
   */
  retailPrice?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
export interface CouponLabelVO {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
export interface GoodsVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 商品类型
   */
  goodsType?: number;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 注水销量
   */
  shamSalesNum?: number;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 促销标签
 */
export interface GrouponLabelVO {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
export interface MarketingLabelVO {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
/**
 * 分类信息
 */
export interface PointsGoodsCateVO2 {
  /**
   * 积分商品分类主键
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 排序 默认0
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
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
 * via the `definition` "PointsGoodsPageResponse".
 */
export interface PointsGoodsPageResponse1 {
  pointsGoodsVOPage?: MicroServicePagePointsGoodsVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«PointsGoodsVO»".
 */
export interface MicroServicePagePointsGoodsVO1 {
  /**
   * 具体数据内容
   */
  content?: PointsGoodsVO[];
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
 * via the `definition` "PointsGoodsVO".
 */
export interface PointsGoodsVO1 {
  /**
   * 兑换开始时间
   */
  beginTime?: string;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  goods?: GoodsVO;
  /**
   * SpuId
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 可兑换的最大库存
   */
  maxStock?: number;
  /**
   * 兑换积分
   */
  points?: number;
  pointsGoodsCate?: PointsGoodsCateVO2;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 兑换状态 1: 进行中, 2: 暂停中,3: 未开始,4: 已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  pointsGoodsStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * 规格信息
   */
  specText?: string;
  /**
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO2 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 商品类型
   */
  goodsType?: number;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 注水销量
   */
  shamSalesNum?: number;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoVO".
 */
export interface GoodsInfoVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterPriseAuditState?: 0 | 1 | 2 | 3;
  /**
   * 企业购商品审核被驳回的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  goods?: GoodsVO1;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 建议零售价
   */
  retailPrice?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponLabelVO".
 */
export interface CouponLabelVO1 {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponLabelVO".
 */
export interface GrouponLabelVO1 {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingLabelVO".
 */
export interface MarketingLabelVO1 {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsCouponPageRequest".
 */
export interface PointsCouponPageRequest {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 批量查询-积分兑换券idList
   */
  pointsCouponIdList?: number[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
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
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PointsCouponPageResponse»".
 */
export interface BaseResponsePointsCouponPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PointsCouponPageResponse;
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
export interface PointsCouponPageResponse {
  pointsCouponVOPage?: MicroServicePagePointsCouponVO;
  [k: string]: any;
}
/**
 * 积分兑换券表分页结果
 */
export interface MicroServicePagePointsCouponVO {
  /**
   * 具体数据内容
   */
  content?: PointsCouponVO2[];
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
  sort?: Sort5;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface PointsCouponVO2 {
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 兑换开始时间
   */
  beginTime?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  couponInfoVO?: CouponInfoVO;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 兑换状态 1: 进行中, 2: 暂停中,3: 未开始,4: 已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  pointsCouponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  /**
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
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
 * via the `definition` "PointsCouponPageResponse".
 */
export interface PointsCouponPageResponse1 {
  pointsCouponVOPage?: MicroServicePagePointsCouponVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«PointsCouponVO»".
 */
export interface MicroServicePagePointsCouponVO1 {
  /**
   * 具体数据内容
   */
  content?: PointsCouponVO2[];
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
  sort?: Sort5;
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
 * via the `definition` "IHotExchangePointsGoodsPageReqReq".
 */
export interface IHotExchangePointsGoodsPageReqReq {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 分类id
   */
  cateId?: number;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * SpuId
   */
  goodsId?: string;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * SKU市场价
   */
  goodsInfoMarketPrice?: number;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * SPU市场价
   */
  goodsMarketPrice?: number;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 兑换积分最大值
   */
  maxPoints?: number;
  /**
   * 库存最小值
   */
  minStock?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 批量查询-积分商品idList
   */
  pointsGoodsIdList?: string[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPagePointsGoodsPageReqReq".
 */
export interface IPagePointsGoodsPageReqReq {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 分类id
   */
  cateId?: number;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * SpuId
   */
  goodsId?: string;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * SKU市场价
   */
  goodsInfoMarketPrice?: number;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * SPU市场价
   */
  goodsMarketPrice?: number;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 兑换积分最大值
   */
  maxPoints?: number;
  /**
   * 库存最小值
   */
  minStock?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 批量查询-积分商品idList
   */
  pointsGoodsIdList?: string[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageCanExchangePointsGoodsPageReqReq".
 */
export interface IPageCanExchangePointsGoodsPageReqReq {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 分类id
   */
  cateId?: number;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * SpuId
   */
  goodsId?: string;
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * SKU市场价
   */
  goodsInfoMarketPrice?: number;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * SPU市场价
   */
  goodsMarketPrice?: number;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 兑换积分最大值
   */
  maxPoints?: number;
  /**
   * 库存最小值
   */
  minStock?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  /**
   * 批量查询-积分商品idList
   */
  pointsGoodsIdList?: string[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 推荐标价, 0: 未推荐 1: 已推荐
   * * NO: 否
   * * YES: 是
   */
  recommendFlag?: 0 | 1;
  /**
   * 销量
   */
  sales?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageCanExchangeCouponPointsCouponPageReqReq".
 */
export interface IPageCanExchangeCouponPointsCouponPageReqReq {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 批量查询-积分兑换券idList
   */
  pointsCouponIdList?: number[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPagePointsCouponPageReqReq".
 */
export interface IPagePointsCouponPageReqReq {
  /**
   * 搜索条件:兑换开始时间开始
   */
  beginTimeBegin?: string;
  /**
   * 搜索条件:兑换开始时间截止
   */
  beginTimeEnd?: string;
  /**
   * 优惠券id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
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
   * 删除标识,0: 未删除 1: 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:兑换结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:兑换结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 已兑换数量
   */
  exchangeCount?: number;
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
  /**
   * 兑换积分
   */
  points?: number;
  /**
   * 积分兑换券id
   */
  pointsCouponId?: number;
  /**
   * 批量查询-积分兑换券idList
   */
  pointsCouponIdList?: number[];
  /**
   * 兑换积分区间结尾
   */
  pointsSectionEnd?: number;
  /**
   * 兑换积分区间开始
   */
  pointsSectionStart?: number;
  /**
   * 是否售罄
   * * NO: 否
   * * YES: 是
   */
  sellOutFlag?: 0 | 1;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 是否启用 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 兑换总数
   */
  totalCount?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
