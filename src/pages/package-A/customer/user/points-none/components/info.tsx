import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import cartEmpty from '@/assets/image/common/cart-empty.png';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
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
      <View className="empty-cart-fa">
        <Image className="empty-image" src={cartEmpty} />
        <Text className="empty-text">积分商城已关闭</Text>
        <View
          className="goods-btn"
          onClick={() =>
            WMkit.inviteeId() && WMkit.channelType() == '2'
              ? Taro.navigateTo({
                url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
              })
              : Taro.switchTab({
                url: '/pages/index/index',
              })
          }
        >
          <Text className="goods-btn-text">去首页</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
