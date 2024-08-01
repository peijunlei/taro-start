import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MarketingFullGiftController';

/**
 *
 * 未登录时根据营销Id获取赠品信息
 *
 */
async function getGiftByMarketingIdWithOutLogin(
  marketingId: IGetGiftByMarketingIdWithOutLoginMarketingIdReq,
): Promise<FullGiftLevelListByMarketingIdAndCustomerResponse> {
  let result = await sdk.get<FullGiftLevelListByMarketingIdAndCustomerResponse>(
    '/gift/unLogin/{marketingId}'.replace('{marketingId}', marketingId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据营销Id获取赠品信息
 *
 */
async function getGiftByMarketingId(
  marketingId: IGetGiftByMarketingIdMarketingIdReq,
): Promise<FullGiftLevelListByMarketingIdAndCustomerResponse> {
  let result = await sdk.get<FullGiftLevelListByMarketingIdAndCustomerResponse>(
    '/gift/{marketingId}'.replace('{marketingId}', marketingId + ''),

    {},
  );
  return result.context;
}

/**
 * 确认订单页营销活动
 * 根据营销Id获取赠品信息
 *
 */
async function getGiftByMarketingIdForOrder(
  levelId: IGetGiftByMarketingIdLevelIdReq,
  marketingId: IGetGiftByMarketingIdMarketingIdReq,
): Promise<FullGiftLevelListByMarketingIdAndCustomerResponse> {
  let result = await sdk.get<FullGiftLevelListByMarketingIdAndCustomerResponse>(
    '/gift/{marketingId}/{levelId}'

      .replace('{levelId}', levelId + '')

      .replace('{marketingId}', marketingId + ''),

    {},
  );
  return result.context;
}

export default {
  getGiftByMarketingIdWithOutLogin,

  getGiftByMarketingId,

  getGiftByMarketingIdForOrder,
};

/**
 * 营销Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGiftByMarketingIdWithOutLoginMarketingIdReq".
 */
export type IGetGiftByMarketingIdWithOutLoginMarketingIdReq = number;
/**
 * 营销Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGiftByMarketingIdMarketingIdReq".
 */
export type IGetGiftByMarketingIdMarketingIdReq = number;
/**
 * levelId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGiftByMarketingIdLevelIdReq".
 */
export type IGetGiftByMarketingIdLevelIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«FullGiftLevelListByMarketingIdAndCustomerResponse»".
 */
export interface BaseResponseFullGiftLevelListByMarketingIdAndCustomerResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FullGiftLevelListByMarketingIdAndCustomerResponse;
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
export interface FullGiftLevelListByMarketingIdAndCustomerResponse {
  /**
   * 赠品列表
   */
  giftList?: GoodsInfoVO[];
  /**
   * 活动规则列表
   */
  levelList?: MarketingFullGiftLevelVO[];
  /**
   * 活动子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   * * HALF_PRICE_SECOND_PIECE: 7：第二件半价优惠活动
   * * SUITS_GOODS: 8：组合商品
   */
  marketingSubType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
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
   * 供应商Id
   */
  providerId?: number;
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
  appointmentSaleGood?: null;
  /**
   * 预约活动商品信息列表
   */
  appointmentSaleGoods?: null[];
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
  goodsVO?: GoodsVO;
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
 * spu信息
 */
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
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
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
   * 更新时间
   */
  updateTime?: string;
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
  goodsVO?: GoodsVO;
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
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
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
export interface MarketingFullGiftLevelVO {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;
  [k: string]: any;
}
export interface MarketingFullGiftDetailVO {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FullGiftLevelListByMarketingIdAndCustomerResponse".
 */
export interface FullGiftLevelListByMarketingIdAndCustomerResponse1 {
  /**
   * 赠品列表
   */
  giftList?: GoodsInfoVO[];
  /**
   * 活动规则列表
   */
  levelList?: MarketingFullGiftLevelVO[];
  /**
   * 活动子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   * * HALF_PRICE_SECOND_PIECE: 7：第二件半价优惠活动
   * * SUITS_GOODS: 8：组合商品
   */
  marketingSubType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
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
   * 供应商Id
   */
  providerId?: number;
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
  appointmentSaleGood?: null;
  /**
   * 预约活动商品信息列表
   */
  appointmentSaleGoods?: null[];
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
  goodsInfoVO?: GoodsInfoVO2;
  /**
   * spu商品名称
   */
  goodsName?: string;
  goodsVO?: GoodsVO2;
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
 * 商品信息
 */
export interface GoodsInfoVO2 {
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
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
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
   * 供应商Id
   */
  providerId?: number;
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
 * spu信息
 */
export interface GoodsVO2 {
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
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
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
   * 更新时间
   */
  updateTime?: string;
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
  goodsVO?: GoodsVO;
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
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO3 {
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
   * 供应商id
   */
  providerId?: number;
  /**
   * 供应商名称
   */
  providerName?: string;
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
   * 更新时间
   */
  updateTime?: string;
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
 * via the `definition` "MarketingFullGiftLevelVO".
 */
export interface MarketingFullGiftLevelVO1 {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftDetailVO".
 */
export interface MarketingFullGiftDetailVO1 {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
