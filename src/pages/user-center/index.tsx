import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import {connect} from 'react-redux';
import {cache} from 'config';
import UserCenter from '@/pages/common/user-center';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {fetchModal, msg, setModalShow, WMkit, handleUrl, pvUvStatics} from 'wmkit';


//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class TaroUserCenter extends React.Component<Partial<T.IProps>, any> {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalFlag: false,
      imgUrl: '',
      jumpPage: {},
      nextPopupId: '',
      res: {},
    };
  }

  async componentWillMount() {
    Taro.removeStorageSync(cache.SINGER_CARD_LOGIN);
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
        backgroundColorBottom: '#FF6600', // 底部窗口的背景色为主题色
      });
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({title: '我的'});
  }

  async componentDidShow() {
    msg.emit('my-C');
    //埋点
    pvUvStatics.myPvUvStatis({});

    if (WMkit.needLogin()) {
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    const res = await fetchModal('personalCenter');
    this.setState({
      res: res,
    });
    await this.updateModalStatus('', res);
    this.props.actions.init();

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
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  async updateModalStatus(id, res) {
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = (await setModalShow(res, 'personalCenter', popupId)) || {};
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage: (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId, res);
        }
      },
    );
  }

  async isGo(id, res) {
    await this.updateModalStatus(id, res);
  }

  handleClose(res) {
    this.setState({isModalFlag: false}, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId, res);
      }
    });
  }

  render() {
    const {main} = this.props;
    return (
      main && (
        <View>
          <UserCenter isFromC={false} isLogin={WMkit.isLogin()} />
          <AdvModal
            imgUrl={this.state.imgUrl}
            handleUrl={() => handleUrl(this.state.jumpPage)}
            handleClose={() => this.handleClose(this.state.res)}
            isModalFlag={this.state.isModalFlag}
          />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
