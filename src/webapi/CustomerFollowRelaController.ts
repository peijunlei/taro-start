import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerFollowRelaController';

/**
 *
 * 新增会员关注关系表
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerFollowRelaAddResponse> {
  let result = await sdk.post<CustomerFollowRelaAddResponse>(
    '/customerfollowrela/web/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据用户id和关联id条件删除
 *
 */
async function deleteByCondition_(
  delByConditionRequest: IDeleteByCondition_DelByConditionRequestReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customerfollowrela/web/deleteByCondition',

    {
      ...delByConditionRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询登录人是否关注用户
 *
 */
async function isFollow_(
  customerId: IIsFollow_CustomerIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF<unknown>(
    '/customerfollowrela/web/isFollow/{customerId}'.replace(
      '{customerId}',
      customerId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据会员id列表查询会员关注关系表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CustomerFollowRelaListResponse> {
  let result = await sdk.post<CustomerFollowRelaListResponse>(
    '/customerfollowrela/web/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据会员id分页查询会员关注关系表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerFollowRelaPageResponse> {
  let result = await sdk.post<CustomerFollowRelaPageResponse>(
    '/customerfollowrela/web/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员关注关系表
 *
 */
async function getById(
  customerFollowRelaId: IGetByIdCustomerFollowRelaIdReq,
): Promise<CustomerFollowRelaByIdResponse> {
  let result = await sdk.get<CustomerFollowRelaByIdResponse>(
    '/customerfollowrela/web/{customerFollowRelaId}'.replace(
      '{customerFollowRelaId}',
      customerFollowRelaId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByCondition_,

  isFollow_,

  getList,

  getPage,

  getById,
};

/**
 * customerId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IIsFollow_CustomerIdReq".
 */
export type IIsFollow_CustomerIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = boolean;
/**
 * customerFollowRelaId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCustomerFollowRelaIdReq".
 */
export type IGetByIdCustomerFollowRelaIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFollowRelaAddRequest".
 */
export interface CustomerFollowRelaAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
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
 * via the `definition` "BaseResponse«CustomerFollowRelaAddResponse»".
 */
export interface BaseResponseCustomerFollowRelaAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFollowRelaAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFollowRelaAddResponse {
  customerFollowRelaVO?: CustomerFollowRelaVO;
  [k: string]: any;
}
/**
 * 已新增的会员关注关系表信息
 */
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFollowRelaAddResponse".
 */
export interface CustomerFollowRelaAddResponse1 {
  customerFollowRelaVO?: CustomerFollowRelaVO;
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
 * via the `definition` "CustomerFollowRelaDelByConditionRequest".
 */
export interface CustomerFollowRelaDelByConditionRequest {
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
 * via the `definition` "CustomerFollowRelaListRequest".
 */
export interface CustomerFollowRelaListRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 批量查询-会员关注关系表主键List
   */
  customerFollowRelaIdList?: string[];
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
   * 关联业务主键（友群分类id、会员id(友粉)）
   */
  refId?: string;
  /**
   * 关联业务主键（友群分类id、会员id(友粉)集合）
   */
  refIdList?: string[];
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
 * via the `definition` "BaseResponse«CustomerFollowRelaListResponse»".
 */
export interface BaseResponseCustomerFollowRelaListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFollowRelaListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFollowRelaListResponse {
  /**
   * 会员关注关系表列表结果
   */
  customerFollowRelaVOList?: CustomerFollowRelaVO2[];
  [k: string]: any;
}
export interface CustomerFollowRelaVO2 {
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
 * via the `definition` "CustomerFollowRelaListResponse".
 */
export interface CustomerFollowRelaListResponse1 {
  /**
   * 会员关注关系表列表结果
   */
  customerFollowRelaVOList?: CustomerFollowRelaVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFollowRelaPageRequest".
 */
export interface CustomerFollowRelaPageRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 批量查询-会员关注关系表主键List
   */
  customerFollowRelaIdList?: string[];
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
   * 关联业务主键（友群分类id、会员id(友粉)）
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerFollowRelaPageResponse»".
 */
export interface BaseResponseCustomerFollowRelaPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFollowRelaPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFollowRelaPageResponse {
  customerFollowRelaVOPage?: MicroServicePageCustomerFollowRelaVO;
  [k: string]: any;
}
/**
 * 会员关注关系表分页结果
 */
export interface MicroServicePageCustomerFollowRelaVO {
  /**
   * 具体数据内容
   */
  content?: CustomerFollowRelaVO3[];
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
export interface CustomerFollowRelaVO3 {
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
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFollowRelaPageResponse".
 */
export interface CustomerFollowRelaPageResponse1 {
  customerFollowRelaVOPage?: MicroServicePageCustomerFollowRelaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerFollowRelaVO»".
 */
export interface MicroServicePageCustomerFollowRelaVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerFollowRelaVO3[];
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
 * via the `definition` "BaseResponse«CustomerFollowRelaByIdResponse»".
 */
export interface BaseResponseCustomerFollowRelaByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFollowRelaByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFollowRelaByIdResponse {
  customerFollowRelaVO?: CustomerFollowRelaVO4;
  [k: string]: any;
}
/**
 * 会员关注关系表信息
 */
export interface CustomerFollowRelaVO4 {
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
 * via the `definition` "CustomerFollowRelaByIdResponse".
 */
export interface CustomerFollowRelaByIdResponse1 {
  customerFollowRelaVO?: CustomerFollowRelaVO4;
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
 * via the `definition` "IDeleteByCondition_DelByConditionRequestReq".
 */
export interface IDeleteByCondition_DelByConditionRequestReq {
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
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 批量查询-会员关注关系表主键List
   */
  customerFollowRelaIdList?: string[];
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
   * 关联业务主键（友群分类id、会员id(友粉)）
   */
  refId?: string;
  /**
   * 关联业务主键（友群分类id、会员id(友粉)集合）
   */
  refIdList?: string[];
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员关注关系表主键
   */
  customerFollowRelaId?: string;
  /**
   * 批量查询-会员关注关系表主键List
   */
  customerFollowRelaIdList?: string[];
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
   * 关联业务主键（友群分类id、会员id(友粉)）
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
