import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'RecommendListDetailController';

/**
 *
 * 新增推荐清单
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<RecommendListDetailAddResponse> {
  let result = await sdk.post<RecommendListDetailAddResponse>(
    '/recommendlistdetail/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除推荐清单
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/recommendlistdetail/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出推荐清单列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/recommendlistdetail/export/{encrypted}'.replace(
      '{encrypted}',
      encrypted + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询推荐清单
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<RecommendListDetailListResponse> {
  let result = await sdk.post<RecommendListDetailListResponse>(
    '/recommendlistdetail/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改推荐清单
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<RecommendListDetailModifyResponse> {
  let result = await sdk.put<RecommendListDetailModifyResponse>(
    '/recommendlistdetail/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询推荐清单
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<RecommendListDetailPageResponse> {
  let result = await sdk.post<RecommendListDetailPageResponse>(
    '/recommendlistdetail/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询推荐清单
 *
 */
async function getById(
  id: IGetByIdIdReq,
): Promise<RecommendListDetailByIdResponse> {
  let result = await sdk.get<RecommendListDetailByIdResponse>(
    '/recommendlistdetail/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除推荐清单
 *
 */
async function deleteById_(id: IDeleteById_IdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/recommendlistdetail/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  exportData,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * encrypted
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdIdReq".
 */
export type IGetByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_IdReq".
 */
export type IDeleteById_IdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailAddRequest".
 */
export interface RecommendListDetailAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RecommendListDetailAddResponse»".
 */
export interface BaseResponseRecommendListDetailAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RecommendListDetailAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RecommendListDetailAddResponse {
  recommendListDetailVO?: RecommendListDetailVO;
  [k: string]: any;
}
/**
 * 已新增的推荐清单信息
 */
export interface RecommendListDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailAddResponse".
 */
export interface RecommendListDetailAddResponse1 {
  recommendListDetailVO?: RecommendListDetailVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailVO".
 */
export interface RecommendListDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailDelByIdListRequest".
 */
export interface RecommendListDetailDelByIdListRequest {
  /**
   * 批量删除-清单详情主键List
   */
  idList?: string[];
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
 * via the `definition` "RecommendListDetailListRequest".
 */
export interface RecommendListDetailListRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 批量查询-清单详情主键List
   */
  idList?: string[];
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
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
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RecommendListDetailListResponse»".
 */
export interface BaseResponseRecommendListDetailListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RecommendListDetailListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RecommendListDetailListResponse {
  /**
   * 推荐清单列表结果
   */
  recommendListDetailVOList?: RecommendListDetailVO2[];
  [k: string]: any;
}
export interface RecommendListDetailVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailListResponse".
 */
export interface RecommendListDetailListResponse1 {
  /**
   * 推荐清单列表结果
   */
  recommendListDetailVOList?: RecommendListDetailVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailModifyRequest".
 */
export interface RecommendListDetailModifyRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RecommendListDetailModifyResponse»".
 */
export interface BaseResponseRecommendListDetailModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RecommendListDetailModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RecommendListDetailModifyResponse {
  recommendListDetailVO?: RecommendListDetailVO3;
  [k: string]: any;
}
/**
 * 已修改的推荐清单信息
 */
export interface RecommendListDetailVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailModifyResponse".
 */
export interface RecommendListDetailModifyResponse1 {
  recommendListDetailVO?: RecommendListDetailVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailPageRequest".
 */
export interface RecommendListDetailPageRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 批量查询-清单详情主键List
   */
  idList?: string[];
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
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
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RecommendListDetailPageResponse»".
 */
export interface BaseResponseRecommendListDetailPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RecommendListDetailPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RecommendListDetailPageResponse {
  recommendListDetailVOPage?: MicroServicePageRecommendListDetailVO;
  [k: string]: any;
}
/**
 * 推荐清单分页结果
 */
export interface MicroServicePageRecommendListDetailVO {
  /**
   * 具体数据内容
   */
  content?: RecommendListDetailVO4[];
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface RecommendListDetailVO4 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailPageResponse".
 */
export interface RecommendListDetailPageResponse1 {
  recommendListDetailVOPage?: MicroServicePageRecommendListDetailVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«RecommendListDetailVO»".
 */
export interface MicroServicePageRecommendListDetailVO1 {
  /**
   * 具体数据内容
   */
  content?: RecommendListDetailVO4[];
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
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
 * via the `definition` "BaseResponse«RecommendListDetailByIdResponse»".
 */
export interface BaseResponseRecommendListDetailByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RecommendListDetailByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RecommendListDetailByIdResponse {
  recommendListDetailVO?: RecommendListDetailVO5;
  [k: string]: any;
}
/**
 * 推荐清单信息
 */
export interface RecommendListDetailVO5 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendListDetailByIdResponse".
 */
export interface RecommendListDetailByIdResponse1 {
  recommendListDetailVO?: RecommendListDetailVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-清单详情主键List
   */
  idList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 批量查询-清单详情主键List
   */
  idList?: string[];
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
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
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyModifyReqReq".
 */
export interface IModifyModifyReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 清单详情主键
   */
  id?: string;
  /**
   * 批量查询-清单详情主键List
   */
  idList?: string[];
  /**
   * 商品id或文章id
   */
  itemId?: string;
  /**
   * 清单Id
   */
  listId?: string;
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
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
