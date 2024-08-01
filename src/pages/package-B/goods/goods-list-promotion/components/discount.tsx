import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './activity.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
//满减
import MJianIcon from '@/assets/image/goods/goods-list/mjian.png';
//满折
import MZheIcon from '@/assets/image/goods/goods-list/mzhe.png';
//满赠 优惠券
import MZengIcon from '@/assets/image/goods/goods-list/mzeng.png';
import {mul} from '@/utils/priceFormat';
type IDiscountProps = T.IProps & T.IDiscountProps;
const _TYPE = {
  '0': {text: '减', color: ''},
  '2': {text: '赠', color: 'red'},
  '1': {text: '折', color: 'orange'},
};
@connect<Partial<IDiscountProps>, T.IDiscountState>(store2Props, actions)
export default class Discount extends Component<Partial<IDiscountProps>, T.IDiscountState> {
  constructor(props: IDiscountProps) {
    super(props);
  }

  /**
      满减赠折活动组件
  */
  render() {
    let {
      actions: {goodsAction, activityAction},
      main: {marketing},
    } = this.props;

    let text = '';
    let icon = MZengIcon;
    const {
      beginTime,
      endTime,
      subType,
      buyoutPriceLevelList,
      fullReductionLevelList,
      marketingType,
      fullDiscountLevelList,
    } = marketing;
    if (marketingType == 3 || marketingType == 4) {
      if (subType == 6) {
        text = buyoutPriceLevelList.map((m) => `${m.choiceCount}件${m.fullAmount}元`).toString();
      }

      return (
        <View className="goods-promotion-activity goods_list_promotion_activity">
          <View className="activity">
            {/* 满减 */}
            <View className="active-item">
              <Image src={MZheIcon} className="icon" />
              <View className="right-info">
                <Text className="title">
                  {moment(beginTime).format('YYYY-MM-DD')}～{moment(endTime).format('YYYY-MM-DD')} 以下商品可参加
                  {marketingType == 3 ? '打包一口价活动' : '多买多惠活动'}
                </Text>
                <Text className="text">{text}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }

    return <View />;
  }
}
//create by moon https://github.com/creasy2010/moon
