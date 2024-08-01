import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/seckill.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import msLogo from '@/assets/image/goods/goods-detail/ms-logo.png';
import {_} from 'wmkit';

type ISeckillProps = T.IProps & T.ISeckillProps;

@connect<Partial<ISeckillProps>, T.ISeckillState>(store2Props, actions)
export default class Seckill extends Component<Partial<ISeckillProps>, T.ISeckillState> {
  constructor(props: ISeckillProps) {
    super(props);
  }

  /**
   秒杀
   */
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    const {flashsaleGoods} = this.props;
    return (
      <View className="seckill">
        <Image className="l-logo" src={msLogo}/>
        <View className="right">
          <Text className="group-name">距离结束还剩</Text>
          <CountDown
            allowFontScaling={false}
            numberOfLines={1}
            groupFlag
            timeOffset={
              moment(flashsaleGoods.activityFullTime).add(2, 'h').unix() - moment(main.serverTime).unix()
            }
            endHandle={() => {
              setTimeout(() => {
                publicAction.findSpuDetails(main.skuId, main.pointsGoodsId);
              }, 1000);
            }}
          />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
