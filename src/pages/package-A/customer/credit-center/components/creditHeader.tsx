import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button} from '@wanmi/ui-taro';
import * as T from '../types';
import './creditHeader.less';
import actions from '../actions/index';
import {_} from 'wmkit';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import history from '@/assets/image/customer/credit/history.png';
import arrow from '@/assets/image/customer/credit/arrow.png';
import yiyuqi from '@/assets/image/customer/credit/yiyuqi.png';
import moment from 'dayjs';

type ICreditHeaderProps = T.IProps & T.ICreditHeaderProps;

@connect<Partial<ICreditHeaderProps>, T.ICreditHeaderState>(store2Props, actions)
export default class CreditHeader extends Component<Partial<ICreditHeaderProps>, T.ICreditHeaderState> {
  constructor(props: ICreditHeaderProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {creditInfo} = main;
    return (
      creditInfo && (
        <View className="CreditHeader">
          <View className="user-center-top-bg"></View>
          <View className="collection-boxs">
            <View className="collection-tab">
              <View className="applyMoneyName">
                <View className="moneyTitle">可用额度（元）</View>
                <View className="expireDate">到期时间 {moment(creditInfo.endTime).format('YYYY-MM-DD')}</View>
              </View>
              <View className="creditAmount">{_.addZero(creditInfo?.usableAmount + '')}</View>
              <View className="userInfo">
                <View className="userInfoStateFirst">
                  <View className="backMoneyStateTitle">总额度</View>
                  <View className="backMoneyStateNum">{_.addZero(creditInfo?.creditAmount + '')}</View>
                </View>
                <View className="userInfoState">
                  <View className="backMoneyStateTitle">已用额度</View>
                  <View className="backMoneyStateNum">{_.addZero(creditInfo?.usedAmount + '')}</View>
                </View>
                <View className="userInfoState">
                  <View className="backMoneyStateTitle payWait">
                    <View className="backMoneyStateTitle">待还款</View>
                    {(creditInfo?.expireStatus == 1 && creditInfo?.repayAmount != 0) && (
                      <View>
                        <Image className="payWaitImg" src={yiyuqi}/>
                      </View>
                    )}
                  </View>
                  <View className="backMoneyStateNum">{_.addZero(creditInfo?.repayAmount + '')}</View>
                </View>
              </View>
              <View className="creditBtn">
                <View className="creditBtnState">
                  <Button
                    type="light"
                    size="large"
                    onClick={() => {
                      if (creditInfo?.repayAmount === 0) {
                        Taro.navigateTo({url: `/pages/package-A/customer/credit-apply/index?isChangeFlag=1`});
                      } else {
                        Taro.showToast({
                          title: '全部还款完成才可变更额度',
                          icon: 'none',
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    变更额度
                  </Button>
                </View>
                <View className="creditBtnState creditBtnStateRight" onClick={() => action.onlineRepay()}>
                  <Button size="large">在线还款</Button>
                </View>
              </View>
            </View>
            <View
              className="historyState"
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/package-A/customer/credit-history/index?startTime=${encodeURIComponent(
                    encodeURIComponent(creditInfo.startTime),
                  )}&endTime=${encodeURIComponent(encodeURIComponent(creditInfo.endTime))}`,
                })
              }
            >
              <View style={{flexDirection: 'row'}}>
                <Image className="imgStateHistory" src={history}/>
                <View className="imgStateHistoryFont">历史记录</View>
              </View>
              <View>
                <Image className="imgStateArrow" src={arrow}/>
              </View>
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
