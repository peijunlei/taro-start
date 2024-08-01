import {View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './returnDetail.less';

const iconImage = require('@/assets/image/customer/credit/arrow.png');

type IRepayingItemProps = T.IProps & T.IRepayingItemProps;

@connect<Partial<IRepayingItemProps>, T.IRepayingItemState>(store2Props, actions)
export default class ReturnDetail extends Component<Partial<IRepayingItemProps>, T.IRepayingItemState> {
  constructor(props) {
    super(props);
  }
  render() {
    let {title, DetailState, isMoney, isColor, icon, onClick} = this.props;
    return (
      <View className="return-Detail" onClick={() => onClick()}>
        <View className="returnDetailCenter">
          <View className={'title displayCenter'}>{title}</View>
          <View
            className={isMoney ? 'money displayCenter' : 'stateCenter displayCenter'}
            style={{color: isColor ? '#FF6600' : 'rgba(0, 0, 0, 0.8)'}}
          >
            <View
              className={icon ? 'detail-icon' : 'displayCenter'}
              style={{color: isColor ? '#FF6600' : 'rgba(0, 0, 0, 0.8)'}}
            >
              {DetailState}
              {icon && (
                <View className="iconImage">
                  <Image src={iconImage} className="image" mode="widthFix" />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
