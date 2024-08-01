import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './goods-item-small.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
const defaultImg = require('@/assets/image/common/default-img.png');

type IInfoProps = T.IProps & T.IInfoProps;
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class GoodsItemSmall extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      goods,
    } = this.props;
    return (
      <View className="shop-body-small">
        <Image src={goods.goodsInfo.goodsInfoImg || defaultImg} className="img" />
        <View
          className="shop-delete"
          onClick={() => {
            action.delete(goods.goodsInfo.goodsInfoId);
          }}
        >
          <Image className="left-img" src={require('../img/delete.png')} />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
