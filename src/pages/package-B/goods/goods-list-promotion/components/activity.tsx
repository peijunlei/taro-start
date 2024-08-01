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
type IActivityProps = T.IProps & T.IActivityProps;
const _TYPE = {
  '0': {text: '减', color: ''},
  '2': {text: '赠', color: 'red'},
  '1': {text: '折', color: 'orange'},
};
@connect<Partial<IActivityProps>, T.IActivityState>(store2Props, actions)
export default class Activity extends Component<Partial<IActivityProps>, T.IActivityState> {
  constructor(props: IActivityProps) {
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
    const {beginTime, endTime, subType, fullReductionLevelList, marketingType, fullDiscountLevelList} = marketing;
    if (marketingType == 0) {
      icon = MJianIcon;
      if (subType == 0) {
        text = fullReductionLevelList.map((m) => `满${m.fullAmount}减${m.reduction}`).toString();
      } else if (subType == 1) {
        text = fullReductionLevelList.map((m) => `满${m.fullCount}件减${m.reduction}`).toString();
      }
    } else if (marketingType == 1) {
      icon = MZheIcon;
      if (subType == 2) {
        text = fullDiscountLevelList.map((m) => `满${m.fullAmount}享${mul(m.discount, 10)}折`).toString();
      } else if (subType == 3) {
        text = fullDiscountLevelList.map((m) => `满${m.fullCount}件享${mul(m.discount, 10)}折`).toString();
      }
    }

    return (
      <View className="activity goods_list_promotion_activity">
        {/* 满减 */}
        <View className="active-item">
          <Image src={icon} className="icon" />
          <View className="right-info">
            <Text className="title">
              {moment(beginTime).format('YYYY-MM-DD')}～{moment(endTime).format('YYYY-MM-DD')} 以下商品可参加满
              {_TYPE[marketingType] && _TYPE[marketingType].text}活动
            </Text>
            <Text className="text">{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
