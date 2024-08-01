import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MessageSwitchController';

/**
 *
 * 批量新增会员消息开关
 *
 */
async function batchAdd(request: IBatchAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/messageSwitch/batchAdd',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除会员消息开关
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/messageSwitch/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 通过会员id和开关类型查询会员消息开关状态
 *
 */
async function getSwitchStatus(
  switchStatusRequest: IGetSwitchStatusSwitchStatusRequestReq,
): Promise<GetSwitchStatusResponse> {
  let result = await sdk.get<GetSwitchStatusResponse>(
    '/messageSwitch/getSwitchStatus'.replace(
      '{switchStatusRequest}',
      switchStatusRequest + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询会员消息开关
 *
 */
async function getList(): Promise<MessageSwitchListResponse> {
  let result = await sdk.post<MessageSwitchListResponse>(
    '/messageSwitch/list',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询会员消息开关
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<MessageSwitchPageResponse> {
  let result = await sdk.post<MessageSwitchPageResponse>(
    '/messageSwitch/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 通过id修改会员消息开关状态
 *
 */
async function updateById(
  modifyReq: IUpdateByIdModifyReqReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/messageSwitch/updateById',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id删除会员消息开关
 *
 */
async function deleteById_(
  switchId: IDeleteById_SwitchIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/messageSwitch/{switchId}'.replace('{switchId}', switchId + ''),

    {},
  );
  return result.context;
}

export default {
  batchAdd,

  deleteByIdList_,

  getSwitchStatus,

  getList,

  getPage,

  updateById,

  deleteById_,
};

/**
 * switchStatusRequest
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetSwitchStatusSwitchStatusRequestReq".
 */
export type IGetSwitchStatusSwitchStatusRequestReq = string;
/**
 * switchId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_SwitchIdReq".
 */
export type IDeleteById_SwitchIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MessageSwitchAddListRequest".
 */
export interface MessageSwitchAddListRequest {
  /**
   * 消息开关信息
   */
  messageSwitchAddRequestList?: MessageSwitchAddRequest[];
  [k: string]: any;
}
export interface MessageSwitchAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MessageSwitchAddRequest".
 */
export interface MessageSwitchAddRequest1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
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
 * via the `definition` "MessageSwitchDelByIdListRequest".
 */
export interface MessageSwitchDelByIdListRequest {
  /**
   * 批量删除-主键idList
   */
  switchIdList?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GetSwitchStatusResponse»".
 */
export interface BaseResponseGetSwitchStatusResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GetSwitchStatusResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GetSwitchStatusResponse {
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetSwitchStatusResponse".
 */
export interface GetSwitchStatusResponse1 {
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MessageSwitchListResponse»".
 */
export interface BaseResponseMessageSwitchListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MessageSwitchListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MessageSwitchListResponse {
  /**
   * 会员消息开关列表结果
   */
  messageSwitchVOList?: MessageSwitchVO[];
  [k: string]: any;
}
export interface MessageSwitchVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键id
   */
  switchId?: string;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MessageSwitchListResponse".
 */
export interface MessageSwitchListResponse1 {
  /**
   * 会员消息开关列表结果
   */
  messageSwitchVOList?: MessageSwitchVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MessageSwitchVO".
 */
export interface MessageSwitchVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键id
   */
  switchId?: string;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MessageSwitchPageRequest".
 */
export interface MessageSwitchPageRequest {
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
   * 删除标识 0未删除 1已删除
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
   * 主键id
   */
  switchId?: string;
  /**
   * 批量查询-主键idList
   */
  switchIdList?: string[];
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
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
 * via the `definition` "BaseResponse«MessageSwitchPageResponse»".
 */
export interface BaseResponseMessageSwitchPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MessageSwitchPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MessageSwitchPageResponse {
  messageSwitchVOPage?: MicroServicePageMessageSwitchVO;
  [k: string]: any;
}
/**
 * 会员消息开关分页结果
 */
export interface MicroServicePageMessageSwitchVO {
  /**
   * 具体数据内容
   */
  content?: MessageSwitchVO2[];
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
export interface MessageSwitchVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键id
   */
  switchId?: string;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
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
 * via the `definition` "MessageSwitchPageResponse".
 */
export interface MessageSwitchPageResponse1 {
  messageSwitchVOPage?: MicroServicePageMessageSwitchVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«MessageSwitchVO»".
 */
export interface MicroServicePageMessageSwitchVO1 {
  /**
   * 具体数据内容
   */
  content?: MessageSwitchVO2[];
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
 * via the `definition` "MessageSwitchModifyRequest".
 */
export interface MessageSwitchModifyRequest {
  /**
   * 主键id
   */
  switchId?: string;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IBatchAddRequestReq".
 */
export interface IBatchAddRequestReq {
  /**
   * 消息开关信息
   */
  messageSwitchAddRequestList?: MessageSwitchAddRequest[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-主键idList
   */
  switchIdList?: string[];
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
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标识 0未删除 1已删除
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
   * 主键id
   */
  switchId?: string;
  /**
   * 批量查询-主键idList
   */
  switchIdList?: string[];
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 开关类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息 6总开关
   */
  switchType?: number;
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
 * via the `definition` "IUpdateByIdModifyReqReq".
 */
export interface IUpdateByIdModifyReqReq {
  /**
   * 主键id
   */
  switchId?: string;
  /**
   * 开关状态 0关 1开
   */
  switchStatus?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
