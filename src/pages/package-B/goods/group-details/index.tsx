import {Image, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//价格 标题 副标题 收藏
import GoodsInfo from './components/goods-info/goods-info';
//领券
import GoodsCoupon from './components/goods-coupon';
//规格
import GoodsSpec from './components/goods-spec';
//底部
import Bottom from './components/bottom';
//详情
import GoodsDesc from './components/goods-desc';
//拼团
import Group from './components/group';
//加入拼团
import JoinGroup from './components/join-group';
//拼团玩法
import PlayGroup from './components/play-group';
//优惠
import ReducePrice from './components/reduce-price';
//店铺信息
import StoreInfo from './components/store-info';
//领券弹窗
import CouponModal from './components/coupon-modal';
//促销弹窗
import PromotionModal from './components/promotion-modal';
//等待成团弹窗
import WaitGroupModal from './components/wait-group-modal';
//零售规格弹窗
import GroupChoose from '@/pages/common/goods/group-choose';
import ShareModal from '@/pages/common/share-modal';
//右上角分享按钮
import share from '@/assets/image/goods/goods-detail/share.png';
import GoodsEvaluation from './components/goods-evaluation';
import CombinationGoods from './components/combination-goods';
import WMLoading from '@/pages/common/loading';

// 推荐商品 - 坑位
import RecommendGoodsListScroll from '@/pages/common/recommend-goods-list-scroll';
//轮播图
import {ImageSlider, ImageViewer} from '@wanmi/ui-taro';

// let that;
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsDetails extends Component<Partial<T.IProps>, any> {
  config = {
    navigationBarTitleText: '拼团详情',
  };

  state = {
    isHideBottom: false,
    viewImages: [],
    currentIndex: 0,
  };

  async componentDidShow() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let skuId = '';
    if (__TARO_ENV == 'h5') {
      skuId = window.location.search.split('=')[1];
    } else {
      skuId = getCurrentInstance().router.params.skuId;
    }
    await this.props.actions.loadReducer();
    await this.props.actions.publicAction.queryServerTime();
    await this.props.actions.init(skuId || '');
    //监听物理返回
    // this.pushHistory();
    // that = this;
    // window.addEventListener('popstate', this.beforeBack, false);
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
  // pushHistory() {
  //   let state = {
  //     title: 'title',
  //     url: '#',
  //   };
  //   window.history.pushState(state, 'title', '');
  // }
  // beforeBack() {
  //   let {
  //     actions: {publicAction},
  //     main,
  //   } = that.props;
  //   publicAction.commonChange('main.canClean', true);
  //   if (main && main.retailSpecIsShow) {
  //     publicAction.commonChange('main.canClean', false);
  //     publicAction.commonChange('main.retailSpecIsShow', false);
  //   } else {
  //     history.back();
  //   }
  // }
  componentWillUnmount() {
    // window.removeEventListener('popstate', this.beforeBack, false);
    // if (that.props.main.canClean) {
    this.props.actions.clean();
    // }
  }

  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    const {goodsId} = main?.goodsDetail?.goods || {};
    const {isHideBottom, viewImages = [], currentIndex = 0} = this.state;
    //@ts-ignore
    let isH5 = __TARO_ENV === 'h5';
    //优惠券数组列表
    let couponLabels = [];
    if (JSON.stringify(main?.goodsDetail) != '{}') {
      couponLabels =
        main?.goodsDetail?.goodsInfos?.[0]?.couponLabels?.length > 0
          ? main?.goodsDetail?.goodsInfos[0].couponLabels
          : [];
    }

    let marketingLabels = main?.goodsInfo?.marketingLabels;
    //过滤秒杀
    marketingLabels = marketingLabels && marketingLabels.filter((item) => item.marketingType != 5);

    return JSON.stringify(main?.goodsDetail) != '{}' ? (
      <View className="GoodsDetails group-details">
        <View
          className="up-box"
          style={{
            height: `calc(100% - ${!isHideBottom ? 61 : 0}px - env(safe-area-inset-bottom))`,
          }}
        >
          <View className="share-btn">
            {/* 右上角分享按钮 */}
            {!isH5 && (
              <Image
                src={share}
                className="share-icon"
                onClick={() => publicAction.commonChange('main.shareModalVisible', true)}
              />
            )}
          </View>
          {/*轮播图*/}
          <ImageSlider
            slideImages={main?.slideImages}
            videoUrl={main?.goodsDetail?.goods?.goodsVideo}
            onClick={(index) => {
              this.setState({currentIndex: index, viewImages: main.slideImages});
            }}
          />
          {/* 拼团信息 */}
          <Group />

          {/* 商品基本信息 */}
          <View className="mb-24">
            <GoodsInfo />
            {/* 领券 */}
            {couponLabels.length > 0 && <GoodsCoupon />}
            {/* 促销 */}
            {/* {main.goodsInfo && marketingLabels && marketingLabels.length > 0 && <ReducePrice />} */}
            {/* 规格 */}
            <GoodsSpec />
          </View>

          {/**组合购 */}
          <CombinationGoods />

          {/* 加入拼团 */}
          {main?.grouponInsts?.length > 0 && <JoinGroup />}

          {/* 拼团玩法 */}
          <PlayGroup />

          {/* 评价 */}
          {main?.isShow && <GoodsEvaluation />}
          {/* 店铺信息 */}
          <StoreInfo />

          {/* 热门推荐商品 */}
          {goodsId ? (
            <RecommendGoodsListScroll
              getShopCartNumCallBack={otherAction._getShopCartNum}
              closeBottom={() => {
                this.setState({
                  isHideBottom: !isHideBottom,
                });
              }}
              relationGoodsIdList={[goodsId]}
            />
          ) : null}

          {/* 详情 */}
          <GoodsDesc />
        </View>

        {/* 底部 当拼团规格弹窗展示的时候，底部操作栏隐藏 */}
        {!main?.retailSpecIsShow && !isHideBottom && <Bottom />}

        {/* 拼团规格弹窗 */}
        {main && main?.retailSpecIsShow && (
          <GroupChoose
            openGroupon
            grouponData={main?.grouponDetails}
            data={main?.spuContext}
            dataCallBack={(goodsInfo, goodsSpecs) => {
              if (!goodsInfo?.goodsInfoId) return;
              publicAction.findSpuDetails(goodsInfo?.goodsInfoId, false);
            }}
            onClose={() => publicAction.commonChange('main.retailSpecIsShow', false)} //关闭弹窗
          />
        )}

        {main?.shareModalVisible && Object.keys(main?.goodsInfo).length > 0 ? (
          <ShareModal
            closeVisible={() => {
              //显示tab
              Taro.showTabBar();
              //弹窗关闭
              publicAction.commonChange('main.shareModalVisible', false);
            }}
            addSelfShop={main?.addSelfShop}
            goodsInfo={main?.goodsInfo}
            goods={{}}
            shareType={2}
            shareModalVisible={main?.shareModalVisible}
          />
        ) : null}

        {/* 领券弹框 */}
        {main?.isCouponShow && <CouponModal />}

        {/* 促销弹框 */}
        {main?.isPromotionShow && <PromotionModal />}

        {/* 等待成团弹窗 */}
        {main?.isWaitGroup && <WaitGroupModal />}
        {/* 查看图片 */}
        {viewImages?.length > 0 && (
          <ImageViewer
            current={currentIndex}
            onCancel={() => {
              // this.setState({viewImage: []});
            }}
            images={viewImages}
          />
        )}
      </View>
    ) : (
      <WMLoading />
    );
  }
}

//create by moon https://github.com/creasy2010/moon
