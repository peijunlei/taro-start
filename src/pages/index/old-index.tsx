import Taro, {getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';
import {View, WebView} from '@tarojs/components';
import config from '@/service/config';
import {_, WMkit, wxShare, msg, pvUvStatics} from 'wmkit';
import {cache} from 'config';
import api from 'api';
const getCurrentInstance = Taro.getCurrentInstance;

let isComponentWillMount = false;

export default class Index extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      // 企业id
      enterpriseId: '',
      storeId: '',
      update: false,
      isLoading: false,
    };
  }

  async componentWillMount() {
    isComponentWillMount = true;
    Taro.setNavigationBarTitle({title: '首页'});
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await _.addressInit();
    await this.initIndex();
    isComponentWillMount = false;
    // await setShopCartNum(false);
    //分销渠道为店铺内，且含有分销员ID，且当前登录人不是小B身份，首页为店铺精选页
    // if (WMkit.channelType() == '2' && WMkit.inviteeId() != '' && !WMkit.isDistributor()) {
    //   const status = await api.distributionController.checkStatus();
    //   if (status) {
    //     Taro.redirectTo({
    //       url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
    //     });
    //   } else {
    //     //当店铺失效清除本地的邀请人缓存信息
    //     Taro.removeStorageSync(cache.INVITEE_ID);
    //     Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
    //   }
    // }
  }
  async onShareAppMessage(res) {
    if (WMkit.isLogin()) {
      api.storeShareRecordController.add({
        storeId: -1,
        companyInfoId: -1,
        indexType: 0,
      });
    }
    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const params = getCurrentInstance().router.params;
    const newUrl = await wxShare.changeUrl(res.from, url, params);
    //const newUrl = await wxShare.changeUrl(res.from);
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));

    return {
      // 什么也不写
      title: wechatShareInfo?.title,
      imageUrl: wechatShareInfo?.imgUrl[0].url,
      path: newUrl,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }

  catchMove;
  // 注释掉，H5端频繁前进后退时，这块会导致页面卡死
  onTouchMove = (e) => {
    // e.preventDefault();
  };

  async componentDidShow() {
    if (isComponentWillMount) return;
    await this.initIndex();
  }

  count = 0;
  onTabItemTap = (e) => {
    this.count++;
    // 单击不刷新，阻止冒泡
    if (__TARO_ENV === 'h5' && this.count == 1) {
      e.stopPropagation();
      return;
    }
    setTimeout(() => {
      if (this.count >= 2) {
        this.setState(
          {
            update: !this.state.update,
          },
          () => {
            this.count = 0;
          },
        );
        // this.forceUpdate();
      }
    }, 300);
  };

  initIndex = async () => {
    let storeId;
    let token;
    await api.systemController.findBaseConfig().then((res) => {
      const {pcIco} = res;
      const icon = pcIco ? JSON.parse(pcIco)[0].url : '';
      if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
        let linkEle = document.getElementById('icoLink') as any;
        linkEle.href = icon;
        linkEle.type = 'image/x-icon';
      }
      // 存储当前品牌商城ID
      // localStorage.setItem(cache.STORE_ID, storeId);
      Taro.setStorageSync(cache.STORE_ID, res.storeId);
      storeId = res.storeId;
    });
    this.setState({
      isLoading: true,
    });
    //埋点
    pvUvStatics.myPvUvStatis({});

    // count置为0，防止单击tabbar的时候又去刷新。比如单击了一次，count变成1，不触发任何事件，进入其他页面再返回，页面不会重新载入，count的值仍在。
    this.count = 0;
    if (WMkit.needLogin()) {
      WMkit.changeTabBarText();
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    Taro.removeStorageSync(cache.SINGER_CARD_LOGIN);
    //返回自己店铺 刷新页面
    if (Taro.getStorageSync(cache.MAIN_RELOAD)) {
      Taro.removeStorageSync(cache.MAIN_RELOAD);
      this.forceUpdate();
    }
    let url = '';
    if (window && window.location) {
      url = window.location.pathname;
      if (url == '/') {
        //从域名直接进入全站商城，默认清空邀请人id和分销渠道
        Taro.removeStorageSync(cache.INVITEE_ID);
        Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
      }
    }

    //避免h5一直刷新
    //取缓存中的是否开启分销
    //查询分销是否开启，并存入缓存
    //如果状态不同，更新tabbar
    const preIsOpen = Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR);
    const isOpen = await WMkit.isOpenDistributor();
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    // 当前登录的账号所属的企业id
    const enterpriseId = loginData.lastLoginEnterpriseId === '-1' ? '' : loginData.lastLoginEnterpriseId;
    //对比分销员资格
    let isChangedistributorFlag = false;
    if (WMkit.isLogin()) {
      const preDistributorFlag = Taro.getStorageSync(cache.DISTRIBUTOR_FLAG);
      await WMkit.setIsDistributorFlag();
      const distributorFlag = Taro.getStorageSync(cache.DISTRIBUTOR_FLAG);
      isChangedistributorFlag = preDistributorFlag != distributorFlag;
    }

    // 是否开启直播
    const preIsOpenLive = Taro.getStorageSync(cache.IS_OPEN_LIVE);
    const isOpenLive = await WMkit.isLiveOpen();
    // 获取上次tabbar是否家在成功
    const needReload = Taro.getStorageSync(cache.NEED_TABBAR_RELOAD);

    if (preIsOpen != isOpen || isChangedistributorFlag || needReload || preIsOpenLive != isOpenLive) {
      WMkit.changeTabBarText();
    }
    // 获取魔方那里的分享配置，调用的全量数据接口，后面会重开个接口
    this.fetchConfigOrder();
    // 不能隐藏此代码,隐藏会导致首页无法刷新,不知道为什么
    if (__TARO_ENV === 'h5') {
      token = Taro.getStorageSync('authInfo:token');
      document.body.addEventListener('touchmove', this.onTouchMove, {passive: false});
      setTimeout(() => {
        // 执行magic-box中的init()方法
        const iframes: any = document.getElementsByTagName('iframe');
        // H5端向壳子里面发送消息，传递token
        if (iframes && iframes[0] && iframes[0].contentWindow) {
          iframes[0].contentWindow.postMessage({token: encodeURIComponent(token)}, '*');
        }
        let tarBar = document.querySelectorAll('.weui-tabbar__item')[0];
        // 升级造成的问题吧，原来的那种方式无法注册监听事件，需要传入event
        tarBar.addEventListener('click', (e) => this.onTabItemTap(e));
      }, 300);
    }
    if (__TARO_ENV === 'weapp') {
      // 小程序走这边，小程序向外链的H5传值，只能更改web-view src,刷新整个页面
      token = Taro.getStorageSync('authInfo:token');
    }
    this.setState({
      token: token,
      storeId: storeId,
      enterpriseId: enterpriseId || '',
    });
  };

  // //阻止返回刷新
  shouldComponentUpdate(nextProps, nextState) {
    // 从分类页返回首页会造成首页空白
    // let routes = getCurrentPages();
    // if (
    //   this.count == 0 &&
    //   routes[routes.length - 1].route !== 'pages/package-B/x-site/page-link/index' &&
    //   this.state.token == nextState.token &&
    //   this.state.isLoading == nextState.isLoading &&
    //   this.state.enterpriseId == nextState.enterpriseId
    // ) {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }

  async componentDidHide() {
    if (__TARO_ENV === 'h5') {
      let tarBar = document.querySelectorAll('.weui-tabbar__item')[0];
      this.count = 0;
      tarBar.removeEventListener('click', this.onTabItemTap);
      document.body.removeEventListener('touchmove', this.onTouchMove);
    }
  }

  render() {
    const {isLoading, update, storeId, token, enterpriseId} = this.state;
    // storeType=mall,表示品牌商首页，不展示头部和尾部区域
    let url =
      storeId != undefined && storeId != '-1'
        ? `${WMkit.prefixUrl(
            config.magicHost,
          )}/mini/index/${storeId}?token=${token}&inviteeId=${WMkit.inviteeId()}&update=${update}&storeType=mall&isH5=${__TARO_ENV}&enterpriseId=${enterpriseId}`
        : `${WMkit.prefixUrl(
            config.magicHost,
          )}/mini/index?token=${token}&inviteeId=${WMkit.inviteeId()}&update=${update}isH5=${__TARO_ENV}&enterpriseId=${enterpriseId}`;
    if (isLoading) {
      return (
        <View style={{height: 'calc(100vh - 50px)'}}>
          <WebView
            id="mainIndexWebview"
            src={url}
            onLoad={(e) => {
              msg.emit('webviewLoaded');
            }}
          />
          {/* {__TARO_ENV == 'h5' && <SkeletonScreen />} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  //获取魔方数据，主要获取分享相关的配置信息
  fetchConfigOrder = () => {
    // 获取storeId的统一写法
    let url = `${WMkit.prefixUrl(config.renderHost)}/magic/d2cStore/000000/weixin/index`;
    // let storeId = localStorage.getItem(cache.STORE_ID)
    let storeId = Taro.getStorageSync(cache.STORE_ID);
    if (storeId != undefined && storeId != '-1') {
      url = `${url}?storeId=${storeId}`;
    }
    console.log(`魔方url: ${url}`);
    Taro.request({
      method: 'GET',
      // mode: 'no-cors',
      url: url,
      success: (res) => {
        if (_.isWeixin()) {
          // 获取分享配置,如果存在的话
          const shareInfo = res.data.data.shareInfo;
          if (!!shareInfo && Object.keys(shareInfo).length > 0) {
            let {title, desc, imgSrc} = shareInfo;
            // 根据配置自定义分享内容
            wxShare.initShare(title, desc, imgSrc ? imgSrc : '', 0);
          }
        }
      },
    });
  };
}

