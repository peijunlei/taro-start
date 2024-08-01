import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'RankController';

/**
 *
 * 店铺管理-较昨日排名变化
 *
 */
async function ranking(): Promise<RankingChangeResponse> {
  let result = await sdk.post<RankingChangeResponse>(
    '/ranking/changes',

    {},
  );
  return result.context;
}

export default {
  ranking,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RankingChangeResponse»".
 */
export interface BaseResponseRankingChangeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RankingChangeResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RankingChangeResponse {
  /**
   * 全国排名位数
   */
  nationalRanking?: number;
  /**
   * 排名上升位数
   */
  rankingRising?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RankingChangeResponse".
 */
export interface RankingChangeResponse1 {
  /**
   * 全国排名位数
   */
  nationalRanking?: number;
  /**
   * 排名上升位数
   */
  rankingRising?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
