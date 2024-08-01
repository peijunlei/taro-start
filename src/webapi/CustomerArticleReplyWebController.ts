import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerArticleReplyWebController';

/**
 *
 * 新增会员内容回复表
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerArticleReplyAddResponse> {
  let result = await sdk.post<CustomerArticleReplyAddResponse>(
    '/customerarticlereply/web/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除会员内容回复表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customerarticlereply/web/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员内容回复表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerArticleReplyPageResponse> {
  let result = await sdk.post<CustomerArticleReplyPageResponse>(
    '/customerarticlereply/web/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员内容回复表
 *
 */
async function getById(
  customerArticleCommentId: IGetByIdCustomerArticleCommentIdReq,
): Promise<CustomerArticleReplyByIdResponse> {
  let result = await sdk.get<CustomerArticleReplyByIdResponse>(
    '/customerarticlereply/web/{customerArticleCommentId}'.replace(
      '{customerArticleCommentId}',
      customerArticleCommentId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除会员内容回复表
 *
 */
async function deleteById_(
  customerArticleCommentId: IDeleteById_CustomerArticleCommentIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customerarticlereply/web/{customerArticleCommentId}'.replace(
      '{customerArticleCommentId}',
      customerArticleCommentId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  getPage,

  getById,

  deleteById_,
};

/**
 * customerArticleCommentId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCustomerArticleCommentIdReq".
 */
export type IGetByIdCustomerArticleCommentIdReq = string;
/**
 * customerArticleCommentId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_CustomerArticleCommentIdReq".
 */
export type IDeleteById_CustomerArticleCommentIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReplyAddRequest".
 */
export interface CustomerArticleReplyAddRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复id
   */
  relArticleReplyId?: string;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerArticleReplyAddResponse»".
 */
export interface BaseResponseCustomerArticleReplyAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleReplyAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleReplyAddResponse {
  customerArticleReplyVO?: CustomerArticleReplyVO;
  [k: string]: any;
}
/**
 * 已新增的会员内容回复表信息
 */
export interface CustomerArticleReplyVO {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReplyAddResponse".
 */
export interface CustomerArticleReplyAddResponse1 {
  customerArticleReplyVO?: CustomerArticleReplyVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReplyVO".
 */
export interface CustomerArticleReplyVO1 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReplyDelByIdListRequest".
 */
export interface CustomerArticleReplyDelByIdListRequest {
  /**
   * 批量删除-评论idList
   */
  customerArticleCommentIdList?: string[];
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
 * via the `definition` "CustomerArticleReplyPageRequest".
 */
export interface CustomerArticleReplyPageRequest {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 批量查询-评论idList
   */
  customerArticleCommentIdList?: string[];
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 会员Id-被回复人
   */
  relCustomerId?: string;
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
   * 修改人
   */
  updatePerson?: string;
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
 * via the `definition` "BaseResponse«CustomerArticleReplyPageResponse»".
 */
export interface BaseResponseCustomerArticleReplyPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleReplyPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleReplyPageResponse {
  customerArticleReplyVOPage?: MicroServicePageCustomerArticleReplyVO;
  [k: string]: any;
}
/**
 * 会员内容回复表分页结果
 */
export interface MicroServicePageCustomerArticleReplyVO {
  /**
   * 具体数据内容
   */
  content?: CustomerArticleReplyVO2[];
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
export interface CustomerArticleReplyVO2 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
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
 * via the `definition` "CustomerArticleReplyPageResponse".
 */
export interface CustomerArticleReplyPageResponse1 {
  customerArticleReplyVOPage?: MicroServicePageCustomerArticleReplyVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerArticleReplyVO»".
 */
export interface MicroServicePageCustomerArticleReplyVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerArticleReplyVO2[];
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
 * via the `definition` "BaseResponse«CustomerArticleReplyByIdResponse»".
 */
export interface BaseResponseCustomerArticleReplyByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerArticleReplyByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerArticleReplyByIdResponse {
  customerArticleReplyVO?: CustomerArticleReplyVO3;
  [k: string]: any;
}
/**
 * 会员内容回复表信息
 */
export interface CustomerArticleReplyVO3 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerArticleReplyByIdResponse".
 */
export interface CustomerArticleReplyByIdResponse1 {
  customerArticleReplyVO?: CustomerArticleReplyVO3;
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
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复id
   */
  relArticleReplyId?: string;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-评论idList
   */
  customerArticleCommentIdList?: string[];
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
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 批量查询-评论idList
   */
  customerArticleCommentIdList?: string[];
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 会员Id-被回复人
   */
  relCustomerId?: string;
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
   * 修改人
   */
  updatePerson?: string;
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
