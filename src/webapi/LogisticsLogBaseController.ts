import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LogisticsLogBaseController';

/**
 *
 * 获取物流信息
 *
 */
async function list(): Promise<LogisticsLogSimpleListByCustomerIdResponse> {
  let result = await sdk.get<LogisticsLogSimpleListByCustomerIdResponse>(
    '/logisticsLog/list',

    {},
  );
  return result.context;
}

export default {
  list,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«LogisticsLogSimpleListByCustomerIdResponse»".
 */
export interface BaseResponseLogisticsLogSimpleListByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LogisticsLogSimpleListByCustomerIdResponse;
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
export interface LogisticsLogSimpleListByCustomerIdResponse {
  /**
   * 物流信息列表
   */
  logisticsList?: LogisticsLogSimpleVO[];
  [k: string]: any;
}
export interface LogisticsLogSimpleVO {
  /**
   * 内容
   */
  context?: string;
  /**
   * 本地发货单号
   */
  deliverId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 快递单当前状态，包括0在途，1揽收，2疑难，3签收，4退签，5派件，6退回等7个状态
   */
  state?: string;
  /**
   * 时间
   */
  time?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LogisticsLogSimpleListByCustomerIdResponse".
 */
export interface LogisticsLogSimpleListByCustomerIdResponse1 {
  /**
   * 物流信息列表
   */
  logisticsList?: LogisticsLogSimpleVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LogisticsLogSimpleVO".
 */
export interface LogisticsLogSimpleVO1 {
  /**
   * 内容
   */
  context?: string;
  /**
   * 本地发货单号
   */
  deliverId?: string;
  /**
   * 商品图片
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 快递单当前状态，包括0在途，1揽收，2疑难，3签收，4退签，5派件，6退回等7个状态
   */
  state?: string;
  /**
   * 时间
   */
  time?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
