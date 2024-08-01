import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ArticleSearchHistoryController';

/**
 *
 * 查询用户相关的搜索记录
 *
 */
async function query(): Promise<SearchHistoryArray> {
  let result = await sdk.get<SearchHistoryArray>(
    '/article/history',

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
    '/article/history',

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
    '/article/history',

    {},
  );
  return result.context;
}

/**
 *
 * 搜索历史合并
 *
 */
async function merge(request: IMergeRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/article/merge/history',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  query,

  add,

  delete_,

  merge,
};

/**
 * 内容
 */
export type SearchHistoryArray = SearchHistory[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SearchHistoryArray".
 */
export type SearchHistoryArray1 = SearchHistory3[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«SearchHistory»»".
 */
export interface BaseResponseListSearchHistory {
  /**
   * 结果码
   */
  code: string;
  context?: SearchHistoryArray;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
export interface SearchHistory {
  /**
   * 搜索关键字
   */
  keyword: string;
  /**
   * 搜索终端
   */
  searchTerminal: string;
  /**
   * 搜索时间
   */
  searchTime: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SearchHistory".
 */
export interface SearchHistory1 {
  /**
   * 搜索关键字
   */
  keyword: string;
  /**
   * 搜索终端
   */
  searchTerminal: string;
  /**
   * 搜索时间
   */
  searchTime: number;
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SearchHistoryMergeRequest".
 */
export interface SearchHistoryMergeRequest {
  /**
   * 前台存储的搜索历史
   */
  searchHistoryList?: SearchHistory2[];
  [k: string]: any;
}
export interface SearchHistory2 {
  /**
   * 搜索关键字
   */
  keyword: string;
  /**
   * 搜索终端
   */
  searchTerminal: string;
  /**
   * 搜索时间
   */
  searchTime: number;
  [k: string]: any;
}
export interface SearchHistory3 {
  /**
   * 搜索关键字
   */
  keyword: string;
  /**
   * 搜索终端
   */
  searchTerminal: string;
  /**
   * 搜索时间
   */
  searchTime: number;
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
 * via the `definition` "IMergeRequestReq".
 */
export interface IMergeRequestReq {
  /**
   * 前台存储的搜索历史
   */
  searchHistoryList?: SearchHistory2[];
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
