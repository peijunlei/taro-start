import { View, Button, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import PasswordInput from '@/pages/common/password-input/password-input';
import { getGlobalData } from '@/service/config';
import { _, noop } from 'wmkit';
import api from 'api';

const isIOS = getGlobalData('isIOS');

type IPasswordMaskProps = T.IProps & T.IPasswordMaskProps;

@connect<Partial<IPasswordMaskProps>, T.IPasswordMaskState>(store2Props, actions)
export default class PasswordMask extends Component<Partial<IPasswordMaskProps>, T.IHeaderState> {
  //允许组件使用外部全局样式类
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IPasswordMaskProps) {
    super(props);
    this.state = {
      isFocus: false,
      isAutoFocus: true,
      // isFocusA: true,
    };
  }

  render() {
    let {
      actions: { action },
      main,
      main: {
        balance: { balancMoney },
        password,
      },
    } = this.props;
    const { isFocus, isAutoFocus } = this.state;
    return (
      <View
        className="pass-bg"
        onClick={(e) => {
          e.stopPropagation();
          action.commonChange('main.passwordMaskShow', false);
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <View
          className="pass-show"
          style={isFocus ? { top: '35%' } : { top: '50%' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="pass-header">
            <Text className="pass-title">输入支付密码</Text>
          </View>

          <View
            className="pass-body"
            onClick={(e) => {
              e.stopPropagation();
            }}
            catchMove
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <PasswordInput
              focus={isIOS && __TARO_ENV === 'h5' ? false : isAutoFocus} //h5,ios需用户手动点击触发focus
              holdKeyboard={isAutoFocus}
              autoFocus={isAutoFocus}
              disabled={main?.payErrorTime === 3}
              toPay={(val) => {
                action.commonChange('main.password', val);
                // this.setState({password: val});
              }}
              getValue={() => { }}
              onfocus={() => this.setState({ isFocus: true })}
              onBlur={() => this.setState({ isFocus: false, isAutoFocus: true })}
            />

            <View className="password-tips">
              <Text className="password-error">
                {main?.payErrorTime === 0
                  ? ''
                  : main?.payErrorTime == 3
                    ? '账户已冻结，请30分钟后重试'
                    : `密码错误，还有${3 - main?.payErrorTime}次机会`}
              </Text>
              <Text
                className="forget-pass"
                onClick={async () => {
                  await Taro.navigateTo({ url: `/pages/package-A/customer/user-pay/index?forget=${true}` });
                }}
              >
                忘记密码
              </Text>
            </View>
          </View>

          <View className="pass-btn">
            <View
              className="pass-cancel"
              onClick={async (e) => {
                e.stopPropagation();
                action.commonChange('main.password', null);
                action.commonChange('main.passwordMaskShow', false);
                action.commonChange('main.payErrorTime', 0);
                action.commonChange('main.isSubmit', false);
              }}
            >
              取消
            </View>
            <View className={password ? 'pass-true' : 'pass-false'} onTouchStart={this.submit.bind(this)}>
              提交
            </View>
          </View>
        </View>
      </View>
    );
  }
  submit = async (e) => {
    let {
      actions: { action },
      main: {
        balance: { balancMoney },
        tradePrice,
        checkedBalance,
        comPayType,
        password,
      },
    } = this.props;
    let isWeixin = _.isWeixin();
    e.stopPropagation();
    // 如果组合支付
    if (checkedBalance) {
      const type = __TARO_ENV == 'h5' ? 'H5' : 'MINI';
      const payInfo = await api.payController.items(type);
      const openPayList = payInfo.reduce((a, b) => (b.isOpen && a.push(b.channel), a), []);
      if (!~openPayList.indexOf('Balance')) {
        Taro.showToast({
          title: '支付失败，余额支付功能已关闭，请选择其他支付方式!',
          icon: 'none',
          duration: 2000,
        });
        // 重新初始化
        const params = getCurrentInstance().router.params;
        const stringContext = decodeURIComponent(
          params.param || '',
        ),
          tid = params.tid,
          // 从订单列表和订详情页面过来支付的，要带上isBookingSaleGoods这个标识，没法依赖接口，返回的都是null
          isBookingSaleGoods = params.isBookingSaleGoods,
          ordersource = params,
          context = stringContext && JSON.parse(stringContext);
        await this.props.actions.init(tid, context, isBookingSaleGoods, ordersource);
        await action.commonChange('main.passwordMaskShow', false);
        action.commonChange('main.password', null);
        return;
      }
      action.commonChange('main.isSubmit', true);
      if (password) {
        try {
          await action.checkPayPassWord(password);
          //设置支付状态加载中
          await action.commonChange('main.passwordMaskShow', false);
          await action.commonChange('main.paying', true);
          if (comPayType === 'WeChat') {
            await action.weChatpay(isWeixin, password);
          } else if (comPayType === 'Alipay') {
            await action.alipay();
          } else if (comPayType === 'unionpay_b2b_unionPay') {
            await action.unionPay();
          }
          action.commonChange('main.isSubmit', false);
          await action.commonChange('main.paying', false);
        } catch (e) {
        console.log('组合支付2',e);

          await action.commonChange('main.paying', false);
          if (e.code == 'K-010204') {
            Taro.hideToast();
          }
          action.commonChange('main.isSubmit', false);
          const { payErrorTime } = await api.customerBaseController.getLoginCustomerInfo();
          await action.commonChange('main.payErrorTime', payErrorTime);
          // 订单已支付
          if (e.code == 'K-100203') {
            await action.commonChange('main.passwordMaskShow', false);
            await action.setConfirm('1', undefined, undefined, undefined);
          }
        }
        action.commonChange('main.password', null);
      }
    } else {
      action.commonChange('main.isSubmit', true);
      if (password) {
        await action.checckPayPwd(password);
        action.commonChange('main.password', null);
      }
    }
  };
}

//create by moon https://github.com/creasy2010/moon
