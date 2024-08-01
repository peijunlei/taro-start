import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/play-group.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import groupBj from '@/assets/image/goods/goods-detail/group-bj.png';
type IGroupProps = T.IProps & T.IGroupProps;

@connect<Partial<IGroupProps>, T.IGroupState>(store2Props, actions)
export default class PlayGroup extends Component<Partial<IGroupProps>, T.IGroupState> {
  constructor(props: IGroupProps) {
    super(props);
  }

  /**
    加入拼团
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    return (
      <View className="PlayGroup">
        <View className="play-game">
          {/* 拼团玩法 */}
          <Text className="title">拼团玩法</Text>
          <Image src={groupBj} className="play-bj" />
        </View>
        <View className="bottom-box">
          {/*<View className='bottom-point'>*/}
          {/*  <View className="row-copy" />*/}
          {/*  <View className="row-copy" />*/}
          {/*  <View className="row-copy" />*/}
          {/*</View>*/}
          <View className="item">
            <Text className="num">01</Text>
            <View className="row" />
            <Text className="text1">选择商品</Text>
            <Text className="text2">付款开团/参团</Text>
          </View>

          <View className="item">
            <Text className="num">02</Text>
            <View className="row" />
            <Text className="text1">邀请并等待</Text>
            <Text className="text2">还有支付参团</Text>
          </View>

          <View className="item">
            <Text className="num">03</Text>
            <View className="row" />
            <Text className="text1">达到人数</Text>
            <Text className="text2">顺利成团</Text>
          </View>
          <View className="line"></View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
