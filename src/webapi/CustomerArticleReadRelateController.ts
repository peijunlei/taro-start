import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerArticleReadRelateController';

/**
 *
 * 获取未读的数量
 *
 */
async function countUnRead(): Promise<CustomerArticleReadRelateCountResponse> {
  let result = await sdk.get<CustomerArticleReadRelateCountResponse>(
    '/customerarticlereadrelate/count-un-read',

    {},
  );
  return result.context;
}

/**
 *
 * 删除文章读取关联
 *
 */
async function deleteByAttentionCustomerId_(): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customerarticlereadrelate/delete-by-attentio-customer-id',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询文章读取关联
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CustomerArticleReadRelateListResponse> {
  let result = await sdk.post<CustomerArticleReadRelateListResponse>(
    '/customerarticlereadrelate/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

export default {
  countUnRead,

  deleteByAttentionCustomerId_,

  getList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerArticleReadRelateCountResponse»".
 */
export interface BaseResponseCustomerArticleReadRelateCountResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleReadRelateCountResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleReadRelateCountResponse {
  /**
   * 文章读取关联信息
   */
  count?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReadRelateCountResponse".
 */
export interface CustomerArticleReadRelateCountResponse1 {
  /**
   * 文章读取关联信息
   */
  count?: number;
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
 * via the `definition` "CustomerArticleReadRelateListRequest".
 */
export interface CustomerArticleReadRelateListRequest {
  /**
   * 文章Id
   */
  articleInfoId?: string;
  /**
   * 关注人id
   */
  attentionCustomerId?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 发帖人Id
   */
  postCustomerId?: string;
  /**
   * 主键Id
   */
  readRelateId?: string;
  /**
   * 批量查询-主键IdList
   */
  readRelateIdList?: string[];
  /**
   * 0:未读，1:已读
   * * NO: 否
   * * YES: 是
   */
  readStatus?: 0 | 1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerArticleReadRelateListResponse»".
 */
export interface BaseResponseCustomerArticleReadRelateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleReadRelateListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleReadRelateListResponse {
  /**
   * 文章读取关联列表结果
   */
  customerArticleReadRelateVOList?: CustomerArticleReadRelateVO[];
  [k: string]: any;
}
export interface CustomerArticleReadRelateVO {
  /**
   * 文章Id
   */
  articleInfoId?: string;
  /**
   * 关注人id
   */
  attentionCustomerId?: string;
  /**
   * 发帖人Id
   */
  postCustomerId?: string;
  /**
   * 主键Id
   */
  readRelateId?: string;
  /**
   * 0:未读，1:已读
   * * NO: 否
   * * YES: 是
   */
  readStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReadRelateListResponse".
 */
export interface CustomerArticleReadRelateListResponse1 {
  /**
   * 文章读取关联列表结果
   */
  customerArticleReadRelateVOList?: CustomerArticleReadRelateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReadRelateVO".
 */
export interface CustomerArticleReadRelateVO1 {
  /**
   * 文章Id
   */
  articleInfoId?: string;
  /**
   * 关注人id
   */
  attentionCustomerId?: string;
  /**
   * 发帖人Id
   */
  postCustomerId?: string;
  /**
   * 主键Id
   */
  readRelateId?: string;
  /**
   * 0:未读，1:已读
   * * NO: 否
   * * YES: 是
   */
  readStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 文章Id
   */
  articleInfoId?: string;
  /**
   * 关注人id
   */
  attentionCustomerId?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 发帖人Id
   */
  postCustomerId?: string;
  /**
   * 主键Id
   */
  readRelateId?: string;
  /**
   * 批量查询-主键IdList
   */
  readRelateIdList?: string[];
  /**
   * 0:未读，1:已读
   * * NO: 否
   * * YES: 是
   */
  readStatus?: 0 | 1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
