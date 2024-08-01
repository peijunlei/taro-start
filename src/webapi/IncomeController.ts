import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'IncomeController';

/**
 *
 * 店铺管理-累计收益
 *
 */
async function accumulatedIncome(): Promise<AccumulatedIncomeResponse> {
  let result = await sdk.post<AccumulatedIncomeResponse>(
    '/income/accumulated',

    {},
  );
  return result.context;
}

/**
 *
 * 收益排行榜
 *
 */
async function incomeList(): Promise<IncomeListResponse> {
  let result = await sdk.get<IncomeListResponse>(
    '/income/list',

    {},
  );
  return result.context;
}

/**
 *
 * 收益订单明细
 *
 */
async function incomeOrderList(
  request: IIncomeOrderListRequestReq,
): Promise<IncomeOrderListResponse> {
  let result = await sdk.post<IncomeOrderListResponse>(
    '/income/order/list',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 收益概况
 *
 */
async function incomeOverview(
  request: IIncomeOverviewRequestReq,
): Promise<IncomeOverviewResponse> {
  let result = await sdk.post<IncomeOverviewResponse>(
    '/income/overview',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  accumulatedIncome,

  incomeList,

  incomeOrderList,

  incomeOverview,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AccumulatedIncomeResponse»".
 */
export interface BaseResponseAccumulatedIncomeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AccumulatedIncomeResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AccumulatedIncomeResponse {
  /**
   * 累计收益
   */
  accumulated?: number;
  /**
   * 累计佣金收益
   */
  commission?: number;
  /**
   * 累计奖励
   */
  reward?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AccumulatedIncomeResponse".
 */
export interface AccumulatedIncomeResponse1 {
  /**
   * 累计收益
   */
  accumulated?: number;
  /**
   * 累计佣金收益
   */
  commission?: number;
  /**
   * 累计奖励
   */
  reward?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IncomeListResponse»".
 */
export interface BaseResponseIncomeListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IncomeListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IncomeListResponse {
  /**
   * 收益排行榜名单
   */
  incomeList?: IncomeItemResponse[];
  myIncomeRanking?: MyIncomeRankingResponse;
  [k: string]: any;
}
export interface IncomeItemResponse {
  /**
   * 收益
   */
  income?: number;
  /**
   * 排名名次
   */
  ranking?: number;
  /**
   * 微店Id
   */
  shopId?: string;
  /**
   * 微店名称
   */
  shopName?: string;
  [k: string]: any;
}
/**
 * 本店排名
 */
export interface MyIncomeRankingResponse {
  /**
   * 排名名次
   */
  ranking?: number;
  /**
   * 排名名次
   */
  yesterdayRanking?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeListResponse".
 */
export interface IncomeListResponse1 {
  /**
   * 收益排行榜名单
   */
  incomeList?: IncomeItemResponse[];
  myIncomeRanking?: MyIncomeRankingResponse;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeItemResponse".
 */
export interface IncomeItemResponse1 {
  /**
   * 收益
   */
  income?: number;
  /**
   * 排名名次
   */
  ranking?: number;
  /**
   * 微店Id
   */
  shopId?: string;
  /**
   * 微店名称
   */
  shopName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MyIncomeRankingResponse".
 */
export interface MyIncomeRankingResponse1 {
  /**
   * 排名名次
   */
  ranking?: number;
  /**
   * 排名名次
   */
  yesterdayRanking?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeOrderListRequest".
 */
export interface IncomeOrderListRequest {
  /**
   * 查询月份
   */
  date: string;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IncomeOrderListResponse»".
 */
export interface BaseResponseIncomeOrderListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IncomeOrderListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IncomeOrderListResponse {
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 已结算收益
   */
  haveSettlementProceeds?: number;
  incomeOrderList?: MicroServicePageIncomeOrderVO;
  [k: string]: any;
}
export interface MicroServicePageIncomeOrderVO {
  /**
   * 具体数据内容
   */
  content?: IncomeOrderVO[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface IncomeOrderVO {
  /**
   * 订单商品
   */
  goods?: IncomeOrderGoodsVO[];
  /**
   * 收益订单类型
   * * FORECAST: 预估
   * * HAS_BEEN_SETTLED: 已结算
   */
  incomeOrderType?: 0 | 1;
  /**
   * 订单编号
   */
  orderCode?: string;
  [k: string]: any;
}
export interface IncomeOrderGoodsVO {
  /**
   * 预估佣金
   */
  estimateCommission?: number;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 实付金额
   */
  payPrice?: number;
  /**
   * sku图片
   */
  skuImg?: string;
  /**
   * sku名称
   */
  skuName?: string;
  /**
   * sku规格
   */
  skuSpec?: string;
  /**
   * spu图片
   */
  spuImg?: string;
  /**
   * spu名称
   */
  spuName?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeOrderListResponse".
 */
export interface IncomeOrderListResponse1 {
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 已结算收益
   */
  haveSettlementProceeds?: number;
  incomeOrderList?: MicroServicePageIncomeOrderVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«IncomeOrderVO»".
 */
export interface MicroServicePageIncomeOrderVO1 {
  /**
   * 具体数据内容
   */
  content?: IncomeOrderVO[];
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
  sort?: Sort;
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
 * via the `definition` "IncomeOrderVO".
 */
export interface IncomeOrderVO1 {
  /**
   * 订单商品
   */
  goods?: IncomeOrderGoodsVO[];
  /**
   * 收益订单类型
   * * FORECAST: 预估
   * * HAS_BEEN_SETTLED: 已结算
   */
  incomeOrderType?: 0 | 1;
  /**
   * 订单编号
   */
  orderCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeOrderGoodsVO".
 */
export interface IncomeOrderGoodsVO1 {
  /**
   * 预估佣金
   */
  estimateCommission?: number;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 实付金额
   */
  payPrice?: number;
  /**
   * sku图片
   */
  skuImg?: string;
  /**
   * sku名称
   */
  skuName?: string;
  /**
   * sku规格
   */
  skuSpec?: string;
  /**
   * spu图片
   */
  spuImg?: string;
  /**
   * spu名称
   */
  spuName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeOverviewRequest".
 */
export interface IncomeOverviewRequest {
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
 * via the `definition` "BaseResponse«IncomeOverviewResponse»".
 */
export interface BaseResponseIncomeOverviewResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IncomeOverviewResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IncomeOverviewResponse {
  /**
   * 累计收益
   */
  allIncome?: number;
  /**
   * 已提现金额
   */
  drawCashMoney?: number;
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 已结算收益
   */
  haveSettlementProceeds?: number;
  /**
   * 收益趋势
   */
  incomeTrendList?: IncomeTrendResponse[];
  [k: string]: any;
}
export interface IncomeTrendResponse {
  /**
   * 日期
   */
  day?: string;
  /**
   * 收益
   */
  income?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeOverviewResponse".
 */
export interface IncomeOverviewResponse1 {
  /**
   * 累计收益
   */
  allIncome?: number;
  /**
   * 已提现金额
   */
  drawCashMoney?: number;
  /**
   * 预估收益
   */
  forecastEarnings?: number;
  /**
   * 已结算收益
   */
  haveSettlementProceeds?: number;
  /**
   * 收益趋势
   */
  incomeTrendList?: IncomeTrendResponse[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IncomeTrendResponse".
 */
export interface IncomeTrendResponse1 {
  /**
   * 日期
   */
  day?: string;
  /**
   * 收益
   */
  income?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IIncomeOrderListRequestReq".
 */
export interface IIncomeOrderListRequestReq {
  /**
   * 查询月份
   */
  date: string;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IIncomeOverviewRequestReq".
 */
export interface IIncomeOverviewRequestReq {
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
