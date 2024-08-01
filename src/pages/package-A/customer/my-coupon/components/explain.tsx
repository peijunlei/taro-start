import {View, Image, ScrollView, RichText, Text, Textarea} from '@tarojs/components';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './explain.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCCompleteGifts extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      main: {couponDesc, isExplainFlag},
      actions: {action},
    } = this.props;
    return (
      <View className={isExplainFlag == false ? 'address-picker-container' : 'address-picker-container show-picker'}>
        <View className="picker-content">
          <View>
            <View className="picker-view-wrap">
              <View className="rule">使用说明</View>
              <ScrollView scrollY scrollX={false} style={{height: '810rpx'}}>
                <RichText className="explainText" nodes={_.formatRichText(couponDesc) || '暂无使用规则'} />
              </ScrollView>
            </View>
          </View>
          <View className="cancel" onClick={() => action.commonChange('main.isExplainFlag', false)}>
            <Image className="close" src={require('../img/close.png')} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
