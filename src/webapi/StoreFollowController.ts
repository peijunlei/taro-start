import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreFollowController';

/**
 *
 * 获取店铺关注列表
 *
 */
async function info(request: IInfoRequestReq): Promise<MicroServicePageStoreCustomerFollowVO> {
  let result = await sdk.post<MicroServicePageStoreCustomerFollowVO>(
    '/store/storeFollows',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  info,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustomerFollowRequest".
 */
export interface StoreCustomerFollowRequest {
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺ID
   */
  storeIds?: number[];
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
 * via the `definition` "BaseResponse«MicroServicePage«StoreCustomerFollowVO»»".
 */
export interface BaseResponseMicroServicePageStoreCustomerFollowVO {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageStoreCustomerFollowVO;
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
export interface MicroServicePageStoreCustomerFollowVO {
  /**
   * 具体数据内容
   */
  content?: StoreCustomerFollowVO[];
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
export interface StoreCustomerFollowVO {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
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
 * via the `definition` "MicroServicePage«StoreCustomerFollowVO»".
 */
export interface MicroServicePageStoreCustomerFollowVO1 {
  /**
   * 具体数据内容
   */
  content?: StoreCustomerFollowVO[];
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
 * via the `definition` "StoreCustomerFollowVO".
 */
export interface StoreCustomerFollowVO1 {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInfoRequestReq".
 */
export interface IInfoRequestReq {
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺ID
   */
  storeIds?: number[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
