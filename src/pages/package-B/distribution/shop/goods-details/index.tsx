import {Image, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//轮播图
import ImgSlides from '@/pages/common/goods/img-slides';
//价格 标题 副标题 收藏
import GoodsInfo from './components/goods-info/goods-info';
//领券
import GoodsCoupon from './components/goods-coupon';
//规格
import GoodsSpec from './components/goods-spec';
//评价
import GoodsEvaluation from './components/goods-evaluation';
//底部
import Bottom from './components/bottom';
//详情
import GoodsDesc from './components/goods-desc';
//秒杀
import Seckill from './components/seckill';
//优惠
import ReducePrice from './components/reduce-price';
//店铺信息
import StoreInfo from './components/store-info';
//领券弹窗
import CouponModal from './components/coupon-modal';
//促销弹窗
import PromotionModal from './components/promotion-modal';
//批发规格弹窗
import WholesaleChoose from '@/pages/common/goods/wholesale-choose';
//零售规格弹窗
import RetailChoose from '@/pages/common/goods/retail-choose';
// 查看大图评价
import BigPicture from './components/big-picture';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';
import {WMkit} from 'wmkit';
//右上角分享按钮
import share from '@/assets/image/goods/goods-detail/share.png';

//@ts-ignore
let isH5 = __TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsDetails extends Component<Partial<T.IProps>, any> {
  config = {
    navigationBarTitleText: '商品详情',
  };
  componentDidMount() {
    let {skuId} = getCurrentInstance().router.params;
    if (skuId == undefined) {
      skuId = '';
    }
    this.props.actions.init(skuId);
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    //优惠券数组列表
    let couponLabels = [];
    if (JSON.stringify(main.goodsDetail) != '{}') {
      couponLabels =
        main.goodsDetail.goodsInfos[0].couponLabels.length > 0 ? main.goodsDetail.goodsInfos[0].couponLabels : [];
    }

    // const saleType = main.goodsDetail.goods.saleType;
    //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
    // const distributionFlag = main.goodsInfo.distributionGoodsAudit == '2';

    // const grouponFlag = main.goodsInfo.grouponLabel;

    //当前选中商品是否为正在进行的抢购活动
    let flashsaleGoodsFlag = false;
    let flashsalePrice;
    let flashsaleGoods;
    let flashSaleGoodsId;
    const selectdGoodsInfoId = main.goodsInfo.goodsInfoId;
    if (main.flashsaleGodos.length > 0) {
      main.flashsaleGodos.map((v) => {
        if (v.goodsInfoId == selectdGoodsInfoId && v.stock >= v.minNum) {
          flashsaleGoodsFlag = true;
          flashSaleGoodsId = v.id;
          flashsalePrice = v.price;
          flashsaleGoods = v;
        }
      });
    }

    return (
      JSON.stringify(main.goodsDetail) != '{}' && (
        <View className="GoodsDetails">
          <View className="up-box">
            <View className="share-btn">
              {/* 发圈素材 分销商品才展示*/}
              {WMkit.isDistributor() && !flashsaleGoodsFlag && main?.goodsInfo?.distributionGoodsAudit == '2' && (
                <View className="mater-btn" onClick={() => otherAction.getDistributor(main.goodsInfo)}>
                  发圈素材
                </View>
              )}

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
            <ImgSlides slideImages={main.slideImages} goodsVideo={main.goodsDetail.goods.goodsVideo} />

            {/* 秒杀 */}
            {flashsaleGoodsFlag && <Seckill flashsaleGoods={flashsaleGoods} />}

            {/* 商品基本信息 */}
            <View className="mb-24">
              <GoodsInfo flashsaleGoodsFlag={flashsaleGoodsFlag} flashsaleGoods={flashsaleGoods} />
              {/* 领券 */}
              {couponLabels.length > 0 && !flashsaleGoodsFlag && <GoodsCoupon />}
              {/* 促销 */}
              {main.goodsInfo && main.goodsInfo.marketingLabels.length > 0 && !flashsaleGoodsFlag && <ReducePrice />}
              {/* 规格 */}
              <GoodsSpec />
            </View>
          </View>

          {/* 评价 */}
          {main.top3Evaluate.listResponse && main.top3Evaluate.listResponse.goodsEvaluateVOList.length > 0 && (
            <GoodsEvaluation />
          )}

          {/* 店铺信息 */}
          <StoreInfo />
          {/* 详情 */}
          <GoodsDesc />
          {/* 底部 */}
          <Bottom flashsaleGoodsFlag={flashsaleGoodsFlag} flashsaleGoods={flashsaleGoods} />

          {/* spu批发规格弹窗 */}
          {main && main.batchSpecIsShow && (
            <WholesaleChoose
              list={main.goodsDetail} //商品规格数据传进组件内
              onClose={() => publicAction.commonChange('main.batchSpecIsShow', false)} //关闭弹窗
              getCartNums={(count) => publicAction.commonChange('main.shopCarNum', count)}
            />
          )}

          {/* spu零售规格弹窗 */}
          {main && main.retailSpecIsShow && (
            <RetailChoose
              list={main.goodsDetail} //商品规格数据传进组件内
              flashsaleGodos={main.flashsaleGodos}
              flashsaleGoods={flashsaleGoods}
              rushToBuying={(id, num) => otherAction.rushToBuyingFlashSaleGoodsInfo(id, num)} //秒杀 立即抢购
              goodsShare={() => publicAction.commonChange('main.goodsShareVisible', true)} //分销 分享赚
              onClose={() => publicAction.commonChange('main.retailSpecIsShow', false)} //关闭弹窗
              getCartNums={(count) => publicAction.commonChange('main.shopCarNum', count)}
            />
          )}

          {/* 分销分享赚弹框 */}
          {main.goodsShareVisible && (
            <GoodsShare
              checkedSku={main.goodsInfo}
              onClose={() => publicAction.commonChange('main.goodsShareVisible', false)}
              addSelfShop={(val) => publicAction.commonChange('main.addSelfShop', val)}
              shareModalVisible={() => publicAction.commonChange('main.shareModalVisible', true)}
              isOpenWechat={main.isOpenWechat}
            />
          )}

          {main.shareModalVisible && Object.keys(main.goodsInfo).length > 0 ? (
            <ShareModal
              closeVisible={() => {
                //显示tab
                Taro.showTabBar();
                //弹窗关闭
                publicAction.commonChange('main.shareModalVisible', false);
              }}
              addSelfShop={main.addSelfShop}
              goodsInfo={main.goodsInfo}
              goods={{}}
              shareType={2}
              shareModalVisible={main.shareModalVisible}
            />
          ) : null}

          {/* 领券弹框 */}
          {main.isCouponShow && <CouponModal />}

          {/* 促销弹框 */}
          {main.isPromotionShow && <PromotionModal />}

          {/* 评价查看大图 */}
          {main.isBigImgShow && <BigPicture />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
