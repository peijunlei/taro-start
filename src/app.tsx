import Taro, {getCurrentInstance} from '@tarojs/taro';
import 'default-passive-events';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import './app.less';
import './animate.less';
import api from 'api';
import config, {setGlobalData} from '@/service/config';

import {cache} from 'config';
import {_, WMkit, wxAuth, pvUvStatics, msg} from 'wmkit';
// fixme 这边要优化，直接引入的样式有点多
// import '@wanmi/ui-taro/lib/style/templates/index.less';
import * as sentry from 'sentry-mina';
import Raven from 'raven-js';
import {getHashParam} from '@/utils/common-functions';
import goodPng from './assets/image/common/goods.png';
import goodCurrPng from './assets/image/common/goods-curr.png';
import goodItemPng from './assets/image/tab/goods-item.png';
import goodItemCurrPng from './assets/image/tab/goods-item-curr.png';
import materialPng from './assets/image/tab/material.png';
import materialCurrPng from './assets/image/tab/material-red.png';
import distributionPng from './assets/image/tab/distribution.png';
import distributionCurrPng from './assets/image/tab/distribution-curr.png';
import rewardPng from './assets/image/tab/reward.png';
import rewardCurrPng from './assets/image/tab/reward-curr.png';
import {XuanKuaType} from 'api/CustomerBaseController';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
function loadJS(jsPath) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = jsPath;
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function getXuanKuaType(url: string) {
  let foundKey = null;
  const PDD_MAP = {
    '0': 'movie-ticket',
    '1': 'local-life',
    '2': 'performance-center',
    '3': 'meituan-takeout',
    '4': 'meituan-catering',
    '5': 'dingdong-vegetable',
    '6': 'sams-center',
  };
  Object.entries(PDD_MAP).forEach(([key, value]) => {
    if (url.includes(value)) {
      foundKey = key;
    }
  });
  return foundKey;
}
class App extends Component<any,any> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  constructor(props) {
    super(props);
    bindH5EventListener();
  }
  // config: Config = {

  // };
  //获取小程序分享配置
  getShareConfig = async () => {
    let res = await api.mobileConfigController.listConfigs();
    let shareInfo = res.find((item) => {
      return item.configType == 'applet_share_setting';
    });
    await Taro.setStorage({
      key: 'wechatShareInfo',
      data: shareInfo.context,
    });
  };

  //微信分享配置
  initConfig = (appId, timestamp, nonceStr, signature) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'scanQRCode',
        'checkJsApi',
      ], // 必填，需要使用的JS接口列表
      openTagList: ['wx-open-launch-weapp'],
    });
  };

  componentDidUpdate(preProps) {
    // 获取当前路由堆栈
    const paths = __TARO_ENV == 'h5' ? window.location : Taro.getCurrentPages();
    const isShowMobile = __TARO_ENV == 'h5' ? '/mobile' : '';
    // 白名单
    const whitelist = [
      isShowMobile + '/pages/package-B/goods/goods-details/index', //详情页 componentDidMount和changeSpecDetail(切换规格)
      isShowMobile + '/pages/package-B/goods/group-details/index', //拼团详情页 findSpuDetails
      isShowMobile + '/pages/package-B/distribution/shop/socia-details/index', //分销员小店详情 findSpuDetails
      isShowMobile + '/pages/package-B/reward-center/goods-details/index', //奖励中心商品详情页 findSpuDetails
      isShowMobile + '/pages/package-A/store/store-main/index', //店铺首页 componentDidMount
      isShowMobile + '/pages/package-B/goods/cate-list/index', //店铺商品分类 init
      isShowMobile + '/pages/package-A/store/store-profile/index', //店铺档案 init

      // componentDidUpdate会调用两次单独处理页面
      isShowMobile + '/pages/package-B/goods/search/index', //搜索页 componentDidShow
      isShowMobile + '/pages/package-B/goods/goods-list/index', //列表页 componentDidShow
      isShowMobile + '/pages/package-A/store/store-search/index', //店铺搜索页 componentDidShow
      isShowMobile + '/pages/package-B/goods/goods-failure/index', //商品不存在

      //tabbar页面 componentDidShow
      isShowMobile + '/pages/index/index',
      isShowMobile + '/pages/classify-circle-load-page/index',
      isShowMobile + '/pages/load-page/index',
      isShowMobile + '/pages/shop-cart/index',
      isShowMobile + '/pages/user-center/index',

      //h5未触发，小程序触发
      isShowMobile + '/pages/package-B/goods/goods-list-promotion/index',
    ];
    let pathName = '';
    // 区分h5和小程序
    // 取当前路由
    if (__TARO_ENV == 'h5') {
      pathName = (paths as any).pathname || '';
    } else {
      const length = (paths as any)?.length;
      pathName = length ? '/' + (paths as any)[length - 1].route : '';
    }

    // 埋点
    if (!whitelist.includes(pathName)) {
      // 根据当前路由判断是否需要进行埋点，当返回、用Taro.redirectTo跳转时会触发两次componentDidUpdate
      if (__TARO_ENV == 'h5') {
        const length = this.props?.children?.children?.length; //取当前路由栈长度
        const currentPath = length ? isShowMobile + this.props.children.children[length - 1].key : ''; //判断当前路由
        //不是当前路由则不埋点
        if (!currentPath.includes(pathName)) {
          return;
        }
      }
      if (__TARO_ENV != 'h5' && this.props?.children?.length < preProps?.children?.length) {
        return;
      }

      pvUvStatics.myPvUvStatis({});
    }
  }
  async componentDidMount() {
    console.log('componentDidMount');
    //小程序监控方法
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP && !!config.wechatDsn) {
      sentry.init({
        dsn: config.wechatDsn,
        environment: config.hostEnv,
      });
      new sentry.Integrations.Breadcrumbs({
        console: true,
        realtimeLog: ['info', 'warn', 'error'], // https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog/
        request: true,
        navigation: true,
        api: true,
        lifecycle: true,
        unhandleError: true,
      });

      new sentry.Integrations.TryCatch();

      new sentry.Integrations.GlobalHandlers();
    } else {
      if (config.mobileDsn) {
        //h5监控方法
        Raven.config(config.mobileDsn)
          .setEnvironment(config.hostEnv)
          .addPlugin(require('raven-js/plugins/console'))
          .install();
      }
    }
    //获取小程序分享配置
    this.getShareConfig();

    Taro.getSystemInfo({
      success: (res) => {
        let isIphoneX = /iphone x/i.test(res.model);
        let isIOS = res?.system?.indexOf('iOS') > -1;

        setGlobalData('isIphoneX', isIphoneX);
        setGlobalData('isIOS', isIOS);
      },
    });

    api.systemController.findBaseConfig().then((res) => {
      const {pcIco, storeId, pcTitle} = res;
      // 与后端约定了
      if (pcTitle && pcTitle === 'STOP') {
        Taro.redirectTo({url: '/pages/package-A/notice/index'});
        Taro.hideToast();
        return;
      }
      const icon = pcIco ? JSON.parse(pcIco)[0].url : '';
      if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
        let linkEle = document.getElementById('icoLink') as any;
        linkEle.href = icon;
        linkEle.type = 'image/x-icon';
      }
      // 存储当前品牌商城ID
      // localStorage.setItem(cache.STORE_ID, storeId);
      Taro.setStorageSync(cache.STORE_ID, storeId);
    });

    //初始化微信分享
    let url = '';
    if (window && window.location) {
      url = window.location.href;
      const type = __TARO_ENV == 'h5' ? 'H5' : 'MINI';
      const res = await api.weChatPublicPlatformController.getSign({url: encodeURI(url), terminalType: type});
      if (type == 'H5') {
        this?.initConfig?.(res.appId, res.timestamp, res.nonceStr, res.signature);
      }
    }
    // 导航栏更改，此处调用是为了解决直接在新窗口打开url(或者直接打开分享链接)时导航栏不改变的问题
    // WMkit.changeTabBarText();
    const {openId} = Taro.getStorageSync(cache.AUTH_INFO);

    //此处判断是否是点击微信登录，授权后重定向到此处
    //H5授权登录不需要判断opendId是否被缓存，直接使用code调接口即可
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
      const searchObj = _.searchToObj(window.location.search);
      if (searchObj && searchObj.state && searchObj.state.indexOf('login') > -1) {
        console.log('***********H5登录***********');
        //h5授权登录，直接调接口
        try {
          const res = await api.wechatLoginController.weChatQuickLogin({code: searchObj.code, channel: 'MOBILE'});
          const {loginFlag, login, info} = res;
          // loginFlag 为true时表示走登录流程，false时跳转到绑定手机号页面
          if (loginFlag) {
            await WMkit.switchLogin(login, Taro.getCurrentPages());
            return false;
          } else {
            let infoStr = JSON.stringify(info);
            await Taro.navigateTo({
              url: `/pages/package-A/login/wecat-bind-tel/index?id=${info.id}`,
            });
          }
        } catch (error) {
          Taro.showToast({
            title: error,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    }

    // 在微信浏览器内，且openId没有被缓存，则重定向静默授权获取用户基本信息，并缓存openId,昵称，头像
    if (!openId && Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
      const searchObj = _.searchToObj(window.location.search);
      console.log('openId不存在::::', searchObj);
      // 满足这个条件，代表是重定向之后的地址，可以获取openId
      if (searchObj && searchObj.state && searchObj.state.indexOf('b2bOpenId') > -1) {
        if (searchObj.code) {
          try {
            // 获取openId
            const openId = await api.payController.getOpenIdByChannel(searchObj.code, 'WECHAT');
            // 存储openId
            await Taro.setStorageSync(cache.AUTH_INFO, {
              openId: openId,
            });
          } catch (e) {
            console.log('获取微信授权失败');
          }
        }
      } else if (searchObj && searchObj.state && searchObj.state.indexOf('linked-account') > -1) {
        console.log('重定向后返回至账户绑定页');
      } else {
        const href = location.href;
        // 获取openId,用户无感知
        await wxAuth.wechatGetOpenId({redirectURL: href});
      }
    }

    // openId存在且非静默授权，防止跟上面的逻辑重复
    if (openId && Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
      const searchObj = _.searchToObj(window.location.search);
      console.log('openId存在::::', searchObj);
      // 满足这个条件，代表是重定向之后的地址,提现或者登录以后
      if (searchObj && searchObj.state && searchObj.state.indexOf('b2bOpenId') == -1) {
        // 提现授权，获取用户信息
        if (searchObj.state.indexOf('deposit') > -1) {
          const context = await api.wechatLoginController.getDepositUerInfo({code: searchObj.code, channel: 'MOBILE'});
          await Taro.setStorageSync(cache.AUTH_INFO, {
            openId: openId,
            nickName: context.name,
            headimgurl: context.headImgUrl,
          });
          // 为解决从微信授权页回调后，按返回键白屏问题
          // 再次进入提现，为了退出提现页面时正常触发componentWillUnmount
          console.log('*********进入提现************');
          await Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
        }
      }
    }

    // 设置tabbar边框样式
    Taro.setTabBarStyle({
      borderStyle: 'white',
    });

    //用户是否需要登录才能访问
    let needLogin = await api.loginBaseController.isVisitWithLogin();
    setGlobalData('needLogin', needLogin && needLogin.audit);
    if (WMkit.needLogin()) {
      const href = location.href;
      const program = getHashParam<{id: string}>(href);
      // 强制用户登录，并且微信授权登录后回到这个wecat-bind-tel页面时return
      if (href.includes('/pages/package-A/login/wecat-bind-tel/index') && program.id) return;
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return false;
    }
    this.patchTabBar();
  }

  async componentDidShow() {
    WMkit.changeTabBarText();
    //分享 H5参数在router中,小程序在router.params中
    let params = __TARO_ENV == 'h5' ? (getCurrentInstance().router as any) : getCurrentInstance().router.params;
    if (params?.shareUserId || params?.inviteeId) {
      let customerId = params.shareUserId ? params.shareUserId : params.inviteeId;
      Taro.setStorageSync(cache.SHARE_USER_ID, customerId);
      Taro.setStorageSync(cache.INVITEE_ID, customerId);
      console.log('分享:', JSON.stringify({customerId: customerId, shareId: params.shareId}));
      //自己的分享自己点不获取积分
      const login = Taro.getStorageSync(cache.LOGIN_DATA);
      if (!(login && login.customerId == customerId)) {
        api.customerPointsController.share({
          customerId: customerId,
          shareId: params.shareId,
          token: window.token || '',
        });
      }
    }
    //冷启动热启动更新
    if (__TARO_ENV != 'h5') {
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        console.log('版本信息', res);
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            Taro.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            });
          });
        }
      });
    }

    Taro.setTabBarStyle({
      borderStyle: 'white',
    });
    this.patchTabBar();
  }

  componentDidHide() { }
  componentWillMount(){
    // 企业投放 缓存企业id 后续登录注册使用
    if(__TARO_ENV==='h5'){
      const enterpriseId = _.searchToObj(window.location.search)?.channel;
      enterpriseId&&sessionStorage.setItem(cache.CHANNEL_ENTERPRISE_ID,enterpriseId);
    }
  }
  patchTabBar = () => {
    if (!Taro.setTabBarItem) return;
    // const isLiveOpen = await api.liveRoomController.isLiveOpen();
    const isOpenLive = Taro.getStorageSync(cache.IS_OPEN_LIVE);
    const isOpen = Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR);
    const rdflag = WMkit.isLogin() && Taro.getStorageSync(cache.IS_DISTRIBUTOR) == '1';
    //console.log(flag,reflag,rdflag,"ffflag")
    //分销功能开启
    if (isOpen) {
      //直播功能开启
      if (isOpenLive) {
        // 发现
        WMkit.setTabBarItem(1, '发现', materialPng, materialCurrPng);
        // WMkit.setTabBarItem({
        //   index: 1,
        //   text: '发现',
        //   iconPath: materialPng, //require('@/assets/image/tab/material.png').default,
        //   selectedIconPath: materialCurrPng//require('@/assets/image/tab/material-red.png').default,
        // });
        //直播功能未开启
      } else {
        // 分类
        WMkit.setTabBarItem(1, '分类', goodPng, goodCurrPng);
        // Taro.setTabBarItem({
        //   index: 1,
        //   text: '分类',
        //   iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
        //   selectedIconPath: goodCurrPng, //require('@/assets/image/common/goods-curr.png').default,
        // });
      }

      //分销员登陆
      if (rdflag) {
        //显示分销中心
        WMkit.setTabBarItem(2, '分销中心', distributionPng, distributionCurrPng);
        // Taro.setTabBarItem({
        //   index: 2,
        //   text: '分销中心',
        //   iconPath: distributionPng,//require('@/assets/image/tab/distribution.png').default,
        //   selectedIconPath: distributionCurrPng//require('@/assets/image/tab/distribution-curr.png').default,
        // });
      } else {
        console.log('*********进入奖励中心************');
        //显示奖励中心
        WMkit.setTabBarItem(2, '奖励中心', rewardPng, rewardCurrPng);
        // Taro.setTabBarItem({
        //   index: 2,
        //   text: '奖励中心',
        //   iconPath: rewardPng,//require('@/assets/image/tab/reward.png').default,
        //   selectedIconPath: rewardCurrPng// require('@/assets/image/tab/reward-curr.png').default,
        // });
      }

      //分销功能未开启
    } else {
      // 分类
      WMkit.setTabBarItem(1, '分类', goodPng, goodCurrPng);
      // Taro.setTabBarItem({
      //   index: 1,
      //   text: '分类',
      //   iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
      //   selectedIconPath: goodCurrPng, //require('@/assets/image/common/goods-curr.png').default,
      // });
      //直播功能开启
      if (isOpenLive) {
        // 发现
        // WMkit.setTabBarItem(2,'发现',materialPng,materialCurrPng)
        // Taro.setTabBarItem({
        //   index: 2,
        //   text: '发现',
        //   iconPath: materialPng, //require('@/assets/image/tab/material.png').default,
        //   selectedIconPath: materialCurrPng//require('@/assets/image/tab/material-red.png').default,
        // });
      } else {
        //直播功能未开启
        //商品
        // WMkit.setTabBarItem(2,'商品',goodItemPng,goodItemCurrPng)
        // Taro.setTabBarItem({
        //   index: 2,
        //   text: '商品',
        //   iconPath: goodItemPng, //require('@/assets/image/tab/goods-item.png').default,
        //   selectedIconPath: goodItemCurrPng //require('@/assets/image/tab/goods-item-curr.png').default,
        // });
      }
    }
    // if (flag && reflag) {
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '发现',
    //     iconPath: materialPng, //require('@/assets/image/tab/material.png').default,
    //     selectedIconPath: materialCurrPng//require('@/assets/image/tab/material-red.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 2,
    //     text: '分销中心',
    //     iconPath: distributionPng,//require('@/assets/image/tab/distribution.png').default,
    //     selectedIconPath: distributionCurrPng//require('@/assets/image/tab/distribution-curr.png').default,
    //   });
    // } else if (flag && !reflag) {
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '分类',
    //     iconPath: goodPng,// require('@/assets/image/common/goods.png').default,
    //     selectedIconPath: goodCurrPng//require('@/assets/image/common/goods-curr.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 2,
    //     text: '发现',
    //     iconPath: materialPng,//require('@/assets/image/tab/material.png').default,
    //     selectedIconPath: materialCurrPng// require('@/assets/image/tab/material-red.png').default,
    //   });
    // } else if ((reflag && (!WMkit.isLogin() || !rdflag))) {

    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '发现',
    //     iconPath: materialPng,//require('@/assets/image/tab/material.png').default,
    //     selectedIconPath: materialCurrPng//require('@/assets/image/tab/material-red.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 2,
    //     text: '奖励中心',
    //     iconPath: rewardPng,//require('@/assets/image/tab/reward.png').default,
    //     selectedIconPath: rewardCurrPng// require('@/assets/image/tab/reward-curr.png').default,
    //   });
    // } else if (flag && !reflag) {
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '分类',
    //     iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
    //     selectedIconPath: goodCurrPng// require('@/assets/image/common/goods-curr.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '发现',
    //     iconPath: materialPng,//require('@/assets/image/tab/material.png').default,
    //     selectedIconPath: materialCurrPng//require('@/assets/image/tab/material-red.png').default,
    //   });
    // } else if ((reflag && rdflag) || (!flag && reflag && rdflag)) {
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '分类',
    //     iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
    //     selectedIconPath: goodCurrPng//require('@/assets/image/common/goods-curr.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 2,
    //     text: '分销中心',
    //     iconPath: distributionPng,//require('@/assets/image/tab/distribution.png').default,
    //     selectedIconPath: distributionCurrPng//require('@/assets/image/tab/distribution-curr.png').default,
    //   });
    // } else if ((reflag && !flag && (!WMkit.isLogin() || !rdflag))) {
    //   Taro.setTabBarItem?.({
    //     index: 1,
    //     text: '分类',
    //     iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
    //     selectedIconPath: goodCurrPng// require('@/assets/image/common/goods-curr.png').default,
    //   });
    //   Taro.setTabBarItem?.({
    //     index: 2,
    //     text: '奖励中心',
    //     iconPath: rewardPng,//require('@/assets/image/tab/reward.png').default,
    //     selectedIconPath: rewardCurrPng// require('@/assets/image/tab/reward-curr.png').default,
    //   });
    // } else if (!flag && !reflag) {
    //   Taro.setTabBarItem({
    //     index: 1,
    //     text: '分类',
    //     iconPath: goodPng,//require('@/assets/image/common/goods.png').default,
    //     selectedIconPath: goodCurrPng, //require('@/assets/image/common/goods-curr.png').default,
    //   });
    //   Taro.setTabBarItem({
    //     index: 2,
    //     text: '商品',
    //     iconPath: goodItemPng, //require('@/assets/image/tab/goods-item.png').default,
    //     selectedIconPath: goodItemCurrPng //require('@/assets/image/tab/goods-item-curr.png').default,
    //   });
    // }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
