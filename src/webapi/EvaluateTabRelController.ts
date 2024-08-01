import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'EvaluateTabRelController';

/**
 *
 * 新增评价标签关联表
 *
 */
async function add(addReq: IAddAddReqReq): Promise<EvaluateTabRelAddResponse> {
  let result = await sdk.post<EvaluateTabRelAddResponse>(
    '/evaluatetabrel/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除评价标签关联表
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/evaluatetabrel/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出评价标签关联表列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/evaluatetabrel/export/{encrypted}'.replace('{encrypted}', encrypted + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询评价标签关联表
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<EvaluateTabRelListResponse> {
  let result = await sdk.post<EvaluateTabRelListResponse>(
    '/evaluatetabrel/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改评价标签关联表
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<EvaluateTabRelModifyResponse> {
  let result = await sdk.put<EvaluateTabRelModifyResponse>(
    '/evaluatetabrel/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询评价标签关联表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<EvaluateTabRelPageResponse> {
  let result = await sdk.post<EvaluateTabRelPageResponse>(
    '/evaluatetabrel/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询评价标签关联表
 *
 */
async function getById(
  evaluateTabId: IGetByIdEvaluateTabIdReq,
): Promise<EvaluateTabRelByIdResponse> {
  let result = await sdk.get<EvaluateTabRelByIdResponse>(
    '/evaluatetabrel/{evaluateTabId}'.replace(
      '{evaluateTabId}',
      evaluateTabId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除评价标签关联表
 *
 */
async function deleteById_(
  evaluateTabId: IDeleteById_EvaluateTabIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/evaluatetabrel/{evaluateTabId}'.replace(
      '{evaluateTabId}',
      evaluateTabId + '',
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
 * evaluateTabId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdEvaluateTabIdReq".
 */
export type IGetByIdEvaluateTabIdReq = number;
/**
 * evaluateTabId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_EvaluateTabIdReq".
 */
export type IDeleteById_EvaluateTabIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelAddRequest".
 */
export interface EvaluateTabRelAddRequest {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 标签id
   */
  tabId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EvaluateTabRelAddResponse»".
 */
export interface BaseResponseEvaluateTabRelAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateTabRelAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EvaluateTabRelAddResponse {
  evaluateTabRelVO?: EvaluateTabRelVO;
  [k: string]: any;
}
/**
 * 已新增的评价标签关联表信息
 */
export interface EvaluateTabRelVO {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
/**
 * 评价具体信息
 */
export interface GoodsEvaluateVO {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  goodsInfoNo?: string;
  headImage?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  isVeryUseful?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsEvaluateImageVO {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsEvaluate?: GoodsEvaluateVO1;
  goodsId?: string;
  imageId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsEvaluateVO1 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  goodsInfoNo?: string;
  headImage?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  isVeryUseful?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsImageVO {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelAddResponse".
 */
export interface EvaluateTabRelAddResponse1 {
  evaluateTabRelVO?: EvaluateTabRelVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelVO".
 */
export interface EvaluateTabRelVO1 {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateVO".
 */
export interface GoodsEvaluateVO2 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  goodsInfoNo?: string;
  headImage?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  isVeryUseful?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateImageVO".
 */
export interface GoodsEvaluateImageVO1 {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsEvaluate?: GoodsEvaluateVO1;
  goodsId?: string;
  imageId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsImageVO".
 */
export interface GoodsImageVO1 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelDelByIdListRequest".
 */
export interface EvaluateTabRelDelByIdListRequest {
  /**
   * 批量删除-关联表主键List
   */
  evaluateTabIdList?: number[];
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
 * via the `definition` "EvaluateTabRelListRequest".
 */
export interface EvaluateTabRelListRequest {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 批量查询-关联表主键List
   */
  evaluateTabIdList?: number[];
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
   * 标签id
   */
  tabId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EvaluateTabRelListResponse»".
 */
export interface BaseResponseEvaluateTabRelListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateTabRelListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EvaluateTabRelListResponse {
  /**
   * 评价标签关联表列表结果
   */
  evaluateTabRelVOList?: EvaluateTabRelVO2[];
  [k: string]: any;
}
export interface EvaluateTabRelVO2 {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelListResponse".
 */
export interface EvaluateTabRelListResponse1 {
  /**
   * 评价标签关联表列表结果
   */
  evaluateTabRelVOList?: EvaluateTabRelVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelModifyRequest".
 */
export interface EvaluateTabRelModifyRequest {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 标签id
   */
  tabId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EvaluateTabRelModifyResponse»".
 */
export interface BaseResponseEvaluateTabRelModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateTabRelModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EvaluateTabRelModifyResponse {
  evaluateTabRelVO?: EvaluateTabRelVO3;
  [k: string]: any;
}
/**
 * 已修改的评价标签关联表信息
 */
export interface EvaluateTabRelVO3 {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelModifyResponse".
 */
export interface EvaluateTabRelModifyResponse1 {
  evaluateTabRelVO?: EvaluateTabRelVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelPageRequest".
 */
export interface EvaluateTabRelPageRequest {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 批量查询-关联表主键List
   */
  evaluateTabIdList?: number[];
  /**
   * 评价时间
   */
  evaluateTime?: string;
  /**
   * 商品spuId
   */
  goodsId?: string;
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
   * 标签id
   */
  tabId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EvaluateTabRelPageResponse»".
 */
export interface BaseResponseEvaluateTabRelPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateTabRelPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EvaluateTabRelPageResponse {
  evaluateTabRelVOPage?: MicroServicePageEvaluateTabRelVO;
  [k: string]: any;
}
/**
 * 评价标签关联表分页结果
 */
export interface MicroServicePageEvaluateTabRelVO {
  /**
   * 具体数据内容
   */
  content?: EvaluateTabRelVO4[];
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
export interface EvaluateTabRelVO4 {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelPageResponse".
 */
export interface EvaluateTabRelPageResponse1 {
  evaluateTabRelVOPage?: MicroServicePageEvaluateTabRelVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«EvaluateTabRelVO»".
 */
export interface MicroServicePageEvaluateTabRelVO1 {
  /**
   * 具体数据内容
   */
  content?: EvaluateTabRelVO4[];
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
 * via the `definition` "BaseResponse«EvaluateTabRelByIdResponse»".
 */
export interface BaseResponseEvaluateTabRelByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateTabRelByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EvaluateTabRelByIdResponse {
  evaluateTabRelVO?: EvaluateTabRelVO5;
  [k: string]: any;
}
/**
 * 评价标签关联表信息
 */
export interface EvaluateTabRelVO5 {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 评价时间
   */
  evaluateTime?: string;
  goodsEvaluate?: GoodsEvaluateVO;
  /**
   * 标签id
   */
  tabId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateTabRelByIdResponse".
 */
export interface EvaluateTabRelByIdResponse1 {
  evaluateTabRelVO?: EvaluateTabRelVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 标签id
   */
  tabId?: string;
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
   * 批量删除-关联表主键List
   */
  evaluateTabIdList?: number[];
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
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 批量查询-关联表主键List
   */
  evaluateTabIdList?: number[];
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
   * 标签id
   */
  tabId?: string;
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
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 标签id
   */
  tabId?: string;
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
   * 商品评价id
   */
  evaluateId?: string;
  /**
   * 关联表主键
   */
  evaluateTabId?: number;
  /**
   * 批量查询-关联表主键List
   */
  evaluateTabIdList?: number[];
  /**
   * 评价时间
   */
  evaluateTime?: string;
  /**
   * 商品spuId
   */
  goodsId?: string;
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
   * 标签id
   */
  tabId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
