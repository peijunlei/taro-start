import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dhIcon from '@/assets/image/goods/goods-list/dh.png';
import {mul} from '@/utils/priceFormat';
type IBottomProps = T.IProps & T.IBottomProps;

@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  constructor(props: IBottomProps) {
    super(props);
  }

  /**
    去购物车
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main: {calc, marketing},
    } = this.props;
    if (!marketing) {
      return null;
    }
    if (!calc) {
      return null;
    }
    let lackDesc = '';
    const {subType} = marketing;
    if (subType === 0 || subType === 2 || subType === 4) {
      lackDesc = '￥' + (calc.lack ? calc.lack : 0);
    } else if (subType === 1 || subType === 3 || subType === 5 || subType === 6 || subType === 7) {
      lackDesc = (calc.lack ? calc.lack : 0) + '件';
    }
    let desc = '';
    if (marketing.marketingType === 0 || marketing.marketingType === 4) {
      desc = '可减￥' + calc.discount;
    } else if (marketing.marketingType === 1) {
      desc = '可享' + mul(calc.discount || 0, 10) + '折';
    } else if (marketing.marketingType === 2) {
      desc = '可获赠品';
    } else if (marketing.marketingType === 3) {
      desc = `已减${calc.discount}元`;
    }
    return (
      <View className="promotion__bottom">
        <View className="l-content">
          <View className="up-box">
            <Text className="up-text">已选</Text>
            <Text className="nums">
              {calc?.goodsInfoList ? calc.goodsInfoList.filter((goodsInfo) => goodsInfo.buyCount).length + '' : '0'}
            </Text>
            <Text className="up-text">种</Text>
            <Text className="nums">{calc?.totalCount || '0'}</Text>
            <Text className="up-text">件 商品总价</Text>
            <Text className="price">￥{calc?.totalAmount || '0.00'}</Text>
          </View>
          <View className="down-text">
            <Image className="dh" src={dhIcon} />
            {calc?.lack === 0 ? (
              <Text className="text">
                满足条件 <Text className={marketing.marketingType === 2 ? 'price price-gift' : 'price'}>{desc}</Text>
              </Text>
            ) : (
              <Text className="text">
                未满足条件 还差<Text className="price">{lackDesc}</Text>
              </Text>
            )}
          </View>
        </View>
        <View
          className="r-go-btn"
          onClick={() =>
            Taro.switchTab({
              url: '/pages/shop-cart/index',
            })
          }
        >
          去购物车
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
