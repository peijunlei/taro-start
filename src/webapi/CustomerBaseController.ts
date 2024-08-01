import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerBaseController';

/**
 *
 * 验证token
 *
 */
async function checkToken(): Promise<unknown> {
  let result = await sdk.get(
    '/customer/check-token',

    {},
  );
  return result.context;
}
// /comm-url/get-weixin-config
/**
 * 获取 Url Scheme
 */
async function getWeixinScheme(params:{
  path:string;
  query:string;
  envVersion: string;
}): Promise<unknown> {
  let result = await sdk.post(
    '/comm-url/get-weixin-config',
    {...params},
  );
  return result.context;
}
/**
 * 免登 token
 */
async function autoLoginByToken(): Promise<unknown> {
  let result = await sdk.get(
    '/login/comm/url',
    {},
  );
  return result.context;
}

/**
 *
 * 查询会员基本信息数据
 *
 */
async function findCustomerBaseInfo(): Promise<CustomerBaseInfoResponse> {
  let result = await sdk.get<CustomerBaseInfoResponse>(
    '/customer/customerBase',

    {},
  );
  return result.context;
}

/**
 *
 * 修改会员基本信息
 *
 */
async function updateCustomerBaseInfo(
  customerEditRequest: IUpdateCustomerBaseInfoCustomerEditRequestReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/customer/customerBase',

    {
      ...customerEditRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询会员中心主页面数据
 *
 */
async function findCustomerCenterInfo(): Promise<CustomerCenterResponse> {
  let result = await sdk.get<CustomerCenterResponse>(
    '/customer/customerCenter',

    {},
  );
  return result.context;
}

/**
 *
 * 查询会员关联的相关企业信息
 *
 */
async function getEnterpriseInfoByCustomerId(): Promise<{enterpriseInfoVOList:any[]}> {
  let result = await sdk.get<any>(
    '/enterpriseInfo/getEnterpriseInfoByCustomerId',

    {},
  );
  return result.context;
}
/**
 * 查询企业详情
 * /enterpriseInfo/mobile/{enterpriseId}
 */
async function getEnterpriseInfoById(enterpriseId: string): Promise<any> {
  let result = await sdk.get<any>(
    `/enterpriseInfo/mobile/${enterpriseId}`,
    {},
  );
  return result.context;
}
/**
 *
 * 查询会员当前所在的企业ID
 *
 */
async function getUsedEnterpriseId(): Promise<any> {
  let result = await sdk.get<any>(
    '/enterpriseInfo/getCurrEnterpriseInfoByCustomerId',

    {},
  );
  return result.context;
}
async function changeLoginEnterpriseId(enterpriseId: string | number): Promise<any> {
  let result = await sdk.post<any>(
    '/login/{enterpriseId}'.replace('{enterpriseId}', enterpriseId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据用户ID查询用户详情
 *
 */
async function getCustomerBaseInfo(customerId: IGetCustomerBaseInfoCustomerIdReq): Promise<CustomerDetailVO> {
  let result = await sdk.get<CustomerDetailVO>(
    '/customer/customerInfoById/{customerId}'.replace('{customerId}', customerId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心查询会员绑定的手机号
 *
 */
async function findCustomerMobile(): Promise<CustomerSafeResponse> {
  let result = await sdk.get<CustomerSafeResponse>(
    '/customer/customerMobile',

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 给原号码发送验证码
 *
 */
async function sendVerifiedCode(customerAccount: ISendVerifiedCodeCustomerAccountReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/customerVerified',

    {},
  );
  return result.context;
}

/**
 *
 * 获取当前登录人信息
 *
 */
async function getGrowthValueAndPoint(): Promise<GrowthValueAndPointResponse> {
  let result = await sdk.get<GrowthValueAndPointResponse>(
    '/customer/getGrowthValueAndPoint',

    {},
  );
  return result.context;
}

/**
 *
 * 获取当前登录人信息
 *
 */
async function getLoginCustomerInfo(): Promise<CustomerGetByIdResponse> {
  let result = await sdk.get<CustomerGetByIdResponse>(
    '/customer/getLoginCustomerInfo',

    {},
  );
  return result.context;
}
/**轩跨对接类型 */
export enum XuanKuaType {
  /**电影 */
  MOVIE = '0',
  /**生活 */
  LIFE = '1',
  /**演出 */
  PERFORMANCE = '2',
  /**美团外卖 */
  MT_TAKEOUT = '3',
  /**美团餐饮 */
  MT_CATERING = '4',
  /**叮咚买菜 */
  DD_VEGETABLE = '5',
  /**山姆优选*/
  SAMS_CENTER = '6',
}
//获取电影票免登接口
async function getMovieTicketLoginUrl(): Promise<any> {
  let result = await sdk.get<CustomerGetByIdResponse>('/xuankua/getAuthCodeUrl', {});
  return result.context;
}
//获取生活免登接口
async function getLocalLifeUrl(): Promise<any> {
  let result = await sdk.get<CustomerGetByIdResponse>('/xuankuaLife/getAuthCodeUrl', {});
  return result.context;
}
//获取演出免登接口
async function getPerformanceUrl(): Promise<any> {
  let result = await sdk.get<CustomerGetByIdResponse>('/xuankuaDrama/getAuthCodeUrl', {});
  return result.context;
}
/**根据类型获取免登地址 */
async function getXuanKuaUrl(type: XuanKuaType, location?: { longitude: number, latitude: number }) {
  let url = ''
  switch (type) {
    case '0':
      url = '/xuankua/getAuthCodeUrl'
      break;
    case '1':
      url = '/xuankuaLife/getAuthCodeUrl'
      break;
    case '2':
      url = '/xuankuaDrama/getAuthCodeUrl'
      break;
    case '3':
      url = `/tongkashuke/meituan/getAuthCodeUrl/mt_waimai`
      break;
    case '4':
      url = `/tongkashuke/meituan/getAuthCodeUrl/dp_canyin`
      break;
    case '5':
      url = '/tongkashuke/dingDong/noAuthLogin'
      break;
    case '6':
      url = '/tongkashuke/shanmuyouxuan/getAuthCodeUrl'
      break;
    default:
      throw new Error('not found')
  }
  let result = ['3', '4'].includes(type)
    ? await sdk.post<{ url: string }>(url, {})
    : type === '5'
      ? await sdk.post<{ url: string }>(url, { ...location })
      : await sdk.get<{ url: string }>(url, {});
  return result.context;
}
/**
 *
 * 获取当前登录人的邮箱信息
 * /customer/email/sendToFinance/
 */
async function getCustomerEmailList(): Promise<any> {
  let result = await sdk.get<any>(
    '/customer/emailList',

    {},
  );
  return result.context;
}

/**
 *
 * 发送邮件给财务
 *
 */
async function sendEmailsToFinance(tradeNo: string | number): Promise<any> {
  let result = await sdk.post<any>(
    '/customer/email/sendToFinance/{tradeId}'.replace('{tradeId}', tradeNo + ''),

    {},
  );
  return result;
}

/**
 *
 * 查询可用积分
 *
 */
async function getPointsAvailable(): Promise<CustomerPointsAvailableByCustomerIdResponse> {
  let result = await sdk.get<CustomerPointsAvailableByCustomerIdResponse>(
    '/customer/getPointsAvailable',

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 发送验证码给新手机号
 *
 */
async function sendVerifiedCodeNew(customerAccount: ISendVerifiedCodeNewCustomerAccountReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/newCustomerVerified/{customerAccount}'.replace('{customerAccount}', customerAccount + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号
 *
 */
async function changeNewMobile(mobileRequest: IChangeNewMobileMobileRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/newMobileCode',

    {
      ...mobileRequest,
    },
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 验证原号码发送的验证码
 *
 */
async function validateVerifiedCode(mobileRequest: IValidateVerifiedCodeMobileRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/customer/oldMobileCode',

    {
      ...mobileRequest,
    },
  );
  return result.context;
}

export default {
  checkToken,
  autoLoginByToken,
  getWeixinScheme,
  findCustomerBaseInfo,

  updateCustomerBaseInfo,

  findCustomerCenterInfo,

  getCustomerBaseInfo,

  findCustomerMobile,

  sendVerifiedCode,

  getGrowthValueAndPoint,

  getLoginCustomerInfo,

  sendVerifiedCodeNew,

  changeNewMobile,

  validateVerifiedCode,

  getCustomerEmailList,

  sendEmailsToFinance,

  getPointsAvailable,

  getEnterpriseInfoByCustomerId,
  getEnterpriseInfoById,
  getUsedEnterpriseId,

  changeLoginEnterpriseId,

  getMovieTicketLoginUrl,
  getLocalLifeUrl,
  getPerformanceUrl,
  getXuanKuaUrl
};

/**
 * 会员id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCustomerBaseInfoCustomerIdReq".
 */
export type IGetCustomerBaseInfoCustomerIdReq = string;
/**
 * 会员账户
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifiedCodeCustomerAccountReq".
 */
export type ISendVerifiedCodeCustomerAccountReq = string;
/**
 * 会员账户
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifiedCodeNewCustomerAccountReq".
 */
export type ISendVerifiedCodeNewCustomerAccountReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
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
 * via the `definition` "BaseResponse«CustomerBaseInfoResponse»".
 */
export interface BaseResponseCustomerBaseInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerBaseInfoResponse;
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
export interface CustomerBaseInfoResponse {
  /**
   * 街道
   */
  streetId?: number;
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
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 账号
   */
  customerDetailId?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 业务员名称
   */
  employeeName?: string;
  enterpriseInfo?: EnterpriseInfoVO;
  /**
   * 性别，0女，1男
   * * FEMALE: 女
   * * MALE: 男
   * * SECRET: 保密
   */
  gender?: 0 | 1 | 2;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 是否是企业会员
   */
  isEnterpriseCustomer?: boolean;
  /**
   * 省
   */
  provinceId?: number;
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBaseInfoResponse".
 */
export interface CustomerBaseInfoResponse1 {
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
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 账号
   */
  customerDetailId?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 业务员名称
   */
  employeeName?: string;
  enterpriseInfo?: EnterpriseInfoVO;
  /**
   * 性别，0女，1男
   * * FEMALE: 女
   * * MALE: 男
   * * SECRET: 保密
   */
  gender?: 0 | 1 | 2;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 是否是企业会员
   */
  isEnterpriseCustomer?: boolean;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerBaseInfoRequest".
 */
export interface CustomerBaseInfoRequest {
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
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 客户详情id
   */
  customerDetailId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
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
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerCenterResponse»".
 */
export interface BaseResponseCustomerCenterResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCenterResponse;
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
export interface CustomerCenterResponse {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 企业会员logo
   */
  enterpriseCustomerLogo?: string;
  /**
   * 企业会员名称
   */
  enterpriseCustomerName?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
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
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCenterResponse".
 */
export interface CustomerCenterResponse1 {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 企业会员logo
   */
  enterpriseCustomerLogo?: string;
  /**
   * 企业会员名称
   */
  enterpriseCustomerName?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
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
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDetailVO»".
 */
export interface BaseResponseCustomerDetailVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDetailVO;
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
  enterpriseInfoVO?: EnterpriseInfoVO2;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO2 {
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
  enterpriseInfoVO?: EnterpriseInfoVO2;
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
 * via the `definition` "BaseResponse«CustomerSafeResponse»".
 */
export interface BaseResponseCustomerSafeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSafeResponse;
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
export interface CustomerSafeResponse {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSafeResponse".
 */
export interface CustomerSafeResponse1 {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrowthValueAndPointResponse»".
 */
export interface BaseResponseGrowthValueAndPointResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrowthValueAndPointResponse;
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
export interface GrowthValueAndPointResponse {
  /**
   * 完善信息获取成长值配置是否开启
   */
  growthFlag?: boolean;
  /**
   * 完善信息可获得的成长值
   */
  growthValue?: number;
  /**
   * 完善信息可获得的积分值
   */
  point?: number;
  /**
   * 完善信息获取积分配置是否开启
   */
  pointFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrowthValueAndPointResponse".
 */
export interface GrowthValueAndPointResponse1 {
  /**
   * 完善信息获取成长值配置是否开启
   */
  growthFlag?: boolean;
  /**
   * 完善信息可获得的成长值
   */
  growthValue?: number;
  /**
   * 完善信息可获得的积分值
   */
  point?: number;
  /**
   * 完善信息获取积分配置是否开启
   */
  pointFlag?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerGetByIdResponse»".
 */
export interface BaseResponseCustomerGetByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGetByIdResponse;
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
export interface CustomerGetByIdResponse {
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
  customerDetail?: CustomerDetailVO3;
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
  distributeChannel?: DistributeChannel2;
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
  enterpriseInfoVO?: EnterpriseInfoVO3;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO2[];
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
export interface CustomerDetailVO3 {
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
 * 分销渠道信息
 */
export interface DistributeChannel2 {
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
export interface EnterpriseInfoVO3 {
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
export interface StoreCustomerRelaVO2 {
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
 * via the `definition` "CustomerGetByIdResponse".
 */
export interface CustomerGetByIdResponse1 {
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
  customerDetail?: CustomerDetailVO3;
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
  distributeChannel?: DistributeChannel2;
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
  enterpriseInfoVO?: EnterpriseInfoVO3;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO2[];
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
 * via the `definition` "CustomerMobileRequest".
 */
export interface CustomerMobileRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
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
 * via the `definition` "IUpdateCustomerBaseInfoCustomerEditRequestReq".
 */
export interface IUpdateCustomerBaseInfoCustomerEditRequestReq {
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
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 客户详情id
   */
  customerDetailId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
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
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IChangeNewMobileMobileRequestReq".
 */
export interface IChangeNewMobileMobileRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IValidateVerifiedCodeMobileRequestReq".
 */
export interface IValidateVerifiedCodeMobileRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}

/**
 */
export interface BaseResponseCustomerPointsAvailableByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerPointsAvailableByCustomerIdResponse;
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
export interface CustomerPointsAvailableByCustomerIdResponse {
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
