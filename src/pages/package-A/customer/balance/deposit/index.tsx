import 'taro-ui/dist/style/components/modal.scss';
import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import defaultCustomer from '@/assets/image/customer/user-center/default-wechat.png';
import {Const} from 'config';
import {_} from 'wmkit';
import PasswordMask from './components/password-mask';
import {Input} from '@wanmi/ui-taro';
import Mask from './components/mask'

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerBalanceDeposit extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await this.props.actions.init();
  }

  async onPullDownRefresh() {
    await this.props.actions.init();
    await Taro.stopPullDownRefresh();
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
  async componentWillUnmount() {
    await this.props.actions.clean();
    if (__TARO_ENV === 'h5') {
      Taro.navigateBack({
        delta: 1,
      });
    }
  }

  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {passwordMaskShow, use = {}, cash = {}, customerDrawCashAddRequest = {}} = main;
    const {nickName, headimgurl} = use;
    const {inputMoney} = cash;
    const {drawCashRemark} = customerDrawCashAddRequest;

    const canDrawCash = this._getCanDrawCash(cash);
    const placeholder = `本次最多提现¥${canDrawCash}`;
    return (
      <View className="packageACustomerBalanceDeposit">
        <View className="deposit-con">
          <View className="deposit-header">
            <Image className="icon" src={headimgurl ? headimgurl : defaultCustomer} />
            <Text className="title">{nickName}</Text>
          </View>
          <View className="deposit-content">
            <View className="item">
              <Input
                type="digit"
                label="提现金额"
                underline={false}
                placeholder={placeholder}
                defaultValue={inputMoney > 0 ? inputMoney + '' : null}
                onInput={({detail: {value}}) => {
                  this._inputChange(value);
                }}
              />

              <Text
                className="check-all"
                onClick={() => {
                  action.commonChange('main.cash.inputMoney', canDrawCash);
                }}
              >
                全部提现
              </Text>
            </View>

            <View className="item">
              <Input
                placeholder="(非必填)最多输入50字"
                maxlength={50}
                underline={false}
                label="备注"
                defaultValue={drawCashRemark}
                onInput={({detail: {value}}) => {
                  action.commonChange('main.customerDrawCashAddRequest.drawCashRemark', value);
                  return value;
                }}
              />
              <Text className="check-all" style={{opacity: '0'}}>
                全部提现
              </Text>
            </View>

            <View
              className="commite-btn"
              onClick={async () => {
                await action._paymentPass();
              }}
            >
              <Text className="text">提交</Text>
            </View>
          </View>
        </View>

        {passwordMaskShow && <PasswordMask />}
        <Mask />
      </View>
    );
  }
  _inputChange = (value) => {
    const val = Number(value);
    //@ts-ignore
    const isNaN = Number.isNaN(val);
    if (isNaN) {
      this.props.actions.action.commonChange('main.cash.inputMoney', 0);
      return;
    }
    this.props.actions.action.commonChange('main.cash.inputMoney', value);
  };
  _getCanDrawCash = (cash) => {
    const {money, alreadyDrawCash} = cash;
    // 提现上限
    const maxLimit = money > Const.MAX_DRAW_CASH ? Const.MAX_DRAW_CASH : money;
    // 可提现金额，余额小于限定金额10000，则是余额，否则取限定金额
    let canDrawCash = maxLimit;
    if (alreadyDrawCash) {
      // 已提现金额 < 最大限额
      if (alreadyDrawCash < Const.MAX_DRAW_CASH) {
        // 剩余可提现金额 =（最大限额 - 已提现金额）
        let restDrawCash = _.sub(Const.MAX_DRAW_CASH, alreadyDrawCash);
        canDrawCash = maxLimit > restDrawCash ? restDrawCash : maxLimit;
      } else {
        canDrawCash = 0;
      }
    }
    return canDrawCash;
  };
}
