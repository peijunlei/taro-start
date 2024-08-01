import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//sku列表
import SkuList from './components/sku-list';
//功能导航
import NavTools from './components/nav-tools';
//综合筛选框
import CompositePicker from './components/composite-picker';
//分类筛选框
import ClassifyPicker from './components/classify-picker';
//查看赠品弹窗
import FindGiftsModal from './components/mask';
//品牌筛选框
import BrandPicker from './components/brand-picker';
//满减折组件
import Activity from './components/activity';
//打包一口价组件
import Discount from './components/discount';
//满减组件
import Gifts from './components/gifts';
//去购物车
import Bottom from './components/bottom';
//无数据
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/goods/goods-list/empty.png';
import SkeletonSmall from '@/pages/common/skeleton';
import WMLoading from '@/pages/common/loading';
import {pvUvStatics} from 'wmkit';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginGoodsList extends Component<Partial<T.IProps>, any> {
  static defaultProps = {
    main: {
      navToolsObj: {
        //综合箭头切换
        arrowFlag: false,
        //价格升序降序
        priceSoft: false,
        //composiName
        composiName: '综合',
        //composiId
        composiId: 0,
        //分类箭头切换
        catesFlag: false,
        //品牌箭头切换
        brandFlag: false,
      },
      //0:小图,1:大图
      imageShowType: null,
      //marketingId
      marketingId: null,
      // 商品选择的营销
      goodsMarketing: {},
      //标题
      title: '',
      // 营销信息
      marketing: {},
    },
  };

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
  componentDidMount() {
    let {marketingId} = getCurrentInstance().router.params;
    if (marketingId == undefined) {
      marketingId = '';
    }
    this.props.actions.goodsAction.commonChange('main.marketingId', marketingId);
  }

  componentDidShow() {
    let marketingId = '';
    // h5 componentDidShow中 getCurrentInstance()取不到参数
    if (__TARO_ENV == 'h5') {
      marketingId = window.location.search.split('=')[1];
    } else {
      marketingId = getCurrentInstance().router.params.marketingId;
    }
    this.props.actions.init(marketingId || '');
    pvUvStatics.myPvUvStatis({});
  }

  componentWillUnmount() {
    __TARO_ENV === 'h5' && this.props.actions.clean();
  }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToLower(e) {
    this.props && this.props.actions.goodsAction.nextPage();
  }

  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;

    let navText =
      main?.type == 0
        ? '满减活动'
        : main?.type == 1
        ? '满折活动'
        : main?.type == 2
        ? '满赠活动'
        : main?.type == 3
        ? '打包一口价'
        : '多买多惠';
    Taro.setNavigationBarTitle({title: navText});
    const scrollTop = 0;
    const Threshold = 20;
    let isH5 = __TARO_ENV === 'h5';
    return (
      main && (
        <View className="promotionGoodsList">
          {main.loadSkeleton && <WMLoading />}
          {/* 搜索 */}
          {/* 满减折 赠:2*/}
          {main.type === 2 ? <Gifts /> : main.type == 3 ? <Discount /> : main.type == 4 ? <Discount /> : <Activity />}
          {/* 功能导航 */}
          <NavTools />
          <ScrollView
            className="scroll-view"
            scrollY
            scrollWithAnimation
            scrollTop={isH5 ? null : main.goods.length == 0 ? 0.01 : scrollTop}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToLower={(e) => this._onScrollToLower(e)}
            onTouchMove={() => {
              if (main.giftShow) {
                return;
              }
            }}
          >
            {main.loadSkeleton && <SkeletonSmall />}
            <SkuList />
            {main.goods.length == 0 && !main.loadSkeleton && <Blank content="商家还未上架商品哦" img={noneImg} />}
            {main.goods.length != 0 && main.goods.length == main.total && <View className="status">没有更多了</View>}
          </ScrollView>
          {/* 综合筛选框 */}
          {main.navToolsObj.arrowFlag && <CompositePicker />}
          {/* 分类筛选框 */}
          {main.navToolsObj.catesFlag && <ClassifyPicker />}
          {/* 品牌筛选框 */}
          {main.navToolsObj.brandFlag && <BrandPicker />}

          {/* 查看赠品 */}
          {main.giftShow && <FindGiftsModal />}
          {/* 去购物车 */}
          <Bottom />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
