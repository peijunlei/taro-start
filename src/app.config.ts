export default {
  pages: [
    'pages/index/index',
    'pages/user-center/index',
    'pages/shop-cart/index',
    // //分类和发现的搭载页面
    'pages/classify-circle-load-page/index',
    // //识别小程序码的中转页面
    'pages/sharepage/sharepage',
    // //分销中心和奖励中心的搭载页面
    // // 'pages/load-page/index',
    // // 'pages/material-circle/index',
    // // 礼品卡登录页通用
    'pages/gc/g',
  ],
  subPackages: [
    {
      root: 'pages/package-A',
      pages: [
        // 停机公告
        'notice/index',
        'customer/select-receive-address/index',
        'customer/select-address-map/index',
        'customer/select_city/index',
        'customer/give-gift/index',
        'customer/give-gift-red-packet/index',
        'customer/give-gift-record/index',
        // 积分卡兑换
        'customer/cards/login',
        'customer/user/points-none/index',
        // 登录
        'login/login/index',
        'login/success/index',
        'login/wecat-login/index',
        'login/vip-agreement/index',
        'login/wecat-bind-tel/index',
        //注册
        'login/register/index',
        //企业注册
        'login/iep-register/index',
        //企业信息填写
        'login/iep-register-info/index',
        //完善企业信息
        'login/improve-iep-info/index',
        //完善账户信息
        'login/account/index',
        //店铺首页 埋点单独处理：componentDidMount
        'store/store-main/index',
        //店铺列表
        'store/store-list/index',
        //店铺档案 埋点单独处理：init
        'store/store-profile/index',
        // 领券中心
        'coupon/coupon-center/index',
        // 我的优惠券
        'customer/my-coupon/index',
        //我的-余额
        'customer/balance/home/index',
        //我的-余额-提现申请
        'customer/balance/deposit/index',
        // //我的-余额-提现记录
        'customer/balance/deposit/deposit-records/index',
        // 我的-余额-提现详情
        'customer/balance/deposit/deposit-detail/index',
        //我的-余额-提现成功
        'customer/balance/deposit/deposit-success/index',
        //我的-余额-明细
        'customer/balance/account-detail/index',
        //我的积分
        'customer/user-integral/index',
        // 我的设置
        'customer/my-set/index',
        //我的-设置-账户安全
        'customer/user-safe/index',
        //修改登录密码
        'customer/user-pw/index',
        'customer/user-pw-next/index',
        //修改支付密码
        'customer/user-pay/index',
        'customer/user-pay-next/index',
        //修改手机号
        'customer/user-mobile/index',
        'customer/user-mobile-next/index',
        //收货地址
        'customer/receive-address/index',
        'customer/receive-address-edit/index',
        //关联账户
        'customer/linked-account/index',
        //基础信息
        'customer/user-info/index',
        // 关于我们
        'customer/about-us/index',
        //基础信息编辑
        'customer/user-info/edit-accountName/index',
        'customer/user-info/edit-addressInfo/index',
        'customer/user-info/edit-contactName/index',
        'customer/user-info/edit-contactPhone/index',
        // 会员成长值
        'customer/user/growth-value/index',
        // 会员中心
        'customer/user/member-center/index',
        // 等级权益
        'customer/user/class-equity/index',
        // 积分商城
        'customer/user/points-mall/index',
        // 积分下单
        'customer/user/points-confirm/index',
        // 积分下单成功
        'customer/user/points-confirm/order-success/index',
        // 积分商品清单
        'customer/user/points-sku-list/index',
        // 兑换记录
        'customer/user/points-order-list/index',
        // 评价中心
        'customer/evaluate-center/index',
        'customer/evaluate-drying/index',
        // 我的-消息中心
        'customer/message-push/center/index',
        // 我的-消息中心-优惠促销
        'customer/message-push/list/index',
        // 财务
        'customer/user-finance/index',
        'customer/bank-accounts/index',
        'customer/modify-bank-account/index',
        //公司信息
        'customer/user-enterprise/index',
        // 关注店铺
        'store/store-attention/index',
        //收藏商品
        'customer/user-collection/index',
        //店铺搜索 埋点单独处理：componentDidShow
        'store/store-search/index',
        //财务邮箱
        'customer/finance-email/index',
        //增票资质
        'customer/user-invoice/index',
        //签到
        'customer/sign/index',
        //客服
        'customer/chose-service/index',
        'customer/chose-service-webview/index',
        //我的授信
        'customer/credit-center/index',
        //授信申请
        'customer/credit-apply/index',
        //历史记录
        'customer/credit-history/index',
        // 额度恢复详情
        'customer/credit-return-detail/index',
        // 还款详情
        'customer/credit-repayment-detail/index',
        // 关联订单
        'customer/credit-associate-order/index',
        //虚拟订单
        'customer/user/virtual-order-list/index',
        // 选择企业
        'customer/choose-enterprise/index',
      ],
    },
    {
      root: 'pages/package-B',
      pages: [
        // 拉起小程序的中间页面
        'launch-mini/index',
        //商品搜索 埋点单独处理：componentDidShow
        'goods/search/index',
        //商品列表 埋点单独处理：componentDidShow
        'goods/goods-list/index',
        //商品分类
        'goods/all-list/index',
        //埋点单独处理：init
        'goods/cate-list/index',
        // //预约商品列表
        'preBuy-list/index',
        //商品促销列表
        'goods/goods-list-promotion/index',
        //打包一口价促销列表
        'goods/coupon-list-promotion/index',
        //商品详情 埋点单独处理：componentDidMount和changeSpecDetail(切换规格)
        'goods/goods-details/index',
        //商品详情失效
        'goods/goods-failure/index',
        //  // 抢购中
        'goods/goods-buy-in/index',
        //预约商品抢购中
        'goods/goods-prebuy-in/index',
        //拼团详情 埋点单独处理：findSpuDetails
        'goods/group-details/index',
        //商品评价
        'goods/goods-evaluation-list/index',
        //魔方文章页/列表页
        'x-site/page-link/index',
        // 自定义页面
        'x-site/custom-link/index',
        //第三方电影票购买
        'x-site/movie-ticket/index',
        //电影票详情页
        'x-site/movie-order-detail/index',
        //本地生活
        'x-site/local-life/index',
        //演出
        'x-site/performance-center/index',
        // 美团外卖
        'x-site/meituan-takeout/index',
        // 美团餐饮
        'x-site/meituan-catering/index',
        // 叮咚买菜
        'x-site/dingdong-vegetable/index',
        // 山姆会员中心
        'x-site/sams-center/index',
        //奖励中心
        // 'reward-center/index',
        //奖励中心 开店礼包
        'reward-center/store-bags/index',
        //奖励中心 开店礼包-详情
        'reward-center/goods-details/index',
        //分销中心-店铺首页
        'distribution/shop/shop-index/index',
        //分销员小店详情
        'distribution/shop/socia-details/index',
        //分销中心-推广订单
        'distribution/promote-order-list/index',
        //分销中心-店铺-编辑店铺商品
        'distribution/shop/shop-edit/index',
        //分销中心-店铺-店铺选品
        'distribution/shop/shop-goods/index',
        //分销员小店首页
        'distribution/store/social-c/shop-index-c/index',
        //销售业绩
        'sales/sales-perform/index',
        //排行榜
        'sales/sales-rank/index',
        //我的用户
        'distribution/my-customer/index',
        // 热拼排行
        'groupon/groupon-selection/index',
        // 参团详情
        'groupon/group-buy-detail/index',
        // 发圈素材
        'goods/material-circle/index',
        // 拼团购
        'groupon/groupon-center/index',
        //邀请好友
        'distribution/invite-friends/index',
        // 拼团搜索
        'groupon/groupon-search-list/index',
        //分销员小店购物车
        'distribution/store/social-c/shop-cart-c/index',
        //分销员小店 我的
        'distribution/store/social-c/shop-my-c/index',
        // 我的拼购
        'groupon/customer-groupon-list/index',
        // 拼团玩法
        'groupon/groupon-rule/index',
        // 秒杀频道主页
        'flash-sale/spike-home/index',
        //组合商品列表
        'goods/combination-goods/index',
        //二级购物车
        'goods/shop-cart-without-bottom/index',
      ],
    },
    {
      root: 'pages/package-C',
      pages: [
        //订单列表
        'order/order-list/index',
        'order/order-history-list/index',
        //订单详情
        'order/order-detail/index',
        'order/order-history-detail/index',
        //订单详情-发货记录
        'order/ship-record/index',
        //订单详情-付款记录
        'order/pay-detail/index',
        //订单详情-发票信息
        'order/invoice-info/index',
        //订单详情-发货记录-发货商品清单
        'order/ship-list/index',
        //订单详情-发货记录-物流信息
        'order/logistics-info/index',
        //确认订单
        'order/order-confirm/index',
        //电影票确认订单
        'order/order-movie-confirm/index',
        //确认订单-商品清单
        'order/order-tool/order-sku-list/index',
        //确认订单-支付方式
        'order/order-tool/order-delivery/index',
        //确定订单-选择优惠券
        'order/order-tool/order-coupon/index',
        //确认订单-索取发票
        'order/order-tool/order-invoice/index',
        //确认订单-线上支付
        'order/order-tool/order-pay/index',
        //确认订单-支付成功
        'order/order-tool/order-success/index',
        'order/order-tool/choose-shop/index',
        //退单列表
        'order/refund-list/index',
        //退单详情
        'order/return-detail/index',
        // 申请退货退款Step1
        'order/return-refund/return-first-step/index',
        // 申请退货退款Step2
        'order/return-refund/return-second-step/index',
        // 仅申请退款
        'order/return-refund/refund-first-step/index',
        // 仅申请退货退款/退款 成功提示页
        'order/return-refund/return-refund-success/index',
        // 线下支付-填写付款单
        'order/fill-payment/index',
        // 线下支付-填写付款单-提交成功页
        'order/fill-payment-success/index',
        //收款账户列表
        'order/seller-account/index',
        //填写物流信息
        'order/logistics-input/index',
        //退货物流信息详情
        'order/return-logistics-info/index',
        //退款记录
        'order/finance-refund-record/index',
        //订单详情-商品清单
        'order/order-sku-list/index',
        //退单详情-商品清单
        'order/return-sku-list/index',
        //秒杀提交订单
        'order/flash-sale-order-confirm/index',

        // 在线还款申请
        'credit/online-repayment/index',
        // 选择关联授信订单
        'credit/credit-associate-order/index',
        // 在线还款选择支付方式
        'credit/repay-method/index',
        // 在线还款结果
        'credit/repay-result/index',
        // 我的奖品
        'lottery/prize-list/index',
        // 抽奖动画
        'lottery/prize-draw/index',
        // 抽奖规则
        'lottery/prize-draw-rule/index',
        // 奖品领取页面
        'lottery/prize-receive/index',
        // 奖品领取详情
        'lottery/prize-detail/index',
        // 奖品领取成功页
        'lottery/prize-success/index',
        // 虚拟商品申请退货退款
        'order/return-refund/virtual-goods-return/index',
      ],
    },
    {
      root: 'pages/package-D',
      pages: [
        // 礼品卡使用
        'gift-card-use/index',
        // 我的礼品卡
        'gift-card/my-gift-card/index',
        // 兑换礼品卡
        'gift-card/exchange-card/index',
        // 礼品卡使用须知
        'gift-card/gift-card-useDesc/index',
        // 礼品卡使用记录
        'gift-card/gift-card-bill/index',
        // 礼品卡详情
        'gift-card/gift-card-detail/index',
        // 礼品卡登录页
        'gift-card/gift-card-login/index',
        // 礼品卡祝福页
        'gift-card/gift-card-bless/index',
        // 礼品卡凑单页面
        // 'gift-card/gift-card-list-promotion/index',
        // 使用礼品卡
        'gift-card/use-gift-card/index',
        // 礼品卡登录页通用
        'gift-card/gift-card-login-common/index',
      ],
    },
    {
      root: 'pages/package-F',
      pages: [
        'cards/brand/index',
        'cards/details/index',
        //免登中间页
        'login-middle/index',
        // 频道商品列表页
        'channel/goods-list/index',
        'channel/goods-search/index',
      ],
    },
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#FF6600',
    basename: '/mobile',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/image/tab/main.png',
        text: '首页',
        selectedIconPath: 'assets/image/tab/main-curr.png',
      },
      // {
      //   pagePath: 'pages/classify-circle-load-page/index',
      //   iconPath: 'assets/image/tab/material.png',
      //   text: '发现',
      //   selectedIconPath: 'assets/image/tab/material-red.png',
      // },
      {
        pagePath: 'pages/classify-circle-load-page/index',
        iconPath: 'assets/image/tab/goods.png',
        text: '分类',
        selectedIconPath: 'assets/image/tab/goods-curr.png',
      },
      // {
      //   pagePath: 'pages/load-page/index',
      //   iconPath: 'assets/image/tab/reward.png',
      //   text: '奖励中心',
      //   selectedIconPath: 'assets/image/tab/reward-curr.png',
      // },
      // {
      //   pagePath: 'pages/load-page/index',
      //   iconPath: 'assets/image/tab/goods-item.png',
      //   text: '商品',
      //   selectedIconPath: 'assets/image/tab/goods-item-curr.png',
      // },
      {
        pagePath: 'pages/shop-cart/index',
        iconPath: 'assets/image/tab/shopcart.png',
        selectedIconPath: 'assets/image/tab/shopcart-curr.png',
        text: '购物车',
      },
      // {
      //   pagePath: 'pages/package-A/customer/my-set/index',
      //   iconPath: 'assets/image/common/goods.png',
      //   selectedIconPath: 'assets/image/common/goods-curr.png',
      //   text: '商品',
      // },

      {
        pagePath: 'pages/user-center/index',
        iconPath: 'assets/image/tab/my.png',
        selectedIconPath: 'assets/image/tab/my-curr.png',
        text: '我的',
      },
    ],
  },
  preloadRule: {
    'pages/index/index': {
      network: 'all',
      packages: ['pages/package-A'],
    },
    'pages/user-center/index': {
      network: 'all',
      packages: ['pages/package-C'],
    },
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
    'scope.writeClipboard': true,
  },
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'dark',
  },
  plugins: {
  },
  __usePrivacyCheck__: true,
};
