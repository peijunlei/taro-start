import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerStarRelaWebController';

/**
 *
 * 新增会员点赞关系表
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerStarRelaAddResponse> {
  let result = await sdk.post<CustomerStarRelaAddResponse>(
    '/customerstarrela/web/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 条件删除会员点赞关系表
 *
 */
async function deleteByCondition_(
  modifyRequest: IDeleteByCondition_ModifyRequestReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customerstarrela/web/delete-by-condition',

    {
      ...modifyRequest,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询会员点赞关系表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CustomerStarRelaListResponse> {
  let result = await sdk.post<CustomerStarRelaListResponse>(
    '/customerstarrela/web/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员点赞关系表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerStarRelaPageResponse> {
  let result = await sdk.post<CustomerStarRelaPageResponse>(
    '/customerstarrela/web/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 条件查询会员点赞关系表
 *
 */
async function selectByCondition(
  request: ISelectByConditionRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/customerstarrela/web/select-by-condition',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员点赞关系表
 *
 */
async function getById(
  customerStarRelaId: IGetByIdCustomerStarRelaIdReq,
): Promise<CustomerStarRelaByIdResponse> {
  let result = await sdk.get<CustomerStarRelaByIdResponse>(
    '/customerstarrela/web/{customerStarRelaId}'.replace(
      '{customerStarRelaId}',
      customerStarRelaId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByCondition_,

  getList,

  getPage,

  selectByCondition,

  getById,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = boolean;
/**
 * customerStarRelaId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCustomerStarRelaIdReq".
 */
export type IGetByIdCustomerStarRelaIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaAddRequest".
 */
export interface CustomerStarRelaAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerStarRelaAddResponse»".
 */
export interface BaseResponseCustomerStarRelaAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerStarRelaAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerStarRelaAddResponse {
  customerStarRelaVO?: CustomerStarRelaVO;
  [k: string]: any;
}
/**
 * 已新增的会员点赞关系表信息
 */
export interface CustomerStarRelaVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaAddResponse".
 */
export interface CustomerStarRelaAddResponse1 {
  customerStarRelaVO?: CustomerStarRelaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaVO".
 */
export interface CustomerStarRelaVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaModifyRequest".
 */
export interface CustomerStarRelaModifyRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
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
 * via the `definition` "CustomerStarRelaListRequest".
 */
export interface CustomerStarRelaListRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 批量查询-会员点赞关系表主键List
   */
  customerStarRelaIdList?: string[];
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
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerStarRelaListResponse»".
 */
export interface BaseResponseCustomerStarRelaListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerStarRelaListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerStarRelaListResponse {
  /**
   * 会员点赞关系表列表结果
   */
  customerStarRelaVOList?: CustomerStarRelaVO2[];
  [k: string]: any;
}
export interface CustomerStarRelaVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaListResponse".
 */
export interface CustomerStarRelaListResponse1 {
  /**
   * 会员点赞关系表列表结果
   */
  customerStarRelaVOList?: CustomerStarRelaVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaPageRequest".
 */
export interface CustomerStarRelaPageRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 批量查询-会员点赞关系表主键List
   */
  customerStarRelaIdList?: string[];
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
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerStarRelaPageResponse»".
 */
export interface BaseResponseCustomerStarRelaPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerStarRelaPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerStarRelaPageResponse {
  customerStarRelaVOPage?: MicroServicePageCustomerStarRelaVO;
  [k: string]: any;
}
/**
 * 会员点赞关系表分页结果
 */
export interface MicroServicePageCustomerStarRelaVO {
  /**
   * 具体数据内容
   */
  content?: CustomerStarRelaVO3[];
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
export interface CustomerStarRelaVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaPageResponse".
 */
export interface CustomerStarRelaPageResponse1 {
  customerStarRelaVOPage?: MicroServicePageCustomerStarRelaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerStarRelaVO»".
 */
export interface MicroServicePageCustomerStarRelaVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerStarRelaVO3[];
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
 * via the `definition` "BaseResponse«boolean»".
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: boolean;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerStarRelaByIdResponse»".
 */
export interface BaseResponseCustomerStarRelaByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerStarRelaByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerStarRelaByIdResponse {
  customerStarRelaVO?: CustomerStarRelaVO4;
  [k: string]: any;
}
/**
 * 会员点赞关系表信息
 */
export interface CustomerStarRelaVO4 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerStarRelaByIdResponse".
 */
export interface CustomerStarRelaByIdResponse1 {
  customerStarRelaVO?: CustomerStarRelaVO4;
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
   * 会员Id
   */
  customerId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByCondition_ModifyRequestReq".
 */
export interface IDeleteByCondition_ModifyRequestReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
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
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 批量查询-会员点赞关系表主键List
   */
  customerStarRelaIdList?: string[];
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
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 批量查询-会员点赞关系表主键List
   */
  customerStarRelaIdList?: string[];
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
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISelectByConditionRequestReq".
 */
export interface ISelectByConditionRequestReq {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员点赞关系表主键
   */
  customerStarRelaId?: string;
  /**
   * 批量查询-会员点赞关系表主键List
   */
  customerStarRelaIdList?: string[];
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
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
  /**
   * 点赞类型 0内容 1评论 2回复
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   */
  starType?: 0 | 1 | 2;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
