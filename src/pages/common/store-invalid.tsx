import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './store-invalid.less';
import invalidImg from '@/assets/image/store/invalid.png';
interface IStoreInvalidP {}

interface IStoreInvalidS {}
export default class StoreInvalid extends Component<IStoreInvalidP, IStoreInvalidS> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      //默认倒计时时间，正整数，单位：秒
      count: 0,
      //准备发送阶段;
      isDoing: false,
      textName: '获取验证码',
    };
  }

  render() {
    let {} = this.state;

    return (
      <View className="storeInvalid">
        <View className="whiteBox">
          <Image src={invalidImg} className="img" />
          <Text className="title">店铺关闭或不存在</Text>
          <View
            className="btn"
            onClick={() => {
              Taro.switchTab({
                url: '/pages/index/index',
              });
            }}
          >
            去首页
          </View>
        </View>
      </View>
    );
  }
}
