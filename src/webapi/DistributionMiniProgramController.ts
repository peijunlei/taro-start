import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionMiniProgramController';

/**
 *
 * 接续出分销里面生成的二维码携带的真正参数
 *
 */
async function getSkuQrCode(
  redisKey: IGetSkuQrCodeRedisKeyReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('DistributionMiniProgramController', 'getSkuQrCode')) {
      return Promise.resolve(
        require('./mock/DistributionMiniProgramController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get(
    '/distribution/miniProgram-code/decodeParam/{redisKey}'.replace(
      '{redisKey}',
      redisKey + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 分销生成各种小程序码
 *
 */
async function distributionMiniProgramQrCode(
  request: IDistributionMiniProgramQrCodeRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (
      isMock(
        'DistributionMiniProgramController',
        'distributionMiniProgramQrCode',
      )
    ) {
      return Promise.resolve(
        require('./mock/DistributionMiniProgramController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post<unknown>(
    '/distribution/miniProgram-code/distributionMiniProgramQrCode',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getSkuQrCode,

  distributionMiniProgramQrCode,
};

/**
 * redisKey
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetSkuQrCodeRedisKeyReq".
 */
export type IGetSkuQrCodeRedisKeyReq = string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionMiniProgramRequest".
 */
export interface DistributionMiniProgramRequest {
  /**
   * 渠道,接受mall和shop传值
   */
  channel?: string;
  /**
   * 分销员会员ID
   */
  inviteeId?: string;
  /**
   * 积分商品ID
   */
  pointsGoodsId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 商品SkuId
   */
  skuId?: string;
  /**
   * 商品SpuId
   */
  spuId?: string;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 邀新和店铺表示区分,接受register和shop
   */
  tag?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDistributionMiniProgramQrCodeRequestReq".
 */
export interface IDistributionMiniProgramQrCodeRequestReq {
  /**
   * 渠道,接受mall和shop传值
   */
  channel?: string;
  /**
   * 分销员会员ID
   */
  inviteeId?: string;
  /**
   * 积分商品ID
   */
  pointsGoodsId?: string;
  /**
   * saas开关
   */
  saasStatus?: boolean;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 商品SkuId
   */
  skuId?: string;
  /**
   * 商品SpuId
   */
  spuId?: string;
  /**
   * 门店id
   */
  storeId?: number;
  /**
   * 邀新和店铺表示区分,接受register和shop
   */
  tag?: string;
  [k: string]: any;
}
