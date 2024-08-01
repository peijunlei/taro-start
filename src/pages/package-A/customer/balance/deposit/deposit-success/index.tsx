import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import './index.less';
import success from '@/assets/image/common/success.png';
import {_} from 'wmkit';
import api from 'api';
import {CustomerDrawCashVO3} from 'api/CustomerDrawCashController';
import {getGlobalData} from '@/service/config';

const isIphoneX = getGlobalData('isIphoneX');
export default class DepositSuccess extends Component<any, any> {
  async componentWillMount() {
    await this.init();
  }
  state = {
    customerDrawCashVO: {},
  } as {
    customerDrawCashVO: CustomerDrawCashVO3;
  };

  render() {
    const {customerDrawCashVO} = this.state;
    return (
      <View className="packageCOrderFillPaymentSuccess">
        <View className="returnS-info">
          <Image className="success" src={success} />
          <Text className="stext bold">提现申请成功</Text>
          <View className="returnS-info">
            <Text className="stips">请等待管理员审核，预计1～3个工作日完成</Text>
          </View>
        </View>

        <View className="slist">
          <View className="sitem-text no-bottom">提现单号：{customerDrawCashVO.drawCashNo}</View>
          <View className="sitem sitem-text no-top no-bottom">
            提现金额：
            <Text className="price bold">¥{_.addZero(customerDrawCashVO.drawCashSum)}</Text>
          </View>
        </View>
        <View className={isIphoneX ? 'bt-box ios-bottom' : 'bt-box'}>
          <View className="bt-contain" style={{position: 'relative', bottom: '-20px'}}>
            <View
              className="bt-item"
              onClick={async () => {
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/balance/deposit/deposit-detail/index?drawCashId=${customerDrawCashVO.drawCashId}`,
                });
              }}
            >
              查看提现申请
            </View>
            <View
              className="bt-item"
              onClick={async () => {
                await Taro.switchTab({url: '/pages/index/index'});
              }}
            >
              返回首页
            </View>
          </View>
        </View>
      </View>
    );
  }

  init = async () => {
    let drawCashId = getCurrentInstance().router.params.drawCashId;
    const {customerDrawCashVO} = await api.customerDrawCashController.detail(drawCashId);
    this.setState({customerDrawCashVO});
  };
}

//create by moon https://github.com/creasy2010/moon
