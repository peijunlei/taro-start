import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ArticleInfoSearchController';

/**
 *
 * 分页查询 内容信息
 *
 */
async function getPage(
  request: IGetPageRequestReq,
): Promise<EsArticleInfoResponse> {
  let result = await sdk.post<EsArticleInfoResponse>(
    '/articleinfo/search/page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getPage,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsArticleInfoQueryRequest".
 */
export interface EsArticleInfoQueryRequest {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
  /**
   * 终端类型
   * * PUSH: 地推
   * * KYW_APP: 康友为APP
   * * KYW_H5: 康友为H5
   * * KYW_PC: 康友为PC商城
   * * KYW_PC_WEB: 康友为PC官网
   * * YKS_APP: 悦康送APP
   * * YKS_H5: 悦康送H5
   * * YKS_PC: 悦康送PC商城
   * * YKS_PC_WEB: 悦康送PC官网
   */
  terminalType?: number;
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
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
 * via the `definition` "BaseResponse«EsArticleInfoResponse»".
 */
export interface BaseResponseEsArticleInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EsArticleInfoResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EsArticleInfoResponse {
  esArticleInfoPage?: PageEsArticleInfo;
  [k: string]: any;
}
/**
 * CMS 内容返回页面
 */
export interface PageEsArticleInfo {
  content?: EsArticleInfo[];
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
export interface EsArticleInfo {
  accurateType?: string;
  articleCoverSource?: string;
  articleDigest?: string;
  articleInfoSearchAuxNest?: ArticleInfoSearchAuxNest;
  articleProperty?: '0' | '1';
  articleRecommendType?: '0' | '1';
  articleSubjectId?: string;
  articleType?: '0' | '1';
  auditPerson?: string;
  auditState?: '0' | '1' | '2';
  auditTime?: string;
  authorType?: '0' | '1';
  browseTotal?: number;
  cateIdList?: string[];
  cateIds?: string;
  channelType?: '0' | '1';
  commentTotal?: number;
  content?: string;
  contentSource?: string;
  contentSourceDuration?: string;
  contentState?: '0' | '1' | '2' | '3';
  contentType?: '0' | '1' | '2';
  coverType?: '0' | '1' | '2';
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  groupCateId?: string;
  headPicture?: string;
  id?: string;
  parentCateIdList?: string[];
  parentCateIds?: string;
  rejectReason?: string;
  releasePerson?: string;
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  shareTotal?: number;
  starTotal?: number;
  strReleaseTime?: string;
  title?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface ArticleInfoSearchAuxNest {
  articleDigestIk?: string;
  titleIk?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsArticleInfoResponse".
 */
export interface EsArticleInfoResponse1 {
  esArticleInfoPage?: PageEsArticleInfo;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«EsArticleInfo»".
 */
export interface PageEsArticleInfo1 {
  content?: EsArticleInfo[];
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
 * via the `definition` "EsArticleInfo".
 */
export interface EsArticleInfo1 {
  accurateType?: string;
  articleCoverSource?: string;
  articleDigest?: string;
  articleInfoSearchAuxNest?: ArticleInfoSearchAuxNest;
  articleProperty?: '0' | '1';
  articleRecommendType?: '0' | '1';
  articleSubjectId?: string;
  articleType?: '0' | '1';
  auditPerson?: string;
  auditState?: '0' | '1' | '2';
  auditTime?: string;
  authorType?: '0' | '1';
  browseTotal?: number;
  cateIdList?: string[];
  cateIds?: string;
  channelType?: '0' | '1';
  commentTotal?: number;
  content?: string;
  contentSource?: string;
  contentSourceDuration?: string;
  contentState?: '0' | '1' | '2' | '3';
  contentType?: '0' | '1' | '2';
  coverType?: '0' | '1' | '2';
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  groupCateId?: string;
  headPicture?: string;
  id?: string;
  parentCateIdList?: string[];
  parentCateIds?: string;
  rejectReason?: string;
  releasePerson?: string;
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  shareTotal?: number;
  starTotal?: number;
  strReleaseTime?: string;
  title?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoSearchAuxNest".
 */
export interface ArticleInfoSearchAuxNest1 {
  articleDigestIk?: string;
  titleIk?: string;
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
 * via the `definition` "IGetPageRequestReq".
 */
export interface IGetPageRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
  /**
   * 终端类型
   * * PUSH: 地推
   * * KYW_APP: 康友为APP
   * * KYW_H5: 康友为H5
   * * KYW_PC: 康友为PC商城
   * * KYW_PC_WEB: 康友为PC官网
   * * YKS_APP: 悦康送APP
   * * YKS_H5: 悦康送H5
   * * YKS_PC: 悦康送PC商城
   * * YKS_PC_WEB: 悦康送PC官网
   */
  terminalType?: number;
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
