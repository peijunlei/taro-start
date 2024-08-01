import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { cache } from 'config';
import * as T from './types';
import { WMkit, msg, pvUvStatics, _ } from 'wmkit';
import Live from '@/pages/live';
import { GoodsAllList } from '../common/all-list2';
import { WebView, View } from '@tarojs/components';
import config from '@/service/config';
import { Provider } from 'react-redux';

import store from '@/redux/store';
import ChannelGoodsList from '@/pages/common/channel-goods-list';
const defaultVal: any = {
  pageType: 'classify',
  pageCode: '1700463280563'
};
//@ts-ignore
export default class ClassifyCircleLoadPage extends Component<Partial<T.IProps>, {
  init: boolean;
  show: boolean;
  laoded: boolean;
  cateInfo: {
    pageType: 'classify' | 'channel';
    pageCode: string;
  };
}> {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      show: false,
      laoded: false,
      cateInfo: defaultVal,
    };
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }

  //为了使每次显示的时候都能刷新
  async componentDidShow() {
    _.getEnterpriseInfo().then((res) => {
      console.log(res.mofangConfig);
      const { categoryPageSetting, mofangConfig } = res;
      if (categoryPageSetting === 1 && mofangConfig) {
        const data = JSON.parse(mofangConfig);
        this.setState({
          laoded: true,
          cateInfo: {
            pageType: data.info.pageType,
            pageCode: data.info.pageCode
          }
        })
      } else {
        this.setState({
          laoded: true,
          cateInfo: defaultVal
        })
      }
    });
    msg.emit('refreshClassifyList')
    //埋点
    pvUvStatics.myPvUvStatis({});

    if (WMkit.needLogin()) {
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    //避免h5一直刷新
    //取缓存中的是否开启分销
    //查询分销是否开启，并存入缓存
    //如果状态不同，更新tabbar
    const preIsOpen = Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR);
    const isOpen = await WMkit.isOpenDistributor();

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

    if (preIsOpen != isOpen || isChangedistributorFlag || preIsOpenLive != isOpenLive) {
      WMkit.changeTabBarText();
    }
    const current = getCurrentInstance();
    const url = __TARO_ENV === 'h5' ? current?.page?.path : current?.router?.path;
    if (url.indexOf('/pages/classify-circle-load-page/index') > -1) {
      //更新标题
      await Taro.setNavigationBarTitle({
        title:
          Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR) && Taro.getStorageSync(cache.IS_OPEN_LIVE) ? '发现' : '分类',
      });
    }

    //强制子组件重新渲染
    this.setState({
      init: true,
      show: true
    });
    msg.emit('start-circular');
  }

  async componentDidMount() { }

  componentWillUnmount() { }

  componentDidHide() {
    msg.emit('stop-circular');
    this.setState({
      show: false
    })
  }

  render() {
    let token = Taro.getStorageSync('authInfo:token');
    const { show, cateInfo, laoded } = this.state
    // 生日趴专区写死 频道分类页 2
    if (!laoded) return null
    if (cateInfo.pageType === 'channel') {
      return (
        <Provider store={store}>
          {show && <ChannelGoodsList id={cateInfo.pageCode} isTabbar />}
        </Provider>
      )
    } else if (cateInfo.pageType === 'classify') {
      const pageCode = cateInfo.pageCode
      let source = `${WMkit.prefixUrl(config.magicHost)}/mini/${'classify'}/${pageCode}`;
      if (token) {
        source = `${source}?token=${token}`;
      }
      return (
        <View style={{ height: 'calc(100vh - 50px)' }}><WebView src={source} id="mainIndexWebview" /></View>
      )
    }
    return Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR) &&
      Taro.getStorageSync(cache.IS_OPEN_LIVE) &&
      this.state.init ? (
        <Live />
      ) : (
        // <GoodsAllList token={token} />
        <GoodsAllList />
      );
  }
}

//create by moon https://github.com/creasy2010/moon
