import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerOpenShopController';

/**
 *
 * 提交开店
 *
 */
async function open(
  request: IOpenRequestReq,
): Promise<CustomerOpenShopAddResponse> {
  let result = await sdk.post<CustomerOpenShopAddResponse>(
    '/customer/open/shop/add',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询用户信息
 *
 */
async function getCustomerDetailForOpenShop(): Promise<
  CustomerDetailForOpenShopResponse
> {
  let result = await sdk.post<CustomerDetailForOpenShopResponse>(
    '/customer/open/shop/getCustomerDetailForOpenShop',

    {},
  );
  return result.context;
}

/**
 *
 * 查询微店主信息
 *
 */
async function getCustomerOpenShopById(): Promise<
  CustomerOpenShopByIdResponse
> {
  let result = await sdk.post<CustomerOpenShopByIdResponse>(
    '/customer/open/shop/getCustomerOpenShopById',

    {},
  );
  return result.context;
}

/**
 *
 * 是否已开店
 *
 */
async function hasStore(): Promise<CustomerOpenShopBoolenResponse> {
  let result = await sdk.post<CustomerOpenShopBoolenResponse>(
    '/customer/open/shop/hasStore',

    {},
  );
  return result.context;
}

/**
 *
 * 是否是联系人
 *
 */
async function isContact(): Promise<CustomerOpenShopBoolenResponse> {
  let result = await sdk.post<CustomerOpenShopBoolenResponse>(
    '/customer/open/shop/isContact',

    {},
  );
  return result.context;
}

/**
 *
 * 是否是员工
 *
 */
async function isEmployee(): Promise<CustomerOpenShopBoolenResponse> {
  let result = await sdk.post<CustomerOpenShopBoolenResponse>(
    '/customer/open/shop/isEmployee',

    {},
  );
  return result.context;
}

/**
 *
 * 预览开店信息
 *
 */
async function preview(): Promise<CustomerOpenShopByIdResponse> {
  let result = await sdk.post<CustomerOpenShopByIdResponse>(
    '/customer/open/shop/preview',

    {},
  );
  return result.context;
}

/**
 *
 * 开店协议
 *
 */
async function protocolSetting(): Promise<ProtocolSettingByIdResponse> {
  let result = await sdk.post<ProtocolSettingByIdResponse>(
    '/customer/open/shop/protocol',

    {},
  );
  return result.context;
}

/**
 *
 * 重新开店
 *
 */
async function reOpen(
  request: IReOpenRequestReq,
): Promise<CustomerOpenShopAddResponse> {
  let result = await sdk.post<CustomerOpenShopAddResponse>(
    '/customer/open/shop/reOpen',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  open,

  getCustomerDetailForOpenShop,

  getCustomerOpenShopById,

  hasStore,

  isContact,

  isEmployee,

  preview,

  protocolSetting,

  reOpen,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopAddRequest".
 */
export interface CustomerOpenShopAddRequest {
  /**
   * 详细地址
   */
  addressDetail: string;
  /**
   * 区
   */
  areaId: number;
  /**
   * 营业执照图片
   */
  businessLicenseImages?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 市
   */
  cityId: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型，1员工，2医生，3护士，4药师，5营养师，6机构
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
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 资质证件图片
   */
  proCertificationImages?: string[];
  /**
   * 省
   */
  provinceId: number;
  /**
   * 姓名
   */
  realName: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 店铺名称
   */
  shopName: string;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerOpenShopAddResponse»".
 */
export interface BaseResponseCustomerOpenShopAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerOpenShopAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerOpenShopAddResponse {
  customerOpenShopVO?: CustomerOpenShopVO;
  [k: string]: any;
}
/**
 * 已新增的开店审核信息
 */
export interface CustomerOpenShopVO {
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 营业执照
   */
  businessImageList?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 认证状态
   */
  certification?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 姓名
   */
  contactName?: string;
  /**
   * 手机号
   */
  contactPhone?: string;
  /**
   * 注册时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详情id
   */
  customerDetailId?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 等级
   */
  customerLevel?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 删除标识， 0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  distance?: number;
  headUrl?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型 1：员工2：医生3：护士4：药师5：营养师6：机构
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
   * 不参与奖励原因
   */
  noParticipateRewardReason?: string;
  /**
   * 驳回原因
   */
  openShopRejectReason?: string;
  /**
   * 审核时间
   */
  openShopReviewTime?: string;
  /**
   * 申请开店时间
   */
  openShopTime?: string;
  ownershipGroup?: number;
  /**
   * 上级微店主ID
   */
  parentId?: string;
  /**
   * 父级Name
   */
  parentName?: string;
  /**
   * 上级微店主推荐码
   */
  parentRecommendationCode?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 资质证件
   */
  qualificationCertificate?: string[];
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 注册渠道:1：app,2:pc,3:h5,4:小程序
   */
  registChanel?: number;
  /**
   * 审核状态 0 未审核 1 已驳回 2 已通过
   */
  reviewStatus?: number;
  /**
   * 店铺名称
   */
  shopName?: string;
  /**
   * 微店主编号
   */
  shopNumber?: string;
  /**
   * 微店排序编号
   */
  shopSort?: number;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 顶级ID
   */
  topId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopAddResponse".
 */
export interface CustomerOpenShopAddResponse1 {
  customerOpenShopVO?: CustomerOpenShopVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopVO".
 */
export interface CustomerOpenShopVO1 {
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 营业执照
   */
  businessImageList?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 认证状态
   */
  certification?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 姓名
   */
  contactName?: string;
  /**
   * 手机号
   */
  contactPhone?: string;
  /**
   * 注册时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详情id
   */
  customerDetailId?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 等级
   */
  customerLevel?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 删除标识， 0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  distance?: number;
  headUrl?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型 1：员工2：医生3：护士4：药师5：营养师6：机构
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
   * 不参与奖励原因
   */
  noParticipateRewardReason?: string;
  /**
   * 驳回原因
   */
  openShopRejectReason?: string;
  /**
   * 审核时间
   */
  openShopReviewTime?: string;
  /**
   * 申请开店时间
   */
  openShopTime?: string;
  ownershipGroup?: number;
  /**
   * 上级微店主ID
   */
  parentId?: string;
  /**
   * 父级Name
   */
  parentName?: string;
  /**
   * 上级微店主推荐码
   */
  parentRecommendationCode?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 资质证件
   */
  qualificationCertificate?: string[];
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 注册渠道:1：app,2:pc,3:h5,4:小程序
   */
  registChanel?: number;
  /**
   * 审核状态 0 未审核 1 已驳回 2 已通过
   */
  reviewStatus?: number;
  /**
   * 店铺名称
   */
  shopName?: string;
  /**
   * 微店主编号
   */
  shopNumber?: string;
  /**
   * 微店排序编号
   */
  shopSort?: number;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 顶级ID
   */
  topId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDetailForOpenShopResponse»".
 */
export interface BaseResponseCustomerDetailForOpenShopResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDetailForOpenShopResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerDetailForOpenShopResponse {
  customerDetailForOpenShopVO?: CustomerDetailForOpenShopVO;
  [k: string]: any;
}
/**
 * 会员信息
 */
export interface CustomerDetailForOpenShopVO {
  /**
   * 联系人姓名
   */
  contactName?: string;
  /**
   * 联系人电话
   */
  contactPhone?: string;
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
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
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
   * 若是员工，当前员工归属的合伙商、合资公司的联系人是否已开店 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  openedShop?: 0 | 1;
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
   * 若是员工，当前员工归属的合伙商、合资公司的联系人已开店的推荐码
   */
  recommendationCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailForOpenShopResponse".
 */
export interface CustomerDetailForOpenShopResponse1 {
  customerDetailForOpenShopVO?: CustomerDetailForOpenShopVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailForOpenShopVO".
 */
export interface CustomerDetailForOpenShopVO1 {
  /**
   * 联系人姓名
   */
  contactName?: string;
  /**
   * 联系人电话
   */
  contactPhone?: string;
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
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
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
   * 若是员工，当前员工归属的合伙商、合资公司的联系人是否已开店 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  openedShop?: 0 | 1;
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
   * 若是员工，当前员工归属的合伙商、合资公司的联系人已开店的推荐码
   */
  recommendationCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerOpenShopByIdResponse»".
 */
export interface BaseResponseCustomerOpenShopByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerOpenShopByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerOpenShopByIdResponse {
  customerOpenShopVO?: CustomerOpenShopVO2;
  [k: string]: any;
}
/**
 * 开店审核信息
 */
export interface CustomerOpenShopVO2 {
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 营业执照
   */
  businessImageList?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 认证状态
   */
  certification?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 姓名
   */
  contactName?: string;
  /**
   * 手机号
   */
  contactPhone?: string;
  /**
   * 注册时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详情id
   */
  customerDetailId?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 等级
   */
  customerLevel?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 删除标识， 0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  distance?: number;
  headUrl?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型 1：员工2：医生3：护士4：药师5：营养师6：机构
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
   * 不参与奖励原因
   */
  noParticipateRewardReason?: string;
  /**
   * 驳回原因
   */
  openShopRejectReason?: string;
  /**
   * 审核时间
   */
  openShopReviewTime?: string;
  /**
   * 申请开店时间
   */
  openShopTime?: string;
  ownershipGroup?: number;
  /**
   * 上级微店主ID
   */
  parentId?: string;
  /**
   * 父级Name
   */
  parentName?: string;
  /**
   * 上级微店主推荐码
   */
  parentRecommendationCode?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 资质证件
   */
  qualificationCertificate?: string[];
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 注册渠道:1：app,2:pc,3:h5,4:小程序
   */
  registChanel?: number;
  /**
   * 审核状态 0 未审核 1 已驳回 2 已通过
   */
  reviewStatus?: number;
  /**
   * 店铺名称
   */
  shopName?: string;
  /**
   * 微店主编号
   */
  shopNumber?: string;
  /**
   * 微店排序编号
   */
  shopSort?: number;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 顶级ID
   */
  topId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopByIdResponse".
 */
export interface CustomerOpenShopByIdResponse1 {
  customerOpenShopVO?: CustomerOpenShopVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerOpenShopBoolenResponse»".
 */
export interface BaseResponseCustomerOpenShopBoolenResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerOpenShopBoolenResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerOpenShopBoolenResponse {
  /**
   * 0否，1是
   */
  boolFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopBoolenResponse".
 */
export interface CustomerOpenShopBoolenResponse1 {
  /**
   * 0否，1是
   */
  boolFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ProtocolSettingByIdResponse»".
 */
export interface BaseResponseProtocolSettingByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ProtocolSettingByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ProtocolSettingByIdResponse {
  protocolSettingVO?: ProtocolSettingVO;
  [k: string]: any;
}
/**
 * 系统日志信息
 */
export interface ProtocolSettingVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 1-启用 0-禁用
   */
  disableStatus?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 协议内容
   */
  protocolContent?: string;
  /**
   * 协议标题
   */
  protocolTitle?: string;
  /**
   * 1-注册、2-隐私、3-开店、4-报货、5-地推、6-注销、7-提现
   */
  protocolType?: number;
  /**
   * 1-注册、2-隐私、3-开店、4-报货、5-地推、6-注销、7-提现
   */
  protocolTypeValue?: string;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ProtocolSettingByIdResponse".
 */
export interface ProtocolSettingByIdResponse1 {
  protocolSettingVO?: ProtocolSettingVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ProtocolSettingVO".
 */
export interface ProtocolSettingVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 1-启用 0-禁用
   */
  disableStatus?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 协议内容
   */
  protocolContent?: string;
  /**
   * 协议标题
   */
  protocolTitle?: string;
  /**
   * 1-注册、2-隐私、3-开店、4-报货、5-地推、6-注销、7-提现
   */
  protocolType?: number;
  /**
   * 1-注册、2-隐私、3-开店、4-报货、5-地推、6-注销、7-提现
   */
  protocolTypeValue?: string;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerOpenShopReAddRequest".
 */
export interface CustomerOpenShopReAddRequest {
  /**
   * 详细地址
   */
  addressDetail: string;
  /**
   * 区
   */
  areaId: number;
  /**
   * 营业执照图片
   */
  businessLicenseImages?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 市
   */
  cityId: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  /**
   * 主键
   */
  id: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型，1员工，2医生，3护士，4药师，5营养师，6机构
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
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 资质证件图片
   */
  proCertificationImages?: string[];
  /**
   * 省
   */
  provinceId: number;
  /**
   * 姓名
   */
  realName: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 店铺名称
   */
  shopName: string;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IOpenRequestReq".
 */
export interface IOpenRequestReq {
  /**
   * 详细地址
   */
  addressDetail: string;
  /**
   * 区
   */
  areaId: number;
  /**
   * 营业执照图片
   */
  businessLicenseImages?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 市
   */
  cityId: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型，1员工，2医生，3护士，4药师，5营养师，6机构
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
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 资质证件图片
   */
  proCertificationImages?: string[];
  /**
   * 省
   */
  provinceId: number;
  /**
   * 姓名
   */
  realName: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 店铺名称
   */
  shopName: string;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IReOpenRequestReq".
 */
export interface IReOpenRequestReq {
  /**
   * 详细地址
   */
  addressDetail: string;
  /**
   * 区
   */
  areaId: number;
  /**
   * 营业执照图片
   */
  businessLicenseImages?: string[];
  /**
   * 营业执照号
   */
  businessLicenseNo?: string;
  /**
   * 市
   */
  cityId: number;
  /**
   * 机构/公司名称
   */
  companyName?: string;
  /**
   * 配送业务 1两小时达，2上门自提，12两小时达和上门自提都支持
   */
  deliverWay?: string;
  /**
   * 主键
   */
  id: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 微店主类型，1员工，2医生，3护士，4药师，5营养师，6机构
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
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 资质证件图片
   */
  proCertificationImages?: string[];
  /**
   * 省
   */
  provinceId: number;
  /**
   * 姓名
   */
  realName: string;
  /**
   * 推荐码
   */
  recommendationCode?: string;
  /**
   * 店铺名称
   */
  shopName: string;
  /**
   * 微店类型，1个人，2机构，3员工，4联系人
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * NORMAL: 个人
   * * INSTITUTIONS: 机构
   * * EMPLOYEE: 员工
   * * CONTRACT: 联系人
   */
  storeType: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
