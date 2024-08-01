import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SmallShopCustomerTagController';

/**
 *
 * 新增会员标签
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<SmallShopCustomerTagAddResponse> {
  let result = await sdk.post<SmallShopCustomerTagAddResponse>(
    '/smallshopcustomertag/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询会员标签
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<SmallShopCustomerTagListResponse> {
  let result = await sdk.post<SmallShopCustomerTagListResponse>(
    '/smallshopcustomertag/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改会员标签
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<SmallShopCustomerTagModifyResponse> {
  let result = await sdk.put<SmallShopCustomerTagModifyResponse>(
    '/smallshopcustomertag/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id删除会员标签
 *
 */
async function deleteById_(tagId: IDeleteById_TagIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/smallshopcustomertag/{tagId}'.replace('{tagId}', tagId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  getList,

  modify,

  deleteById_,
};

/**
 * tagId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_TagIdReq".
 */
export type IDeleteById_TagIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagAddRequest".
 */
export interface SmallShopCustomerTagAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCustomerTagAddResponse»".
 */
export interface BaseResponseSmallShopCustomerTagAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCustomerTagAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCustomerTagAddResponse {
  smallShopCustomerTagVO?: SmallShopCustomerTagVO;
  [k: string]: any;
}
/**
 * 已新增的会员标签信息
 */
export interface SmallShopCustomerTagVO {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagAddResponse".
 */
export interface SmallShopCustomerTagAddResponse1 {
  smallShopCustomerTagVO?: SmallShopCustomerTagVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagVO".
 */
export interface SmallShopCustomerTagVO1 {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagListRequest".
 */
export interface SmallShopCustomerTagListRequest {
  /**
   * 会员标识UUID
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
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
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
   * 标签名称
   */
  tagName?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCustomerTagListResponse»".
 */
export interface BaseResponseSmallShopCustomerTagListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCustomerTagListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCustomerTagListResponse {
  /**
   * 会员标签列表结果
   */
  smallShopCustomerTagVOList?: SmallShopCustomerTagVO2[];
  [k: string]: any;
}
export interface SmallShopCustomerTagVO2 {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagListResponse".
 */
export interface SmallShopCustomerTagListResponse1 {
  /**
   * 会员标签列表结果
   */
  smallShopCustomerTagVOList?: SmallShopCustomerTagVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagModifyRequest".
 */
export interface SmallShopCustomerTagModifyRequest {
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCustomerTagModifyResponse»".
 */
export interface BaseResponseSmallShopCustomerTagModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCustomerTagModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCustomerTagModifyResponse {
  smallShopCustomerTagVO?: SmallShopCustomerTagVO3;
  [k: string]: any;
}
/**
 * 已修改的会员标签信息
 */
export interface SmallShopCustomerTagVO3 {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagModifyResponse".
 */
export interface SmallShopCustomerTagModifyResponse1 {
  smallShopCustomerTagVO?: SmallShopCustomerTagVO3;
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
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
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
   * 会员标识UUID
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
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
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
   * 标签名称
   */
  tagName?: string;
  token?: string;
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
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
