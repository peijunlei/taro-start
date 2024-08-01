import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './returnDetail.less';
type IReturnDetailProps = T.IProps & T.ICreditIReturnDetailState;

@connect<Partial<IReturnDetailProps>, T.ICreditIReturnDetailState>(store2Props, actions)
export default class ReturnDetail extends Component<Partial<IReturnDetailProps>, T.ICreditIReturnDetailState> {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, DetailState, isMoney, main} = this.props;

    console.log('main?', main);
    return (
      <View className="return-Detail">
        <View className="returnDetailCenter">
          <View className="title displayCenter">{title}</View>
          <View className={isMoney ? 'money displayCenter' : 'stateCenter displayCenter'}>{DetailState}</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
