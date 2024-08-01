import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultDoctorController';

/**
 *
 * 列表查询医生信息表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultDoctorListResponse> {
  let result = await sdk.post<ConsultDoctorListResponse>(
    '/consultdoctor/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询医生信息表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultDoctorPageResponse> {
  let result = await sdk.post<ConsultDoctorPageResponse>(
    '/consultdoctor/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询医生信息表
 *
 */
async function getById(
  doctorId: IGetByIdDoctorIdReq,
): Promise<ConsultDoctorByIdResponse> {
  let result = await sdk.get<ConsultDoctorByIdResponse>(
    '/consultdoctor/{doctorId}'.replace('{doctorId}', doctorId + ''),

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
 * doctorId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdDoctorIdReq".
 */
export type IGetByIdDoctorIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultDoctorListRequest".
 */
export interface ConsultDoctorListRequest {
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 批量查询-医生IdList
   */
  doctorIdList?: number[];
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
   * 职称
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
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultDoctorListResponse»".
 */
export interface BaseResponseConsultDoctorListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultDoctorListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultDoctorListResponse {
  /**
   * 医生信息表列表结果
   */
  consultDoctorVOList?: ConsultDoctorVO[];
  [k: string]: any;
}
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultDoctorListResponse".
 */
export interface ConsultDoctorListResponse1 {
  /**
   * 医生信息表列表结果
   */
  consultDoctorVOList?: ConsultDoctorVO[];
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
 * via the `definition` "ConsultDoctorPageRequest".
 */
export interface ConsultDoctorPageRequest {
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 批量查询-医生IdList
   */
  doctorIdList?: number[];
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
   * 职称
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
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultDoctorPageResponse»".
 */
export interface BaseResponseConsultDoctorPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultDoctorPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultDoctorPageResponse {
  consultDoctorVOPage?: MicroServicePageConsultDoctorVO;
  [k: string]: any;
}
/**
 * 医生信息表分页结果
 */
export interface MicroServicePageConsultDoctorVO {
  /**
   * 具体数据内容
   */
  content?: ConsultDoctorVO2[];
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
export interface ConsultDoctorVO2 {
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
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultDoctorPageResponse".
 */
export interface ConsultDoctorPageResponse1 {
  consultDoctorVOPage?: MicroServicePageConsultDoctorVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultDoctorVO»".
 */
export interface MicroServicePageConsultDoctorVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultDoctorVO2[];
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
 * via the `definition` "BaseResponse«ConsultDoctorByIdResponse»".
 */
export interface BaseResponseConsultDoctorByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultDoctorByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultDoctorByIdResponse {
  consultDoctorVO?: ConsultDoctorVO3;
  [k: string]: any;
}
/**
 * 医生信息表信息
 */
export interface ConsultDoctorVO3 {
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
 * via the `definition` "ConsultDoctorByIdResponse".
 */
export interface ConsultDoctorByIdResponse1 {
  consultDoctorVO?: ConsultDoctorVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 批量查询-医生IdList
   */
  doctorIdList?: number[];
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
   * 职称
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
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
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
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 批量查询-医生IdList
   */
  doctorIdList?: number[];
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
   * 职称
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
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
