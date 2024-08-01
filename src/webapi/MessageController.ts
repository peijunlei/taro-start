import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MessageController';

/**
 *
 * 删除消息
 *
 */
async function deleteById_(id: IDeleteById_IdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/appMessage/delete/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询app消息
 *
 */
async function page(request: IPageRequestReq): Promise<AppMessagePageResponse> {
  let result = await sdk.post<AppMessagePageResponse>(
    '/appMessage/page',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 将所有未读消息置为已读
 *
 */
async function setMessageAllRead(): Promise<unknown> {
  let result = await sdk.put(
    '/appMessage/setMessageAllRead',

    {},
  );
  return result.context;
}

/**
 *
 * 将某条未读消息置为已读
 *
 */
async function setMessageRead(id: ISetMessageReadIdReq): Promise<unknown> {
  let result = await sdk.put(
    '/appMessage/setMessageRead/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  deleteById_,

  page,

  setMessageAllRead,

  setMessageRead,
};

/**
 * APP消息id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_IdReq".
 */
export type IDeleteById_IdReq = string;
/**
 * APP消息id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISetMessageReadIdReq".
 */
export type ISetMessageReadIdReq = string;

export interface IgnoreType {
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
 * via the `definition` "AppMessagePageRequest".
 */
export interface AppMessagePageRequest {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 消息一级类型：0优惠促销、1服务通知
   */
  messageType?: number;
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
 * via the `definition` "BaseResponse«AppMessagePageResponse»".
 */
export interface BaseResponseAppMessagePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppMessagePageResponse;
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
export interface AppMessagePageResponse {
  appMessageVOPage?: MicroServicePageAppMessageVO;
  noticeNum?: number;
  preferentialNum?: number;
  [k: string]: any;
}
/**
 * App站内信消息发送表分页结果
 */
export interface MicroServicePageAppMessageVO {
  /**
   * 具体数据内容
   */
  content?: AppMessageVO[];
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
export interface AppMessageVO {
  /**
   * 主键id
   */
  appMessageId?: string;
  /**
   * 消息内容
   */
  content?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 封面图
   */
  imgUrl?: string;
  /**
   * 是否已读 0：未读、1：已读
   * * NO:  0：未读
   * * YES: 1：已读
   */
  isRead?: 0 | 1;
  /**
   * 关联的任务或节点id
   */
  joinId?: number;
  /**
   * 消息一级类型：0优惠促销、1服务通知
   * * Preferential:  0：优惠促销
   * * Notice: 1：服务通知
   */
  messageType?: 0 | 1;
  /**
   * 消息二级类型
   * * ACCOUNT_SECURITY:  0：账号安全
   * * ACCOUNT_BALANCE: 1：账户资产
   * * ORDER_PROGRESS: 2：订单进度
   * * RETURN_ORDER_PROGRESS: 3：退单进度
   * * DISTRIBUTION_BUSINESS: 4：分销业务
   */
  messageTypeDetail?: 0 | 1 | 2 | 3 | 4;
  /**
   * 跳转路由
   */
  routeName?: string;
  /**
   * 路由参数
   */
  routeParam?: string;
  /**
   * 发送时间
   */
  sendTime?: string;
  /**
   * 消息标题
   */
  title?: string;
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
 * via the `definition` "AppMessagePageResponse".
 */
export interface AppMessagePageResponse1 {
  appMessageVOPage?: MicroServicePageAppMessageVO;
  noticeNum?: number;
  preferentialNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«AppMessageVO»".
 */
export interface MicroServicePageAppMessageVO1 {
  /**
   * 具体数据内容
   */
  content?: AppMessageVO[];
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
 * via the `definition` "AppMessageVO".
 */
export interface AppMessageVO1 {
  /**
   * 主键id
   */
  appMessageId?: string;
  /**
   * 消息内容
   */
  content?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 封面图
   */
  imgUrl?: string;
  /**
   * 是否已读 0：未读、1：已读
   * * NO:  0：未读
   * * YES: 1：已读
   */
  isRead?: 0 | 1;
  /**
   * 关联的任务或节点id
   */
  joinId?: number;
  /**
   * 消息一级类型：0优惠促销、1服务通知
   * * Preferential:  0：优惠促销
   * * Notice: 1：服务通知
   */
  messageType?: 0 | 1;
  /**
   * 消息二级类型
   * * ACCOUNT_SECURITY:  0：账号安全
   * * ACCOUNT_BALANCE: 1：账户资产
   * * ORDER_PROGRESS: 2：订单进度
   * * RETURN_ORDER_PROGRESS: 3：退单进度
   * * DISTRIBUTION_BUSINESS: 4：分销业务
   */
  messageTypeDetail?: 0 | 1 | 2 | 3 | 4;
  /**
   * 跳转路由
   */
  routeName?: string;
  /**
   * 路由参数
   */
  routeParam?: string;
  /**
   * 发送时间
   */
  sendTime?: string;
  /**
   * 消息标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 消息一级类型：0优惠促销、1服务通知
   */
  messageType?: number;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
