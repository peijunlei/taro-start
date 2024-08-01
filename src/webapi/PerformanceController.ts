import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PerformanceController';

/**
 *
 * 销售业绩
 *
 */
async function sales(
  request: ISalesRequestReq,
): Promise<SalesPerformanceResponse> {
  let result = await sdk.post<SalesPerformanceResponse>(
    '/performance/sales',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 团队情况
 *
 */
async function team(
  request: ITeamRequestReq,
): Promise<TeamPerformanceResponse> {
  let result = await sdk.post<TeamPerformanceResponse>(
    '/performance/teams',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  sales,

  team,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PerformanceRequest".
 */
export interface PerformanceRequest {
  /**
   * 趋势类型
   * * WEEK: 7天
   * * MONTH: 30天
   * * HALFYEAR: 半年
   * * YEAR: 1年
   * * ALL: 累计
   */
  trendType: 'WEEK' | 'MONTH' | 'HALFYEAR' | 'YEAR' | 'ALL';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SalesPerformanceResponse»".
 */
export interface BaseResponseSalesPerformanceResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SalesPerformanceResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SalesPerformanceResponse {
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 我的销售额
   */
  mySales?: number;
  /**
   * 我的销售额业绩趋势
   */
  mySalesTrendResponseList?: SalesTrendResponse[];
  /**
   * 团队销售额
   */
  teamSales?: number;
  /**
   * 团队销售额业绩趋势
   */
  teamSalesTrendResponseList?: SalesTrendResponse1[];
  [k: string]: any;
}
export interface SalesTrendResponse {
  /**
   * 日期
   */
  day?: string;
  /**
   * 销售额
   */
  income?: number;
  [k: string]: any;
}
export interface SalesTrendResponse1 {
  /**
   * 日期
   */
  day?: string;
  /**
   * 销售额
   */
  income?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SalesPerformanceResponse".
 */
export interface SalesPerformanceResponse1 {
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 我的销售额
   */
  mySales?: number;
  /**
   * 我的销售额业绩趋势
   */
  mySalesTrendResponseList?: SalesTrendResponse[];
  /**
   * 团队销售额
   */
  teamSales?: number;
  /**
   * 团队销售额业绩趋势
   */
  teamSalesTrendResponseList?: SalesTrendResponse1[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SalesTrendResponse".
 */
export interface SalesTrendResponse2 {
  /**
   * 日期
   */
  day?: string;
  /**
   * 销售额
   */
  income?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TeamPerformanceResponse»".
 */
export interface BaseResponseTeamPerformanceResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TeamPerformanceResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface TeamPerformanceResponse {
  /**
   * 我发展的微店主数
   */
  mySelfCount?: number;
  /**
   * 我的团队总人数
   */
  myTeamCount?: number;
  /**
   * 我的微店主数业绩趋势
   */
  myTeamTrendResponseList?: TeamTrendResponse[];
  /**
   * 团队总人数业绩趋势
   */
  totalTrendResponseList?: TeamTrendResponse1[];
  [k: string]: any;
}
export interface TeamTrendResponse {
  /**
   * 日期
   */
  day?: string;
  /**
   * 人数
   */
  teamCount?: number;
  [k: string]: any;
}
export interface TeamTrendResponse1 {
  /**
   * 日期
   */
  day?: string;
  /**
   * 人数
   */
  teamCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TeamPerformanceResponse".
 */
export interface TeamPerformanceResponse1 {
  /**
   * 我发展的微店主数
   */
  mySelfCount?: number;
  /**
   * 我的团队总人数
   */
  myTeamCount?: number;
  /**
   * 我的微店主数业绩趋势
   */
  myTeamTrendResponseList?: TeamTrendResponse[];
  /**
   * 团队总人数业绩趋势
   */
  totalTrendResponseList?: TeamTrendResponse1[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TeamTrendResponse".
 */
export interface TeamTrendResponse2 {
  /**
   * 日期
   */
  day?: string;
  /**
   * 人数
   */
  teamCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISalesRequestReq".
 */
export interface ISalesRequestReq {
  /**
   * 趋势类型
   * * WEEK: 7天
   * * MONTH: 30天
   * * HALFYEAR: 半年
   * * YEAR: 1年
   * * ALL: 累计
   */
  trendType: 'WEEK' | 'MONTH' | 'HALFYEAR' | 'YEAR' | 'ALL';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamRequestReq".
 */
export interface ITeamRequestReq {
  /**
   * 趋势类型
   * * WEEK: 7天
   * * MONTH: 30天
   * * HALFYEAR: 半年
   * * YEAR: 1年
   * * ALL: 累计
   */
  trendType: 'WEEK' | 'MONTH' | 'HALFYEAR' | 'YEAR' | 'ALL';
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
