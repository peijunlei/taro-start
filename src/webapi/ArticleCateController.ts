import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ArticleCateController';

/**
 *
 * 从缓存中获取内容分类信息列表
 *
 */
async function list(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/article-cate/all-article-cates',

    {},
  );
  return result.context;
}

/**
 *
 * 查询所有一级分类
 *
 */
async function getTopArticleCatet(): Promise<ArticleCateRootListResponse> {
  let result = await sdk.post<ArticleCateRootListResponse>(
    '/article-cate/articleCate/top',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询当前用户感兴趣内容分类表
 *
 */
async function getCustomerList(): Promise<CustomerArticleCateRelaListResponse> {
  let result = await sdk.post<CustomerArticleCateRelaListResponse>(
    '/article-cate/customer/list',

    {},
  );
  return result.context;
}

/**
 *
 * 保存客户感兴趣内容分类
 *
 */
async function batchSave(
  listReq: IBatchSaveListReqReq,
): Promise<ArticleCateListResponse> {
  let result = await sdk.post<ArticleCateListResponse>(
    '/article-cate/customer/pre',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 仅查询一级分类,不分页
 *
 */
async function getFirstLevel(): Promise<ArticleCateListResponse> {
  let result = await sdk.post<ArticleCateListResponse>(
    '/article-cate/firstLevle/cate',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询内容分类表
 *
 */
async function getList(): Promise<ArticleCateListResponse> {
  let result = await sdk.post<ArticleCateListResponse>(
    '/article-cate/list',

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询内容分类表
 *
 */
async function getById(
  cateId: IGetByIdCateIdReq,
): Promise<ArticleCateByIdResponse> {
  let result = await sdk.get<ArticleCateByIdResponse>(
    '/article-cate/web/{cateId}'.replace('{cateId}', cateId + ''),

    {},
  );
  return result.context;
}

export default {
  list,

  getTopArticleCatet,

  getCustomerList,

  batchSave,

  getFirstLevel,

  getList,

  getById,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * cateId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCateIdReq".
 */
export type IGetByIdCateIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleCateRootListResponse»".
 */
export interface BaseResponseArticleCateRootListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleCateRootListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleCateRootListResponse {
  /**
   * 内容分类表列表结果
   */
  articleCateVOList?: ArticleCateVO[];
  [k: string]: any;
}
export interface ArticleCateVO {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "ArticleCateRootListResponse".
 */
export interface ArticleCateRootListResponse1 {
  /**
   * 内容分类表列表结果
   */
  articleCateVOList?: ArticleCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleCateVO".
 */
export interface ArticleCateVO1 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "BaseResponse«CustomerArticleCateRelaListResponse»".
 */
export interface BaseResponseCustomerArticleCateRelaListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleCateRelaListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleCateRelaListResponse {
  /**
   * 客户兴趣分类表列表结果
   */
  customerArticleCateRelaVOList?: CustomerArticleCateRelaVO[];
  [k: string]: any;
}
export interface CustomerArticleCateRelaVO {
  /**
   * 内容子分类Id
   */
  articleCateChildId?: string;
  /**
   * 内容父分类Id
   */
  articleCateParentId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户兴趣分类表主键
   */
  customerArticleCateRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleCateRelaListResponse".
 */
export interface CustomerArticleCateRelaListResponse1 {
  /**
   * 客户兴趣分类表列表结果
   */
  customerArticleCateRelaVOList?: CustomerArticleCateRelaVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleCateRelaVO".
 */
export interface CustomerArticleCateRelaVO1 {
  /**
   * 内容子分类Id
   */
  articleCateChildId?: string;
  /**
   * 内容父分类Id
   */
  articleCateParentId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户兴趣分类表主键
   */
  customerArticleCateRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleCateListRequest".
 */
export interface ArticleCateListRequest {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 批量查询-文章分类主键List
   */
  cateIdList?: string[];
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
 * via the `definition` "BaseResponse«ArticleCateListResponse»".
 */
export interface BaseResponseArticleCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleCateListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleCateListResponse {
  /**
   * 内容分类表列表结果
   */
  articleCateVOList?: ArticleCateVO2[];
  [k: string]: any;
}
export interface ArticleCateVO2 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "ArticleCateListResponse".
 */
export interface ArticleCateListResponse1 {
  /**
   * 内容分类表列表结果
   */
  articleCateVOList?: ArticleCateVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleCateByIdResponse»".
 */
export interface BaseResponseArticleCateByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleCateByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleCateByIdResponse {
  articleCateVO?: ArticleCateVO3;
  [k: string]: any;
}
/**
 * 内容分类表信息
 */
export interface ArticleCateVO3 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "ArticleCateByIdResponse".
 */
export interface ArticleCateByIdResponse1 {
  articleCateVO?: ArticleCateVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IBatchSaveListReqReq".
 */
export interface IBatchSaveListReqReq {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 批量查询-文章分类主键List
   */
  cateIdList?: string[];
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
