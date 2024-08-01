import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'AppMessageController';

/**
 *
 * 分页查询APP会员消息列表
 *
 */
async function getList(): Promise<AppAdvertisementListResponse> {
  let result = await sdk.get<AppAdvertisementListResponse>(
    '/appAdvertisement/list',

    {},
  );
  return result.context;
}

/**
 *
 * 批量修改APP会员消息未读为已读
 *
 */
async function batchUpdate(): Promise<unknown> {
  let result = await sdk.put(
    '/appMessage/batchUpdate',

    {},
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除APP会员消息表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/appMessage/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询APP会员未读消息数量列表
 *
 */
async function getUnreadMsgList(): Promise<unknown> {
  let result = await sdk.post<unknow>(
    '/appMessage/getUnreadMsgList',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询APP会员各类消息
 *
 */
async function getMessages(): Promise<AppMessageTypeVOArray> {
  let result = await sdk.post<AppMessageTypeVOArray>(
    '/appMessage/messages',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询APP会员消息列表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<AppMessagePageResponse> {
  let result = await sdk.post<AppMessagePageResponse>(
    '/appMessage/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改APP会员消息未读为已读
 *
 */
async function update(msgId: IUpdateMsgIdReq): Promise<unknown> {
  let result = await sdk.put(
    '/appMessage/update/{msgId}'.replace('{msgId}', msgId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 批量修改APP会员消息未读为已读
 *
 */
async function updateMsgByType(
  msgType: IUpdateMsgByTypeMsgTypeReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/appMessage/updateMsgByType/{msgType}'.replace('{msgType}', msgType + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询APP会员消息
 *
 */
async function getById(
  msgId: IGetByIdMsgIdReq,
): Promise<AppMessageByIdResponse> {
  let result = await sdk.get<AppMessageByIdResponse>(
    '/appMessage/{msgId}'.replace('{msgId}', msgId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除APP会员消息表
 *
 */
async function deleteById_(msgId: IDeleteById_MsgIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/appMessage/{msgId}'.replace('{msgId}', msgId + ''),

    {},
  );
  return result.context;
}

export default {
  getList,

  batchUpdate,

  deleteByIdList_,

  getUnreadMsgList,

  getMessages,

  getPage,

  update,

  updateMsgByType,

  getById,

  deleteById_,
};

/**
 * 内容
 */
export type unknow = {
  [k: string]: any;
}[];
/**
 * 内容
 */
export type AppMessageTypeVOArray = AppMessageTypeVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "unknow".
 */
export type unknow1 = {
  [k: string]: any;
}[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppMessageTypeVOArray".
 */
export type AppMessageTypeVOArray1 = AppMessageTypeVO2[];
/**
 * msgId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateMsgIdReq".
 */
export type IUpdateMsgIdReq = string;
/**
 * msgType
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateMsgByTypeMsgTypeReq".
 */
export type IUpdateMsgByTypeMsgTypeReq = string;
/**
 * msgId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdMsgIdReq".
 */
export type IGetByIdMsgIdReq = string;
/**
 * msgId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_MsgIdReq".
 */
export type IDeleteById_MsgIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AppAdvertisementListResponse»".
 */
export interface BaseResponseAppAdvertisementListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppAdvertisementListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AppAdvertisementListResponse {
  /**
   * 开机页广告列表结果
   */
  appAdvertisementVOList?: AppAdvertisementVO[];
  [k: string]: any;
}
export interface AppAdvertisementVO {
  /**
   * 广告id
   */
  advId?: string;
  /**
   * 是否显示,0:否1:是
   */
  advShow?: boolean;
  /**
   * 图标排序
   */
  advSort?: number;
  /**
   * 广告图片
   */
  advUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 跳转参数
   */
  jumpParams?: string;
  /**
   * 跳转类型
   */
  jumpType?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppAdvertisementListResponse".
 */
export interface AppAdvertisementListResponse1 {
  /**
   * 开机页广告列表结果
   */
  appAdvertisementVOList?: AppAdvertisementVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppAdvertisementVO".
 */
export interface AppAdvertisementVO1 {
  /**
   * 广告id
   */
  advId?: string;
  /**
   * 是否显示,0:否1:是
   */
  advShow?: boolean;
  /**
   * 图标排序
   */
  advSort?: number;
  /**
   * 广告图片
   */
  advUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 跳转参数
   */
  jumpParams?: string;
  /**
   * 跳转类型
   */
  jumpType?: string;
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
 * via the `definition` "AppMessageDelByIdListRequest".
 */
export interface AppMessageDelByIdListRequest {
  /**
   * 批量删除-消息idList
   */
  msgIdList?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«object»»".
 */
export interface BaseResponseListObject {
  /**
   * 结果码
   */
  code: string;
  context?: unknow;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«AppMessageTypeVO»»".
 */
export interface BaseResponseListAppMessageTypeVO {
  /**
   * 结果码
   */
  code: string;
  context?: AppMessageTypeVOArray;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
export interface AppMessageTypeVO {
  /**
   * 未读消息数量
   */
  msgNumber?: number;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppMessageTypeVO".
 */
export interface AppMessageTypeVO1 {
  /**
   * 未读消息数量
   */
  msgNumber?: number;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppMessagePageRequest".
 */
export interface AppMessagePageRequest {
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
   * 消息图片
   */
  imgUrl?: string;
  /**
   * 是否已读 0未读 1已读
   */
  isRead?: number;
  /**
   * 消息id
   */
  msgId?: string;
  /**
   * 批量查询-消息idList
   */
  msgIdList?: string[];
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
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
   * 跳转路由
   */
  routeName?: string;
  /**
   * 跳转参数
   */
  routeParam?: string;
  /**
   * 搜索条件:消息发送时间开始
   */
  sendTimeBegin?: string;
  /**
   * 搜索条件:消息发送时间截止
   */
  sendTimeEnd?: string;
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
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
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
 * via the `definition` "BaseResponse«AppMessagePageResponse»".
 */
export interface BaseResponseAppMessagePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppMessagePageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AppMessagePageResponse {
  appMessageVOPage?: MicroServicePageAppMessageVO;
  [k: string]: any;
}
/**
 * APP会员消息表分页结果
 */
export interface MicroServicePageAppMessageVO {
  /**
   * 具体数据内容
   */
  content?: AppMessageVO[];
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
export interface AppMessageVO {
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
   * 消息图片
   */
  imgUrl?: string;
  /**
   * 是否已读 0未读 1已读
   */
  isRead?: number;
  /**
   * 消息id
   */
  msgId?: string;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 跳转路由
   */
  routeName?: string;
  /**
   * 跳转参数
   */
  routeParam?: string;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
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
 * via the `definition` "AppMessagePageResponse".
 */
export interface AppMessagePageResponse1 {
  appMessageVOPage?: MicroServicePageAppMessageVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«AppMessageVO»".
 */
export interface MicroServicePageAppMessageVO1 {
  /**
   * 具体数据内容
   */
  content?: AppMessageVO[];
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
 * via the `definition` "AppMessageVO".
 */
export interface AppMessageVO1 {
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
   * 消息图片
   */
  imgUrl?: string;
  /**
   * 是否已读 0未读 1已读
   */
  isRead?: number;
  /**
   * 消息id
   */
  msgId?: string;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 跳转路由
   */
  routeName?: string;
  /**
   * 跳转参数
   */
  routeParam?: string;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
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
 * via the `definition` "BaseResponse«AppMessageByIdResponse»".
 */
export interface BaseResponseAppMessageByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppMessageByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AppMessageByIdResponse {
  appMessageVO?: AppMessageVO2;
  [k: string]: any;
}
/**
 * APP会员消息表信息
 */
export interface AppMessageVO2 {
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
   * 消息图片
   */
  imgUrl?: string;
  /**
   * 是否已读 0未读 1已读
   */
  isRead?: number;
  /**
   * 消息id
   */
  msgId?: string;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 跳转路由
   */
  routeName?: string;
  /**
   * 跳转参数
   */
  routeParam?: string;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppMessageByIdResponse".
 */
export interface AppMessageByIdResponse1 {
  appMessageVO?: AppMessageVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-消息idList
   */
  msgIdList?: string[];
  [k: string]: any;
}
export interface AppMessageTypeVO2 {
  /**
   * 未读消息数量
   */
  msgNumber?: number;
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
  /**
   * 消息发送时间
   */
  sendTime?: string;
  /**
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
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
   * 消息图片
   */
  imgUrl?: string;
  /**
   * 是否已读 0未读 1已读
   */
  isRead?: number;
  /**
   * 消息id
   */
  msgId?: string;
  /**
   * 批量查询-消息idList
   */
  msgIdList?: string[];
  /**
   * 消息类型 0优惠促销 1交易物流 2服务通知 3到货通知 4账户通知 5系统消息
   */
  msgType?: number;
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
   * 跳转路由
   */
  routeName?: string;
  /**
   * 跳转参数
   */
  routeParam?: string;
  /**
   * 搜索条件:消息发送时间开始
   */
  sendTimeBegin?: string;
  /**
   * 搜索条件:消息发送时间截止
   */
  sendTimeEnd?: string;
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
   * 消息内容
   */
  text?: string;
  /**
   * 消息标题
   */
  title?: string;
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
