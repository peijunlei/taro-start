import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerSyncBaseController';

/**
 *
 * 更新积分
 *
 */
async function addPoint(
  request: IAddPointRequestReq,
): Promise<CustomerGetByIdResponse> {
  let result = await sdk.put<CustomerGetByIdResponse>(
    '/customer/sync/addPoint',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询会员基本信息数据
 *
 */
async function getCustomerById(
  customerGetByIdRequest: IGetCustomerByIdCustomerGetByIdRequestReq,
): Promise<CustomerGetByIdResponse> {
  let result = await sdk.post<CustomerGetByIdResponse>(
    '/customer/sync/getCustomerById',

    {
      ...customerGetByIdRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询用户佣金
 *
 */
async function getCustomerFundsById(
  request: IGetCustomerFundsByIdRequestReq,
): Promise<CustomerFundsByCustomerIdResponse> {
  let result = await sdk.put<CustomerFundsByCustomerIdResponse>(
    '/customer/sync/getCustomerFundsById',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 更新用户佣金
 *
 */
async function updateOrderUseAmount(
  request: IUpdateOrderUseAmountRequestReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/customer/sync/updateOrderUseAmount',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  addPoint,

  getCustomerById,

  getCustomerFundsById,

  updateOrderUseAmount,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerPointsDetailAddRequest".
 */
export interface CustomerPointsDetailAddRequest {
  customerId?: string;
  /**
   * 累积消费金额
   */
  totalPrice?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  customerAccount?: string;
  customerName?: string;
  type?: '0' | '1';
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'
    | '32'
    | '33'
    | '34'
    | '35'
    | '36'
    | '37'
    | '38';
  points?: number;
  content?: string;
  pointsAvailable?: number;
  opTime?: string;
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
 * via the `definition` "CustomerGetByIdResponse".
 */
export interface CustomerGetByIdResponse1 {
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
  distributeChannel?: DistributeChannel1;
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
  storeCustomerRelaListByAll?: StoreCustomerRelaVO1[];
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
 * via the `definition` "DistributeChannel".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustomerRelaVO".
 */
export interface StoreCustomerRelaVO2 {
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
 * via the `definition` "CustomerGetByIdRequest".
 */
export interface CustomerGetByIdRequest {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFundsByCustomerIdRequest".
 */
export interface CustomerFundsByCustomerIdRequest {
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerFundsByCustomerIdResponse»".
 */
export interface BaseResponseCustomerFundsByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFundsByCustomerIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFundsByCustomerIdResponse {
  accountBalance?: number;
  alreadyDrawAmount?: number;
  amountPaid?: number;
  amountReceived?: number;
  blockedBalance?: number;
  customerAccount?: string;
  customerFundsId?: string;
  customerId?: string;
  customerName?: string;
  distributor?: number;
  expenditure?: number;
  income?: number;
  withdrawAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFundsByCustomerIdResponse".
 */
export interface CustomerFundsByCustomerIdResponse1 {
  accountBalance?: number;
  alreadyDrawAmount?: number;
  amountPaid?: number;
  amountReceived?: number;
  blockedBalance?: number;
  customerAccount?: string;
  customerFundsId?: string;
  customerId?: string;
  customerName?: string;
  distributor?: number;
  expenditure?: number;
  income?: number;
  withdrawAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFundsAddAmountRequest".
 */
export interface CustomerFundsAddAmountRequest {
  /**
   * 余额金额
   */
  amount?: number;
  /**
   * 业务编号
   */
  businessId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 资金明细-账务子类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 推广返利
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * SELFBUY_COMMISSION: 自购返利
   * * PROMOTION_COMMISSION: 推广提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   * * ORDER_USE_AMOUNT: 下单佣金抵扣
   * * REFUND_RETURN_AMOUNT: 退单返还佣金
   * * CANCEL_RETURN_AMOUNT: 取消订单返还佣金
   * * BALANCE_REVERSE: 余额冲正
   */
  fundsSubType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /**
   * 资金类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 分销佣金
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * COMMISSION_COMMISSION: 佣金提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   * * ORDER_USE_AMOUNT: 下单佣金抵扣
   * * REFUND_RETURN_AMOUNT: 退单返还佣金
   * * CANCEL_RETURN_AMOUNT: 取消订单返还佣金
   * * BALANCE_REVERSE: 余额冲正
   * * REWARD_MONEY: 奖励结算
   */
  fundsType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11';
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddPointRequestReq".
 */
export interface IAddPointRequestReq {
  customerId?: string;
  /**
   * 累积消费金额
   */
  totalPrice?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  customerAccount?: string;
  customerName?: string;
  type?: '0' | '1';
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'
    | '32'
    | '33'
    | '34'
    | '35'
    | '36'
    | '37'
    | '38';
  points?: number;
  content?: string;
  pointsAvailable?: number;
  opTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCustomerByIdCustomerGetByIdRequestReq".
 */
export interface IGetCustomerByIdCustomerGetByIdRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCustomerFundsByIdRequestReq".
 */
export interface IGetCustomerFundsByIdRequestReq {
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateOrderUseAmountRequestReq".
 */
export interface IUpdateOrderUseAmountRequestReq {
  /**
   * 余额金额
   */
  amount?: number;
  /**
   * 业务编号
   */
  businessId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 资金明细-账务子类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 推广返利
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * SELFBUY_COMMISSION: 自购返利
   * * PROMOTION_COMMISSION: 推广提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   * * ORDER_USE_AMOUNT: 下单佣金抵扣
   * * REFUND_RETURN_AMOUNT: 退单返还佣金
   * * CANCEL_RETURN_AMOUNT: 取消订单返还佣金
   * * BALANCE_REVERSE: 余额冲正
   */
  fundsSubType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /**
   * 资金类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 分销佣金
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * COMMISSION_COMMISSION: 佣金提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   * * ORDER_USE_AMOUNT: 下单佣金抵扣
   * * REFUND_RETURN_AMOUNT: 退单返还佣金
   * * CANCEL_RETURN_AMOUNT: 取消订单返还佣金
   * * BALANCE_REVERSE: 余额冲正
   * * REWARD_MONEY: 奖励结算
   */
  fundsType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11';
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
