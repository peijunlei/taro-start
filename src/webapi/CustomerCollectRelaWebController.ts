import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCollectRelaWebController';

/**
 *
 * 新增会员收藏关系表
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerCollectRelaAddResponse> {
  let result = await sdk.post<CustomerCollectRelaAddResponse>(
    '/customercollectrela/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 条件删除会员收藏关系表
 *
 */
async function deleteByCondition_(
  modifyRequest: IDeleteByCondition_ModifyRequestReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customercollectrela/delete-by-condition',

    {
      ...modifyRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除会员收藏关系表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customercollectrela/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询会员收藏关系表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CustomerCollectRelaListResponse> {
  let result = await sdk.post<CustomerCollectRelaListResponse>(
    '/customercollectrela/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员收藏关系表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerCollectRelaPageResponse> {
  let result = await sdk.post<CustomerCollectRelaPageResponse>(
    '/customercollectrela/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员收藏关系表
 *
 */
async function getById(
  customerCollectRelaId: IGetByIdCustomerCollectRelaIdReq,
): Promise<CustomerCollectRelaByIdResponse> {
  let result = await sdk.get<CustomerCollectRelaByIdResponse>(
    '/customercollectrela/{customerCollectRelaId}'.replace(
      '{customerCollectRelaId}',
      customerCollectRelaId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除会员收藏关系表
 *
 */
async function deleteById_(
  customerCollectRelaId: IDeleteById_CustomerCollectRelaIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customercollectrela/{customerCollectRelaId}'.replace(
      '{customerCollectRelaId}',
      customerCollectRelaId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByCondition_,

  deleteByIdList_,

  getList,

  getPage,

  getById,

  deleteById_,
};

/**
 * customerCollectRelaId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCustomerCollectRelaIdReq".
 */
export type IGetByIdCustomerCollectRelaIdReq = string;
/**
 * customerCollectRelaId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_CustomerCollectRelaIdReq".
 */
export type IDeleteById_CustomerCollectRelaIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaAddRequest".
 */
export interface CustomerCollectRelaAddRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerCollectRelaAddResponse»".
 */
export interface BaseResponseCustomerCollectRelaAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCollectRelaAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerCollectRelaAddResponse {
  customerCollectRelaVO?: CustomerCollectRelaVO;
  [k: string]: any;
}
/**
 * 已新增的会员收藏关系表信息
 */
export interface CustomerCollectRelaVO {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaAddResponse".
 */
export interface CustomerCollectRelaAddResponse1 {
  customerCollectRelaVO?: CustomerCollectRelaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaVO".
 */
export interface CustomerCollectRelaVO1 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaModifyRequest".
 */
export interface CustomerCollectRelaModifyRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
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
 * via the `definition` "CustomerCollectRelaDelByIdListRequest".
 */
export interface CustomerCollectRelaDelByIdListRequest {
  /**
   * 批量删除-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaListRequest".
 */
export interface CustomerCollectRelaListRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 搜索条件:收藏时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:收藏时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 批量查询-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  /**
   * 会员Id
   */
  customerId?: string;
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
 * via the `definition` "BaseResponse«CustomerCollectRelaListResponse»".
 */
export interface BaseResponseCustomerCollectRelaListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCollectRelaListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerCollectRelaListResponse {
  /**
   * 会员收藏关系表列表结果
   */
  customerCollectRelaVOList?: CustomerCollectRelaVO2[];
  [k: string]: any;
}
export interface CustomerCollectRelaVO2 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaListResponse".
 */
export interface CustomerCollectRelaListResponse1 {
  /**
   * 会员收藏关系表列表结果
   */
  customerCollectRelaVOList?: CustomerCollectRelaVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaPageRequest".
 */
export interface CustomerCollectRelaPageRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 搜索条件:收藏时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:收藏时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 批量查询-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  /**
   * 会员Id
   */
  customerId?: string;
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
 * via the `definition` "BaseResponse«CustomerCollectRelaPageResponse»".
 */
export interface BaseResponseCustomerCollectRelaPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCollectRelaPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerCollectRelaPageResponse {
  customerCollectRelaVOPage?: MicroServicePageCustomerCollectRelaVO;
  [k: string]: any;
}
/**
 * 会员收藏关系表分页结果
 */
export interface MicroServicePageCustomerCollectRelaVO {
  /**
   * 具体数据内容
   */
  content?: CustomerCollectRelaVO3[];
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
export interface CustomerCollectRelaVO3 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaPageResponse".
 */
export interface CustomerCollectRelaPageResponse1 {
  customerCollectRelaVOPage?: MicroServicePageCustomerCollectRelaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerCollectRelaVO»".
 */
export interface MicroServicePageCustomerCollectRelaVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerCollectRelaVO3[];
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
 * via the `definition` "BaseResponse«CustomerCollectRelaByIdResponse»".
 */
export interface BaseResponseCustomerCollectRelaByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCollectRelaByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerCollectRelaByIdResponse {
  customerCollectRelaVO?: CustomerCollectRelaVO4;
  [k: string]: any;
}
/**
 * 会员收藏关系表信息
 */
export interface CustomerCollectRelaVO4 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCollectRelaByIdResponse".
 */
export interface CustomerCollectRelaByIdResponse1 {
  customerCollectRelaVO?: CustomerCollectRelaVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByCondition_ModifyRequestReq".
 */
export interface IDeleteByCondition_ModifyRequestReq {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 收藏时间
   */
  createTime?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 搜索条件:收藏时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:收藏时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 批量查询-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  /**
   * 会员Id
   */
  customerId?: string;
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
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 收藏类型 0友群 1友课
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  collectType?: 0 | 1;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 搜索条件:收藏时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:收藏时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员收藏关系表主键
   */
  customerCollectRelaId?: string;
  /**
   * 批量查询-会员收藏关系表主键List
   */
  customerCollectRelaIdList?: string[];
  /**
   * 会员Id
   */
  customerId?: string;
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
