import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'IntelligentRecommendationController';

/**
 *
 * 查询 - 分类页推荐频道坑位开启状态
 *
 */
export async function queryOpenStatus() {
  let result = await sdk.get('/intelligent-recommendation/queryOpenStatus', {});
  return result.context;
}

/**
 *
 * 商品智能推荐
 *
 */
export async function goodsRecommendList(
  queryRequest: IGoodsRecommendListQueryRequestReq,
): Promise<IntelligentRecommendationResponse> {
  let result = await sdk.post<IntelligentRecommendationResponse>(
    '/intelligent-recommendation/goods-list/get',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 购物车商品智能推荐
 *
 */
export async function goodsRecommendListForUnLogin(
  queryRequest: IGoodsRecommendListForUnLoginQueryRequestReq,
): Promise<IntelligentRecommendationResponse> {
  let result = await sdk.post<IntelligentRecommendationResponse>(
    '/intelligent-recommendation/goods-list/get/unLogin',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 点击推荐商品埋点
 *
 */
export async function clickGoods(request: IClickGoodsRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/intelligent-recommendation/goods/click',

    {
      ...request,
    },
  );
  return result.code;
}

/**
 *
 * 点击推荐商品埋点-未登录
 *
 */
export async function clickGoodsUnLogin(request: IClickGoodsUnLoginRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/intelligent-recommendation/goods/click/unLogin',

    {
      ...request,
    },
  );
  return result.code;
}

/**
 *
 * 点击推荐商品埋点
 *
 */
export async function orderGoods(request: IOrderGoodsRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/intelligent-recommendation/order-goods',

    {
      ...request,
    },
  );
  return result.code;
}

export default {
  goodsRecommendList,

  goodsRecommendListForUnLogin,

  clickGoods,

  clickGoodsUnLogin,

  queryOpenStatus,

  orderGoods,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IntelligentRecommendationRequest".
 */
export interface IntelligentRecommendationRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  customerId?: string;
  item?: number;
  location?: number;
  pageIndex?: number;
  pageSize?: number;
  recommendType?: number;
  relationCateIdList?: number[];
  relationGoodsIdList?: string[];
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IntelligentRecommendationResponse»".
 */
export interface BaseResponseIntelligentRecommendationResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IntelligentRecommendationResponse;
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
export interface IntelligentRecommendationResponse {
  /**
   * 商品SPU信息
   */
  goodsCateVOList?: GoodsCateVO[];
  /**
   * 商品SPU信息
   */
  goodsVOList?: GoodsVO[];
  recommendPositionConfigurationVO?: RecommendPositionConfigurationVO;
  [k: string]: any;
}
export interface GoodsCateVO {
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
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
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
   * * NO: 0:否
   * * YES: 1:是
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
   * * NO: 0:否
   * * YES: 1:是
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
export interface GoodsVO {
  addFalseReason?: string;
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
   * 是否定时上架 true:是,false:否
   */
  addedTimingFlag?: boolean;
  /**
   * 定时上架时间
   */
  addedTimingTime?: string;
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
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 删除原因
   */
  deleteReason?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 购买方式 0立即购买 1购物车,内容以,相隔
   */
  goodsBuyTypes?: string;
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
   * 一对多关系，多个SKU编号
   */
  goodsInfoList?: GoodsInfoVO[];
  /**
   * 商品标签列表
   */
  goodsLabelList?: GoodsLabelVO[];
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
   * 标签id，以逗号拼凑
   */
  labelIdStr?: string;
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
   * 是否需要同步 0：不需要同步 1：需要同步
   * * NO: 否
   * * YES: 是
   */
  needSynchronize?: 0 | 1;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 所属供应商商品Id
   */
  providerGoodsId?: string;
  /**
   * 所属供应商商品SPU编码
   */
  providerGoodsNo?: string;
  /**
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
  /**
   * 供应商店铺状态 0：关店 1：开店
   */
  providerStatus?: number;
  /**
   * 建议零售价
   */
  recommendedRetailPrice?: number;
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
   * 是否单规格
   */
  singleSpecFlag?: boolean;
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
   * 三方spu
   */
  thirdPlatformSpuId?: string;
  /**
   * 三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 是否可售
   * * NO: 否
   * * YES: 是
   */
  vendibility?: number;
  [k: string]: any;
}
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
   * 是否定时上架 true:是,false:否
   */
  addedTimingFlag?: boolean;
  /**
   * 定时上架时间
   */
  addedTimingTime?: string;
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
   * 预约价格
   */
  appointmentPrice?: number;
  appointmentSaleVO?: AppointmentSaleVO;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 预售价格
   */
  bookingPrice?: number;
  bookingSaleVO?: BookingSaleVO;
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
   * * NO: 0:否
   * * YES: 1:是
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
  goods?: null;
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
  goodsInfoSpecDetailRelList?: GoodsInfoSpecDetailRelVO[];
  goodsLevelPriceList?: GoodsLevelPriceVO[];
  goodsMarketing?: GoodsMarketingVO;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   * * NO_AUTH: 3：无购买权限
   */
  goodsStatus?: 0 | 1 | 2 | 3;
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
  intervalPriceList?: GoodsIntervalPriceVO[];
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
  mockSpecDetailName?: string;
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  mockSpecName?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 所属供应商商品skuId
   */
  providerGoodsInfoId?: string;
  /**
   * 所属供应商商品sku编码
   */
  providerGoodsInfoNo?: string;
  /**
   * 供应商Id
   */
  providerId?: number;
  /**
   * 供应商店铺状态 0：关店 1：开店
   */
  providerStatus?: number;
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
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
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
  /**
   * 是否可售
   * * NO: 否
   * * YES: 是
   */
  vendibility?: number;
  [k: string]: any;
}
/**
 * 预约活动信息
 */
export interface AppointmentSaleVO {
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 预约人数
   */
  appointmentCount?: number;
  /**
   * 预约结束时间
   */
  appointmentEndTime?: string;
  appointmentSaleGood?: AppointmentSaleGoodsVO;
  /**
   * 预约活动商品信息列表
   */
  appointmentSaleGoods?: AppointmentSaleGoodsVO1[];
  /**
   * 预约开始时间
   */
  appointmentStartTime?: string;
  /**
   * 预约类型 0：不预约不可购买  1：不预约可购买
   */
  appointmentType?: number;
  /**
   * 购买人数
   */
  buyerCount?: number;
  /**
   * 发货日期 2020-01-10
   */
  deliverTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 参加会员  -1:全部客户 0:全部等级 other:其他等级
   */
  joinLevel?: string;
  /**
   * 是否平台等级 （1平台（自营店铺属于平台等级） 0店铺）
   * * NO: 否
   * * YES: 是
   */
  joinLevelType?: 0 | 1;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 是否暂停 0:否 1:是
   */
  pauseFlag?: number;
  /**
   * 预约价
   */
  price?: number;
  /**
   * 抢购结束时间
   */
  snapUpEndTime?: string;
  /**
   * 抢购开始时间
   */
  snapUpStartTime?: string;
  /**
   * 状态 0:全部 1:进行中，2 已暂停 3 未开始 4. 已结束
   * * ALL: 0：全部
   * * RUNNING: 1：进行中
   * * SUSPENDED: 2：已暂停
   * * NO_START: 3：未开始
   * * END: 4：已结束
   * * NO_START_AND_RUNNING: 5：未开始和进行中
   */
  status?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * 预约活动商品信息
 */
export interface AppointmentSaleGoodsVO {
  /**
   * 预约数量
   */
  appointmentCount?: number;
  /**
   * 预约结束时间
   */
  appointmentEndTime?: string;
  /**
   * 预约活动id
   */
  appointmentSaleId?: number;
  /**
   * 预约开始时间
   */
  appointmentStartTime?: string;
  /**
   * 购买数量
   */
  buyerCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * id
   */
  id?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 预约价
   */
  price?: number;
  skuName?: string;
  skuPic?: string;
  /**
   * 抢购结束时间
   */
  snapUpEndTime?: string;
  /**
   * 抢购开始时间
   */
  snapUpStartTime?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
export interface AppointmentSaleGoodsVO1 {
  /**
   * 预约数量
   */
  appointmentCount?: number;
  /**
   * 预约结束时间
   */
  appointmentEndTime?: string;
  /**
   * 预约活动id
   */
  appointmentSaleId?: number;
  /**
   * 预约开始时间
   */
  appointmentStartTime?: string;
  /**
   * 购买数量
   */
  buyerCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * id
   */
  id?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 预约价
   */
  price?: number;
  skuName?: string;
  skuPic?: string;
  /**
   * 抢购结束时间
   */
  snapUpEndTime?: string;
  /**
   * 抢购开始时间
   */
  snapUpStartTime?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * 预售活动信息
 */
export interface BookingSaleVO {
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 预售结束时间
   */
  bookingEndTime?: string;
  bookingSaleGoods?: BookingSaleGoodsVO;
  /**
   * 活动商品相关信息列表
   */
  bookingSaleGoodsList?: BookingSaleGoodsVO1[];
  /**
   * 预售开始时间
   */
  bookingStartTime?: string;
  /**
   * 预售类型 0：全款预售  1：定金预售
   */
  bookingType?: number;
  /**
   * 发货日期 2020-01-10
   */
  deliverTime?: string;
  /**
   * 定金支付数量
   */
  handSelCount?: number;
  /**
   * 定金支付结束时间
   */
  handSelEndTime?: string;
  /**
   * 定金支付开始时间
   */
  handSelStartTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 参加会员  -1:平台全部客户 0:店铺全部等级 other:店铺其他等级
   */
  joinLevel?: string;
  /**
   * 是否平台等级 （1平台（自营店铺属于平台等级） 0店铺）
   * * NO: 否
   * * YES: 是
   */
  joinLevelType?: 0 | 1;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 是否暂停 0:否 1:是
   */
  pauseFlag?: number;
  /**
   * 全款支付数量
   */
  payCount?: number;
  /**
   * 查询类型，0：全部，1：进行中，2：暂停中，3：未开始，4：已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  status?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 尾款支付数量
   */
  tailCount?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  [k: string]: any;
}
/**
 * 活动商品相关信息
 */
export interface BookingSaleGoodsVO {
  /**
   * 预售数量
   */
  bookingCount?: number;
  /**
   * 预售结束时间
   */
  bookingEndTime?: string;
  /**
   * 预售价
   */
  bookingPrice?: number;
  /**
   * 预售id
   */
  bookingSaleId?: number;
  /**
   * 预售开始时间
   */
  bookingStartTime?: string;
  /**
   * 预售类型 0：全款预售  1：定金预售
   */
  bookingType?: number;
  /**
   * 实际可售数量
   */
  canBookingCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * 定金支付数量
   */
  handSelCount?: number;
  /**
   * 定金支付结束时间
   */
  handSelEndTime?: string;
  /**
   * 定金
   */
  handSelPrice?: number;
  /**
   * 定金支付开始时间
   */
  handSelStartTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 膨胀价格
   */
  inflationPrice?: number;
  /**
   * 划线价
   */
  linePrice?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 全款支付数量
   */
  payCount?: number;
  /**
   * 服务器时间
   */
  serverTime?: string;
  skuName?: string;
  skuPic?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 尾款支付数量
   */
  tailCount?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  [k: string]: any;
}
export interface BookingSaleGoodsVO1 {
  /**
   * 预售数量
   */
  bookingCount?: number;
  /**
   * 预售结束时间
   */
  bookingEndTime?: string;
  /**
   * 预售价
   */
  bookingPrice?: number;
  /**
   * 预售id
   */
  bookingSaleId?: number;
  /**
   * 预售开始时间
   */
  bookingStartTime?: string;
  /**
   * 预售类型 0：全款预售  1：定金预售
   */
  bookingType?: number;
  /**
   * 实际可售数量
   */
  canBookingCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * 定金支付数量
   */
  handSelCount?: number;
  /**
   * 定金支付结束时间
   */
  handSelEndTime?: string;
  /**
   * 定金
   */
  handSelPrice?: number;
  /**
   * 定金支付开始时间
   */
  handSelStartTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 膨胀价格
   */
  inflationPrice?: number;
  /**
   * 划线价
   */
  linePrice?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 全款支付数量
   */
  payCount?: number;
  /**
   * 服务器时间
   */
  serverTime?: string;
  skuName?: string;
  skuPic?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 尾款支付数量
   */
  tailCount?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
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
export interface GoodsInfoSpecDetailRelVO {
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
   * * NO: 0:否
   * * YES: 1:是
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
   * 新增商品时，模拟规格ID
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
export interface GoodsLevelPriceVO {
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
export interface GoodsMarketingVO {
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * sku编号
   */
  goodsInfoId?: string;
  /**
   * 唯一编号
   */
  id?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
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
export interface MarketingLabelVO {
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 活动状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  marketingStatus?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  /**
   * 进度比例，以%为单位
   */
  progressRatio?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  [k: string]: any;
}
export interface GoodsLabelVO {
  /**
   * 标签id
   */
  goodsLabelId?: number;
  /**
   * 标签名称
   */
  labelName?: string;
  /**
   * 排序
   */
  labelSort?: number;
  /**
   * 前端是否展示 0: 关闭 1:开启
   */
  labelVisible?: boolean;
  [k: string]: any;
}
/**
 * 坑位设置
 */
export interface RecommendPositionConfigurationVO {
  /**
   * 推荐内容
   */
  content?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 坑位开关，0：关闭；1：开启
   * * CLOSED:  0: 关闭
   * * OPEN: 1：开启
   */
  isOpen?: 0 | 1;
  /**
   * 坑位名称
   */
  name?: string;
  /**
   * 推荐策略类型，0：热门推荐；1：基于商品相关性推荐
   * * HOT:  0: 热门推荐
   * * RELEVANT: 1：基于商品相关性推荐
   */
  tacticsType?: 0 | 1;
  /**
   * 坑位标题
   */
  title?: string;
  /**
   * 坑位类型，0：购物车，1：商品详情，2：商品列表；3：个人中心；4：会员中心；5：收藏商品；6：支付成功页；7：分类
   * * SHOP_CART:  0: 购物车
   * * GOODS_DETAIL: 1：商品详情
   * * GOODS_LIST:  2: 商品列表
   * * USER_CENTER: 3：个人中心
   * * CUSTOMER_CENTER: 4：会员中心
   * * COLLECT_GOODS:  5: 收藏商品
   * * PAY_SUC: 6：支付成功页
   * * GOODS_CATE:  7: 分类
   * * MAGIC_BOX:  8: 魔方
   */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * 推荐上限
   */
  upperLimit?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IntelligentRecommendationResponse".
 */
export interface IntelligentRecommendationResponse1 {
  /**
   * 商品SPU信息
   */
  goodsCateVOList?: GoodsCateVO[];
  /**
   * 商品SPU信息
   */
  goodsVOList?: GoodsVO[];
  recommendPositionConfigurationVO?: RecommendPositionConfigurationVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateVO".
 */
export interface GoodsCateVO1 {
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
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
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
   * * NO: 0:否
   * * YES: 1:是
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
   * * NO: 0:否
   * * YES: 1:是
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
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO1 {
  addFalseReason?: string;
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
   * 是否定时上架 true:是,false:否
   */
  addedTimingFlag?: boolean;
  /**
   * 定时上架时间
   */
  addedTimingTime?: string;
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
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 删除原因
   */
  deleteReason?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 购买方式 0立即购买 1购物车,内容以,相隔
   */
  goodsBuyTypes?: string;
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
   * 一对多关系，多个SKU编号
   */
  goodsInfoList?: GoodsInfoVO[];
  /**
   * 商品标签列表
   */
  goodsLabelList?: GoodsLabelVO[];
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
   * 标签id，以逗号拼凑
   */
  labelIdStr?: string;
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
   * 是否需要同步 0：不需要同步 1：需要同步
   * * NO: 否
   * * YES: 是
   */
  needSynchronize?: 0 | 1;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 所属供应商商品Id
   */
  providerGoodsId?: string;
  /**
   * 所属供应商商品SPU编码
   */
  providerGoodsNo?: string;
  /**
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
  /**
   * 供应商店铺状态 0：关店 1：开店
   */
  providerStatus?: number;
  /**
   * 建议零售价
   */
  recommendedRetailPrice?: number;
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
   * 是否单规格
   */
  singleSpecFlag?: boolean;
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
   * 三方spu
   */
  thirdPlatformSpuId?: string;
  /**
   * 三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 是否可售
   * * NO: 否
   * * YES: 是
   */
  vendibility?: number;
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
   * 是否定时上架 true:是,false:否
   */
  addedTimingFlag?: boolean;
  /**
   * 定时上架时间
   */
  addedTimingTime?: string;
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
   * 预约价格
   */
  appointmentPrice?: number;
  appointmentSaleVO?: AppointmentSaleVO;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 预售价格
   */
  bookingPrice?: number;
  bookingSaleVO?: BookingSaleVO;
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
   * * NO: 0:否
   * * YES: 1:是
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
  goods?: null;
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
  goodsInfoSpecDetailRelList?: GoodsInfoSpecDetailRelVO[];
  goodsLevelPriceList?: GoodsLevelPriceVO[];
  goodsMarketing?: GoodsMarketingVO;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   * * NO_AUTH: 3：无购买权限
   */
  goodsStatus?: 0 | 1 | 2 | 3;
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
  intervalPriceList?: GoodsIntervalPriceVO[];
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
  mockSpecDetailName?: string;
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  mockSpecName?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 所属供应商商品skuId
   */
  providerGoodsInfoId?: string;
  /**
   * 所属供应商商品sku编码
   */
  providerGoodsInfoNo?: string;
  /**
   * 供应商Id
   */
  providerId?: number;
  /**
   * 供应商店铺状态 0：关店 1：开店
   */
  providerStatus?: number;
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
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
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
  /**
   * 是否可售
   * * NO: 否
   * * YES: 是
   */
  vendibility?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppointmentSaleVO".
 */
export interface AppointmentSaleVO1 {
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 预约人数
   */
  appointmentCount?: number;
  /**
   * 预约结束时间
   */
  appointmentEndTime?: string;
  appointmentSaleGood?: AppointmentSaleGoodsVO;
  /**
   * 预约活动商品信息列表
   */
  appointmentSaleGoods?: AppointmentSaleGoodsVO1[];
  /**
   * 预约开始时间
   */
  appointmentStartTime?: string;
  /**
   * 预约类型 0：不预约不可购买  1：不预约可购买
   */
  appointmentType?: number;
  /**
   * 购买人数
   */
  buyerCount?: number;
  /**
   * 发货日期 2020-01-10
   */
  deliverTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 参加会员  -1:全部客户 0:全部等级 other:其他等级
   */
  joinLevel?: string;
  /**
   * 是否平台等级 （1平台（自营店铺属于平台等级） 0店铺）
   * * NO: 否
   * * YES: 是
   */
  joinLevelType?: 0 | 1;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 是否暂停 0:否 1:是
   */
  pauseFlag?: number;
  /**
   * 预约价
   */
  price?: number;
  /**
   * 抢购结束时间
   */
  snapUpEndTime?: string;
  /**
   * 抢购开始时间
   */
  snapUpStartTime?: string;
  /**
   * 状态 0:全部 1:进行中，2 已暂停 3 未开始 4. 已结束
   * * ALL: 0：全部
   * * RUNNING: 1：进行中
   * * SUSPENDED: 2：已暂停
   * * NO_START: 3：未开始
   * * END: 4：已结束
   * * NO_START_AND_RUNNING: 5：未开始和进行中
   */
  status?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 商户id
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
 * via the `definition` "AppointmentSaleGoodsVO".
 */
export interface AppointmentSaleGoodsVO2 {
  /**
   * 预约数量
   */
  appointmentCount?: number;
  /**
   * 预约结束时间
   */
  appointmentEndTime?: string;
  /**
   * 预约活动id
   */
  appointmentSaleId?: number;
  /**
   * 预约开始时间
   */
  appointmentStartTime?: string;
  /**
   * 购买数量
   */
  buyerCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * id
   */
  id?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 预约价
   */
  price?: number;
  skuName?: string;
  skuPic?: string;
  /**
   * 抢购结束时间
   */
  snapUpEndTime?: string;
  /**
   * 抢购开始时间
   */
  snapUpStartTime?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
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
 * via the `definition` "BookingSaleVO".
 */
export interface BookingSaleVO1 {
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 预售结束时间
   */
  bookingEndTime?: string;
  bookingSaleGoods?: BookingSaleGoodsVO;
  /**
   * 活动商品相关信息列表
   */
  bookingSaleGoodsList?: BookingSaleGoodsVO1[];
  /**
   * 预售开始时间
   */
  bookingStartTime?: string;
  /**
   * 预售类型 0：全款预售  1：定金预售
   */
  bookingType?: number;
  /**
   * 发货日期 2020-01-10
   */
  deliverTime?: string;
  /**
   * 定金支付数量
   */
  handSelCount?: number;
  /**
   * 定金支付结束时间
   */
  handSelEndTime?: string;
  /**
   * 定金支付开始时间
   */
  handSelStartTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 参加会员  -1:平台全部客户 0:店铺全部等级 other:店铺其他等级
   */
  joinLevel?: string;
  /**
   * 是否平台等级 （1平台（自营店铺属于平台等级） 0店铺）
   * * NO: 否
   * * YES: 是
   */
  joinLevelType?: 0 | 1;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 是否暂停 0:否 1:是
   */
  pauseFlag?: number;
  /**
   * 全款支付数量
   */
  payCount?: number;
  /**
   * 查询类型，0：全部，1：进行中，2：暂停中，3：未开始，4：已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  status?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 尾款支付数量
   */
  tailCount?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BookingSaleGoodsVO".
 */
export interface BookingSaleGoodsVO2 {
  /**
   * 预售数量
   */
  bookingCount?: number;
  /**
   * 预售结束时间
   */
  bookingEndTime?: string;
  /**
   * 预售价
   */
  bookingPrice?: number;
  /**
   * 预售id
   */
  bookingSaleId?: number;
  /**
   * 预售开始时间
   */
  bookingStartTime?: string;
  /**
   * 预售类型 0：全款预售  1：定金预售
   */
  bookingType?: number;
  /**
   * 实际可售数量
   */
  canBookingCount?: number;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * 商品spu图片
   */
  goodsImg?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品sku图片
   */
  goodsInfoImg?: string;
  goodsInfoVO?: null;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: null;
  /**
   * 定金支付数量
   */
  handSelCount?: number;
  /**
   * 定金支付结束时间
   */
  handSelEndTime?: string;
  /**
   * 定金
   */
  handSelPrice?: number;
  /**
   * 定金支付开始时间
   */
  handSelStartTime?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 膨胀价格
   */
  inflationPrice?: number;
  /**
   * 划线价
   */
  linePrice?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 全款支付数量
   */
  payCount?: number;
  /**
   * 服务器时间
   */
  serverTime?: string;
  skuName?: string;
  skuPic?: string;
  /**
   * 商品规格
   */
  specText?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 尾款支付数量
   */
  tailCount?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
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
 * via the `definition` "GoodsInfoSpecDetailRelVO".
 */
export interface GoodsInfoSpecDetailRelVO1 {
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
   * * NO: 0:否
   * * YES: 1:是
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
   * 新增商品时，模拟规格ID
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
 * via the `definition` "GoodsLevelPriceVO".
 */
export interface GoodsLevelPriceVO1 {
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
 * via the `definition` "GoodsMarketingVO".
 */
export interface GoodsMarketingVO1 {
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * sku编号
   */
  goodsInfoId?: string;
  /**
   * 唯一编号
   */
  id?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
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
 * via the `definition` "MarketingLabelVO".
 */
export interface MarketingLabelVO1 {
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 活动状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  marketingStatus?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  /**
   * 进度比例，以%为单位
   */
  progressRatio?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLabelVO".
 */
export interface GoodsLabelVO1 {
  /**
   * 标签id
   */
  goodsLabelId?: number;
  /**
   * 标签名称
   */
  labelName?: string;
  /**
   * 排序
   */
  labelSort?: number;
  /**
   * 前端是否展示 0: 关闭 1:开启
   */
  labelVisible?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendPositionConfigurationVO".
 */
export interface RecommendPositionConfigurationVO1 {
  /**
   * 推荐内容
   */
  content?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 坑位开关，0：关闭；1：开启
   * * CLOSED:  0: 关闭
   * * OPEN: 1：开启
   */
  isOpen?: 0 | 1;
  /**
   * 坑位名称
   */
  name?: string;
  /**
   * 推荐策略类型，0：热门推荐；1：基于商品相关性推荐
   * * HOT:  0: 热门推荐
   * * RELEVANT: 1：基于商品相关性推荐
   */
  tacticsType?: 0 | 1;
  /**
   * 坑位标题
   */
  title?: string;
  /**
   * 坑位类型，0：购物车，1：商品详情，2：商品列表；3：个人中心；4：会员中心；5：收藏商品；6：支付成功页；7：分类
   * * SHOP_CART:  0: 购物车
   * * GOODS_DETAIL: 1：商品详情
   * * GOODS_LIST:  2: 商品列表
   * * USER_CENTER: 3：个人中心
   * * CUSTOMER_CENTER: 4：会员中心
   * * COLLECT_GOODS:  5: 收藏商品
   * * PAY_SUC: 6：支付成功页
   * * GOODS_CATE:  7: 分类
   * * MAGIC_BOX:  8: 魔方
   */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * 推荐上限
   */
  upperLimit?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IntelligentRecommendationClickGoodsRequest".
 */
export interface IntelligentRecommendationClickGoodsRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IntelligentRecommendationClickGoodsUnLoginRequest".
 */
export interface IntelligentRecommendationClickGoodsUnLoginRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
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
 * via the `definition` "IntelligentRecommendationOrderGoodsUnLoginRequest".
 */
export interface IntelligentRecommendationOrderGoodsRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGoodsRecommendListQueryRequestReq".
 */
export interface IGoodsRecommendListQueryRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  customerId?: string;
  item?: number;
  location?: number;
  pageIndex?: number;
  pageSize?: number;
  recommendType?: number;
  relationCateIdList?: number[];
  relationGoodsIdList?: string[];
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGoodsRecommendListForUnLoginQueryRequestReq".
 */
export interface IGoodsRecommendListForUnLoginQueryRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  customerId?: string;
  item?: number;
  location?: number;
  pageIndex?: number;
  pageSize?: number;
  recommendType?: number;
  relationCateIdList?: number[];
  relationGoodsIdList?: string[];
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IClickGoodsRequestReq".
 */
export interface IClickGoodsRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IOrderGoodsRequestReq".
 */
export interface IOrderGoodsRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IClickGoodsUnLoginRequestReq".
 */
export interface IClickGoodsUnLoginRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  cateId?: number;
  createTime?: string;
  customerId?: string;
  eventType?: number;
  goodsId?: string;
  item?: number;
  location?: number;
  recommendType?: number;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
