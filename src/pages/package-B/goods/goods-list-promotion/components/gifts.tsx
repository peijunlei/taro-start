import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './activity.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';

//满赠 优惠券
import MZengIcon from '@/assets/image/goods/goods-list/mzeng.png';
import RArrowIcon from '@/assets/image/goods/goods-list/r-arrow.png';

type IActivityProps = T.IProps & T.IActivityProps;

@connect<Partial<IActivityProps>, T.IActivityState>(store2Props, actions)
export default class Gifts extends Component<Partial<IActivityProps>, T.IActivityState> {
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
    const {beginTime, endTime, subType, fullGiftLevelList} = marketing;
    let text = '';
    if (subType == 4) {
      text = fullGiftLevelList.map((m) => m.fullAmount).toString();
    } else if (subType == 5) {
      text = fullGiftLevelList.map((m) => m.fullCount).toString();
      if (text.length > 0) {
        text = text + '件';
      }
    }
    return (
      <View className="activity goods_list_promotion_activity">
        {/* 满减 */}
        <View className="active-item">
          <Image src={MZengIcon} className="icon" />
          <View className="right-info">
            <Text className="title">
              {moment(beginTime).format('YYYY-MM-DD')}～{moment(endTime).format('YYYY-MM-DD')}以下商品可参加满赠活动
            </Text>
            <Text className="text">赠品赠完为止</Text>
            <View className="condition">
              <Text className="l-text">满{text}获赠品</Text>
              <View
                className="r-btn"
                onClick={async () => {
                  await activityAction.commonChange([{paths: 'main.giftShow', value: true}]);
                }}
              >
                <Text className="btn-text">查看赠品</Text>
                <Image src={RArrowIcon} className="arrow" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
