import * as sdk from './fetch';

import isMock from './mock-util';
import {WMkit} from 'wmkit';
const controllerName = 'FlashSaleController';

/**
 *
 * 查询秒杀分类信息
 *
 */
async function cateList(): Promise<FlashSaleCateListResponse> {
  let result = await sdk.get<FlashSaleCateListResponse>(
    '/flashsale/cateList',

    {},
  );
  return result.context;
}

/**
 *
 * 获取秒杀轮播海报
 *
 */
async function getSetting(): Promise<any> {
  let result = await sdk.get<any>(
    '/flashsale/get-setting',

    {},
  );
  return result.context;
}

/**
 *
 * 删除抢购资格
 *
 */
async function delFlashSaleGoodsQualifications(request: IDelFlashSaleGoodsQualificationsRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/flashsale/delFlashSaleGoodsQualifications',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取是否具有抢购资格
 *
 */
async function getFlashSaleGoodsQualifications(
  request: IGetFlashSaleGoodsQualificationsRequestReq,
): Promise<RushToBuyFlashSaleGoodsRequest> {
  let result = await sdk.post<RushToBuyFlashSaleGoodsRequest>(
    '/flashsale/getFlashSaleGoodsQualifications',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取秒杀活动详情
 *
 */
async function getFlashSaleInfo(request: IGetFlashSaleInfoRequestReq): Promise<FlashSaleGoodsVO> {
  let result = await sdk.post<FlashSaleGoodsVO>(
    '/flashsale/getFlashSaleInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询秒杀商品
 *
 */
async function goodsList(pageReq: IGoodsListPageReqReq): Promise<FlashSaleGoodsPageResponse> {
  let result = await sdk.post<FlashSaleGoodsPageResponse>(
    WMkit.isLogin() ? '/flashsale/goodsList' : '/flashsale/unlogin/goodsList',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 立刻抢购秒杀商品
 *
 */
async function rushToBuyFlashSaleGoods(request: IRushToBuyFlashSaleGoodsRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/flashsale/rushToBuyFlashSaleGoods',

    {
      ...request,
    },
  );
  return result;
}

async function rushToBuyFlashSaleGoodsRefresh(request: IRushToBuyFlashSaleGoodsRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/flashsale/rushToBuyFlashSaleGoodsRefresh',

    {
      ...request,
    },
  );
  return result;
}

/**
 *
 * 查询场次信息
 *
 */
async function sceneList(): Promise<FlashSaleActivityListResponse> {
  let result = await sdk.get<FlashSaleActivityListResponse>(
    '/flashsale/sceneList',

    {},
  );
  return result.context;
}

/**
 *
 * 更新秒杀商品订单数量信息
 *
 */
async function updateFlashSaleGoodsOrderNum(request: IUpdateFlashSaleGoodsOrderNumRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/flashsale/updateFlashSaleGoodsOrderNum',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  cateList,

  getSetting,

  delFlashSaleGoodsQualifications,

  getFlashSaleGoodsQualifications,

  getFlashSaleInfo,

  goodsList,

  rushToBuyFlashSaleGoods,
  rushToBuyFlashSaleGoodsRefresh,

  sceneList,

  updateFlashSaleGoodsOrderNum,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«FlashSaleCateListResponse»".
 */
export interface BaseResponseFlashSaleCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FlashSaleCateListResponse;
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
export interface FlashSaleCateListResponse {
  /**
   * 秒杀分类列表结果
   */
  flashSaleCateVOList?: FlashSaleCateVO[];
  [k: string]: any;
}
export interface FlashSaleCateVO {
  /**
   * 秒杀分类主键
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
 * via the `definition` "FlashSaleCateListResponse".
 */
export interface FlashSaleCateListResponse1 {
  /**
   * 秒杀分类列表结果
   */
  flashSaleCateVOList?: FlashSaleCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FlashSaleCateVO".
 */
export interface FlashSaleCateVO1 {
  /**
   * 秒杀分类主键
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
 * via the `definition` "RushToBuyFlashSaleGoodsRequest".
 */
export interface RushToBuyFlashSaleGoodsRequest {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
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
 * via the `definition` "BaseResponse«RushToBuyFlashSaleGoodsRequest»".
 */
export interface BaseResponseRushToBuyFlashSaleGoodsRequest {
  /**
   * 结果码
   */
  code: string;
  context?: RushToBuyFlashSaleGoodsRequest1;
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
export interface RushToBuyFlashSaleGoodsRequest1 {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«FlashSaleGoodsVO»".
 */
export interface BaseResponseFlashSaleGoodsVO {
  /**
   * 结果码
   */
  code: string;
  context?: FlashSaleGoodsVO;
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
export interface FlashSaleGoodsVO {
  /**
   * 活动日期：2019-06-11
   */
  activityDate?: string;
  /**
   * 活动日期+时间
   */
  activityFullTime?: string;
  /**
   * 活动时间：13:00
   */
  activityTime?: string;
  /**
   * 分类ID
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
   * 删除标志，0:未删除 1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  flashSaleCateVO?: FlashSaleCateVO2;
  /**
   * 秒杀商品状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  flashSaleGoodsStatus?: 0 | 1 | 2 | 3 | 4;
  goods?: GoodsVO;
  /**
   * spuID
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 限购数量
   */
  maxNum?: number;
  /**
   * 可兑换的最大库存
   */
  maxStock?: number;
  /**
   * 起售数量
   */
  minNum?: number;
  /**
   * 是否可编辑
   * * NO: 否
   * * YES: 是
   */
  modifyFlag?: 0 | 1;
  /**
   * 包邮标志，0：不包邮 1:包邮
   */
  postage?: number;
  /**
   * 抢购价
   */
  price?: number;
  /**
   * 抢购销量
   */
  salesVolume?: number;
  /**
   * 规格信息
   */
  specText?: string;
  /**
   * 抢购库存
   */
  stock?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
 * 分类信息
 */
export interface FlashSaleCateVO2 {
  /**
   * 秒杀分类主键
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FlashSaleGoodsVO".
 */
export interface FlashSaleGoodsVO1 {
  /**
   * 活动日期：2019-06-11
   */
  activityDate?: string;
  /**
   * 活动日期+时间
   */
  activityFullTime?: string;
  /**
   * 活动时间：13:00
   */
  activityTime?: string;
  /**
   * 分类ID
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
   * 删除标志，0:未删除 1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  flashSaleCateVO?: FlashSaleCateVO2;
  /**
   * 秒杀商品状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  flashSaleGoodsStatus?: 0 | 1 | 2 | 3 | 4;
  goods?: GoodsVO;
  /**
   * spuID
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 限购数量
   */
  maxNum?: number;
  /**
   * 可兑换的最大库存
   */
  maxStock?: number;
  /**
   * 起售数量
   */
  minNum?: number;
  /**
   * 是否可编辑
   * * NO: 否
   * * YES: 是
   */
  modifyFlag?: 0 | 1;
  /**
   * 包邮标志，0：不包邮 1:包邮
   */
  postage?: number;
  /**
   * 抢购价
   */
  price?: number;
  /**
   * 抢购销量
   */
  salesVolume?: number;
  /**
   * 规格信息
   */
  specText?: string;
  /**
   * 抢购库存
   */
  stock?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
 * via the `definition` "FlashSaleGoodsPageRequest".
 */
export interface FlashSaleGoodsPageRequest {
  /**
   * 活动日期：2019-06-11
   */
  activityDate?: string;
  /**
   * 活动日期+时间
   */
  activityFullTime?: string;
  /**
   * 活动时间：13:00
   */
  activityTime?: string;
  /**
   * 分类ID
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
   * 删除标志，0:未删除 1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 限购数量
   */
  maxNum?: number;
  /**
   * 起售数量
   */
  minNum?: number;
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
   * 包邮标志，0：不包邮 1:包邮
   */
  postage?: number;
  /**
   * 抢购价
   */
  price?: number;
  /**
   * 查询时间段
   */
  queryDataType?: number;
  /**
   * 抢购销量
   */
  salesVolume?: number;
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
   * 抢购库存
   */
  stock?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
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
 * via the `definition` "BaseResponse«FlashSaleGoodsPageResponse»".
 */
export interface BaseResponseFlashSaleGoodsPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FlashSaleGoodsPageResponse;
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
export interface FlashSaleGoodsPageResponse {
  flashSaleGoodsVOPage?: MicroServicePageFlashSaleGoodsVO;
  [k: string]: any;
}
/**
 * 抢购商品表分页结果
 */
export interface MicroServicePageFlashSaleGoodsVO {
  /**
   * 具体数据内容
   */
  content?: FlashSaleGoodsVO2[];
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
export interface FlashSaleGoodsVO2 {
  /**
   * 活动日期：2019-06-11
   */
  activityDate?: string;
  /**
   * 活动日期+时间
   */
  activityFullTime?: string;
  /**
   * 活动时间：13:00
   */
  activityTime?: string;
  /**
   * 分类ID
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
   * 删除标志，0:未删除 1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  flashSaleCateVO?: FlashSaleCateVO2;
  /**
   * 秒杀商品状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  flashSaleGoodsStatus?: 0 | 1 | 2 | 3 | 4;
  goods?: GoodsVO;
  /**
   * spuID
   */
  goodsId?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 限购数量
   */
  maxNum?: number;
  /**
   * 可兑换的最大库存
   */
  maxStock?: number;
  /**
   * 起售数量
   */
  minNum?: number;
  /**
   * 是否可编辑
   * * NO: 否
   * * YES: 是
   */
  modifyFlag?: 0 | 1;
  /**
   * 包邮标志，0：不包邮 1:包邮
   */
  postage?: number;
  /**
   * 抢购价
   */
  price?: number;
  /**
   * 抢购销量
   */
  salesVolume?: number;
  /**
   * 规格信息
   */
  specText?: string;
  /**
   * 抢购库存
   */
  stock?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FlashSaleGoodsPageResponse".
 */
export interface FlashSaleGoodsPageResponse1 {
  flashSaleGoodsVOPage?: MicroServicePageFlashSaleGoodsVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«FlashSaleGoodsVO»".
 */
export interface MicroServicePageFlashSaleGoodsVO1 {
  /**
   * 具体数据内容
   */
  content?: FlashSaleGoodsVO2[];
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
 * via the `definition` "BaseResponse«FlashSaleActivityListResponse»".
 */
export interface BaseResponseFlashSaleActivityListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FlashSaleActivityListResponse;
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
export interface FlashSaleActivityListResponse {
  /**
   * 抢购活动列表结果
   */
  flashSaleActivityVOList?: FlashSaleActivityVO[];
  recentDate?: string;
  recentTime?: string;
  [k: string]: any;
}
export interface FlashSaleActivityVO {
  /**
   * 活动日期
   */
  activityDate?: string;
  /**
   * 结束时间
   */
  activityEndTime?: string;
  /**
   * 活动时间
   */
  activityFullTime?: string;
  /**
   * 活动时间
   */
  activityTime?: string;
  goodsNum?: number;
  /**
   * 即将开场，进行中，已结束
   */
  status?: string;
  storeNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FlashSaleActivityListResponse".
 */
export interface FlashSaleActivityListResponse1 {
  /**
   * 抢购活动列表结果
   */
  flashSaleActivityVOList?: FlashSaleActivityVO[];
  recentDate?: string;
  recentTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FlashSaleActivityVO".
 */
export interface FlashSaleActivityVO1 {
  /**
   * 活动日期
   */
  activityDate?: string;
  /**
   * 结束时间
   */
  activityEndTime?: string;
  /**
   * 活动时间
   */
  activityFullTime?: string;
  /**
   * 活动时间
   */
  activityTime?: string;
  goodsNum?: number;
  /**
   * 即将开场，进行中，已结束
   */
  status?: string;
  storeNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDelFlashSaleGoodsQualificationsRequestReq".
 */
export interface IDelFlashSaleGoodsQualificationsRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetFlashSaleGoodsQualificationsRequestReq".
 */
export interface IGetFlashSaleGoodsQualificationsRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetFlashSaleInfoRequestReq".
 */
export interface IGetFlashSaleInfoRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGoodsListPageReqReq".
 */
export interface IGoodsListPageReqReq {
  /**
   * 活动日期：2019-06-11
   */
  activityDate?: string;
  /**
   * 活动日期+时间
   */
  activityFullTime?: string;
  /**
   * 活动时间：13:00
   */
  activityTime?: string;
  /**
   * 分类ID
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
   * 删除标志，0:未删除 1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * spuID
   */
  goodsId?: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 限购数量
   */
  maxNum?: number;
  /**
   * 起售数量
   */
  minNum?: number;
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
   * 包邮标志，0：不包邮 1:包邮
   */
  postage?: number;
  /**
   * 抢购价
   */
  price?: number;
  /**
   * 查询时间段
   */
  queryDataType?: number;
  /**
   * 抢购销量
   */
  salesVolume?: number;
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
   * 抢购库存
   */
  stock?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
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
 * via the `definition` "IRushToBuyFlashSaleGoodsRequestReq".
 */
export interface IRushToBuyFlashSaleGoodsRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateFlashSaleGoodsOrderNumRequestReq".
 */
export interface IUpdateFlashSaleGoodsOrderNumRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 抢购商品Id
   */
  flashSaleGoodsId?: number;
  /**
   * 抢购商品数量
   */
  flashSaleGoodsNum?: number;
  /**
   * 秒杀商品会员抢购次数
   */
  flashSaleNum?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
