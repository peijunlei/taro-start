import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultRecordController';

/**
 *
 * 新增咨询记录表
 *
 */
async function add(addReq: IAddAddReqReq): Promise<ConsultRecordAddResponse> {
  let result = await sdk.post<ConsultRecordAddResponse>(
    '/consultrecord/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除咨询记录表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultrecord/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询咨询记录表
 *
 */
async function getConsultRecordList(): Promise<ConsultRecordListResponse> {
  let result = await sdk.get<ConsultRecordListResponse>(
    '/consultrecord/getConsultRecordList',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询咨询记录表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultRecordListResponse> {
  let result = await sdk.post<ConsultRecordListResponse>(
    '/consultrecord/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改咨询记录表
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<ConsultRecordModifyResponse> {
  let result = await sdk.put<ConsultRecordModifyResponse>(
    '/consultrecord/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询咨询记录表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultRecordPageResponse> {
  let result = await sdk.post<ConsultRecordPageResponse>(
    '/consultrecord/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询咨询记录表
 *
 */
async function getById(
  consultRecordId: IGetByIdConsultRecordIdReq,
): Promise<ConsultRecordByIdResponse> {
  let result = await sdk.get<ConsultRecordByIdResponse>(
    '/consultrecord/{consultRecordId}'.replace(
      '{consultRecordId}',
      consultRecordId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除咨询记录表
 *
 */
async function deleteById_(
  consultRecordId: IDeleteById_ConsultRecordIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultrecord/{consultRecordId}'.replace(
      '{consultRecordId}',
      consultRecordId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  deleteByIdList_,

  getConsultRecordList,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * consultRecordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdConsultRecordIdReq".
 */
export type IGetByIdConsultRecordIdReq = string;
/**
 * consultRecordId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_ConsultRecordIdReq".
 */
export type IDeleteById_ConsultRecordIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordAddRequest".
 */
export interface ConsultRecordAddRequest {
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 影像资料
   */
  imageList?: string[];
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultRecordAddResponse»".
 */
export interface BaseResponseConsultRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordAddResponse {
  consultRecordVO?: ConsultRecordVO;
  [k: string]: any;
}
/**
 * 已新增的咨询记录表信息
 */
export interface ConsultRecordVO {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 医师对象
 */
export interface ConsultDoctorVO {
  /**
   * 调整价格状态 （  0：调升  1:调降）
   */
  adjustFlag?: number;
  /**
   * 调整比例
   */
  adjustRatio?: number;
  /**
   * 医生头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生Id
   */
  doctorId?: number;
  /**
   * 医生姓名
   */
  doctorName?: string;
  /**
   * 医院名称
   */
  hospital?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 个人简介
   */
  intro?: string;
  /**
   * 是否下线(暂停提供服务： 0否，1是)
   * * NO: 否
   * * YES: 是
   */
  isSuspended?: 0 | 1;
  /**
   * 是否收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 问诊价格
   */
  price?: number;
  /**
   * 医生星级评分，1-5星，可能有0.5的小数
   */
  score?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 专业擅长
   */
  skills?: string;
  /**
   * 职称
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
export interface ConsultImageDataVO {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 生成时间
   */
  createTime?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordAddResponse".
 */
export interface ConsultRecordAddResponse1 {
  consultRecordVO?: ConsultRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordVO".
 */
export interface ConsultRecordVO1 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultDoctorVO".
 */
export interface ConsultDoctorVO1 {
  /**
   * 调整价格状态 （  0：调升  1:调降）
   */
  adjustFlag?: number;
  /**
   * 调整比例
   */
  adjustRatio?: number;
  /**
   * 医生头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生Id
   */
  doctorId?: number;
  /**
   * 医生姓名
   */
  doctorName?: string;
  /**
   * 医院名称
   */
  hospital?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 个人简介
   */
  intro?: string;
  /**
   * 是否下线(暂停提供服务： 0否，1是)
   * * NO: 否
   * * YES: 是
   */
  isSuspended?: 0 | 1;
  /**
   * 是否收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 问诊价格
   */
  price?: number;
  /**
   * 医生星级评分，1-5星，可能有0.5的小数
   */
  score?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 专业擅长
   */
  skills?: string;
  /**
   * 职称
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataVO".
 */
export interface ConsultImageDataVO1 {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 生成时间
   */
  createTime?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordDelByIdListRequest".
 */
export interface ConsultRecordDelByIdListRequest {
  /**
   * 批量删除-咨询记录idList
   */
  consultRecordIdList?: string[];
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
 * via the `definition` "BaseResponse«ConsultRecordListResponse»".
 */
export interface BaseResponseConsultRecordListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordListResponse {
  /**
   * 咨询记录表列表结果
   */
  consultRecordVOList?: ConsultRecordVO2[];
  [k: string]: any;
}
export interface ConsultRecordVO2 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordListResponse".
 */
export interface ConsultRecordListResponse1 {
  /**
   * 咨询记录表列表结果
   */
  consultRecordVOList?: ConsultRecordVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordListRequest".
 */
export interface ConsultRecordListRequest {
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 批量查询-咨询记录idList
   */
  consultRecordIdList?: string[];
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
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
   * 病情描述
   */
  question?: string;
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
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordModifyRequest".
 */
export interface ConsultRecordModifyRequest {
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultRecordModifyResponse»".
 */
export interface BaseResponseConsultRecordModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordModifyResponse {
  consultRecordVO?: ConsultRecordVO3;
  [k: string]: any;
}
/**
 * 已修改的咨询记录表信息
 */
export interface ConsultRecordVO3 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordModifyResponse".
 */
export interface ConsultRecordModifyResponse1 {
  consultRecordVO?: ConsultRecordVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordPageRequest".
 */
export interface ConsultRecordPageRequest {
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 批量查询-咨询记录idList
   */
  consultRecordIdList?: string[];
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
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
   * 病情描述
   */
  question?: string;
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
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultRecordPageResponse»".
 */
export interface BaseResponseConsultRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordPageResponse {
  consultRecordVOPage?: MicroServicePageConsultRecordVO;
  [k: string]: any;
}
/**
 * 咨询记录表分页结果
 */
export interface MicroServicePageConsultRecordVO {
  /**
   * 具体数据内容
   */
  content?: ConsultRecordVO4[];
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
export interface ConsultRecordVO4 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordPageResponse".
 */
export interface ConsultRecordPageResponse1 {
  consultRecordVOPage?: MicroServicePageConsultRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultRecordVO»".
 */
export interface MicroServicePageConsultRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultRecordVO4[];
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
 * via the `definition` "BaseResponse«ConsultRecordByIdResponse»".
 */
export interface BaseResponseConsultRecordByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultRecordByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultRecordByIdResponse {
  consultRecordVO?: ConsultRecordVO5;
  [k: string]: any;
}
/**
 * 咨询记录表信息
 */
export interface ConsultRecordVO5 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordByIdResponse".
 */
export interface ConsultRecordByIdResponse1 {
  consultRecordVO?: ConsultRecordVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 影像资料
   */
  imageList?: string[];
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
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
   * 批量删除-咨询记录idList
   */
  consultRecordIdList?: string[];
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
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 批量查询-咨询记录idList
   */
  consultRecordIdList?: string[];
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
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
   * 病情描述
   */
  question?: string;
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
   * 就诊人id(一个登录用户可以添加多个就诊人)
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
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
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
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 批量查询-咨询记录idList
   */
  consultRecordIdList?: string[];
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
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
   * 病情描述
   */
  question?: string;
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
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
