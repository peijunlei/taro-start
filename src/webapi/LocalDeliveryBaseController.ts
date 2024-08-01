import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LocalDeliveryBaseController';

/**
 *
 * 查询运费
 *
 */
async function queryDeliverFee(
  request: IQueryDeliverFeeRequestReq,
): Promise<DadaDeliverFeeVO> {
  let result = await sdk.post<DadaDeliverFeeVO>(
    '/local-delivery/deliver-fee',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 是否支持同城配送
 *
 */
async function queryDistance(
  deliveryAddressId: IQueryDistanceDeliveryAddressIdReq,
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/local-delivery/distance/{deliveryAddressId}'.replace(
      '{deliveryAddressId}',
      deliveryAddressId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 查询配送进度
 *
 */
async function queryProgress(
  orderCode: IQueryProgressOrderCodeReq,
): Promise<DeliveryRecordDadaProgressQueryResponse> {
  let result = await sdk.get<DeliveryRecordDadaProgressQueryResponse>(
    '/local-delivery/progress/{orderCode}'.replace(
      '{orderCode}',
      orderCode + '',
    ),

    {},
  );
  return result.context;
}

export default {
  queryDeliverFee,

  queryDistance,

  queryProgress,
};

/**
 * deliveryAddressId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryDistanceDeliveryAddressIdReq".
 */
export type IQueryDistanceDeliveryAddressIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = boolean;
/**
 * orderCode
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryProgressOrderCodeReq".
 */
export type IQueryProgressOrderCodeReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LocalDeliveryDeliverFeeQueryRequest".
 */
export interface LocalDeliveryDeliverFeeQueryRequest {
  /**
   * 订单金额;不含配送费
   */
  cargoPrice?: number;
  /**
   * 城市名称
   */
  cityName?: string;
  /**
   * 收货地址id
   */
  deliveryAddressId?: string;
  /**
   * 2小时达订单分配给微店主的id
   */
  openShopCustomerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DadaDeliverFeeVO»".
 */
export interface BaseResponseDadaDeliverFeeVO {
  /**
   * 结果码
   */
  code: string;
  context?: DadaDeliverFeeVO;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface DadaDeliverFeeVO {
  /**
   * 优惠券费用
   */
  couponFee?: number;
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送距离
   */
  distance?: number;
  /**
   * 实际运费
   */
  fee?: number;
  /**
   * 保价费
   */
  insuranceFee?: number;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 小费
   */
  tips?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DadaDeliverFeeVO".
 */
export interface DadaDeliverFeeVO1 {
  /**
   * 优惠券费用
   */
  couponFee?: number;
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送距离
   */
  distance?: number;
  /**
   * 实际运费
   */
  fee?: number;
  /**
   * 保价费
   */
  insuranceFee?: number;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 小费
   */
  tips?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«boolean»".
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: boolean;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DeliveryRecordDadaProgressQueryResponse»".
 */
export interface BaseResponseDeliveryRecordDadaProgressQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DeliveryRecordDadaProgressQueryResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface DeliveryRecordDadaProgressQueryResponse {
  /**
   * 收货人纬度
   */
  customerLat?: number;
  /**
   * 收货人经度
   */
  customerLng?: number;
  /**
   * 收货码
   */
  orderFinishCode?: string;
  /**
   * 店铺纬度
   */
  storeLat?: string;
  /**
   * 店铺经度
   */
  storeLng?: string;
  /**
   * 骑手纬度
   */
  transporterLat?: string;
  /**
   * 骑手经度
   */
  transporterLng?: string;
  /**
   * 骑手姓名
   */
  transporterName?: string;
  /**
   * 骑手电话
   */
  transporterPhone?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaProgressQueryResponse".
 */
export interface DeliveryRecordDadaProgressQueryResponse1 {
  /**
   * 收货人纬度
   */
  customerLat?: number;
  /**
   * 收货人经度
   */
  customerLng?: number;
  /**
   * 收货码
   */
  orderFinishCode?: string;
  /**
   * 店铺纬度
   */
  storeLat?: string;
  /**
   * 店铺经度
   */
  storeLng?: string;
  /**
   * 骑手纬度
   */
  transporterLat?: string;
  /**
   * 骑手经度
   */
  transporterLng?: string;
  /**
   * 骑手姓名
   */
  transporterName?: string;
  /**
   * 骑手电话
   */
  transporterPhone?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryDeliverFeeRequestReq".
 */
export interface IQueryDeliverFeeRequestReq {
  /**
   * 订单金额;不含配送费
   */
  cargoPrice?: number;
  /**
   * 城市名称
   */
  cityName?: string;
  /**
   * 收货地址id
   */
  deliveryAddressId?: string;
  /**
   * 2小时达订单分配给微店主的id
   */
  openShopCustomerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
