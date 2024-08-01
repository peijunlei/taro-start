import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/reduce-price.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
//促销类型
const marketingType = ['减', '折', '赠', '秒杀'];
//促销类型样式
const _TYPE = {
  '0': {text: '减', color: ''},
  '2': {text: '赠', color: 'red'},
  '1': {text: '折', color: 'orange'},
  '5': {text: '秒杀', color: 'orange'},
};
type IReducePriceProps = T.IProps & T.IReducePriceProps;

@connect<Partial<IReducePriceProps>, T.IReducePriceState>(store2Props, actions)
export default class ReducePrice extends Component<Partial<IReducePriceProps>, T.IReducePriceState> {
  constructor(props: IReducePriceProps) {
    super(props);
  }

  /**
    优惠
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail, goodsInfo},
    } = this.props;
    if (JSON.stringify(goodsDetail) == '{}') {
      return;
    }
    //有促销活动时,返回优先级最高的活动
    const marketing = goodsInfo && goodsInfo.marketingLabels.length > 0 ? this.marketOne(goodsInfo)[0] : null;
    //满赠营销
    const giftMarketing = goodsInfo.marketingLabels.find((marketing) => marketing.marketingType == 2);
    return (
      <View
        className="reducePrice"
        onClick={() => publicAction.marketingDetail(giftMarketing ? giftMarketing.marketingId : null)}
      >
        <View className="l-content">
          <Text className="label">促销</Text>
          {/* 优惠券集合 */}
          <View className="coupon-box">
            <View className="coupon-item">
              <Text className="text">{marketing.marketingDesc}</Text>
            </View>
          </View>
        </View>
        {/* 更多 */}
        <Image src={moreIcon} className="more" />
      </View>
    );
  }

  /**
   * 根据满减>满折>满赠的优先级，返回需要显示的促销活动
   */
  marketOne = (goodsInfo) => {
    return goodsInfo.marketingLabels.sort((marketing) => marketing.marketingType);
  };
}

//create by moon https://github.com/creasy2010/moon
