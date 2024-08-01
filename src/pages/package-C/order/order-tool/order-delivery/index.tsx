import {Image, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import IconOne from './img/icon-one.png';
import IconTwo from './img/icon-two.png';
import IconThree from './img/icon-three.png';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderToolOrderDelivery extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    const type = (await Taro.getStorageSync('mini::deliveryType')) || 0;
    this.setState({type});
    await this.props.actions.init();
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  state = {
    type: 0,
  };

  render() {
    let {
      actions: {action},
      main: {payWay},
    } = this.props;

    const {type} = this.state;
    return (
      <View className="packageCOrderOrderToolOrderDelivery">
        <View className="delivery-con">
          <Text className="delivery-title">支付方式</Text>
          {payWay &&
            payWay.map((way, index) => {
              return (
                <View
                  key={index}
                  className="delivery-item"
                  onClick={() => {
                    this.setState({type: way.id});
                  }}
                >
                  <View className="delivery-left">
                    <Image src={way.id === 0 ? IconOne : IconTwo} className="pay-icon" />
                    <Text className="pay-text">{way.name}</Text>
                  </View>
                  <Image src={type === way.id ? check : uncheck} className="pay-icon" />
                </View>
              );
            })}
        </View>
        <View className="delivery-con">
          <Text className="delivery-title">配送方式</Text>
          <View className="delivery-item">
            <View className="delivery-left">
              <Image src={IconThree} className="pay-icon" />
              <Text className="pay-text">快递</Text>
            </View>
            <Image src={check} className="pay-icon" />
          </View>
        </View>

        <View className="pay-order-con">
          <View
            className="pay-order-con-btn"
            onClick={async () => {
              await Taro.setStorageSync('mini::deliveryType', type);
              await Taro.navigateBack();
            }}
          >
            <Text className="pay-order-con-text">确定</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
