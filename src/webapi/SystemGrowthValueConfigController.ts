import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SystemGrowthValueConfigController';

/**
 *
 * 查询成长值是否开启
 *
 */
async function isGrowthValueOpen(): Promise<SystemGrowthValueOpenResponse> {
  let result = await sdk.get<SystemGrowthValueOpenResponse>(
    '/growthValue/isOpen',

    {},
  );
  return result.context;
}

export default {
  isGrowthValueOpen,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SystemGrowthValueOpenResponse»".
 */
export interface BaseResponseSystemGrowthValueOpenResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SystemGrowthValueOpenResponse;
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
export interface SystemGrowthValueOpenResponse {
  /**
   * 成长值开关-true:开启 false:关闭
   */
  open?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SystemGrowthValueOpenResponse".
 */
export interface SystemGrowthValueOpenResponse1 {
  /**
   * 成长值开关-true:开启 false:关闭
   */
  open?: boolean;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
