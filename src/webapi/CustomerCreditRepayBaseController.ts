import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCreditRepayBaseController';

/**
 *
 * 在线还款查询客户授信账户
 *
 */
async function getCreditAccountByCustomerIdForRepay(): Promise<CustomerCreditRepayDetailResponse> {
  let result = await sdk.get<CustomerCreditRepayDetailResponse>(
    '/credit/repay/account',

    {},
  );
  return result.context;
}

/**
 *
 * 新增在线还款记录
 *
 */
async function add(request: IAddRequestReq): Promise<CustomerCreditRepayAddResponse> {
  let result = await sdk.post<CustomerCreditRepayAddResponse>(
    '/credit/repay/add',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 取消还款记录
 *
 */
async function cancel(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/credit/repay/cancel',

    {},
  );
  return result.context;
}

/**
 *
 * 在线还款校验当前账号授信期额度是否全部还款完成
 *
 */
async function checkCreditAccountHasRepaid(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/credit/repay/check',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询已还款授信详情
 *
 */
async function getCreditHasRepaidDetail(id: IGetCreditHasRepaidDetailIdReq): Promise<CreditRepayPageResponse> {
  let result = await sdk.get<CreditRepayPageResponse>(
    '/credit/repay/has-repaid-detail/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询已还款授信订单列表
 *
 */
async function findHasRepaidPage(
  request: IFindHasRepaidPageRequestReq,
): Promise<MicroServicePageCreditRepayPageResponse> {
  let result = await sdk.post<MicroServicePageCreditRepayPageResponse>(
    '/credit/repay/has-repaid-list',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询可以授信还款订单
 *
 */
async function getCanRepayOrderList(
  tradeQueryDTO: IGetCanRepayOrderListTradeQueryDTOReq,
): Promise<TradePageCriteriaResponse> {
  let result = await sdk.post<TradePageCriteriaResponse>(
    '/credit/repay/order-list',

    {
      ...tradeQueryDTO,
    },
  );
  return result.context;
}

/**
 *
 * 校验授信还款单订单状态
 *
 */
async function checkRepayOrder(): Promise<unknown> {
  let result = await sdk.get<unknown>('/credit/repay/checkRepay', {});
  return result.context;
}

/**
 *
 * 根据授信还款单号查询授信还款具体信息
 *
 */
async function getDetailByRepayCode(
  repayCode: IGetDetailByRepayCodeRepayCodeReq,
): Promise<CustomerCreditRepayByRepayCodeResponse> {
  let result = await sdk.get<CustomerCreditRepayByRepayCodeResponse>(
    '/credit/repay/by-repay-code/{repayCode}'.replace('{repayCode}', repayCode + ''),
    {},
  );
  return result.context;
}

export default {
  getCreditAccountByCustomerIdForRepay,

  add,

  cancel,

  checkCreditAccountHasRepaid,

  getCreditHasRepaidDetail,

  findHasRepaidPage,

  getCanRepayOrderList,
  checkRepayOrder,
  getDetailByRepayCode,
};

/**
 * repayCode
 *
 */
export type IGetDetailByRepayCodeRepayCodeReq = string;

/**
 * 内容
 */
export interface CustomerCreditRepayByRepayCodeResponse {
  customerCreditRepayVO?: CustomerCreditRepayVO3;
  [k: string]: any;
}

/**
 * 客户授信还款信息
 */
export interface CustomerCreditRepayVO3 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0 待还款 1 还款成功 2 已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 待还款额度
   */
  totalRepayAmount?: number;
  [k: string]: any;
}

export interface IgnoreType {
  [k: string]: any;
}
/**
 * 内容
 */
export interface CreditAccountCheckResponse {
  /**
   * 是否还款中 true 还款中 false 否
   */
  waitRepay?: boolean;
  [k: string]: any;
}

/**
 */
export interface BaseResponseCustomerCreditRepayDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCreditRepayDetailResponse;
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
export interface CustomerCreditRepayDetailResponse {
  customerCreditRepayVO?: CustomerCreditRepayVO;
  /**
   * 交易单列表
   */
  tradeVOList?: TradeVO[];
  /**
   * 是否还款中 true 还款中 false 否
   */
  waitRepay?: boolean;
  [k: string]: any;
}
/**
 * 还款账号和还款信息
 */
export interface CustomerCreditRepayVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0 待还款 1 还款成功 2 已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 待还款额度
   */
  totalRepayAmount?: number;
  [k: string]: any;
}
export interface TradeVO {
  bookingType?: '0' | '1';
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
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
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO;
  /**
   * 未使用的优惠券
   */
  couponCodes?: CouponCodeVO[];
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
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
  /**
   * 订单组号
   */
  groupId?: string;
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
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  isBookingSaleGoods?: boolean;
  isContainsTrade?: boolean;
  /**
   * 需要授信还款
   */
  needCreditRepayFlag?: boolean;
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
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 外部订单id
   */
  outOrderIds?: string[];
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
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
   * * CREDIT: 授信支付
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
    | 'CREDIT';
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
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 积分订单的子订单列表，拷贝PointsTradeVO时使用
   */
  pointsTradeVOList?: PointsTradeVO[];
  /**
   * 子订单列表
   */
  providerTradeVOList?: ProviderTradeVO[];
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 分享人id
   */
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
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  supplierCode?: string;
  supplierName?: string;
  tailNoticeMobile?: string;
  tailOrderNo?: string;
  tailPayOrderId?: string;
  /**
   * 订单所属第三方平台的订单id
   */
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  /**
   * 订单所属第三方平台类型
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  thirdSellerId?: string;
  thirdSellerName?: string;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO1;
  tradeCouponItem?: TradePointsCouponItemVO2;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO1;
  /**
   * 主订单号
   */
  tradeId?: string;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO4[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO1[];
  tradePrice?: TradePriceVO2;
  tradeState?: TradeStateVO2;
  /**
   * 子订单列表
   */
  tradeVOList?: null[];
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
export interface CouponCodeVO {
  /**
   * 参与成功通知描述
   */
  activityDesc?: string;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 参与成功通知标题
   */
  activityTitle?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * 授信支付信息
 */
export interface CreditPayInfoVO {
  /**
   * 授信账户id
   */
  creditAcccountId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
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
export interface TradeItemVO {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
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
   */
  couponType?: 0 | 1 | 2;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
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
export interface PointsTradeVO {
  buyer?: BuyerVO1;
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
  consignee?: ConsigneeVO1;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
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
   * 子单是否全都包含商家订单
   */
  isContainsTrade?: boolean;
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
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 外部订单id
   */
  outOrderIds?: string[];
  parentId?: string;
  payInfo?: PayInfoVO1;
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
   * * CREDIT: 授信支付
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
    | 'CREDIT';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 子订单列表
   */
  pointsTradeVOList?: null[];
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
  /**
   * 所属商户id-供应商使用
   */
  storeId?: number;
  supplier?: SupplierVO;
  /**
   * 所属商户编号-供应商使用
   */
  supplierCode?: string;
  /**
   * 所属商户名称-供应商使用
   */
  supplierName?: string;
  /**
   * 订单所属第三方平台的订单id
   */
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  /**
   * 订单所属第三方平台类型
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  thirdSellerId?: string;
  thirdSellerName?: string;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO1[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * 购买人
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
 * 商家
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
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
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
   */
  couponType?: 0 | 1 | 2;
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
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
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
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
export interface TradeDeliverVO {
  consignee?: ConsigneeVO2;
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
   * 订单的所属商家/供应商
   */
  providerName?: string;
  /**
   * 所属 商家/供应商
   * * SUPPLIER: 0: 商家
   * * PROVIDER: 1: 已发货
   */
  shipperType?: 'SUPPLIER' | 'PROVIDER';
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
  /**
   * 子订单 发货单号
   */
  sunDeliverId?: string;
  /**
   * 第三方平台订单物流标识
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 发货单属于的订单号
   */
  tradeId?: string;
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
export interface ShippingItemVO {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 积分价
   */
  buyPoint?: number;
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
   * 积分
   */
  points?: number;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * 供应商商品编码
   */
  providerSkuNo?: string;
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
   * 购买用户id
   */
  buyerId?: string;
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
   * 第三方平台外部订单id，linkedmall --> 淘宝订单号
   */
  outOrderId?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;
  /**
   * 第三方平台物流对应的订单id
   */
  thirdPlatformOrderId?: string;
  [k: string]: any;
}
export interface ShippingItemVO1 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 积分价
   */
  buyPoint?: number;
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
   * 积分
   */
  points?: number;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * 供应商商品编码
   */
  providerSkuNo?: string;
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
   * 是否首次登陆
   */
  firstLogin?: boolean;
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
   * terminal token
   */
  terminalToken?: string;
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
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   * * THIRD_PLATFORM_LINKED_MALL: 第三方平台-linkedMall
   * * VAS_RECOMMEND_SETTING: 增值服务-智能推荐-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_iep_setting' | 'third_platform_linked_mall' | 'vas_recommend_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
export interface TradeItemVO1 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 订单价格
 */
export interface TradePriceVO {
  buyPoints?: number;
  canBackEarnestPrice?: number;
  canBackTailPrice?: number;
  /**
   * 平台佣金
   */
  cmCommission?: number;
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
  earnestPrice?: number;
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
   * 活动优惠总额
   */
  marketingDiscountPrice?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 订单供货价总额
   */
  orderSupplyPrice?: number;
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
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  swellPrice?: number;
  tailPrice?: number;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
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
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
export interface ProviderTradeVO {
  buyer?: BuyerVO2;
  buyerRemark?: string;
  canReturnFlag?: boolean;
  canReturnPoints?: number;
  canReturnPrice?: number;
  channelType?: '0' | '1' | '2';
  commission?: number;
  commissionFlag?: boolean;
  commissions?: TradeCommissionVO1[];
  consignee?: ConsigneeVO3;
  deliverWay?: '0' | '1';
  distributeItems?: TradeDistributeItemVO1[];
  distributionShareCustomerId?: string;
  distributorId?: string;
  distributorName?: string;
  encloses?: string;
  gifts?: TradeItemVO2[];
  groupId?: string;
  grouponFlag?: boolean;
  hasBeanSettled?: boolean;
  id?: string;
  inviteeId?: string;
  invoice?: InvoiceVO1;
  isAuditOpen?: boolean;
  isFlashSaleGoods?: boolean;
  orderEvaluateStatus?: '0' | '1';
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  orderTimeOut?: string;
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  parentId?: string;
  payInfo?: PayInfoVO2;
  payOrderId?: string;
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
    | 'CREDIT';
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  refundFlag?: boolean;
  requestIp?: string;
  returnOrderNum?: number;
  seller?: SellerVO1;
  sellerRemark?: string;
  shareUserId?: string;
  shopName?: string;
  storeBagsFlag?: '0' | '1';
  storeBagsInviteeId?: string;
  storeEvaluate?: '0' | '1';
  storeId?: number;
  storeName?: string;
  supplier?: SupplierVO1;
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  thirdPlatformType?: '0';
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO;
  tradeCouponItem?: TradePointsCouponItemVO1;
  tradeDelivers?: TradeDeliverVO1[];
  tradeEventLogs?: TradeEventLogVO1[];
  tradeGroupon?: TradeGrouponVO;
  tradeItems?: TradeItemVO3[];
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO1;
  tradeState?: TradeStateVO1;
  [k: string]: any;
}
export interface BuyerVO2 {
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
export interface TradeCommissionVO1 {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;
  [k: string]: any;
}
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
export interface TradeDistributeItemVO1 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
export interface TradeItemVO2 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
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
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
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
   */
  couponType?: 0 | 1 | 2;
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
export interface TradePointsCouponItemVO1 {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
export interface TradeDeliverVO1 {
  consignee?: ConsigneeVO2;
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
   * 订单的所属商家/供应商
   */
  providerName?: string;
  /**
   * 所属 商家/供应商
   * * SUPPLIER: 0: 商家
   * * PROVIDER: 1: 已发货
   */
  shipperType?: 'SUPPLIER' | 'PROVIDER';
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
  /**
   * 子订单 发货单号
   */
  sunDeliverId?: string;
  /**
   * 第三方平台订单物流标识
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 发货单属于的订单号
   */
  tradeId?: string;
  [k: string]: any;
}
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
export interface TradeItemVO3 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface TradeMarketingVO {
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
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
   * * BUYOUT_PRICE: 6：一口价
   * * HALF_PRICE_SECOND_PIECE: 7：第二件半价优惠活动
   * * SUITS_GOODS: 8：组合商品
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  [k: string]: any;
}
/**
 * 营销打包一口价多级优惠信息
 */
export interface MarketingBuyoutPriceLevelVO {
  /**
   * 任选数量
   */
  choiceCount?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * 打包级别Id
   */
  reductionLevelId?: number;
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
export interface TradePriceVO1 {
  buyPoints?: number;
  canBackEarnestPrice?: number;
  canBackTailPrice?: number;
  /**
   * 平台佣金
   */
  cmCommission?: number;
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
  earnestPrice?: number;
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
   * 活动优惠总额
   */
  marketingDiscountPrice?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 订单供货价总额
   */
  orderSupplyPrice?: number;
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
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  swellPrice?: number;
  tailPrice?: number;
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
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
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
/**
 * boss卖方
 */
export interface SellerVO2 {
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
 * 商家
 */
export interface SupplierVO2 {
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
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 订单使用的店铺优惠券
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
   */
  couponType?: 0 | 1 | 2;
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
 * 积分订单优惠券，拷贝PointsTradeVO时使用
 */
export interface TradePointsCouponItemVO2 {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
export interface TradeDeliverVO2 {
  consignee?: ConsigneeVO2;
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
   * 订单的所属商家/供应商
   */
  providerName?: string;
  /**
   * 所属 商家/供应商
   * * SUPPLIER: 0: 商家
   * * PROVIDER: 1: 已发货
   */
  shipperType?: 'SUPPLIER' | 'PROVIDER';
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
  /**
   * 子订单 发货单号
   */
  sunDeliverId?: string;
  /**
   * 第三方平台订单物流标识
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 发货单属于的订单号
   */
  tradeId?: string;
  [k: string]: any;
}
export interface TradeEventLogVO2 {
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
export interface TradeItemVO4 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface TradeMarketingVO1 {
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
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
   * * BUYOUT_PRICE: 6：一口价
   * * HALF_PRICE_SECOND_PIECE: 7：第二件半价优惠活动
   * * SUITS_GOODS: 8：组合商品
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  [k: string]: any;
}
/**
 * 订单价格
 */
export interface TradePriceVO2 {
  buyPoints?: number;
  canBackEarnestPrice?: number;
  canBackTailPrice?: number;
  /**
   * 平台佣金
   */
  cmCommission?: number;
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
  earnestPrice?: number;
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
   * 活动优惠总额
   */
  marketingDiscountPrice?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 订单供货价总额
   */
  orderSupplyPrice?: number;
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
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  swellPrice?: number;
  tailPrice?: number;
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
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
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
/**
 */
export interface CustomerCreditRepayDetailResponse1 {
  customerCreditRepayVO?: CustomerCreditRepayVO;
  /**
   * 交易单列表
   */
  tradeVOList?: TradeVO[];
  /**
   * 是否还款中 true 还款中 false 否
   */
  waitRepay?: boolean;
  [k: string]: any;
}
/**
 */
export interface CustomerCreditRepayVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0 待还款 1 还款成功 2 已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 待还款额度
   */
  totalRepayAmount?: number;
  [k: string]: any;
}
/**
 */
export interface TradeVO1 {
  bookingType?: '0' | '1';
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
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
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO;
  /**
   * 未使用的优惠券
   */
  couponCodes?: CouponCodeVO[];
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
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
  /**
   * 订单组号
   */
  groupId?: string;
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
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  isBookingSaleGoods?: boolean;
  isContainsTrade?: boolean;
  /**
   * 需要授信还款
   */
  needCreditRepayFlag?: boolean;
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
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 外部订单id
   */
  outOrderIds?: string[];
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
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
   * * CREDIT: 授信支付
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
    | 'CREDIT';
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
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 积分订单的子订单列表，拷贝PointsTradeVO时使用
   */
  pointsTradeVOList?: PointsTradeVO[];
  /**
   * 子订单列表
   */
  providerTradeVOList?: ProviderTradeVO[];
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 分享人id
   */
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
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  supplierCode?: string;
  supplierName?: string;
  tailNoticeMobile?: string;
  tailOrderNo?: string;
  tailPayOrderId?: string;
  /**
   * 订单所属第三方平台的订单id
   */
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  /**
   * 订单所属第三方平台类型
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  thirdSellerId?: string;
  thirdSellerName?: string;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO1;
  tradeCouponItem?: TradePointsCouponItemVO2;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO1;
  /**
   * 主订单号
   */
  tradeId?: string;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO4[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO1[];
  tradePrice?: TradePriceVO2;
  tradeState?: TradeStateVO2;
  /**
   * 子订单列表
   */
  tradeVOList?: null[];
  [k: string]: any;
}
/**
 */
export interface BuyerVO3 {
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
 */
export interface TradeCommissionVO2 {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
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
/**
 */
export interface CouponCodeVO1 {
  /**
   * 参与成功通知描述
   */
  activityDesc?: string;
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 参与成功通知标题
   */
  activityTitle?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface CreditPayInfoVO1 {
  /**
   * 授信账户id
   */
  creditAcccountId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
  [k: string]: any;
}
/**
 */
export interface TradeDistributeItemVO2 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
/**
 */
export interface TradeDistributeItemCommissionVO1 {
  commission?: number;
  customerId?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
 */
export interface TradeItemVO5 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  appointmentSaleId?: number;
  /**
   * 货物id
   */
  bn?: string;
  bookingSaleId?: number;
  bookingType?: '0' | '1';
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
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
  /**
   * 顶级分类id
   */
  cateTopId?: number;
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
  /**
   * 定金
   */
  earnestPrice?: number;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
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
   * 商品来源，0供应商，1商家 2linkedMall
   */
  goodsSource?: number;
  goodsStatus?: '0' | '1' | '2' | '3';
  /**
   * 商品重量
   */
  goodsWeight?: number;
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  isAppointmentSaleGoods?: boolean;
  isBookingSaleGoods?: boolean;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 商品参加的营销活动levelId集合
   */
  marketingLevelIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
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
   * 成交价格
   */
  price?: number;
  providerCode?: string;
  providerId?: number;
  providerName?: string;
  providerSkuNo?: string;
  /**
   * 结算价格
   */
  settlementPrice?: number;
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
   * 规格描述信息
   */
  specDetails?: string;
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
   * 商家编码
   */
  supplierCode?: string;
  supplyPrice?: number;
  /**
   * 定金膨胀
   */
  swellPrice?: number;
  /**
   * 尾款支付结束时间
   */
  tailEndTime?: string;
  /**
   * 尾款
   */
  tailPrice?: number;
  /**
   * 尾款支付开始时间
   */
  tailStartTime?: string;
  /**
   * 第三方平台的skuId
   */
  thirdPlatformSkuId?: string;
  /**
   * 第三方平台的spuId
   */
  thirdPlatformSpuId?: string;
  /**
   * 第三方平台商品对应的子单号
   */
  thirdPlatformSubOrderId?: string;
  /**
   * 第三方平台类型，0，linkedmall
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  totalSupplyPrice?: number;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
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
   */
  couponType?: 0 | 1 | 2;
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
 */
export interface MarketingSettlementVO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
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
 */
export interface PayInfoVO3 {
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
 */
export interface PointsTradeVO1 {
  buyer?: BuyerVO1;
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
  consignee?: ConsigneeVO1;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
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
   * 子单是否全都包含商家订单
   */
  isContainsTrade?: boolean;
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
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 外部订单id
   */
  outOrderIds?: string[];
  parentId?: string;
  payInfo?: PayInfoVO1;
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
   * * CREDIT: 授信支付
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
    | 'CREDIT';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 子订单列表
   */
  pointsTradeVOList?: null[];
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
  /**
   * 所属商户id-供应商使用
   */
  storeId?: number;
  supplier?: SupplierVO;
  /**
   * 所属商户编号-供应商使用
   */
  supplierCode?: string;
  /**
   * 所属商户名称-供应商使用
   */
  supplierName?: string;
  /**
   * 订单所属第三方平台的订单id
   */
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  /**
   * 订单所属第三方平台类型
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  thirdSellerId?: string;
  thirdSellerName?: string;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO1[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 */
export interface ProviderTradeVO1 {
  buyer?: BuyerVO2;
  buyerRemark?: string;
  canReturnFlag?: boolean;
  canReturnPoints?: number;
  canReturnPrice?: number;
  channelType?: '0' | '1' | '2';
  commission?: number;
  commissionFlag?: boolean;
  commissions?: TradeCommissionVO1[];
  consignee?: ConsigneeVO3;
  deliverWay?: '0' | '1';
  distributeItems?: TradeDistributeItemVO1[];
  distributionShareCustomerId?: string;
  distributorId?: string;
  distributorName?: string;
  encloses?: string;
  gifts?: TradeItemVO2[];
  groupId?: string;
  grouponFlag?: boolean;
  hasBeanSettled?: boolean;
  id?: string;
  inviteeId?: string;
  invoice?: InvoiceVO1;
  isAuditOpen?: boolean;
  isFlashSaleGoods?: boolean;
  orderEvaluateStatus?: '0' | '1';
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  orderTimeOut?: string;
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  parentId?: string;
  payInfo?: PayInfoVO2;
  payOrderId?: string;
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
    | 'CREDIT';
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  refundFlag?: boolean;
  requestIp?: string;
  returnOrderNum?: number;
  seller?: SellerVO1;
  sellerRemark?: string;
  shareUserId?: string;
  shopName?: string;
  storeBagsFlag?: '0' | '1';
  storeBagsInviteeId?: string;
  storeEvaluate?: '0' | '1';
  storeId?: number;
  storeName?: string;
  supplier?: SupplierVO1;
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  thirdPlatformType?: '0';
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO;
  tradeCouponItem?: TradePointsCouponItemVO1;
  tradeDelivers?: TradeDeliverVO1[];
  tradeEventLogs?: TradeEventLogVO1[];
  tradeGroupon?: TradeGrouponVO;
  tradeItems?: TradeItemVO3[];
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO1;
  tradeState?: TradeStateVO1;
  [k: string]: any;
}
/**
 */
export interface SellerVO3 {
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
 */
export interface SupplierVO3 {
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
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 */
export interface TradeCouponVO2 {
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
   */
  couponType?: 0 | 1 | 2;
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
 */
export interface TradePointsCouponItemVO3 {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
/**
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
   */
  couponType?: 0 | 1 | 2;
  createTime?: string;
  /**
   * 是否已删除
   * * NO: 0:否
   * * YES: 1:是
   */
  delFlag?: 0 | 1;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
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
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
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
 */
export interface TradeDeliverVO3 {
  consignee?: ConsigneeVO2;
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
   * 订单的所属商家/供应商
   */
  providerName?: string;
  /**
   * 所属 商家/供应商
   * * SUPPLIER: 0: 商家
   * * PROVIDER: 1: 已发货
   */
  shipperType?: 'SUPPLIER' | 'PROVIDER';
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
  /**
   * 子订单 发货单号
   */
  sunDeliverId?: string;
  /**
   * 第三方平台订单物流标识
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  /**
   * 发货单属于的订单号
   */
  tradeId?: string;
  [k: string]: any;
}
/**
 */
export interface ShippingItemVO2 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 积分价
   */
  buyPoint?: number;
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
   * 积分
   */
  points?: number;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * 供应商商品编码
   */
  providerSkuNo?: string;
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
 */
export interface LogisticsVO1 {
  /**
   * 购买用户id
   */
  buyerId?: string;
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
   * 第三方平台外部订单id，linkedmall --> 淘宝订单号
   */
  outOrderId?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;
  /**
   * 第三方平台物流对应的订单id
   */
  thirdPlatformOrderId?: string;
  [k: string]: any;
}
/**
 */
export interface TradeEventLogVO3 {
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
   * 是否首次登陆
   */
  firstLogin?: boolean;
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
   * terminal token
   */
  terminalToken?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface VASEntity1 {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   * * THIRD_PLATFORM_LINKED_MALL: 第三方平台-linkedMall
   * * VAS_RECOMMEND_SETTING: 增值服务-智能推荐-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_iep_setting' | 'third_platform_linked_mall' | 'vas_recommend_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
/**
 */
export interface TradeGrouponVO2 {
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
 */
export interface TradeMarketingVO2 {
  buyoutPriceLevel?: MarketingBuyoutPriceLevelVO;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
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
   * * BUYOUT_PRICE: 6：一口价
   * * HALF_PRICE_SECOND_PIECE: 7：第二件半价优惠活动
   * * SUITS_GOODS: 8：组合商品
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  [k: string]: any;
}
/**
 */
export interface MarketingBuyoutPriceLevelVO1 {
  /**
   * 任选数量
   */
  choiceCount?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 打包一口价营销ID
   */
  marketingId?: number;
  /**
   * 打包级别Id
   */
  reductionLevelId?: number;
  [k: string]: any;
}
/**
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
 */
export interface TradePriceVO3 {
  buyPoints?: number;
  canBackEarnestPrice?: number;
  canBackTailPrice?: number;
  /**
   * 平台佣金
   */
  cmCommission?: number;
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
  earnestPrice?: number;
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
   * 活动优惠总额
   */
  marketingDiscountPrice?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 订单供货价总额
   */
  orderSupplyPrice?: number;
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
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  swellPrice?: number;
  tailPrice?: number;
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
   * * BUYOUT_PRICE: 3：一口价优惠活动
   * * HALF_PRICE_SECOND_PIECE: 4：第二件半价优惠活动
   * * FLASH_SALE: 5：秒杀
   * * SUITS: 6：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  [k: string]: any;
}
/**
 */
export interface TradeStateVO3 {
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
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
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
/**
 */
export interface CustomerCreditRepayAddRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 关联订单
   */
  orderIds?: string[];
  /**
   * 还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0待还款 1还款成功 2已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseCustomerCreditRepayAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCreditRepayAddResponse;
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
export interface CustomerCreditRepayAddResponse {
  customerCreditRepayVO?: CustomerCreditRepayVO2;
  [k: string]: any;
}
/**
 * 客户授信还款信息
 */
export interface CustomerCreditRepayVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 订单还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0 待还款 1 还款成功 2 已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 待还款额度
   */
  totalRepayAmount?: number;
  [k: string]: any;
}
/**
 */
export interface CustomerCreditRepayAddResponse1 {
  customerCreditRepayVO?: CustomerCreditRepayVO2;
  [k: string]: any;
}
/**
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
 */
export interface BaseResponseCreditRepayPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CreditRepayPageResponse;
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
export interface CreditRepayPageResponse {
  /**
   * 还款单id
   */
  id?: string;
  /**
   * 订单数量
   */
  orderNum?: number;
  /**
   * 还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  [k: string]: any;
}
/**
 */
export interface CreditRepayPageResponse1 {
  /**
   * 还款单id
   */
  id?: string;
  /**
   * 订单数量
   */
  orderNum?: number;
  /**
   * 还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  [k: string]: any;
}
/**
 */
export interface CreditRepayPageRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 授信周期截止时间
   */
  endTime?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 授信周期开始时间
   */
  startTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseMicroServicePageCreditRepayPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageCreditRepayPageResponse;
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
export interface MicroServicePageCreditRepayPageResponse {
  /**
   * 具体数据内容
   */
  content?: CreditRepayPageResponse2[];
  empty?: boolean;
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
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CreditRepayPageResponse2 {
  /**
   * 还款单id
   */
  id?: string;
  /**
   * 订单数量
   */
  orderNum?: number;
  /**
   * 还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageCreditRepayPageResponse1 {
  /**
   * 具体数据内容
   */
  content?: CreditRepayPageResponse2[];
  empty?: boolean;
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
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface TradeQueryDTO {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 退单创建开始时间,精确到天
   */
  beginTime?: string;
  /**
   * 预售尾款到达时间
   */
  bookingTailTime?: string;
  bookingType?: '0' | '1';
  /**
   * 客户账号 模糊查询
   */
  buyerAccount?: string;
  /**
   * 客户名称
   */
  buyerId?: string;
  /**
   * 客户名称
   */
  buyerName?: string;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  completionBeginTime?: string;
  completionEndTime?: string;
  /**
   * 收货人 模糊查询
   */
  consigneeName?: string;
  /**
   * 收货人联系方式 模糊查询
   */
  consigneePhone?: string;
  creditPayInfo?: CreditPayInfoVO2;
  /**
   * 客户id
   */
  customerIds?: {
    [k: string]: any;
  }[];
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 已完成订单允许申请退单时间
   */
  day?: number;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 业务员id集合
   */
  employeeIds?: string[];
  /**
   * 退单创建结束时间,精确到天
   */
  endTime?: string;
  /**
   * 批量流程状态
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  flowStates?: (
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL'
  )[];
  /**
   * 是否拼团订单
   */
  grouponFlag?: boolean;
  /**
   * 主订单编号
   */
  id?: string;
  /**
   * 用于根据ids批量查询场景
   */
  ids?: string[];
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  isBookingSaleGoods?: boolean;
  /**
   * 是否boss或商家端
   * * NO: 否
   * * YES: 是
   */
  isBoss?: number;
  /**
   * 客户端条件搜索时使用,订单编号或商品名称
   */
  keyworks?: string;
  /**
   * 需要授信还款
   */
  needCreditRepayFlag?: boolean;
  /**
   * 批量非流程状态
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  notFlowStates?: (
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL'
  )[];
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 供应商编号 模糊查询
   */
  providerCode?: string;
  /**
   * 供应商名称
   */
  providerName?: string;
  /**
   * 子订单编号
   */
  providerTradeId?: string;
  /**
   * 筛选订单类型
   * * GROUPON: 拼团订单
   * * FLASH_SALE: 秒杀订单
   * * BOOKING_SALE: 预售订单
   * * BUY_POINTS_ORDER: 积分价订单
   */
  queryOrderType?: 0 | 1 | 2 | 3;
  /**
   * 筛选支付方式
   * * OFFLINE: 线下支付
   * * ONLINE: 在线支付
   * * BALANCE: 积余额支付
   * * POINT: 纯积分支付
   * * POINT_ONLINE: 积分+在线支付
   * * POINT_BALANCE: 积分+余额支付
   * * CREDIT: 授信支付
   * * POINT_CREDIT: 积分+授信支付
   */
  queryPayType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 商品名称 模糊查询
   */
  skuName?: string;
  /**
   * 商品编号 模糊查询
   */
  skuNo?: string;
  sort?: Sort4;
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
   * 开始支付时间
   */
  startPayTime?: string;
  /**
   * 是否允许退单
   * * NO: 否
   * * YES: 是
   */
  status?: number;
  /**
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 商家编码 模糊查询
   */
  supplierCode?: string;
  /**
   * 商家id 精确查询
   */
  supplierId?: number;
  /**
   * 商家名称 模糊查询
   */
  supplierName?: string;
  tailOrderNo?: string;
  /**
   * 渠道订单待处理
   */
  thirdPlatformToDo?: boolean;
  /**
   * 筛选第三方平台订单
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  tradeGroupon?: TradeGrouponVO3;
  /**
   * 订单编号
   */
  tradeIds?: string[];
  tradeState?: TradeStateDTO;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: Criteria;
  [k: string]: any;
}
/**
 * 授信支付信息
 */
export interface CreditPayInfoVO2 {
  /**
   * 授信账户id
   */
  creditAcccountId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
  [k: string]: any;
}
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface TradeGrouponVO3 {
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
 * 订单状态 精确查询
 */
export interface TradeStateDTO {
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
   * 创建时间
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因，订单作废后设置
   */
  obsoleteReason?: string;
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
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 支付时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
export interface Criteria {
  criteriaObject?: {
    [k: string]: {
      [k: string]: any;
    };
  };
  key?: string;
  [k: string]: any;
}
/**
 */
export interface TradeStateDTO1 {
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
   * 创建时间
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
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
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  handSelEndTime?: string;
  handSelStartTime?: string;
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因，订单作废后设置
   */
  obsoleteReason?: string;
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
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   * * PAID_EARNEST: 3: PAID_EARNEST 已支付定金
   */
  payState?: number;
  /**
   * 支付时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  tailEndTime?: string;
  tailStartTime?: string;
  [k: string]: any;
}
/**
 */
export interface Criteria1 {
  criteriaObject?: {
    [k: string]: {
      [k: string]: any;
    };
  };
  key?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseTradePageCriteriaResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TradePageCriteriaResponse;
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
export interface TradePageCriteriaResponse {
  tradePage?: MicroServicePageTradeVO;
  [k: string]: any;
}
/**
 * 分页数据
 */
export interface MicroServicePageTradeVO {
  /**
   * 具体数据内容
   */
  content?: TradeVO2[];
  empty?: boolean;
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
  sort?: Sort5;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface TradeVO2 {
  bookingType?: '0' | '1';
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
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
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO;
  /**
   * 未使用的优惠券
   */
  couponCodes?: CouponCodeVO[];
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
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
  /**
   * 订单组号
   */
  groupId?: string;
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
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  isBookingSaleGoods?: boolean;
  isContainsTrade?: boolean;
  /**
   * 需要授信还款
   */
  needCreditRepayFlag?: boolean;
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
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 外部订单id
   */
  outOrderIds?: string[];
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
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
   * * CREDIT: 授信支付
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
    | 'CREDIT';
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
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?: 'BOSS' | 'CUSTOMER' | 'THIRD' | 'SUPPLIER' | 'PLATFORM' | 'MALL' | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 积分订单的子订单列表，拷贝PointsTradeVO时使用
   */
  pointsTradeVOList?: PointsTradeVO[];
  /**
   * 子订单列表
   */
  providerTradeVOList?: ProviderTradeVO[];
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  /**
   * 是否可选 true 可以 false 不可选中
   * * NO: 否
   * * YES: 是
   */
  canCheckFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 分享人id
   */
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
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  supplierCode?: string;
  supplierName?: string;
  tailNoticeMobile?: string;
  tailOrderNo?: string;
  tailPayOrderId?: string;
  /**
   * 订单所属第三方平台的订单id
   */
  thirdPlatformOrderIds?: string[];
  thirdPlatformPayErrorFlag?: boolean;
  /**
   * 订单所属第三方平台类型
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  thirdSellerId?: string;
  thirdSellerName?: string;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO1;
  tradeCouponItem?: TradePointsCouponItemVO2;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO1;
  /**
   * 主订单号
   */
  tradeId?: string;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO4[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO1[];
  tradePrice?: TradePriceVO2;
  tradeState?: TradeStateVO2;
  /**
   * 子订单列表
   */
  tradeVOList?: null[];
  [k: string]: any;
}
export interface Sort5 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface TradePageCriteriaResponse1 {
  tradePage?: MicroServicePageTradeVO;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageTradeVO1 {
  /**
   * 具体数据内容
   */
  content?: TradeVO2[];
  empty?: boolean;
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
  sort?: Sort5;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface IAddRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 关联订单
   */
  orderIds?: string[];
  /**
   * 还款金额
   */
  repayAmount?: number;
  /**
   * 还款说明
   */
  repayNotes?: string;
  /**
   * 还款单号
   */
  repayOrderCode?: string;
  /**
   * 还款状态 0待还款 1还款成功 2已作废
   * * WAIT: 待还款
   * * FINISH: 还款成功
   * * VOID: 已作废
   */
  repayStatus?: '0' | '1' | '2';
  /**
   * 还款时间
   */
  repayTime?: string;
  /**
   * 还款方式 0银联，1微信，2支付宝
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   */
  repayType?: 'UNIONPAY' | 'WECHAT' | 'ALIPAY';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IFindHasRepaidPageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 授信周期截止时间
   */
  endTime?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
   * 授信周期开始时间
   */
  startTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IGetCanRepayOrderListTradeQueryDTOReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 退单创建开始时间,精确到天
   */
  beginTime?: string;
  /**
   * 预售尾款到达时间
   */
  bookingTailTime?: string;
  bookingType?: '0' | '1';
  /**
   * 客户账号 模糊查询
   */
  buyerAccount?: string;
  /**
   * 客户名称
   */
  buyerId?: string;
  /**
   * 客户名称
   */
  buyerName?: string;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  completionBeginTime?: string;
  completionEndTime?: string;
  /**
   * 收货人 模糊查询
   */
  consigneeName?: string;
  /**
   * 收货人联系方式 模糊查询
   */
  consigneePhone?: string;
  creditPayInfo?: CreditPayInfoVO2;
  /**
   * 客户id
   */
  customerIds?: {
    [k: string]: any;
  }[];
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 已完成订单允许申请退单时间
   */
  day?: number;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 业务员id集合
   */
  employeeIds?: string[];
  /**
   * 退单创建结束时间,精确到天
   */
  endTime?: string;
  /**
   * 批量流程状态
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  flowStates?: (
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL'
  )[];
  /**
   * 是否拼团订单
   */
  grouponFlag?: boolean;
  /**
   * 主订单编号
   */
  id?: string;
  /**
   * 用于根据ids批量查询场景
   */
  ids?: string[];
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  isBookingSaleGoods?: boolean;
  /**
   * 是否boss或商家端
   * * NO: 否
   * * YES: 是
   */
  isBoss?: number;
  /**
   * 客户端条件搜索时使用,订单编号或商品名称
   */
  keyworks?: string;
  /**
   * 需要授信还款
   */
  needCreditRepayFlag?: boolean;
  /**
   * 批量非流程状态
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
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  notFlowStates?: (
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL'
  )[];
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 供应商编号 模糊查询
   */
  providerCode?: string;
  /**
   * 供应商名称
   */
  providerName?: string;
  /**
   * 子订单编号
   */
  providerTradeId?: string;
  /**
   * 筛选订单类型
   * * GROUPON: 拼团订单
   * * FLASH_SALE: 秒杀订单
   * * BOOKING_SALE: 预售订单
   * * BUY_POINTS_ORDER: 积分价订单
   */
  queryOrderType?: 0 | 1 | 2 | 3;
  /**
   * 筛选支付方式
   * * OFFLINE: 线下支付
   * * ONLINE: 在线支付
   * * BALANCE: 积余额支付
   * * POINT: 纯积分支付
   * * POINT_ONLINE: 积分+在线支付
   * * POINT_BALANCE: 积分+余额支付
   * * CREDIT: 授信支付
   * * POINT_CREDIT: 积分+授信支付
   */
  queryPayType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 商品名称 模糊查询
   */
  skuName?: string;
  /**
   * 商品编号 模糊查询
   */
  skuNo?: string;
  sort?: Sort4;
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
   * 开始支付时间
   */
  startPayTime?: string;
  /**
   * 是否允许退单
   * * NO: 否
   * * YES: 是
   */
  status?: number;
  /**
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 商家编码 模糊查询
   */
  supplierCode?: string;
  /**
   * 商家id 精确查询
   */
  supplierId?: number;
  /**
   * 商家名称 模糊查询
   */
  supplierName?: string;
  tailOrderNo?: string;
  /**
   * 渠道订单待处理
   */
  thirdPlatformToDo?: boolean;
  /**
   * 筛选第三方平台订单
   * * LINKED_MALL: LINKED_MALL
   */
  thirdPlatformType?: 0;
  tradeGroupon?: TradeGrouponVO3;
  /**
   * 订单编号
   */
  tradeIds?: string[];
  tradeState?: TradeStateDTO;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: Criteria;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
