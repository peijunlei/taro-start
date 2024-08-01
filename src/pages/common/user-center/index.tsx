import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import CenterOrder from './components/center-order';
import MyAssets from './components/my-assets';
import CommonTools from './components/common-tools';
import { fetchModal, msg, setModalShow, WMkit } from 'wmkit';
import MenberCenterInner from './components/member-center';
import MyCount from './components/my-count';
import { cache } from 'config';
import lodash from 'lodash';

// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';

//@ts-ignore
actions().actions.loadReducer();
// 只绑定一次msg.on
let bindMsg = (self) => {
  msg.on({
    'my-C': async () => {
      await self.props.actions.init();
    },
  });
  bindMsg = () => { };
};

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerUserCenter extends React.Component<Partial<T.IProps>, any> {
  static defaultProps = {
    isReady: false,
    customer: {},
    goodsFollow: 0, //收藏商品
    storeFollow: 0, //关注店铺
    growthValueIsOpen: false, //是否打开成长值
    pointsIsOpen: false, //积分是否打开
    evaluateIsOpen: false, //评价是否打开
    accountBalanceTotal: 0, //总余额
    unUseCount: 0, //未使用总张数
    signFlag: false, //今日是否签到标志
    isLogin: false, // 是否已登录状态
    messNum: 0,
    giftCardNum: 0,
  };
  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
    pageIndex: 0,
    currentPageDataIsComplete: false,
    isHideModule: true,
  };

  constructor(props) {
    super(props);
    bindMsg(this);
  }

  async componentWillMount() {
    await Taro.setNavigationBarTitle({ title: '我的' });
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await this.props.actions.loadReducer();
    //@ts-ignore
    __TARO_ENV === 'weapp' &&
      Taro.setBackgroundColor({
        backgroundColor: '#FF6600', // 窗口的背景色为主题色
        backgroundColorTop: '#FF6600', // 顶部窗口的背景色为主题色
        backgroundColorBottom: '#f5f5f5', // 底部窗口的背景色为主题色
      });
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

  componentDidMount() {
    Taro.setNavigationBarTitle({ title: '我的' });
    this.props.actions.init();
  }

  async componentDidShow() {
    if (WMkit.needLogin()) {
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    this.updateModalStatus('');
    // this.props.actions.init();

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
    if (preIsOpen != isOpen || isChangedistributorFlag) {
      WMkit.changeTabBarText();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLogin !== this.props.isLogin) {
      this.props.actions.init();
      this.setState({
        pageIndex: Math.random() * 0.01,
      });
    }
  }

  componentDidHide() { }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  async updateModalStatus(id) {
    const res = await fetchModal('personalCenter');
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'personalCenter', popupId);
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage: (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      },
    );
  }

  async isGo(id) {
    await this.updateModalStatus(id);
  }

  // onScrollToLower
  _onScrollToLower = lodash.debounce(() => {
    this.setState(({ currentPageDataIsComplete, pageIndex }) => ({
      pageIndex: currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
    }));
  }, 1000);

  render() {
    const { main } = this.props;
    const isShop = WMkit.isShop();
    const { pageIndex, isHideModule } = this.state;
    if (!main) return null;
    return (
      <ScrollView
        scrollY
        scrollWithAnimation
        enableBackToTop
        lowerThreshold={20}
        style={{ height: `calc(100vh - ${__TARO_ENV === 'h5' ? 50 : 0}px)`, backgroundColor: '#f5f5f5', display: 'flex' }}
        onScrollToLower={this._onScrollToLower}
      >
        <View
          className="packageACustomerUserCenter"
          onTouchEnd={() => {
            if (isHideModule) return;
            this._onScrollToLower();
          }}
        >
          <MenberCenterInner />
          {/* 品牌商城不显示 */}
          {!WMkit.isMall() && <MyCount />}
          {/* 我的订单 */}
          <CenterOrder />
          <View className="userc-container">
            {/* 我的资产 */}
            <MyAssets />
            {/* 常用功能 */}
            {!WMkit.isShop() && <CommonTools />}
          </View>
          {/* 热门商品推荐 */}
          <RecommendGoodsList
            pageIndex={pageIndex}
            type="3"
            recommendListCOMStyle={{ paddingTop: '6px' }}
            getCurrentPageDataIsComplete={(bol) => this.setState({ currentPageDataIsComplete: bol })}
            setPageIndex={(index) => this.setState({ pageIndex: index })}
            setHideModule={(bol) => this.setState({ isHideModule: bol })}
          />
          {/* 公司信息 */}
          <View className="componey-info">
            <Text className="componey-info-text">© 2023~2024 上海汉兆云软件有限公司</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
