import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './reapy-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import alipay from '../img/alipay.png';
import weapp from '../img/wechat.png';
import api from 'api';
import {_} from 'wmkit';

import arrow from '@/assets/image/common/arrow.png';
type IReapyListProps = T.IProps & T.IReapyListProps;
//@ts-ignore
const isH5 = __TARO_ENV === 'h5';
//@ts-ignore
const isWechatShow = __TARO_ENV === 'h5' || __TARO_ENV === 'weapp';
//@ts-ignore
const isAlipayShow = __TARO_ENV === 'h5' || __TARO_ENV === 'alipay';
@connect<Partial<IReapyListProps>, T.IReapyListState>(store2Props, actions)
export default class ReapyList extends Component<Partial<IReapyListProps>, T.IReapyListState> {
  constructor(props: IReapyListProps) {
    super(props);
  }

  static defaultProps = {
    main: {
      payItems: [],
    },
  };

  /**

*/
  render() {
    let {main} = this.props;
    if (!main) {
      return <View />;
    }
    let {
      main: {payItems},
    } = this.props;
    let weChatItem = payItems.filter((item) => item.channel === 'WeChat');
    let alipayItem = payItems.filter((item) => item.channel === 'Alipay');
    let showWeChat = weChatItem.length > 0;
    let showAlipay = alipayItem.length > 0;

    let isWeixin = _.isWeixin();
    return (
      <View className="reapyList">
        {isWechatShow && showWeChat ? (
          <View
            className="pay-item"
            onClick={async () => {
              await this._weChatpay(isWeixin);
            }}
          >
            <View className="left-pay">
              <Image src={weapp} className="pay-icon" />
              <Text className="pay-title">微信支付</Text>
            </View>
            <View className="right-pay">
              <Image src={arrow} className="arrow-icon" />
            </View>
          </View>
        ) : null}

        {isAlipayShow && showAlipay ? (
          <View
            className="pay-item"
            onClick={async () => {
              await this._alipay();
            }}
          >
            <View className="left-pay">
              <Image src={alipay} className="pay-icon" />
              <Text className="pay-title">支付宝支付</Text>
            </View>
            <View className="right-pay">
              <Image src={arrow} className="arrow-icon" />
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  _alipay = async () => {
    const action = this.props.actions.action;
    await action.zhifubaoRePay();
  };
  _weChatpay = async (isWeixin) => {
    const action = this.props.actions.action;
    if (isH5) {
      // 普通浏览器内，使用wx_mweb支付
      if (!isWeixin) {
        await action.goToWeixinWebRePay();
      } else {
        // 微信浏览器内，使用js_api支付
        await action.getWXRePayJSApi();
      }
    } else {
      // 小程序内的支付
      Taro.login({
        async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
          if (res.code) {
            let openid;
            try {
              openid = await api.payController.getLittleProgramOpenId(res.code);
            } catch (e) {
              Taro.showToast({
                title: '功能不可用',
                icon: 'none',
                duration: 2000,
              });
              return;
            }
            await action.goToWeixinRePay(openid);
          } else {
            console.log('PayList_获取code失败！' + res.errMsg);
          }
        },
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
