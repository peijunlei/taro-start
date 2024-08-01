import * as sdk from './fetch';

import isMock from './mock-util';
const serverInfo = '';
const controllerName = 'GrouponGoodsController';

/**
 *
 * 分页查询拼团商品
 *
 */
async function page(pageRequest: IPagePageRequestReq): Promise<GrouponGoodsInfoSimplePageResponse> {
  let result = await sdk.post<GrouponGoodsInfoSimplePageResponse>(
    '/groupon/goods/page',
    {
      ...pageRequest,
    },
    {serverInfo, controllerName},
  );
  return result.context;
}

export default {
  page,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface GrouponGoodsInfoSimplePageRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量商品skuId
   */
  goodsInfoIds?: string[];
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 是否显示规格
   */
  havSpecTextFlag?: boolean;
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
   * 排序标识
   */
  sortFlag?: number;
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
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponGoodsInfoSimplePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponGoodsInfoSimplePageResponse;
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
export interface GrouponGoodsInfoSimplePageResponse {
  grouponGoodsVOS?: MicroServicePageGrouponGoodsVO;
  [k: string]: any;
}
/**
 * 拼团活动spu列表
 */
export interface MicroServicePageGrouponGoodsVO {
  /**
   * 具体数据内容
   */
  content?: GrouponGoodsVO[];
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
export interface GrouponGoodsVO {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * SPU编号
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 拼团活动ID
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
  /**
   * 拼团订单数量
   */
  orderSalesNum?: number;
  /**
   * 商品规格
   */
  specText?: string;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface GrouponGoodsInfoSimplePageResponse1 {
  grouponGoodsVOS?: MicroServicePageGrouponGoodsVO;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageGrouponGoodsVO1 {
  /**
   * 具体数据内容
   */
  content?: GrouponGoodsVO[];
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
 */
export interface GrouponGoodsVO1 {
  /**
   * 已成团人数
   */
  alreadyGrouponNum?: number;
  /**
   * SPU编号
   */
  goodsId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * spu商品名称
   */
  goodsName?: string;
  /**
   * 拼团活动ID
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
  /**
   * 拼团订单数量
   */
  orderSalesNum?: number;
  /**
   * 商品规格
   */
  specText?: string;
  [k: string]: any;
}
/**
 */
export interface IPagePageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量商品skuId
   */
  goodsInfoIds?: string[];
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 是否显示规格
   */
  havSpecTextFlag?: boolean;
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
   * 排序标识
   */
  sortFlag?: number;
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
