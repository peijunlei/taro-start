import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerFootprintsController';

/**
 *
 * delByGoodsIdsAndTime
 *
 */
async function delByGoodsIdsAndTime(
  delRequest: IDelByGoodsIdsAndTimeDelRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/customer/footprints/batchDel',

    {
      ...delRequest,
    },
  );
  return result.context;
}

/**
 *
 * 浏览一次商品详情
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerFootprintsAddResponse> {
  let result = await sdk.post<CustomerFootprintsAddResponse>(
    '/customer/footprints/browse',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除会员浏览记录表
 *
 */
async function deleteByIdList(
  delByIdListReq: IDeleteByIdListDelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/customer/footprints/delete-by-ids',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出会员浏览记录表列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/customer/footprints/export/{encrypted}'.replace(
      '{encrypted}',
      encrypted + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询会员浏览记录表
 *
 */
async function getList(listRequest: IGetListListRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/footprints/list',

    {
      ...listRequest,
    },
  );
  return result.context;
}

/**
 *
 * 修改会员浏览记录表
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<CustomerFootprintsModifyResponse> {
  let result = await sdk.put<CustomerFootprintsModifyResponse>(
    '/customer/footprints/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员浏览记录表
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerFootprintsPageResponse> {
  let result = await sdk.post<CustomerFootprintsPageResponse>(
    '/customer/footprints/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员浏览记录表
 *
 */
async function getById(
  footprintId: IGetByIdFootprintIdReq,
): Promise<CustomerFootprintsByIdResponse> {
  let result = await sdk.get<CustomerFootprintsByIdResponse>(
    '/customer/footprints/{footprintId}'.replace(
      '{footprintId}',
      footprintId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除会员浏览记录表
 *
 */
async function deleteById_(
  footprintId: IDeleteById_FootprintIdReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/customer/footprints/{footprintId}'.replace(
      '{footprintId}',
      footprintId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  delByGoodsIdsAndTime,

  add,

  deleteByIdList,

  exportData,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type IDelByGoodsIdsAndTimeDelRequestReq = CustomerFootprintsDelByGoodsIdsAndTimeRequest[];
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDelByGoodsIdsAndTimeDelRequestReq".
 */
export type IDelByGoodsIdsAndTimeDelRequestReq1 = CustomerFootprintsDelByGoodsIdsAndTimeRequest2[];
/**
 * encrypted
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * footprintId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdFootprintIdReq".
 */
export type IGetByIdFootprintIdReq = string;
/**
 * footprintId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_FootprintIdReq".
 */
export type IDeleteById_FootprintIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
export interface CustomerFootprintsDelByGoodsIdsAndTimeRequest {
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 商品id
   */
  goodsIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsDelByGoodsIdsAndTimeRequest".
 */
export interface CustomerFootprintsDelByGoodsIdsAndTimeRequest1 {
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 商品id
   */
  goodsIds?: string[];
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
 * via the `definition` "CustomerFootprintsAddRequest".
 */
export interface CustomerFootprintsAddRequest {
  /**
   * 商品品牌Id
   */
  brandId?: number;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerFootprintsAddResponse»".
 */
export interface BaseResponseCustomerFootprintsAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFootprintsAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFootprintsAddResponse {
  customerFootprintsVO?: CustomerFootprintsVO;
  [k: string]: any;
}
/**
 * 已新增的会员浏览记录表信息
 */
export interface CustomerFootprintsVO {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 一级分类
   */
  firstCate?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 二级分类
   */
  secondCate?: string;
  /**
   * 三级分类
   */
  thirdCate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsAddResponse".
 */
export interface CustomerFootprintsAddResponse1 {
  customerFootprintsVO?: CustomerFootprintsVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsVO".
 */
export interface CustomerFootprintsVO1 {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 一级分类
   */
  firstCate?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 二级分类
   */
  secondCate?: string;
  /**
   * 三级分类
   */
  thirdCate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsDelByIdListRequest".
 */
export interface CustomerFootprintsDelByIdListRequest {
  /**
   * 批量删除-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsListRequest".
 */
export interface CustomerFootprintsListRequest {
  /**
   * 商品品牌Id
   */
  brandId?: number;
  /**
   * 搜索条件:浏览时间开始
   */
  browseTimeBegin?: string;
  /**
   * 搜索条件:浏览时间截止
   */
  browseTimeEnd?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 批量查询-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 搜索条件:修改时间开始
   */
  modifiedTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  modifiedTimeEnd?: string;
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
 * via the `definition` "CustomerFootprintsModifyRequest".
 */
export interface CustomerFootprintsModifyRequest {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerFootprintsModifyResponse»".
 */
export interface BaseResponseCustomerFootprintsModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFootprintsModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFootprintsModifyResponse {
  customerFootprintsVO?: CustomerFootprintsVO2;
  [k: string]: any;
}
/**
 * 已修改的会员浏览记录表信息
 */
export interface CustomerFootprintsVO2 {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 一级分类
   */
  firstCate?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 二级分类
   */
  secondCate?: string;
  /**
   * 三级分类
   */
  thirdCate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsModifyResponse".
 */
export interface CustomerFootprintsModifyResponse1 {
  customerFootprintsVO?: CustomerFootprintsVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsPageRequest".
 */
export interface CustomerFootprintsPageRequest {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 搜索条件:浏览时间开始
   */
  browseTimeBegin?: string;
  /**
   * 搜索条件:浏览时间截止
   */
  browseTimeEnd?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 批量查询-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 搜索条件:修改时间开始
   */
  modifiedTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  modifiedTimeEnd?: string;
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
 * via the `definition` "BaseResponse«CustomerFootprintsPageResponse»".
 */
export interface BaseResponseCustomerFootprintsPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFootprintsPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFootprintsPageResponse {
  customerFootprintsVOPage?: MicroServicePageCustomerFootprintsVO;
  [k: string]: any;
}
/**
 * 会员浏览记录表分页结果
 */
export interface MicroServicePageCustomerFootprintsVO {
  /**
   * 具体数据内容
   */
  content?: CustomerFootprintsVO3[];
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
export interface CustomerFootprintsVO3 {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 一级分类
   */
  firstCate?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 二级分类
   */
  secondCate?: string;
  /**
   * 三级分类
   */
  thirdCate?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsPageResponse".
 */
export interface CustomerFootprintsPageResponse1 {
  customerFootprintsVOPage?: MicroServicePageCustomerFootprintsVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerFootprintsVO»".
 */
export interface MicroServicePageCustomerFootprintsVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerFootprintsVO3[];
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
 * via the `definition` "BaseResponse«CustomerFootprintsByIdResponse»".
 */
export interface BaseResponseCustomerFootprintsByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFootprintsByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerFootprintsByIdResponse {
  customerFootprintsVO?: CustomerFootprintsVO4;
  [k: string]: any;
}
/**
 * 会员浏览记录表信息
 */
export interface CustomerFootprintsVO4 {
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 一级分类
   */
  firstCate?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 二级分类
   */
  secondCate?: string;
  /**
   * 三级分类
   */
  thirdCate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFootprintsByIdResponse".
 */
export interface CustomerFootprintsByIdResponse1 {
  customerFootprintsVO?: CustomerFootprintsVO4;
  [k: string]: any;
}
export interface CustomerFootprintsDelByGoodsIdsAndTimeRequest2 {
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 商品id
   */
  goodsIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 商品品牌Id
   */
  brandId?: number;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdListDelByIdListReqReq".
 */
export interface IDeleteByIdListDelByIdListReqReq {
  /**
   * 批量删除-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListRequestReq".
 */
export interface IGetListListRequestReq {
  /**
   * 商品品牌Id
   */
  brandId?: number;
  /**
   * 搜索条件:浏览时间开始
   */
  browseTimeBegin?: string;
  /**
   * 搜索条件:浏览时间截止
   */
  browseTimeEnd?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 批量查询-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 搜索条件:修改时间开始
   */
  modifiedTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  modifiedTimeEnd?: string;
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
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 浏览时间
   */
  browseTime?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 修改时间
   */
  modifiedTime?: string;
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
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 搜索条件:浏览时间开始
   */
  browseTimeBegin?: string;
  /**
   * 搜索条件:浏览时间截止
   */
  browseTimeEnd?: string;
  /**
   * 浏览渠道 0是pc,1是APP,2是H5,3是小程序
   */
  browseType?: number;
  /**
   * 商品分类id
   */
  cateId?: number;
  /**
   * 客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
  /**
   * footprintId
   */
  footprintId?: string;
  /**
   * 批量查询-footprintIdList
   */
  footprintIdList?: string[];
  /**
   * 商品Id
   */
  goodsId?: string;
  /**
   * 商品主图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 搜索条件:修改时间开始
   */
  modifiedTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
   */
  modifiedTimeEnd?: string;
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
