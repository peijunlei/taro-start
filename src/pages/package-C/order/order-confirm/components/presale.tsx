import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import '../css/presale.less';

type IPresaleProps = T.IProps & T.IPresaleProps;

@connect<Partial<IPresaleProps>, T.IPresaleState>(store2Props, actions)
export default class Presale extends Component<Partial<IPresaleProps>, T.IPresaleState> {
  constructor(props: IPresaleProps) {
    super(props);
  }

  render() {
    let {main = {}} = this.props;

    return (
      main.isPresale && (
        <View className="presaleConfirm">
          <Image className="warning-img" src={require('../img/presale.png')} />
          <Text className="text">预售商品，定金不支持退款，请仔细考虑后再付款哦~</Text>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
