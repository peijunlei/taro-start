import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './goods-detail.less';
import {_} from 'wmkit';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';

import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

type IGoodsDetailProps = T.IProps & T.IGoodsDetailProps;

@connect<Partial<IGoodsDetailProps>, T.IGoodsDetailState>(store2Props, actions)
export default class GoodsDetail extends Component<Partial<IGoodsDetailProps>, T.IGoodsDetailState> {
  constructor(props: IGoodsDetailProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    //筛选出团长的SKU
    const goodsInfo = main.goodsInfos.filter((info) => info.goodsInfoId == main.grouponDetails.goodInfoId)[0];

    const leaderSku = goodsInfo ? goodsInfo : {};

    return (
      <View
        className="goodsDetail"
        onClick={() => {
          Taro.navigateTo({url: `/pages/package-B/goods/group-details/index?skuId=${goodsInfo.goodsInfoId}`});
        }}
      >
        <Image src={main.goods.goodsImg ? main.goods.goodsImg : noDataIcon} className="goods-image" />
        <View className="goods-info">
          <View className="info-top">
            <Text className="goods-name">{main.goods.goodsName}</Text>
            <View className="num-box">
              <Text className="num-text">{main.grouponDetails.grouponActivity.grouponNum}人团</Text>
            </View>
          </View>
          <View className="info-down">
            {/* <Text className="limit-num">2件起售</Text> */}
            <View className="info-bottom">
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Price price={leaderSku.grouponPrice} />
                {/* <Text className="price">¥</Text>
                <Text className="big"> {leaderSku.grouponPrice ? _.addZero(leaderSku.grouponPrice) : '0.00'}</Text> */}
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text className="num">{main?.grouponDetails?.grouponActivity?.alreadyGrouponNum || "0"}</Text>
                <Text className="lable">人已拼团</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
