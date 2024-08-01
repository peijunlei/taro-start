import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LiveRoomReplayController';

/**
 *
 * 新增直播回放
 *
 */
async function add(addReq: IAddAddReqReq): Promise<LiveRoomReplayAddResponse> {
  let result = await sdk.post<LiveRoomReplayAddResponse>('/liveroomreplay/add', {...addReq});
  return result.context;
}

/**
 *
 * 根据idList批量删除直播回放
 *
 */
async function deleteByIdList_(delByIdListReq: IDeleteByIdListDelByIdListReqReq): Promise<unknown> {
  let result = await sdk.deleteF<unknown>('/liveroomreplay/delete-by-id-list', {...delByIdListReq});
  return result.context;
}

/**
 *
 * 导出直播回放列表
 *
 */
async function exportData(encrypted: IExportDataEncryptedReq): Promise<unknown> {
  let result = await sdk.get('/liveroomreplay/export/{encrypted}'.replace('{encrypted}', encrypted + ''), {});
  return result.context;
}

/**
 *
 * 列表查询直播回放
 *
 */
async function getList(listReq: IGetListListReqReq): Promise<LiveRoomReplayListResponse> {
  let result = await sdk.post<LiveRoomReplayListResponse>('/liveroomreplay/list', {...listReq});
  return result.context;
}

/**
 *
 * 修改直播回放
 *
 */
async function modify(modifyReq: IModifyModifyReqReq): Promise<LiveRoomReplayModifyResponse> {
  let result = await sdk.put<LiveRoomReplayModifyResponse>('/liveroomreplay/modify', {...modifyReq});
  return result.context;
}

/**
 *
 * 分页查询直播回放
 *
 */
async function getPage(pageReq: IGetPagePageReqReq): Promise<LiveRoomReplayPageResponse> {
  let result = await sdk.post<LiveRoomReplayPageResponse>('/liveroomreplay/page', {...pageReq});
  return result.context;
}

/**
 *
 * 根据id查询直播回放
 *
 */
async function getById(id: IGetByIdIdReq): Promise<LiveRoomReplayByIdResponse> {
  let result = await sdk.get<LiveRoomReplayByIdResponse>('/liveroomreplay/{id}'.replace('{id}', id + ''), {});
  return result.context;
}

/**
 *
 * 根据id删除直播回放
 *
 */
async function deleteById_(id: IDeleteByIdIdReq): Promise<unknown> {
  let result = await sdk.deleteF<unknown>('/liveroomreplay/{id}'.replace('{id}', id + ''), {});
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  exportData,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * encrypted
 *
 */
export type IExportDataEncryptedReq = string;
/**
 * id
 *
 */
export type IGetByIdIdReq = number;
/**
 * id
 *
 */
export type IDeleteByIdIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomReplayAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomReplayAddResponse;
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
export interface LiveRoomReplayAddResponse {
  liveRoomReplayVO?: LiveRoomReplayVO;
  [k: string]: any;
}
/**
 * 已新增的直播回放信息
 */
export interface LiveRoomReplayVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayAddResponse1 {
  liveRoomReplayVO?: LiveRoomReplayVO;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayDelByIdListRequest {
  /**
   * 批量删除-主键idList
   */
  idList?: number[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
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
 */
export interface LiveRoomReplayListRequest {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:视频创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:视频创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除逻辑 0：未删除 1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
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
  /**
   * 直播房间id
   */
  roomId?: number;
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
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomReplayListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomReplayListResponse;
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
export interface LiveRoomReplayListResponse {
  /**
   * 直播回放列表结果
   */
  liveRoomReplayVOList?: LiveRoomReplayVO2[];
  [k: string]: any;
}
export interface LiveRoomReplayVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayListResponse1 {
  /**
   * 直播回放列表结果
   */
  liveRoomReplayVOList?: LiveRoomReplayVO2[];
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayModifyRequest {
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomReplayModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomReplayModifyResponse;
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
export interface LiveRoomReplayModifyResponse {
  liveRoomReplayVO?: LiveRoomReplayVO3;
  [k: string]: any;
}
/**
 * 已修改的直播回放信息
 */
export interface LiveRoomReplayVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayModifyResponse1 {
  liveRoomReplayVO?: LiveRoomReplayVO3;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayPageRequest {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:视频创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:视频创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除逻辑 0：未删除 1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 直播房间id
   */
  roomId?: number;
  sort?: Sort3;
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
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomReplayPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomReplayPageResponse;
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
export interface LiveRoomReplayPageResponse {
  liveRoomReplayVOPage?: MicroServicePageLiveRoomReplayVO;
  [k: string]: any;
}
/**
 * 直播回放分页结果
 */
export interface MicroServicePageLiveRoomReplayVO {
  /**
   * 具体数据内容
   */
  content?: LiveRoomReplayVO4[];
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
  sort?: Sort4;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface LiveRoomReplayVO4 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayPageResponse1 {
  liveRoomReplayVOPage?: MicroServicePageLiveRoomReplayVO;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageLiveRoomReplayVO1 {
  /**
   * 具体数据内容
   */
  content?: LiveRoomReplayVO4[];
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
  sort?: Sort4;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomReplayByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomReplayByIdResponse;
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
export interface LiveRoomReplayByIdResponse {
  liveRoomReplayVO?: LiveRoomReplayVO5;
  [k: string]: any;
}
/**
 * 直播回放信息
 */
export interface LiveRoomReplayVO5 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayByIdResponse1 {
  liveRoomReplayVO?: LiveRoomReplayVO5;
  [k: string]: any;
}
/**
 */
export interface IAddAddReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IDeleteByIdListDelByIdListReqReq {
  /**
   * 批量删除-主键idList
   */
  idList?: number[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IGetListListReqReq {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:视频创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:视频创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除逻辑 0：未删除 1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
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
  /**
   * 直播房间id
   */
  roomId?: number;
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
 */
export interface IModifyModifyReqReq {
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IGetPagePageReqReq {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:视频创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:视频创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除逻辑 0：未删除 1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 直播房间id
   */
  roomId?: number;
  sort?: Sort3;
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
