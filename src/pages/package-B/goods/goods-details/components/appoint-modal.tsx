import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {Config} from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './less/appoint-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dhIcon from '@/assets/image/goods/goods-detail/dh-icon.png';
import {_} from 'wmkit';
type IAppointModalProps = T.IProps & T.IAppointModalProps;

@connect<Partial<IAppointModalProps>, T.ISeckillState>(store2Props, actions)
export default class AppointModal extends Component<Partial<IAppointModalProps>, T.IAppointModalState> {
  constructor(props: IAppointModalProps) {
    super(props);
  }

  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    return (
      <View
        className="AppointModal"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
      >
        <View className="whiteBox">
          <View className="topBox">
            <Image src={dhIcon} className="icon" />
            <Text className="title">预约成功</Text>
            <Text className="tips">可前往我的-预约查看预约记录</Text>
          </View>
          <View
            className="btn"
            onClick={() => {
              publicAction.commonChange('main.isAppointFlag', false);
            }}
          >
            确定
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
