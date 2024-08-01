import * as sdk from './fetch';

import isMock from './mock-util';
import {WMkit} from 'wmkit';
const controllerName = 'GrouponCenterController';

/**
 *
 * list
 *
 */
async function list(request: IListRequestReq): Promise<GrouponCenterListResponse> {
  let result = await sdk.post<GrouponCenterListResponse>(
    WMkit.isLogin() ? '/groupon/center/list' : '/groupon/center/unlogin/list',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  list,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponCenterListRequest".
 */
export interface GrouponCenterListRequest {
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 是否精选
   */
  sticky?: boolean;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponCenterListResponse»".
 */
export interface BaseResponseGrouponCenterListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponCenterListResponse;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GrouponCenterListResponse {
  grouponCenterVOList?: MicroServicePageGrouponCenterVO;
  [k: string]: any;
}
/**
 * 拼团活动首页列表查询列表结果
 */
export interface MicroServicePageGrouponCenterVO {
  /**
   * 具体数据内容
   */
  content?: GrouponCenterVO[];
  empty?: boolean;
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
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GrouponCenterVO {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * spu编号
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * sku编号
   */
  goodsInfoId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponCenterListResponse".
 */
export interface GrouponCenterListResponse1 {
  grouponCenterVOList?: MicroServicePageGrouponCenterVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GrouponCenterVO»".
 */
export interface MicroServicePageGrouponCenterVO1 {
  /**
   * 具体数据内容
   */
  content?: GrouponCenterVO[];
  empty?: boolean;
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
  sort?: Sort3;
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
 * via the `definition` "GrouponCenterVO".
 */
export interface GrouponCenterVO1 {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * spu编号
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * sku编号
   */
  goodsInfoId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListRequestReq".
 */
export interface IListRequestReq {
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 是否精选
   */
  sticky?: boolean;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
