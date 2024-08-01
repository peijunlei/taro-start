const cacheName = (name) => {
  return name;
};

/**
 * storage的key，定义为常量统一存放
 */
export default {
  IS_COMM_LOGIN: 'isCommLogin',
  AUTH_TOKEN :'authInfo:token',
  PURCHASE_CACHE: 'purchase-cache', // 用户未登录时的购物车本地缓存
  SKU_MARKETING_CACHE: 'sku-marketing-cache', // 用户未登录时,针对sku选择的营销活动缓存
  GOODS_FIRST_IMAGE: 'goods-first-image', //商品详情第一张图片
  IM_HISTORY: cacheName('HISTORY'), // 查询条件历史记录
  LOGIN_DATA: 'b2b-wechat@login', //h5端登录信息缓存
  SINGER_CARD_LOGIN: 'b2b-wechat@singer-card-login', //是否是卡独立登录进入的页面
  ACCOUNT_TOKEN: 'account-token', //h5端注册临时token
  FORGET_CODE: 'forgetpass-verticode', //修改密码时获取的验证码
  CUSTOMER_ID: 'forgetpass-customerId', //修改密码时发送验证码后返回过来的ID
  OLD_VERIFY_CODE: 'change-mobile-oldCode', //修改绑定手机号验证原来的验证码
  PAY_CODE: 'pay_code', //设置或忘记支付密码时发送的验证码
  ORDER_CONFIRM: cacheName('b2b@order-confirm'), //确认订单即时信息
  ORDER_CONFIRM_COUPON: cacheName('b2b-app@order-confirm-coupon'), //确认订单优惠券即时信息
  ORDER_CONFIRM_PAYTYPE: cacheName('b2b-app@order-confirm-paytype'), //确认订单支付方式临时信息
  ORDER_INVOICE: cacheName('b2b@order-invoice'), //确认订单发票临时信息
  ORDER_POINT: cacheName('b2b@order-point'), //确认订单积分临时信息
  LOGISTICS_INFO: 'logistics-info', // 退单列表填写的物流信息
  SELLER_ACCOUNT: cacheName('seller-account'), //填写付款单-收款账号
  AUTH_INFO: cacheName('wechat-auth-info'), //微信-授权信息
  PENDING_AND_REFUSED: cacheName('pending-or-refused-useInfo'), //审核中或者审核未通过的用户信息

  PAYMENT_REMARK: 'payment_remark', //付款单的备注
  PAYMENT_TIME: 'payment_time', //付款单的时间
  PAYMENT_ENCLOSES: 'payment_encloses', //付款单的附件
  SITE_PC_TITLE: 'site_pc_title',
  SITE_PC_ICO: 'SITE_PC_ICO',
  TARGET_PAGES: 'TARGET_PAGES', //拦截登录前需要访问的目标页面
  INVITEE_ID: 'invitee-id', // 邀请人id(邀请人的customerId)
  IEP_INVITEE_CODE: 'iep-invitee-code', // 企业会员注册时填写的邀请码
  IS_DISTRIBUTOR: 'is-distributor', // 当前登录用户是否是可用分销员
  CHANNEL_TYPE: 'channel-type', // 分销渠道 1:商城 2:小店
  MY_PERFORMANCE: 'my_performance', //我的销售业绩显示/隐藏
  REGISTER_INFO: 'register_info', //注册信息，临时缓存
  MAIN_SCROLL_TOP: 'main_scroll_top', //首页滚动条位置
  DISTRIBUTOR_FLAG: 'distributor-flag', //是否有分销资格，禁用的时候也视为由分销资格
  IS_OPEN_DISTRIBUTOR: 'is_open_distributor', //是否开启分销功能
  NEED_TABBAR_RELOAD: 'need_tabbar_reload', //tarbar是否需要重新加载
  IS_OPEN_LIVE: 'is_open_live', //是否开启直播功能

  VALUE_ADDED_SERVICES: 'mini-value-added-service', // 增值服务
  PURCHASE_INFO: 'purchase:info', // 购物车缓存
  PURCHASE_SETTLEMENT: 'purchase:settlement', // 购物车去结算
  MAIN_RELOAD: 'main:reload', //首页刷新
  SHARE_USER_ID: 'share-user-id', //分享人id

  ONLINE_RELATED_ORDER: 'online_related_order', //在线还款选中关联订单
  ONLINE_REPAY_NOTE: 'online_repay_note', //在线还款还款说明

  STORE_ID: 'storeId', // 标记当前商城所属品牌商城
  //loading图
  LOADING_URL: 'loading_url',
  CUSTOMER_INFO:'customerInfo',
  CURRENT_POSITION: 'current_position', //当前位置
  //以下缓存地址重新设置
  //首次定位城市和经纬度保存
  //城市列表选择后保存
  CACHE_MAIN_CITY: 'cache_main_city', // 缓存首页定位的城市
  CACHE_CHOOSE_CITY_TAG: 'cache_choose_city_tag', // 缓存手动选择的城市的标识
  CURRENT_POSITION_INFO: 'current_position_info', // 当前定位信息
  CACHE_CITY: 'cache_city', // 缓存城市
  CACHE_CURRENT_CITY: 'cache_current_city', // 缓存选择的城市
  CACHE_POSITION_CITY: 'cache_position_city', // 缓存定位和手动选择的城市
  CACHE_HOME_FLAG:'cache_home_flag',
  CODE_ARR: 'codeArr', // 缓存选择的收获地址编码
  SELECT_ADDRESS: 'selectAddress', // 缓存选择的收获地址
  SELECT_HOUSE_NUM: 'selectHouseNum', // 缓存选择的收获地址
  LOCATE_INFO: 'locate_info', //首页地图定位获取的地址信息 包含{address: '地址'，lat: '维度', lng: '经度'}
  MINI_CHOOSE_SHOP: 'mini::choose_shop', // 小程序缓存选择门店
  MINI_CHOOSE_SHOP_FLAG: 'mini::choose_shop_flag', // 小程序缓存选择门店的标识
  /**购物车结算的入参 */
  ORDER_CONFIRM_PARAMS:'order_confirm_params',
  /**确认订单页是否切换收货地址 */
   MINI_CHOOSE_ADDRESS: 'mini::choose_address',
   DANGAO_PHONE: 'mini:dangao_phone',
  //  channelEnterpriseId
  CHANNEL_ENTERPRISE_ID: 'channelEnterpriseId',
};
