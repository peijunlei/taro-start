import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerAccountBaseController';

/**
 *
 * 保存会员的银行账户信息
 *
 */
async function addCustomerAccount(accountSaveRequest: IAddCustomerAccountAccountSaveRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/account',

    {
      ...accountSaveRequest,
    },
  );
  return result.context;
}

/**
 *
 * 修改会员的银行账户信息
 *
 */
async function editCustomerAccount(accountSaveRequest: IEditCustomerAccountAccountSaveRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/customer/account',

    {
      ...accountSaveRequest,
    },
  );
  return result.context;
}

/**
 *
 * 删除会员的银行账户信息
 *
 */
async function deleteCustomerAccount_(accountId: IDeleteCustomerAccount_AccountIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/account/{accountId}'.replace('{accountId}', accountId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据会员银行账号ID查询银行账户信息
 *
 */
async function findById(customerAccountId: IFindByIdCustomerAccountIdReq): Promise<CustomerAccountOptionalResponse> {
  let result = await sdk.get<CustomerAccountOptionalResponse>(
    '/customer/account/{customerAccountId}'.replace('{customerAccountId}', customerAccountId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据会员ID查询银行账户信息
 *
 */
async function findAll(): Promise<CustomerAccountVOArray> {
  let result = await sdk.get<CustomerAccountVOArray>(
    '/customer/accountList',

    {},
  );
  return result.context;
}

export default {
  addCustomerAccount,

  editCustomerAccount,

  deleteCustomerAccount_,

  findById,

  findAll,
};

/**
 * 内容
 */
export type CustomerAccountVOArray = CustomerAccountVO[];
/**
 * accountId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteCustomerAccount_AccountIdReq".
 */
export type IDeleteCustomerAccount_AccountIdReq = string;
/**
 * 会员银行账户Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdCustomerAccountIdReq".
 */
export type IFindByIdCustomerAccountIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerAccountVOArray".
 */
export type CustomerAccountVOArray1 = CustomerAccountVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerAccountAddRequest".
 */
export interface CustomerAccountAddRequest {
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
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
 * via the `definition` "CustomerAccountModifyByCustomerIdRequest".
 */
export interface CustomerAccountModifyByCustomerIdRequest {
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerAccountOptionalResponse»".
 */
export interface BaseResponseCustomerAccountOptionalResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerAccountOptionalResponse;
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
export interface CustomerAccountOptionalResponse {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
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
 * via the `definition` "CustomerAccountOptionalResponse".
 */
export interface CustomerAccountOptionalResponse1 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
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
 * via the `definition` "BaseResponse«List«CustomerAccountVO»»".
 */
export interface BaseResponseListCustomerAccountVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerAccountVOArray;
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
export interface CustomerAccountVO {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
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
 * via the `definition` "CustomerAccountVO".
 */
export interface CustomerAccountVO1 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
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
 * via the `definition` "IAddCustomerAccountAccountSaveRequestReq".
 */
export interface IAddCustomerAccountAccountSaveRequestReq {
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEditCustomerAccountAccountSaveRequestReq".
 */
export interface IEditCustomerAccountAccountSaveRequestReq {
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  [k: string]: any;
}
export interface CustomerAccountVO2 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
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
