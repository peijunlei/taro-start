import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionCustomerRankingController';

/**
 *
 * 查询排行榜
 *
 */
async function getRanking(request: IGetRankingRequestReq): Promise<DistributionCustomerRankingResponse> {
  let result = await sdk.post<DistributionCustomerRankingResponse>(
    '/distributeRanking/sales/ranking',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getRanking,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerRankingPageRequest".
 */
export interface DistributionCustomerRankingPageRequest {
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 我的会员ID
   */
  myCustomerId?: string;
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
   * 查询日期
   */
  targetDate?: string;
  /**
   * 排行类型
   */
  type?: string;
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
 * via the `definition` "BaseResponse«DistributionCustomerRankingResponse»".
 */
export interface BaseResponseDistributionCustomerRankingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionCustomerRankingResponse;
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
export interface DistributionCustomerRankingResponse {
  distributionCustomerRankingVO?: DistributionCustomerRankingVO;
  rankingVOList?: DistributionCustomerRankingVO1[];
  [k: string]: any;
}
export interface DistributionCustomerRankingVO {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 头像
   */
  img?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 排行
   */
  ranking?: string;
  /**
   * 销售额(元)
   */
  saleAmount?: number;
  [k: string]: any;
}
export interface DistributionCustomerRankingVO1 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 头像
   */
  img?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 排行
   */
  ranking?: string;
  /**
   * 销售额(元)
   */
  saleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerRankingResponse".
 */
export interface DistributionCustomerRankingResponse1 {
  distributionCustomerRankingVO?: DistributionCustomerRankingVO;
  rankingVOList?: DistributionCustomerRankingVO1[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerRankingVO".
 */
export interface DistributionCustomerRankingVO2 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 头像
   */
  img?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 排行
   */
  ranking?: string;
  /**
   * 销售额(元)
   */
  saleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRankingRequestReq".
 */
export interface IGetRankingRequestReq {
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 我的会员ID
   */
  myCustomerId?: string;
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
   * 查询日期
   */
  targetDate?: string;
  /**
   * 排行类型
   */
  type?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
