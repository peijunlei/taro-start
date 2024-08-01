import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './appoint-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dhIcon from '@/assets/image/common/qq-error.png';
import {_} from 'wmkit';
type IAppointModalProps = T.IProps & T.IAppointModalProps;

@connect<Partial<IAppointModalProps>, T.IAppointModalState>(store2Props, actions)
export default class AppointModal extends Component<Partial<IAppointModalProps>, T.IAppointModalState> {
  constructor(props: IAppointModalProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="AppointModal">
        <View className="whiteBox">
          <View className="topBox">
            <Image src={dhIcon} className="icon" />
            <Text className="tips">暂未安装手机QQ，无法打开</Text>
            <Text className="tips">请先安装</Text>
          </View>
          <View
            className="btn"
            onClick={() => {
              action.commonChange('main.isAppointFlag', false);
            }}
          >
            我知道啦
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
