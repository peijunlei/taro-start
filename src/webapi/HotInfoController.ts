import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'HotInfoController';

/**
 *
 * 获取热门分类列表
 *
 */
async function getHotCateList(): Promise<unknown> {
  let result = await sdk.get(
    '/hot/cate/list',

    {},
  );
  return result.context;
}

/**
 *
 * 获取热门搜索列表
 *
 */
async function getHotSearchList(): Promise<unknown> {
  let result = await sdk.get(
    '/hot/search/list',

    {},
  );
  return result.context;
}

export default {
  getHotCateList,

  getHotSearchList,
};

export interface IgnoreType {
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

//create by moon https://github.com/creasy2010/moon
