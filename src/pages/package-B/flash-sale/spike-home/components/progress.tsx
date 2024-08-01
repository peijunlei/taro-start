import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './progress.less';

type IProgressProps = T.IProps & T.IProgressProps;

export default class SpikeProgress extends Component<Partial<IProgressProps>, T.IProgressState> {
  constructor(props: IProgressProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      flashSaleGoods,
      main: {activityStatus},
    } = this.props;

    let name = '去抢购';
    let isOver = false;
    if (activityStatus == '已结束') {
      name = '已结束';
      isOver = true;
    } else if (activityStatus == '即将开始' || activityStatus == '次日预告') {
      name = '即将开始';
    } else if (flashSaleGoods.stock <= 0) {
      name = '已抢完';
      isOver = true;
    }

    const percent =
      flashSaleGoods.stock + flashSaleGoods.salesVolume
        ? ((flashSaleGoods.salesVolume / (flashSaleGoods.stock + flashSaleGoods.salesVolume)) * 100).toFixed(0)
        : 100;
    return (
      <View className={activityStatus === '已结束' ? 'wm-progress disabled' : 'wm-progress'}>
        <View className={isOver ? 'operation' : 'operation'}>{name}</View>
        {activityStatus !== '已结束' && (
          <View className="item">
            <View className="pro-bar">
              <View className="active" style={{width: percent + '%'}} />
            </View>
            <View className="percent">{percent + '%'}</View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
