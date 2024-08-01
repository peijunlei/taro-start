import * as sdk from './fetch';

const controllerName = 'PurchaseBaseController';

/**
 *
 * 采购单商品移入收藏夹
 *
 */
async function addFollow(queryRequest: IAddFollowQueryRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/site/addFollow',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 批量新增采购单
 *
 */
async function purchase(request: IBatchAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/site/purchase',

    {
      ...request,
    },
  );
  return result.context;
}

async function batchAdd(request: IBatchAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/site/batchAdd',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清除失效商品
 *
 */
async function clearLoseGoods_(request:any): Promise<unknown> {
  let result = await sdk.deleteF(
    '/site/clearLoseGoods',

    {...request},
  );
  return result.context;
}

/**
 *
 * 获取采购单商品数量
 *
 */
async function countGoods(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/site/countGoods',

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时,根据参数获取迷你采购单信息
 *
 */
async function miniFrontInfo(request: IMiniFrontInfoRequestReq): Promise<MiniPurchaseResponse> {
  let result = await sdk.post<MiniPurchaseResponse>(
    '/site/front/miniPurchases',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 未登录时,根据采购单缓存信息获取采购单详情
 *
 */
async function frontInfo(request: IFrontInfoRequestReq): Promise<PurchaseResponse> {
  let result = await sdk.post<PurchaseResponse>(
    '/site/front/purchases',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取采购单所有商品使用的营销
 *
 */
async function queryGoodsMarketingList(): Promise<GoodsMarketingVOArray> {
  let result = await sdk.get<GoodsMarketingVOArray>(
    '/site/goodsMarketing',

    {},
  );
  return result.context;
}

/**
 *
 * 修改商品选择的营销
 *
 */
async function modifyGoodsMarketing(
  goodsInfoId: IModifyGoodsMarketingGoodsInfoIdReq,
  marketingId: IModifyGoodsMarketingMarketingIdReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/site/goodsMarketing/{goodsInfoId}/{marketingId}'

      .replace('{goodsInfoId}', goodsInfoId + '')

      .replace('{marketingId}', marketingId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 合并登录前后采购单
 *
 */
async function mergePurchase(request: IMergePurchaseRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/site/mergePurchase',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取迷你采购单
 *
 */
async function miniInfo(): Promise<PurchaseMiniListResponse> {
  let result = await sdk.post<PurchaseMiniListResponse>(
    '/site/miniPurchases',

    {},
  );
  return result.context;
}

/**
 *
 * 新增采购单
 *
 */
async function add(request: IAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/site/purchase',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 调整数量
 *
 */
async function edit(request: IEditRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/site/purchase',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 删除采购单
 *
 */
async function delete_(request: IDelete_RequestReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/site/purchase',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取采购单
 *
 */
async function info(request: IInfoRequestReq): Promise<PurchaseListResponse> {
  let result = await sdk.post<PurchaseListResponse>(
    '/site/purchases',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 计算采购单中参加同种营销的商品列表/总额/优惠
 *
 */
async function calcMarketingByMarketingId(
  marketingId: ICalcMarketingByMarketingIdMarketingIdReq,
): Promise<PurchaseCalcMarketingResponse> {
  let result = await sdk.get<PurchaseCalcMarketingResponse>(
    '/site/{marketingId}/calcMarketingByMarketingId'.replace('{marketingId}', marketingId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时,计算采购单中参加同种营销的商品列表/总额/优惠
 *
 */
async function calcMarketingByMarketingIdFront(
  marketingId: ICalcMarketingByMarketingIdFrontMarketingIdReq,
  queryRequest: ICalcMarketingByMarketingIdFrontQueryRequestReq,
): Promise<PurchaseCalcMarketingResponse> {
  let result = await sdk.post<PurchaseCalcMarketingResponse>(
    '/site/{marketingId}/calcMarketingByMarketingIdFront'.replace('{marketingId}', marketingId + ''),

    {
      ...queryRequest,
    },
  );
  return result.context;
}

export default {
  addFollow,

  batchAdd,

  clearLoseGoods_,

  countGoods,

  miniFrontInfo,

  frontInfo,

  queryGoodsMarketingList,

  modifyGoodsMarketing,

  mergePurchase,

  miniInfo,

  add,

  edit,

  delete_,

  info,

  calcMarketingByMarketingId,

  calcMarketingByMarketingIdFront,

  purchaseInfo,

  getStoreCouponExist,

  purchaseOtherInfo,

  frontPurchaseInfo,

  frontPurchaseOtherInfo,

  purchase
};

/**
 * 内容
 */
export type GoodsMarketingVOArray = GoodsMarketingVO2[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsMarketingVOArray".
 */
export type GoodsMarketingVOArray1 = GoodsMarketingVO4[];
/**
 * 营销Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyGoodsMarketingMarketingIdReq".
 */
export type IModifyGoodsMarketingMarketingIdReq = number;
/**
 * 营销Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICalcMarketingByMarketingIdMarketingIdReq".
 */
export type ICalcMarketingByMarketingIdMarketingIdReq = number;
/**
 * 营销Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICalcMarketingByMarketingIdFrontMarketingIdReq".
 */
export type ICalcMarketingByMarketingIdFrontMarketingIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseAddFollowRequest".
 */
export interface PurchaseAddFollowRequest {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelDTO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
export interface GoodsInfoDTO {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
export interface CouponLabelDTO {
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
export interface MarketingLabelDTO {
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
 * via the `definition` "CustomerLevelDTO".
 */
export interface CustomerLevelDTO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
 * via the `definition` "GoodsInfoDTO".
 */
export interface GoodsInfoDTO1 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
 * via the `definition` "CouponLabelDTO".
 */
export interface CouponLabelDTO1 {
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
 * via the `definition` "MarketingLabelDTO".
 */
export interface MarketingLabelDTO1 {
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
 * via the `definition` "PurchaseBatchSaveRequest".
 */
export interface PurchaseBatchSaveRequest {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO2;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO2[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelDTO2 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
export interface GoodsInfoDTO2 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
 * via the `definition` "BaseResponse«int»".
 */
export interface BaseResponseInt {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: number;
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
 * via the `definition` "PurchaseFrontMiniRequest".
 */
export interface PurchaseFrontMiniRequest {
  /**
   * 前端采购单缓存中的多个sku
   */
  goodsInfoDTOList?: PurchaseGoodsInfoDTO[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PurchaseGoodsInfoDTO {
  /**
   * SkuId
   */
  goodsInfoId: string;
  /**
   * 购买数量
   */
  goodsNum: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseGoodsInfoDTO".
 */
export interface PurchaseGoodsInfoDTO1 {
  /**
   * SkuId
   */
  goodsInfoId: string;
  /**
   * 购买数量
   */
  goodsNum: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MiniPurchaseResponse»".
 */
export interface BaseResponseMiniPurchaseResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MiniPurchaseResponse;
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
export interface MiniPurchaseResponse {
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品
   */
  goodsList?: PurchaseGoodsReponse[];
  /**
   * 购买商品总计
   */
  num?: number;
  /**
   * 采购单数量
   */
  purchaseCount?: number;
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
export interface PurchaseGoodsReponse {
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
  goods?: GoodsVO;
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
   * spu标题
   */
  goodsName?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MiniPurchaseResponse".
 */
export interface MiniPurchaseResponse1 {
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品
   */
  goodsList?: PurchaseGoodsReponse[];
  /**
   * 购买商品总计
   */
  num?: number;
  /**
   * 采购单数量
   */
  purchaseCount?: number;
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
 * via the `definition` "PurchaseGoodsReponse".
 */
export interface PurchaseGoodsReponse1 {
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
  goods?: GoodsVO;
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
   * spu标题
   */
  goodsName?: string;
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
 * via the `definition` "PurchaseFrontRequest".
 */
export interface PurchaseFrontRequest {
  /**
   * 前端采购单缓存中的多个sku
   */
  goodsInfoDTOList?: PurchaseGoodsInfoDTO2[];
  /**
   * 前端采购单勾选的skuIdList
   */
  goodsInfoIds?: string[];
  /**
   * 用户针对各sku选择的营销活动id信息
   */
  goodsMarketingDTOList?: GoodsMarketingDTO[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PurchaseGoodsInfoDTO2 {
  /**
   * SkuId
   */
  goodsInfoId: string;
  /**
   * 购买数量
   */
  goodsNum: number;
  [k: string]: any;
}
export interface GoodsMarketingDTO {
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
 * via the `definition` "GoodsMarketingDTO".
 */
export interface GoodsMarketingDTO1 {
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
 * via the `definition` "BaseResponse«PurchaseResponse»".
 */
export interface BaseResponsePurchaseResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PurchaseResponse;
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
export interface PurchaseResponse {
  /**
   * 购买积分是否不足
   */
  buyPointValid?: boolean;
  /**
   * 公司信息
   */
  companyInfos?: CompanyInfoVO[];
  /**
   * 采购单优惠金额
   */
  discountPrice?: number;
  /**
   * 采购单商品总分销佣金
   */
  distributeCommission?: number;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 单品营销信息map,key为单品id，value为营销列表
   */
  goodsMarketingMap?: {
    [k: string]: MarketingViewVO[];
  };
  /**
   * 商品选择的营销
   */
  goodsMarketings?: GoodsMarketingVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO4[];
  /**
   * 是否自购
   */
  selfBuying?: boolean;
  /**
   * 店铺是否有优惠券活动map,key为店铺id，value为是否存在优惠券活动
   */
  storeCouponMap?: {
    [k: string]: boolean;
  };
  /**
   * 店铺营销信息,key为店铺id，value为营销信息列表
   */
  storeMarketingMap?: {
    [k: string]: PurchaseMarketingCalcVO[];
  };
  /**
   * 店铺列表
   */
  stores?: StoreVO1[];
  /**
   * 购买积分
   */
  totalBuyPoint?: number;
  /**
   * 采购单商品总金额
   */
  totalPrice?: number;
  /**
   * 采购单商品总金额减去优惠后的金额
   */
  tradePrice?: number;
  [k: string]: any;
}
export interface CompanyInfoVO {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
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
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface EmployeeVO {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: CompanyInfoVO1;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 商家
 */
export interface CompanyInfoVO1 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
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
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface StoreVO {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO2;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 公司信息
 */
export interface CompanyInfoVO2 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
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
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
 * 促销标签
 */
export interface GrouponLabelVO3 {
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
export interface MarketingViewVO {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 营销一口价多级优惠列表
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
   * * NO: 否
   * * YES: 是
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
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联的商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
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
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
 * 营销关联商品
 */
export interface GoodsInfoResponseVO {
  /**
   * 品牌列表
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO2[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO3[];
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
   * * NO: 否
   * * YES: 是
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
/**
 * 分页商品SKU信息
 */
export interface MicroServicePageGoodsInfoVO {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO1[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
export interface GoodsVO3 {
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
export interface GoodsVO4 {
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
export interface PurchaseMarketingCalcVO {
  /**
   * 一口价
   */
  buyoutPrice?: number;
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO1;
  /**
   * 优惠力度，满折是折扣，满减是减多少
   */
  discount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO1;
  fullGiftLevel?: MarketingFullGiftLevelVO1;
  /**
   * 满赠营销下所有等级列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO2[];
  fullReductionLevel?: MarketingFullReductionLevelVO1;
  giftGoodsInfoResponse?: PurchaseGoodsViewVO;
  /**
   * 采购单参与营销活动的商品列表
   */
  goodsInfoList?: GoodsInfoVO4[];
  /**
   * 采购单达到营销级别的差额
   */
  lack?: number;
  /**
   * 营销id
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 商家Id
   */
  storeId?: number;
  /**
   * 促销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 采购单参与营销活动的商品总金额
   */
  totalAmount?: number;
  /**
   * 采购单参与营销活动的商品总数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * 打包一品价等级
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
 * 满折等级
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
 * 满赠等级
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
export interface MarketingFullGiftLevelVO2 {
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
 * 满减等级
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
 * 赠品SKU信息
 */
export interface PurchaseGoodsViewVO {
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO5[];
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
export interface GoodsVO5 {
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
export interface StoreVO1 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO2;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseResponse".
 */
export interface PurchaseResponse1 {
  /**
   * 购买积分是否不足
   */
  buyPointValid?: boolean;
  /**
   * 公司信息
   */
  companyInfos?: CompanyInfoVO[];
  /**
   * 采购单优惠金额
   */
  discountPrice?: number;
  /**
   * 采购单商品总分销佣金
   */
  distributeCommission?: number;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 单品营销信息map,key为单品id，value为营销列表
   */
  goodsMarketingMap?: {
    [k: string]: MarketingViewVO[];
  };
  /**
   * 商品选择的营销
   */
  goodsMarketings?: GoodsMarketingVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO4[];
  /**
   * 是否自购
   */
  selfBuying?: boolean;
  /**
   * 店铺是否有优惠券活动map,key为店铺id，value为是否存在优惠券活动
   */
  storeCouponMap?: {
    [k: string]: boolean;
  };
  /**
   * 店铺营销信息,key为店铺id，value为营销信息列表
   */
  storeMarketingMap?: {
    [k: string]: PurchaseMarketingCalcVO[];
  };
  /**
   * 店铺列表
   */
  stores?: StoreVO1[];
  /**
   * 购买积分
   */
  totalBuyPoint?: number;
  /**
   * 采购单商品总金额
   */
  totalPrice?: number;
  /**
   * 采购单商品总金额减去优惠后的金额
   */
  tradePrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyInfoVO".
 */
export interface CompanyInfoVO3 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
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
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EmployeeVO".
 */
export interface EmployeeVO1 {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: CompanyInfoVO1;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
 * via the `definition` "MarketingViewVO".
 */
export interface MarketingViewVO1 {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 营销一口价多级优惠列表
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
   * * NO: 否
   * * YES: 是
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
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联的商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
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
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
 * via the `definition` "MarketingBuyoutPriceLevelVO".
 */
export interface MarketingBuyoutPriceLevelVO2 {
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullDiscountLevelVO".
 */
export interface MarketingFullDiscountLevelVO2 {
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftLevelVO".
 */
export interface MarketingFullGiftLevelVO3 {
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullReductionLevelVO".
 */
export interface MarketingFullReductionLevelVO2 {
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoResponseVO".
 */
export interface GoodsInfoResponseVO1 {
  /**
   * 品牌列表
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO2[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO3[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
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
   * * NO: 否
   * * YES: 是
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateVO".
 */
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
 * via the `definition` "MicroServicePage«GoodsInfoVO»".
 */
export interface MicroServicePageGoodsInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO1[];
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
 * via the `definition` "Sort".
 */
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingScopeVO".
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
 * via the `definition` "PurchaseMarketingCalcVO".
 */
export interface PurchaseMarketingCalcVO1 {
  /**
   * 一口价
   */
  buyoutPrice?: number;
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO1;
  /**
   * 优惠力度，满折是折扣，满减是减多少
   */
  discount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO1;
  fullGiftLevel?: MarketingFullGiftLevelVO1;
  /**
   * 满赠营销下所有等级列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO2[];
  fullReductionLevel?: MarketingFullReductionLevelVO1;
  giftGoodsInfoResponse?: PurchaseGoodsViewVO;
  /**
   * 采购单参与营销活动的商品列表
   */
  goodsInfoList?: GoodsInfoVO4[];
  /**
   * 采购单达到营销级别的差额
   */
  lack?: number;
  /**
   * 营销id
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 商家Id
   */
  storeId?: number;
  /**
   * 促销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 采购单参与营销活动的商品总金额
   */
  totalAmount?: number;
  /**
   * 采购单参与营销活动的商品总数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseGoodsViewVO".
 */
export interface PurchaseGoodsViewVO1 {
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO5[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreVO".
 */
export interface StoreVO2 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO2;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«GoodsMarketingVO»»".
 */
export interface BaseResponseListGoodsMarketingVO {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsMarketingVOArray;
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
export interface GoodsMarketingVO2 {
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
 * via the `definition` "PurchaseMergeRequest".
 */
export interface PurchaseMergeRequest {
  customer?: CustomerDTO;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 采购单信息
   */
  purchaseMergeDTOList?: PurchaseMergeDTO[];
  [k: string]: any;
}
/**
 * 客户信息
 */
export interface CustomerDTO {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailDTO;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 企业购会员审核原因
   */
  enterpriseCheckReason?: string;
  /**
   * 企业购会员审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterpriseCheckState?: 0 | 1 | 2 | 3;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaDTO[];
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
 * 会员的详细信息
 */
export interface CustomerDetailDTO {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 生日
   */
  birthDay?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0女，1男
   * * FEMALE: 女
   * * MALE: 男
   * * SECRET: 保密
   */
  gender?: 0 | 1 | 2;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
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
export interface StoreCustomerRelaDTO {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 客户等级标识
   */
  customerLevelId?: number;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
export interface PurchaseMergeDTO {
  /**
   * SKU编号
   */
  goodsInfoId: string;
  /**
   * 全局购买数
   */
  goodsNum: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDTO".
 */
export interface CustomerDTO1 {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailDTO;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 企业购会员审核原因
   */
  enterpriseCheckReason?: string;
  /**
   * 企业购会员审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterpriseCheckState?: 0 | 1 | 2 | 3;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaDTO[];
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
 * via the `definition` "CustomerDetailDTO".
 */
export interface CustomerDetailDTO1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 生日
   */
  birthDay?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0女，1男
   * * FEMALE: 女
   * * MALE: 男
   * * SECRET: 保密
   */
  gender?: 0 | 1 | 2;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
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
 * via the `definition` "StoreCustomerRelaDTO".
 */
export interface StoreCustomerRelaDTO1 {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 客户等级标识
   */
  customerLevelId?: number;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseMergeDTO".
 */
export interface PurchaseMergeDTO1 {
  /**
   * SKU编号
   */
  goodsInfoId: string;
  /**
   * 全局购买数
   */
  goodsNum: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PurchaseMiniListResponse»".
 */
export interface BaseResponsePurchaseMiniListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PurchaseMiniListResponse;
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
export interface PurchaseMiniListResponse {
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO4[];
  /**
   * 商品列表
   */
  goodsList?: PurchaseGoodsVO[];
  /**
   * 购买商品总计
   */
  num?: number;
  /**
   * 采购单数量
   */
  purchaseCount?: number;
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
export interface PurchaseGoodsVO {
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
  couponLabels?: CouponLabelVO3[];
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
  goods?: GoodsVO6;
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
   * spu标题
   */
  goodsName?: string;
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
  grouponLabel?: GrouponLabelVO4;
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
  marketingLabels?: MarketingLabelVO3[];
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
export interface CouponLabelVO3 {
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
export interface GoodsVO6 {
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
export interface GrouponLabelVO4 {
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
export interface MarketingLabelVO3 {
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
 * via the `definition` "PurchaseMiniListResponse".
 */
export interface PurchaseMiniListResponse1 {
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO4[];
  /**
   * 商品列表
   */
  goodsList?: PurchaseGoodsVO[];
  /**
   * 购买商品总计
   */
  num?: number;
  /**
   * 采购单数量
   */
  purchaseCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseGoodsVO".
 */
export interface PurchaseGoodsVO1 {
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
  couponLabels?: CouponLabelVO3[];
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
  goods?: GoodsVO6;
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
   * spu标题
   */
  goodsName?: string;
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
  grouponLabel?: GrouponLabelVO4;
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
  marketingLabels?: MarketingLabelVO3[];
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
 * via the `definition` "PurchaseSaveRequest".
 */
export interface PurchaseSaveRequest {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO3;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO3[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelDTO3 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
export interface GoodsInfoDTO3 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
 * via the `definition` "PurchaseUpdateNumRequest".
 */
export interface PurchaseUpdateNumRequest {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO4;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO4[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelDTO4 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
export interface GoodsInfoDTO4 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
 * via the `definition` "PurchaseDeleteRequest".
 */
export interface PurchaseDeleteRequest {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO5;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO5[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelDTO5 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
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
export interface GoodsInfoDTO5 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
 * via the `definition` "PurchaseListRequest".
 */
export interface PurchaseListRequest {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelVO;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO6[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
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
   * saas开关
   */
  saasStatus?: boolean;
  sort?: Sort3;
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
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * 当前客户等级
 */
export interface CustomerLevelVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 所需成长值
   */
  growthValue?: number;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
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
export interface CustomerLevelRightsVO {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
  [k: string]: any;
}
export interface GoodsInfoDTO6 {
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
  couponLabels?: CouponLabelDTO[];
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
   * 分销佣金
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
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积 单位：m3
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
  marketingLabels?: MarketingLabelDTO[];
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
   * 商品建议零售价
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 商品供货价
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
export interface PageRequest {
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
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;
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
 * via the `definition` "CustomerLevelVO".
 */
export interface CustomerLevelVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
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
   * 所需成长值
   */
  growthValue?: number;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
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
 * via the `definition` "CustomerLevelRightsVO".
 */
export interface CustomerLevelRightsVO1 {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
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
  sort?: Sort2;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PurchaseListResponse»".
 */
export interface BaseResponsePurchaseListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PurchaseListResponse;
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
export interface PurchaseListResponse {
  /**
   * 购买积分是否不足
   */
  buyPointValid?: boolean;
  /**
   * 公司信息
   */
  companyInfos?: CompanyInfoVO4[];
  /**
   * 采购单优惠金额
   */
  discountPrice?: number;
  /**
   * 采购单商品总分销佣金
   */
  distributeCommission?: number;
  distributionSettingSimVO?: DistributionSettingSimVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO6[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO5[];
  /**
   * 单品营销信息map,key为单品id，value为营销列表
   */
  goodsMarketingMap?: {
    [k: string]: MarketingViewVO2[];
  };
  /**
   * 商品选择的营销
   */
  goodsMarketings?: GoodsMarketingVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO7[];
  /**
   * 是否自购
   */
  selfBuying?: boolean;
  /**
   * 店铺是否有优惠券活动map,key为店铺id，value为是否存在优惠券活动
   */
  storeCouponMap?: {
    [k: string]: boolean;
  };
  /**
   * 店铺营销信息,key为店铺id，value为营销信息列表
   */
  storeMarketingMap?: {
    [k: string]: PurchaseMarketingCalcVO2[];
  };
  /**
   * 店铺列表
   */
  stores?: StoreVO3[];
  /**
   * 购买积分
   */
  totalBuyPoint?: number;
  /**
   * 采购单商品总金额
   */
  totalPrice?: number;
  /**
   * 采购单商品总金额减去优惠后的金额
   */
  tradePrice?: number;
  [k: string]: any;
}
export interface CompanyInfoVO4 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
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
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface DistributionSettingSimVO {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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

  /**
   * 商品选中的营销
   */
  marketingId?: number;

  /**
   * 商品关联的营销活动
   */
  marketingViewList?: MarketingViewVO2[];

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
export interface MarketingViewVO2 {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 营销一口价多级优惠列表
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
   * * NO: 否
   * * YES: 是
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
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联的商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE： 4：第二件半价优惠活动
   */
  marketingType?: 0 | 1 | 2 | 3 | 4;
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
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;

  goodsInfos?: GoodsInfoVO6[];

  [k: string]: any;
}
export interface GoodsMarketingVO3 {
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
export interface GoodsVO7 {
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
export interface PurchaseMarketingCalcVO2 {
  /**
   * 一口价
   */
  buyoutPrice?: number;
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO1;
  /**
   * 优惠力度，满折是折扣，满减是减多少
   */
  discount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO1;
  fullGiftLevel?: MarketingFullGiftLevelVO1;
  /**
   * 满赠营销下所有等级列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO2[];
  fullReductionLevel?: MarketingFullReductionLevelVO1;
  giftGoodsInfoResponse?: PurchaseGoodsViewVO;
  /**
   * 采购单参与营销活动的商品列表
   */
  goodsInfoList?: GoodsInfoVO4[];
  /**
   * 采购单达到营销级别的差额
   */
  lack?: number;
  /**
   * 营销id
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: number;
  /**
   * 商家Id
   */
  storeId?: number;
  /**
   * 促销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 采购单参与营销活动的商品总金额
   */
  totalAmount?: number;
  /**
   * 采购单参与营销活动的商品总数
   */
  totalCount?: number;
  [k: string]: any;
}
export interface StoreVO3 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO2;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PurchaseListResponse".
 */
export interface PurchaseListResponse1 {
  /**
   * 购买积分是否不足
   */
  buyPointValid?: boolean;
  /**
   * 公司信息
   */
  companyInfos?: CompanyInfoVO4[];
  /**
   * 采购单优惠金额
   */
  discountPrice?: number;
  /**
   * 采购单商品总分销佣金
   */
  distributeCommission?: number;
  distributionSettingSimVO?: DistributionSettingSimVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO6[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO5[];
  /**
   * 单品营销信息map,key为单品id，value为营销列表
   */
  goodsMarketingMap?: {
    [k: string]: MarketingViewVO2[];
  };
  /**
   * 商品选择的营销
   */
  goodsMarketings?: GoodsMarketingVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO7[];
  /**
   * 是否自购
   */
  selfBuying?: boolean;
  /**
   * 店铺是否有优惠券活动map,key为店铺id，value为是否存在优惠券活动
   */
  storeCouponMap?: {
    [k: string]: boolean;
  };
  /**
   * 店铺营销信息,key为店铺id，value为营销信息列表
   */
  storeMarketingMap?: {
    [k: string]: PurchaseMarketingCalcVO2[];
  };
  /**
   * 店铺列表
   */
  stores?: StoreVO3[];
  /**
   * 购买积分
   */
  totalBuyPoint?: number;
  /**
   * 采购单商品总金额
   */
  totalPrice?: number;
  /**
   * 采购单商品总金额减去优惠后的金额
   */
  tradePrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSettingSimVO".
 */
export interface DistributionSettingSimVO1 {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PurchaseCalcMarketingResponse»".
 */
export interface BaseResponsePurchaseCalcMarketingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PurchaseCalcMarketingResponse;
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
export interface PurchaseCalcMarketingResponse {
  /**
   * 优惠力度
   */
  discount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO3;
  fullGiftLevel?: MarketingFullGiftLevelVO4;
  /**
   * 满赠营销下所有等级列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO5[];
  fullReductionLevel?: MarketingFullReductionLevelVO3;
  giftGoodsInfoResponse?: PurchaseGoodsViewVO2;
  /**
   * 采购单参与营销活动的商品列表
   */
  goodsInfoList?: GoodsInfoVO7[];
  /**
   * 采购单达到营销级别的差额
   */
  lack?: number;
  /**
   * 营销id
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 商家Id
   */
  storeId?: number;
  /**
   * 促销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 采购单参与营销活动的商品总金额
   */
  totalAmount?: number;
  /**
   * 采购单参与营销活动的商品总数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * 满折等级
 */
export interface MarketingFullDiscountLevelVO3 {
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
 * 满赠等级
 */
export interface MarketingFullGiftLevelVO4 {
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
export interface MarketingFullGiftLevelVO5 {
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
 * 满减等级
 */
export interface MarketingFullReductionLevelVO3 {
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
 * 赠品SKU信息
 */
export interface PurchaseGoodsViewVO2 {
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO3[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO5[];
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
  couponLabels?: CouponLabelVO2[];
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
  goods?: GoodsVO2;
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
  grouponLabel?: GrouponLabelVO3;
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
  marketingLabels?: MarketingLabelVO2[];
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
 * via the `definition` "PurchaseCalcMarketingResponse".
 */
export interface PurchaseCalcMarketingResponse1 {
  /**
   * 优惠力度
   */
  discount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO3;
  fullGiftLevel?: MarketingFullGiftLevelVO4;
  /**
   * 满赠营销下所有等级列表
   */
  fullGiftLevelList?: MarketingFullGiftLevelVO5[];
  fullReductionLevel?: MarketingFullReductionLevelVO3;
  giftGoodsInfoResponse?: PurchaseGoodsViewVO2;
  /**
   * 采购单参与营销活动的商品列表
   */
  goodsInfoList?: GoodsInfoVO7[];
  /**
   * 采购单达到营销级别的差额
   */
  lack?: number;
  /**
   * 营销id
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 商家Id
   */
  storeId?: number;
  /**
   * 促销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * BUYOUT_PRICE: 6：一口价
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 采购单参与营销活动的商品总金额
   */
  totalAmount?: number;
  /**
   * 采购单参与营销活动的商品总数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddFollowQueryRequestReq".
 */
export interface IAddFollowQueryRequestReq {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IBatchAddRequestReq".
 */
export interface IBatchAddRequestReq {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO2;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO2[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IMiniFrontInfoRequestReq".
 */
export interface IMiniFrontInfoRequestReq {
  /**
   * 前端采购单缓存中的多个sku
   */
  goodsInfoDTOList?: PurchaseGoodsInfoDTO[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFrontInfoRequestReq".
 */
export interface IFrontInfoRequestReq {
  /**
   * 前端采购单缓存中的多个sku
   */
  goodsInfoDTOList?: PurchaseGoodsInfoDTO2[];
  /**
   * 前端采购单勾选的skuIdList
   */
  goodsInfoIds?: string[];
  /**
   * 用户针对各sku选择的营销活动id信息
   */
  goodsMarketingDTOList?: GoodsMarketingDTO[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface GoodsMarketingVO4 {
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
 * sku Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyGoodsMarketingGoodsInfoIdReq".
 */
export interface IModifyGoodsMarketingGoodsInfoIdReq {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IMergePurchaseRequestReq".
 */
export interface IMergePurchaseRequestReq {
  customer?: CustomerDTO;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 采购单信息
   */
  purchaseMergeDTOList?: PurchaseMergeDTO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddRequestReq".
 */
export interface IAddRequestReq {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO3;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO3[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEditRequestReq".
 */
export interface IEditRequestReq {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO4;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO4[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDelete_RequestReq".
 */
export interface IDelete_RequestReq {
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelDTO5;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO5[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
  /**
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInfoRequestReq".
 */
export interface IInfoRequestReq {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员编号
   */
  customerId?: string;
  customerLevel?: CustomerLevelVO;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 批量sku
   */
  goodsInfos?: GoodsInfoDTO6[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否赠品
   * * NO: 否
   * * YES: 是
   */
  isGift?: number;
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
   * saas开关
   */
  saasStatus?: boolean;
  sort?: Sort3;
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
   * 是否校验库存
   * * NO: 否
   * * YES: 是
   */
  verifyStock?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICalcMarketingByMarketingIdFrontQueryRequestReq".
 */
export interface ICalcMarketingByMarketingIdFrontQueryRequestReq {
  /**
   * 前端采购单缓存中的多个sku
   */
  goodsInfoDTOList?: PurchaseGoodsInfoDTO2[];
  /**
   * 前端采购单勾选的skuIdList
   */
  goodsInfoIds?: string[];
  /**
   * 用户针对各sku选择的营销活动id信息
   */
  goodsMarketingDTOList?: GoodsMarketingDTO[];
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

export interface IPurchaseInfoRequestReq {
  goodsInfoIds?: string[];
  [k: string]: any;
}

export interface IPurchaseOtherInfoRequestReq {
  goodsInfoIds?: string[];
  [k: string]: any;
}

/**
 * 内容
 */
export interface PurchaseCacheResponse {
  commissionRate?: number;
  couponStoreIds?: number[];
  pointsAvailable?: number;
  goodsInfoCacheList?: PurchaseGoodsInfoCacheVO[];
  storeDisFlagMap?: {
    [k: string]: boolean;
  };
  [k: string]: any;
}
export interface PurchaseGoodsInfoCacheVO {
  brandId?: number;
  cateId?: number;
  distributionFlag?: boolean;
  goodsInfoId?: string;
  marketingViewList?: MarketingViewVO2[];
  storeCateIds?: number[];
  storeId?: number;
  [k: string]: any;
}

/**
 *
 * 获取购物车主体信息
 *
 */
async function purchaseInfo(request: IPurchaseInfoRequestReq): Promise<PurchaseListResponse> {
  let result = await sdk.post<PurchaseListResponse>(
    '/site/purchaseInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取店铺下，是否有优惠券营销，展示优惠券标签
 *
 */
async function getStoreCouponExist(): Promise<any> {
  let result = await sdk.get<any>('/site/getStoreCouponExist', {});
  return result.context;
}

/**
 *
 * 获取购物车其它信息
 *
 */
async function purchaseOtherInfo(request: IPurchaseOtherInfoRequestReq): Promise<PurchaseCacheResponse> {
  let result = await sdk.post<PurchaseCacheResponse>(
    '/site/purchaseOtherInfo',

    {
      ...request,
    },
  );
  if (result.context.goodsInfoCacheList) {
    result.context.goodsInfoCacheList.forEach((i) => {
      i.marketingViewList = i.marketingViewList || [];
    });
  }
  return result.context;
}

/**
 *
 * 获取购物车主体信息
 *
 */
async function frontPurchaseInfo(request: IPurchaseInfoRequestReq): Promise<PurchaseListResponse> {
  let result = await sdk.post<PurchaseListResponse>(
    '/site/front/purchaseInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取购物车其它信息
 *
 */
async function frontPurchaseOtherInfo(request: IPurchaseOtherInfoRequestReq): Promise<PurchaseCacheResponse> {
  let result = await sdk.post<PurchaseCacheResponse>(
    '/site/front/purchaseOtherInfo',

    {
      ...request,
    },
  );
  if (result.context.goodsInfoCacheList) {
    result.context.goodsInfoCacheList.forEach((i) => {
      i.marketingViewList = i.marketingViewList || [];
    });
  }
  return result.context;
}

//create by moon https://github.com/creasy2010/moon
