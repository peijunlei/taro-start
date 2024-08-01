import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PersonalCenterController';

/**
 *
 * 根据业务查询当前账户基础信息
 *
 */
async function query(): Promise<PersonalCenterResponse> {
  let result = await sdk.get<PersonalCenterResponse>(
    '/personal/center/query',

    {},
  );
  return result.context;
}

export default {
  query,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PersonalCenterResponse»".
 */
export interface BaseResponsePersonalCenterResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PersonalCenterResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PersonalCenterResponse {
  couponCacheCenterPageResponse?: CouponCacheCenterPageResponse;
  couponCodePageResponse?: CouponCodePageResponse;
  customerCenterResponse?: CustomerCenterResponse;
  customerDetailVO?: CustomerDetailVO;
  customerLevelWithRightsByCustomerIdResponse?: CustomerLevelWithRightsByCustomerIdResponse;
  customerLevelWithRightsResponse?: CustomerLevelWithRightsResponse;
  customerVO?: CustomerVO;
  esGoodsResponse?: EsGoodsResponse;
  [k: string]: any;
}
/**
 * 优惠券数据
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
 * 优惠券
 */
export interface CouponCodePageResponse {
  couponCodeVos?: MicroServicePageCouponCodeVO;
  /**
   * 我的优惠券已过期总数
   */
  overDueCount?: number;
  /**
   * 我的优惠券未使用总数
   */
  unUseCount?: number;
  /**
   * 我的优惠券已使用总数
   */
  usedCount?: number;
  [k: string]: any;
}
/**
 * 我的优惠券列表
 */
export interface MicroServicePageCouponCodeVO {
  /**
   * 具体数据内容
   */
  content?: CouponCodeVO[];
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
  sort?: Sort1;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CouponCodeVO {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
export interface Sort1 {
  [k: string]: any;
}
/**
 * 个人中心数据
 */
export interface CustomerCenterResponse {
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级
   */
  customerLevel?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
  /**
   * 是否已开店
   */
  openShop?: boolean;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  [k: string]: any;
}
/**
 * 用户详情
 */
export interface CustomerDetailVO {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
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
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * 个人中心数据
 */
export interface CustomerLevelWithRightsByCustomerIdResponse {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  customerGrowthValue?: number;
  /**
   * 会员等级
   */
  customerLevel?: string;
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
  customerName?: string;
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 会员类型
   */
  customerType?: number;
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
   * 所需成长值（下限）
   */
  growthValue?: number;
  headImg?: string;
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
   * 累计销售额下限
   */
  totalSaleLowLimit?: number;
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
  roleType?: '0' | '1' | '2';
  sort?: number;
  status?: number;
  [k: string]: any;
}
/**
 * 会员总等级
 */
export interface CustomerLevelWithRightsResponse {
  customerLevelVOList?: CustomerLevelVO[];
  [k: string]: any;
}
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
   * 会员等级
   */
  customerLevel?: string;
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
  customerLevelRightsVOS?: CustomerLevelRightsVO1[];
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 会员类型
   */
  customerType?: number;
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
   * 所需成长值（下限）
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
   * 累计销售额下限
   */
  totalSaleLowLimit?: number;
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
export interface CustomerLevelRightsVO1 {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  roleType?: '0' | '1' | '2';
  sort?: number;
  status?: number;
  [k: string]: any;
}
/**
 * 用户
 */
export interface CustomerVO {
  /**
   * 绑定银行卡状态
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
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
  customerDetail?: CustomerDetailVO1;
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
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
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
   * 是否关注了微信公众号
   * * YES: 是
   * * NO: 否
   */
  followWxFlag?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
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
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 供应商和客户的关联关系
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
export interface CustomerDetailVO1 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
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
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
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
export interface StoreCustomerRelaVO {
  /**
   * 供应商标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
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
 * 推荐商品的es
 */
export interface EsGoodsResponse {
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
   * 药品分类
   */
  drugTypes?: DrugTypeVO[];
  esGoods?: PageEsGoods;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO1[];
  /**
   * SPU
   */
  goodsList?: GoodsVO2[];
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
   * 商品/药品分类
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
export interface PageEsGoods {
  content?: EsGoods[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort3;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface EsGoods {
  addedFlag?: number;
  addedTime?: string;
  appSaleChannel?: number;
  approvalNumber?: string;
  auditStatus?: number;
  cateBrandId?: string;
  /**
   * 0：未选中 1：选中
   */
  checkFlag?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  drugFormId?: number;
  drugType?: number;
  forbidStatus?: number;
  goodsCollectNum?: number;
  goodsEvaluateNum?: number;
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
  goodsImg?: string;
  goodsInfos?: GoodsInfoVO[];
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsName?: string;
  goodsSalesNum?: number;
  goodsSearchAuxNest?: GoodsSearchAuxNest;
  goodsSubtitle?: string;
  id?: string;
  isExternalUse?: number;
  lowGoodsName?: string;
  marketPrice?: number;
  marketingList?: MarketingForEndVO[];
  medicineType?: number;
  mobileSaleChannel?: number;
  pcSaleChannel?: number;
  pinyinFull?: string;
  pinyinInitials?: string;
  pinyinSuggest?: Completion;
  propDetails?: GoodsPropDetailRelVO[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  suggest?: Completion1;
  twoHoursExpress?: number;
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
  goodsCateVO?: GoodsCateVO1;
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
export interface MarketingForEndVO {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 商品品牌列表
   */
  brandList?: GoodsBrandVO2[];
  /**
   * 商品分类列表
   */
  cateList?: GoodsCateVO2[];
  /**
   * 审核状态 0：待审核 1：已审核 2：审核未通过
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 公司信息名称
   */
  companyInfoName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建人姓名
   */
  createPersonName?: string;
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
   * 关联其他等级的等级名称集合
   */
  joinLevelNameList?: string[];
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 关联客户等级
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  marketingJoinLevel?: -2 | -1 | 0 | 1;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 活动状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  marketingStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 参加营销类型
   * * SCOPE_TYPE_ALL: 0：所有货品
   * * SCOPE_TYPE_CUSTOM: 1：自定义货品
   * * BRAND: 2：品牌
   * * CATE: 3：分类
   */
  scopeType?: 0 | 1 | 2 | 3;
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
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 投放渠道: 0:pc 1:h5 2:app 3:小程序
   * * PC: PC
   * * H5: H5
   * * APP: APP
   * * MINI_PROGRAM: 小程序
   */
  terminalTypeList?: (0 | 1 | 2 | 3)[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 用户群: 0 全平台会员 1 会员 2 微店主 3 员工 4 新注册会员
   * * ALL: 全平台会员
   * * CUSTOMER: 会员
   * * SHOPKEEPER: 微店主
   * * EMPLOYEE: 员工
   * * NEWCOMER: 新注册会员
   * * CUSTOM_CUSTOMER: 指定会员
   */
  userGroupType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
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
  brands?: GoodsBrandVO3[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO3[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO2[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
  [k: string]: any;
}
export interface GoodsBrandVO3 {
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
 * 分页商品SKU信息
 */
export interface MicroServicePageGoodsInfoVO {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO1[];
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
  sort?: Sort2;
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
export interface Sort2 {
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
  goodsCateVO?: GoodsCateVO1;
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
export interface Completion {
  input?: string[];
  output?: string;
  payload?: {
    [k: string]: any;
  };
  weight?: number;
  [k: string]: any;
}
export interface GoodsPropDetailRelVO {
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
export interface Completion1 {
  input?: string[];
  output?: string;
  payload?: {
    [k: string]: any;
  };
  weight?: number;
  [k: string]: any;
}
export interface Sort3 {
  [k: string]: any;
}
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
  goodsCateVO?: GoodsCateVO1;
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
 * via the `definition` "PersonalCenterResponse".
 */
export interface PersonalCenterResponse1 {
  couponCacheCenterPageResponse?: CouponCacheCenterPageResponse;
  couponCodePageResponse?: CouponCodePageResponse;
  customerCenterResponse?: CustomerCenterResponse;
  customerDetailVO?: CustomerDetailVO;
  customerLevelWithRightsByCustomerIdResponse?: CustomerLevelWithRightsByCustomerIdResponse;
  customerLevelWithRightsResponse?: CustomerLevelWithRightsResponse;
  customerVO?: CustomerVO;
  esGoodsResponse?: EsGoodsResponse;
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
export interface Sort4 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCodePageResponse".
 */
export interface CouponCodePageResponse1 {
  couponCodeVos?: MicroServicePageCouponCodeVO;
  /**
   * 我的优惠券已过期总数
   */
  overDueCount?: number;
  /**
   * 我的优惠券未使用总数
   */
  unUseCount?: number;
  /**
   * 我的优惠券已使用总数
   */
  usedCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CouponCodeVO»".
 */
export interface MicroServicePageCouponCodeVO1 {
  /**
   * 具体数据内容
   */
  content?: CouponCodeVO[];
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
  sort?: Sort1;
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
 * via the `definition` "CouponCodeVO".
 */
export interface CouponCodeVO1 {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCenterResponse".
 */
export interface CustomerCenterResponse1 {
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级
   */
  customerLevel?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
  /**
   * 是否已开店
   */
  openShop?: boolean;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO2 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
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
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerLevelWithRightsByCustomerIdResponse".
 */
export interface CustomerLevelWithRightsByCustomerIdResponse1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  customerGrowthValue?: number;
  /**
   * 会员等级
   */
  customerLevel?: string;
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
  customerName?: string;
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 会员类型
   */
  customerType?: number;
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
   * 所需成长值（下限）
   */
  growthValue?: number;
  headImg?: string;
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
   * 累计销售额下限
   */
  totalSaleLowLimit?: number;
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
export interface CustomerLevelRightsVO2 {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  roleType?: '0' | '1' | '2';
  sort?: number;
  status?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerLevelWithRightsResponse".
 */
export interface CustomerLevelWithRightsResponse1 {
  customerLevelVOList?: CustomerLevelVO[];
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
   * 会员等级
   */
  customerLevel?: string;
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
  customerLevelRightsVOS?: CustomerLevelRightsVO1[];
  /**
   * 会员头衔
   */
  customerTitle?: string;
  /**
   * 会员类型
   */
  customerType?: number;
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
   * 所需成长值（下限）
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
   * 累计销售额下限
   */
  totalSaleLowLimit?: number;
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
 * via the `definition` "CustomerVO".
 */
export interface CustomerVO1 {
  /**
   * 绑定银行卡状态
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
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
  customerDetail?: CustomerDetailVO1;
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
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
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
   * 是否关注了微信公众号
   * * YES: 是
   * * NO: 否
   */
  followWxFlag?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
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
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 供应商和客户的关联关系
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
 * via the `definition` "StoreCustomerRelaVO".
 */
export interface StoreCustomerRelaVO1 {
  /**
   * 供应商标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
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
 * via the `definition` "EsGoodsResponse".
 */
export interface EsGoodsResponse1 {
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
   * 药品分类
   */
  drugTypes?: DrugTypeVO[];
  esGoods?: PageEsGoods;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO1[];
  /**
   * SPU
   */
  goodsList?: GoodsVO2[];
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
   * 商品/药品分类
   */
  medicineTypes?: MedicineTypeVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
export interface GoodsBrandVO4 {
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
export interface GoodsCateVO4 {
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
 * via the `definition` "Page«EsGoods»".
 */
export interface PageEsGoods1 {
  content?: EsGoods[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort3;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoods".
 */
export interface EsGoods1 {
  addedFlag?: number;
  addedTime?: string;
  appSaleChannel?: number;
  approvalNumber?: string;
  auditStatus?: number;
  cateBrandId?: string;
  /**
   * 0：未选中 1：选中
   */
  checkFlag?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  drugFormId?: number;
  drugType?: number;
  forbidStatus?: number;
  goodsCollectNum?: number;
  goodsEvaluateNum?: number;
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
  goodsImg?: string;
  goodsInfos?: GoodsInfoVO[];
  goodsLevelPrices?: GoodsLevelPriceNest[];
  goodsName?: string;
  goodsSalesNum?: number;
  goodsSearchAuxNest?: GoodsSearchAuxNest;
  goodsSubtitle?: string;
  id?: string;
  isExternalUse?: number;
  lowGoodsName?: string;
  marketPrice?: number;
  marketingList?: MarketingForEndVO[];
  medicineType?: number;
  mobileSaleChannel?: number;
  pcSaleChannel?: number;
  pinyinFull?: string;
  pinyinInitials?: string;
  pinyinSuggest?: Completion;
  propDetails?: GoodsPropDetailRelVO[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  suggest?: Completion1;
  twoHoursExpress?: number;
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
 * via the `definition` "GoodsInfoVO".
 */
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
 * via the `definition` "MarketingForEndVO".
 */
export interface MarketingForEndVO1 {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 商品品牌列表
   */
  brandList?: GoodsBrandVO2[];
  /**
   * 商品分类列表
   */
  cateList?: GoodsCateVO2[];
  /**
   * 审核状态 0：待审核 1：已审核 2：审核未通过
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 公司信息名称
   */
  companyInfoName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建人姓名
   */
  createPersonName?: string;
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
   * 关联其他等级的等级名称集合
   */
  joinLevelNameList?: string[];
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 关联客户等级
   * * SPECIFY_CUSTOMER: -2：指定客户
   * * ALL_CUSTOMER: -1：所有客户
   * * ALL_LEVEL: 0：所有等级
   * * LEVEL_LIST: 1：其他等级
   */
  marketingJoinLevel?: -2 | -1 | 0 | 1;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销关联商品列表
   */
  marketingScopeList?: MarketingScopeVO[];
  /**
   * 活动状态
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  marketingStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 参加营销类型
   * * SCOPE_TYPE_ALL: 0：所有货品
   * * SCOPE_TYPE_CUSTOM: 1：自定义货品
   * * BRAND: 2：品牌
   * * CATE: 3：分类
   */
  scopeType?: 0 | 1 | 2 | 3;
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
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 投放渠道: 0:pc 1:h5 2:app 3:小程序
   * * PC: PC
   * * H5: H5
   * * APP: APP
   * * MINI_PROGRAM: 小程序
   */
  terminalTypeList?: (0 | 1 | 2 | 3)[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 用户群: 0 全平台会员 1 会员 2 微店主 3 员工 4 新注册会员
   * * ALL: 全平台会员
   * * CUSTOMER: 会员
   * * SHOPKEEPER: 微店主
   * * EMPLOYEE: 员工
   * * NEWCOMER: 新注册会员
   * * CUSTOM_CUSTOMER: 指定会员
   */
  userGroupType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullDiscountLevelVO".
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullReductionLevelVO".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoResponseVO".
 */
export interface GoodsInfoResponseVO1 {
  /**
   * 品牌列表
   */
  brands?: GoodsBrandVO3[];
  /**
   * 分类列表
   */
  cates?: GoodsCateVO3[];
  goodsInfoPage?: MicroServicePageGoodsInfoVO;
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO2[];
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
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
  sort?: Sort2;
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
 * via the `definition` "Completion".
 */
export interface Completion2 {
  input?: string[];
  output?: string;
  payload?: {
    [k: string]: any;
  };
  weight?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailRelVO".
 */
export interface GoodsPropDetailRelVO1 {
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
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
  goodsCateVO?: GoodsCateVO1;
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

//create by moon https://github.com/creasy2010/moon
