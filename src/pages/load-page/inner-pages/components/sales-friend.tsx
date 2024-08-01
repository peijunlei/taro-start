import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './sales-friend.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {cache} from 'config';
import FormSelect from '@/pages/common/form-select';
import {_, wxAuth} from 'wmkit';
import Price from '@/pages/common/goods/price';

import eye from '@/assets/image/distribution/eye.png';
import eyeClose from '@/assets/image/distribution/eye-close.png';
import arrow from '@/assets/image/common/arrow.png';
import arrow2 from '@/assets/image/distribution/arrow2.png';

type ISalesFriendProps = T.IProps & T.ISalesFriendProps;

@connect<Partial<ISalesFriendProps>, T.ISalesFriendState>(store2Props, actions)
export default class SalesFriend extends Component<Partial<ISalesFriendProps>, T.ISalesFriendState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props) {
    super(props);
    // 小眼睛显示还是隐藏
    this.state = {showFlag: true};
  }
  componentDidMount() {
    let showFlag = Taro.getStorageSync(cache.MY_PERFORMANCE);
    this.setState({showFlag: showFlag});
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {yesterdayPerformance, monthPerformance, customerBalance},
    } = this.props;
    const {showFlag} = this.state;

    return (
      <View className="salesFriend">
        <View className="bar">
          <View className="left">
            <Text className="fs32 c333" style={{fontWeight: 'bold'}}>
              我的销售业绩
            </Text>
            <Image
              onClick={() => {
                this._onEyeClick();
              }}
              src={showFlag ? eye : eyeClose}
              className="eye"
            />
          </View>
          <View
            className="right"
            onClick={() => Taro.navigateTo({url: '/pages/package-B/distribution/promote-order-list/index'})}
          >
            <Text className="fs24 c999">推广订单</Text>
            <Image src={arrow} className="arrow" />
          </View>
        </View>
        <View className="numbers">
          <View
            className="item"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/sales/sales-perform/index`,
              });
            }}
          >
            <Text className="number">{showFlag ? `￥${yesterdayPerformance.saleAmount || '0.00'}` : '***'}</Text>
            <Text className="fs20 c999">昨日销售额</Text>
          </View>
          <View
            className="item"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/sales/sales-perform/index`,
              });
            }}
          >
            <Text className="number"> {showFlag ? `￥${yesterdayPerformance.commission || '0.00'}` : '***'}</Text>
            <Text className="fs20 c999">昨日预估收益</Text>
          </View>
          <View
            className="item"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/sales/sales-perform/index`,
              });
            }}
          >
            <Text className="number">
              {' '}
              {showFlag ? `￥${(monthPerformance && monthPerformance.saleAmount) || '0.00'}` : '***'}
            </Text>
            <Text className="fs20 c999">本月销售额</Text>
          </View>
          <View
            className="item"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/sales/sales-perform/index`,
              });
            }}
          >
            <Text className="number">
              {' '}
              {showFlag ? `￥${(monthPerformance && monthPerformance.commission) || '0.00'}` : '***'}
            </Text>
            <Text className="fs20 c999">本月预估收益</Text>
          </View>
        </View>
        <Button
          className="deposit-btn"
          openType="getUserInfo"
          onGetUserInfo={_.getUserInfo}
          onClick={async () => {
            // 微信浏览器内
            if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
              // 重定向
              let url = location.href;
              wxAuth.getAuth(url.split('?')[0], 'deposit');
              // Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
            }
          }}
        >
          <View className="block">
            <View className="left">
              <View className="price-style">
                <Text className="fs20">账户金额：</Text>
              </View>
              <Price
                price={customerBalance.accountBalanceTotal ? _.fmoney(customerBalance.accountBalanceTotal, 2) : '0.00'}
              />
            </View>
            <View className="right">
              <Text className="fs24">立即提现</Text>
              <Image src={arrow2} className="arrow" />
            </View>
          </View>
        </Button>
      </View>
    );
  }
  /**
   * 改变当前页销售数据显示
   * @private
   */
  _onEyeClick = () => {
    const {showFlag} = this.state;
    this.setState({showFlag: !showFlag});
    Taro.setStorageSync(cache.MY_PERFORMANCE, !showFlag);
  };
}

//create by moon https://github.com/creasy2010/moon
