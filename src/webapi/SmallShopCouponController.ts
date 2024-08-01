import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SmallShopCouponController';

/**
 *
 * 新增优购码
 *
 */
async function add(addReq: IAddAddReqReq): Promise<SmallShopCouponAddResponse> {
  let result = await sdk.post<SmallShopCouponAddResponse>(
    '/smallshopcoupon/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询优购码
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<SmallShopCouponPageResponse> {
  let result = await sdk.post<SmallShopCouponPageResponse>(
    '/smallshopcoupon/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 券码查询优购码信息
 *
 */
async function queryByCode(
  code: IQueryByCodeCodeReq,
): Promise<SmallShopCouponByCodeResp> {
  let result = await sdk.post<SmallShopCouponByCodeResp>(
    '/smallshopcoupon/query/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 更新分享次数
 *
 */
async function updateShareCount(id: IUpdateShareCountIdReq): Promise<unknown> {
  let result = await sdk.post(
    '/smallshopcoupon/updateShareCount/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询优购码
 *
 */
async function getById(
  id: IGetByIdIdReq,
): Promise<SmallShopCouponByIdResponse> {
  let result = await sdk.get<SmallShopCouponByIdResponse>(
    '/smallshopcoupon/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  getPage,

  queryByCode,

  updateShareCount,

  getById,
};

/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByCodeCodeReq".
 */
export type IQueryByCodeCodeReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateShareCountIdReq".
 */
export type IUpdateShareCountIdReq = number;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdIdReq".
 */
export type IGetByIdIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponAddRequest".
 */
export interface SmallShopCouponAddRequest {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
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
   * 分享次数
   */
  shareCount?: number;
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
   * 店铺ID
   */
  storeId: number;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCouponAddResponse»".
 */
export interface BaseResponseSmallShopCouponAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponAddResponse {
  smallShopCouponVO?: SmallShopCouponVO;
  [k: string]: any;
}
/**
 * 已新增的优购码信息
 */
export interface SmallShopCouponVO {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponAddResponse".
 */
export interface SmallShopCouponAddResponse1 {
  smallShopCouponVO?: SmallShopCouponVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponVO".
 */
export interface SmallShopCouponVO1 {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponPageRequest".
 */
export interface SmallShopCouponPageRequest {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建人
   */
  createPersons?: string[];
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
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 搜索条件:有效时间（为空表示长期有效）开始
   */
  endDataTimeBegin?: string;
  /**
   * 搜索条件:有效时间（为空表示长期有效）截止
   */
  endDataTimeEnd?: string;
  /**
   * 商品SPUID
   */
  goodsId?: string;
  /**
   * 批量查询-商品SPUIDList
   */
  goodsIdList?: string[];
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 批量查询-主键List
   */
  idList?: number[];
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
   * 分享次数
   */
  shareCount?: number;
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
 * via the `definition` "BaseResponse«SmallShopCouponPageResponse»".
 */
export interface BaseResponseSmallShopCouponPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponPageResponse {
  smallShopCouponVOPage?: MicroServicePageSmallShopCouponVO;
  [k: string]: any;
}
/**
 * 优购码分页结果
 */
export interface MicroServicePageSmallShopCouponVO {
  /**
   * 具体数据内容
   */
  content?: SmallShopCouponVO2[];
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
export interface SmallShopCouponVO2 {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponPageResponse".
 */
export interface SmallShopCouponPageResponse1 {
  smallShopCouponVOPage?: MicroServicePageSmallShopCouponVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«SmallShopCouponVO»".
 */
export interface MicroServicePageSmallShopCouponVO1 {
  /**
   * 具体数据内容
   */
  content?: SmallShopCouponVO2[];
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
 * via the `definition` "BaseResponse«SmallShopCouponByCodeResp»".
 */
export interface BaseResponseSmallShopCouponByCodeResp {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponByCodeResp;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponByCodeResp {
  smallShopCouponVO?: SmallShopCouponVO3;
  [k: string]: any;
}
/**
 * 已新增的优购码信息
 */
export interface SmallShopCouponVO3 {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponByCodeResp".
 */
export interface SmallShopCouponByCodeResp1 {
  smallShopCouponVO?: SmallShopCouponVO3;
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
 * via the `definition` "BaseResponse«SmallShopCouponByIdResponse»".
 */
export interface BaseResponseSmallShopCouponByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCouponByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCouponByIdResponse {
  smallShopCouponVO?: SmallShopCouponVO4;
  [k: string]: any;
}
/**
 * 优购码信息
 */
export interface SmallShopCouponVO4 {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime?: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 商品价格
   */
  goodsPrice?: number;
  /**
   * 是否已领取，0未领取，1已领取
   * * NO: 否
   * * YES: 是
   */
  haveToReceive?: 0 | 1;
  /**
   * 主键
   */
  id?: number;
  /**
   * 是否是微店主，0不是，1是
   * * NO: 否
   * * YES: 是
   */
  isOpenShop?: 0 | 1;
  /**
   * 分享次数
   */
  shareCount?: number;
  /**
   * 使用人次
   */
  userCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponByIdResponse".
 */
export interface SmallShopCouponByIdResponse1 {
  smallShopCouponVO?: SmallShopCouponVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 有效时间（为空表示长期有效）
   */
  endDataTime: string;
  /**
   * 商品SPUID
   */
  goodsId: string;
  /**
   * skuID
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
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
   * 分享次数
   */
  shareCount?: number;
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
   * 店铺ID
   */
  storeId: number;
  token?: string;
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
   * 优购码编码
   */
  couponCode?: string;
  /**
   * 优购码抵扣金额（只做显示用。订单抵扣时要重新计算）
   */
  couponPrice?: number;
  /**
   * 创建人账户
   */
  createAccount?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建人
   */
  createPersons?: string[];
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
   * 订单中抵扣的金额(包含退单)
   */
  deductibleAmount?: number;
  /**
   * 搜索条件:有效时间（为空表示长期有效）开始
   */
  endDataTimeBegin?: string;
  /**
   * 搜索条件:有效时间（为空表示长期有效）截止
   */
  endDataTimeEnd?: string;
  /**
   * 商品SPUID
   */
  goodsId?: string;
  /**
   * 批量查询-商品SPUIDList
   */
  goodsIdList?: string[];
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品编码
   */
  goodsNo?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 批量查询-主键List
   */
  idList?: number[];
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
   * 分享次数
   */
  shareCount?: number;
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
