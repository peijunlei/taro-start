import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SearchHistoryBaseController';

/**
 *
 * 查询分销推广商品的历史记录
 *
 */
async function queryDistributeGoodsHistory(): Promise<any> {
  let result = await sdk.get<any>(
    '/goods/distribute-goods/history',

    {},
  );
  return result.context;
}

/**
 *
 * 新增分销推广商品的历史记录
 *
 */
async function addDistributeGoodsHistory(request: IAddDistributeGoodsHistoryRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goods/distribute-goods/history',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清空分销推广商品的历史记录
 *
 */
async function clearDistributeGoodsHistory_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/goods/distribute-goods/history',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销员选品商品的历史记录
 *
 */
async function queryDistribute(): Promise<any> {
  let result = await sdk.get<any>(
    '/goods/distribute/history',

    {},
  );
  return result.context;
}

/**
 *
 * 新增分销员选品商品的历史记录
 *
 */
async function addDistribute(request: IAddDistributeRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goods/distribute/history',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清空分销员选品商品的历史记录
 *
 */
async function deleteDistribute_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/goods/distribute/history',

    {},
  );
  return result.context;
}

/**
 *
 * 查询拼团活动商品的历史记录
 *
 */
async function queryGrouponHistory(): Promise<any> {
  let result = await sdk.get<any>(
    '/goods/groupon/history',

    {},
  );
  return result.context;
}

/**
 *
 * 新增拼团活动商品的历史记录
 *
 */
async function addGrouponHistory(request: IAddGrouponHistoryRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goods/groupon/history',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清空拼团活动商品的历史记录
 *
 */
async function deleteGrouponHistory_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/goods/groupon/history',

    {},
  );
  return result.context;
}

/**
 *
 * 查询用户相关的搜索记录
 *
 */
async function query(): Promise<any> {
  let result = await sdk.get<any>(
    '/goods/history',

    {},
  );
  return result.context;
}

/**
 *
 * 新增用户相关的搜索记录
 *
 */
async function add(request: IAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goods/history',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清空用户相关的搜索记录
 *
 */
async function delete_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/goods/history',

    {},
  );
  return result.context;
}

/**
 *
 * 查询指定店铺内商品的历史记录
 *
 */
async function queryStore(id: IQueryStoreIdReq): Promise<any> {
  let result = await sdk.get<any>(
    '/goods/store/history/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 新增指定店铺内商品的历史记录
 *
 */
async function addStore(id: IAddStoreIdReq, request: IAddStoreRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goods/store/history/{id}'.replace('{id}', id + ''),

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 清空指定店铺内商品的历史记录
 *
 */
async function deleteStore_(id: IDeleteStore_IdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/goods/store/history/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  queryDistributeGoodsHistory,

  addDistributeGoodsHistory,

  clearDistributeGoodsHistory_,

  queryDistribute,

  addDistribute,

  deleteDistribute_,

  queryGrouponHistory,

  addGrouponHistory,

  deleteGrouponHistory_,

  query,

  add,

  delete_,

  queryStore,

  addStore,

  deleteStore_,
};

/**
 * 内容
 */
export type UndefinedArray = string[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefinedArray".
 */
export type UndefinedArray1 = string[];
/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreIdReq".
 */
export type IQueryStoreIdReq = number;
/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddStoreIdReq".
 */
export type IAddStoreIdReq = number;
/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteStore_IdReq".
 */
export type IDeleteStore_IdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«string»»".
 */
export interface BaseResponseListString {
  /**
   * 结果码
   */
  code: string;
  context?: UndefinedArray;
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
 * via the `definition` "SearchHistoryRequest".
 */
export interface SearchHistoryRequest {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
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
 * via the `definition` "IAddDistributeGoodsHistoryRequestReq".
 */
export interface IAddDistributeGoodsHistoryRequestReq {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddDistributeRequestReq".
 */
export interface IAddDistributeRequestReq {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddGrouponHistoryRequestReq".
 */
export interface IAddGrouponHistoryRequestReq {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddRequestReq".
 */
export interface IAddRequestReq {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddStoreRequestReq".
 */
export interface IAddStoreRequestReq {
  /**
   * 搜索历史关键字
   */
  keyword?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
