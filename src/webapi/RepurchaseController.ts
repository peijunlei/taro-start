import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'RepurchaseController';

/**
 *
 * repurchase
 *
 */
async function repurchase(tid: IRepurchaseTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/site/repurchase/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

export default {
  repurchase,
};

/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRepurchaseTidReq".
 */
export type IRepurchaseTidReq = string;

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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
