import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import api from 'api';
import FormSelect from '@/pages/common/form-select';
import './index.less';

export default class UserFinance extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  async componentDidShow() {
    let result = (await api.payBaseController.queryUnionB2bConfig()) as any;
    this.setState({
      isOpen: result.payGateway.isOpen,
    });
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
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

  render() {
    return (
      <View
        className="user-finance"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <View className="form">
          <FormSelect
            labelName="银行账户"
            placeholder={''}
            leftStyle={{fontSize: '28rpx', padding: '8rpx 0'}}
            onClick={() => {
              Taro.navigateTo({url: `/pages/package-A/customer/bank-accounts/index`});
            }}
            iconVisible={true}
          />
          <FormSelect
            labelName="增票资质"
            placeholder={''}
            leftStyle={{fontSize: '28rpx', padding: '8rpx 0'}}
            onClick={() => {
              Taro.navigateTo({url: `/pages/package-A/customer/user-invoice/index`});
            }}
            iconVisible={true}
          />
          {this.state.isOpen ? (
            <FormSelect
              labelName="财务邮箱"
              placeholder={''}
              leftStyle={{fontSize: '28rpx', padding: '8rpx 0'}}
              onClick={() => {
                Taro.navigateTo({url: `/pages/package-A/customer/finance-email/index`});
              }}
              iconVisible={true}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
