import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultRecordMessageController';

/**
 *
 * 新增咨询记录聊天详情
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<ConsultRecordMessageAddResponse> {
  let result = await sdk.post<ConsultRecordMessageAddResponse>(
    '/consultrecordmessage/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 校验聊天是否已关闭
 *
 */
async function checkRound(
  checkRequest: ICheckRoundCheckRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/consultrecordmessage/check-round',

    {
      ...checkRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除咨询记录聊天详情
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultrecordmessage/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出咨询记录聊天详情列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/consultrecordmessage/export/{encrypted}'.replace(
      '{encrypted}',
      encrypted + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询咨询记录聊天详情
 *
 */
async function getLists(
  listReq: IGetListsListReqReq,
): Promise<ConsultRecordMessageListResponse> {
  let result = await sdk.post<ConsultRecordMessageListResponse>(
    '/consultrecordmessage/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询咨询记录聊天详情
 *
 */
async function getList(
  consultRecordId: IGetListConsultRecordIdReq,
): Promise<ConsultRecordMessageListResponse> {
  let result = await sdk.get<ConsultRecordMessageListResponse>(
    '/consultrecordmessage/list/{consultRecordId}'.replace(
      '{consultRecordId}',
      consultRecordId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 修改咨询记录聊天详情
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<ConsultRecordMessageModifyResponse> {
  let result = await sdk.put<ConsultRecordMessageModifyResponse>(
    '/consultrecordmessage/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询咨询记录聊天详情
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultRecordMessagePageResponse> {
  let result = await sdk.post<ConsultRecordMessagePageResponse>(
    '/consultrecordmessage/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询咨询记录聊天详情
 *
 */
async function getById(
  messageId: IGetByIdMessageIdReq,
): Promise<ConsultRecordMessageByIdResponse> {
  let result = await sdk.get<ConsultRecordMessageByIdResponse>(
    '/consultrecordmessage/{messageId}'.replace('{messageId}', messageId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除咨询记录聊天详情
 *
 */
async function deleteById_(
  messageId: IDeleteById_MessageIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultrecordmessage/{messageId}'.replace('{messageId}', messageId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  checkRound,

  deleteByIdList_,

  exportData,

  getLists,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * encrypted
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * consultRecordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListConsultRecordIdReq".
 */
export type IGetListConsultRecordIdReq = string;
/**
 * messageId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdMessageIdReq".
 */
export type IGetByIdMessageIdReq = string;
/**
 * messageId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_MessageIdReq".
 */
export type IDeleteById_MessageIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageAddRequest".
 */
export interface ConsultRecordMessageAddRequest {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultRecordMessageAddResponse»".
 */
export interface BaseResponseConsultRecordMessageAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordMessageAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordMessageAddResponse {
  consultRecordMessageVO?: ConsultRecordMessageVO;
  [k: string]: any;
}
/**
 * 已新增的咨询记录聊天详情信息
 */
export interface ConsultRecordMessageVO {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageAddResponse".
 */
export interface ConsultRecordMessageAddResponse1 {
  consultRecordMessageVO?: ConsultRecordMessageVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageVO".
 */
export interface ConsultRecordMessageVO1 {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageCheckRequest".
 */
export interface ConsultRecordMessageCheckRequest {
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
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
 * via the `definition` "ConsultRecordMessageDelByIdListRequest".
 */
export interface ConsultRecordMessageDelByIdListRequest {
  /**
   * 批量删除-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageListRequest".
 */
export interface ConsultRecordMessageListRequest {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 搜索条件:创建时间  排序字段开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间  排序字段截止
   */
  createTimeEnd?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 批量查询-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
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
   * 对应唯一的咨询记录id
   */
  recordId?: string;
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
 * via the `definition` "BaseResponse«ConsultRecordMessageListResponse»".
 */
export interface BaseResponseConsultRecordMessageListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordMessageListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordMessageListResponse {
  /**
   * 咨询记录聊天详情列表结果
   */
  consultRecordMessageVOList?: ConsultRecordMessageVO2[];
  [k: string]: any;
}
export interface ConsultRecordMessageVO2 {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageListResponse".
 */
export interface ConsultRecordMessageListResponse1 {
  /**
   * 咨询记录聊天详情列表结果
   */
  consultRecordMessageVOList?: ConsultRecordMessageVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageModifyRequest".
 */
export interface ConsultRecordMessageModifyRequest {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultRecordMessageModifyResponse»".
 */
export interface BaseResponseConsultRecordMessageModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordMessageModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordMessageModifyResponse {
  consultRecordMessageVO?: ConsultRecordMessageVO3;
  [k: string]: any;
}
/**
 * 已修改的咨询记录聊天详情信息
 */
export interface ConsultRecordMessageVO3 {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageModifyResponse".
 */
export interface ConsultRecordMessageModifyResponse1 {
  consultRecordMessageVO?: ConsultRecordMessageVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessagePageRequest".
 */
export interface ConsultRecordMessagePageRequest {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 搜索条件:创建时间  排序字段开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间  排序字段截止
   */
  createTimeEnd?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 批量查询-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
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
   * 对应唯一的咨询记录id
   */
  recordId?: string;
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
 * via the `definition` "BaseResponse«ConsultRecordMessagePageResponse»".
 */
export interface BaseResponseConsultRecordMessagePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordMessagePageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordMessagePageResponse {
  consultRecordMessageVOPage?: MicroServicePageConsultRecordMessageVO;
  [k: string]: any;
}
/**
 * 咨询记录聊天详情分页结果
 */
export interface MicroServicePageConsultRecordMessageVO {
  /**
   * 具体数据内容
   */
  content?: ConsultRecordMessageVO4[];
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
export interface ConsultRecordMessageVO4 {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessagePageResponse".
 */
export interface ConsultRecordMessagePageResponse1 {
  consultRecordMessageVOPage?: MicroServicePageConsultRecordMessageVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultRecordMessageVO»".
 */
export interface MicroServicePageConsultRecordMessageVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultRecordMessageVO4[];
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
 * via the `definition` "BaseResponse«ConsultRecordMessageByIdResponse»".
 */
export interface BaseResponseConsultRecordMessageByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordMessageByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordMessageByIdResponse {
  consultRecordMessageVO?: ConsultRecordMessageVO5;
  [k: string]: any;
}
/**
 * 咨询记录聊天详情信息
 */
export interface ConsultRecordMessageVO5 {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 聊天回合数
   */
  round?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordMessageByIdResponse".
 */
export interface ConsultRecordMessageByIdResponse1 {
  consultRecordMessageVO?: ConsultRecordMessageVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckRoundCheckRequestReq".
 */
export interface ICheckRoundCheckRequestReq {
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListsListReqReq".
 */
export interface IGetListsListReqReq {
  /**
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 搜索条件:创建时间  排序字段开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间  排序字段截止
   */
  createTimeEnd?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 批量查询-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
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
   * 对应唯一的咨询记录id
   */
  recordId?: string;
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
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 创建时间  排序字段
   */
  createTime?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
  /**
   * 对应唯一的咨询记录id
   */
  recordId?: string;
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
   * 咨询的用户id
   */
  consultUserId?: string;
  /**
   * 搜索条件:创建时间  排序字段开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间  排序字段截止
   */
  createTimeEnd?: string;
  /**
   * 登录的用户id
   */
  customerId?: string;
  /**
   * 咨询的医生id
   */
  doctorId?: number;
  /**
   * 当前消息发起人的头像
   */
  messageAvatar?: string;
  /**
   * 消息内容
   */
  messageContent?: string;
  /**
   * 消息来源 0：咨询者  1：医生
   */
  messageFrom?: number;
  /**
   * 咨询记录聊天详情id
   */
  messageId?: string;
  /**
   * 批量查询-咨询记录聊天详情idList
   */
  messageIdList?: string[];
  /**
   * 当前消息发起人的名字
   */
  messageName?: string;
  /**
   * 消息类型 1：普通文本 2：图片 3：视频
   */
  messageType?: number;
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
   * 对应唯一的咨询记录id
   */
  recordId?: string;
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

//create by moon https://github.com/creasy2010/moon
