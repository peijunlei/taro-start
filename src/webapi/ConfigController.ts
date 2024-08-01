import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConfigController';

/**
 *
 * 获取商城小程序码
 *
 */
async function getPublicQrcode(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/config/getPublicQrcode',

    {},
  );
  return result.context;
}

/**
 *
 * 前台商品列表默认展示维度(大小图、spu|sku)
 *
 */
async function listConfigs(): Promise<GoodsDisplayConfigGetResponse> {
  let result = await sdk.get<GoodsDisplayConfigGetResponse>(
    '/config/goodsDisplayDefault',

    {},
  );
  return result.context;
}
/**
 * 查询渠道商品列表配置
 */
async function findChannelGoodsConfig(id:string): Promise<unknown> {
  let result = await sdk.get(
    `/goodschannelactivity/${id}`,
    {},
  );
  return result.context;
}
export default {
  getPublicQrcode,
  findChannelGoodsConfig,
  listConfigs,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsDisplayConfigGetResponse»".
 */
export interface BaseResponseGoodsDisplayConfigGetResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsDisplayConfigGetResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GoodsDisplayConfigGetResponse {
  /**
   * 商品维度-0:SKU 1:SPU
   * * SKU: 0:SKU
   * * SPU: 1:SPU
   */
  goodsShowType?: number;
  /**
   * 图片显示方式-0:小图 1:大图
   * * SMALL: 0:小图
   * * BIG: 1:大图
   */
  imageShowType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsDisplayConfigGetResponse".
 */
export interface GoodsDisplayConfigGetResponse1 {
  /**
   * 商品维度-0:SKU 1:SPU
   * * SKU: 0:SKU
   * * SPU: 1:SPU
   */
  goodsShowType?: number;
  /**
   * 图片显示方式-0:小图 1:大图
   * * SMALL: 0:小图
   * * BIG: 1:大图
   */
  imageShowType?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
