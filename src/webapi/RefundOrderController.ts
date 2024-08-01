import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'RefundOrderController';

/**
 *
 * 根据退单编号查询退款单
 *
 */
async function queryRefundByReturnOrderNo(
  returnOrderNo: IQueryRefundByReturnOrderNoReturnOrderNoReq,
): Promise<RefundOrderResponse> {
  let result = await sdk.get<RefundOrderResponse>(
    '/account/refundOrders/{returnOrderNo}'.replace('{returnOrderNo}', returnOrderNo + ''),

    {},
  );
  return result.context;
}

export default {
  queryRefundByReturnOrderNo,
};

/**
 * 退单编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryRefundByReturnOrderNoReturnOrderNoReq".
 */
export type IQueryRefundByReturnOrderNoReturnOrderNoReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RefundOrderResponse»".
 */
export interface BaseResponseRefundOrderResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RefundOrderResponse;
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
export interface RefundOrderResponse {
  /**
   * 实退积分
   */
  actualReturnPoints?: number;
  /**
   * 实退金额
   */
  actualReturnPrice?: number;
  /**
   * 备注
   */
  comment?: string;
  /**
   * 退单下单时间
   */
  createTime?: string;
  /**
   * 客户账号
   */
  customerAccountName?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 线下平台账户
   */
  offlineAccountId?: number;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 退款流水号
   */
  refundBillCode?: string;
  /**
   * 退款时间
   */
  refundBillTime?: string;
  /**
   * 退款单id
   */
  refundId?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 商家申请退款(待平台退款)
   */
  refundStatus?: 0 | 1 | 2 | 3;
  /**
   * 拒绝原因
   */
  refuseReason?: string;
  /**
   * 退款账户
   */
  returnAccount?: number;
  /**
   * 退款账户
   */
  returnAccountName?: string;
  /**
   * 退单编号
   */
  returnOrderCode?: string;
  /**
   * 应退积分
   */
  returnPoints?: number;
  /**
   * 应退金额
   */
  returnPrice?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RefundOrderResponse".
 */
export interface RefundOrderResponse1 {
  /**
   * 实退积分
   */
  actualReturnPoints?: number;
  /**
   * 实退金额
   */
  actualReturnPrice?: number;
  /**
   * 备注
   */
  comment?: string;
  /**
   * 退单下单时间
   */
  createTime?: string;
  /**
   * 客户账号
   */
  customerAccountName?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 线下平台账户
   */
  offlineAccountId?: number;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 退款流水号
   */
  refundBillCode?: string;
  /**
   * 退款时间
   */
  refundBillTime?: string;
  /**
   * 退款单id
   */
  refundId?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 商家申请退款(待平台退款)
   */
  refundStatus?: 0 | 1 | 2 | 3;
  /**
   * 拒绝原因
   */
  refuseReason?: string;
  /**
   * 退款账户
   */
  returnAccount?: number;
  /**
   * 退款账户
   */
  returnAccountName?: string;
  /**
   * 退单编号
   */
  returnOrderCode?: string;
  /**
   * 应退积分
   */
  returnPoints?: number;
  /**
   * 应退金额
   */
  returnPrice?: number;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
