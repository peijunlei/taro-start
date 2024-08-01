import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreLevelBaseController';

/**
 *
 * 客户该店铺等级信息
 *
 */
async function queryStoreCustomerLevel(
  storeId: IQueryStoreCustomerLevelStoreIdReq,
): Promise<StoreLevelByCustomerIdAndStoreIdResponse> {
  let result = await sdk.get<StoreLevelByCustomerIdAndStoreIdResponse>(
    '/store/customer/level/{storeId}'.replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询店铺等级信息
 *
 */
async function queryStoreLevelList(storeId: IQueryStoreLevelListStoreIdReq): Promise<StoreLevelListResponse> {
  let result = await sdk.get<StoreLevelListResponse>(
    '/store/level/list/{storeId}'.replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

export default {
  queryStoreCustomerLevel,

  queryStoreLevelList,
};

/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreCustomerLevelStoreIdReq".
 */
export type IQueryStoreCustomerLevelStoreIdReq = number;
/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreLevelListStoreIdReq".
 */
export type IQueryStoreLevelListStoreIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreLevelByCustomerIdAndStoreIdResponse»".
 */
export interface BaseResponseStoreLevelByCustomerIdAndStoreIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreLevelByCustomerIdAndStoreIdResponse;
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
export interface StoreLevelByCustomerIdAndStoreIdResponse {
  customerName?: string;
  storeLevelVO?: StoreLevelVO;
  totalAmount?: number;
  totalOrder?: number;
  [k: string]: any;
}
export interface StoreLevelVO {
  amountConditions?: number;
  createPerson?: string;
  createTime?: string;
  delFlag?: number;
  deletePerson?: string;
  deleteTime?: string;
  discountRate?: number;
  levelName?: string;
  orderConditions?: number;
  storeId?: number;
  storeLevelId?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreLevelByCustomerIdAndStoreIdResponse".
 */
export interface StoreLevelByCustomerIdAndStoreIdResponse1 {
  customerName?: string;
  storeLevelVO?: StoreLevelVO;
  totalAmount?: number;
  totalOrder?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreLevelVO".
 */
export interface StoreLevelVO1 {
  amountConditions?: number;
  createPerson?: string;
  createTime?: string;
  delFlag?: number;
  deletePerson?: string;
  deleteTime?: string;
  discountRate?: number;
  levelName?: string;
  orderConditions?: number;
  storeId?: number;
  storeLevelId?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreLevelListResponse»".
 */
export interface BaseResponseStoreLevelListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreLevelListResponse;
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
export interface StoreLevelListResponse {
  storeLevelVOList?: StoreLevelVO2[];
  [k: string]: any;
}
export interface StoreLevelVO2 {
  amountConditions?: number;
  createPerson?: string;
  createTime?: string;
  delFlag?: number;
  deletePerson?: string;
  deleteTime?: string;
  discountRate?: number;
  levelName?: string;
  orderConditions?: number;
  storeId?: number;
  storeLevelId?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreLevelListResponse".
 */
export interface StoreLevelListResponse1 {
  storeLevelVOList?: StoreLevelVO2[];
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
