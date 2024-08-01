import {Image, View} from '@tarojs/components';
import Taro, {getCurrentInstance, getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';
import {cache} from 'config';
import api from 'api';
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
//底部
import Bottom from './components/bottom';
//详情
import GoodsDesc from './components/goods-desc';
//优惠
import ReducePrice from './components/reduce-price';
//领券弹窗
import CouponModal from './components/coupon-modal';
//促销弹窗
import PromotionModal from './components/promotion-modal';
//零售规格弹窗
import RetailChoose from '@/pages/common/goods/retail-choose';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';
import {WMkit, _, wxShare} from 'wmkit';
//右上角分享按钮
import share from '@/assets/image/goods/goods-detail/share.png';
// 提示 - 商品不存在
import GoodsTip from './components/goods-tip';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsDetails extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  async onShareAppMessage(res) {
    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const params = getCurrentInstance().router.params;
    const newUrl = await wxShare.changeUrl(res.from, url, params);
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
      path: newUrl,
    };
  }

  onShareTimeline() {
    // 默认分享内容
  }

  async componentDidShow() {
    if (Taro.getEnv() === 'WEAPP') {
      Taro.hideHomeButton();
    }

    //判断小b 分销状态（关店或分销状态被禁用 false 被禁用）
    if (WMkit.channelType() == '2' && WMkit.inviteeId() != '') {
      const status = await api.distributionController.checkStatus();
      if (!status) {
        Taro.showModal({
          title: '店铺已失效',
          showCancel: false,
          content: '该店铺已失效，不可在店铺内购买商品;',
          success: function(res) {
            if (res.confirm) {
              //当店铺失效清除本地的邀请人缓存信息
              WMkit.changeTabBarText(); // 更新tab信息展示
              Taro.removeStorageSync(cache.INVITEE_ID);
              Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
              Taro.switchTab({
                url: `/pages/user-center/index`,
              });
            }
          },
        });
      }
    }
  }

  componentDidMount() {
    let {id, goodsId, skuId, shareTest} = getCurrentInstance().router.params;
    if (shareTest && shareTest == 'shareTest') {
      //  强制重新加载,暂时解决H5多次分享--必须刷新才能再次分享的问题
      if (id != '0') {
        Taro.redirectTo({
          url: `/pages/package-B/distribution/shop/socia-details/index?id=${id}&goodsId=${goodsId}&skuId=${skuId}`,
        });
      } else {
        Taro.redirectTo({
          url: `/pages/package-B/distribution/shop/socia-details/index?id=${0}&goodsId=${goodsId}&skuId=${skuId}`,
        });
      }
    }

    if (id != '0') {
      //并分销员会员ID和分销渠道存入缓存，分销渠道为店铺
      WMkit.setShareInfoCache(id, '2');
      this.props.actions.init(id, goodsId, skuId);
    } else {
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      let customerId = loginData.customerId;
      this.props.actions.init(customerId, goodsId, skuId);
    }
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {publicAction, otherAction},
      main = {},
    } = this.props;

    //优惠券数组列表
    let couponLabels = [];
    if (JSON.stringify(main.goodsDetail) != '{}') {
      const {goodsInfos = []} = main.goodsDetail || {};
      couponLabels =
        goodsInfos[0] && goodsInfos[0].couponLabels && goodsInfos[0].couponLabels.length > 0
          ? goodsInfos[0].couponLabels
          : [];
    }

    // const saleType = main.goodsDetail.goods.saleType;
    //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
    const distributionFlag = main.goodsInfo?.distributionGoodsAudit == '2';
    let isH5 = __TARO_ENV === 'h5';

    // 商品不存在时加载这个组件
    if (!main.isExist) return <GoodsTip />;

    return (
      JSON.stringify(main.goodsDetail) != '{}' && (
        <View className="GoodsDetails social-details">
          <View className="social-details-container">
            <View className="up-box">
              <View className="share-btn">
                {/* 发圈素材 分销商品才展示*/}
                {WMkit.isDistributor() && distributionFlag && !WMkit.isDistributorLoginForShare() && (
                  <View style={{flexDirection: 'row'}}>
                    <View className="mater-btn" onClick={() => otherAction.getDistributor(main.goodsInfo)}>
                      发圈素材
                    </View>
                    <View
                      className="mater-btn"
                      onClick={(e) => {
                        if (isH5) {
                          Taro.showToast({
                            title: '请使用微信浏览器分享',
                            icon: 'none',
                            duration: 2000,
                          });
                        } else {
                          publicAction.commonChange('main.goodsShareVisible', true);
                        }
                      }}
                    >
                      分享赚 ￥{_.addZero(main.goodsInfo.distributionCommission)}
                    </View>
                  </View>
                )}
                {/* 右上角分享按钮 */}
                {!isH5 && !(WMkit.isDistributor() && distributionFlag && !WMkit.isDistributorLoginForShare()) && (
                  <Image
                    src={share}
                    className="share-icon"
                    onClick={() => publicAction.commonChange('main.shareModalVisible', true)}
                  />
                )}
              </View>

              {/*轮播图*/}
              <ImgSlides slideImages={main.slideImages} goodsVideo={main.goodsDetail?.goods.goodsVideo} />

              {/* 商品基本信息 */}
              <View className="mb-24">
                <GoodsInfo />
                {/* 领券 */}
                {couponLabels.length > 0 && !distributionFlag && <GoodsCoupon />}
                {/* 促销 */}
                {main.goodsInfo && main.goodsInfo?.marketingLabels.length > 0 && !distributionFlag && <ReducePrice />}
                {/* 规格 */}
                <GoodsSpec />
              </View>
            </View>
            {/* 详情 */}
            <GoodsDesc />
          </View>

          {/* 底部 */}
          <Bottom />

          {/* spu零售规格弹窗 */}
          {main && main.retailSpecIsShow && (
            <RetailChoose
              isPay={main.isPay}
              openType={main.openType}
              list={main.goodsDetail} //商品规格数据传进组件内
              rushToBuying={(id, num) => otherAction.rushToBuyingFlashSaleGoodsInfo(id, num)} //秒杀 立即抢购
              goodsShare={() => publicAction.commonChange('main.goodsShareVisible', true)} //分销 分享赚
              onClose={() => publicAction.commonChange('main.retailSpecIsShow', false)} //关闭弹窗
              goodsBuyTypes={main.goodsDetail.goods.goodsBuyTypes} //判断下单方式
              getCartNums={(count) => publicAction.commonChange('main.shopCarNum', count)}
              _didConfirm={(buyGoodsInfos, appointmentId) => {
                otherAction._didConfirm(buyGoodsInfos);
              }}
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
              shareType={1}
              shareModalVisible={main.shareModalVisible}
            />
          ) : null}

          {/* 领券弹框 */}
          {main.isCouponShow && <CouponModal />}

          {/* 促销弹框 */}
          {main.isPromotionShow && <PromotionModal />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
