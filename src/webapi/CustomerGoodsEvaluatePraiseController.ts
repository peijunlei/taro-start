import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerGoodsEvaluatePraiseController';

/**
 *
 * 新增会员商品评价点赞关联表
 *
 */
async function add(addReq: IAddAddReqReq): Promise<CustomerGoodsEvaluatePraiseAddResponse> {
  let result = await sdk.post<CustomerGoodsEvaluatePraiseAddResponse>(
    '/customergoodsevaluatepraise/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除会员商品评价点赞关联表
 *
 */
async function deleteByIdList_(delByIdListReq: IDeleteByIdList_DelByIdListReqReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customergoodsevaluatepraise/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改会员商品评价点赞关联表
 *
 */
async function modify(modifyReq: IModifyModifyReqReq): Promise<CustomerGoodsEvaluatePraiseModifyResponse> {
  let result = await sdk.put<CustomerGoodsEvaluatePraiseModifyResponse>(
    '/customergoodsevaluatepraise/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员商品评价点赞关联表
 *
 */
async function page(
  customerGoodsEvaluatePraisePageReq: IPageCustomerGoodsEvaluatePraisePageReqReq,
): Promise<CustomerGoodsEvaluatePraisePageResponse> {
  let result = await sdk.post<CustomerGoodsEvaluatePraisePageResponse>(
    '/customergoodsevaluatepraise/page',

    {
      ...customerGoodsEvaluatePraisePageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员商品评价点赞关联表
 *
 */
async function getById(id: IGetByIdIdReq): Promise<CustomerGoodsEvaluatePraiseByIdResponse> {
  let result = await sdk.get<CustomerGoodsEvaluatePraiseByIdResponse>(
    '/customergoodsevaluatepraise/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除会员商品评价点赞关联表
 *
 */
async function deleteById_(id: IDeleteById_IdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customergoodsevaluatepraise/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  modify,

  page,

  getById,

  deleteById_,
};

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
 * via the `definition` "CustomerGoodsEvaluatePraiseAddRequest".
 */
export interface CustomerGoodsEvaluatePraiseAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerGoodsEvaluatePraiseAddResponse»".
 */
export interface BaseResponseCustomerGoodsEvaluatePraiseAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGoodsEvaluatePraiseAddResponse;
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
export interface CustomerGoodsEvaluatePraiseAddResponse {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO;
  [k: string]: any;
}
/**
 * 已新增的会员商品评价点赞关联表信息
 */
export interface CustomerGoodsEvaluatePraiseVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseAddResponse".
 */
export interface CustomerGoodsEvaluatePraiseAddResponse1 {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseVO".
 */
export interface CustomerGoodsEvaluatePraiseVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseDelByIdListRequest".
 */
export interface CustomerGoodsEvaluatePraiseDelByIdListRequest {
  /**
   * 批量删除-主键List
   */
  idList?: string[];
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseModifyRequest".
 */
export interface CustomerGoodsEvaluatePraiseModifyRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerGoodsEvaluatePraiseModifyResponse»".
 */
export interface BaseResponseCustomerGoodsEvaluatePraiseModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGoodsEvaluatePraiseModifyResponse;
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
export interface CustomerGoodsEvaluatePraiseModifyResponse {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO2;
  [k: string]: any;
}
/**
 * 已修改的会员商品评价点赞关联表信息
 */
export interface CustomerGoodsEvaluatePraiseVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseModifyResponse".
 */
export interface CustomerGoodsEvaluatePraiseModifyResponse1 {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraisePageRequest".
 */
export interface CustomerGoodsEvaluatePraisePageRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 批量查询-主键List
   */
  idList?: string[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerGoodsEvaluatePraisePageResponse»".
 */
export interface BaseResponseCustomerGoodsEvaluatePraisePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGoodsEvaluatePraisePageResponse;
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
export interface CustomerGoodsEvaluatePraisePageResponse {
  customerGoodsEvaluatePraiseVOPage?: MicroServicePageCustomerGoodsEvaluatePraiseVO;
  [k: string]: any;
}
/**
 * 会员商品评价点赞关联表分页结果
 */
export interface MicroServicePageCustomerGoodsEvaluatePraiseVO {
  /**
   * 具体数据内容
   */
  content?: CustomerGoodsEvaluatePraiseVO3[];
  empty?: boolean;
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
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CustomerGoodsEvaluatePraiseVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraisePageResponse".
 */
export interface CustomerGoodsEvaluatePraisePageResponse1 {
  customerGoodsEvaluatePraiseVOPage?: MicroServicePageCustomerGoodsEvaluatePraiseVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerGoodsEvaluatePraiseVO»".
 */
export interface MicroServicePageCustomerGoodsEvaluatePraiseVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerGoodsEvaluatePraiseVO3[];
  empty?: boolean;
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
  sort?: Sort3;
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
 * via the `definition` "BaseResponse«CustomerGoodsEvaluatePraiseByIdResponse»".
 */
export interface BaseResponseCustomerGoodsEvaluatePraiseByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGoodsEvaluatePraiseByIdResponse;
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
export interface CustomerGoodsEvaluatePraiseByIdResponse {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO4;
  [k: string]: any;
}
/**
 * 会员商品评价点赞关联表信息
 */
export interface CustomerGoodsEvaluatePraiseVO4 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGoodsEvaluatePraiseByIdResponse".
 */
export interface CustomerGoodsEvaluatePraiseByIdResponse1 {
  customerGoodsEvaluatePraiseVO?: CustomerGoodsEvaluatePraiseVO4;
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
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-主键List
   */
  idList?: string[];
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
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageCustomerGoodsEvaluatePraisePageReqReq".
 */
export interface IPageCustomerGoodsEvaluatePraisePageReqReq {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 商品评价id
   */
  goodsEvaluateId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 批量查询-主键List
   */
  idList?: string[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
