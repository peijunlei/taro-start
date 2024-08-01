import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'group-cate-search-controller';

/**
 *
 * 友群搜索
 *
 */
async function page(request: IPageRequestReq): Promise<EsGroupCateResponse> {
  let result = await sdk.post<EsGroupCateResponse>(
    '/group/cate/search/page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  page,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGroupCateQueryRequest".
 */
export interface EsGroupCateQueryRequest {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 友群简介
   */
  groupCateDesc?: string;
  /**
   * groupCateId
   */
  groupCateId?: string;
  /**
   * 批量查询-groupCateIdList
   */
  groupCateIdList?: string[];
  /**
   * 友群名称
   */
  groupCateName?: string;
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序字段
   */
  sortFlag?: string;
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
  /**
   * 排序参数
   */
  sorts?: SortBuilder[];
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface AggregationBuilder {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
export interface SortBuilder {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AggregationBuilder".
 */
export interface AggregationBuilder1 {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SortBuilder".
 */
export interface SortBuilder1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EsGroupCateResponse»".
 */
export interface BaseResponseEsGroupCateResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EsGroupCateResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EsGroupCateResponse {
  /**
   * 会员关注关系表列表结果
   */
  customerFollowRelaVOList?: CustomerFollowRelaVO[];
  esGroupCatePage?: PageEsGroupCate;
  [k: string]: any;
}
export interface CustomerFollowRelaVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 关注类型 0友群、1友粉
   * * FOLLOWGROUP: 0：友群
   * * FOLLOWFRIEND: 1：友粉
   */
  followType?: 0 | 1;
  /**
   * 关联业务主键（友群分类id、会员id(友粉)）
   */
  refId?: string;
  [k: string]: any;
}
/**
 * CMS 友群返回页面
 */
export interface PageEsGroupCate {
  content?: EsGroupCate[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface EsGroupCate {
  articleNum?: number;
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  funNum?: number;
  groupCateDesc?: string;
  groupCateIcon?: string;
  groupCateId?: string;
  groupCateImage?: string;
  groupCateName?: string;
  groupCateSearchAuxNest?: GroupCateSearchAuxNest;
  id?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface GroupCateSearchAuxNest {
  groupCateDesc?: string;
  groupCateNameIk?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGroupCateResponse".
 */
export interface EsGroupCateResponse1 {
  /**
   * 会员关注关系表列表结果
   */
  customerFollowRelaVOList?: CustomerFollowRelaVO[];
  esGroupCatePage?: PageEsGroupCate;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFollowRelaVO".
 */
export interface CustomerFollowRelaVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 关注类型 0友群、1友粉
   * * FOLLOWGROUP: 0：友群
   * * FOLLOWFRIEND: 1：友粉
   */
  followType?: 0 | 1;
  /**
   * 关联业务主键（友群分类id、会员id(友粉)）
   */
  refId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«EsGroupCate»".
 */
export interface PageEsGroupCate1 {
  content?: EsGroupCate[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGroupCate".
 */
export interface EsGroupCate1 {
  articleNum?: number;
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  funNum?: number;
  groupCateDesc?: string;
  groupCateIcon?: string;
  groupCateId?: string;
  groupCateImage?: string;
  groupCateName?: string;
  groupCateSearchAuxNest?: GroupCateSearchAuxNest;
  id?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateSearchAuxNest".
 */
export interface GroupCateSearchAuxNest1 {
  groupCateDesc?: string;
  groupCateNameIk?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 友群简介
   */
  groupCateDesc?: string;
  /**
   * groupCateId
   */
  groupCateId?: string;
  /**
   * 批量查询-groupCateIdList
   */
  groupCateIdList?: string[];
  /**
   * 友群名称
   */
  groupCateName?: string;
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序字段
   */
  sortFlag?: string;
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
  /**
   * 排序参数
   */
  sorts?: SortBuilder[];
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
