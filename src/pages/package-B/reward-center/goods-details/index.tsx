import {Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {throttle} from 'lodash';
import {store2Props} from './selectors';
//轮播图
import ImgSlides from '@/pages/common/goods/img-slides';
//价格 标题 副标题 收藏
import GoodsInfo from './components/goods-info/goods-info';
//规格
import GoodsSpec from './components/goods-spec';
//评价
import GoodsEvaluation from './components/goods-evaluation';
//详情
import GoodsDesc from './components/goods-desc';
//店铺信息
import StoreInfo from './components/store-info';

import api from 'api';
//零售规格弹窗
import RetailChoose from '@/pages/common/goods/retail-choose';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsDetails extends Component<Partial<T.IProps>, any> {
  state = {
    bigImageShow: false, //是否查看大图
  };

  async componentDidShow() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let {skuId} = getCurrentInstance().router.params;
    if (skuId == undefined) {
      skuId = '';
    }
    await this.props.actions.init(skuId);
    this.setState({skuId});
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
  componentDidHide() {
    this.props.actions.clean();
  }

  componentWillUnmount() {
    this.props.actions.unloadReducer();
  }

  state = {
    skuId: '',
  };

  render() {
    let {
      main,
      actions: {publicAction, otherAction},
    } = this.props;
    const {skuId} = this.state;
    const {bigImageShow} = this.state;

    return main && Object.keys(main?.goodsDetail).length > 0 && main?.slideImages ? (
      <View className="GoodsDetails reward-goods-details">
        {main.isLoadingFlag && <WMLoading />}
        <View className="up-box">
          {/*轮播图*/}
          <ImgSlides
            slideImages={main?.slideImages}
            goodsVideo={main?.goodsDetail.goods ? main?.goodsDetail.goods.goodsVideo : null}
            bigImageShow={bigImageShow}
            onChangeBigImageShow={(bigImageShow) => {
              this.setState({bigImageShow});
            }}
          />

          {/* 商品基本信息 */}
          <View className="mb-24">
            <GoodsInfo />
            {/* 规格 */}
            <GoodsSpec />
          </View>
          {/* 评价 */}
          {main?.top3Evaluate.listResponse && main?.top3Evaluate.listResponse.goodsEvaluateVOList.length > 0 && (
            <GoodsEvaluation />
          )}
          {/* 店铺信息 */}
          <StoreInfo />
          {/* 详情 */}
          <GoodsDesc />
        </View>
        <View className="buy-con" onClick={throttle(() => this._buy(skuId), 5000)}>
          <View className="buy-btn">
            <Text className="buy-text">立即购买</Text>
          </View>
        </View>

        {/* spu零售规格弹窗 */}
        {/* {main && main.retailSpecIsShow && (
          <RetailChoose
            distriGoods={true}
            goodsBuyTypes={'1'} //判断下单方式
            openType={main.openType} //打开方式
            list={main?.goodsDetail} //商品规格数据传进组件内
            isPay={main.isPay}
            onClose={() => {
              publicAction.commonChange('main.retailSpecIsShow', false);
              publicAction.commonChange('main.isPay', false);
            }} //关闭弹窗
            _didConfirm={async () => {
              try {
                await api.distributionController.verifyStoreBagsSku(skuId);
                await api.tradeBaseController.storeBagsBuy({ goodsInfoId: skuId });
                await Taro.navigateTo({ url: '/pages/package-C/order/order-confirm/index' });
              } catch (e) {
                await Taro.showToast({
                  title: e.message,
                  icon: 'none',
                  duration: 2000,
                });
              }
            }} //立即购买
          />
        )} */}
      </View>
    ) : (
      main?.isLoadingFlag && <WMLoading />
    );
  }

  _buy = async (skuId) => {
    try {
      api.distributionController.verifyStoreBagsSku(skuId);
      api.tradeBaseController.storeBagsBuy({goodsInfoId: skuId});
      Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index'});
    } catch (e) {
      await Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
