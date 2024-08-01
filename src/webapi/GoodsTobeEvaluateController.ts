import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsTobeEvaluateController';

/**
 *
 * 获取待评价数量
 *
 */
async function getGoodsTobeEvaluateNum(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/goodsTobeEvaluate/getGoodsTobeEvaluateNum',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询订单商品待评价
 *
 */
async function pageGoodsTobeEvaluate(
  goodsTobeEvaluatePageReq: IPageGoodsTobeEvaluateGoodsTobeEvaluatePageReqReq,
): Promise<GoodsTobeEvaluatePageResponse> {
  let result = await sdk.post<GoodsTobeEvaluatePageResponse>(
    '/goodsTobeEvaluate/pageGoodsTobeEvaluate',

    {
      ...goodsTobeEvaluatePageReq,
    },
  );
  return result.context;
}

export default {
  getGoodsTobeEvaluateNum,

  pageGoodsTobeEvaluate,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«long»".
 */
export interface BaseResponseLong {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: number;
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
 * via the `definition` "GoodsTobeEvaluatePageRequest".
 */
export interface GoodsTobeEvaluatePageRequest {
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
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否晒单 0：未晒单，1：已晒单
   */
  evaluateImgStatus?: number;
  /**
   * 是否评价 0：未评价，1：已评价
   */
  evaluateStatus?: number;
  /**
   * 商品id(spuId)
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 货品id(skuId)
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * 规格值名称
   */
  goodsSpecDetail?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
  /**
   * 订单号
   */
  orderNo?: string;
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
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
 * via the `definition` "BaseResponse«GoodsTobeEvaluatePageResponse»".
 */
export interface BaseResponseGoodsTobeEvaluatePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsTobeEvaluatePageResponse;
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
export interface GoodsTobeEvaluatePageResponse {
  goodsTobeEvaluateVOPage?: MicroServicePageGoodsTobeEvaluateVO;
  [k: string]: any;
}
/**
 * 订单商品待评价分页结果
 */
export interface MicroServicePageGoodsTobeEvaluateVO {
  /**
   * 具体数据内容
   */
  content?: GoodsTobeEvaluateVO[];
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
export interface GoodsTobeEvaluateVO {
  /**
   * 商品自动评价日期
   */
  autoGoodsEvaluateDate?: string;
  /**
   * 购买时间
   */
  buyTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否晒单 0：未晒单，1：已晒单
   */
  evaluateImgStatus?: number;
  /**
   * 是否评价 0：未评价，1：已评价
   */
  evaluateStatus?: number;
  /**
   * 商品id(spuId)
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 货品id(skuId)
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * 规格值名称
   */
  goodsSpecDetail?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsTobeEvaluatePageResponse".
 */
export interface GoodsTobeEvaluatePageResponse1 {
  goodsTobeEvaluateVOPage?: MicroServicePageGoodsTobeEvaluateVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GoodsTobeEvaluateVO»".
 */
export interface MicroServicePageGoodsTobeEvaluateVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsTobeEvaluateVO[];
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
 * via the `definition` "GoodsTobeEvaluateVO".
 */
export interface GoodsTobeEvaluateVO1 {
  /**
   * 商品自动评价日期
   */
  autoGoodsEvaluateDate?: string;
  /**
   * 购买时间
   */
  buyTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否晒单 0：未晒单，1：已晒单
   */
  evaluateImgStatus?: number;
  /**
   * 是否评价 0：未评价，1：已评价
   */
  evaluateStatus?: number;
  /**
   * 商品id(spuId)
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 货品id(skuId)
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * 规格值名称
   */
  goodsSpecDetail?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
 * via the `definition` "IPageGoodsTobeEvaluateGoodsTobeEvaluatePageReqReq".
 */
export interface IPageGoodsTobeEvaluateGoodsTobeEvaluatePageReqReq {
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
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否晒单 0：未晒单，1：已晒单
   */
  evaluateImgStatus?: number;
  /**
   * 是否评价 0：未评价，1：已评价
   */
  evaluateStatus?: number;
  /**
   * 商品id(spuId)
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 货品id(skuId)
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * 规格值名称
   */
  goodsSpecDetail?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
  /**
   * 订单号
   */
  orderNo?: string;
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
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
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
