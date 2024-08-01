import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-spec.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
type IGoodsSpecProps = T.IProps & T.IGoodsSpecProps;

@connect<Partial<IGoodsSpecProps>, T.IGoodsSpecState>(store2Props, actions)
export default class GoodsSpec extends Component<Partial<IGoodsSpecProps>, T.IGoodsSpecState> {
  constructor(props: IGoodsSpecProps) {
    super(props);
  }

  /**
    规格
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail, goodsInfo},
    } = this.props;
    if (JSON.stringify(goodsDetail) == '{}') {
      return;
    }
    return (
      <View className="goodsSpec" onClick={() => publicAction.openSpecModal(goodsDetail.goods.saleType)}>
        <View className="l-content">
          <Text className="label">规格</Text>
          <View className="text">
            {goodsDetail.goods.saleType == 0
              ? goodsDetail.goodsInfos && goodsDetail.goodsInfos.length > 0
                ? goodsDetail.goodsInfos.length + '种'
                : '无'
              : goodsInfo.specText
              ? goodsInfo.specText
              : '无'}
          </View>
        </View>
        {/* 更多 */}
        <Image src={moreIcon} className="more" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
