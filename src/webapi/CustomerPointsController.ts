import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerPointsController';

/**
 *
 * 根据会员Id查询会员快过期积分
 *
 */
async function queryWillExpirePoints(): Promise<CustomerPointsExpireResponse> {
  let result = await sdk.get<CustomerPointsExpireResponse>(
    '/customer/points/expire',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询会员积分明细
 *
 */
async function page(request: IPageRequestReq): Promise<CustomerPointsDetailPageResponse> {
  let result = await sdk.post<CustomerPointsDetailPageResponse>(
    '/customer/points/page',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 会员分享获得积分
 *
 */
async function share(request: IShareRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/points/share',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 记录分享
 *
 */
async function shareRecord(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/customer/points/shareRecord',

    {},
  );
  return result.context;
}

export default {
  queryWillExpirePoints,

  page,

  share,

  shareRecord,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerPointsExpireResponse»".
 */
export interface BaseResponseCustomerPointsExpireResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerPointsExpireResponse;
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
export interface CustomerPointsExpireResponse {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 积分过期时间
   */
  pointsExpireDate?: string;
  /**
   * 积分过期开关
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  pointsExpireStatus?: 0 | 1;
  /**
   * 即将过期积分数
   */
  willExpirePoints?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerPointsExpireResponse".
 */
export interface CustomerPointsExpireResponse1 {
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 积分过期时间
   */
  pointsExpireDate?: string;
  /**
   * 积分过期开关
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  pointsExpireStatus?: 0 | 1;
  /**
   * 即将过期积分数
   */
  willExpirePoints?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerPointsDetailQueryRequest".
 */
export interface CustomerPointsDetailQueryRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  content?: string;
  customerAccount?: string;
  customerId?: string;
  customerIdList?: string[];
  customerName?: string;
  employeeId?: string;
  employeeIds?: string[];
  opTimeBegin?: string;
  opTimeEnd?: string;
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
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19';
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
  type?: '0' | '1';
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
 * via the `definition` "BaseResponse«CustomerPointsDetailPageResponse»".
 */
export interface BaseResponseCustomerPointsDetailPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerPointsDetailPageResponse;
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
export interface CustomerPointsDetailPageResponse {
  customerPointsDetailVOPage?: MicroServicePageCustomerPointsDetailVO;
  [k: string]: any;
}
export interface MicroServicePageCustomerPointsDetailVO {
  /**
   * 具体数据内容
   */
  content?: CustomerPointsDetailVO[];
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
export interface CustomerPointsDetailVO {
  content?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  id?: number;
  opTime?: string;
  points?: number;
  pointsAvailable?: number;
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19';
  type?: '0' | '1';
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
 * via the `definition` "CustomerPointsDetailPageResponse".
 */
export interface CustomerPointsDetailPageResponse1 {
  customerPointsDetailVOPage?: MicroServicePageCustomerPointsDetailVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerPointsDetailVO»".
 */
export interface MicroServicePageCustomerPointsDetailVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerPointsDetailVO[];
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
 * via the `definition` "CustomerPointsDetailVO".
 */
export interface CustomerPointsDetailVO1 {
  content?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  id?: number;
  opTime?: string;
  points?: number;
  pointsAvailable?: number;
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19';
  type?: '0' | '1';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerPointsShareRequest".
 */
export interface CustomerPointsShareRequest {
  /**
   * 分享人id
   */
  customerId?: string;
  /**
   * 分享id
   */
  shareId?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  content?: string;
  customerAccount?: string;
  customerId?: string;
  customerIdList?: string[];
  customerName?: string;
  employeeId?: string;
  employeeIds?: string[];
  opTimeBegin?: string;
  opTimeEnd?: string;
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
  serviceType?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19';
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
  type?: '0' | '1';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShareRequestReq".
 */
export interface IShareRequestReq {
  /**
   * 分享人id
   */
  customerId?: string;
  /**
   * 分享id
   */
  shareId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
