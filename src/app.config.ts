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
