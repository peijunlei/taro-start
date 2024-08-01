import Taro, {getCurrentInstance, getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {cache} from 'config';
import actions from './actions';
import {store2Props} from './selectors';
import * as T from './types';
import * as reduxStore from '@/redux/store';
import {WMkit, msg, pvUvStatics} from 'wmkit';
import DistributionCenter from './inner-pages/distribution';
import RewardCenter from './inner-pages/reward';
import Live from '@/pages/live';
import GoodsList from '@/pages/common/goods-list';
import {View} from '@tarojs/components';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoadPage extends Component<any, any> {
  constructor(props) {
    super(props);
    let token = Taro.getStorageSync('authInfo:token');
    this.state = {
      init: true,
      // 扩展一个状态值，登录身份发生变化的时候强制组件更新
      token: token,
    };
    // 注册刷新事件
    msg.on({
      'refresh-reward': async () => {
        await props.actions.init();
        if (WMkit.isDistributorFlag()) {
          await props.actions.initDistribute();
        } else {
          await props.actions.init();
        }
      },
    });
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    if (Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR)) {
      if (WMkit.isDistributorFlag()) {
        this.props.actions.initDistribute();
      } else {
        this.props.actions.init();
      }
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

  componentWillUnmount() {
    __TARO_ENV === 'h5' && this.props.actions.clean();
  }

  async componentDidShow() {
    msg.emit('refreshGoodsList')
    //埋点
    pvUvStatics.myPvUvStatis({});

    let {main} = this.props;
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
    let token = Taro.getStorageSync('authInfo:token');
    //强制子组件重新渲染
    this.setState(
      {
        token: token,
      },
      async () => {
        const current = getCurrentInstance();
        const url = __TARO_ENV === 'h5' ? current?.page?.path : current?.router?.path;
        if (url && url.indexOf('/pages/load-page/index') > -1) {
          //更新页面标题
          let title;
          Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR)
            ? WMkit.isDistributorFlag()
              ? (title = '分销中心')
              : (title = '奖励中心')
            : isOpenLive
            ? (title = '发现')
            : (title = '商品列表');
          await Taro.setNavigationBarTitle({
            title: title,
          });

          // isRefresh为true时，才执行init,分享赚大图全屏以后，isRefresh设为false,此时进入该周期不执行init
          if (main?.isrefresh) {
            if (WMkit.isDistributorFlag() && Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR)) {
              this.props.actions.initDistribute();
            } else {
              this.props.actions.init();
            }
          }
        }
      },
    );
  }

  componentDidHide() {
    let {
      actions: {action},
      main,
    } = this.props;
    // 弹窗不显示的时候，才去执行
    if (!(main && main.shareModalVisible)) {
      action.commonChange('main.isrefresh', true);
    }
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR) ? (
      <View>
        {WMkit.isDistributorFlag() ? <DistributionCenter /> : <RewardCenter />}
        {main?.isLoadingFlag && <WMLoading />}
      </View>
    ) : (
      <View>{Taro.getStorageSync(cache.IS_OPEN_LIVE) ? <Live /> : <GoodsList hasTabbar={true} />}</View>
    );
  }
}
