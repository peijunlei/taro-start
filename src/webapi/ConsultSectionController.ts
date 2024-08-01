import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultSectionController';

/**
 *
 * 列表查询科室信息表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultSectionListResponse> {
  let result = await sdk.post<ConsultSectionListResponse>(
    '/consultsection/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询科室信息表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultSectionPageResponse> {
  let result = await sdk.post<ConsultSectionPageResponse>(
    '/consultsection/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询科室信息表
 *
 */
async function getById(
  sectionId: IGetByIdSectionIdReq,
): Promise<ConsultSectionByIdResponse> {
  let result = await sdk.get<ConsultSectionByIdResponse>(
    '/consultsection/{sectionId}'.replace('{sectionId}', sectionId + ''),

    {},
  );
  return result.context;
}

export default {
  getList,

  getPage,

  getById,
};

/**
 * sectionId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdSectionIdReq".
 */
export type IGetByIdSectionIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionListRequest".
 */
export interface ConsultSectionListRequest {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 科室id
   */
  sectionId?: number;
  /**
   * 批量查询-科室idList
   */
  sectionIdList?: number[];
  /**
   * 科室名称
   */
  sectionName?: string;
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
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
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
 * via the `definition` "BaseResponse«ConsultSectionListResponse»".
 */
export interface BaseResponseConsultSectionListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultSectionListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultSectionListResponse {
  /**
   * 科室信息表列表结果
   */
  consultSectionVOList?: ConsultSectionVO[];
  [k: string]: any;
}
export interface ConsultSectionVO {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 科室id
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionListResponse".
 */
export interface ConsultSectionListResponse1 {
  /**
   * 科室信息表列表结果
   */
  consultSectionVOList?: ConsultSectionVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionVO".
 */
export interface ConsultSectionVO1 {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 科室id
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionPageRequest".
 */
export interface ConsultSectionPageRequest {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 科室id
   */
  sectionId?: number;
  /**
   * 批量查询-科室idList
   */
  sectionIdList?: number[];
  /**
   * 科室名称
   */
  sectionName?: string;
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
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
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
 * via the `definition` "BaseResponse«ConsultSectionPageResponse»".
 */
export interface BaseResponseConsultSectionPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultSectionPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultSectionPageResponse {
  consultSectionVOPage?: MicroServicePageConsultSectionVO;
  [k: string]: any;
}
/**
 * 科室信息表分页结果
 */
export interface MicroServicePageConsultSectionVO {
  /**
   * 具体数据内容
   */
  content?: ConsultSectionVO2[];
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
export interface ConsultSectionVO2 {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 科室id
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionPageResponse".
 */
export interface ConsultSectionPageResponse1 {
  consultSectionVOPage?: MicroServicePageConsultSectionVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultSectionVO»".
 */
export interface MicroServicePageConsultSectionVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultSectionVO2[];
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
 * via the `definition` "BaseResponse«ConsultSectionByIdResponse»".
 */
export interface BaseResponseConsultSectionByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultSectionByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultSectionByIdResponse {
  consultSectionVO?: ConsultSectionVO3;
  [k: string]: any;
}
/**
 * 科室信息表信息
 */
export interface ConsultSectionVO3 {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 科室id
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultSectionByIdResponse".
 */
export interface ConsultSectionByIdResponse1 {
  consultSectionVO?: ConsultSectionVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 科室id
   */
  sectionId?: number;
  /**
   * 批量查询-科室idList
   */
  sectionIdList?: number[];
  /**
   * 科室名称
   */
  sectionName?: string;
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
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
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
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 科室头像
   */
  avatar?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标志（0:未删除,1:已删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 科室id
   */
  sectionId?: number;
  /**
   * 批量查询-科室idList
   */
  sectionIdList?: number[];
  /**
   * 科室名称
   */
  sectionName?: string;
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
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
