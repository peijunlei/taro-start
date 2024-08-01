import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerDeliveryAddressBaseController';

/**
 *
 * 保存客户收货地址
 *
 */
async function saveAddress(editRequest: ISaveAddressEditRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/address',

    {
      ...editRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据地址id查询客户收货地址详情
 *
 */
async function findById(addressId: IFindByIdAddressIdReq): Promise<CustomerDeliveryAddressByIdResponse> {
  let result = await sdk.get<CustomerDeliveryAddressByIdResponse>(
    '/customer/address/{addressId}'.replace('{addressId}', addressId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 修改客户收货地址
 *
 */
async function updateAddress(editRequest: IUpdateAddressEditRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/customer/addressInfo',

    {
      ...editRequest,
    },
  );
  return result.context;
}

/**
 *
 * 删除客户收货地址
 *
 */
async function deleteAddress_(addressId: IDeleteAddress_AddressIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/addressInfo/{addressId}'.replace('{addressId}', addressId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询该客户的所有收货地址
 *
 */
export async function findAddressList(): Promise<CustomerDeliveryAddressVOArray> {
  let result = await sdk.get<CustomerDeliveryAddressVOArray>(
    '/customer/addressList',

    {},
  );
  return result.context;
}

/**
 *
 * 查询客户默认收货地址
 *
 */
async function findDefaultAddress(): Promise<CustomerDeliveryAddressResponse> {
  let result = await sdk.get<CustomerDeliveryAddressResponse>(
    '/customer/addressinfo',

    {},
  );
  return result.context;
}

/**
 *
 * 设置客户收货地址为默认
 *
 */
async function setDefaultAddress(deliveryAddressId: ISetDefaultAddressDeliveryAddressIdReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/defaultAddress/{deliveryAddressId}'.replace('{deliveryAddressId}', deliveryAddressId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 新增客户财务邮箱
 *
 */
async function addCouponCate(request: IAddCouponCateRequestReq): Promise<CustomerEmailAddResponse> {
  let result = await sdk.post<CustomerEmailAddResponse>(
    '/customer/email',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 修改客户财务邮箱
 *
 */
async function modifyCouponCate(request: IModifyCouponCateRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/customer/email',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 银联企业支付通知财务
 *
 */
async function sendEmailToFinance(orderId: ISendEmailToFinanceOrderIdReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/email/sendToFinance/{orderId}'.replace('{orderId}', orderId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据客户邮箱ID删除财务邮箱
 *
 */
async function deleteCustomerEmailByCustomerEmailId_(
  customerEmailId: IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/email/{customerEmailId}'.replace('{customerEmailId}', customerEmailId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据客户ID查询客户的财务邮箱列表
 *
 */
async function listCustomerEmailByCustomerId(): Promise<CustomerEmailVOArray> {
  let result = await sdk.get<CustomerEmailVOArray>(
    '/customer/emailList',

    {},
  );
  return result.context;
}

export default {
  saveAddress,

  findById,

  updateAddress,

  deleteAddress_,

  findAddressList,

  findDefaultAddress,

  setDefaultAddress,

  addCouponCate,

  modifyCouponCate,

  sendEmailToFinance,

  deleteCustomerEmailByCustomerEmailId_,

  listCustomerEmailByCustomerId,
};

/**
 * 内容
 */
export type CustomerDeliveryAddressVOArray = CustomerDeliveryAddressVO[];
/**
 * 内容
 */
export type CustomerEmailVOArray = CustomerEmailVO[];
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdAddressIdReq".
 */
export type IFindByIdAddressIdReq = string;
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteAddress_AddressIdReq".
 */
export type IDeleteAddress_AddressIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressVOArray".
 */
export type CustomerDeliveryAddressVOArray1 = CustomerDeliveryAddressVO2[];
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISetDefaultAddressDeliveryAddressIdReq".
 */
export type ISetDefaultAddressDeliveryAddressIdReq = string;
/**
 * 订单id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendEmailToFinanceOrderIdReq".
 */
export type ISendEmailToFinanceOrderIdReq = string;
/**
 * 客户邮箱ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq".
 */
export type IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerEmailVOArray".
 */
export type CustomerEmailVOArray1 = CustomerEmailVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressAddRequest".
 */
export interface CustomerDeliveryAddressAddRequest {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "BaseResponse«CustomerDeliveryAddressByIdResponse»".
 */
export interface BaseResponseCustomerDeliveryAddressByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressByIdResponse;
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
export interface CustomerDeliveryAddressByIdResponse {
  houseNum?: string;
  latitude?: number;
  longitude?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 街道
   */
  streetId?: number;
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
 * via the `definition` "CustomerDeliveryAddressByIdResponse".
 */
export interface CustomerDeliveryAddressByIdResponse1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressModifyRequest".
 */
export interface CustomerDeliveryAddressModifyRequest {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CustomerDeliveryAddressVO»»".
 */
export interface BaseResponseListCustomerDeliveryAddressVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressVOArray;
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
export interface CustomerDeliveryAddressVO {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 经度
   */
  longitude?: number;
  /**
   * 纬度
   */
  latitude?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressVO".
 */
export interface CustomerDeliveryAddressVO1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "BaseResponse«CustomerDeliveryAddressResponse»".
 */
export interface BaseResponseCustomerDeliveryAddressResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressResponse;
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
export interface CustomerDeliveryAddressResponse {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressResponse".
 */
export interface CustomerDeliveryAddressResponse1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerEmailAddRequest".
 */
export interface CustomerEmailAddRequest {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerEmailAddResponse»".
 */
export interface BaseResponseCustomerEmailAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerEmailAddResponse;
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
export interface CustomerEmailAddResponse {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailAddResponse".
 */
export interface CustomerEmailAddResponse1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailModifyRequest".
 */
export interface CustomerEmailModifyRequest {
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CustomerEmailVO»»".
 */
export interface BaseResponseListCustomerEmailVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerEmailVOArray;
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
export interface CustomerEmailVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailVO".
 */
export interface CustomerEmailVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "ISaveAddressEditRequestReq".
 */
export interface ISaveAddressEditRequestReq {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 街道
   */
  streetId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateAddressEditRequestReq".
 */
export interface IUpdateAddressEditRequestReq {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  houseNum?:string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 街道
   */
  streetId?: number;
  [k: string]: any;
}
export interface CustomerDeliveryAddressVO2 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "IAddCouponCateRequestReq".
 */
export interface IAddCouponCateRequestReq {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyCouponCateRequestReq".
 */
export interface IModifyCouponCateRequestReq {
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface CustomerEmailVO2 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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

//create by moon https://github.com/creasy2010/moon
