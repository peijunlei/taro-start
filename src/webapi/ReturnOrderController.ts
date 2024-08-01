import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ReturnOrderController';

/**
 *
 * 创建退单
 *
 */
async function create(returnOrder: ICreateReturnOrderReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/return/add',

    {
      ...returnOrder,
    },
  );
  return result.context;
}

/**
 *
 * 创建退款单
 *
 */
async function createRefund(returnOrder: ICreateRefundReturnOrderReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/return/addRefund',

    {
      ...returnOrder,
    },
  );
  return result.context;
}

/**
 *
 * 查询退单快照
 *
 */
async function findTransfer(): Promise<ReturnOrderTransferByUserIdResponse> {
  let result = await sdk.get<ReturnOrderTransferByUserIdResponse>(
    '/return/findTransfer',

    {},
  );
  return result.context;
}

/**
 *
 * 是否可创建退单
 *
 */
async function isReturnable(tid: IIsReturnableTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/return/returnable/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 创建退单快照
 *
 */
async function transfer(returnOrder: ITransferReturnOrderReq): Promise<unknown> {
  let result = await sdk.post(
    '/return/transfer',

    {
      ...returnOrder,
    },
  );
  return result.context;
}

export default {
  create,

  createRefund,

  findTransfer,

  isReturnable,

  transfer,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * tid
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IIsReturnableTidReq".
 */
export type IIsReturnableTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnOrderDTO".
 */
export interface ReturnOrderDTO {
  buyer?: BuyerDTO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyDTO;
  consignee?: ConsigneeDTO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: ReturnCustomerAccountDTO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO[];
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  /**
   * 支付方式
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogDTO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemDTO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemDTO1[];
  returnLogistics?: ReturnLogisticsDTO;
  returnPoints?: ReturnPointsDTO;
  returnPrice?: ReturnPriceDTO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 支付方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid: string;
  [k: string]: any;
}
/**
 * 客户信息 买家信息
 */
export interface BuyerDTO {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 购买人联系电话
   */
  phone?: string;
  [k: string]: any;
}
/**
 * 商家信息
 */
export interface CompanyDTO {
  /**
   * 商家账号
   */
  accountName?: string;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 商家主键
   */
  companyInfoId?: number;
  /**
   * 是否是商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 收货人信息
 */
export interface ConsigneeDTO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * CustomerDeliveredAddress Id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 客户账户信息
 */
export interface ReturnCustomerAccountDTO {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface TradeDistributeItemVO {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
export interface TradeDistributeItemCommissionVO {
  commission?: number;
  customerId?: string;
  distributorId?: string;
  [k: string]: any;
}
export interface ReturnEventLogDTO {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator;
  /**
   * 描述
   */
  remark?: string;
  [k: string]: any;
}
/**
 * 操作人
 */
export interface Operator {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 增值服务
   */
  services?: VASEntity[];
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface VASEntity {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
export interface ReturnItemDTO {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价 = 商品原单价 - 商品优惠单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * sku 名称
   */
  skuName?: string;
  /**
   * sku 编号
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface ReturnItemDTO1 {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价 = 商品原单价 - 商品优惠单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * sku 名称
   */
  skuName?: string;
  /**
   * sku 编号
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 退货物流信息
 */
export interface ReturnLogisticsDTO {
  /**
   * 物流公司标准编码
   */
  code?: string;
  /**
   * 物流公司
   */
  company?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 物流单号
   */
  no?: string;
  [k: string]: any;
}
/**
 * 退积分信息
 */
export interface ReturnPointsDTO {
  /**
   * 实退积分
   */
  actualPoints?: number;
  /**
   * 申请积分
   */
  applyPoints?: number;
  [k: string]: any;
}
/**
 * 退货总金额
 */
export interface ReturnPriceDTO {
  /**
   * 实退金额，从退款流水中取的
   */
  actualReturnPrice?: number;
  /**
   * 申请金额
   */
  applyPrice?: number;
  /**
   * 申请金额状态，是否启用
   * * NO: 否
   * * YES: 是
   */
  applyStatus?: number;
  /**
   * 商品总金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BuyerDTO".
 */
export interface BuyerDTO1 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 购买人联系电话
   */
  phone?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyDTO".
 */
export interface CompanyDTO1 {
  /**
   * 商家账号
   */
  accountName?: string;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 商家主键
   */
  companyInfoId?: number;
  /**
   * 是否是商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsigneeDTO".
 */
export interface ConsigneeDTO1 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * CustomerDeliveredAddress Id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnCustomerAccountDTO".
 */
export interface ReturnCustomerAccountDTO1 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDistributeItemVO".
 */
export interface TradeDistributeItemVO1 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDistributeItemCommissionVO".
 */
export interface TradeDistributeItemCommissionVO1 {
  commission?: number;
  customerId?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnEventLogDTO".
 */
export interface ReturnEventLogDTO1 {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator;
  /**
   * 描述
   */
  remark?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Operator".
 */
export interface Operator1 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 增值服务
   */
  services?: VASEntity[];
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "VASEntity".
 */
export interface VASEntity1 {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnItemDTO".
 */
export interface ReturnItemDTO2 {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价 = 商品原单价 - 商品优惠单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * sku 名称
   */
  skuName?: string;
  /**
   * sku 编号
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnLogisticsDTO".
 */
export interface ReturnLogisticsDTO1 {
  /**
   * 物流公司标准编码
   */
  code?: string;
  /**
   * 物流公司
   */
  company?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 物流单号
   */
  no?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnPointsDTO".
 */
export interface ReturnPointsDTO1 {
  /**
   * 实退积分
   */
  actualPoints?: number;
  /**
   * 申请积分
   */
  applyPoints?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnPriceDTO".
 */
export interface ReturnPriceDTO1 {
  /**
   * 实退金额，从退款流水中取的
   */
  actualReturnPrice?: number;
  /**
   * 申请金额
   */
  applyPrice?: number;
  /**
   * 申请金额状态，是否启用
   * * NO: 否
   * * YES: 是
   */
  applyStatus?: number;
  /**
   * 商品总金额
   */
  totalPrice?: number;
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
 * via the `definition` "BaseResponse«ReturnOrderTransferByUserIdResponse»".
 */
export interface BaseResponseReturnOrderTransferByUserIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ReturnOrderTransferByUserIdResponse;
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
export interface ReturnOrderTransferByUserIdResponse {
  buyer?: BuyerVO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyVO;
  consignee?: ConsigneeVO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: CustomerAccountVO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO2[];
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付渠道枚举
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  refundFailedReason?: string;
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogVO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemVO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemVO1[];
  returnLogistics?: ReturnLogisticsVO;
  returnPoints?: ReturnPointsVO;
  returnPrice?: ReturnPriceVO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 退货方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  [k: string]: any;
}
/**
 * 客户信息 买家信息
 */
export interface BuyerVO {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 手机号
   */
  phone?: string;
  [k: string]: any;
}
/**
 * 商家信息
 */
export interface CompanyVO {
  /**
   * 商家账号
   */
  accountName?: string;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 商家主键
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 收货人信息
 */
export interface ConsigneeVO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 客户账户信息
 */
export interface CustomerAccountVO {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface TradeDistributeItemVO2 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
export interface ReturnEventLogVO {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator2;
  /**
   * 描述
   */
  remark?: string;
  [k: string]: any;
}
/**
 * 操作人
 */
export interface Operator2 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 增值服务
   */
  services?: VASEntity[];
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface ReturnItemVO {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface ReturnItemVO1 {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 退货物流信息
 */
export interface ReturnLogisticsVO {
  /**
   * 物流公司标准编码
   */
  code?: string;
  /**
   * 物流公司
   */
  company?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 物流单号
   */
  no?: string;
  [k: string]: any;
}
/**
 * 退积分信息
 */
export interface ReturnPointsVO {
  /**
   * 实退积分
   */
  actualPoints?: number;
  /**
   * 申请积分
   */
  applyPoints?: number;
  [k: string]: any;
}
/**
 * 退货总金额
 */
export interface ReturnPriceVO {
  /**
   * 实退金额
   */
  actualReturnPrice?: number;
  /**
   * 申请金额
   */
  applyPrice?: number;
  /**
   * 申请金额状态，是否启用
   */
  applyStatus?: boolean;
  /**
   * 商品总金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnOrderTransferByUserIdResponse".
 */
export interface ReturnOrderTransferByUserIdResponse1 {
  buyer?: BuyerVO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyVO;
  consignee?: ConsigneeVO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: CustomerAccountVO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO2[];
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付渠道枚举
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  refundFailedReason?: string;
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogVO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemVO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemVO1[];
  returnLogistics?: ReturnLogisticsVO;
  returnPoints?: ReturnPointsVO;
  returnPrice?: ReturnPriceVO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 退货方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BuyerVO".
 */
export interface BuyerVO1 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 手机号
   */
  phone?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyVO".
 */
export interface CompanyVO1 {
  /**
   * 商家账号
   */
  accountName?: string;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 商家主键
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsigneeVO".
 */
export interface ConsigneeVO1 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerAccountVO".
 */
export interface CustomerAccountVO1 {
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 账户ID
   */
  customerAccountId?: string;
  /**
   * 账户名字
   */
  customerAccountName?: string;
  /**
   * 银行账号
   */
  customerAccountNo?: string;
  /**
   * 开户行
   */
  customerBankName?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnEventLogVO".
 */
export interface ReturnEventLogVO1 {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator2;
  /**
   * 描述
   */
  remark?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnItemVO".
 */
export interface ReturnItemVO2 {
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  /**
   * 申请退货数量
   */
  num?: number;
  /**
   * 订单平摊价格
   */
  orderSplitPrice?: number;
  /**
   * 退货商品图片路径
   */
  pic?: string;
  /**
   * 退货商品单价
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格信息
   */
  specDetails?: string;
  /**
   * 平摊价格
   */
  splitPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnLogisticsVO".
 */
export interface ReturnLogisticsVO1 {
  /**
   * 物流公司标准编码
   */
  code?: string;
  /**
   * 物流公司
   */
  company?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 物流单号
   */
  no?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnPointsVO".
 */
export interface ReturnPointsVO1 {
  /**
   * 实退积分
   */
  actualPoints?: number;
  /**
   * 申请积分
   */
  applyPoints?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnPriceVO".
 */
export interface ReturnPriceVO1 {
  /**
   * 实退金额
   */
  actualReturnPrice?: number;
  /**
   * 申请金额
   */
  applyPrice?: number;
  /**
   * 申请金额状态，是否启用
   */
  applyStatus?: boolean;
  /**
   * 商品总金额
   */
  totalPrice?: number;
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
 * via the `definition` "ICreateReturnOrderReq".
 */
export interface ICreateReturnOrderReq {
  buyer?: BuyerDTO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyDTO;
  consignee?: ConsigneeDTO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: ReturnCustomerAccountDTO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO[];
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  /**
   * 支付方式
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogDTO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemDTO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemDTO1[];
  returnLogistics?: ReturnLogisticsDTO;
  returnPoints?: ReturnPointsDTO;
  returnPrice?: ReturnPriceDTO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 支付方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICreateRefundReturnOrderReq".
 */
export interface ICreateRefundReturnOrderReq {
  buyer?: BuyerDTO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyDTO;
  consignee?: ConsigneeDTO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: ReturnCustomerAccountDTO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO[];
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  /**
   * 支付方式
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogDTO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemDTO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemDTO1[];
  returnLogistics?: ReturnLogisticsDTO;
  returnPoints?: ReturnPointsDTO;
  returnPrice?: ReturnPriceDTO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 支付方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITransferReturnOrderReq".
 */
export interface ITransferReturnOrderReq {
  buyer?: BuyerDTO;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  company?: CompanyDTO;
  consignee?: ConsigneeDTO;
  /**
   * 创建时间
   */
  createTime?: string;
  customerAccount?: ReturnCustomerAccountDTO;
  /**
   * 退货说明
   */
  description?: string;
  /**
   * 分销单品列表
   */
  distributeItems?: TradeDistributeItemVO[];
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 退单完成时间
   */
  finishTime?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 退单号
   */
  id?: string;
  /**
   * 退单附件
   */
  images?: string[];
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  /**
   * 支付方式
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   */
  payType?: '0' | '1';
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 转账汇款
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   */
  payWay?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY' | 'ADVANCE' | 'POINT' | 'CASH' | 'UNIONPAY_B2B' | 'COUPON' | 'BALANCE';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
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
  rejectReason?: string;
  /**
   * 退货日志记录
   */
  returnEventLogs?: ReturnEventLogDTO[];
  /**
   * 退货单状态
   * * INIT: 0: INIT 创建退单
   * * AUDIT: 1: AUDIT 已审核
   * * DELIVERED: 2: DELIVERED 已发退货
   * * RECEIVED: 3: RECEIVED 已收到退货
   * * REFUNDED: 4: REFUNDED 已退款
   * * COMPLETED: 5: COMPLETED 已完成
   * * REJECT_REFUND: 6: REJECT_REFUND 拒绝退款
   * * REJECT_RECEIVE: 7: REJECT_RECEIVE 拒绝收货
   * * VOID: 8: VOID 已作废
   * * REFUND_FAILED: 9: REFUND_FAILED 退款失败
   */
  returnFlowState?:
    | 'INIT'
    | 'AUDIT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'REFUNDED'
    | 'COMPLETED'
    | 'REJECT_REFUND'
    | 'REJECT_RECEIVE'
    | 'VOID'
    | 'REFUND_FAILED';
  /**
   * 退单赠品信息
   */
  returnGifts?: ReturnItemDTO[];
  /**
   * 退货商品信息
   */
  returnItems?: ReturnItemDTO1[];
  returnLogistics?: ReturnLogisticsDTO;
  returnPoints?: ReturnPointsDTO;
  returnPrice?: ReturnPriceDTO;
  /**
   * 退货原因
   * * WRONGGOODS: 0: 商家发错货
   * * NOTDISCRIPTION: 1: 货品与描述不符
   * * ERRORGOODS: 2: 货品少件/受损/污渍等
   * * BADGOODS: 3: 货品质量问题
   * * OTHER: 4: 其他
   */
  returnReason?: number;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: number;
  /**
   * 支付方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
