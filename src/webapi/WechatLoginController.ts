import * as sdk from './fetch';
import { cache } from 'config';

const controllerName = 'WechatLoginController';

/**
 *
 * 登录页（不需要token）微信授权，获得微信用户信息
 *
 */
async function weChatQuickLogin(request: IWeChatQuickLoginRequestReq): Promise<ThirdLoginResponse> {
  let result = await sdk.post<ThirdLoginResponse>(
    '/third/login/wechat/auth',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 绑定微信账号(登录入口)
 *
 */
async function weChatBind(request: IWeChatBindRequestReq): Promise<LoginResponse> {
  let result = await sdk.post<LoginResponse>(
    '/third/login/wechat/auth/bind',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 绑定微信账号(个人中心入口)
 *
 */
async function weChatBind2(weChatBindRequest: IWeChatBindWeChatBindRequestReq): Promise<LoginResponse> {
  let result = await sdk.post<LoginResponse>(
    '/third/login/wechat/bind',

    {
      ...weChatBindRequest,
    },
  );
  return result.context;
}

/**
 *
 * 提现页面，查询当前登录用户的基础信息
 *
 */
async function getDepositUerInfo(request: IGetDepositUerInfoRequestReq): Promise<WechatBaseInfoResponse> {
  let result = await sdk.post<WechatBaseInfoResponse>(
    '/third/login/wechat/deposit/auth',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 根据customerId获取从小程序端登录的登录信息
 *
 */
async function getWeappLoinInfo(customerId: IGetWeappLoinInfoCustomerIdReq): Promise<LoginResponse> {
  let result = await sdk.get<LoginResponse>(
    '/third/login/wechat/logininfo/{customerId}'.replace('{customerId}', customerId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 小程序绑定微信账号(个人中心入口)
 *
 */
async function miniprogramBind(request: IMiniprogramBindRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/third/login/wechat/miniprogram/bind',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取微信授信配置
 *
 */
async function getWechatLoginSetDetail(channel: IGetWechatLoginSetDetailChannelReq): Promise<WechatSetDetailResponse> {
  let result = await sdk.get<WechatSetDetailResponse>(
    '/third/login/wechat/set/detail/{channel}'.replace('{channel}', channel + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据终端类型，获取授信开关状态
 *
 */
async function getWechatServerStatus(channel: IGetWechatServerStatusChannelReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/third/login/wechat/status/{channel}'.replace('{channel}', channel + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 登录页（不需要token）微信授权，获得微信用户信息
 *
 */
async function weChatLogin(request: IWeChatLoginRequestReq): Promise<ThirdLoginResponse> {
  const enterpriseId = __TARO_ENV === 'h5' ? (sessionStorage.getItem(cache.CHANNEL_ENTERPRISE_ID) || null) : null

  let result = await sdk.post<ThirdLoginResponse>(
    '/third/login/wechat/weChatLogin',

    {
      ...request,
      enterpriseId
    },
  );
  return result.context;
}

/**
 *
 * 小程序code换取openId和sessionKey,并将当前环境的小程序配置返回,无需登录
 *
 */
async function authorize(request: IAuthorizeRequestReq): Promise<GetWeAppOpenIdResponse> {
  let result = await sdk.post<GetWeAppOpenIdResponse>(
    '/third/login/wechat/weapp/authorize',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 小程序code换取openId和sessionKey,并将当前环境的小程序配置返回,无需登录
 *
 */
async function getWeappOpenId(code: IGetWeappOpenIdCodeReq): Promise<GetWeAppOpenIdResponse> {
  let result = await sdk.get<GetWeAppOpenIdResponse>(
    '/third/login/wechat/weapp/getSessionKey/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

export default {
  weChatQuickLogin,

  weChatBind,

  weChatBind2,

  getDepositUerInfo,

  getWeappLoinInfo,

  miniprogramBind,

  getWechatLoginSetDetail,

  getWechatServerStatus,

  weChatLogin,

  authorize,

  getWeappOpenId,
};

/**
 * 会员ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetWeappLoinInfoCustomerIdReq".
 */
export type IGetWeappLoinInfoCustomerIdReq = string;
/**
 * 类型终端
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetWechatLoginSetDetailChannelReq".
 */
export type IGetWechatLoginSetDetailChannelReq = 'PC' | 'MOBILE' | 'APP' | 'WEAPP';
/**
 * 类型终端
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetWechatServerStatusChannelReq".
 */
export type IGetWechatServerStatusChannelReq = 'PC' | 'MOBILE' | 'APP' | 'WEAPP';
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = boolean;
/**
 * 临时票据
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetWeappOpenIdCodeReq".
 */
export type IGetWeappOpenIdCodeReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WechatQuickLoginRequest".
 */
export interface WechatQuickLoginRequest {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: number;
  /**
   * 授权临时票据
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 头像
   */
  headimgurl?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 小程序openId
   */
  openId?: string;
  /**
   * 小程序端获取手机号
   */
  phonNumber?: string;
  /**
   * 微信用户唯一标识
   */
  unionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ThirdLoginResponse»".
 */
export interface BaseResponseThirdLoginResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ThirdLoginResponse;
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
export interface ThirdLoginResponse {
  info?: WechatBaseInfoResponse;
  login?: LoginResponse;
  /**
   * 是否登录
   */
  loginFlag?: boolean;
  /**
   * 手机号
   */
  phoneNum?: string;
  /**
   * 登录凭证
   */
  token?: string;
  /**
   * unionId
   */
  unionId?: string;
  [k: string]: any;
}
/**
 * 微信返回结果
 */
export interface WechatBaseInfoResponse {
  /**
   * 微信头像路径
   */
  headImgUrl?: string;
  /**
   * 微信unionid
   */
  id?: string;
  /**
   * 微信昵称
   */
  name?: string;
  [k: string]: any;
}
/**
 * 登录返回结果
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
  enterpriseInfoVO?: EnterpriseInfoVO1;
  /**
   * 被邀请会员邀请码
   */
  inviteCode?: string;
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
   */
  couponType?: 0 | 1 | 2;
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
   */
  rangeDayType?: 0 | 1;
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
  customerVO?: CustomerVO;
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
  customerDetail?: null;
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
 * 企业购会员公司详情信息
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
 * via the `definition` "ThirdLoginResponse".
 */
export interface ThirdLoginResponse1 {
  info?: WechatBaseInfoResponse;
  login?: LoginResponse;
  /**
   * 是否登录
   */
  loginFlag?: boolean;
  /**
   * 手机号
   */
  phoneNum?: string;
  /**
   * 登录凭证
   */
  token?: string;
  /**
   * unionId
   */
  unionId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WechatBaseInfoResponse".
 */
export interface WechatBaseInfoResponse1 {
  /**
   * 微信头像路径
   */
  headImgUrl?: string;
  /**
   * 微信unionid
   */
  id?: string;
  /**
   * 微信昵称
   */
  name?: string;
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
  enterpriseInfoVO?: EnterpriseInfoVO1;
  /**
   * 被邀请会员邀请码
   */
  inviteCode?: string;
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
   */
  couponType?: 0 | 1 | 2;
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
   */
  rangeDayType?: 0 | 1;
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
  customerVO?: CustomerVO;
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
 * via the `definition` "CustomerVO".
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
  customerDetail?: null;
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
 * via the `definition` "EnterpriseInfoVO".
 */
export interface EnterpriseInfoVO2 {
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
 * via the `definition` "WechatBindForLoginRequest".
 */
export interface WechatBindForLoginRequest {
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: number;
  /**
   * id（微信id）
   */
  id?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 分享人用户id
   */
  shareUserId?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 验证码
   */
  verifyCode?: string;
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
  context?: LoginResponse2;
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
export interface LoginResponse2 {
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
  enterpriseInfoVO?: EnterpriseInfoVO1;
  /**
   * 被邀请会员邀请码
   */
  inviteCode?: string;
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
 * via the `definition` "WechatBindRequest".
 */
export interface WechatBindRequest {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * 终端类型
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  type?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«WechatBaseInfoResponse»".
 */
export interface BaseResponseWechatBaseInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: WechatBaseInfoResponse2;
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
export interface WechatBaseInfoResponse2 {
  /**
   * 微信头像路径
   */
  headImgUrl?: string;
  /**
   * 微信unionid
   */
  id?: string;
  /**
   * 微信昵称
   */
  name?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WechatBindForMiniprogramRequest".
 */
export interface WechatBindForMiniprogramRequest {
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 微信授权openId
   */
  openid?: string;
  /**
   * 第三方关系关联(union)Id
   */
  unionid?: string;
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
 * via the `definition` "BaseResponse«WechatSetDetailResponse»".
 */
export interface BaseResponseWechatSetDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: WechatSetDetailResponse;
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
export interface WechatSetDetailResponse {
  /**
   * 微信appId
   */
  appId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WechatSetDetailResponse".
 */
export interface WechatSetDetailResponse1 {
  /**
   * 微信appId
   */
  appId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«boolean»".
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: boolean;
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
 * via the `definition` "WechatAuthRequest".
 */
export interface WechatAuthRequest {
  /**
   * 微信临时授权码
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GetWeAppOpenIdResponse»".
 */
export interface BaseResponseGetWeAppOpenIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GetWeAppOpenIdResponse;
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
export interface GetWeAppOpenIdResponse {
  /**
   * appId
   */
  appId?: string;
  /**
   * appSecret
   */
  appSecret?: string;
  /**
   * loginFlag
   */
  loginFlag?: boolean;
  /**
   * openid
   */
  openid?: string;
  /**
   * sessionKey
   */
  sessionKey?: string;
  /**
   * unionId
   */
  unionId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetWeAppOpenIdResponse".
 */
export interface GetWeAppOpenIdResponse1 {
  /**
   * appId
   */
  appId?: string;
  /**
   * appSecret
   */
  appSecret?: string;
  /**
   * loginFlag
   */
  loginFlag?: boolean;
  /**
   * openid
   */
  openid?: string;
  /**
   * sessionKey
   */
  sessionKey?: string;
  /**
   * unionId
   */
  unionId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWeChatQuickLoginRequestReq".
 */
export interface IWeChatQuickLoginRequestReq {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: string;
  /**
   * 授权临时票据
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 头像
   */
  headimgurl?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 小程序openId
   */
  openId?: string;
  /**
   * 小程序端获取手机号
   */
  phonNumber?: string;
  /**
   * 微信用户唯一标识
   */
  unionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWeChatBindRequestReq".
 */
export interface IWeChatBindRequestReq {
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: number;
  /**
   * id（微信id）
   */
  id?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 分享人用户id
   */
  shareUserId?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWeChatBindWeChatBindRequestReq".
 */
export interface IWeChatBindWeChatBindRequestReq {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 验证码
   */
  code?: string;
  /**
   * 终端类型
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  type?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDepositUerInfoRequestReq".
 */
export interface IGetDepositUerInfoRequestReq {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: string;
  /**
   * 授权临时票据
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 头像
   */
  headimgurl?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 小程序openId
   */
  openId?: string;
  /**
   * 小程序端获取手机号
   */
  phonNumber?: string;
  /**
   * 微信用户唯一标识
   */
  unionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IMiniprogramBindRequestReq".
 */
export interface IMiniprogramBindRequestReq {
  /**
   * 微信临时授权码
   */
  code?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;

  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IWeChatLoginRequestReq".
 */
export interface IWeChatLoginRequestReq {
  /**
   * 微信登录appId
   */
  appId?: string;
  /**
   * 微信登录appSecret
   */
  appSecret?: string;
  /**
   * 类型终端
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * WEAPP: WEAPP
   */
  channel?: string;
  /**
   * 授权临时票据
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 头像
   */
  headimgurl?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 小程序openId
   */
  openId?: string;
  /**
   * 小程序端获取手机号
   */
  phonNumber?: string;
  /**
   * 微信用户唯一标识
   */
  unionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAuthorizeRequestReq".
 */
export interface IAuthorizeRequestReq {
  /**
   * 微信临时授权码
   */
  code?: string;
  /**
   * 微信加密数据
   */
  encryptedData?: string;
  /**
   * 解密密钥
   */
  iv?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
