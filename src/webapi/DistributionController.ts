import * as sdk from './fetch';

import isMock from './mock-util';

const serverInfo = '';
const controllerName = 'DistributionController';

/**
 *
 * 登录人员是否分销员
 *
 */
async function loginIsDistributor(): Promise<IsSubscriptionFlaggetRes> {
  let result = await sdk.get<IsSubscriptionFlaggetRes>(
    '/distribute/check/loginIsDistributor',

    {},
  );
  return result.context;
}

/**
 *
 * 查询小店分销状态
 *
 */
async function checkStatus(): Promise<IsSubscriptionFlaggetRes> {
  let result = await sdk.get<IsSubscriptionFlaggetRes>(
    '/distribute/check/status',

    {},
  );
  return result.context;
}

/**
 *
 * 根据会员的Id查询该会员的分销员信息
 *
 */
async function queryDistributorInfoByCustomerId(): Promise<DistributionCustomerByCustomerIdResponse> {
  let result = await sdk.get<DistributionCustomerByCustomerIdResponse>(
    '/distribute/distributor-info',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销员状态
 *
 */
async function getDistributorStatus(): Promise<DistributionCustomerEnableByCustomerIdResponse> {
  let result = await sdk.get<DistributionCustomerEnableByCustomerIdResponse>(
    '/distribute/getDistributorStatus',

    {},
  );
  return result.context;
}

/**
 *
 * 查询平台端-社交分销总开关状态
 *
 */
async function queryOpenFlag(): Promise<QueryOpenFlaggetRes> {
  let result = await sdk.get<QueryOpenFlaggetRes>(
    '/distribute/queryOpenFlag',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销员的销售业绩
 *
 */
async function getPerformanceByInviteedId(): Promise<DistributionRecordByInviteeIdResponse> {
  let result = await sdk.get<DistributionRecordByInviteeIdResponse>(
    '/distribute/sales/performance',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销设置信息
 *
 */
async function getSetting(request: IGetSettingRequestReq): Promise<DistributionSimSettingResponse> {
  let result = await sdk.post<DistributionSimSettingResponse>(
    '/distribute/setting',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询分销设置和邀请人信息
 *
 */
async function getSettingAndInvitor(): Promise<DistributionSimSettingResponse> {
  let result = await sdk.get<DistributionSimSettingResponse>(
    '/distribute/setting-invitor',

    {},
  );
  return result.context;
}

/**
 *
 * 开店礼包
 *
 */
async function storeBags(): Promise<DistributionSetting4StoreBagsResponse> {
  let result = await sdk.post<DistributionSetting4StoreBagsResponse>(
    '/distribute/storeBags',

    {},
  );
  return result.context;
}

/**
 *
 * 未登录查询分销设置
 *
 */
async function getUnLoginSettingAndInvitor(): Promise<DistributionSimSettingResponse> {
  let result = await sdk.get<DistributionSimSettingResponse>(
    '/distribute/unLogin-setting',

    {},
  );
  return result.context;
}

/**
 *
 * 验证开店礼包商品状态
 *
 */
async function verifyStoreBagsSku(
  goodsInfoId: IVerifyStoreBagsSkuGoodsInfoIdReq,
): Promise<DistributionSetting4StoreBagsVerifyResponse> {
  let result = await sdk.get<DistributionSetting4StoreBagsVerifyResponse>(
    '/distribute/verify/storeBags/sku/{goodsInfoId}'.replace('{goodsInfoId}', goodsInfoId + ''),

    {},
  );
  return result.context;
}

export default {
  loginIsDistributor,

  checkStatus,

  queryDistributorInfoByCustomerId,

  getDistributorStatus,

  queryOpenFlag,

  getPerformanceByInviteedId,

  getSetting,

  getSettingAndInvitor,

  storeBags,

  getUnLoginSettingAndInvitor,

  verifyStoreBagsSku,
};

/**
 * 内容
 */
export type IsSubscriptionFlaggetRes = boolean;
/**
 * 内容
 */
export type QueryOpenFlaggetRes = number;
/**
 * 内容
 *
 */
export type IsSubscriptionFlaggetRes1 = boolean;
/**
 * 内容
 *
 */
export type QueryOpenFlaggetRes1 = number;
/**
 * 商品Id
 *
 */
export type IVerifyStoreBagsSkuGoodsInfoIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}

/**
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  context?: IsSubscriptionFlaggetRes;
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
export interface BaseResponseDistributionCustomerByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionCustomerByCustomerIdResponse;
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
export interface DistributionCustomerByCustomerIdResponse {
  distributionCustomerVO?: DistributionCustomerVO;

  [k: string]: any;
}

/**
 * 分销员信息
 */
export interface DistributionCustomerVO {
  /**
   * 分销佣金(元)
   */
  commission?: number;
  /**
   * 未入账分销佣金(元)
   */
  commissionNotRecorded?: number;
  /**
   * 佣金总额(元)
   */
  commissionTotal?: number;
  /**
   * 创建人(后台新增分销员)
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 分销员标识UUID
   */
  distributionId?: string;
  /**
   * 分销订单(笔)
   */
  distributionTradeCount?: number;
  /**
   * 是否有分销员资格0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 是否禁止分销 0: 启用中  1：禁用中
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  /**
   * 会员头像
   */
  headImg?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 邀请人会员ID集合，后期可扩展N级
   */
  inviteCustomerIds?: string;
  /**
   * 邀新奖金(元)
   */
  rewardCash?: number;
  /**
   * 未入账邀新奖金(元)
   */
  rewardCashNotRecorded?: number;
  /**
   * 销售额(元)
   */
  sales?: number;

  [k: string]: any;
}

/**
 */
export interface DistributionCustomerByCustomerIdResponse1 {
  distributionCustomerVO?: DistributionCustomerVO;

  [k: string]: any;
}

/**
 */
export interface DistributionCustomerVO1 {
  /**
   * 分销佣金(元)
   */
  commission?: number;
  /**
   * 未入账分销佣金(元)
   */
  commissionNotRecorded?: number;
  /**
   * 佣金总额(元)
   */
  commissionTotal?: number;
  /**
   * 创建人(后台新增分销员)
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 分销员标识UUID
   */
  distributionId?: string;
  /**
   * 分销订单(笔)
   */
  distributionTradeCount?: number;
  /**
   * 是否有分销员资格0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 是否禁止分销 0: 启用中  1：禁用中
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  /**
   * 会员头像
   */
  headImg?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 邀请人会员ID集合，后期可扩展N级
   */
  inviteCustomerIds?: string;
  /**
   * 邀新奖金(元)
   */
  rewardCash?: number;
  /**
   * 未入账邀新奖金(元)
   */
  rewardCashNotRecorded?: number;
  /**
   * 销售额(元)
   */
  sales?: number;

  [k: string]: any;
}

/**
 */
export interface BaseResponseDistributionCustomerEnableByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionCustomerEnableByCustomerIdResponse;
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
export interface DistributionCustomerEnableByCustomerIdResponse {
  /**
   * 分销状态是否正常
   */
  distributionEnable?: boolean;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;

  [k: string]: any;
}

/**
 */
export interface DistributionCustomerEnableByCustomerIdResponse1 {
  /**
   * 分销状态是否正常
   */
  distributionEnable?: boolean;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;

  [k: string]: any;
}

/**
 */
export interface BaseResponseInt {
  /**
   * 结果码
   */
  code: string;
  context?: QueryOpenFlaggetRes;
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
export interface BaseResponseDistributionRecordByInviteeIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionRecordByInviteeIdResponse;
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
export interface DistributionRecordByInviteeIdResponse {
  /**
   * 本月预估收益
   */
  monthEstimatedReturn?: number;
  /**
   * 本月销售额
   */
  monthSales?: number;
  /**
   * 昨日预估收益
   */
  yesterdayEstimatedReturn?: number;
  /**
   * 昨日销售额
   */
  yesterdaySales?: number;

  [k: string]: any;
}

/**
 */
export interface DistributionRecordByInviteeIdResponse1 {
  /**
   * 本月预估收益
   */
  monthEstimatedReturn?: number;
  /**
   * 本月销售额
   */
  monthSales?: number;
  /**
   * 昨日预估收益
   */
  yesterdayEstimatedReturn?: number;
  /**
   * 昨日销售额
   */
  yesterdaySales?: number;

  [k: string]: any;
}

/**
 */
export interface DistributionSettingByDistributorIdRequest {
  /**
   * 邀请人id
   */
  inviteeId?: string;

  [k: string]: any;
}

/**
 */
export interface BaseResponseDistributionSimSettingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSimSettingResponse;
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
export interface DistributionSimSettingResponse {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;

  [k: string]: any;
}

export interface DistributionCustomerSimVO {
  /**
   * 分销员标识UUID
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
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;

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

/**
 */
export interface DistributionSimSettingResponse1 {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;

  [k: string]: any;
}

/**
 */
export interface DistributionCustomerSimVO1 {
  /**
   * 分销员标识UUID
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
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;

  [k: string]: any;
}

/**
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
 */
export interface BaseResponseDistributionSetting4StoreBagsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSetting4StoreBagsResponse;
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
export interface DistributionSetting4StoreBagsResponse {
  /**
   * 是否开启申请入口
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
   * 礼包商品列表
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 招募海报
   */
  recruitImg?: string;

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

/**
 */
export interface DistributionSetting4StoreBagsResponse1 {
  /**
   * 是否开启申请入口
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
   * 礼包商品列表
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 招募海报
   */
  recruitImg?: string;

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
export interface BaseResponseDistributionSetting4StoreBagsVerifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSetting4StoreBagsVerifyResponse;
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
export interface DistributionSetting4StoreBagsVerifyResponse {
  /**
   * 验证开店礼包商品状态
   */
  result?: boolean;

  [k: string]: any;
}

/**
 */
export interface DistributionSetting4StoreBagsVerifyResponse1 {
  /**
   * 验证开店礼包商品状态
   */
  result?: boolean;

  [k: string]: any;
}

/**
 */
export interface IGetSettingRequestReq {
  /**
   * 邀请人id
   */
  inviteeId?: string;

  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