/**
 * 0-电影 1-本地生活 2-演出
 * @param xuanKuaType
 */
let handleMovieTicket = async (xuanKuaType: XuanKuaType, location?: {longitude: number; latitude: number}) => {
  try {
    // debugger
    Taro.showLoading();
    const {url} = await api.customerBaseController.getXuanKuaUrl(xuanKuaType, location);
    Taro.hideLoading();
    console.log(url, 'url');
    window.location.href = url;
  } catch (error) {
    console.log(error);
    Taro.showToast({
      title: '获取免登url失败',
      icon: 'none',
    });
  }
};
const getLocation = () => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', () => {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        GeoLocationFirst: true,
      });
      geolocation.getCurrentPosition(async (status: any, result: any) => {
        if (status == 'complete') {
          resolve({latitude: result.position.lat, longitude: result.position.lng});
        } else {
          reject(result);
        }
      });
    });
  });
};
let bindH5EventListener = () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'navigate') {
        const url = e.data.url as string;
        console.log('navigate', url);
        const xuanKuaType = getXuanKuaType(url);
        if (xuanKuaType) {
          // 只有 h5 才需要获取定位
          if (xuanKuaType === XuanKuaType.DD_VEGETABLE && !_.isWeixin()) {
            Taro.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
              success: (res) => {
                if (res.confirm) {
                  Taro.showLoading();
                  getLocation()
                    .then((location: any) => {
                      Taro.hideLoading();
                      handleMovieTicket(xuanKuaType, location);
                    })
                    .catch((err) => {
                      Taro.showToast({
                        title: '获取定位失败',
                        icon: 'none',
                      });
                    });
                }
              },
            });
          } else {
            handleMovieTicket(xuanKuaType);
          }
        } else {
          Taro.navigateTo({url});
        }
      }
      if (e.data.type === 'pageTitle') {
        document.title = e.data.title;
        msg.emit('webviewLoaded');
      }
      if (e.data.type === 'pageLoaded') {
        let mainPageIframe = document.getElementById('mainPageIframe');
        if (mainPageIframe) {
          mainPageIframe.parentNode.removeChild(mainPageIframe);
        }
      }
      //未登录加购
      if (e.data.type === 'noLoginCartData') {
        if (e.data.content) {
          //获取缓存到本地的购物车数据
          let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
          //判断之前当前购买过的商品在购物车中有没有存在，如果存在购买的数量相加 如果不存在 重新增加一条数据
          let index = purchaseData.findIndex((item) => item.goodsInfoId == e.data.content.goodsInfoId);
          if (index > -1) {
            purchaseData[index].goodsNum = purchaseData[index].goodsNum + 1;
          } else {
            purchaseData.push({goodsInfoId: e.data.content.goodsInfoId, goodsNum: 1});
          }
          //存到本地缓存
          Taro.setStorage({
            key: 'mini::shopCartSku',
            data: purchaseData,
          });
        }
      }
    });
  }
  bindH5EventListener = () => {};
};
export default App;
