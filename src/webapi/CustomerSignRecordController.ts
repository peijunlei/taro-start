import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerSignRecordController';

/**
 *
 * 新增用户签到记录
 *
 */
async function add(signTerminal: IAddSignTerminalReq): Promise<CustomerSignRecordAddResponse> {
  let result = await sdk.get<CustomerSignRecordAddResponse>(
    '/customer/signrecord/add/{signTerminal}'.replace('{signTerminal}', signTerminal + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除用户签到记录
 *
 */
async function deleteByIdList_(delByIdListReq: IDeleteByIdList_DelByIdListReqReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/signrecord/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出用户签到记录列表
 *
 */
async function exportData(encrypted: IExportDataEncryptedReq): Promise<unknown> {
  let result = await sdk.get(
    '/customer/signrecord/export/{encrypted}'.replace('{encrypted}', encrypted + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询用户信息
 *
 */
async function getCustomerInfo(): Promise<CustomerSignRecordInitInfoResponse> {
  let result = await sdk.get<CustomerSignRecordInitInfoResponse>(
    '/customer/signrecord/getUserInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询用户签到记录
 *
 */
async function getList(listReq: IGetListListReqReq): Promise<CustomerSignRecordListResponse> {
  let result = await sdk.post<CustomerSignRecordListResponse>(
    '/customer/signrecord/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询当月用户签到记录
 *
 */
async function getListByThisMonth(): Promise<CustomerSignRecordListResponse> {
  let result = await sdk.get<CustomerSignRecordListResponse>(
    '/customer/signrecord/listByMonth',

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除用户签到记录
 *
 */
async function deleteById_(signRecordId: IDeleteById_SignRecordIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/signrecord/{signRecordId}'.replace('{signRecordId}', signRecordId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  exportData,

  getCustomerInfo,

  getList,

  getListByThisMonth,

  deleteById_,
};

/**
 * signTerminal
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddSignTerminalReq".
 */
export type IAddSignTerminalReq = string;
/**
 * encrypted
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * signRecordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_SignRecordIdReq".
 */
export type IDeleteById_SignRecordIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerSignRecordAddResponse»".
 */
export interface BaseResponseCustomerSignRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSignRecordAddResponse;
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
export interface CustomerSignRecordAddResponse {
  customerSignRecordVO?: CustomerSignRecordVO;
  [k: string]: any;
}
/**
 * 已新增的用户签到记录信息
 */
export interface CustomerSignRecordVO {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 签到日期记录
   */
  signRecord?: string;
  /**
   * 用户签到记录表id
   */
  signRecordId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSignRecordAddResponse".
 */
export interface CustomerSignRecordAddResponse1 {
  customerSignRecordVO?: CustomerSignRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSignRecordVO".
 */
export interface CustomerSignRecordVO1 {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 签到日期记录
   */
  signRecord?: string;
  /**
   * 用户签到记录表id
   */
  signRecordId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSignRecordDelByIdListRequest".
 */
export interface CustomerSignRecordDelByIdListRequest {
  /**
   * 批量删除-用户签到记录表idList
   */
  signRecordIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
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
 * via the `definition` "BaseResponse«CustomerSignRecordInitInfoResponse»".
 */
export interface BaseResponseCustomerSignRecordInitInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSignRecordInitInfoResponse;
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
export interface CustomerSignRecordInitInfoResponse {
  customerVO?: CustomerVO;
  /**
   * 后台签到获取成长值配置是否开启
   */
  growthFlag?: boolean;
  /**
   * 签到可获得的成长值
   */
  growthValue?: number;
  /**
   * 后台签到获取积分配置是否开启
   */
  pointFlag?: boolean;
  /**
   * 今日是否签到标志
   */
  signFlag?: boolean;
  /**
   * 签到可获得的积分值
   */
  signPoint?: number;
  [k: string]: any;
}
/**
 * 用户信息
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSignRecordInitInfoResponse".
 */
export interface CustomerSignRecordInitInfoResponse1 {
  customerVO?: CustomerVO;
  /**
   * 后台签到获取成长值配置是否开启
   */
  growthFlag?: boolean;
  /**
   * 签到可获得的成长值
   */
  growthValue?: number;
  /**
   * 后台签到获取积分配置是否开启
   */
  pointFlag?: boolean;
  /**
   * 今日是否签到标志
   */
  signFlag?: boolean;
  /**
   * 签到可获得的积分值
   */
  signPoint?: number;
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
 * via the `definition` "CustomerSignRecordListRequest".
 */
export interface CustomerSignRecordListRequest {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 签到日期记录
   */
  signRecord?: string;
  /**
   * 搜索条件:签到日期记录开始
   */
  signRecordBegin?: string;
  /**
   * 搜索条件:签到日期记录截止
   */
  signRecordEnd?: string;
  /**
   * 用户签到记录表id
   */
  signRecordId?: string;
  /**
   * 批量查询-用户签到记录表idList
   */
  signRecordIdList?: string[];
  /**
   * 搜索条件:当月签到记录日期
   */
  signRecordSameMonth?: string;
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
 * via the `definition` "BaseResponse«CustomerSignRecordListResponse»".
 */
export interface BaseResponseCustomerSignRecordListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSignRecordListResponse;
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
export interface CustomerSignRecordListResponse {
  /**
   * 用户签到记录列表结果
   */
  customerSignRecordVOList?: CustomerSignRecordVO2[];
  [k: string]: any;
}
export interface CustomerSignRecordVO2 {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 签到日期记录
   */
  signRecord?: string;
  /**
   * 用户签到记录表id
   */
  signRecordId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSignRecordListResponse".
 */
export interface CustomerSignRecordListResponse1 {
  /**
   * 用户签到记录列表结果
   */
  customerSignRecordVOList?: CustomerSignRecordVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-用户签到记录表idList
   */
  signRecordIdList?: string[];
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
   * 用户id
   */
  customerId?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 签到日期记录
   */
  signRecord?: string;
  /**
   * 搜索条件:签到日期记录开始
   */
  signRecordBegin?: string;
  /**
   * 搜索条件:签到日期记录截止
   */
  signRecordEnd?: string;
  /**
   * 用户签到记录表id
   */
  signRecordId?: string;
  /**
   * 批量查询-用户签到记录表idList
   */
  signRecordIdList?: string[];
  /**
   * 搜索条件:当月签到记录日期
   */
  signRecordSameMonth?: string;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
