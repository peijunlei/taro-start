import {View, Image, ScrollView, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerUserComplete extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main: {flag, basicRules},
      actions: {action},
    } = this.props;
    const growthPicture = `<style>img {max-width: 280px} </style>`;
    basicRules = growthPicture + basicRules;
    return (
      <View className={flag == false ? 'address-picker-container' : 'address-picker-container show-picker'}>
        <View className="picker-content">
          <View>
            <View className="picker-view-wrap">
              <View className="rule">成长值规则</View>
              <ScrollView scrollY style={{height: '810rpx'}}>
                <RichText className="text growthPicture" nodes={basicRules} />
              </ScrollView>
            </View>
          </View>
          <View className="cancel" onClick={() => action.commonChange('main.flag', !flag)}>
            <Image className="close" src={require('../img/close.png')} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
