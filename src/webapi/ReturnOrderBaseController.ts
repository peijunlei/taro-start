import * as sdk from './fetch';

const controllerName = 'ReturnOrderBaseController';

/**
 *
 * 取消退单
 *
 */
async function cancel(rid: ICancelRidReq, reason: ICancelReasonReq): Promise<unknown> {
  let result = await sdk.post(
    '/return/cancel/{rid}'.replace('{rid}', rid + '') + '?reason=' + reason,

    {},
  );
  return result.context;
}

/**
 *
 * 填写物流信息
 *
 */
async function deliver(logistics: IDeliverLogisticsReq, rid: IDeliverRidReq): Promise<unknown> {
  let result = await sdk.post(
    '/return/deliver/{rid}'.replace('{rid}', rid + ''),

    {
      ...logistics,
    },
  );
  return result.context;
}

/**
 *
 * 根据订单id查询退单(过滤拒绝退款、拒绝收货、已作废)
 *
 */
async function findByTid(tid: IFindByTidTidReq): Promise<ReturnOrderVOArray> {
  let result = await sdk.get<ReturnOrderVOArray>(
    '/return/findByTid/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据订单id查询已完成的退单
 *
 */
async function findCompletedByTid(tid: IFindCompletedByTidTidReq): Promise<ReturnOrderVOArray> {
  let result = await sdk.get<ReturnOrderVOArray>(
    '/return/findCompletedByTid/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单附件
 *
 */
async function images(rid: IImagesRidReq): Promise<unknow> {
  let result = await sdk.get<unknow>(
    '/return/images/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询 from ES
 *
 */
async function page(request: IPageRequestReq): Promise<MicroServicePageReturnOrderVO> {
  let result = await sdk.post<MicroServicePageReturnOrderVO>(
    '/return/page',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 所有退货原因
 *
 */
async function findReturnReason(): Promise<unknow> {
  let result = await sdk.get<unknow>(
    '/refund/cause-list',

    {},
  );
  return result.context;
}

/**
 *
 * 查询退单退款记录
 *
 */
async function refundOrder(rid: IRefundOrderRidReq): Promise<RefundOrderResponse> {
  let result = await sdk.get<RefundOrderResponse>(
    '/return/refundOrder/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单商品清单
 *
 */
async function returnItems(rid: IReturnItemsRidReq): Promise<ReturnItemVOArray> {
  let result = await sdk.get<ReturnItemVOArray>(
    '/return/returnItems/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询退款物流
 *
 */
async function returnLogistics(rid: IReturnLogisticsRidReq): Promise<ReturnLogisticsVO> {
  let result = await sdk.get<ReturnLogisticsVO>(
    '/return/returnLogistics/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退货订单详情和可退商品数
 *
 */
async function tradeDetails(tid: ITradeDetailsTidReq): Promise<TradeVO> {
  let result = await sdk.get<TradeVO>(
    '/return/trade/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查找所有退货方式
 *
 */
async function findReturnWay(): Promise<unknow> {
  let result = await sdk.get<unknow>(
    '/return/ways',

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单详情
 *
 */
// async function findById(rid: IFindByIdRidReq): Promise<ReturnOrderVO> {
//   let result = await sdk.get<ReturnOrderVO>(
//     '/return/{rid}'.replace('{rid}', rid + ''),
//
//     {},
//   );
//   return result.context;
// }

/**
 *
 * 查看退单详情
 *
 */
async function findByIdUsingHEAD(rid: IFindByIdUsingHEADRidReq): Promise<ReturnOrderVO> {
  let result = await sdk.get<ReturnOrderVO>(
    '/return/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单详情
 *
 */
// async function findById(rid: IFindByIdRidReq): Promise<ReturnOrderVO> {
//   let result = await sdk.post<ReturnOrderVO>(
//     '/return/{rid}'.replace('{rid}', rid + ''),
//
//     {},
//   );
//   return result.context;
// }

/**
 *
 * 查看退单详情
 *
 */
async function findById(rid: IFindByIdRidReq): Promise<ReturnOrderVO> {
  let result = await sdk.get<ReturnOrderVO>(
    '/return/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单详情
 *
 */
async function findById_(rid: IFindById_RidReq): Promise<ReturnOrderVO> {
  let result = await sdk.get<ReturnOrderVO>(
    '/return/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单详情
 *
 */
async function findByIdUsingOPTIONS(rid: IFindByIdUsingOPTIONSRidReq): Promise<ReturnOrderVO> {
  let result = await sdk.get<ReturnOrderVO>(
    '/return/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查看退单详情
 *
 */
async function findByIdUsingPATCH(rid: IFindByIdUsingPATCHRidReq): Promise<ReturnOrderVO> {
  let result = await sdk.get<ReturnOrderVO>(
    '/return/{rid}'.replace('{rid}', rid + ''),

    {},
  );
  return result.context;
}

export default {
  cancel,

  deliver,

  findByTid,

  findCompletedByTid,

  images,

  page,

  findReturnReason,

  refundOrder,

  returnItems,

  returnLogistics,

  tradeDetails,

  findReturnWay,

  findById,

  findByIdUsingHEAD,

  findById_,

  findByIdUsingOPTIONS,

  findByIdUsingPATCH,
};

/**
 * 内容
 */
export type ReturnOrderVOArray = ReturnOrderVO[];
/**
 * 内容
 */
export type unknow = string[];
/**
 * 内容
 */
export type ReturnItemVOArray = ReturnItemVO3[];
/**
 * reason
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancelReasonReq".
 */
export type ICancelReasonReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancelRidReq".
 */
export type ICancelRidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeliverRidReq".
 */
export type IDeliverRidReq = string;
/**
 * 订单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByTidTidReq".
 */
export type IFindByTidTidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnOrderVOArray".
 */
export type ReturnOrderVOArray1 = ReturnOrderVO4[];
/**
 * 订单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindCompletedByTidTidReq".
 */
export type IFindCompletedByTidTidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IImagesRidReq".
 */
export type IImagesRidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "unknow".
 */
export type unknow1 = string[];
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRefundOrderRidReq".
 */
export type IRefundOrderRidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IReturnItemsRidReq".
 */
export type IReturnItemsRidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnItemVOArray".
 */
export type ReturnItemVOArray1 = ReturnItemVO4[];
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IReturnLogisticsRidReq".
 */
export type IReturnLogisticsRidReq = string;
/**
 * 订单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeDetailsTidReq".
 */
export type ITradeDetailsTidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdRidReq".
 */
export type IFindByIdRidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdUsingHEADRidReq".
 */
export type IFindByIdUsingHEADRidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindById_RidReq".
 */
export type IFindById_RidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdUsingOPTIONSRidReq".
 */
export type IFindByIdUsingOPTIONSRidReq = string;
/**
 * 退单Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdUsingPATCHRidReq".
 */
export type IFindByIdUsingPATCHRidReq = string;

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

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnLogisticsDTO".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«ReturnOrderVO»»".
 */
export interface BaseResponseListReturnOrderVO {
  /**
   * 结果码
   */
  code: string;
  context?: ReturnOrderVOArray;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

export interface ReturnOrderVO {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
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
  distributeItems?: TradeDistributeItemVO[];
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
  invoice?: InvoiceVO;
  orderConsignee?: ConsigneeVO1;
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  payInfo?: PayInfoVO;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  refundFailedReason?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 供应商申请退款(待平台退款)
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
  returnShopCommissions?: ReturnShopCommissionsVO;
  /**
   * 退单类型
   * * RETURN: 0: 退货
   * * REFUND: 1: 退款
   */
  returnType?: string;
  /**
   * 退货方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  returnWay?: number;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO;
  /**
   * linkedmall侧 商家同意退单的留言，一般包含实际退货地址
   */
  thirdSellerAgreeMsg?: string;

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
   * 标识用户是否属于当前订单所属供应商
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
 * 供应商信息
 */
export interface CompanyVO {
  /**
   * 供应商账号
   */
  accountName?: string;
  /**
   * 供应商编号
   */
  companyCode?: string;
  /**
   * 供应商主键
   */
  companyInfoId?: number;
  /**
   * 供应商类型
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
   * 供应商名称
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

/**
 * 发票
 */
export interface InvoiceVO {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 * 普通发票与增票至少一项必传
 */
export interface GeneralInvoiceVO {
  /**
   * 发票类型
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头，单位发票必传
   */
  title?: string;

  [k: string]: any;
}

/**
 * 增值税发票与普票至少一项必传
 */
export interface SpecialInvoiceVO {
  /**
   * 账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 手机号
   */
  phoneNo?: string;

  [k: string]: any;
}

/**
 * 收货人信息
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
 * 支付信息
 */
export interface PayInfoVO {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;

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
   * 友店会员Id
   */
  customerId?: string;
  /**
   * 地推用户Id
   */
  infoId?: string;
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
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 同步数据所用
   */
  token?: string;
  /**
   * 用户Id
   */
  userId?: string;

  [k: string]: any;
}

export interface ReturnItemVO {
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  erpCode?: string;
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
  salesTaxRate?: number;
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
   * 仍可退数量
   */
  canReturnNum?: number;
  erpCode?: string;
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
  salesTaxRate?: number;
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
 * 退佣金信息
 */
export interface ReturnShopCommissionsVO {
  /**
   * 实退佣金
   */
  actualShopCommissions?: number;
  /**
   * 申请佣金
   */
  applyShopCommissions?: number;

  [k: string]: any;
}

/**
 * 订单总体状态
 */
export interface TradeStateVO {
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开票状态
   * * NO_BIllING: 0: NO_BIllING 待开票
   * * HAVE_BIllING: 1: HAVE_BIllING 已开票
   * * VOID: 2: VOID 作废
   * * ALL: 3: ALL 所有
   */
  billingStatus?: 'NO_BIllING' | 'HAVE_BIllING' | 'VOID' | 'ALL';
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   */
  flowState?:
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: 'NOT_PAID' | 'UNCONFIRMED' | 'PAID';
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnOrderVO".
 */
export interface ReturnOrderVO1 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
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
  distributeItems?: TradeDistributeItemVO[];
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
  invoice?: InvoiceVO;
  orderConsignee?: ConsigneeVO1;
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  payInfo?: PayInfoVO;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  refundFailedReason?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 供应商申请退款(待平台退款)
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
  returnShopCommissions?: ReturnShopCommissionsVO;
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
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO;

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
   * 标识用户是否属于当前订单所属供应商
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
   * 供应商账号
   */
  accountName?: string;
  /**
   * 供应商编号
   */
  companyCode?: string;
  /**
   * 供应商主键
   */
  companyInfoId?: number;
  /**
   * 供应商类型
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
   * 供应商名称
   */
  supplierName?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsigneeVO".
 */
export interface ConsigneeVO2 {
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
 * via the `definition` "InvoiceVO".
 */
export interface InvoiceVO1 {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GeneralInvoiceVO".
 */
export interface GeneralInvoiceVO1 {
  /**
   * 发票类型
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头，单位发票必传
   */
  title?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SpecialInvoiceVO".
 */
export interface SpecialInvoiceVO1 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 手机号
   */
  phoneNo?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayInfoVO".
 */
export interface PayInfoVO1 {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;

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
   * 友店会员Id
   */
  customerId?: string;
  /**
   * 地推用户Id
   */
  infoId?: string;
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
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 同步数据所用
   */
  token?: string;
  /**
   * 用户Id
   */
  userId?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnItemVO".
 */
export interface ReturnItemVO2 {
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  erpCode?: string;
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
  salesTaxRate?: number;
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
 * via the `definition` "ReturnShopCommissionsVO".
 */
export interface ReturnShopCommissionsVO1 {
  /**
   * 实退佣金
   */
  actualShopCommissions?: number;
  /**
   * 申请佣金
   */
  applyShopCommissions?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeStateVO".
 */
export interface TradeStateVO1 {
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开票状态
   * * NO_BIllING: 0: NO_BIllING 待开票
   * * HAVE_BIllING: 1: HAVE_BIllING 已开票
   * * VOID: 2: VOID 作废
   * * ALL: 3: ALL 所有
   */
  billingStatus?: 'NO_BIllING' | 'HAVE_BIllING' | 'VOID' | 'ALL';
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   */
  flowState?:
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: 'NOT_PAID' | 'UNCONFIRMED' | 'PAID';
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«string»»".
 */
export interface BaseResponseListString {
  /**
   * 结果码
   */
  code: string;
  context?: unknow;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReturnOrderPageRequest".
 */
export interface ReturnOrderPageRequest {
  /**
   * 退单创建开始时间，精确到天
   */
  beginTime?: string;
  /**
   * 开票状态
   */
  billingStatus?: string;
  /**
   * 购买人账号
   */
  buyerAccount?: string;
  /**
   * 购买人编号
   */
  buyerId?: string;
  /**
   * 购买人姓名
   */
  buyerName?: string;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 供应商名称
   */
  companyInfoId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 手机号
   */
  consigneePhone?: string;
  /**
   * 客户id
   */
  customerIds?: {
    [k: string]: any;
  }[];
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 退单创建结束时间，精确到天
   */
  endTime?: string;
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 退单流程状态
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
   * 退单id
   */
  rid?: string;
  /**
   * 退单编号列表
   */
  rids?: string[];
  /**
   * 商品名称
   */
  skuName?: string;
  /**
   * sku编号
   */
  skuNo?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 供应商编号
   */
  supplierCode?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 订单id
   */
  tid?: string;
  token?: string;
  /**
   * pc搜索条件
   */
  tradeOrSkuName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroServicePage«ReturnOrderVO»»".
 */
export interface BaseResponseMicroServicePageReturnOrderVO {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageReturnOrderVO;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

/**
 * 内容
 */
export interface MicroServicePageReturnOrderVO {
  /**
   * 具体数据内容
   */
  content?: ReturnOrderVO2[];
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

export interface ReturnOrderVO2 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
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
  distributeItems?: TradeDistributeItemVO[];
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
  invoice?: InvoiceVO;
  orderConsignee?: ConsigneeVO1;
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  payInfo?: PayInfoVO;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  refundFailedReason?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 供应商申请退款(待平台退款)
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
  returnShopCommissions?: ReturnShopCommissionsVO;
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
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO;

  [k: string]: any;
}

export interface Sort {
  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ReturnOrderVO»".
 */
export interface MicroServicePageReturnOrderVO1 {
  /**
   * 具体数据内容
   */
  content?: ReturnOrderVO2[];
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort1 {
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
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * APPLY: 供应商申请退款(待平台退款)
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
   * 供应商名称
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
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * APPLY: 供应商申请退款(待平台退款)
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
   * 供应商名称
   */
  supplierName?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«ReturnItemVO»»".
 */
export interface BaseResponseListReturnItemVO {
  /**
   * 结果码
   */
  code: string;
  context?: ReturnItemVOArray;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

export interface ReturnItemVO3 {
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  erpCode?: string;
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
  salesTaxRate?: number;
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
 * via the `definition` "BaseResponse«ReturnLogisticsVO»".
 */
export interface BaseResponseReturnLogisticsVO {
  /**
   * 结果码
   */
  code: string;
  context?: ReturnLogisticsVO2;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

/**
 * 内容
 */
export interface ReturnLogisticsVO2 {
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
 * via the `definition` "BaseResponse«TradeVO»".
 */
export interface BaseResponseTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeVO;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

/**
 * 内容
 */
export interface TradeVO {
  /**
   * 分配的微店地址信息
   */
  allotOpenShopAddr?: string;
  /**
   * 分配的微店id
   */
  allotOpenShopId?: string;
  bossRemark?: string;
  buyer?: BuyerVO2;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可以开票标识
   * * NO: 否
   * * YES: 是
   */
  canBilling?: number;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  /**
   * 可退积分
   */
  canReturnPoints?: number;
  /**
   * 已退金额
   */
  canReturnPrice?: number;
  /**
   * 可退佣金
   */
  canReturnShopCommissions?: number;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 佣金（订单返利）
   */
  commission?: number;
  /**
   * 是否返利
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: number;
  /**
   * 分销佣金提成信息列表
   */
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO3;
  customerOpenShopParentId?: string;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递配送
   * * PICKUP_STORES: 2: 到店自提
   * * TWOHOURS_SERVICE: 3: 2小时达
   */
  deliverWay?: 0 | 1 | 2 | 3;
  distributeItems?: TradeDistributeItemVO2[];
  distributionCustomerId?: string;
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 营销赠品全量列表
   */
  gifts?: TradeItemVO[];
  goodsShareId?: string;
  groundpushCustomerIds?: string[];
  /**
   * 订单组号
   */
  groupId?: string;
  /**
   * 是否拼团订单
   */
  grouponFlag?: boolean;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  invoice?: InvoiceVO2;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  isPrescribeOrder?: boolean;
  /**
   * 是否核销 0：否，1：是(自提订单)
   */
  isVerification?: number;
  marketingId?: number;
  marketingTypeSpecial?: '0' | '1' | '2' | '3';
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
  payInfo?: PayInfoVO2;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付单号
   */
  payOrderNo?: string;
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  /**
   * 处方单药品
   */
  prescriptionDrugs?: PrescriptionDrugVO[];
  /**
   * 处方单号
   */
  prescriptionId?: string;
  prescriptionOrder?: PrescriptionOrderVO;
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  seller?: SellerVO;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  shareUserId?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  supplier?: SupplierVO;
  templateFileDownLoadPath?: string;
  tradeCoupon?: TradeCouponVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  tradeGroupon?: TradeGrouponVO;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO1[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO2;
  /**
   * 核销码
   */
  verificationCode?: string;

  [k: string]: any;
}

/**
 * 购买人
 */
export interface BuyerVO2 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属供应商
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

export interface TradeCommissionVO {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;

  [k: string]: any;
}

/**
 * 收货人信息
 */
export interface ConsigneeVO3 {
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

export interface TradeDistributeItemVO2 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;

  [k: string]: any;
}

export interface TradeItemVO {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  chanalCommission?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  drugType?: '0' | '1' | '2';
  employeeCommission?: number;
  /**
   * erpCode
   */
  erpCode?: string;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  isHaveCouponCode?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  marketingId?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  marketingTypeSpecial?: '0' | '1' | '2' | '3';
  /**
   * 药品分类 1 非处方  2 功能保健
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 处方单号
   */
  prescriptionId?: string;
  /**
   * 成交价格
   */
  price?: number;
  salesTaxRate?: number;
  selfMentionType?: '0' | '1';
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * 佣金
   */
  shopCommissions?: number;
  /**
   * 佣金兑换的金额
   */
  shopCommissionsPrice?: number;
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
   * 优购码商品结算信息
   */
  smallShopCouponSettlement?: SmallShopCouponSettlementVO[];
  /**
   * 规格描述信息
   */
  specDetails?: string;
  specificStock?: boolean;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  twoHoursExpress?: '0' | '1';
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

export interface CouponSettlementVO {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;

  [k: string]: any;
}

export interface MarketingSettlementVO {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;

  [k: string]: any;
}

export interface SmallShopCouponSettlementVO {
  scouponCode?: string;
  scouponCodeId?: string;
  scouponId?: number;
  smallShopCouponPrice?: number;
  splitPrice?: number;

  [k: string]: any;
}

/**
 * 发票
 */
export interface InvoiceVO2 {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 * 支付信息
 */
export interface PayInfoVO2 {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;

  [k: string]: any;
}

export interface PrescriptionDrugVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志(0：未删除，1：已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 药品内部id(可忽略)
   */
  drugId?: number;
  /**
   * 药品名称
   */
  drugName?: string;
  /**
   * 处方号
   */
  prescriptionId?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 药品规格
   */
  specification?: string;
  /**
   * 药品第三方标识(对应商品表的goodsInfoId)
   */
  thirdSkuId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;

  [k: string]: any;
}

/**
 * 处方单号
 */
export interface PrescriptionOrderVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 患者id
   */
  customerId?: string;
  /**
   * 删除标志(0：未删除，1：已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 临床诊断
   */
  diagnosDesc?: string;
  /**
   * 药方发药人员
   */
  dispensing?: string;
  /**
   * 医生信息
   */
  doctor?: string;
  /**
   * 病情描述
   */
  illnessDesc?: string;
  /**
   * 处方单图片url
   */
  imageUrl?: string;
  /**
   * 患者信息
   */
  patient?: string;
  /**
   * 药方审核人员
   */
  pharmacist?: string;
  /**
   * 处方号
   */
  prescriptionId?: string;
  /**
   * 处方名称
   */
  prescriptionName?: string;
  /**
   * 开药科室
   */
  sectionId?: number;
  /**
   * 处方状态：1待审核，2审核通过，3审核拒绝，4已完成（已取药），5已失效，6未发送给患者
   * * INIT: 0: 初始值(未使用)
   * * TO_AUDIT: 1: 待审核
   * * AUDIT_SUCCESS: 2: 审核通过
   * * AUDIT_REFUSED: 3: 审核拒绝
   * * COMPLETED: 4: 已完成（已取药）
   * * INVALID: 5: 已失效
   * * UNSENTED: 6: 未发送给患者
   */
  status?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 * boss卖方
 */
export interface SellerVO {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;

  [k: string]: any;
}

/**
 * 供应商
 */
export interface SupplierVO {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商id
   */
  supplierId?: number;
  /**
   * 供应商名称
   */
  supplierName?: string;

  [k: string]: any;
}

/**
 * 订单使用的店铺优惠券
 */
export interface TradeCouponVO {
  /**
   * 优惠券码值
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 优惠券关联的商品id集合
   */
  goodsInfoIds?: string[];

  [k: string]: any;
}

export interface TradeDeliverVO {
  consignee?: ConsigneeVO4;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';

  [k: string]: any;
}

/**
 * 收货人信息
 */
export interface ConsigneeVO4 {
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

export interface ShippingItemVO {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

/**
 * 物流信息
 */
export interface LogisticsVO {
  /**
   * 物流公司编号
   */
  logisticCompanyId?: string;
  /**
   * 物流公司名称
   */
  logisticCompanyName?: string;
  /**
   * 物流费
   */
  logisticFee?: number;
  /**
   * 物流号
   */
  logisticNo?: string;
  /**
   * 物流公司标准编码
   */
  logisticStandardCode?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;

  [k: string]: any;
}

export interface ShippingItemVO1 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

export interface TradeEventLogVO {
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

  [k: string]: any;
}

/**
 * 操作员
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
   * 友店会员Id
   */
  customerId?: string;
  /**
   * 地推用户Id
   */
  infoId?: string;
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
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 同步数据所用
   */
  token?: string;
  /**
   * 用户Id
   */
  userId?: string;

  [k: string]: any;
}

/**
 * 订单拼团信息
 */
export interface TradeGrouponVO {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;

  [k: string]: any;
}

export interface TradeItemVO1 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  chanalCommission?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  drugType?: '0' | '1' | '2';
  employeeCommission?: number;
  /**
   * erpCode
   */
  erpCode?: string;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  isHaveCouponCode?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  marketingId?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  marketingTypeSpecial?: '0' | '1' | '2' | '3';
  /**
   * 药品分类 1 非处方  2 功能保健
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 处方单号
   */
  prescriptionId?: string;
  /**
   * 成交价格
   */
  price?: number;
  salesTaxRate?: number;
  selfMentionType?: '0' | '1';
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * 佣金
   */
  shopCommissions?: number;
  /**
   * 佣金兑换的金额
   */
  shopCommissionsPrice?: number;
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
   * 优购码商品结算信息
   */
  smallShopCouponSettlement?: SmallShopCouponSettlementVO[];
  /**
   * 规格描述信息
   */
  specDetails?: string;
  specificStock?: boolean;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  twoHoursExpress?: '0' | '1';
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

export interface TradeMarketingVO {
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO;
  /**
   * 当前满赠活动关联的赠品id列表，非满赠活动则为空
   */
  giftIds?: string[];
  giftLevel?: MarketingFullGiftLevelVO;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 该活动关联商品除去优惠金额外的应付金额
   */
  realPayAmount?: number;
  reductionLevel?: MarketingFullReductionLevelVO;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  /**
   * 营销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5;

  [k: string]: any;
}

/**
 * 营销满折多级优惠信息
 */
export interface MarketingFullDiscountLevelVO {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;

  [k: string]: any;
}

/**
 * 营销满赠多级优惠信息
 */
export interface MarketingFullGiftLevelVO {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;

  [k: string]: any;
}

export interface MarketingFullGiftDetailVO {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;

  [k: string]: any;
}

/**
 * 营销满减多级优惠信息
 */
export interface MarketingFullReductionLevelVO {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

/**
 * 订单价格
 */
export interface TradePriceVO {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 佣金价值
   */
  convertScore?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 使用的佣金
   */
  shopCommissions?: number;
  /**
   * 佣金兑换金额
   */
  shopCommissionsPrice?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;

  [k: string]: any;
}

export interface DiscountsPriceDetailVO {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';

  [k: string]: any;
}

/**
 * 订单总体状态
 */
export interface TradeStateVO2 {
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开票状态
   * * NO_BIllING: 0: NO_BIllING 待开票
   * * HAVE_BIllING: 1: HAVE_BIllING 已开票
   * * VOID: 2: VOID 作废
   * * ALL: 3: ALL 所有
   */
  billingStatus?: 'NO_BIllING' | 'HAVE_BIllING' | 'VOID' | 'ALL';
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   */
  flowState?:
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: 'NOT_PAID' | 'UNCONFIRMED' | 'PAID';
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeVO".
 */
export interface TradeVO1 {
  /**
   * 分配的微店地址信息
   */
  allotOpenShopAddr?: string;
  /**
   * 分配的微店id
   */
  allotOpenShopId?: string;
  bossRemark?: string;
  buyer?: BuyerVO2;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可以开票标识
   * * NO: 否
   * * YES: 是
   */
  canBilling?: number;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  /**
   * 可退积分
   */
  canReturnPoints?: number;
  /**
   * 已退金额
   */
  canReturnPrice?: number;
  /**
   * 可退佣金
   */
  canReturnShopCommissions?: number;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 佣金（订单返利）
   */
  commission?: number;
  /**
   * 是否返利
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: number;
  /**
   * 分销佣金提成信息列表
   */
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO3;
  customerOpenShopParentId?: string;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递配送
   * * PICKUP_STORES: 2: 到店自提
   * * TWOHOURS_SERVICE: 3: 2小时达
   */
  deliverWay?: 0 | 1 | 2 | 3;
  distributeItems?: TradeDistributeItemVO2[];
  distributionCustomerId?: string;
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 营销赠品全量列表
   */
  gifts?: TradeItemVO[];
  goodsShareId?: string;
  groundpushCustomerIds?: string[];
  /**
   * 订单组号
   */
  groupId?: string;
  /**
   * 是否拼团订单
   */
  grouponFlag?: boolean;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  invoice?: InvoiceVO2;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  isPrescribeOrder?: boolean;
  /**
   * 是否核销 0：否，1：是(自提订单)
   */
  isVerification?: number;
  marketingId?: number;
  marketingTypeSpecial?: '0' | '1' | '2' | '3';
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
  payInfo?: PayInfoVO2;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付单号
   */
  payOrderNo?: string;
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  /**
   * 处方单药品
   */
  prescriptionDrugs?: PrescriptionDrugVO[];
  /**
   * 处方单号
   */
  prescriptionId?: string;
  prescriptionOrder?: PrescriptionOrderVO;
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  seller?: SellerVO;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  shareUserId?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  supplier?: SupplierVO;
  templateFileDownLoadPath?: string;
  tradeCoupon?: TradeCouponVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  tradeGroupon?: TradeGrouponVO;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO1[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO2;
  /**
   * 核销码
   */
  verificationCode?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCommissionVO".
 */
export interface TradeCommissionVO1 {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemVO".
 */
export interface TradeItemVO2 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  chanalCommission?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  drugType?: '0' | '1' | '2';
  employeeCommission?: number;
  /**
   * erpCode
   */
  erpCode?: string;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  isHaveCouponCode?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  marketingId?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  marketingTypeSpecial?: '0' | '1' | '2' | '3';
  /**
   * 药品分类 1 非处方  2 功能保健
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 处方单号
   */
  prescriptionId?: string;
  /**
   * 成交价格
   */
  price?: number;
  salesTaxRate?: number;
  selfMentionType?: '0' | '1';
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * 佣金
   */
  shopCommissions?: number;
  /**
   * 佣金兑换的金额
   */
  shopCommissionsPrice?: number;
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
   * 优购码商品结算信息
   */
  smallShopCouponSettlement?: SmallShopCouponSettlementVO[];
  /**
   * 规格描述信息
   */
  specDetails?: string;
  specificStock?: boolean;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  twoHoursExpress?: '0' | '1';
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponSettlementVO".
 */
export interface CouponSettlementVO1 {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingSettlementVO".
 */
export interface MarketingSettlementVO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCouponSettlementVO".
 */
export interface SmallShopCouponSettlementVO1 {
  scouponCode?: string;
  scouponCodeId?: string;
  scouponId?: number;
  smallShopCouponPrice?: number;
  splitPrice?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PrescriptionDrugVO".
 */
export interface PrescriptionDrugVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志(0：未删除，1：已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 药品内部id(可忽略)
   */
  drugId?: number;
  /**
   * 药品名称
   */
  drugName?: string;
  /**
   * 处方号
   */
  prescriptionId?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 药品规格
   */
  specification?: string;
  /**
   * 药品第三方标识(对应商品表的goodsInfoId)
   */
  thirdSkuId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PrescriptionOrderVO".
 */
export interface PrescriptionOrderVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 患者id
   */
  customerId?: string;
  /**
   * 删除标志(0：未删除，1：已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 临床诊断
   */
  diagnosDesc?: string;
  /**
   * 药方发药人员
   */
  dispensing?: string;
  /**
   * 医生信息
   */
  doctor?: string;
  /**
   * 病情描述
   */
  illnessDesc?: string;
  /**
   * 处方单图片url
   */
  imageUrl?: string;
  /**
   * 患者信息
   */
  patient?: string;
  /**
   * 药方审核人员
   */
  pharmacist?: string;
  /**
   * 处方号
   */
  prescriptionId?: string;
  /**
   * 处方名称
   */
  prescriptionName?: string;
  /**
   * 开药科室
   */
  sectionId?: number;
  /**
   * 处方状态：1待审核，2审核通过，3审核拒绝，4已完成（已取药），5已失效，6未发送给患者
   * * INIT: 0: 初始值(未使用)
   * * TO_AUDIT: 1: 待审核
   * * AUDIT_SUCCESS: 2: 审核通过
   * * AUDIT_REFUSED: 3: 审核拒绝
   * * COMPLETED: 4: 已完成（已取药）
   * * INVALID: 5: 已失效
   * * UNSENTED: 6: 未发送给患者
   */
  status?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 更新时间
   */
  updateTime?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SellerVO".
 */
export interface SellerVO1 {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SupplierVO".
 */
export interface SupplierVO1 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商id
   */
  supplierId?: number;
  /**
   * 供应商名称
   */
  supplierName?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCouponVO".
 */
export interface TradeCouponVO1 {
  /**
   * 优惠券码值
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 优惠券关联的商品id集合
   */
  goodsInfoIds?: string[];

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDeliverVO".
 */
export interface TradeDeliverVO1 {
  consignee?: ConsigneeVO4;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ShippingItemVO".
 */
export interface ShippingItemVO2 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LogisticsVO".
 */
export interface LogisticsVO1 {
  /**
   * 物流公司编号
   */
  logisticCompanyId?: string;
  /**
   * 物流公司名称
   */
  logisticCompanyName?: string;
  /**
   * 物流费
   */
  logisticFee?: number;
  /**
   * 物流号
   */
  logisticNo?: string;
  /**
   * 物流公司标准编码
   */
  logisticStandardCode?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeEventLogVO".
 */
export interface TradeEventLogVO1 {
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

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeGrouponVO".
 */
export interface TradeGrouponVO1 {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeMarketingVO".
 */
export interface TradeMarketingVO1 {
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO;
  /**
   * 当前满赠活动关联的赠品id列表，非满赠活动则为空
   */
  giftIds?: string[];
  giftLevel?: MarketingFullGiftLevelVO;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';
  /**
   * 该活动关联商品除去优惠金额外的应付金额
   */
  realPayAmount?: number;
  reductionLevel?: MarketingFullReductionLevelVO;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  /**
   * 营销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullDiscountLevelVO".
 */
export interface MarketingFullDiscountLevelVO1 {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftLevelVO".
 */
export interface MarketingFullGiftLevelVO1 {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftDetailVO".
 */
export interface MarketingFullGiftDetailVO1 {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullReductionLevelVO".
 */
export interface MarketingFullReductionLevelVO1 {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePriceVO".
 */
export interface TradePriceVO1 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 佣金价值
   */
  convertScore?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 使用的佣金
   */
  shopCommissions?: number;
  /**
   * 佣金兑换金额
   */
  shopCommissionsPrice?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DiscountsPriceDetailVO".
 */
export interface DiscountsPriceDetailVO1 {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   */
  marketingType?: '0' | '1' | '2';

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ReturnOrderVO»".
 */
export interface BaseResponseReturnOrderVO {
  /**
   * 结果码
   */
  code: string;
  context?: ReturnOrderVO3;
  /**
   * 消息内容
   */
  message?: string;

  [k: string]: any;
}

/**
 * 内容
 */
export interface ReturnOrderVO3 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
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
  distributeItems?: TradeDistributeItemVO[];
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
  invoice?: InvoiceVO;
  orderConsignee?: ConsigneeVO1;
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  payInfo?: PayInfoVO;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  refundFailedReason?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 供应商申请退款(待平台退款)
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
  returnShopCommissions?: ReturnShopCommissionsVO;
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
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeliverLogisticsReq".
 */
export interface IDeliverLogisticsReq {
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

export interface ReturnOrderVO4 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
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
  distributeItems?: TradeDistributeItemVO[];
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
  invoice?: InvoiceVO;
  orderConsignee?: ConsigneeVO1;
  /**
   * 药品类型
   * * NON_MEDICINE: 非药-订单
   * * MEDICINE: 处方药-清单
   */
  orderMedicineType?: 'NON_MEDICINE' | 'MEDICINE';
  payInfo?: PayInfoVO;
  /**
   * 支付方式枚举
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CASHONDELIVERY: 货到付款
   */
  payType?: '0' | '1' | '2';
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
   * * EASYPAY: 易生支付
   */
  payWay?:
    | 'UNIONPAY'
    | 'WECHAT'
    | 'ALIPAY'
    | 'ADVANCE'
    | 'POINT'
    | 'CASH'
    | 'UNIONPAY_B2B'
    | 'COUPON'
    | 'BALANCE'
    | 'EASYPAY';
  /**
   * 退单来源
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  refundFailedReason?: string;
  /**
   * 退款单状态
   * * TODO: 待退款
   * * REFUSE: 拒绝退款
   * * FINISH: 已退款
   * * APPLY: 供应商申请退款(待平台退款)
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
  returnShopCommissions?: ReturnShopCommissionsVO;
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
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO;

  [k: string]: any;
}

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 退单创建开始时间，精确到天
   */
  beginTime?: string;
  /**
   * 开票状态
   */
  billingStatus?: string;
  /**
   * 购买人账号
   */
  buyerAccount?: string;
  /**
   * 购买人编号
   */
  buyerId?: string;
  /**
   * 购买人姓名
   */
  buyerName?: string;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 供应商名称
   */
  companyInfoId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 手机号
   */
  consigneePhone?: string;
  /**
   * 客户id
   */
  customerIds?: {
    [k: string]: any;
  }[];
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 退单创建结束时间，精确到天
   */
  endTime?: string;
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 退单流程状态
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
   * 退单id
   */
  rid?: string;
  /**
   * 退单编号列表
   */
  rids?: string[];
  /**
   * 商品名称
   */
  skuName?: string;
  /**
   * sku编号
   */
  skuNo?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 供应商编号
   */
  supplierCode?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 订单id
   */
  tid?: string;
  token?: string;
  /**
   * pc搜索条件
   */
  tradeOrSkuName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;

  [k: string]: any;
}

export interface ReturnItemVO4 {
  /**
   * 仍可退数量
   */
  canReturnNum?: number;
  erpCode?: string;
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
  salesTaxRate?: number;
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

//create by moon https://github.com/creasy2010/moon
