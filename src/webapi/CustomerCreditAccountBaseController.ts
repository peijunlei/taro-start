import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCreditAccountBaseController';

/**
 *
 * 我的授信
 *
 */
async function getCreditAccountDetail(): Promise<CreditAccountDetailResponse> {
  let result = await sdk.get<CreditAccountDetailResponse>(
    '/credit/account/detail',

    {},
  );
  return result.context;
}

/**
 *
 * 额度恢复记录详情
 *
 */
async function getCreditRecoverDetail(id: IGetCreditRecoverDetailIdReq): Promise<CreditRecoverPageResponse> {
  let result = await sdk.get<CreditRecoverPageResponse>(
    '/credit/account/history-recover-detail/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询额度恢复记录
 *
 */
async function findCreditRecoverPage(
  request: IFindCreditRecoverPageRequestReq,
): Promise<MicroServicePageCreditRecoverPageResponse> {
  let result = await sdk.post<MicroServicePageCreditRecoverPageResponse>(
    '/credit/account/history-recover-list',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getCreditAccountDetail,

  getCreditRecoverDetail,

  findCreditRecoverPage,
};

/**
 * id
 *
 */
export type IGetCreditRecoverDetailIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface BaseResponseCreditAccountDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CreditAccountDetailResponse;
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
export interface CreditAccountDetailResponse {
  /**
   * 授信显示别名
   */
  alias?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信次数
   */
  creditNum?: number;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 使用周期
   */
  effectiveDays?: number;
  /**
   * 启用状态 0未启用 1已启用
   * * NO: 否
   * * YES: 是
   */
  enabled?: 0 | 1;
  /**
   * 到期时间
   */
  endTime?: string;
  /**
   * 是否过期 0未过期 1已过期
   * * NO: 否
   * * YES: 是
   */
  expireStatus?: 0 | 1;
  /**
   * 已还款额度
   */
  hasRepaidAmount?: number;
  /**
   * 主键ID
   */
  id?: string;
  /**
   * 待还款额度
   */
  repayAmount?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 可用额度
   */
  usableAmount?: number;
  /**
   * 已用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0未使用 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface CreditAccountDetailResponse1 {
  /**
   * 授信显示别名
   */
  alias?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信次数
   */
  creditNum?: number;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 使用周期
   */
  effectiveDays?: number;
  /**
   * 启用状态 0未启用 1已启用
   * * NO: 否
   * * YES: 是
   */
  enabled?: 0 | 1;
  /**
   * 到期时间
   */
  endTime?: string;
  /**
   * 是否过期 0未过期 1已过期
   * * NO: 否
   * * YES: 是
   */
  expireStatus?: 0 | 1;
  /**
   * 已还款额度
   */
  hasRepaidAmount?: number;
  /**
   * 主键ID
   */
  id?: string;
  /**
   * 待还款额度
   */
  repayAmount?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 可用额度
   */
  usableAmount?: number;
  /**
   * 已用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0未使用 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface BaseResponseCreditRecoverPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CreditRecoverPageResponse;
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
export interface CreditRecoverPageResponse {
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信结束时间
   */
  endTime?: string;
  /**
   * 授信开始时间
   */
  startTime?: string;
  /**
   * 已使用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0已结束 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface CreditRecoverPageResponse1 {
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信结束时间
   */
  endTime?: string;
  /**
   * 授信开始时间
   */
  startTime?: string;
  /**
   * 已使用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0已结束 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface CreditRecoverPageRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
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
export interface BaseResponseMicroServicePageCreditRecoverPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageCreditRecoverPageResponse;
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
export interface MicroServicePageCreditRecoverPageResponse {
  /**
   * 具体数据内容
   */
  content?: CreditRecoverPageResponse2[];
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
export interface CreditRecoverPageResponse2 {
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信结束时间
   */
  endTime?: string;
  /**
   * 授信开始时间
   */
  startTime?: string;
  /**
   * 已使用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0已结束 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
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
export interface MicroServicePageCreditRecoverPageResponse1 {
  /**
   * 具体数据内容
   */
  content?: CreditRecoverPageResponse2[];
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
export interface IFindCreditRecoverPageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
