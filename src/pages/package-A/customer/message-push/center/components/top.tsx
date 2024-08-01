import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './top.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

const tip = require('@/assets/image/message/mess-icon.png');
const tipClose = require('@/assets/image/message/mess-close.png');
const iconOne = require('@/assets/image/message/icon-one.png');
const iconTwo = require('@/assets/image/message/icon-two.png');
type ITopProps = T.IProps & T.ITopProps;

@connect<Partial<ITopProps>, T.ITopState>(store2Props, actions)
export default class Top extends Component<Partial<ITopProps>, T.ITopState> {
  constructor(props: ITopProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="mes-top">
        <View
          className="tip-top"
          onClick={async () => {
            if (main?.noticeNum !== 0 || main?.preferentialNum !== 0) {
              await action.setMessageAllRead();
            }
          }}
        >
          <Text className="num-tip">设为已读</Text>
          {main?.noticeNum && main?.noticeNum !== 0 ? (
            <Image src={tip} className="tip-icon" />
          ) : (
            <Image src={tipClose} className="tip-icon" />
          )}
          {/* <Image src={tip} className="tip-icon" /> */}
        </View>

        <View className="tip-tab">
          <View
            className={['tab-item', 'tab-item-border'].join(' ')}
            onClick={async () => {
              await Taro.navigateTo({url: `/pages/package-A/customer/message-push/list/index?messageType=1`});
            }}
          >
            <Image src={iconOne} className="tab-icon" />
            <Text className="item-text">服务通知</Text>
            {main?.noticeNum !== 0 && (
              <View className="item-num-con">
                <Text className="item-num">{main?.noticeNum}</Text>
              </View>
            )}
          </View>
          <View
            className="tab-item"
            onClick={async () => {
              await Taro.navigateTo({url: `/pages/package-A/customer/message-push/list/index?messageType=0`});
            }}
          >
            <Image src={iconTwo} className="tab-icon" />
            <Text className="item-text">优惠促销</Text>
            {main?.preferentialNum !== 0 && (
              <View className="item-num-con">
                <Text className="item-num">{main?.preferentialNum}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
