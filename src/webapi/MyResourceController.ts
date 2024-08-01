import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MyResourceController';

/**
 *
 * 微店主-人客合一数据统计
 *
 */
async function getTotalCount(
  customerId: IGetTotalCountCustomerIdReq,
): Promise<MyResourceResponse> {
  let result = await sdk.post<MyResourceResponse>(
    '/usercenter/total',

    {
      customerId,
    },
  );
  return result.context;
}

export default {
  getTotalCount,
};

/**
 * 用户编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetTotalCountCustomerIdReq".
 */
export type IGetTotalCountCustomerIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MyResourceResponse»".
 */
export interface BaseResponseMyResourceResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MyResourceResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MyResourceResponse {
  /**
   * 可提现:当前可提现余额（截止到昨天23.59分）
   */
  myBalance?: number;
  /**
   * 收入排名:微店主收益全国排名（截止到昨天23.59分）
   */
  myIncomeRank?: number;
  /**
   * 销售排名:微店主个人销售额全国排名（截止到昨天23.59分）
   */
  mySaleRank?: number;
  /**
   * 我的团队：我的团队的总人数（截止到昨天23.59分）
   */
  myTeamCount?: number;
  /**
   * 总营收:累计收益（截止到昨天23.59分）
   */
  myTotalIncome?: number;
  whetherToWithDraw?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MyResourceResponse".
 */
export interface MyResourceResponse1 {
  /**
   * 可提现:当前可提现余额（截止到昨天23.59分）
   */
  myBalance?: number;
  /**
   * 收入排名:微店主收益全国排名（截止到昨天23.59分）
   */
  myIncomeRank?: number;
  /**
   * 销售排名:微店主个人销售额全国排名（截止到昨天23.59分）
   */
  mySaleRank?: number;
  /**
   * 我的团队：我的团队的总人数（截止到昨天23.59分）
   */
  myTeamCount?: number;
  /**
   * 总营收:累计收益（截止到昨天23.59分）
   */
  myTotalIncome?: number;
  whetherToWithDraw?: boolean;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
