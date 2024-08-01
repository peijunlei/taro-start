import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PointsTradeController';

/**
 *
 * 提交订单，用于生成订单操作
 *
 */
async function commit(
  pointsTradeCommitRequest: ICommitPointsTradeCommitRequestReq,
): Promise<PointsTradeCommitResultVO> {
  let result = await sdk.post<PointsTradeCommitResultVO>(
    '/pointsTrade/commit',

    {
      ...pointsTradeCommitRequest,
    },
  );
  return result.context;
}

/**
 *
 * 立即兑换
 *
 */
async function exchange(exchangeRequest: IExchangeExchangeRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/pointsTrade/exchange',

    {
      ...exchangeRequest,
    },
  );
  return result.context;
}

/**
 *
 * 用于确认订单后，创建订单前的获取积分商品信息
 *
 */
async function getExchangeItem(
  pointsTradeItemRequest: IGetExchangeItemPointsTradeItemRequestReq,
): Promise<PointsTradeConfirmResponse> {
  let result = await sdk.post<PointsTradeConfirmResponse>(
    '/pointsTrade/getExchangeItem',

    {
      ...pointsTradeItemRequest,
    },
  );
  return result.context;
}

export default {
  commit,

  exchange,

  getExchangeItem,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeCommitRequest".
 */
export interface PointsTradeCommitRequest {
  /**
   * 订单备注
   */
  buyerRemark?: string;
  /**
   * 收货地址详细信息(包含省市区)
   */
  consigneeAddress?: string;
  /**
   * 订单收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  customer?: CustomerVO;
  /**
   * 购买数量
   */
  num?: number;
  operator?: Operator;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  pointsTradeItemGroup?: PointsTradeItemGroupVO;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 下单用户
 */
export interface CustomerVO {
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
  customerDetail?: CustomerDetailVO;
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
  distributeChannel?: DistributeChannel;
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
  enterpriseInfoVO?: EnterpriseInfoVO;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
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
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
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
export interface CustomerDetailVO {
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
  customerVO?: CustomerVO1;
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
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 是否为员工 0：否 1：是
   */
  isEmployee?: number;
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
 * 会员信息
 */
export interface CustomerVO1 {
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
  customerDetail?: CustomerDetailVO;
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
  distributeChannel?: DistributeChannel;
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
  enterpriseInfoVO?: EnterpriseInfoVO;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
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
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
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
 * 分销渠道信息
 */
export interface DistributeChannel {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * 企业信息
 */
export interface EnterpriseInfoVO {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 营业执照地址
   */
  businessLicenseUrl?: string;
  /**
   * 企业性质
   */
  businessNatureType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 企业Id
   */
  enterpriseId?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 统一社会信用代码
   */
  socialCreditCode?: string;
  [k: string]: any;
}
export interface StoreCustomerRelaVO {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
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
 * 操作人
 */
export interface Operator {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 增值服务
   */
  services?: VASEntity[];
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface VASEntity {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
/**
 * 积分订单项数据
 */
export interface PointsTradeItemGroupVO {
  supplier?: SupplierVO;
  tradeItem?: TradeItemVO;
  [k: string]: any;
}
/**
 * 商家与店铺信息
 */
export interface SupplierVO {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 订单商品sku
 */
export interface TradeItemVO {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
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
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface CouponSettlementVO {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
export interface MarketingSettlementVO {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVO".
 */
export interface CustomerVO2 {
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
  customerDetail?: CustomerDetailVO;
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
  distributeChannel?: DistributeChannel;
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
  enterpriseInfoVO?: EnterpriseInfoVO;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
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
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
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
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO1 {
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
  customerVO?: CustomerVO1;
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
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 是否为员工 0：否 1：是
   */
  isEmployee?: number;
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
 * via the `definition` "DistributeChannel".
 */
export interface DistributeChannel1 {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EnterpriseInfoVO".
 */
export interface EnterpriseInfoVO1 {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 营业执照地址
   */
  businessLicenseUrl?: string;
  /**
   * 企业性质
   */
  businessNatureType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 企业Id
   */
  enterpriseId?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 统一社会信用代码
   */
  socialCreditCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustomerRelaVO".
 */
export interface StoreCustomerRelaVO1 {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
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
 * via the `definition` "Operator".
 */
export interface Operator1 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 增值服务
   */
  services?: VASEntity[];
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "VASEntity".
 */
export interface VASEntity1 {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeItemGroupVO".
 */
export interface PointsTradeItemGroupVO1 {
  supplier?: SupplierVO;
  tradeItem?: TradeItemVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SupplierVO".
 */
export interface SupplierVO1 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemVO".
 */
export interface TradeItemVO1 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
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
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponSettlementVO".
 */
export interface CouponSettlementVO1 {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingSettlementVO".
 */
export interface MarketingSettlementVO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
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
 * via the `definition` "ImmediateExchangeRequest".
 */
export interface ImmediateExchangeRequest {
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
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
 * via the `definition` "PointsTradeItemRequest".
 */
export interface PointsTradeItemRequest {
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PointsTradeConfirmResponse»".
 */
export interface BaseResponsePointsTradeConfirmResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PointsTradeConfirmResponse;
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
export interface PointsTradeConfirmResponse {
  pointsTradeConfirmItem?: PointsTradeItemGroupVO2;
  /**
   * 订单积分数
   */
  totalPoints?: number;
  [k: string]: any;
}
/**
 * 积分订单项
 */
export interface PointsTradeItemGroupVO2 {
  supplier?: SupplierVO;
  tradeItem?: TradeItemVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeConfirmResponse".
 */
export interface PointsTradeConfirmResponse1 {
  pointsTradeConfirmItem?: PointsTradeItemGroupVO2;
  /**
   * 订单积分数
   */
  totalPoints?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICommitPointsTradeCommitRequestReq".
 */
export interface ICommitPointsTradeCommitRequestReq {
  /**
   * 订单备注
   */
  buyerRemark?: string;
  /**
   * 收货地址详细信息(包含省市区)
   */
  consigneeAddress?: string;
  /**
   * 订单收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  customer?: CustomerVO;
  /**
   * 购买数量
   */
  num?: number;
  operator?: Operator;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  pointsTradeItemGroup?: PointsTradeItemGroupVO;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExchangeExchangeRequestReq".
 */
export interface IExchangeExchangeRequestReq {
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 积分商品id
   */
  pointsGoodsId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetExchangeItemPointsTradeItemRequestReq".
 */
export interface IGetExchangeItemPointsTradeItemRequestReq {
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
