import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultUserController';

/**
 *
 * 新增就诊人信息表
 *
 */
async function add(addReq: IAddAddReqReq): Promise<ConsultUserAddResponse> {
  let result = await sdk.post<ConsultUserAddResponse>(
    '/consultuser/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 免费问诊剩余数量减1
 *
 */
async function decreaseFreeConsultLimitNum(): Promise<unknown> {
  let result = await sdk.get(
    '/consultuser/decrease-free-consult-limit-num',

    {},
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除就诊人信息表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultuser/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 获取当前免费问诊剩余数量
 *
 */
async function getFreeConsultLimitNum(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/consultuser/get-free-consult-limit-num',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询就诊人信息表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultUserListResponse> {
  let result = await sdk.post<ConsultUserListResponse>(
    '/consultuser/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改就诊人信息表
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<ConsultUserModifyResponse> {
  let result = await sdk.put<ConsultUserModifyResponse>(
    '/consultuser/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询就诊人信息表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultUserPageResponse> {
  let result = await sdk.post<ConsultUserPageResponse>(
    '/consultuser/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询就诊人信息表
 *
 */
async function getById(
  userId: IGetByIdUserIdReq,
): Promise<ConsultUserByIdResponse> {
  let result = await sdk.get<ConsultUserByIdResponse>(
    '/consultuser/{userId}'.replace('{userId}', userId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除就诊人信息表
 *
 */
async function deleteById_(userId: IDeleteById_UserIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultuser/{userId}'.replace('{userId}', userId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  decreaseFreeConsultLimitNum,

  deleteByIdList_,

  getFreeConsultLimitNum,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;
/**
 * userId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdUserIdReq".
 */
export type IGetByIdUserIdReq = string;
/**
 * userId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_UserIdReq".
 */
export type IDeleteById_UserIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserAddRequest".
 */
export interface ConsultUserAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultUserAddResponse»".
 */
export interface BaseResponseConsultUserAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultUserAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultUserAddResponse {
  consultUserVO?: ConsultUserVO;
  [k: string]: any;
}
/**
 * 已新增的就诊人信息表信息
 */
export interface ConsultUserVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserAddResponse".
 */
export interface ConsultUserAddResponse1 {
  consultUserVO?: ConsultUserVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserVO".
 */
export interface ConsultUserVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
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
 * via the `definition` "ConsultUserDelByIdListRequest".
 */
export interface ConsultUserDelByIdListRequest {
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 批量删除-就诊人idList
   */
  userIdList?: string[];
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserListRequest".
 */
export interface ConsultUserListRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
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
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
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
   * 就诊人id
   */
  userId?: string;
  /**
   * 批量查询-就诊人idList
   */
  userIdList?: string[];
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultUserListResponse»".
 */
export interface BaseResponseConsultUserListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultUserListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultUserListResponse {
  /**
   * 就诊人信息表列表结果
   */
  consultUserVOList?: ConsultUserVO2[];
  [k: string]: any;
}
export interface ConsultUserVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserListResponse".
 */
export interface ConsultUserListResponse1 {
  /**
   * 就诊人信息表列表结果
   */
  consultUserVOList?: ConsultUserVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserModifyRequest".
 */
export interface ConsultUserModifyRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultUserModifyResponse»".
 */
export interface BaseResponseConsultUserModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultUserModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultUserModifyResponse {
  consultUserVO?: ConsultUserVO3;
  [k: string]: any;
}
/**
 * 已修改的就诊人信息表信息
 */
export interface ConsultUserVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserModifyResponse".
 */
export interface ConsultUserModifyResponse1 {
  consultUserVO?: ConsultUserVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserPageRequest".
 */
export interface ConsultUserPageRequest {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
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
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
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
   * 就诊人id
   */
  userId?: string;
  /**
   * 批量查询-就诊人idList
   */
  userIdList?: string[];
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultUserPageResponse»".
 */
export interface BaseResponseConsultUserPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultUserPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultUserPageResponse {
  consultUserVOPage?: MicroServicePageConsultUserVO;
  [k: string]: any;
}
/**
 * 就诊人信息表分页结果
 */
export interface MicroServicePageConsultUserVO {
  /**
   * 具体数据内容
   */
  content?: ConsultUserVO4[];
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
export interface ConsultUserVO4 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserPageResponse".
 */
export interface ConsultUserPageResponse1 {
  consultUserVOPage?: MicroServicePageConsultUserVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultUserVO»".
 */
export interface MicroServicePageConsultUserVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultUserVO4[];
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
 * via the `definition` "BaseResponse«ConsultUserByIdResponse»".
 */
export interface BaseResponseConsultUserByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultUserByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultUserByIdResponse {
  consultUserVO?: ConsultUserVO5;
  [k: string]: any;
}
/**
 * 就诊人信息表信息
 */
export interface ConsultUserVO5 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultUserByIdResponse".
 */
export interface ConsultUserByIdResponse1 {
  consultUserVO?: ConsultUserVO5;
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
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 批量删除-就诊人idList
   */
  userIdList?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
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
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
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
   * 就诊人id
   */
  userId?: string;
  /**
   * 批量查询-就诊人idList
   */
  userIdList?: string[];
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyModifyReqReq".
 */
export interface IModifyModifyReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id
   */
  userId?: string;
  /**
   * 就诊人姓名
   */
  userName?: string;
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
   * 用户id(当前登录人)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 身份证号
   */
  idCard?: string;
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
   * 就诊人年龄
   */
  patientAge?: number;
  /**
   * 就诊人性别(0:未知,1男,2女)
   * * FREE: 0:未知
   * * MAN: 1:男
   * * WOMAN: 2:女
   */
  patientGender?: 0 | 1 | 2;
  /**
   * 患者与您的关系（0自己、1父母、2子女、3爱人、4朋友、5其他亲属）
   * * OWN: 0:自己
   * * PARENT: 1:父母
   * * CHILDREN: 2:子女
   * * LOVER: 3:爱人
   * * FRIENDS: 4:朋友
   * * OTHERS: 5:其他亲属
   */
  relation?: 0 | 1 | 2 | 3 | 4 | 5;
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
   * 就诊人id
   */
  userId?: string;
  /**
   * 批量查询-就诊人idList
   */
  userIdList?: string[];
  /**
   * 就诊人姓名
   */
  userName?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
