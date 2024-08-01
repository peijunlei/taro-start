import * as sdk from './fetch';

import isMock from './mock-util';
const serverInfo = '';
const controllerName = 'RuleInfoBaseController';

/**
 *
 * 获取规则信息
 *
 */
async function getRuleInfo(request: IGetRuleInfoRequestReq): Promise<ValidateCodepostRes> {
  let result = await sdk.post<ValidateCodepostRes>(
    '/ruleinfo/getRuleContent',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取预售/预约规则信息
 *
 */
async function getRuleContentAll(): Promise<RuleInfoResponseArray> {
  let result = await sdk.get<RuleInfoResponseArray>(
    '/ruleinfo/getRuleContentAll',

    {},
  );
  return result.context;
}

export default {
  getRuleInfo,

  getRuleContentAll,
};

/**
 * 内容
 */
export type ValidateCodepostRes = string;
/**
 * 内容
 */
export type RuleInfoResponseArray = RuleInfoResponse[];
/**
 * 内容
 *
 */
export type ValidateCodepostRes1 = string;
/**
 * 内容
 *
 */
export type RuleInfoResponseArray1 = RuleInfoResponse2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface RuleInfoByRuleTypeRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 规则类型 0:预约 1:预售
   * * APPOINTMENT: 预约规则
   * * SALE: 预售规则
   */
  ruleType?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  context?: ValidateCodepostRes;
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
 */
export interface BaseResponseListRuleInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RuleInfoResponseArray;
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
export interface RuleInfoResponse {
  content?: string;
  type?: '0' | '1';
  [k: string]: any;
}
/**
 */
export interface RuleInfoResponse1 {
  content?: string;
  type?: '0' | '1';
  [k: string]: any;
}
/**
 */
export interface IGetRuleInfoRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 规则类型 0:预约 1:预售
   * * APPOINTMENT: 预约规则
   * * SALE: 预售规则
   */
  ruleType?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface RuleInfoResponse2 {
  content?: string;
  type?: '0' | '1';
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
