import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CouponInfoController';

/**
 *
 * 登录后，领券中心列表
 *
 */
async function getCouponStarted(
  queryRequest: IGetCouponStartedQueryRequestReq,
): Promise<CouponCacheCenterPageResponse> {
  let result = await sdk.post<CouponCacheCenterPageResponse>(
    '/coupon-info/center',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 优惠券凑单页
 *
 */
async function listGoodsByCouponId(request: IListGoodsByCouponIdRequestReq): Promise<CouponGoodsPageResponse> {
  let result = await sdk.post<CouponGoodsPageResponse>(
    '/coupon-info/coupon-goods',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 优惠券详情
 *
 */
async function couponDetail(request: ICouponDetailRequestReq): Promise<CouponCacheDetailResponse> {
  let result = await sdk.post<CouponCacheDetailResponse>(
    '/coupon-info/detail',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 未登录时，领券中心列表
 *
 */
async function getCouponStartedFront(
  queryRequest: IGetCouponStartedFrontQueryRequestReq,
): Promise<CouponCacheCenterPageResponse> {
  let result = await sdk.post<CouponCacheCenterPageResponse>(
    '/coupon-info/front/center',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 未登录时，通过商品Id，查询单个商品相关优惠券
 *
 */
async function listCouponForGoodsDetailFront(
  goodsInfoId: IListCouponForGoodsDetailFrontGoodsInfoIdReq,
): Promise<CouponCacheListForGoodsListResponse> {
  let result = await sdk.get<CouponCacheListForGoodsListResponse>(
    '/coupon-info/front/goods-detail/{goodsInfoId}'.replace('{goodsInfoId}', goodsInfoId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时，通过商品id列表，查询与商品相关优惠券
 *
 */
async function listCouponForGoodsListFront(
  goodsInfoIds: IListCouponForGoodsListFrontGoodsInfoIdsReq,
): Promise<CouponCacheListForGoodsListResponse> {
  let result = await sdk.post<CouponCacheListForGoodsListResponse>(
    '/coupon-info/front/goods-list',

    [...goodsInfoIds],
  );
  return result.context;
}

/**
 *
 * 登录后，通过商品Id，查询单个商品相关优惠券
 *
 */
async function listCouponForGoodsDetail(
  goodsInfoId: IListCouponForGoodsDetailGoodsInfoIdReq,
): Promise<CouponCacheListForGoodsListResponse> {
  let result = await sdk.get<CouponCacheListForGoodsListResponse>(
    '/coupon-info/goods-detail/{goodsInfoId}'.replace('{goodsInfoId}', goodsInfoId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 登录后，通过商品id列表，查询与商品相关优惠券
 *
 */
async function listCouponForGoodsList(
  goodsInfoIds: IListCouponForGoodsListGoodsInfoIdsReq,
): Promise<CouponCacheListForGoodsListResponse> {
  let result = await sdk.post<CouponCacheListForGoodsListResponse>(
    '/coupon-info/goods-list',

    [...goodsInfoIds],
  );
  return result.context;
}

export default {
  getCouponStarted,

  listGoodsByCouponId,

  couponDetail,

  getCouponStartedFront,

  listCouponForGoodsDetailFront,

  listCouponForGoodsListFront,

  listCouponForGoodsDetail,

  listCouponForGoodsList,
};

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type IListCouponForGoodsListFrontGoodsInfoIdsReq = string[];
/**
 * 商品Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListCouponForGoodsDetailFrontGoodsInfoIdReq".
 */
export type IListCouponForGoodsDetailFrontGoodsInfoIdReq = string;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListCouponForGoodsListFrontGoodsInfoIdsReq".
 */
export type IListCouponForGoodsListFrontGoodsInfoIdsReq1 = string[];
/**
 * 商品Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListCouponForGoodsDetailGoodsInfoIdReq".
 */
export type IListCouponForGoodsDetailGoodsInfoIdReq = string;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListCouponForGoodsListGoodsInfoIdsReq".
 */
export type IListCouponForGoodsListGoodsInfoIdsReq = string[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCacheCenterPageRequest".
 */
export interface CouponCacheCenterPageRequest {
  /**
   * 优惠券分类id
   */
  couponCateId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 分页页码
   */
  pageNum?: number;
  /**
   * 每页数量
   */
  pageSize?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponCacheCenterPageResponse»".
 */
export interface BaseResponseCouponCacheCenterPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCacheCenterPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CouponCacheCenterPageResponse {
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponViews?: MicroServicePageCouponVO;
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
/**
 * 优惠券分页数据
 */
export interface MicroServicePageCouponVO {
  /**
   * 具体数据内容
   */
  content?: CouponVO[];
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
export interface CouponVO {
  /**
   * 优惠券活动配置id
   */
  activityConfigId?: string;
  /**
   * 优化券活动倒计时
   */
  activityCountDown?: number;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券活动名称
   */
  activityName?: string;
  /**
   * 优惠券活动是否即将结束
   */
  activityWillEnd?: boolean;
  /**
   * 优惠券活动类型
   * * ALL_COUPONS: 0：全场赠券
   * * SPECIFY_COUPON: 1：指定赠券
   * * STORE_COUPONS: 2：进店赠券
   * * REGISTERED_COUPON: 3：注册赠券
   * * RIGHTS_COUPON: 4：权益赠券
   * * DISTRIBUTE_COUPON: 5：分销邀新赠券
   * * POINTS_COUPON: 6: 积分兑换券
   */
  couponActivityType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券结束时间
   */
  couponEndTime?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券开始时间
   */
  couponStartTime?: string;
  /**
   * 优惠券是否开始
   */
  couponStarted?: boolean;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券是否即将过期
   */
  couponWillEnd?: boolean;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 已抢百分比
   */
  fetchPercent?: number;
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
   * 优惠券是否已领取
   */
  hasFetched?: boolean;
  /**
   * 优惠券是否有剩余
   */
  leftFlag?: boolean;
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
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合
   */
  scopeIds?: string[];
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
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCacheCenterPageResponse".
 */
export interface CouponCacheCenterPageResponse1 {
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponViews?: MicroServicePageCouponVO;
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CouponVO»".
 */
export interface MicroServicePageCouponVO1 {
  /**
   * 具体数据内容
   */
  content?: CouponVO[];
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
 * via the `definition` "CouponVO".
 */
export interface CouponVO1 {
  /**
   * 优惠券活动配置id
   */
  activityConfigId?: string;
  /**
   * 优化券活动倒计时
   */
  activityCountDown?: number;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券活动名称
   */
  activityName?: string;
  /**
   * 优惠券活动是否即将结束
   */
  activityWillEnd?: boolean;
  /**
   * 优惠券活动类型
   * * ALL_COUPONS: 0：全场赠券
   * * SPECIFY_COUPON: 1：指定赠券
   * * STORE_COUPONS: 2：进店赠券
   * * REGISTERED_COUPON: 3：注册赠券
   * * RIGHTS_COUPON: 4：权益赠券
   * * DISTRIBUTE_COUPON: 5：分销邀新赠券
   * * POINTS_COUPON: 6: 积分兑换券
   */
  couponActivityType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券结束时间
   */
  couponEndTime?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券开始时间
   */
  couponStartTime?: string;
  /**
   * 优惠券是否开始
   */
  couponStarted?: boolean;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券是否即将过期
   */
  couponWillEnd?: boolean;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 已抢百分比
   */
  fetchPercent?: number;
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
   * 优惠券是否已领取
   */
  hasFetched?: boolean;
  /**
   * 优惠券是否有剩余
   */
  leftFlag?: boolean;
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
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合
   */
  scopeIds?: string[];
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
   * 店铺id
   */
  storeId?: number;
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
 * via the `definition` "CouponGoodsPageRequest".
 */
export interface CouponGoodsPageRequest {
  /**
   * 优惠券活动id
   */
  activity?: string;
  /**
   * 品牌id集合
   */
  brandIds?: number[];
  /**
   * 平台类目id集合
   */
  cateIds?: number[];
  /**
   * 是否自营
   * * NO: 否
   * * YES: 是
   */
  companyType?: number;
  /**
   * 优惠券id
   */
  couponId?: string;
  /**
   * 当前页数
   */
  pageNum?: number;
  /**
   * 分页条数
   */
  pageSize?: number;
  /**
   * 排序标识
   */
  sortFlag?: number;
  /**
   * 商品排序类型,0最新->按上下架时间倒序 1最新->按上下架时间升序 2价格->按市场价倒序 3价格->按市场价升序
   */
  sortType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponGoodsPageResponse»".
 */
export interface BaseResponseCouponGoodsPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponGoodsPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CouponGoodsPageResponse {
  couponInfo?: CouponGoodsListResponse;
  esGoodsInfoResponse?: EsGoodsInfoResponse;
  [k: string]: any;
}
/**
 * 优惠券信息
 */
export interface CouponGoodsListResponse {
  /**
   * 品牌Id集合
   */
  brandIds?: number[];
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台分类Id集合
   */
  cateIds?: number[];
  /**
   * 平台分类Id集合--es查询商品范围
   */
  cateIds4es?: number[];
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponType?: '0' | '1' | '2' | '3';
  /**
   * 优惠券面值
   */
  denomination?: number;
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
   * 商品Id集合
   */
  goodsInfoId?: string[];
  /**
   * 是否全部商品
   * * NO: 否
   * * YES: 是
   */
  isAll?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 品牌Id集合(过滤之后的)
   */
  queryBrandIds?: number[];
  /**
   * 优惠券作用范围类型
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
   * 店铺分类Id集合
   */
  storeCateIds?: number[];
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * 商品列表数据
 */
export interface EsGoodsInfoResponse {
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  /**
   * 剂型
   */
  drugFormVOS?: DrugFormVO[];
  /**
   * 商品/药品分类
   */
  drugTypes?: DrugTypeVO[];
  esGoodsInfoPage?: PageEsGoodsInfo;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * SPU
   */
  goodsList?: GoodsVO[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO[];
  /**
   * 是否外用
   */
  isExternals?: IsExternalVO[];
  /**
   * 药品分类
   */
  medicineTypes?: MedicineTypeVO[];
  [k: string]: any;
}
export interface GoodsBrandVO {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 国家对象
 */
export interface CountryVO {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
export interface GoodsCateVO {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCateVO1 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCatePropVO {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface DrugFormVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface DrugTypeVO {
  /**
   * 药品类型
   */
  drugType?: number;
  [k: string]: any;
}
/**
 * 索引SKU
 */
export interface PageEsGoodsInfo {
  content?: EsGoodsInfo[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort2;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface EsGoodsInfo {
  addedTime?: string;
  approvalNumber?: string;
  auditStatus?: number;
  cateBrandId?: string;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  drugType?: number;
  forbidStatus?: number;
  goodsInfo?: GoodsInfoNest;
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsSearchAuxNest?: GoodsSearchAuxNest;
  id?: string;
  isExternalUse?: number;
  lowGoodsName?: string;
  medicineType?: number;
  pinyinInitials?: string;
  propDetails?: GoodsPropDetailRelNest[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  [k: string]: any;
}
export interface GoodsCustomerPriceNest {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
export interface GoodsInfoNest {
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
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
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
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 药品分类
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
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
   * 商品好评数量
   */
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
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
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
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
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 扁平化多个规格值ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 扁平化多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   */
  priceType?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 商品分页
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
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
export interface GoodsLevelPriceNest {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
export interface GoodsSearchAuxNest {
  /**
   * 商品名称 ik分词
   */
  goodsNameAuxIk?: string;
  pinyinFull?: string;
  [k: string]: any;
}
export interface GoodsPropDetailRelNest {
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * 属性id
   */
  propId?: number;
  [k: string]: any;
}
export interface GoodsInfoSpecDetailRelNest {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort2 {
  [k: string]: any;
}
export interface GoodsIntervalPriceVO {
  /**
   * 订货区间
   */
  count?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 订货区间ID
   */
  intervalPriceId?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
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
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
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
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
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
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO1;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO1;
  goodsCateVO?: GoodsCateVO2;
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
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
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
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * 剂型对象
 */
export interface DrugFormVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 品牌对象
 */
export interface GoodsBrandVO1 {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCateVO2 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 计量单位
 */
export interface MeterUnitVO {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * 生产厂商
 */
export interface ProductorVO {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
  [k: string]: any;
}
export interface GoodsSpecDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值明称
   */
  detailName?: string;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，规格值摸拟ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增时，规格摸拟ID
   */
  mockSpecId?: number;
  /**
   * 规格明细ID
   */
  specDetailId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsSpecVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 多个规格值ID
   */
  specDetailIds?: number[];
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface IsExternalVO {
  /**
   * 是否外用
   */
  isExternalUse?: number;
  [k: string]: any;
}
export interface MedicineTypeVO {
  /**
   * 药品类型
   */
  medicineType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponGoodsPageResponse".
 */
export interface CouponGoodsPageResponse1 {
  couponInfo?: CouponGoodsListResponse;
  esGoodsInfoResponse?: EsGoodsInfoResponse;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponGoodsListResponse".
 */
export interface CouponGoodsListResponse1 {
  /**
   * 品牌Id集合
   */
  brandIds?: number[];
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台分类Id集合
   */
  cateIds?: number[];
  /**
   * 平台分类Id集合--es查询商品范围
   */
  cateIds4es?: number[];
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponType?: '0' | '1' | '2' | '3';
  /**
   * 优惠券面值
   */
  denomination?: number;
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
   * 商品Id集合
   */
  goodsInfoId?: string[];
  /**
   * 是否全部商品
   * * NO: 否
   * * YES: 是
   */
  isAll?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 品牌Id集合(过滤之后的)
   */
  queryBrandIds?: number[];
  /**
   * 优惠券作用范围类型
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
   * 店铺分类Id集合
   */
  storeCateIds?: number[];
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfoResponse".
 */
export interface EsGoodsInfoResponse1 {
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  /**
   * 剂型
   */
  drugFormVOS?: DrugFormVO[];
  /**
   * 商品/药品分类
   */
  drugTypes?: DrugTypeVO[];
  esGoodsInfoPage?: PageEsGoodsInfo;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * SPU
   */
  goodsList?: GoodsVO[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO[];
  /**
   * 是否外用
   */
  isExternals?: IsExternalVO[];
  /**
   * 药品分类
   */
  medicineTypes?: MedicineTypeVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
export interface GoodsBrandVO2 {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
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
 * via the `definition` "CountryVO".
 */
export interface CountryVO1 {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateVO".
 */
export interface GoodsCateVO3 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCatePropVO".
 */
export interface GoodsCatePropVO1 {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailVO".
 */
export interface GoodsPropDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrugFormVO".
 */
export interface DrugFormVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrugTypeVO".
 */
export interface DrugTypeVO1 {
  /**
   * 药品类型
   */
  drugType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«EsGoodsInfo»".
 */
export interface PageEsGoodsInfo1 {
  content?: EsGoodsInfo[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort2;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfo".
 */
export interface EsGoodsInfo1 {
  addedTime?: string;
  approvalNumber?: string;
  auditStatus?: number;
  cateBrandId?: string;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  drugType?: number;
  forbidStatus?: number;
  goodsInfo?: GoodsInfoNest;
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsSearchAuxNest?: GoodsSearchAuxNest;
  id?: string;
  isExternalUse?: number;
  lowGoodsName?: string;
  medicineType?: number;
  pinyinInitials?: string;
  propDetails?: GoodsPropDetailRelNest[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCustomerPriceNest".
 */
export interface GoodsCustomerPriceNest1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoNest".
 */
export interface GoodsInfoNest1 {
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
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
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
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 药品分类
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
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
   * 商品好评数量
   */
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
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
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
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
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 扁平化多个规格值ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 扁平化多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   */
  priceType?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 商品分页
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
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
 * via the `definition` "GoodsLevelPriceNest".
 */
export interface GoodsLevelPriceNest1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsSearchAuxNest".
 */
export interface GoodsSearchAuxNest1 {
  /**
   * 商品名称 ik分词
   */
  goodsNameAuxIk?: string;
  pinyinFull?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailRelNest".
 */
export interface GoodsPropDetailRelNest1 {
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * 属性id
   */
  propId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoSpecDetailRelNest".
 */
export interface GoodsInfoSpecDetailRelNest1 {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsIntervalPriceVO".
 */
export interface GoodsIntervalPriceVO1 {
  /**
   * 订货区间
   */
  count?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 订货区间ID
   */
  intervalPriceId?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
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
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
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
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
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
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO1;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO1;
  goodsCateVO?: GoodsCateVO2;
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
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
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
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MeterUnitVO".
 */
export interface MeterUnitVO1 {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ProductorVO".
 */
export interface ProductorVO1 {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsSpecDetailVO".
 */
export interface GoodsSpecDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值明称
   */
  detailName?: string;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，规格值摸拟ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增时，规格摸拟ID
   */
  mockSpecId?: number;
  /**
   * 规格明细ID
   */
  specDetailId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsSpecVO".
 */
export interface GoodsSpecVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 多个规格值ID
   */
  specDetailIds?: number[];
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IsExternalVO".
 */
export interface IsExternalVO1 {
  /**
   * 是否外用
   */
  isExternalUse?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MedicineTypeVO".
 */
export interface MedicineTypeVO1 {
  /**
   * 药品类型
   */
  medicineType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponDetailRequest".
 */
export interface CouponDetailRequest {
  /**
   * 优惠券活动Id
   */
  couponActivityId: string;
  /**
   * 优惠券Id
   */
  couponInfoId: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponCacheDetailResponse»".
 */
export interface BaseResponseCouponCacheDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCacheDetailResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CouponCacheDetailResponse {
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponView?: CouponVO2;
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
/**
 * 优惠券信息
 */
export interface CouponVO2 {
  /**
   * 优惠券活动配置id
   */
  activityConfigId?: string;
  /**
   * 优化券活动倒计时
   */
  activityCountDown?: number;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券活动名称
   */
  activityName?: string;
  /**
   * 优惠券活动是否即将结束
   */
  activityWillEnd?: boolean;
  /**
   * 优惠券活动类型
   * * ALL_COUPONS: 0：全场赠券
   * * SPECIFY_COUPON: 1：指定赠券
   * * STORE_COUPONS: 2：进店赠券
   * * REGISTERED_COUPON: 3：注册赠券
   * * RIGHTS_COUPON: 4：权益赠券
   * * DISTRIBUTE_COUPON: 5：分销邀新赠券
   * * POINTS_COUPON: 6: 积分兑换券
   */
  couponActivityType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券结束时间
   */
  couponEndTime?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券开始时间
   */
  couponStartTime?: string;
  /**
   * 优惠券是否开始
   */
  couponStarted?: boolean;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券是否即将过期
   */
  couponWillEnd?: boolean;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 已抢百分比
   */
  fetchPercent?: number;
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
   * 优惠券是否已领取
   */
  hasFetched?: boolean;
  /**
   * 优惠券是否有剩余
   */
  leftFlag?: boolean;
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
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合
   */
  scopeIds?: string[];
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
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCacheDetailResponse".
 */
export interface CouponCacheDetailResponse1 {
  /**
   * 品牌名称map<key为品牌id，value为品牌名称>
   */
  brandMap?: {
    [k: string]: string;
  };
  /**
   * 平台类目名称map<key为平台类目id，value为平台类目名称>
   */
  cateMap?: {
    [k: string]: string;
  };
  couponView?: CouponVO2;
  /**
   * 店铺分类名称map<key为店铺分类id，value为店铺分类名称>
   */
  storeCateMap?: {
    [k: string]: string;
  };
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CouponCacheListForGoodsListResponse»".
 */
export interface BaseResponseCouponCacheListForGoodsListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CouponCacheListForGoodsListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CouponCacheListForGoodsListResponse {
  /**
   * 优惠券数据
   */
  couponViews?: CouponVO3[];
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
export interface CouponVO3 {
  /**
   * 优惠券活动配置id
   */
  activityConfigId?: string;
  /**
   * 优化券活动倒计时
   */
  activityCountDown?: number;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券活动名称
   */
  activityName?: string;
  /**
   * 优惠券活动是否即将结束
   */
  activityWillEnd?: boolean;
  /**
   * 优惠券活动类型
   * * ALL_COUPONS: 0：全场赠券
   * * SPECIFY_COUPON: 1：指定赠券
   * * STORE_COUPONS: 2：进店赠券
   * * REGISTERED_COUPON: 3：注册赠券
   * * RIGHTS_COUPON: 4：权益赠券
   * * DISTRIBUTE_COUPON: 5：分销邀新赠券
   * * POINTS_COUPON: 6: 积分兑换券
   */
  couponActivityType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券结束时间
   */
  couponEndTime?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券开始时间
   */
  couponStartTime?: string;
  /**
   * 优惠券是否开始
   */
  couponStarted?: boolean;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券是否即将过期
   */
  couponWillEnd?: boolean;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 已抢百分比
   */
  fetchPercent?: number;
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
   * 优惠券是否已领取
   */
  hasFetched?: boolean;
  /**
   * 优惠券是否有剩余
   */
  leftFlag?: boolean;
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
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合
   */
  scopeIds?: string[];
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
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCacheListForGoodsListResponse".
 */
export interface CouponCacheListForGoodsListResponse1 {
  /**
   * 优惠券数据
   */
  couponViews?: CouponVO3[];
  /**
   * 店铺名称map<key为店铺id，value为店铺名称>
   */
  storeMap?: {
    [k: string]: string;
  };
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCouponStartedQueryRequestReq".
 */
export interface IGetCouponStartedQueryRequestReq {
  /**
   * 优惠券分类id
   */
  couponCateId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 分页页码
   */
  pageNum?: number;
  /**
   * 每页数量
   */
  pageSize?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListGoodsByCouponIdRequestReq".
 */
export interface IListGoodsByCouponIdRequestReq {
  /**
   * 优惠券活动id
   */
  activity?: string;
  /**
   * 品牌id集合
   */
  brandIds?: number[];
  /**
   * 平台类目id集合
   */
  cateIds?: number[];
  /**
   * 是否自营
   * * NO: 否
   * * YES: 是
   */
  companyType?: number;
  /**
   * 优惠券id
   */
  couponId?: string;
  /**
   * 当前页数
   */
  pageNum?: number;
  /**
   * 分页条数
   */
  pageSize?: number;
  /**
   * 排序标识
   */
  sortFlag?: number;
  /**
   * 商品排序类型,0最新->按上下架时间倒序 1最新->按上下架时间升序 2价格->按市场价倒序 3价格->按市场价升序
   */
  sortType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICouponDetailRequestReq".
 */
export interface ICouponDetailRequestReq {
  /**
   * 优惠券活动Id
   */
  couponActivityId: string;
  /**
   * 优惠券Id
   */
  couponInfoId: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCouponStartedFrontQueryRequestReq".
 */
export interface IGetCouponStartedFrontQueryRequestReq {
  /**
   * 优惠券分类id
   */
  couponCateId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 分页页码
   */
  pageNum?: number;
  /**
   * 每页数量
   */
  pageSize?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
