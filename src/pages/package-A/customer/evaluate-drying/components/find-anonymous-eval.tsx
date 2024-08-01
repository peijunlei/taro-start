import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {StarRate} from '@wanmi/ui-taro';
import {_} from 'wmkit';
import * as T from '../types';
import './find-anonymous-eval.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {WebView, View, Text, Image, Textarea, ScrollView} from '@tarojs/components';
import Price from '@/pages/common/goods/price';

import Star from '@/pages/common/goods/star';

const defaultImg = require('@/assets/image/common/default-img.png');
const add = require('@/assets/image/goods/goods-list/add.png');
const good = require('@/assets/image/goods/evaluate/good.png');
type IAnonymousEvalProps = T.IProps & T.IAnonymousEvalProps;

@connect<Partial<IAnonymousEvalProps>, T.IAnonymousEvalState>(store2Props, actions)
export default class AnonymousEval extends Component<Partial<IAnonymousEvalProps>, T.IAnonymousEvalState> {
  constructor(props: IAnonymousEvalProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {createTime, orderBaseInfo, storeEvaluate, storeVO = {}, orderEvaluate = {}} = main || {};
    //普通商品详情
    // let url = orderBaseInfo ? `/pages/package-B/goods/goods-details/index?skuId=${orderBaseInfo?.skuId}` : '';
    return (
      <View className="evaluate-detail">
        {orderBaseInfo && (
          <View>
            <View className="evaluate">
              <View>
                <Image src={orderBaseInfo.pic ? orderBaseInfo.pic : defaultImg} className="imgHead" />
              </View>
              <View className="rightPing">
                <View>
                  <Text className="content">{orderBaseInfo?.skuName}</Text>
                  <Text className="fs20 c999 mb16">{orderBaseInfo?.specDetails ? orderBaseInfo?.specDetails : ''}</Text>
                </View>
                <Text className="fs20 c999">{createTime && `购买时间: ${_.formatDay(createTime)}`}</Text>
              </View>
            </View>

            <View className="evaluate-detail-info">
              <View className="head">
                <StarRate disabled rating={orderEvaluate?.evaluateScore} />
                <Text className="fs20 c999">{_.formatDay(orderEvaluate?.createTime)}</Text>
              </View>
              <Text className="content">{orderEvaluate?.evaluateContent}</Text>
              {orderEvaluate?.evaluateImageList &&
                orderEvaluate?.evaluateImageList.map((item) => (
                  <Image src={item.artworkUrl} mode="widthFix" className="img2" key={item.imageId} />
                ))}
            </View>
          </View>
        )}

        {storeEvaluate && (
          <View className="store">
            <Text className="title">商城服务评价</Text>
            <View className="block1">
              <Image src={storeVO?.storeLogo ? storeVO?.storeLogo : defaultImg} className="logo" />
              <Text className="fs32 c333">{storeVO.storeName}</Text>
            </View>
            <View className="line">
              <Text className="fs28 c333">商品质量</Text>
              <StarRate disabled rating={storeEvaluate?.goodsScore} />
            </View>
            <View className="line">
              <Text className="fs28 c333">服务态度</Text>
              <StarRate disabled rating={storeEvaluate?.serverScore} />
            </View>
            <View className="line">
              <Text className="fs28 c333">发货速度</Text>
              <StarRate disabled rating={storeEvaluate?.logisticsScore} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
