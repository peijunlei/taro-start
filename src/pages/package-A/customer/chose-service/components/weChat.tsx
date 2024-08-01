import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import weChatImg from '@/assets/image/common/weChat.png';
import arrowImg from '@/assets/image/common/arrow.png';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  /**
   * wx客服
   */
  render() {
    return (
      <View className="list">
        <View className="service-list">
          <View
            className="item"
            onClick={() => {
              this.wechatCustomer();
            }}
          >
            <View className="service_list_item">
              <Image src={weChatImg} className="icon-item" />
              <Text>微信客服</Text>
            </View>
            <Image src={arrowImg} className="arrow" />
          </View>
        </View>
      </View>
    );
  }

  wechatCustomer = async () => {
    const {serviceUrl, enterpriseId} = this.props;
    wx.openCustomerServiceChat({
      extInfo: {url: serviceUrl},
      corpId: enterpriseId,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
