import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreHistoryBaseController';

/**
 *
 * 查询用户相关的搜索记录
 *
 */
async function query(): Promise<any> {
  let result = await sdk.get<any>(
    '/store/history',

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
    '/store/history',

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
    '/store/history',

    {},
  );
  return result.context;
}

export default {
  query,

  add,

  delete_,
};

/**
 * 内容
 */
export type Any = string[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "any".
 */
export type Any1 = string[];

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
  context?: Any;
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

//create by moon https://github.com/creasy2010/moon
