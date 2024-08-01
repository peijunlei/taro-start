import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import '@/pages/common/style/swipe.scss';
import {fetchModal, msg, setModalShow, WMkit, pvUvStatics, handleUrl} from 'wmkit';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {cache} from 'config';
import ShopCart from '@/pages/common/shop-cart';
import AdvModal from '@/pages/common/adv-modal/adv-modal';



@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCShopCart extends React.Component<Partial<T.IProps>, any> {
  static defaultProps = {
    main: {
      isReady: false,
      //是否为分销员购物车
      isFromC: false,
      //接口元数据
      purInfo: {},
      //store信息是否加载完
      isStoreInit: false,
      coupon: {
        goodsInfoIds: [],
      },
      goods: {
        chooseMarketingSkuId: '',
        selectedMarketingGifts: [],
        checkselectedMarketingGift: [],
        marketing: [],
        setMessage: [],
        checkStore: [],
        checkSku: [],
        storeMarketing: [],
        goodsMarketing: [],
        giftGoodsInfos: [],
        skuMarketingDict: [],
      },

      useStatus: {
        isMaskOpen: false,
        maskType: 0,
        confirmMask: {
          isOpen: false,
          type: 0,
          message: '',
        },
        isEmpty: false, //购物车是否为空
        isEdit: false, //是否是编辑状态
        isLogin: false, //是否已登录
      },
      messNum: 0,
    },
  };

  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
    res: {},
  };

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  async updateModalStatus(id, res) {
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = (await setModalShow(res, 'shoppingCart', popupId)) || {};
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

  async componentDidShow() {
    Taro.removeStorageSync(cache.ORDER_CONFIRM_PARAMS)
    //埋点
    pvUvStatics.myPvUvStatis({});
    const res = await fetchModal('shoppingCart');
    this.setState({
      res: res,
    });
    await this.updateModalStatus('', res);

    Taro.setNavigationBarTitle({title: '购物车'});
    if (WMkit.needLogin()) {
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    this._shopCartInit();

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
    const isOpenLive = WMkit.isLiveOpen();
    if (preIsOpen != isOpen || isChangedistributorFlag || preIsOpenLive != isOpenLive) {
      WMkit.changeTabBarText();
    }
    msg.emit('refresh-reward-shopCart');
  }

  async componentWillUnmount() {
    Taro.showTabBar();
    await this.props.actions.clean();
  }

  async componentDidHide() {
    msg.emit('refresh-reward-shopCart');
  }

  handleClose(res) {
    this.setState({isModalFlag: false}, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId, res);
      }
    });
  }

  render() {
    return (
      <View>
        {/* isFromC是否为分销员购物车 */}
        <ShopCart
          isFromC={false}
          changeCommonModalProps={{
            chooseStyle: {
              bottom: process.env.TARO_ENV === 'h5' ? '50px' : 0,
            },
          }}
          shopCartMaskStyle={{
            bottom: process.env.TARO_ENV === 'h5' ? '50px' : 0,
          }}
        />
        <AdvModal
          imgUrl={this.state.imgUrl}
          handleUrl={() => handleUrl(this.state.jumpPage)}
          handleClose={() => this.handleClose(this.state.res)}
          isModalFlag={this.state.isModalFlag}
        />
      </View>
    );
  }

  _shopCartCInit = async () => {
    this.props.actions.action.commonChange('main.isFromC', true);
    this.props.actions.init();
  };

  _shopCartInit = () => {
    // 从小店返回商城后，清空购物车、设置isFromC=false
    if (this.props.main.isFromC) {
      this.props.actions.clean();
      this.props.actions.action.commonChange('main.isFromC', false);
    }
    this.props.actions.init();
  };
}

//create by moon https://github.com/creasy2010/moon
