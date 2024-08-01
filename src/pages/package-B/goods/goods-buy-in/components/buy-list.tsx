import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './buy-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
const goodsImg = require('@/assets/image/default/no-goods-img.png');
import Price from '@/pages/common/goods/price';
import CartCount from '@/pages/common/goods/cart-count';
type IBuyListProps = T.IProps & T.IBuyListProps;

@connect<Partial<IBuyListProps>, T.IBuyListState>(store2Props, actions)
export default class BuyList extends Component<Partial<IBuyListProps>, T.IBuyListState> {
  constructor(props: IBuyListProps) {
    super(props);
  }

  /**
    sku列表
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <ScrollView>
        <View className="spuList skuList">
          <View className="buy-spu-item">
            <Image src={main?.goodsInfo?.goodImage || goodsImg} className="goods-img" />
            <View className="right-content">
              {/* 上半部分内容 */}
              <View className="up-content">
                {/* 商品标题 */}
                <View className="goods-title">
                  <View className="marketing">
                    <Text className="market-text">自营</Text>
                  </View>
                  <View className="title-view">
                    <Text className="words">
                      <Text className="text">随便写</Text>
                      {main?.goodsInfo?.goodName ? main.goodsInfo.goodName : ''}
                    </Text>
                  </View>
                </View>

                {/* 商品规格 */}
                <View className="goods-spec">
                  <Text className="spec-text">{main?.goodsInfo?.goodIntro ? main.goodsInfo.goodIntro : ''}</Text>
                </View>

                {/* 促销活动 */}
                {/* <View className="goods-active">
                  <View className="active-item">
                    <Text className="active-text">券</Text>
                  </View>
                  <View className="active-item">
                    <Text className="active-text">满减</Text>
                  </View>
                </View> */}
              </View>

              {/* 下半部分内容 */}
              <View className="down-content">
                {/* 销量 评论数 好评率 */}
                {/* <View className="goods-statics">
                  <Text className="texts">17销量</Text>
                  <Text className="texts">8评论</Text>
                  <Text className="texts">100%好评</Text>
                </View> */}

                {/* 商品价格 步进器*/}
                <View className="goods-price">
                  <Price price={main?.goodsInfo?.goodPrice ? main.goodsInfo.goodPrice : 0} />
                  {/* 发圈素材 分享赚 */}
                  <View className="right-tools">积极性抢购中…</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
