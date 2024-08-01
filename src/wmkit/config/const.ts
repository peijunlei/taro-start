export const Const = {
  DATE_FORMAT: 'YYYY-MM-DD',
  MINUTE_FORMAT: 'YYYY-MM-DD HH:mm',
  SECONDS_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  DATE_INCLINE: 'YYYY/MM/DD',
  // 购物车限订50
  PURCHASE_MAX_SIZE: 50,

  // 每日最大提现金额限制
  MAX_DRAW_CASH: 10000,
  // 每日最小提现金额限制
  MIN_DRAW_CASH: 1,

  // 退货状态
  returnGoodsState: {
    INIT: '待审核',
    AUDIT: '待填写物流',
    DELIVERED: '待商家收货',
    RECEIVED: '待退款',
    COMPLETED: '已完成',
    REJECT_RECEIVE: '拒绝收货',
    REJECT_REFUND: '拒绝退款',
    VOID: '已作废',
  },
  // 退款状态
  returnMoneyState: {
    INIT: '待审核',
    AUDIT: '待退款',
    COMPLETED: '已完成',
    REJECT_REFUND: '拒绝退款',
    VOID: '已作废',
  },
  // 订单状态
  flowState: {
    INIT: '待审核',
    REMEDY: '修改订单',
    REFUND: '退款',
    AUDIT: '待发货',
    DELIVERED_PART: '待发货',
    DELIVERED: '待收货',
    CONFIRMED: '已收货',
    COMPLETED: '已完成',
    VOID: '已作废',
  },
  marketingType: {
    0: '减',
    1: '折',
    2: '赠',
  },
  //积分抵扣比例,默认100
  pointRatio: 100,
  thirdPlatformTypeList: ['天猫', '京东'],

  //外部渠道类型
  XUANKUA_TYPE: {
    /**电影 */
    0: 'movie',
    /**生活 */
    1: 'life',
    /**演出 */
    2: 'performance',
    /**美团外卖 */
    3: 'mt-takeout',
    /**美团餐饮 */
    4: 'mt-catering',
    /**叮咚买菜 */
    5: 'dingdong-vegetable',
    /**山姆优选*/
    6: 'sams-center',
  }
};
