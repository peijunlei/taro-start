import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PointsTradeBaseController';

/**
 *
 * 查询积分订单发货清单
 *
 */
async function tradeDeliverRecord(
  tid: ITradeDeliverRecordTidReq,
  type: ITradeDeliverRecordTypeReq,
): Promise<TradeDeliverRecordResponse> {
  let result = await sdk.get<TradeDeliverRecordResponse>(
    '/points/trade/deliverRecord/{tid}/{type}'

      .replace('{tid}', tid + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询订单
 *
 */
async function page(
  pointsTradePageQueryRequest: IPagePointsTradePageQueryRequestReq,
): Promise<PagePointsTradeVO> {
  let result = await sdk.post<PagePointsTradeVO>(
    '/points/trade/page',

    {
      ...pointsTradePageQueryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 积分订单确认收货
 *
 */
async function confirm(tid: IConfirmTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/points/trade/receive/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询积分订单详情
 *
 */
async function details(tid: IDetailsTidReq): Promise<PointsTradeVO> {
  let result = await sdk.get<PointsTradeVO>(
    '/points/trade/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

export default {
  tradeDeliverRecord,

  page,

  confirm,

  details,
};

/**
 * 积分订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeDeliverRecordTidReq".
 */
export type ITradeDeliverRecordTidReq = string;
/**
 * type
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeDeliverRecordTypeReq".
 */
export type ITradeDeliverRecordTypeReq = string;
/**
 * 积分订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IConfirmTidReq".
 */
export type IConfirmTidReq = string;
/**
 * 积分订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDetailsTidReq".
 */
export type IDetailsTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeDeliverRecordResponse»".
 */
export interface BaseResponseTradeDeliverRecordResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TradeDeliverRecordResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface TradeDeliverRecordResponse {
  /**
   * 订单总体状态
   */
  status?: string;
  /**
   * 发货记录列表
   */
  tradeDeliver?: TradeDeliverVO[];
  [k: string]: any;
}
export interface TradeDeliverVO {
  consignee?: ConsigneeVO;
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDeliverRecordResponse".
 */
export interface TradeDeliverRecordResponse1 {
  /**
   * 订单总体状态
   */
  status?: string;
  /**
   * 发货记录列表
   */
  tradeDeliver?: TradeDeliverVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDeliverVO".
 */
export interface TradeDeliverVO1 {
  consignee?: ConsigneeVO;
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
 * via the `definition` "PointsTradePageQueryRequest".
 */
export interface PointsTradePageQueryRequest {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
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
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * SPECIAL_ORDER: 2: 特殊订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'SPECIAL_ORDER';
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
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: 'NOT_PAID' | 'UNCONFIRMED' | 'PAID';
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«Page«PointsTradeVO»»".
 */
export interface BaseResponsePagePointsTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PagePointsTradeVO;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PagePointsTradeVO {
  content?: PointsTradeVO[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface PointsTradeVO {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递配送
   * * PICKUP_STORES: 2: 到店自提
   * * TWOHOURS_SERVICE: 3: 2小时达
   */
  deliverWay?: 0 | 1 | 2 | 3;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
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
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
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
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
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
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * 购买人
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
 * 收货人信息
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
 * 积分订单优惠券
 */
export interface TradePointsCouponItemVO {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
export interface CouponInfoVO {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 券码
   */
  code?: string;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 公司信息名称
   */
  companyInfoName?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券创建人
   */
  createPerson?: string;
  /**
   * 优惠券创建人姓名
   */
  createPersonName?: string;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数/月数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
  /**
   * 商品支持范围
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
export interface TradeDeliverVO2 {
  consignee?: ConsigneeVO;
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
  operator?: Operator;
  [k: string]: any;
}
/**
 * 操作员
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
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«PointsTradeVO»".
 */
export interface PagePointsTradeVO1 {
  content?: PointsTradeVO[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeVO".
 */
export interface PointsTradeVO1 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递配送
   * * PICKUP_STORES: 2: 到店自提
   * * TWOHOURS_SERVICE: 3: 2小时达
   */
  deliverWay?: 0 | 1 | 2 | 3;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
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
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
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
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
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
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
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
 * via the `definition` "TradePointsCouponItemVO".
 */
export interface TradePointsCouponItemVO1 {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponInfoVO".
 */
export interface CouponInfoVO1 {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 券码
   */
  code?: string;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 公司信息名称
   */
  companyInfoName?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   * * MONEY_VOUCHER: 3：现金券
   */
  couponType?: 0 | 1 | 2 | 3;
  /**
   * 优惠券创建人
   */
  createPerson?: string;
  /**
   * 优惠券创建人姓名
   */
  createPersonName?: string;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数/月数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
  /**
   * 商品支持范围
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   * * MONTH: 2：按N月有效
   */
  rangeDayType?: 0 | 1 | 2;
  /**
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
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
  operator?: Operator;
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
 * via the `definition` "TradeItemVO".
 */
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
 * via the `definition` "Sort".
 */
export interface Sort1 {
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
 * via the `definition` "BaseResponse«PointsTradeVO»".
 */
export interface BaseResponsePointsTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PointsTradeVO2;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PointsTradeVO2 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递配送
   * * PICKUP_STORES: 2: 到店自提
   * * TWOHOURS_SERVICE: 3: 2小时达
   */
  deliverWay?: 0 | 1 | 2 | 3;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
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
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
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
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
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
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPagePointsTradePageQueryRequestReq".
 */
export interface IPagePointsTradePageQueryRequestReq {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
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
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * SPECIAL_ORDER: 2: 特殊订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'SPECIAL_ORDER';
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
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: 'NOT_PAID' | 'UNCONFIRMED' | 'PAID';
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
