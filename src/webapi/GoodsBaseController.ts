import * as sdk from './fetch';

import isMock from './mock-util';

const serverInfo = '';
const controllerName = 'GoodsBaseController';

/**
 *
 * 获取某个商品的小程序码
 *
 */
async function getSkuQrCode(
  request: IGetSkuQrCodeRequestReq,
  skuId: IGetSkuQrCodeSkuIdReq,
): Promise<ValidateCodepostRes> {
  let result = await sdk.post<ValidateCodepostRes>(
    '/goods/getSkuQrCode'.replace('{skuId}', skuId + ''),

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询这个sku是否为正在进行中拼团
 *
 */
async function checkGroupOnFlag(
  goodsInfoId: ICheckGroupOnFlagGoodsInfoIdReq,
): Promise<GrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse> {
  let result = await sdk.get<GrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse>(
    '/goods/groupOn/sku/{goodsInfoId}'.replace('{goodsInfoId}', goodsInfoId + ''),
    {},
  );
  return result.context;
}

/**
 *
 * 拼团-进入商品详情
 *
 */
async function grouponGoodsDetailLogin(skuId: IGrouponGoodsDetailLoginSkuIdReq): Promise<GrouponGoodsViewByIdResponse> {
  let result = await sdk.get<GrouponGoodsViewByIdResponse>(
    '/goods/groupon/goods-detail/spu/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 拼团-进入拼团详情
 *
 */
async function grouponDetailByGrouponNo(
  grouponNo: IGrouponDetailByGrouponNoGrouponNoReq,
): Promise<GrouponGoodsViewByIdResponse> {
  let result = await sdk.get<GrouponGoodsViewByIdResponse>(
    '/goods/groupon/groupon-detail/{grouponNo}'.replace('{grouponNo}', grouponNo + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询积分Spu商品详情
 *
 */
async function pointsGoodsDetail(
  pointsGoodsId: IPointsGoodsDetailPointsGoodsIdReq,
): Promise<GoodsViewByPointsGoodsIdResponse> {
  let result = await sdk.get<GoodsViewByPointsGoodsIdResponse>(
    '/goods/points/spu/{pointsGoodsId}'.replace('{pointsGoodsId}', pointsGoodsId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 小C-店铺精选-进入商品详情
 *
 */
async function shopGoodsDetail(
  distributorId: IShopGoodsDetailDistributorIdReq,
  goodsId: IShopGoodsDetailGoodsIdReq,
  goodsInfoId: IShopGoodsDetailGoodsInfoIdReq,
): Promise<GoodsViewByIdAndSkuIdsResponse> {
  let result = await sdk.get<GoodsViewByIdAndSkuIdsResponse>(
    '/goods/shop/goods-detail/{distributorId}/{goodsId}/{goodsInfoId}'

      .replace('{distributorId}', distributorId + '')

      .replace('{goodsId}', goodsId + '')

      .replace('{goodsInfoId}', goodsInfoId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询Spu商品详情
 *
 */
async function detail(skuId: IDetailSkuIdReq,deliveryId:string=null): Promise<GoodsViewByIdResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    `/goods/spu/${skuId}/${deliveryId}`,

    {},
  );
  return result.context;
}
/**
 * 商品对应的限售模版信息
 */
async function getGoodsRestrictedTemplateInfo(request: { goodsId: string; provinceId: string; cityId: string; areaId: string;streetId:string }): Promise<unknown> {
  let result = await sdk.post<unknown>(
    `/goods/goodsRestrictedTemplate/query`,
    {
      ...request,
    },
  );
  return result.context;
}
/**
 * 蛋糕叔叔商品对应的限售模版信息
 */
async function getGoodsDangaoRestrictedInfo(request: { goodsNo: string; platformAddrIds:any[];skuNo:string,dangaossAddrId:string;thirdBrandId:string; }): Promise<unknown> {
  let result = await sdk.post<unknown>(
    `/goods/dangaoss/productDetail`,
    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询Spu商品详情-购物车
 *
 */
async function detailForShopCart(skuId: IDetailSkuIdReq,deliveryId:string): Promise<GoodsViewByIdResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    `/goods/spu/shopcart/${skuId}${deliveryId}`,

    {},
  );
  return result.context;
}

/**
 *
 * 查询Sku商品图文信息和属性
 *
 */
export async function goodsDetailProper(skuId: IDetailSkuIdReq): Promise<GoodsDetailProperResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    '/goods/goodsDetailProper/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}
/**
 *
 * 查询Sku商品图文信息和属性
 *
 */
export async function goodsDetailProper2(skuIds:string[]): Promise<GoodsDetailProperResponse> {
  let result = await sdk.post<GoodsViewByIdResponse>(
    '/goods/goodsDetailProper/list',

    {
      goodsInfoIds: skuIds,
    },
  );
  return result.context;
}

/**
 *
 * 查询商品简易信息
 *
 */
async function goodsDetailSimple(skuId: IDetailSkuIdReq): Promise<GoodsDetailSimpleResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    '/goods/goodsDetailSimple/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时,查询商品分页
 *
 */
async function spuListFront(queryRequest: ISpuListFrontQueryRequestReq): Promise<EsGoodsResponse> {
  let result = await sdk.post<EsGoodsResponse>(
    '/goods/spuListFront',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 商品分页
 *
 */
async function goodslist(queryRequest: IGoodslistQueryRequestReq): Promise<EsGoodsResponse> {
  let result = await sdk.post<EsGoodsResponse>(
    '/goods/spus',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 拼团-进入商品详情
 *
 */
async function grouponGoodsDetailUnLogin(
  skuId: IGrouponGoodsDetailUnLoginSkuIdReq,
): Promise<GrouponGoodsViewByIdResponse> {
  let result = await sdk.get<GrouponGoodsViewByIdResponse>(
    '/goods/unLogin/groupon/goods-detail/spu/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 拼团-进入拼团详情
 *
 */
async function grouponDetailByGrouponNoUnLogin(
  grouponNo: IGrouponDetailByGrouponNoUnLoginGrouponNoReq,
): Promise<GrouponGoodsViewByIdResponse> {
  let result = await sdk.get<GrouponGoodsViewByIdResponse>(
    '/goods/unLogin/groupon/groupon-detail/{grouponNo}'.replace('{grouponNo}', grouponNo + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时,查询Spu商品详情
 *
 */
async function unLoginDetail(skuId: IUnLoginDetailSkuIdReq): Promise<GoodsViewByIdResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    '/goods/unLogin/spu/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}
/**
 *
 * 未登录时,查询Spu商品详情
 *
 */
async function unLoginDetailForShopCart(skuId: IUnLoginDetailSkuIdReq): Promise<GoodsViewByIdResponse> {
  let result = await sdk.get<GoodsViewByIdResponse>(
    '/goods/unLogin/spu/shopcart/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 * 获取卡管品牌列表 (大牌卡券)
 * @returns 
 */
async function kaGuanBrandList() {
  const result = await sdk.post('/kaGuanBrand/list', {})
  return result.context
}

/**
 * 视觉权益
 * @returns 
 */
async function kaGuanCoupon() {
  const result = await sdk.post('/kaGuanCoupon/spus', {})
  return result.context
}

export default {
  getSkuQrCode,

  checkGroupOnFlag,

  grouponGoodsDetailLogin,

  grouponDetailByGrouponNo,

  pointsGoodsDetail,

  shopGoodsDetail,

  detail,

  spuListFront,

  goodslist,

  grouponGoodsDetailUnLogin,

  grouponDetailByGrouponNoUnLogin,

  unLoginDetail,
  detailForShopCart,
  unLoginDetailForShopCart,

  goodsDetailProper,
  goodsDetailProper2,
  goodsDetailSimple,
  getGoodsRestrictedTemplateInfo,
  getGoodsDangaoRestrictedInfo,
  kaGuanBrandList,
  kaGuanCoupon
};

/**
 * 内容
 */
export type ValidateCodepostRes = string;
/**
 * skuId
 *
 */
export type IGetSkuQrCodeSkuIdReq = string;
/**
 * 内容
 *
 */
export type ValidateCodepostRes1 = string;
/**
 * goodsInfoId
 *
 */
export type ICheckGroupOnFlagGoodsInfoIdReq = string;
/**
 * skuId
 *
 */
export type IGrouponGoodsDetailLoginSkuIdReq = string;
/**
 * grouponNo
 *
 */
export type IGrouponDetailByGrouponNoGrouponNoReq = string;
/**
 * pointsGoodsId
 *
 */
export type IPointsGoodsDetailPointsGoodsIdReq = string;
/**
 * distributorId
 *
 */
export type IShopGoodsDetailDistributorIdReq = string;
/**
 * goodsId
 *
 */
export type IShopGoodsDetailGoodsIdReq = string;
/**
 * goodsInfoId
 *
 */
export type IShopGoodsDetailGoodsInfoIdReq = string;
/**
 * skuId
 *
 */
export type IDetailSkuIdReq = string;
/**
 * skuId
 *
 */
export type IGrouponGoodsDetailUnLoginSkuIdReq = string;
/**
 * grouponNo
 *
 */
export type IGrouponDetailByGrouponNoUnLoginGrouponNoReq = string;
/**
 * skuId
 *
 */
export type IUnLoginDetailSkuIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}

/**
 */
export interface ShareMiniProgramRequest {
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 商品SkuId
   */
  skuId?: string;
  /**
   * 门店id
   */
  storeId?: number;

  [k: string]: any;
}

/**
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  context?: ValidateCodepostRes;
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
 */
export interface BaseResponseGrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse;
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
export interface GrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse {
  grouponGoodsInfoVO?: GrouponGoodsInfoVO;

  [k: string]: any;
}

/**
 * 拼团商品信息
 */
export interface GrouponGoodsInfoVO {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 活动结束时间
   */
  endTime?: string;
  /**
   * SPU编号
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销售数量
   */
  goodsSalesNum?: number;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团商品ID
   */
  grouponGoodsId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 限购数量
   */
  limitSellingNum?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 订单数量
   */
  orderSalesNum?: number;
  /**
   * 成团后退单金额
   */
  refundAmount?: number;
  /**
   * 成团后退单数量
   */
  refundNum?: number;
  /**
   * 规格名称
   */
  specText?: string;
  /**
   * 起售数量
   */
  startSellingNum?: number;
  /**
   * 活动开始时间
   */
  startTime?: string;
  /**
   * 活动状态 0：即将开始 1：进行中 2：已结束
   */
  status?: number;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 交易额
   */
  tradeAmount?: number;

  [k: string]: any;
}

/**
 * 商品信息
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

/**
 */
export interface GrouponGoodsByGrouponActivityIdAndGoodsInfoIdResponse1 {
  grouponGoodsInfoVO?: GrouponGoodsInfoVO;

  [k: string]: any;
}

/**
 */
export interface GrouponGoodsInfoVO1 {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 活动结束时间
   */
  endTime?: string;
  /**
   * SPU编号
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销售数量
   */
  goodsSalesNum?: number;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团商品ID
   */
  grouponGoodsId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 限购数量
   */
  limitSellingNum?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 订单数量
   */
  orderSalesNum?: number;
  /**
   * 成团后退单金额
   */
  refundAmount?: number;
  /**
   * 成团后退单数量
   */
  refundNum?: number;
  /**
   * 规格名称
   */
  specText?: string;
  /**
   * 起售数量
   */
  startSellingNum?: number;
  /**
   * 活动开始时间
   */
  startTime?: string;
  /**
   * 活动状态 0：即将开始 1：进行中 2：已结束
   */
  status?: number;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 交易额
   */
  tradeAmount?: number;

  [k: string]: any;
}

/**
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
 */
export interface BaseResponseGrouponGoodsViewByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponGoodsViewByIdResponse;
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
export interface GrouponGoodsViewByIdResponse {
  /**
   * 是否是分销商品
   */
  distributionGoods?: boolean;
  goods?: GoodsVO4;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO3[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO[];
  grouponDetails?: GrouponDetailWithGoodsVO;
  /**
   * 是否是拼团商品
   */
  grouponGoods?: boolean;
  grouponInstanceList?: GrouponInstanceWithCustomerInfoVO[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO[];

  [k: string]: any;
}

/**
 * 商品信息
 */
export interface GoodsVO4 {
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

export interface GoodsCustomerPriceVO {
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

export interface GoodsInfoVO3 {
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

export interface GoodsPropDetailRelVO {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface GoodsSpecDetailVO {
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
   * * NO: 0:否
   * * YES: 1:是
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

export interface GoodsTabRelaVO {
  /**
   * spu标识
   */
  goodsId?: string;
  /**
   * 内容详情
   */
  tabDetail?: string;
  /**
   * 详情模板id
   */
  tabId?: number;

  [k: string]: any;
}

/**
 * 拼团信息
 */
export interface GrouponDetailWithGoodsVO {
  customerVOList?: CustomerDetailWithImgVO[];
  goodInfoId?: string;
  grouponActivity?: GrouponActivityVO;
  grouponDetailOptStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  tradeGroupon?: TradeGrouponVO;

  [k: string]: any;
}

export interface CustomerDetailWithImgVO {
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;

  [k: string]: any;
}

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

export interface TradeGrouponVO {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;

  [k: string]: any;
}

export interface GrouponInstanceWithCustomerInfoVO {
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   *
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 参团人数参团人数
   */
  joinNum?: number;

  [k: string]: any;
}

export interface GoodsImageVO {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface StoreGoodsTabVO {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺分类标识
   */
  tabId?: number;
  /**
   * 模板名称
   */
  tabName?: string;

  [k: string]: any;
}

/**
 */
export interface GrouponGoodsViewByIdResponse1 {
  /**
   * 是否是分销商品
   */
  distributionGoods?: boolean;
  goods?: GoodsVO4;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO3[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO[];
  grouponDetails?: GrouponDetailWithGoodsVO;
  /**
   * 是否是拼团商品
   */
  grouponGoods?: boolean;
  grouponInstanceList?: GrouponInstanceWithCustomerInfoVO[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO[];

  [k: string]: any;
}

/**
 */
export interface GoodsCustomerPriceVO1 {
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
 */
export interface GoodsPropDetailRelVO1 {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsSpecDetailVO1 {
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
 */
export interface GoodsSpecVO1 {
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
 */
export interface GoodsTabRelaVO1 {
  /**
   * spu标识
   */
  goodsId?: string;
  /**
   * 内容详情
   */
  tabDetail?: string;
  /**
   * 详情模板id
   */
  tabId?: number;

  [k: string]: any;
}

/**
 */
export interface GrouponDetailWithGoodsVO1 {
  customerVOList?: CustomerDetailWithImgVO[];
  goodInfoId?: string;
  grouponActivity?: GrouponActivityVO;
  grouponDetailOptStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  tradeGroupon?: TradeGrouponVO;

  [k: string]: any;
}

/**
 */
export interface CustomerDetailWithImgVO1 {
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;

  [k: string]: any;
}

/**
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

/**
 */
export interface TradeGrouponVO1 {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;

  [k: string]: any;
}

/**
 */
export interface GrouponInstanceWithCustomerInfoVO1 {
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   *
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 参团人数参团人数
   */
  joinNum?: number;

  [k: string]: any;
}

/**
 */
export interface GoodsImageVO1 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 */
export interface StoreGoodsTabVO1 {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺分类标识
   */
  tabId?: number;
  /**
   * 模板名称
   */
  tabName?: string;

  [k: string]: any;
}

/**
 */
export interface BaseResponseGoodsViewByPointsGoodsIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsViewByPointsGoodsIdResponse;
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
export interface GoodsViewByPointsGoodsIdResponse {
  goods?: GoodsVO5;
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO4[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO2[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO2[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO2[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO2[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO2[];
  /**
   * 积分商品列表
   */
  pointsGoodsList?: PointsGoodsVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO2[];

  [k: string]: any;
}

/**
 * 商品信息
 */
export interface GoodsVO5 {
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

export interface GoodsInfoVO4 {
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

export interface GoodsPropDetailRelVO2 {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface GoodsSpecDetailVO2 {
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

export interface GoodsSpecVO2 {
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

export interface GoodsTabRelaVO2 {
  /**
   * spu标识
   */
  goodsId?: string;
  /**
   * 内容详情
   */
  tabDetail?: string;
  /**
   * 详情模板id
   */
  tabId?: number;

  [k: string]: any;
}

export interface GoodsImageVO2 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;

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
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  goods?: GoodsVO6;
  /**
   * SpuId
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO5;
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
  pointsGoodsCate?: PointsGoodsCateVO;
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
export interface GoodsVO6 {
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
 * SKU信息
 */
export interface GoodsInfoVO5 {
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
 * 分类信息
 */
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
   * * NO: 0:否
   * * YES: 1:是
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

export interface StoreGoodsTabVO2 {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺分类标识
   */
  tabId?: number;
  /**
   * 模板名称
   */
  tabName?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsViewByPointsGoodsIdResponse1 {
  goods?: GoodsVO5;
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO4[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO2[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO2[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO2[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO2[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO2[];
  /**
   * 积分商品列表
   */
  pointsGoodsList?: PointsGoodsVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO2[];

  [k: string]: any;
}

/**
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
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 兑换结束时间
   */
  endTime?: string;
  goods?: GoodsVO6;
  /**
   * SpuId
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO5;
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
  pointsGoodsCate?: PointsGoodsCateVO;
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
   * * NO: 0:否
   * * YES: 1:是
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
 */
export interface BaseResponseGoodsViewByIdAndSkuIdsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsViewByIdAndSkuIdsResponse;
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
export interface GoodsViewByIdAndSkuIdsResponse {
  goods?: GoodsVO7;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO2[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO6[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO2[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO3[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO3[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO3[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO3[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO3[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO3[];

  [k: string]: any;
}

/**
 * 商品信息
 */
export interface GoodsVO7 {
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

export interface GoodsCustomerPriceVO2 {
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

export interface GoodsInfoVO6 {
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

export interface GoodsIntervalPriceVO2 {
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

export interface GoodsLevelPriceVO2 {
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

export interface GoodsPropDetailRelVO3 {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface GoodsSpecDetailVO3 {
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

export interface GoodsSpecVO3 {
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

export interface GoodsTabRelaVO3 {
  /**
   * spu标识
   */
  goodsId?: string;
  /**
   * 内容详情
   */
  tabDetail?: string;
  /**
   * 详情模板id
   */
  tabId?: number;

  [k: string]: any;
}

export interface GoodsImageVO3 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface StoreGoodsTabVO3 {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺分类标识
   */
  tabId?: number;
  /**
   * 模板名称
   */
  tabName?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsViewByIdAndSkuIdsResponse1 {
  goods?: GoodsVO7;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO2[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO6[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO2[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO3[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO3[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO3[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO3[];
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO3[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO3[];

  [k: string]: any;
}

/**
 */
export interface BaseResponseGoodsViewByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsViewByIdResponse;
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
export interface GoodsViewByIdResponse {
  /**
   * 是否是分销商品
   */
  distributionGoods?: boolean;
  goods?: GoodsVO8;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO3[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO7[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO3[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO3[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO4[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO4[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO4[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO4[];
  /**
   * 拼团活动
   */
  grouponFlag?: boolean;
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO4[];
  /**
   * 操作日志
   */
  operateDataLogVOList?: OperateDataLogVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO4[];

  [k: string]: any;
}

/**
 * 内容
 */
export interface GoodsDetailSimpleResponse {
  goods?: GoodsVO8;

  /**
   * 商品相关图片
   */
  images?: GoodsImageVO4[];

  [k: string]: any;
}

/**
 * 图文内容和属性
 */
export interface GoodsDetailProperResponse {
  /**
   * 是否定时上架 true:是,false:否
   */
  goodsDetail?: string;

  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO4[];

  [k: string]: any;
}

/**
 * 商品信息
 */
export interface GoodsVO8 {
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

export interface GoodsCustomerPriceVO3 {
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

export interface GoodsInfoVO7 {
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

export interface GoodsIntervalPriceVO3 {
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

export interface GoodsLevelPriceVO3 {
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

export interface GoodsPropDetailRelVO4 {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface GoodsSpecDetailVO4 {
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

export interface GoodsSpecVO4 {
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

export interface GoodsTabRelaVO4 {
  /**
   * spu标识
   */
  goodsId?: string;
  /**
   * 内容详情
   */
  tabDetail?: string;
  /**
   * 详情模板id
   */
  tabId?: number;

  [k: string]: any;
}

export interface GoodsImageVO4 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

export interface OperateDataLogVO {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 操作人账号
   */
  operateAccount?: string;
  /**
   * 操作后数据
   */
  operateAfterData?: string;
  /**
   * 操作前数据
   */
  operateBeforeData?: string;
  /**
   * 操作内容
   */
  operateContent?: string;
  /**
   * 操作标识
   */
  operateId?: string;
  /**
   * 操作人名称
   */
  operateName?: string;
  /**
   * 操作时间
   */
  operateTime?: string;

  [k: string]: any;
}

export interface StoreGoodsTabVO4 {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺分类标识
   */
  tabId?: number;
  /**
   * 模板名称
   */
  tabName?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsViewByIdResponse1 {
  /**
   * 是否是分销商品
   */
  distributionGoods?: boolean;
  goods?: GoodsVO8;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO3[];
  /**
   * 商品SKU列表
   */
  goodsInfos?: GoodsInfoVO7[];
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO3[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO3[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO4[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO4[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO4[];
  /**
   * 商品详情模板关联
   */
  goodsTabRelas?: GoodsTabRelaVO4[];
  /**
   * 拼团活动
   */
  grouponFlag?: boolean;
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO4[];
  /**
   * 操作日志
   */
  operateDataLogVOList?: OperateDataLogVO[];
  /**
   * 商品模板配置
   */
  storeGoodsTabs?: StoreGoodsTabVO4[];

  [k: string]: any;
}

/**
 */
export interface OperateDataLogVO1 {
  /**
   * 删除标记
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 操作人账号
   */
  operateAccount?: string;
  /**
   * 操作后数据
   */
  operateAfterData?: string;
  /**
   * 操作前数据
   */
  operateBeforeData?: string;
  /**
   * 操作内容
   */
  operateContent?: string;
  /**
   * 操作标识
   */
  operateId?: string;
  /**
   * 操作人名称
   */
  operateName?: string;
  /**
   * 操作时间
   */
  operateTime?: string;

  [k: string]: any;
}

/**
 */
export interface EsGoodsInfoQueryRequest {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 企业购商品审核状态 0:无状态 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  enterPriseAuditStatus?: number;
  /**
   * 分销商品状态，配合分销开关使用
   */
  enterPriseGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 是否魔方商品列表 true:是
   */
  moFangFlag?: boolean;
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
   * 积分抵扣选项
   */
  pointsUsageFlag?: boolean;
  /**
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;

  [k: string]: any;
}

export interface AbstractAggregationBuilder {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface PipelineAggregationBuilder {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface AggregationBuilder {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface PipelineAggregationBuilder1 {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface AggregationBuilder1 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface EsGoodsInfoDTO {
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 购买数量
   */
  goodsNum?: number;

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

export interface EsPropQueryRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 搜索属性值
   */
  detailIds?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest2;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest3;
  /**
   * 搜索属性
   */
  propId?: number;
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

export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;

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

export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface SearchQuery {
  aggregations?: AbstractAggregationBuilder1[];
  elasticsearchSorts?: SortBuilder[];
  facets?: FacetRequest[];
  fields?: string[];
  filter?: QueryBuilder;
  highlightBuilder?: HighlightBuilder;
  highlightFields?: Field[];
  ids?: string[];
  indices?: string[];
  indicesBoost?: IndexBoost[];
  indicesOptions?: IndicesOptions;
  minScore?: number;
  pageable?: Pageable;
  query?: QueryBuilder1;
  route?: string;
  scriptFields?: ScriptField[];
  searchType?: 'DFS_QUERY_THEN_FETCH' | 'QUERY_THEN_FETCH' | 'QUERY_AND_FETCH';
  sort?: Sort3;
  sourceFilter?: SourceFilter;
  trackScores?: boolean;
  types?: string[];

  [k: string]: any;
}

export interface AbstractAggregationBuilder1 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface SortBuilder {
  fragment?: boolean;
  writeableName?: string;

  [k: string]: any;
}

export interface FacetRequest {
  facet?: AbstractAggregationBuilder2;

  [k: string]: any;
}

export interface AbstractAggregationBuilder2 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface QueryBuilder {
  fragment?: boolean;
  name?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface HighlightBuilder {
  fragment?: boolean;

  [k: string]: any;
}

export interface Field {
  fragment?: boolean;

  [k: string]: any;
}

export interface IndexBoost {
  boost?: number;
  indexName?: string;

  [k: string]: any;
}

export interface IndicesOptions {
  fragment?: boolean;

  [k: string]: any;
}

export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;

  [k: string]: any;
}

export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface QueryBuilder1 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;

  [k: string]: any;
}

export interface ScriptField {
  [k: string]: any;
}

export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface SourceFilter {
  excludes?: string[];
  includes?: string[];

  [k: string]: any;
}

export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface SortBuilder1 {
  fragment?: boolean;
  writeableName?: string;

  [k: string]: any;
}

export interface EsSpecQueryRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 搜索规格项
   */
  name?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest4;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest5;
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
  /**
   * 搜索规格值
   */
  values?: string[];

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

export interface PageRequest5 {
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

export interface QueryBuilder2 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface AbstractAggregationBuilder3 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface PipelineAggregationBuilder2 {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface AggregationBuilder2 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface EsGoodsInfoDTO1 {
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 购买数量
   */
  goodsNum?: number;

  [k: string]: any;
}

/**
 */
export interface PageRequest6 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;

  [k: string]: any;
}

/**
 */
export interface EsPropQueryRequest1 {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 搜索属性值
   */
  detailIds?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest2;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest3;
  /**
   * 搜索属性
   */
  propId?: number;
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
 */
export interface SearchQuery1 {
  aggregations?: AbstractAggregationBuilder1[];
  elasticsearchSorts?: SortBuilder[];
  facets?: FacetRequest[];
  fields?: string[];
  filter?: QueryBuilder;
  highlightBuilder?: HighlightBuilder;
  highlightFields?: Field[];
  ids?: string[];
  indices?: string[];
  indicesBoost?: IndexBoost[];
  indicesOptions?: IndicesOptions;
  minScore?: number;
  pageable?: Pageable;
  query?: QueryBuilder1;
  route?: string;
  scriptFields?: ScriptField[];
  searchType?: 'DFS_QUERY_THEN_FETCH' | 'QUERY_THEN_FETCH' | 'QUERY_AND_FETCH';
  sort?: Sort3;
  sourceFilter?: SourceFilter;
  trackScores?: boolean;
  types?: string[];

  [k: string]: any;
}

/**
 */
export interface FacetRequest1 {
  facet?: AbstractAggregationBuilder2;

  [k: string]: any;
}

/**
 */
export interface HighlightBuilder1 {
  fragment?: boolean;

  [k: string]: any;
}

/**
 */
export interface Field1 {
  fragment?: boolean;

  [k: string]: any;
}

/**
 */
export interface IndexBoost1 {
  boost?: number;
  indexName?: string;

  [k: string]: any;
}

/**
 */
export interface IndicesOptions1 {
  fragment?: boolean;

  [k: string]: any;
}

/**
 */
export interface Pageable1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;

  [k: string]: any;
}

/**
 */
export interface ScriptField1 {
  [k: string]: any;
}

/**
 */
export interface SourceFilter1 {
  excludes?: string[];
  includes?: string[];

  [k: string]: any;
}

/**
 */
export interface Sort6 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

/**
 */
export interface SortBuilder2 {
  fragment?: boolean;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface EsSpecQueryRequest1 {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 搜索规格项
   */
  name?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest4;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest5;
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
  /**
   * 搜索规格值
   */
  values?: string[];

  [k: string]: any;
}

/**
 */
export interface QueryBuilder3 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;

  [k: string]: any;
}

/**
 */
export interface BaseResponseEsGoodsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EsGoodsResponse;
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
export interface EsGoodsResponse {
  /**
   * 预约抢购信息列表
   */
  appointmentSaleVOList?: AppointmentSaleVO2[];
  /**
   * 预售信息列表结果
   */
  bookingSaleVOList?: BookingSaleVO2[];
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  esGoods?: PageEsGoods;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO5[];
  /**
   * SPU
   */
  goodsList?: GoodsVO10[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO5[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO5[];

  [k: string]: any;
}

export interface AppointmentSaleVO2 {
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

export interface BookingSaleVO2 {
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

export interface GoodsBrandVO {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 品牌别名
   */
  nickName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
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

/**
 * 索引SKU
 */
export interface PageEsGoods {
  content?: EsGoods[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort8;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

export interface EsGoods {
  addedTime?: string;
  auditStatus?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  /**
   * 排序的价格
   */
  esSortPrice?: number;
  forbidStatus?: number;
  goodsBrand?: GoodsBrandNest;
  goodsCate?: GoodsCateNest;
  goodsCollectNum?: number;
  goodsEvaluateNum?: number;
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
  goodsInfos?: GoodsInfoNest[];
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsSalesNum?: number;
  id?: string;
  lowGoodsName?: string;
  marketingList?: MarketingForEndVO[];
  pinyinGoodsName?: string;
  propDetails?: GoodsPropDetailRelVO5[];
  sortNo?: number;
  specDetails?: GoodsInfoSpecDetailRelNest[];
  /**
   * 库存
   */
  stock?: number;
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

export interface GoodsBrandNest {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;

  [k: string]: any;
}

export interface GoodsCateNest {
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  goodsCateShenceBurialSite?: GoodsCateShenceBurialSiteVO;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;

  [k: string]: any;
}

/**
 * 一二级分类信息
 */
export interface GoodsCateShenceBurialSiteVO {
  oneLevelGoodsCate?: GoodsCateVO2;
  secondLevelGoodsCate?: GoodsCateVO3;
  threeLevelGoodsCate?: GoodsCateVO4;

  [k: string]: any;
}

export interface GoodsCateVO2 {
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

export interface GoodsCateVO3 {
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

export interface GoodsCateVO4 {
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
  couponLabels?: CouponLabelVO2[];
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   */
  enterPriseAuditStatus?: number;
  /**
   * 企业购商品审核未通过的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 排序的价格
   */
  esSortPrice?: number;
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
  grouponLabel?: GrouponLabelVO2;
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
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
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
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
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
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   */
  validFlag?: number;

  [k: string]: any;
}

export interface CouponLabelVO2 {
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
export interface GrouponLabelVO2 {
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

export interface MarketingLabelVO2 {
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

export interface MarketingForEndVO {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 营销打包一口价多级优惠列表
   */
  buyoutPriceLevelList?: MarketingBuyoutPriceLevelVO[];
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 营销满折多级优惠列表
   */
  fullDiscountLevelList?: MarketingFullDiscountLevelVO[];
  /**
   * 营销满赠多级优惠列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO[];
  /**
   * 营销满减多级优惠列表
   */
  fullReductionLevelList?: MarketingFullReductionLevelVO[];
  goodsList?: GoodsInfoResponseVO;
  halfPriceSecondPieceLevel?: MarketingHalfPriceSecondPieceLevelVO[];
  /**
   * 是否是商家
   * * NO: 否
   * * YES: 是
   */
  isBoss?: 0 | 1;
  /**
   * 是否暂停
   * * NO: 否
   * * YES: 是
   */
  isPause?: 0 | 1;
  /**
   * 参加会员
   * * SPECIFY_GROUP: -3：指定人群
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  joinLevel?: number;
  /**
   * 关联其他等级的等级id集合
   */
  joinLevelList?: number[];
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 关联客户等级
   * * SPECIFY_GROUP: -3：指定人群
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  marketingJoinLevel?: -3 | -2 | -1 | 0 | 1;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 参加营销类型
   * * SCOPE_TYPE_ALL: 0：所有货品
   * * SCOPE_TYPE_CUSTOM: 1：自定义货品
   */
  scopeType?: 0 | 1;
  /**
   * 商家Id，0：boss, other:其他商家
   */
  storeId?: number;
  /**
   * 营销子类型
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
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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

export interface MarketingBuyoutPriceLevelVO {
  /**
   * 任选数量
   */
  choiceCount?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * 打包级别Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

export interface MarketingFullDiscountLevelVO {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;

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

export interface MarketingFullReductionLevelVO {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

/**
 * 营销关联商品信息
 */
export interface GoodsInfoResponseVO {
  /**
   * 品牌列表
   */
  brands?: GoodsBrandVO1[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO5[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO9[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO4[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO9[];

  [k: string]: any;
}

export interface GoodsBrandVO1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 品牌别名
   */
  nickName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
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

export interface GoodsCateVO5 {
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
 * 分页商品SKU信息
 */
export interface MicroServicePageGoodsInfoVO {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO8[];
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
  sort?: Sort7;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

export interface GoodsInfoVO8 {
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

export interface Sort7 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface GoodsInfoVO9 {
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

export interface GoodsIntervalPriceVO4 {
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

export interface GoodsVO9 {
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

export interface MarketingHalfPriceSecondPieceLevelVO {
  /**
   * discount
   */
  discount?: number;
  /**
   * 打包级别Id
   */
  id?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * number
   */
  number?: number;

  [k: string]: any;
}

export interface MarketingScopeVO {
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销和商品关联表Id
   */
  marketingScopeId?: number;
  /**
   * 营销范围Id
   */
  scopeId?: string;

  [k: string]: any;
}

export interface GoodsPropDetailRelVO5 {
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
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;

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
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值拼音名称
   */
  pinyinName?: string;
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

export interface Pageable2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;

  [k: string]: any;
}

export interface Sort8 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;

  [k: string]: any;
}

export interface GoodsIntervalPriceVO5 {
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

export interface GoodsVO10 {
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

export interface GoodsSpecDetailVO5 {
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

export interface GoodsSpecVO5 {
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
 */
export interface EsGoodsResponse1 {
  /**
   * 预约抢购信息列表
   */
  appointmentSaleVOList?: AppointmentSaleVO2[];
  /**
   * 预售信息列表结果
   */
  bookingSaleVOList?: BookingSaleVO2[];
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  esGoods?: PageEsGoods;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO5[];
  /**
   * SPU
   */
  goodsList?: GoodsVO10[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO5[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO5[];

  [k: string]: any;
}

/**
 */
export interface GoodsBrandVO2 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 品牌别名
   */
  nickName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
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
 */
export interface GoodsCateVO6 {
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
 */
export interface PageEsGoods1 {
  content?: EsGoods[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort8;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

/**
 */
export interface EsGoods1 {
  addedTime?: string;
  auditStatus?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  /**
   * 排序的价格
   */
  esSortPrice?: number;
  forbidStatus?: number;
  goodsBrand?: GoodsBrandNest;
  goodsCate?: GoodsCateNest;
  goodsCollectNum?: number;
  goodsEvaluateNum?: number;
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
  goodsInfos?: GoodsInfoNest[];
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsSalesNum?: number;
  id?: string;
  lowGoodsName?: string;
  marketingList?: MarketingForEndVO[];
  pinyinGoodsName?: string;
  propDetails?: GoodsPropDetailRelVO5[];
  sortNo?: number;
  specDetails?: GoodsInfoSpecDetailRelNest[];
  /**
   * 库存
   */
  stock?: number;
  storeCateIds?: number[];
  storeState?: number;

  [k: string]: any;
}

/**
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
 */
export interface GoodsBrandNest1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsCateNest1 {
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  goodsCateShenceBurialSite?: GoodsCateShenceBurialSiteVO;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;

  [k: string]: any;
}

/**
 */
export interface GoodsCateShenceBurialSiteVO1 {
  oneLevelGoodsCate?: GoodsCateVO2;
  secondLevelGoodsCate?: GoodsCateVO3;
  threeLevelGoodsCate?: GoodsCateVO4;

  [k: string]: any;
}

/**
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
  couponLabels?: CouponLabelVO2[];
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   */
  enterPriseAuditStatus?: number;
  /**
   * 企业购商品审核未通过的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 排序的价格
   */
  esSortPrice?: number;
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
  grouponLabel?: GrouponLabelVO2;
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
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
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
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
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
 */
export interface MarketingForEndVO1 {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 营销打包一口价多级优惠列表
   */
  buyoutPriceLevelList?: MarketingBuyoutPriceLevelVO[];
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 营销满折多级优惠列表
   */
  fullDiscountLevelList?: MarketingFullDiscountLevelVO[];
  /**
   * 营销满赠多级优惠列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO[];
  /**
   * 营销满减多级优惠列表
   */
  fullReductionLevelList?: MarketingFullReductionLevelVO[];
  goodsList?: GoodsInfoResponseVO;
  halfPriceSecondPieceLevel?: MarketingHalfPriceSecondPieceLevelVO[];
  /**
   * 是否是商家
   * * NO: 否
   * * YES: 是
   */
  isBoss?: 0 | 1;
  /**
   * 是否暂停
   * * NO: 否
   * * YES: 是
   */
  isPause?: 0 | 1;
  /**
   * 参加会员
   * * SPECIFY_GROUP: -3：指定人群
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  joinLevel?: number;
  /**
   * 关联其他等级的等级id集合
   */
  joinLevelList?: number[];
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 关联客户等级
   * * SPECIFY_GROUP: -3：指定人群
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  marketingJoinLevel?: -3 | -2 | -1 | 0 | 1;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 参加营销类型
   * * SCOPE_TYPE_ALL: 0：所有货品
   * * SCOPE_TYPE_CUSTOM: 1：自定义货品
   */
  scopeType?: 0 | 1;
  /**
   * 商家Id，0：boss, other:其他商家
   */
  storeId?: number;
  /**
   * 营销子类型
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
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
 */
export interface MarketingBuyoutPriceLevelVO1 {
  /**
   * 任选数量
   */
  choiceCount?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * 打包级别Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

/**
 */
export interface MarketingFullDiscountLevelVO1 {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;

  [k: string]: any;
}

/**
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

/**
 */
export interface MarketingFullReductionLevelVO1 {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

/**
 */
export interface GoodsInfoResponseVO1 {
  /**
   * 品牌列表
   */
  brands?: GoodsBrandVO1[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO5[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO9[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO4[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO9[];

  [k: string]: any;
}

/**
 */
export interface MicroServicePageGoodsInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO8[];
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
  sort?: Sort7;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

/**
 */
export interface MarketingHalfPriceSecondPieceLevelVO1 {
  /**
   * discount
   */
  discount?: number;
  /**
   * 打包级别Id
   */
  id?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * number
   */
  number?: number;

  [k: string]: any;
}

/**
 */
export interface MarketingScopeVO1 {
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销和商品关联表Id
   */
  marketingScopeId?: number;
  /**
   * 营销范围Id
   */
  scopeId?: string;

  [k: string]: any;
}

/**
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
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值拼音名称
   */
  pinyinName?: string;
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
 */
export interface IGetSkuQrCodeRequestReq {
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 商品SkuId
   */
  skuId?: string;
  /**
   * 门店id
   */
  storeId?: number;

  [k: string]: any;
}

/**
 */
export interface ISpuListFrontQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 企业购商品审核状态 0:无状态 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  enterPriseAuditStatus?: number;
  /**
   * 分销商品状态，配合分销开关使用
   */
  enterPriseGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 是否魔方商品列表 true:是
   */
  moFangFlag?: boolean;
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
   * 积分抵扣选项
   */
  pointsUsageFlag?: boolean;
  /**
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;

  [k: string]: any;
}

/**
 */
export interface IGoodslistQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 企业购商品审核状态 0:无状态 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  enterPriseAuditStatus?: number;
  /**
   * 分销商品状态，配合分销开关使用
   */
  enterPriseGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 是否魔方商品列表 true:是
   */
  moFangFlag?: boolean;
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
   * 积分抵扣选项
   */
  pointsUsageFlag?: boolean;
  /**
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;

  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
