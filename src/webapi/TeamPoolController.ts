import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'TeamPoolController';

/**
 *
 * 团队池列表
 *
 */
async function teamList(
  request: ITeamListRequestReq,
): Promise<TeamPoolResponse> {
  let result = await sdk.post<TeamPoolResponse>(
    '/team-pool/page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  teamList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TeamPoolRequest".
 */
export interface TeamPoolRequest {
  /**
   * 用户编号
   */
  customerId?: string;
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
  /**
   * 团队池类型查询
   * * NO: 否
   * * YES: 是
   */
  teamType?: 0 | 1;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TeamPoolResponse»".
 */
export interface BaseResponseTeamPoolResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TeamPoolResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface TeamPoolResponse {
  /**
   * 用户总人数
   */
  customerTotalCount?: number;
  /**
   * 团队池总人数
   */
  myTotalCount?: number;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
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
  teamPoolPage?: MicroServicePageTeamPoolVO;
  /**
   * 团队总人数
   */
  teamTotalCount?: number;
  token?: string;
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
  sort?: Sort;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  sort?: Sort;
  [k: string]: any;
}
export interface Sort1 {
  [k: string]: any;
}
/**
 * 团队池对象列表
 */
export interface MicroServicePageTeamPoolVO {
  /**
   * 具体数据内容
   */
  content?: TeamPoolVO[];
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
  sort?: Sort2;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface TeamPoolVO {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 用户姓名
   */
  customerName?: string;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 加入团队时间
   */
  joinTeamDate?: string;
  /**
   * 等级
   */
  level?: string;
  /**
   * 主键ID
   */
  recordId?: string;
  /**
   * 团队池总人数
   */
  teamCount?: number;
  [k: string]: any;
}
export interface Sort2 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TeamPoolResponse".
 */
export interface TeamPoolResponse1 {
  /**
   * 用户总人数
   */
  customerTotalCount?: number;
  /**
   * 团队池总人数
   */
  myTotalCount?: number;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
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
  teamPoolPage?: MicroServicePageTeamPoolVO;
  /**
   * 团队总人数
   */
  teamTotalCount?: number;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
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
  sort?: Sort;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort3 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«TeamPoolVO»".
 */
export interface MicroServicePageTeamPoolVO1 {
  /**
   * 具体数据内容
   */
  content?: TeamPoolVO[];
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
  sort?: Sort2;
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
 * via the `definition` "TeamPoolVO".
 */
export interface TeamPoolVO1 {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 用户姓名
   */
  customerName?: string;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 加入团队时间
   */
  joinTeamDate?: string;
  /**
   * 等级
   */
  level?: string;
  /**
   * 主键ID
   */
  recordId?: string;
  /**
   * 团队池总人数
   */
  teamCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamListRequestReq".
 */
export interface ITeamListRequestReq {
  /**
   * 用户编号
   */
  customerId?: string;
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
  /**
   * 团队池类型查询
   * * NO: 否
   * * YES: 是
   */
  teamType?: 0 | 1;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
