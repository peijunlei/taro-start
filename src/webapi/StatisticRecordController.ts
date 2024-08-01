import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StatisticRecordController';

/**
 *
 * 根据idList批量删除统计记录
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/statisticrecord/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询统计记录
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<StatisticRecordListResponse> {
  let result = await sdk.post<StatisticRecordListResponse>(
    '/statisticrecord/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改统计记录
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<StatisticRecordModifyResponse> {
  let result = await sdk.put<StatisticRecordModifyResponse>(
    '/statisticrecord/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询统计记录
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<StatisticRecordPageResponse> {
  let result = await sdk.post<StatisticRecordPageResponse>(
    '/statisticrecord/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 新增统计记录
 *
 */
async function saveAndFlush(
  addReq: ISaveAndFlushAddReqReq,
): Promise<StatisticRecordAddResponse> {
  let result = await sdk.post<StatisticRecordAddResponse>(
    '/statisticrecord/saveAndFlush',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询统计记录
 *
 */
async function getById(
  recordId: IGetByIdRecordIdReq,
): Promise<StatisticRecordByIdResponse> {
  let result = await sdk.get<StatisticRecordByIdResponse>(
    '/statisticrecord/{recordId}'.replace('{recordId}', recordId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除统计记录
 *
 */
async function deleteById_(
  recordId: IDeleteById_RecordIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/statisticrecord/{recordId}'.replace('{recordId}', recordId + ''),

    {},
  );
  return result.context;
}

export default {
  deleteByIdList_,

  getList,

  modify,

  getPage,

  saveAndFlush,

  getById,

  deleteById_,
};

/**
 * recordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdRecordIdReq".
 */
export type IGetByIdRecordIdReq = number;
/**
 * recordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_RecordIdReq".
 */
export type IDeleteById_RecordIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordDelByIdListRequest".
 */
export interface StatisticRecordDelByIdListRequest {
  /**
   * 批量删除-统计主键List
   */
  recordIdList?: number[];
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
 * via the `definition` "StatisticRecordListRequest".
 */
export interface StatisticRecordListRequest {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
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
   * 子分类
   */
  recordChildType?: string;
  /**
   * 搜索条件:创建时间开始
   */
  recordCreateTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  recordCreateTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  recordFinishTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  recordFinishTimeEnd?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 批量查询-统计主键List
   */
  recordIdList?: number[];
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
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
 * via the `definition` "BaseResponse«StatisticRecordListResponse»".
 */
export interface BaseResponseStatisticRecordListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StatisticRecordListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface StatisticRecordListResponse {
  /**
   * 统计记录列表结果
   */
  statisticRecordVOList?: StatisticRecordVO[];
  [k: string]: any;
}
export interface StatisticRecordVO {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordListResponse".
 */
export interface StatisticRecordListResponse1 {
  /**
   * 统计记录列表结果
   */
  statisticRecordVOList?: StatisticRecordVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordVO".
 */
export interface StatisticRecordVO1 {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordModifyRequest".
 */
export interface StatisticRecordModifyRequest {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StatisticRecordModifyResponse»".
 */
export interface BaseResponseStatisticRecordModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StatisticRecordModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface StatisticRecordModifyResponse {
  statisticRecordVO?: StatisticRecordVO2;
  [k: string]: any;
}
/**
 * 已修改的统计记录信息
 */
export interface StatisticRecordVO2 {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordModifyResponse".
 */
export interface StatisticRecordModifyResponse1 {
  statisticRecordVO?: StatisticRecordVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordPageRequest".
 */
export interface StatisticRecordPageRequest {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
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
   * 子分类
   */
  recordChildType?: string;
  /**
   * 搜索条件:创建时间开始
   */
  recordCreateTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  recordCreateTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  recordFinishTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  recordFinishTimeEnd?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 批量查询-统计主键List
   */
  recordIdList?: number[];
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
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
 * via the `definition` "BaseResponse«StatisticRecordPageResponse»".
 */
export interface BaseResponseStatisticRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StatisticRecordPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface StatisticRecordPageResponse {
  statisticRecordVOPage?: MicroServicePageStatisticRecordVO;
  [k: string]: any;
}
/**
 * 统计记录分页结果
 */
export interface MicroServicePageStatisticRecordVO {
  /**
   * 具体数据内容
   */
  content?: StatisticRecordVO3[];
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
export interface StatisticRecordVO3 {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordPageResponse".
 */
export interface StatisticRecordPageResponse1 {
  statisticRecordVOPage?: MicroServicePageStatisticRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«StatisticRecordVO»".
 */
export interface MicroServicePageStatisticRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: StatisticRecordVO3[];
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
 * via the `definition` "StatisticRecordAddRequest".
 */
export interface StatisticRecordAddRequest {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StatisticRecordAddResponse»".
 */
export interface BaseResponseStatisticRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StatisticRecordAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface StatisticRecordAddResponse {
  statisticRecordVO?: StatisticRecordVO4;
  [k: string]: any;
}
/**
 * 已新增的统计记录信息
 */
export interface StatisticRecordVO4 {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordAddResponse".
 */
export interface StatisticRecordAddResponse1 {
  statisticRecordVO?: StatisticRecordVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StatisticRecordByIdResponse»".
 */
export interface BaseResponseStatisticRecordByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StatisticRecordByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface StatisticRecordByIdResponse {
  statisticRecordVO?: StatisticRecordVO5;
  [k: string]: any;
}
/**
 * 统计记录信息
 */
export interface StatisticRecordVO5 {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StatisticRecordByIdResponse".
 */
export interface StatisticRecordByIdResponse1 {
  statisticRecordVO?: StatisticRecordVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-统计主键List
   */
  recordIdList?: number[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
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
   * 子分类
   */
  recordChildType?: string;
  /**
   * 搜索条件:创建时间开始
   */
  recordCreateTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  recordCreateTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  recordFinishTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  recordFinishTimeEnd?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 批量查询-统计主键List
   */
  recordIdList?: number[];
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
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
 * via the `definition` "IModifyModifyReqReq".
 */
export interface IModifyModifyReqReq {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
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
   * 子分类
   */
  recordChildType?: string;
  /**
   * 搜索条件:创建时间开始
   */
  recordCreateTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  recordCreateTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  recordFinishTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  recordFinishTimeEnd?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 批量查询-统计主键List
   */
  recordIdList?: number[];
  /**
   * 分区标识
   */
  recordPartition?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
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
 * via the `definition` "ISaveAndFlushAddReqReq".
 */
export interface ISaveAndFlushAddReqReq {
  /**
   * 会员的Id
   */
  customerId?: string;
  /**
   * 记录元素的Id
   */
  elementId?: string;
  /**
   * 子分类
   */
  recordChildType?: string;
  /**
   * 创建时间
   */
  recordCreateTime?: string;
  /**
   * 结束时间
   */
  recordFinishTime?: string;
  /**
   * 统计主键
   */
  recordId?: number;
  /**
   * 页面的路由
   */
  recordRouter?: string;
  /**
   * 记录的来源（h5，app，小程序，pc）
   */
  recordSource?: string;
  /**
   * 停留的时长
   */
  recordTime?: number;
  /**
   * 记录类型（商品，药品，文章....）
   */
  recordType?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
