import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionPerformanceController';

/**
 *
 * 查询日销售业绩
 *
 */
async function queryByDay(request: IQueryByDayRequestReq): Promise<DistributionPerformanceByDayQueryResponse> {
  let result = await sdk.post<DistributionPerformanceByDayQueryResponse>(
    '/distribution/performance/day',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询月销售业绩
 *
 */
async function queryByLast6Months(
  request: IQueryByLast6MonthsRequestReq,
): Promise<DistributionPerformanceByLast6MonthsQueryResponse> {
  let result = await sdk.post<DistributionPerformanceByLast6MonthsQueryResponse>(
    '/distribution/performance/month',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonth(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.get<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonthUsingHEAD(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.head<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonth2(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.post<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonth3(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.put<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonth_(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.deleteF<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonthUsingOPTIONS(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.options<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询当前月1号至昨天的业绩汇总
 *
 */
async function summaryPerformanceCurrentMonthUsingPATCH(): Promise<DistributionPerformanceSummaryQueryResponse> {
  let result = await sdk.patch<DistributionPerformanceSummaryQueryResponse>(
    '/distribution/performance/summary/month',

    {},
  );
  return result.context;
}

/**
 *
 * 查询昨天的销售业绩
 *
 */
async function queryYesterday(
  request: IQueryYesterdayRequestReq,
): Promise<DistributionPerformanceYesterdayQueryResponse> {
  let result = await sdk.post<DistributionPerformanceYesterdayQueryResponse>(
    '/distribution/performance/yesterday',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  queryByDay,

  queryByLast6Months,

  summaryPerformanceCurrentMonth,

  summaryPerformanceCurrentMonthUsingHEAD,

  summaryPerformanceCurrentMonth2,

  summaryPerformanceCurrentMonth3,

  summaryPerformanceCurrentMonth_,

  summaryPerformanceCurrentMonthUsingOPTIONS,

  summaryPerformanceCurrentMonthUsingPATCH,

  queryYesterday,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByDayQueryRequest".
 */
export interface DistributionPerformanceByDayQueryRequest {
  /**
   * 时间周期
   */
  dateCycleEnum?: '0' | '1' | '2';
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 自然月，若dateCycleEnum为MONTH，则此参数必填，范围1-12，若年份为今年，则不能为当前月
   */
  month?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 年份，若dateCycleEnum为MONTH，则此参数必填，范围必须是去年到今年
   */
  year?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionPerformanceByDayQueryResponse»".
 */
export interface BaseResponseDistributionPerformanceByDayQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionPerformanceByDayQueryResponse;
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
export interface DistributionPerformanceByDayQueryResponse {
  /**
   * 分销业绩集合
   */
  dataList?: DistributionPerformanceByDayVO[];
  /**
   * 预估收益合计
   */
  totalCommission?: number;
  /**
   * 销售额合计
   */
  totalSaleAmount?: number;
  [k: string]: any;
}
export interface DistributionPerformanceByDayVO {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  /**
   * 日期 (yyyy-MM-dd)
   */
  targetDate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByDayQueryResponse".
 */
export interface DistributionPerformanceByDayQueryResponse1 {
  /**
   * 分销业绩集合
   */
  dataList?: DistributionPerformanceByDayVO[];
  /**
   * 预估收益合计
   */
  totalCommission?: number;
  /**
   * 销售额合计
   */
  totalSaleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByDayVO".
 */
export interface DistributionPerformanceByDayVO1 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  /**
   * 日期 (yyyy-MM-dd)
   */
  targetDate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByLast6MonthsQueryRequest".
 */
export interface DistributionPerformanceByLast6MonthsQueryRequest {
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionPerformanceByLast6MonthsQueryResponse»".
 */
export interface BaseResponseDistributionPerformanceByLast6MonthsQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionPerformanceByLast6MonthsQueryResponse;
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
export interface DistributionPerformanceByLast6MonthsQueryResponse {
  /**
   * 分销业绩集合
   */
  dataList?: DistributionPerformanceByMonthVO[];
  /**
   * 预估收益合计
   */
  totalCommission?: number;
  /**
   * 销售额合计
   */
  totalSaleAmount?: number;
  [k: string]: any;
}
export interface DistributionPerformanceByMonthVO {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  /**
   * 年月（yyyy-MM）
   */
  targetMonth?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByLast6MonthsQueryResponse".
 */
export interface DistributionPerformanceByLast6MonthsQueryResponse1 {
  /**
   * 分销业绩集合
   */
  dataList?: DistributionPerformanceByMonthVO[];
  /**
   * 预估收益合计
   */
  totalCommission?: number;
  /**
   * 销售额合计
   */
  totalSaleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceByMonthVO".
 */
export interface DistributionPerformanceByMonthVO1 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  /**
   * 年月（yyyy-MM）
   */
  targetMonth?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionPerformanceSummaryQueryResponse»".
 */
export interface BaseResponseDistributionPerformanceSummaryQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionPerformanceSummaryQueryResponse;
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
export interface DistributionPerformanceSummaryQueryResponse {
  /**
   * 分销员业绩月汇总数据
   */
  dataList?: DistributionPerformanceSummaryVO[];
  [k: string]: any;
}
export interface DistributionPerformanceSummaryVO {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceSummaryQueryResponse".
 */
export interface DistributionPerformanceSummaryQueryResponse1 {
  /**
   * 分销员业绩月汇总数据
   */
  dataList?: DistributionPerformanceSummaryVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceSummaryVO".
 */
export interface DistributionPerformanceSummaryVO1 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "查询分销员昨日业绩数据request".
 */
export interface Request {
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionPerformanceYesterdayQueryResponse»".
 */
export interface BaseResponseDistributionPerformanceYesterdayQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionPerformanceYesterdayQueryResponse;
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
export interface DistributionPerformanceYesterdayQueryResponse {
  performanceByDayVO?: DistributionPerformanceByDayVO2;
  [k: string]: any;
}
/**
 * 分销员昨日业绩数据
 */
export interface DistributionPerformanceByDayVO2 {
  /**
   * 预估收益
   */
  commission?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 销售额
   */
  saleAmount?: number;
  /**
   * 日期 (yyyy-MM-dd)
   */
  targetDate?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionPerformanceYesterdayQueryResponse".
 */
export interface DistributionPerformanceYesterdayQueryResponse1 {
  performanceByDayVO?: DistributionPerformanceByDayVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByDayRequestReq".
 */
export interface IQueryByDayRequestReq {
  /**
   * 时间周期
   */
  dateCycleEnum?: '0' | '1' | '2';
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 自然月，若dateCycleEnum为MONTH，则此参数必填，范围1-12，若年份为今年，则不能为当前月
   */
  month?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  /**
   * 年份，若dateCycleEnum为MONTH，则此参数必填，范围必须是去年到今年
   */
  year?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByLast6MonthsRequestReq".
 */
export interface IQueryByLast6MonthsRequestReq {
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryYesterdayRequestReq".
 */
export interface IQueryYesterdayRequestReq {
  /**
   * 分销员id
   */
  distributionId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
