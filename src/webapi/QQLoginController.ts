import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'QQLoginController';

/**
 *
 * 绑定QQ账号(个人中心入口)
 *
 */
async function bind(
  qqBindRequest: IBindQqBindRequestReq,
): Promise<LoginResponse> {
  let result = await sdk.post<LoginResponse>(
    '/third/login/qq/bind',

    {
      ...qqBindRequest,
    },
  );
  return result.context;
}

export default {
  bind,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "QQBindRequest".
 */
export interface QQBindRequest {
  /**
   * QQ登录accessToken
   */
  accessToken?: string;
  /**
   * QQ登录appId
   */
  appId?: string;
  /**
   * QQ登录appSecret
   */
  appSecret?: string;
  /**
   * QQ登录city
   */
  city?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * QQ登录iconUrl
   */
  iconUrl?: string;
  /**
   * QQ登录name
   */
  name?: string;
  /**
   * QQ登录openId
   */
  openId?: string;
  /**
   * QQ登录province
   */
  province?: string;
  /**
   * 终端类型
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  type?: number;
  uid?: string;
  /**
   * QQ登录unionId
   */
  unionId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«LoginResponse»".
 */
export interface BaseResponseLoginResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LoginResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface LoginResponse {
  /**
   * 账号名称
   */
  accountName?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: number;
  couponResponse?: GetRegisterOrStoreCouponResponse;
  customerDetail?: CustomerDetailVO;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 是否直接可以登录
   */
  isLoginFlag?: boolean;
  /**
   * jwt验证token
   */
  token?: string;
  [k: string]: any;
}
/**
 * 注册赠券信息
 */
export interface GetRegisterOrStoreCouponResponse {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
export interface GetCouponGroupResponse {
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
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
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
   * 营销范围类型
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
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * 客户明细信息
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LoginResponse".
 */
export interface LoginResponse1 {
  /**
   * 账号名称
   */
  accountName?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: number;
  couponResponse?: GetRegisterOrStoreCouponResponse;
  customerDetail?: CustomerDetailVO;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 是否直接可以登录
   */
  isLoginFlag?: boolean;
  /**
   * jwt验证token
   */
  token?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetRegisterOrStoreCouponResponse".
 */
export interface GetRegisterOrStoreCouponResponse1 {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetCouponGroupResponse".
 */
export interface GetCouponGroupResponse1 {
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
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
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
   * 营销范围类型
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
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailVO".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVO".
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
  customerDetail?: CustomerDetailVO2;
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
 * via the `definition` "IBindQqBindRequestReq".
 */
export interface IBindQqBindRequestReq {
  /**
   * QQ登录accessToken
   */
  accessToken?: string;
  /**
   * QQ登录appId
   */
  appId?: string;
  /**
   * QQ登录appSecret
   */
  appSecret?: string;
  /**
   * QQ登录city
   */
  city?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * QQ登录iconUrl
   */
  iconUrl?: string;
  /**
   * QQ登录name
   */
  name?: string;
  /**
   * QQ登录openId
   */
  openId?: string;
  /**
   * QQ登录province
   */
  province?: string;
  /**
   * 终端类型
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  type?: number;
  uid?: string;
  /**
   * QQ登录unionId
   */
  unionId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
