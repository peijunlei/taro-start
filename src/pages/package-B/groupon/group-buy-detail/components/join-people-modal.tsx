import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './join-people-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
const defaultAvatar = require('@/assets/image/groupon/default-avatar.png');

type IJoinPeopleModalProps = T.IProps & T.IJoinPeopleModalProps;

@connect<Partial<IJoinPeopleModalProps>, T.IJoinPeopleModalState>(store2Props, actions)
export default class JoinPeopleModal extends Component<Partial<IJoinPeopleModalProps>, T.IJoinPeopleModalState> {
  constructor(props: IJoinPeopleModalProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="joinPeopleModal" onClick={() => action.commonChange('main.joinPeopleModal', false)}>
        <View className="container">
          {main.grouponDetails.customerVOList.map((vo, index) => {
            return <Image key={index} className="avatar" src={vo.headimgurl ? vo.headimgurl : defaultAvatar} />;
          })}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
