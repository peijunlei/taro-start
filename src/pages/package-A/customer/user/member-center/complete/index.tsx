import {View, Image, ScrollView, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCCompleteGifts extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main: {flag, pointsRule},
      actions: {action},
    } = this.props;
    return (
      <View
        className={flag == false ? 'address-picker-container' : 'address-picker-container show-picker'}
        onClick={(e) => {
          e.stopPropagation();
          action.commonChange('main.flag', false);
        }}
      >
        <View
          className="picker-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View>
            <View className="picker-view-wrap">
              <View className="rule">积分规则</View>
              <ScrollView scrollY style={{height: '810rpx'}}>
                <RichText className="text" nodes={_.formatRichText(pointsRule) || '暂无积分规则'} />
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
