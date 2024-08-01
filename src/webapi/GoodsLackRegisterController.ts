import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsLackRegisterController';

/**
 *
 * 新增到货通知表用户
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<GoodsLackRegisterAddResponse> {
  let result = await sdk.post<GoodsLackRegisterAddResponse>(
    '/lackRegister/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询到货通知订阅清单
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<GoodsLackRegisterListResponse> {
  let result = await sdk.post<GoodsLackRegisterListResponse>(
    '/lackRegister/listAll',

    {
      ...listReq,
    },
  );
  return result.context;
}

export default {
  add,

  getList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLackRegisterAddRequest".
 */
export interface GoodsLackRegisterAddRequest {
  /**
   * 联系电话
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 到货通知时间
   */
  lackRegisterNoticeTime?: string;
  /**
   * 登记时间
   */
  lackRegisterTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsLackRegisterAddResponse»".
 */
export interface BaseResponseGoodsLackRegisterAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsLackRegisterAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GoodsLackRegisterAddResponse {
  goodsLackRegisterVO?: GoodsLackRegisterVO;
  [k: string]: any;
}
/**
 * 已新增的到货通知订阅清单信息
 */
export interface GoodsLackRegisterVO {
  /**
   * 联系人名称
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * 登记商品名称
   */
  goodsInfoName?: string;
  /**
   * 登记商品sku编码
   */
  goodsInfoNo?: string;
  /**
   * lackRegisterId
   */
  lackRegisterId?: string;
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 到货通知时间
   */
  lackRegisterNoticeTime?: string;
  /**
   * 登记时间
   */
  lackRegisterTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLackRegisterAddResponse".
 */
export interface GoodsLackRegisterAddResponse1 {
  goodsLackRegisterVO?: GoodsLackRegisterVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLackRegisterVO".
 */
export interface GoodsLackRegisterVO1 {
  /**
   * 联系人名称
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * 登记商品名称
   */
  goodsInfoName?: string;
  /**
   * 登记商品sku编码
   */
  goodsInfoNo?: string;
  /**
   * lackRegisterId
   */
  lackRegisterId?: string;
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 到货通知时间
   */
  lackRegisterNoticeTime?: string;
  /**
   * 登记时间
   */
  lackRegisterTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLackRegisterListRequest".
 */
export interface GoodsLackRegisterListRequest {
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * lackRegisterId
   */
  lackRegisterId?: string;
  /**
   * 批量查询-lackRegisterIdList
   */
  lackRegisterIdList?: string[];
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 搜索条件:到货通知时间开始
   */
  lackRegisterNoticeTimeBegin?: string;
  /**
   * 搜索条件:到货通知时间截止
   */
  lackRegisterNoticeTimeEnd?: string;
  /**
   * 搜索条件:登记时间开始
   */
  lackRegisterTimeBegin?: string;
  /**
   * 搜索条件:登记时间截止
   */
  lackRegisterTimeEnd?: string;
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
 * via the `definition` "BaseResponse«GoodsLackRegisterListResponse»".
 */
export interface BaseResponseGoodsLackRegisterListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsLackRegisterListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GoodsLackRegisterListResponse {
  /**
   * 到货通知订阅清单列表结果
   */
  goodsLackRegisterVOList?: GoodsLackRegisterVO2[];
  [k: string]: any;
}
export interface GoodsLackRegisterVO2 {
  /**
   * 联系人名称
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * 登记商品名称
   */
  goodsInfoName?: string;
  /**
   * 登记商品sku编码
   */
  goodsInfoNo?: string;
  /**
   * lackRegisterId
   */
  lackRegisterId?: string;
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 到货通知时间
   */
  lackRegisterNoticeTime?: string;
  /**
   * 登记时间
   */
  lackRegisterTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLackRegisterListResponse".
 */
export interface GoodsLackRegisterListResponse1 {
  /**
   * 到货通知订阅清单列表结果
   */
  goodsLackRegisterVOList?: GoodsLackRegisterVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 联系电话
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 到货通知时间
   */
  lackRegisterNoticeTime?: string;
  /**
   * 登记时间
   */
  lackRegisterTime?: string;
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
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 登记客户Id
   */
  customerId?: string;
  /**
   * 删除标志，0否1是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登记商品skuId
   */
  goodsInfoId?: string;
  /**
   * lackRegisterId
   */
  lackRegisterId?: string;
  /**
   * 批量查询-lackRegisterIdList
   */
  lackRegisterIdList?: string[];
  /**
   * 0未通知，1已通知
   */
  lackRegisterNoticeStatus?: number;
  /**
   * 搜索条件:到货通知时间开始
   */
  lackRegisterNoticeTimeBegin?: string;
  /**
   * 搜索条件:到货通知时间截止
   */
  lackRegisterNoticeTimeEnd?: string;
  /**
   * 搜索条件:登记时间开始
   */
  lackRegisterTimeBegin?: string;
  /**
   * 搜索条件:登记时间截止
   */
  lackRegisterTimeEnd?: string;
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
