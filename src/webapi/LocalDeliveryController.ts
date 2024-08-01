import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LocalDeliveryController';

/**
 *
 * 新增或重发配送
 *
 */
async function add(
  request: IAddRequestReq,
): Promise<DeliveryRecordDadaAddResponse> {
  let result = await sdk.post<DeliveryRecordDadaAddResponse>(
    '/setting/local-delivery',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 取消配送
 *
 */
async function cancel_(request: ICancel_RequestReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/setting/local-delivery',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * callback
 *
 */
async function callback(request: ICallbackRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/setting/local-delivery/callback',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 完成妥投异常
 *
 */
async function confirmFault(
  orderCode: IConfirmFaultOrderCodeReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/setting/local-delivery/fault/{orderCode}'.replace(
      '{orderCode}',
      orderCode + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 取消理由列表
 *
 */
async function reasons(): Promise<unknown> {
  let result = await sdk.get(
    '/setting/local-delivery/reasons',

    {},
  );
  return result.context;
}

/**
 *
 * 配送单详情
 *
 */
async function get(
  orderCode: IGetOrderCodeReq,
): Promise<DeliveryRecordDadaByIdResponse> {
  let result = await sdk.get<DeliveryRecordDadaByIdResponse>(
    '/setting/local-delivery/{orderCode}'.replace(
      '{orderCode}',
      orderCode + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  cancel_,

  callback,

  confirmFault,

  reasons,

  get,
};

/**
 * orderCode
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IConfirmFaultOrderCodeReq".
 */
export type IConfirmFaultOrderCodeReq = string;
/**
 * orderCode
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetOrderCodeReq".
 */
export type IGetOrderCodeReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaAddRequest".
 */
export interface DeliveryRecordDadaAddRequest {
  orderNo?: string;
  sourceId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DeliveryRecordDadaAddResponse»".
 */
export interface BaseResponseDeliveryRecordDadaAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DeliveryRecordDadaAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface DeliveryRecordDadaAddResponse {
  dadaAdd?: DeliveryRecordDadaAddVO;
  [k: string]: any;
}
/**
 * 已新增的达达配送记录信息
 */
export interface DeliveryRecordDadaAddVO {
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送距离;单位:米
   */
  distance?: number;
  /**
   * 实际运费
   */
  fee?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaAddResponse".
 */
export interface DeliveryRecordDadaAddResponse1 {
  dadaAdd?: DeliveryRecordDadaAddVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaAddVO".
 */
export interface DeliveryRecordDadaAddVO1 {
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送距离;单位:米
   */
  distance?: number;
  /**
   * 实际运费
   */
  fee?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaCancelByIdRequest".
 */
export interface DeliveryRecordDadaCancelByIdRequest {
  /**
   * 取消理由id
   */
  cancelReasonId?: number;
  /**
   * 订单号
   */
  orderCode?: string;
  /**
   * 取消原因
   */
  reason?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaCallBackRequest".
 */
export interface DeliveryRecordDadaCallBackRequest {
  /**
   * 订单取消原因来源
   */
  cancel_from?: number;
  /**
   * 取消原因
   */
  cancel_reason?: string;
  /**
   * 达达运单号
   */
  client_id?: string;
  /**
   * 配送员id
   */
  dm_id?: number;
  /**
   * 配送员手机号
   */
  dm_mobile?: string;
  /**
   * 配送员姓名
   */
  dm_name?: string;
  /**
   * 订单号
   */
  order_id?: string;
  /**
   * 订单状态
   */
  order_status?: number;
  /**
   * 签名
   */
  signature?: string;
  /**
   * 更新时间
   */
  update_time?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DeliveryRecordDadaByIdResponse»".
 */
export interface BaseResponseDeliveryRecordDadaByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DeliveryRecordDadaByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface DeliveryRecordDadaByIdResponse {
  deliveryRecordDadaVO?: DeliveryRecordDadaVO;
  [k: string]: any;
}
/**
 * 达达配送记录信息
 */
export interface DeliveryRecordDadaVO {
  /**
   * 其他取消理由
   */
  cancelReason?: string;
  /**
   * 取消理由id
   */
  cancelReasonId?: number;
  /**
   * 订单金额;不含配送费
   */
  cargoPrice?: number;
  /**
   * 城市编码
   */
  cityCode?: string;
  /**
   * deduct_fee
   */
  deductFee?: number;
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送编号
   */
  deliveryId?: string;
  /**
   * 0:接受订单1:待接单2:待取货3:配送中4:已完成5:已取消7:已过期8:指派单9:返回妥投异常中10:妥投异常完成100:骑士到店1000:创建达达运单失败
   */
  deliveryStatus?: number;
  /**
   * 配送距离;单位:米
   */
  distance?: number;
  /**
   * 配送员手机号
   */
  dmMobile?: string;
  /**
   * 配送员姓名
   */
  dmName?: string;
  /**
   * 实际运费
   */
  fee?: number;
  /**
   * 保价费
   */
  insuranceFee?: number;
  /**
   * 是否需要垫付;1:是 0:否 (垫付订单金额，非运费)
   */
  isPrepay?: number;
  /**
   * 是否使用保价费;0:不使用,1:使用
   */
  isUseInsurance?: number;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 收货人地址
   */
  receiverAddress?: string;
  /**
   * 收货人地址维度
   */
  receiverLat?: number;
  /**
   * 收货人地址经度
   */
  receiverLng?: number;
  /**
   * 收货人姓名
   */
  receiverName?: string;
  /**
   * 收货人电话
   */
  receiverPhone?: string;
  /**
   * 小费
   */
  tipsFee?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaByIdResponse".
 */
export interface DeliveryRecordDadaByIdResponse1 {
  deliveryRecordDadaVO?: DeliveryRecordDadaVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeliveryRecordDadaVO".
 */
export interface DeliveryRecordDadaVO1 {
  /**
   * 其他取消理由
   */
  cancelReason?: string;
  /**
   * 取消理由id
   */
  cancelReasonId?: number;
  /**
   * 订单金额;不含配送费
   */
  cargoPrice?: number;
  /**
   * 城市编码
   */
  cityCode?: string;
  /**
   * deduct_fee
   */
  deductFee?: number;
  /**
   * 运费
   */
  deliverFee?: number;
  /**
   * 配送编号
   */
  deliveryId?: string;
  /**
   * 0:接受订单1:待接单2:待取货3:配送中4:已完成5:已取消7:已过期8:指派单9:返回妥投异常中10:妥投异常完成100:骑士到店1000:创建达达运单失败
   */
  deliveryStatus?: number;
  /**
   * 配送距离;单位:米
   */
  distance?: number;
  /**
   * 配送员手机号
   */
  dmMobile?: string;
  /**
   * 配送员姓名
   */
  dmName?: string;
  /**
   * 实际运费
   */
  fee?: number;
  /**
   * 保价费
   */
  insuranceFee?: number;
  /**
   * 是否需要垫付;1:是 0:否 (垫付订单金额，非运费)
   */
  isPrepay?: number;
  /**
   * 是否使用保价费;0:不使用,1:使用
   */
  isUseInsurance?: number;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 收货人地址
   */
  receiverAddress?: string;
  /**
   * 收货人地址维度
   */
  receiverLat?: number;
  /**
   * 收货人地址经度
   */
  receiverLng?: number;
  /**
   * 收货人姓名
   */
  receiverName?: string;
  /**
   * 收货人电话
   */
  receiverPhone?: string;
  /**
   * 小费
   */
  tipsFee?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddRequestReq".
 */
export interface IAddRequestReq {
  orderNo?: string;
  sourceId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancel_RequestReq".
 */
export interface ICancel_RequestReq {
  /**
   * 取消理由id
   */
  cancelReasonId?: number;
  /**
   * 订单号
   */
  orderCode?: string;
  /**
   * 取消原因
   */
  reason?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICallbackRequestReq".
 */
export interface ICallbackRequestReq {
  /**
   * 订单取消原因来源
   */
  cancel_from?: number;
  /**
   * 取消原因
   */
  cancel_reason?: string;
  /**
   * 达达运单号
   */
  client_id?: string;
  /**
   * 配送员id
   */
  dm_id?: number;
  /**
   * 配送员手机号
   */
  dm_mobile?: string;
  /**
   * 配送员姓名
   */
  dm_name?: string;
  /**
   * 订单号
   */
  order_id?: string;
  /**
   * 订单状态
   */
  order_status?: number;
  /**
   * 签名
   */
  signature?: string;
  /**
   * 更新时间
   */
  update_time?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
