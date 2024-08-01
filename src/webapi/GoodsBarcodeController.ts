import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsBarcodeController';

/**
 *
 * 根据条形码code查询商品信息
 *
 */
async function queryGoodsInfoByBarcode(
  code: IQueryGoodsInfoByBarcodeCodeReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/goods/barcode/{code}'.replace('{code}', code + ''),

    {},
  );
  return result.context;
}

export default {
  queryGoodsInfoByBarcode,
};

/**
 * code
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryGoodsInfoByBarcodeCodeReq".
 */
export type IQueryGoodsInfoByBarcodeCodeReq = string;

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
