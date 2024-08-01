import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'popular-search-terms-query-controller';

/**
 *
 * 热门搜索词列表查询
 *
 */
async function listPopularSearchTerms(): Promise<PopularSearchTermsListResponse> {
  let result = await sdk.post<PopularSearchTermsListResponse>(
    '/popular_search_terms/list',

    {},
  );
  return result.context;
}

async function addKeywords(keywords): Promise<unknown> {
  let result = await sdk.post('/keywords/add', {
    keywords,
  });
  return result.context;
}

export default {
  listPopularSearchTerms,
  addKeywords,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PopularSearchTermsListResponse»".
 */
export interface BaseResponsePopularSearchTermsListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PopularSearchTermsListResponse;
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
export interface PopularSearchTermsListResponse {
  popularSearchTermsVO?: PopularSearchTermsVO[];
  [k: string]: any;
}
export interface PopularSearchTermsVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
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
   * id
   */
  id?: number;
  /**
   * 热门搜索词
   */
  popularSearchKeyword?: string;
  /**
   * 落地页ID
   */
  relatedLandingPage?: string;
  /**
   * 排序号
   */
  sortNumber?: number;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PopularSearchTermsListResponse".
 */
export interface PopularSearchTermsListResponse1 {
  popularSearchTermsVO?: PopularSearchTermsVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PopularSearchTermsVO".
 */
export interface PopularSearchTermsVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
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
   * id
   */
  id?: number;
  /**
   * 热门搜索词
   */
  popularSearchKeyword?: string;
  /**
   * 落地页ID
   */
  relatedLandingPage?: string;
  /**
   * 排序号
   */
  sortNumber?: number;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
