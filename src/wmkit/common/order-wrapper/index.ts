/**
 * Created by chenpeng on 2017/7/25.
 */
import {_, immutable} from 'wmkit';
const FLOW_STATE = {
  INIT: '待审核',
  GROUPON: '待成团',
  AUDIT: '待发货',
  DELIVERED_PART: '待发货',
  DELIVERED: '待收货',
  CONFIRMED: '已收货',
  COMPLETED: '已完成',
  VOID: '已作废',
};

const PAY_STATUS = {
  NOT_PAID: '未付款',
  UNCONFIRMED: '待确认',
  PAID: '已付款',
};

const DELIVERY_STATUS = {
  NOT_YET_SHIPPED: '未发货',
  PART_SHIPPED: '部分发货',
  SHIPPED: '全部发货',
  FAIL: '发货失败',
};

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState, paymentOrder) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (
    (status == 'AUDIT' && payState == 'NOT_PAID' && paymentOrder == 'PAY_FIRST') ||
    (status == 'AUDIT' && payState == 'UNCONFIRMED' && paymentOrder == 'PAY_FIRST')
  ) {
    return '待付款';
  } else if (status == 'WAIT_PAY_EARNEST' && payState == 'NOT_PAID') {
    return '待支付定金';
  } else if (
    (status == 'WAIT_PAY_TAIL' && payState == 'PAID_EARNEST') ||
    (status == 'AUDIT' && payState == 'PAID_EARNEST')
  ) {
    return '待支付尾款';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};

const invoiceType = (type: string) => {
  if (type == '0') {
    return '普通发票';
  } else if (type == '1') {
    return '增值税专用发票';
  } else if (type == '-1') {
    return '不需要发票';
  }
};

class WrapperOrder {
  order;

  constructor(order) {
    this.order = order;
  }

  orderNo() {
    return this.order.get('id');
  }

  orderMType() {
    return this.order.get('orderType');
  }
  /**
   * 订单状态
   * @returns {any}
   */
  orderState() {
    // return FLOW_STATE[this.order.getIn(['tradeState', 'flowState'])];
    return flowState(
      this.order.getIn(['tradeState', 'flowState']),
      this.order.getIn(['tradeState', 'payState']),
      this.order.get('paymentOrder'),
    );
  }

  /**
   * 订单是否作废
   * @returns {boolean}
   */
  isVoidTrade() {
    return this.order.getIn(['tradeState', 'flowState']) == 'VOID';
  }

  /**
   * 订单类型
   */
  orderTag() {
    return this.order.get('orderTag');
  }

  /**
   * 订单作废原因
   * @returns {any|string}
   */
  obsoloteReason() {
    return this.order.getIn(['tradeState', 'obsoleteReason']) || '-';
  }

  /**
   * 订单下单时间
   * @returns {any}
   */
  createTime() {
    const creat = this.order.getIn(['tradeState', 'createTime']);
    if (creat) {
      return _.formatDate(creat);
    }
  }

  /**
   * 买家信息
   * @returns {any}
   */
  buyerName() {
    return this.order.getIn(['consignee', 'name']);
  }

  /**
   * 手机号
   */
  buyerPhone() {
    return this.order.getIn(['consignee', 'phone']);
  }

  /**
   * 收货地址
   */
  buyerAddress() {
    const consignee = this.order.get('consignee');
    return consignee ? consignee.get('detailAddress') : '';
  }

  /**
   * 购买人ID
   * @returns {any}
   */
  buyerId() {
    return this.order.getIn(['buyer', 'id']);
  }

  /**
   * 是否购买
   */
  isPayed() {
    return this.order.getIn(['tradeState', 'payState']) != 'NOT_PAID';
  }

