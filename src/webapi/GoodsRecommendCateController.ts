import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsRecommendCateController';

/**
 *
 * 查询好货推荐分类
 *
 */
async function getGoodsByCateId(
  request: IGetGoodsByCateIdRequestReq,
): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/get-goods-by-cate-id',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询好货推荐分类
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/getCates',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询好货推荐分类
 *
 */
async function getListForUnLogin(
  listReq: IGetListForUnLoginListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/getCatesForLogin',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询0级好货推荐
 *
 */
async function getFatherCates(
  listReq: IGetFatherCatesListReqReq,
): Promise<SuperiorGoodsRecommendCateByIdResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateByIdResponse>(
    '/goodsRecommendCate/getFatherCates',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询好货推荐分类
 *
 */
async function getFirstCate(): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.get<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/getFirstCate',

    {},
  );
  return result.context;
}

/**
 *
 * 递归查询好货推荐
 *
 */
async function querySuperiorGoodsCate(
  listReq: IQuerySuperiorGoodsCateListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/getSuperiorCates',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 递归查询好货推荐
 *
 */
async function querySuperiorGoodsCateForLogin(
  listReq: IQuerySuperiorGoodsCateForLoginListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponse> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponse>(
    '/goodsRecommendCate/getSuperiorCatesForLogin',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 递归查询好货推荐
 *
 */
async function querySuperiorGoodsCateForLoginNew(
  listReq: IQuerySuperiorGoodsCateForLoginNewListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponseNew> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponseNew>(
    '/goodsRecommendCate/getSuperiorCatesForLoginNew',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 递归查询好货推荐
 *
 */
async function querySuperiorGoodsCateNew(
  listReq: IQuerySuperiorGoodsCateNewListReqReq,
): Promise<SuperiorGoodsRecommendCateListResponseNew> {
  let result = await sdk.post<SuperiorGoodsRecommendCateListResponseNew>(
    '/goodsRecommendCate/getSuperiorCatesNew',

    {
      ...listReq,
    },
  );
  return result.context;
}

export default {
  getGoodsByCateId,

  getList,

  getListForUnLogin,

  getFatherCates,

  getFirstCate,

  querySuperiorGoodsCate,

  querySuperiorGoodsCateForLogin,

  querySuperiorGoodsCateForLoginNew,

  querySuperiorGoodsCateNew,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuperiorGoodsRecommendCateByIdRequest".
 */
export interface SuperiorGoodsRecommendCateByIdRequest {
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 访问来源
   */
  saleTerminal?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SuperiorGoodsRecommendCateListResponse»".
 */
export interface BaseResponseSuperiorGoodsRecommendCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SuperiorGoodsRecommendCateListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SuperiorGoodsRecommendCateListResponse {
  /**
   * 好货推荐分类表列表结果
   */
  superiorGoodsRecommendCateVOList?: SuperiorGoodsRecommendCateVO[];
  [k: string]: any;
}
export interface SuperiorGoodsRecommendCateVO {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 子分类
   */
  goodsCateList?: null[];
  /**
   * sku商品
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 分类名称
   */
  recommendCateName?: string;
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
   * 批准文号
   */
  approvalNumber?: string;
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
   * 商品采购价
   */
  caigouPrice?: number;
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
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * erp编码
   */
  erpCode?: string;
  /**
   * 是否收藏
   */
  followState?: boolean;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 通用名
   */
  generalName?: string;
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
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 商品所属的纬度
   */
  latitude?: number;
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
   * 商品所属的经度
   */
  longitude?: number;
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
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 原参与营销商品总数
   */
  oldProductNum?: number;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 实际销量
   */
  presaleNum?: number;
  /**
   * 营销活动价格
   */
  presalePrice?: number;
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
   * 参与营销商品总数
   */
  productNum?: number;
  /**
   * 记录购物车商品价格
   */
  purchasePrice?: number;
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
   * 是否支持上门自提
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
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
  specificStock?: boolean;
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
   * 临时距离 非查询值
   */
  tempDistance?: number;
  /**
   * 是否支持2小时达
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
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
   * 是否禁止在新增众测活动时选择
   */
  zhongceForbiddenFlag?: boolean;
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
  drugFormVO?: DrugFormVO;
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
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
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
/**
 * 品牌对象
 */
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuperiorGoodsRecommendCateListResponse".
 */
export interface SuperiorGoodsRecommendCateListResponse1 {
  /**
   * 好货推荐分类表列表结果
   */
  superiorGoodsRecommendCateVOList?: SuperiorGoodsRecommendCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuperiorGoodsRecommendCateVO".
 */
export interface SuperiorGoodsRecommendCateVO1 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 子分类
   */
  goodsCateList?: null[];
  /**
   * sku商品
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 分类名称
   */
  recommendCateName?: string;
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
   * 批准文号
   */
  approvalNumber?: string;
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
   * 商品采购价
   */
  caigouPrice?: number;
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
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * erp编码
   */
  erpCode?: string;
  /**
   * 是否收藏
   */
  followState?: boolean;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 通用名
   */
  generalName?: string;
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
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 商品所属的纬度
   */
  latitude?: number;
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
   * 商品所属的经度
   */
  longitude?: number;
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
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 原参与营销商品总数
   */
  oldProductNum?: number;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 实际销量
   */
  presaleNum?: number;
  /**
   * 营销活动价格
   */
  presalePrice?: number;
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
   * 参与营销商品总数
   */
  productNum?: number;
  /**
   * 记录购物车商品价格
   */
  purchasePrice?: number;
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
   * 是否支持上门自提
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
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
  specificStock?: boolean;
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
   * 临时距离 非查询值
   */
  tempDistance?: number;
  /**
   * 是否支持2小时达
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
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
   * 是否禁止在新增众测活动时选择
   */
  zhongceForbiddenFlag?: boolean;
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
  drugFormVO?: DrugFormVO;
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
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
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
 * via the `definition` "DrugFormVO".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
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
 * via the `definition` "SuperiorGoodsRecommendCateListRequest".
 */
export interface SuperiorGoodsRecommendCateListRequest {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SuperiorGoodsRecommendCateByIdResponse»".
 */
export interface BaseResponseSuperiorGoodsRecommendCateByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SuperiorGoodsRecommendCateByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SuperiorGoodsRecommendCateByIdResponse {
  superiorGoodsRecommendCateVO?: SuperiorGoodsRecommendCateVO2;
  [k: string]: any;
}
/**
 * 好货推荐分类表信息
 */
export interface SuperiorGoodsRecommendCateVO2 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 子分类
   */
  goodsCateList?: null[];
  /**
   * sku商品
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 分类名称
   */
  recommendCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuperiorGoodsRecommendCateByIdResponse".
 */
export interface SuperiorGoodsRecommendCateByIdResponse1 {
  superiorGoodsRecommendCateVO?: SuperiorGoodsRecommendCateVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SuperiorGoodsRecommendCateListResponseNew»".
 */
export interface BaseResponseSuperiorGoodsRecommendCateListResponseNew {
  /**
   * 结果码
   */
  code: string;
  context?: SuperiorGoodsRecommendCateListResponseNew;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SuperiorGoodsRecommendCateListResponseNew {
  /**
   * 好货推荐分类表列表结果
   */
  superiorGoodsRecommendCateVOList?: SuperiorGoodsRecommendCateVONew[];
  [k: string]: any;
}
export interface SuperiorGoodsRecommendCateVONew {
  /**
   * 子分类
   */
  goodsCateList?: null[];
  /**
   * sku商品
   */
  goodsInfos?: GoodsInfoVONew[];
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 分类名称
   */
  recommendCateName?: string;
  [k: string]: any;
}
export interface GoodsInfoVONew {
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO2[];
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
  grouponLabel?: GrouponLabelVO2;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
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
 * via the `definition` "SuperiorGoodsRecommendCateListResponseNew".
 */
export interface SuperiorGoodsRecommendCateListResponseNew1 {
  /**
   * 好货推荐分类表列表结果
   */
  superiorGoodsRecommendCateVOList?: SuperiorGoodsRecommendCateVONew[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuperiorGoodsRecommendCateVONew".
 */
export interface SuperiorGoodsRecommendCateVONew1 {
  /**
   * 子分类
   */
  goodsCateList?: null[];
  /**
   * sku商品
   */
  goodsInfos?: GoodsInfoVONew[];
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 分类名称
   */
  recommendCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoVONew".
 */
export interface GoodsInfoVONew1 {
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO2[];
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
  grouponLabel?: GrouponLabelVO2;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGoodsByCateIdRequestReq".
 */
export interface IGetGoodsByCateIdRequestReq {
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 访问来源
   */
  saleTerminal?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListForUnLoginListReqReq".
 */
export interface IGetListForUnLoginListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetFatherCatesListReqReq".
 */
export interface IGetFatherCatesListReqReq {
  /**
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 访问来源
   */
  saleTerminal?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQuerySuperiorGoodsCateListReqReq".
 */
export interface IQuerySuperiorGoodsCateListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQuerySuperiorGoodsCateForLoginListReqReq".
 */
export interface IQuerySuperiorGoodsCateForLoginListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQuerySuperiorGoodsCateForLoginNewListReqReq".
 */
export interface IQuerySuperiorGoodsCateForLoginNewListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQuerySuperiorGoodsCateNewListReqReq".
 */
export interface IQuerySuperiorGoodsCateNewListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 父分类id
   */
  cateParentId?: number;
  /**
   * 排序
   */
  cateSort?: number;
  /**
   * 删除标识，0：未删除 1：已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 商品推荐分类主键
   */
  recommendCateId?: number;
  /**
   * 批量查询-商品推荐分类主键List
   */
  recommendCateIdList?: number[];
  /**
   * 分类名称
   */
  recommendCateName?: string;
  /**
   * 访问来源
   */
  saleTerminal?: number;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
