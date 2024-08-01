import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultImageDataController';

/**
 *
 * 新增影像资料
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<ConsultImageDataAddResponse> {
  let result = await sdk.post<ConsultImageDataAddResponse>(
    '/consultimagedata/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除影像资料
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultimagedata/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出影像资料列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/consultimagedata/export/{encrypted}'.replace(
      '{encrypted}',
      encrypted + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询影像资料
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultImageDataListResponse> {
  let result = await sdk.post<ConsultImageDataListResponse>(
    '/consultimagedata/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改影像资料
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<ConsultImageDataModifyResponse> {
  let result = await sdk.put<ConsultImageDataModifyResponse>(
    '/consultimagedata/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询影像资料
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultImageDataPageResponse> {
  let result = await sdk.post<ConsultImageDataPageResponse>(
    '/consultimagedata/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询影像资料
 *
 */
async function getById(
  imageDataId: IGetByIdImageDataIdReq,
): Promise<ConsultImageDataByIdResponse> {
  let result = await sdk.get<ConsultImageDataByIdResponse>(
    '/consultimagedata/{imageDataId}'.replace(
      '{imageDataId}',
      imageDataId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除影像资料
 *
 */
async function deleteById_(
  imageDataId: IDeleteById_ImageDataIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultimagedata/{imageDataId}'.replace(
      '{imageDataId}',
      imageDataId + '',
    ),

    {},
  );
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * imageDataId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdImageDataIdReq".
 */
export type IGetByIdImageDataIdReq = number;
/**
 * imageDataId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_ImageDataIdReq".
 */
export type IDeleteById_ImageDataIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataAddRequest".
 */
export interface ConsultImageDataAddRequest {
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
   * 影像资料地址
   */
  imageDataUrl?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultImageDataAddResponse»".
 */
export interface BaseResponseConsultImageDataAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultImageDataAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultImageDataAddResponse {
  consultImageDataVO?: ConsultImageDataVO;
  [k: string]: any;
}
/**
 * 已新增的影像资料信息
 */
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
 * via the `definition` "ConsultImageDataAddResponse".
 */
export interface ConsultImageDataAddResponse1 {
  consultImageDataVO?: ConsultImageDataVO;
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
 * via the `definition` "ConsultImageDataDelByIdListRequest".
 */
export interface ConsultImageDataDelByIdListRequest {
  /**
   * 批量删除-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
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
 * via the `definition` "ConsultImageDataListRequest".
 */
export interface ConsultImageDataListRequest {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 搜索条件:生成时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:生成时间截止
   */
  createTimeEnd?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 批量查询-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultImageDataListResponse»".
 */
export interface BaseResponseConsultImageDataListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultImageDataListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultImageDataListResponse {
  /**
   * 影像资料列表结果
   */
  consultImageDataVOList?: ConsultImageDataVO2[];
  [k: string]: any;
}
export interface ConsultImageDataVO2 {
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
 * via the `definition` "ConsultImageDataListResponse".
 */
export interface ConsultImageDataListResponse1 {
  /**
   * 影像资料列表结果
   */
  consultImageDataVOList?: ConsultImageDataVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataModifyRequest".
 */
export interface ConsultImageDataModifyRequest {
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
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultImageDataModifyResponse»".
 */
export interface BaseResponseConsultImageDataModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultImageDataModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultImageDataModifyResponse {
  consultImageDataVO?: ConsultImageDataVO3;
  [k: string]: any;
}
/**
 * 已修改的影像资料信息
 */
export interface ConsultImageDataVO3 {
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
 * via the `definition` "ConsultImageDataModifyResponse".
 */
export interface ConsultImageDataModifyResponse1 {
  consultImageDataVO?: ConsultImageDataVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataPageRequest".
 */
export interface ConsultImageDataPageRequest {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 搜索条件:生成时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:生成时间截止
   */
  createTimeEnd?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 批量查询-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultImageDataPageResponse»".
 */
export interface BaseResponseConsultImageDataPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultImageDataPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultImageDataPageResponse {
  consultImageDataVOPage?: MicroServicePageConsultImageDataVO;
  [k: string]: any;
}
/**
 * 影像资料分页结果
 */
export interface MicroServicePageConsultImageDataVO {
  /**
   * 具体数据内容
   */
  content?: ConsultImageDataVO4[];
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
export interface ConsultImageDataVO4 {
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
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataPageResponse".
 */
export interface ConsultImageDataPageResponse1 {
  consultImageDataVOPage?: MicroServicePageConsultImageDataVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultImageDataVO»".
 */
export interface MicroServicePageConsultImageDataVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultImageDataVO4[];
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
 * via the `definition` "BaseResponse«ConsultImageDataByIdResponse»".
 */
export interface BaseResponseConsultImageDataByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultImageDataByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultImageDataByIdResponse {
  consultImageDataVO?: ConsultImageDataVO5;
  [k: string]: any;
}
/**
 * 影像资料信息
 */
export interface ConsultImageDataVO5 {
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
 * via the `definition` "ConsultImageDataByIdResponse".
 */
export interface ConsultImageDataByIdResponse1 {
  consultImageDataVO?: ConsultImageDataVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
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
   * 影像资料地址
   */
  imageDataUrl?: string;
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
   * 批量删除-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
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
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 搜索条件:生成时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:生成时间截止
   */
  createTimeEnd?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 批量查询-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
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
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 搜索条件:生成时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:生成时间截止
   */
  createTimeEnd?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 批量查询-咨询记录影像资料idList
   */
  imageDataIdList?: number[];
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