  /**
   * 商品总价
   */
  totalPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'totalPrice']));
  }

  /**
   * 商品价格
   */
  goodsPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'goodsPrice']));
  }

  /**
   * 满减金额
   */
  reductionPrice() {
    const discountsPriceDetails = this.order.getIn(['tradePrice', 'discountsPriceDetails']);
    const reduction = discountsPriceDetails
      ? discountsPriceDetails.find((item) => item.get('marketingType') == 0)
      : null;
    return reduction ? _.addZero(reduction.get('discounts')) : 0;
  }

  /**
   * 满折金额
   */
  discountPrice() {
    const discountsPriceDetails = this.order.getIn(['tradePrice', 'discountsPriceDetails']);
    const discount = discountsPriceDetails
      ? discountsPriceDetails.find((item) => item.get('marketingType') == 1)
      : null;
    return discount ? _.addZero(discount.get('discounts')) : 0;
  }

  /**
   * 优惠券金额
   * @returns {*}
   */
  couponPrice() {
    const couponPrice = this.order.getIn(['tradePrice', 'couponPrice']);
    return couponPrice ? _.addZero(couponPrice) : 0;
  }

  /**
   * 改价金额
   * @returns {*}
   */
  privilegePrice() {
    const privilegePrice = this.order.getIn(['tradePrice', 'privilegePrice']);
    const special = this.order.getIn(['tradePrice', 'special']);
    return special ? _.addZero(privilegePrice) : 0;
  }

  /**
   * 物流费
   */
  deliveryPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'deliveryPrice']));
  }

  /**
   * 买家备注
   */
  buyerRemark() {
    return this.order.get('buyerRemark') || '无';
  }

  /**
   * 卖家备注
   */
  sellerRemark() {
    return this.order.get('sellerRemark') || '无';
  }

  tradeItems() {
    return this.order.get('tradeItems') || immutable.fromJS([]);
  }

  /**
   * 营销赠品全量列表
   */
  gifts() {
    return this.order.get('gifts') || immutable.fromJS([]);
  }

  totalNum() {
    return this.tradeItems() ? this.tradeItems().reduce((x, y) => (x += y.get('num')), 0) : 0;
  }

  /**
   * 订单附件
   * @returns {any[]}
   */
  encloses() {
    if (this.order.get('encloses')) {
      let encloses = this.order.get('encloses').split(',');
      let enclo = immutable.fromJS(encloses || []);
      return enclo.size > 0 ? enclo.map((value) => immutable.Map().set('image', value)).toJS() : [];
    } else {
      return [];
    }
  }

  payId() {
    return this.order.getIn(['payInfo', 'payTypeId']);
  }

  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  orderPayState() {
    return PAY_STATUS[this.order.getIn(['tradeState', 'payState'])];
  }

  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  orderDeliveryState() {
    return DELIVERY_STATUS[this.order.getIn(['tradeState', 'deliverStatus'])];
  }

  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  orderInvoice() {
    return invoiceType(this.order.getIn(['invoice', 'type']));
  }

  /**
   * 店铺信息
   * @returns {string}
   */
  storeName() {
    return this.order.getIn(['supplier', 'storeName']);
  }

  /**
   * 店铺id
   */
  storeId() {
    return this.order.getIn(['supplier', 'storeId']);
  }

  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf() {
    return this.order.getIn(['supplier', 'isSelf']);
  }

  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 供应商
   * * PLATFORM: 平台
   */
  platform() {
    return this.order.get('platform');
  }

  /**
   * 分销信息
   */
  // 邀请人ID
  getInviteeId() {
    return this.order.get('inviteeId');
  }
  // 邀请人名称
  distributorName() {
    return this.order.get('distributorName');
  }
  // 小店名称
  shopName() {
    return this.order.get('shopName');
  }
  // 分销渠道
  channelType() {
    return this.order.get('channelType');
  }
  // 订单返利
  commission() {
    let commission = this.order.get('commission');
    return commission ? _.addZero(commission) : 0;
  }
  // 是否是开店礼包
  storeBagsFlag() {
    return this.order.get('storeBagsFlag');
  }

  /**
   * 积分兑换金额
   * @returns {string}
   */
  pointsPrice() {
    const pointsPrice = this.order.getIn(['tradePrice', 'pointsPrice']);
    return pointsPrice ? _.addZero(pointsPrice) : 0;
  }

  /**
   * 活动优惠
   */
  marketingDiscountPrice() {
    let marketingDiscountPrice = this.order.getIn(['tradePrice', 'marketingDiscountPrice']);
    return marketingDiscountPrice ? _.addZero(marketingDiscountPrice) : 0;
  }

  /**
   * 订单积分
   */
  points() {
    return this.order.getIn(['tradePrice', 'points']);
  }

  /**
   * 尾款
   */
  tailPrice() {
    return this.order.getIn(['tradePrice', 'tailPrice']);
  }

  /**
   * 订单类型
   */
  crossBorderFlag() {
    return this.order.get('crossBorderFlag');
  }

  /**
   * 订单是否可退
   */
  canReturnFlag() {
    return this.order.get('canReturnFlag') && ![1, 2].includes(this.order.getIn(['tradePrice', 'giftCardType']));
  }

  flowState() {
    return this.order.getIn(['tradeState', 'flowState']);
  }

  payState() {
    return this.order.getIn(['tradeState', 'payState']);
  }
  thirdObsoleteReason(){
    return this.order.get('thirdObsoleteReason');
  }

  /**
   * 礼品卡抵扣金额
   * @returns {*}
   */
  giftCardPrice() {
    const giftCardPrice = this.order.getIn(['tradePrice', 'giftCardPrice']);
    return giftCardPrice ? _.addZero(giftCardPrice) : 0;
  }

  showGoodsPriceFlag(){
    return this.order.get('showGoodsPriceFlag');
  }
  giftCardFlag(){
    return this.order.get('giftCardFlag');
  }
  isDangaoss(){
    return this.order.get('tradeItems').some(item => item.get('goodsType')===8);
  }
  dangaossTrade(){
    return this.order.get('dangaossTrade');
  }
}

export default (order) => {
  return new WrapperOrder(order);
};
