import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributorGoodsInfoController';

/**
 *
 * 新增分销商品
 *
 */
async function add(request: IAddRequestReq): Promise<DistributorGoodsInfoAddResponse> {
  let result = await sdk.post<DistributorGoodsInfoAddResponse>(
    '/distributor-goods/add',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询分销员下分销商品数
 *
 */
async function count(): Promise<DistributorGoodsInfoCountsResponse> {
  let result = await sdk.get<DistributorGoodsInfoCountsResponse>(
    '/distributor-goods/count',

    {},
  );
  return result.context;
}

/**
 *
 * 删除分销商品
 *
 */
async function deleteF(request: IDeleteRequestReq): Promise<DistributorGoodsInfoDeleteResponse> {
  let result = await sdk.post<DistributorGoodsInfoDeleteResponse>(
    '/distributor-goods/delete',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 修改分销员商品排序
 *
 */
async function modifySequence(request: IModifySequenceRequestReq): Promise<DistributorGoodsInfoDeleteResponse> {
  let result = await sdk.post<DistributorGoodsInfoDeleteResponse>(
    '/distributor-goods/modify-sequence',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  add,

  count,

  deleteF,

  modifySequence,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoAddRequest".
 */
export interface DistributorGoodsInfoAddRequest {
  /**
   * 分销员对应的会员ID
   */
  customerId?: string;
  /**
   * 分销商品SPU编号
   */
  goodsId?: string;
  /**
   * 分销商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributorGoodsInfoAddResponse»".
 */
export interface BaseResponseDistributorGoodsInfoAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributorGoodsInfoAddResponse;
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
export interface DistributorGoodsInfoAddResponse {
  customerId?: string;
  goodsInfoId?: string;
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoAddResponse".
 */
export interface DistributorGoodsInfoAddResponse1 {
  customerId?: string;
  goodsInfoId?: string;
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributorGoodsInfoCountsResponse»".
 */
export interface BaseResponseDistributorGoodsInfoCountsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributorGoodsInfoCountsResponse;
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
export interface DistributorGoodsInfoCountsResponse {
  /**
   * 店铺分销商品个数
   */
  counts?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoCountsResponse".
 */
export interface DistributorGoodsInfoCountsResponse1 {
  /**
   * 店铺分销商品个数
   */
  counts?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoDeleteRequest".
 */
export interface DistributorGoodsInfoDeleteRequest {
  /**
   * 分销员对应的会员ID
   */
  customerId?: string;
  /**
   * 分销商品SKU编号
   */
  goodsInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributorGoodsInfoDeleteResponse»".
 */
export interface BaseResponseDistributorGoodsInfoDeleteResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributorGoodsInfoDeleteResponse;
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
export interface DistributorGoodsInfoDeleteResponse {
  /**
   * 结果数
   */
  result?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoDeleteResponse".
 */
export interface DistributorGoodsInfoDeleteResponse1 {
  /**
   * 结果数
   */
  result?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoModifySequenceRequest".
 */
export interface DistributorGoodsInfoModifySequenceRequest {
  /**
   * 分销员商品对象集合
   */
  distributorGoodsInfoDTOList?: DistributorGoodsInfoModifySequenceDTO[];
  [k: string]: any;
}
export interface DistributorGoodsInfoModifySequenceDTO {
  createTime?: string;
  customerId?: string;
  goodsId?: string;
  goodsInfoId?: string;
  id?: string;
  sequence?: number;
  status?: number;
  storeId?: number;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorGoodsInfoModifySequenceDTO".
 */
export interface DistributorGoodsInfoModifySequenceDTO1 {
  createTime?: string;
  customerId?: string;
  goodsId?: string;
  goodsInfoId?: string;
  id?: string;
  sequence?: number;
  status?: number;
  storeId?: number;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddRequestReq".
 */
export interface IAddRequestReq {
  /**
   * 分销员对应的会员ID
   */
  customerId?: string;
  /**
   * 分销商品SPU编号
   */
  goodsId?: string;
  /**
   * 分销商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteRequestReq".
 */
export interface IDeleteRequestReq {
  /**
   * 分销员对应的会员ID
   */
  customerId?: string;
  /**
   * 分销商品SKU编号
   */
  goodsInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifySequenceRequestReq".
 */
export interface IModifySequenceRequestReq {
  /**
   * 分销员商品对象集合
   */
  distributorGoodsInfoDTOList?: DistributorGoodsInfoModifySequenceDTO[];
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
