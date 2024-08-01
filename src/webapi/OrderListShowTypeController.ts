import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'OrderListShowTypeController';

/**
 *
 * 查询订单列表展示设置
 *
 */
async function query(): Promise<OrderListShowTypeResponse> {
  let result = await sdk.get<OrderListShowTypeResponse>(
    '/config/orderListShowType',

    {},
  );
  return result.context;
}

export default {
  query,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«OrderListShowTypeResponse»".
 */
export interface BaseResponseOrderListShowTypeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: OrderListShowTypeResponse;
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
export interface OrderListShowTypeResponse {
  /**
   * 状态 0:订单精简版 1:订单明细版
   */
  status?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OrderListShowTypeResponse".
 */
export interface OrderListShowTypeResponse1 {
  /**
   * 状态 0:订单精简版 1:订单明细版
   */
  status?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
