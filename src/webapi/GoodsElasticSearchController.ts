import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsElasticSearchController';

/**
 *
 * 生成CMS内容Es数据
 *
 */
async function initArticleInfoToEs(): Promise<unknown> {
  let result = await sdk.get(
    '/index/articleInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 查询CMS内容Es文档
 *
 */
async function queryArticleInfo(): Promise<unknown> {
  let result = await sdk.post(
    '/index/articleInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 更新CMS内容Es文档
 *
 */
async function modifyArticleInfo(): Promise<unknown> {
  let result = await sdk.put(
    '/index/articleInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 生成CMS内容Es数据
 *
 */
async function deleteArticleInfo_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/index/articleInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 生成商品的Es数据
 *
 */
async function initGoodsInfoToEs(): Promise<unknown> {
  let result = await sdk.get(
    '/index/goods',

    {},
  );
  return result.context;
}

/**
 *
 * 生成CMS友群Es数据
 *
 */
async function initGroupToEs(): Promise<unknown> {
  let result = await sdk.get(
    '/index/group',

    {},
  );
  return result.context;
}

/**
 *
 * 查询CMS内容Es文档
 *
 */
async function queryGroup(): Promise<unknown> {
  let result = await sdk.post(
    '/index/group',

    {},
  );
  return result.context;
}

/**
 *
 * 更新CMS内容Es文档
 *
 */
async function modifyGroup(): Promise<unknown> {
  let result = await sdk.put(
    '/index/group',

    {},
  );
  return result.context;
}

/**
 *
 * 删除CMS友群Es数据
 *
 */
async function deleteGroup_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/index/group',

    {},
  );
  return result.context;
}

export default {
  initArticleInfoToEs,

  queryArticleInfo,

  modifyArticleInfo,

  deleteArticleInfo_,

  initGoodsInfoToEs,

  initGroupToEs,

  queryGroup,

  modifyGroup,

  deleteGroup_,
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
