import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ClinicStoreController';

/**
 *
 * 根据机构联系人的手机号码查询机构信息
 *
 */
async function queryClinicStoreByContactMobile(
  request: IQueryClinicStoreByContactMobileRequestReq,
): Promise<ClinicStoreByIdResponse> {
  let result = await sdk.post<ClinicStoreByIdResponse>(
    '/clinicstore/getInfoByMobile',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 根据机构联系人的手机号码查询机构信息
 *
 */
async function sendMessageToEmployee(): Promise<unknown> {
  let result = await sdk.post(
    '/clinicstore/sendMessageToEmployee',

    {},
  );
  return result.context;
}

export default {
  queryClinicStoreByContactMobile,

  sendMessageToEmployee,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ClinicStoreContactMobileRequest".
 */
export interface ClinicStoreContactMobileRequest {
  /**
   * 机构联系人员的手机号
   */
  mobile?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ClinicStoreByIdResponse»".
 */
export interface BaseResponseClinicStoreByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ClinicStoreByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ClinicStoreByIdResponse {
  clinicStoreVO?: ClinicStoreVO;
  [k: string]: any;
}
/**
 * 机构信息
 */
export interface ClinicStoreVO {
  /**
   * 机构审核状态 (-1 初始化值) 0 待审核 1 审核通过 2 审核驳回  关联StoreAuditStatus
   */
  auditStatus?: number;
  /**
   * 百度的经度
   */
  baiduLat?: string;
  /**
   * 百度的纬度
   */
  baiduLng?: string;
  /**
   * 市
   */
  city?: string;
  /**
   * 市code
   */
  cityCode?: string;
  /**
   * 报货时绑定供应商id
   */
  companyInfoId?: number;
  /**
   * 报货时绑定供应商id
   */
  companyInfoName?: string;
  /**
   * 区
   */
  district?: string;
  /**
   * 区县的code
   */
  districtCode?: string;
  /**
   * 门店开店状态 0 开店 1 闭店
   * * OPEN: 开店
   * * CLOSE: 闭店
   */
  frozenState?: 0 | 1;
  /**
   * 店铺在高德里的编号
   */
  poiId?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省code
   */
  provinceCode?: string;
  /**
   * 地推联系人姓名
   */
  pushContactName?: string;
  /**
   * 地推联系人电话
   */
  pushContactTel?: string;
  /**
   * 审核驳回说明
   */
  remark?: string;
  signInfo?: SignInfoVO;
  /**
   * 签约状态,0:未签约1:已签约
   * * NOSIGN: 未签约
   * * SINGED: 已签约
   */
  status?: 0 | 1;
  /**
   * 店铺详细地址
   */
  storeAddress?: string;
  /**
   * 增值发票信息
   */
  storeAppreciations?: StoreAppreciationVO[];
  /**
   * 资质集合
   */
  storeCerts?: StoreCertVO[];
  /**
   * 店铺联系人姓名
   */
  storeContactName?: string;
  /**
   * 商铺联系人电话
   */
  storeContactTel?: string;
  /**
   * 门店联系人
   */
  storeContacts?: StoreContactVO[];
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 店铺纬度
   */
  storeLat?: string;
  /**
   * 店铺精度
   */
  storeLng?: string;
  /**
   * 店招图片
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商城开店状态 0 未开店 1 开店
   */
  storeOpeningStatus?: string;
  /**
   * 收获地址
   */
  storeReceipts?: StoreReceiptVO[];
  /**
   * 店铺电话
   */
  storeTel?: string;
  /**
   * 店铺类型
   */
  storeType?: string;
  /**
   * 门店类型id
   */
  storeTypeId?: string;
  /**
   * 门店类型名称
   */
  storeTypeName?: string;
  /**
   * 店铺类型代号
   */
  storeTypeNum?: string;
  /**
   * 拜访记录
   */
  storeVisits?: StoreVisitVO[];
  /**
   * 拜访次数
   */
  visitNumber?: number;
  [k: string]: any;
}
/**
 * 签约信息
 */
export interface SignInfoVO {
  /**
   * 协议号
   */
  agreementNum?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 协议照片
   */
  pictures?: string[];
  /**
   * 签约信息id
   */
  signInfoId?: number;
  /**
   * 签约日期
   */
  signTime?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
export interface StoreAppreciationVO {
  /**
   * 开户银行
   */
  bankName?: string;
  /**
   * 银行账号
   */
  bankNum?: string;
  /**
   * 单位名称
   */
  companyName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 纳税人识别码
   */
  identifier?: string;
  /**
   * 注册地址
   */
  registerAddress?: string;
  /**
   * 注册电话
   */
  registerMobile?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
export interface StoreCertVO {
  /**
   * 证件有效期
   */
  certLimitTime?: string;
  /**
   * 证件名称
   */
  certName?: string;
  /**
   * 证件号码
   */
  certNum?: string;
  /**
   * 证件链接
   */
  certUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 更新者
   */
  updateUser?: string;
  [k: string]: any;
}
export interface StoreContactVO {
  clinicStoreVO?: null;
  /**
   * 联系电话
   */
  contactMobile?: string;
  /**
   * 联系人
   */
  contactPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 更新者
   */
  updateUser?: string;
  [k: string]: any;
}
export interface StoreReceiptVO {
  /**
   * 所在区域
   */
  area?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建人
   */
  createUser?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 收货人
   */
  harvester?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
export interface StoreVisitVO {
  /**
   * 大区id
   */
  areaId?: string;
  /**
   * 大区名称
   */
  areaName?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 所在市
   */
  city?: string;
  /**
   * 联系电话
   */
  contactMobile?: string;
  /**
   * 联系人
   */
  contactPerson?: string;
  /**
   * 机构地址
   */
  customerAddress?: string;
  /**
   * 机构名称
   */
  customerName?: string;
  /**
   * 所在区
   */
  district?: string;
  /**
   * 地推人员id
   */
  employeeInfoId?: string;
  /**
   * 地推联系方式
   */
  employeeMobile?: string;
  /**
   * 地推人员
   */
  employeeName?: string;
  /**
   * 附件
   */
  encloses?: string[];
  /**
   * 拜访是否有效,0:没有1:有
   */
  hasEffect?: number;
  /**
   * 所属办事处
   */
  officeId?: string;
  /**
   * 所在省
   */
  province?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 0初步洽谈1深入沟通2意向签约3成功签约4流失客户5闭店
   */
  status?: number;
  /**
   * 机构审核状态
   */
  storeAuditStatus?: number;
  /**
   * 门店id
   */
  storeId?: string;
  /**
   * 店招
   */
  storeLogo?: string;
  /**
   * 机构签约状态
   */
  storeStatus?: number;
  /**
   * 机构类型id
   */
  storeTypeId?: string;
  /**
   * 机构类型名称
   */
  storeTypeName?: string;
  /**
   * 门店拜访ID
   */
  storeVisitId?: number;
  /**
   * 拜访记录
   */
  visitRecord?: string;
  /**
   * 拜访目的
   */
  visitTarget?: string;
  /**
   * 拜访时间
   */
  visitTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ClinicStoreByIdResponse".
 */
export interface ClinicStoreByIdResponse1 {
  clinicStoreVO?: ClinicStoreVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ClinicStoreVO".
 */
export interface ClinicStoreVO1 {
  /**
   * 机构审核状态 (-1 初始化值) 0 待审核 1 审核通过 2 审核驳回  关联StoreAuditStatus
   */
  auditStatus?: number;
  /**
   * 百度的经度
   */
  baiduLat?: string;
  /**
   * 百度的纬度
   */
  baiduLng?: string;
  /**
   * 市
   */
  city?: string;
  /**
   * 市code
   */
  cityCode?: string;
  /**
   * 报货时绑定供应商id
   */
  companyInfoId?: number;
  /**
   * 报货时绑定供应商id
   */
  companyInfoName?: string;
  /**
   * 区
   */
  district?: string;
  /**
   * 区县的code
   */
  districtCode?: string;
  /**
   * 门店开店状态 0 开店 1 闭店
   * * OPEN: 开店
   * * CLOSE: 闭店
   */
  frozenState?: 0 | 1;
  /**
   * 店铺在高德里的编号
   */
  poiId?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省code
   */
  provinceCode?: string;
  /**
   * 地推联系人姓名
   */
  pushContactName?: string;
  /**
   * 地推联系人电话
   */
  pushContactTel?: string;
  /**
   * 审核驳回说明
   */
  remark?: string;
  signInfo?: SignInfoVO;
  /**
   * 签约状态,0:未签约1:已签约
   * * NOSIGN: 未签约
   * * SINGED: 已签约
   */
  status?: 0 | 1;
  /**
   * 店铺详细地址
   */
  storeAddress?: string;
  /**
   * 增值发票信息
   */
  storeAppreciations?: StoreAppreciationVO[];
  /**
   * 资质集合
   */
  storeCerts?: StoreCertVO[];
  /**
   * 店铺联系人姓名
   */
  storeContactName?: string;
  /**
   * 商铺联系人电话
   */
  storeContactTel?: string;
  /**
   * 门店联系人
   */
  storeContacts?: StoreContactVO[];
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 店铺纬度
   */
  storeLat?: string;
  /**
   * 店铺精度
   */
  storeLng?: string;
  /**
   * 店招图片
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商城开店状态 0 未开店 1 开店
   */
  storeOpeningStatus?: string;
  /**
   * 收获地址
   */
  storeReceipts?: StoreReceiptVO[];
  /**
   * 店铺电话
   */
  storeTel?: string;
  /**
   * 店铺类型
   */
  storeType?: string;
  /**
   * 门店类型id
   */
  storeTypeId?: string;
  /**
   * 门店类型名称
   */
  storeTypeName?: string;
  /**
   * 店铺类型代号
   */
  storeTypeNum?: string;
  /**
   * 拜访记录
   */
  storeVisits?: StoreVisitVO[];
  /**
   * 拜访次数
   */
  visitNumber?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SignInfoVO".
 */
export interface SignInfoVO1 {
  /**
   * 协议号
   */
  agreementNum?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 协议照片
   */
  pictures?: string[];
  /**
   * 签约信息id
   */
  signInfoId?: number;
  /**
   * 签约日期
   */
  signTime?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreAppreciationVO".
 */
export interface StoreAppreciationVO1 {
  /**
   * 开户银行
   */
  bankName?: string;
  /**
   * 银行账号
   */
  bankNum?: string;
  /**
   * 单位名称
   */
  companyName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 纳税人识别码
   */
  identifier?: string;
  /**
   * 注册地址
   */
  registerAddress?: string;
  /**
   * 注册电话
   */
  registerMobile?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCertVO".
 */
export interface StoreCertVO1 {
  /**
   * 证件有效期
   */
  certLimitTime?: string;
  /**
   * 证件名称
   */
  certName?: string;
  /**
   * 证件号码
   */
  certNum?: string;
  /**
   * 证件链接
   */
  certUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 更新者
   */
  updateUser?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreContactVO".
 */
export interface StoreContactVO1 {
  clinicStoreVO?: null;
  /**
   * 联系电话
   */
  contactMobile?: string;
  /**
   * 联系人
   */
  contactPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建者
   */
  createUser?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 自增主键
   */
  id?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 更新者
   */
  updateUser?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreReceiptVO".
 */
export interface StoreReceiptVO1 {
  /**
   * 所在区域
   */
  area?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 创建人
   */
  createUser?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 收货人
   */
  harvester?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 门店id
   */
  storeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreVisitVO".
 */
export interface StoreVisitVO1 {
  /**
   * 大区id
   */
  areaId?: string;
  /**
   * 大区名称
   */
  areaName?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 所在市
   */
  city?: string;
  /**
   * 联系电话
   */
  contactMobile?: string;
  /**
   * 联系人
   */
  contactPerson?: string;
  /**
   * 机构地址
   */
  customerAddress?: string;
  /**
   * 机构名称
   */
  customerName?: string;
  /**
   * 所在区
   */
  district?: string;
  /**
   * 地推人员id
   */
  employeeInfoId?: string;
  /**
   * 地推联系方式
   */
  employeeMobile?: string;
  /**
   * 地推人员
   */
  employeeName?: string;
  /**
   * 附件
   */
  encloses?: string[];
  /**
   * 拜访是否有效,0:没有1:有
   */
  hasEffect?: number;
  /**
   * 所属办事处
   */
  officeId?: string;
  /**
   * 所在省
   */
  province?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 0初步洽谈1深入沟通2意向签约3成功签约4流失客户5闭店
   */
  status?: number;
  /**
   * 机构审核状态
   */
  storeAuditStatus?: number;
  /**
   * 门店id
   */
  storeId?: string;
  /**
   * 店招
   */
  storeLogo?: string;
  /**
   * 机构签约状态
   */
  storeStatus?: number;
  /**
   * 机构类型id
   */
  storeTypeId?: string;
  /**
   * 机构类型名称
   */
  storeTypeName?: string;
  /**
   * 门店拜访ID
   */
  storeVisitId?: number;
  /**
   * 拜访记录
   */
  visitRecord?: string;
  /**
   * 拜访目的
   */
  visitTarget?: string;
  /**
   * 拜访时间
   */
  visitTime?: string;
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
 * via the `definition` "IQueryClinicStoreByContactMobileRequestReq".
 */
export interface IQueryClinicStoreByContactMobileRequestReq {
  /**
   * 机构联系人员的手机号
   */
  mobile?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
