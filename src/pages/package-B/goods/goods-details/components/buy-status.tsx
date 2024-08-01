import 'taro-ui/dist/style/components/modal.scss';
import {View, Button, Text, Image, RichText, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {AtModal} from 'taro-ui';

import * as T from '../types';
import './less/buyStatus.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import msLogo from '@/assets/image/goods/goods-detail/ms-logo.png';
import {_} from 'wmkit';
import 'taro-ui/dist/style/components/modal.scss';

type IBuyStatusProps = T.IProps & T.IBuyStatusProps;

@connect<Partial<IBuyStatusProps>, T.IBuyStatusState>(store2Props, actions)
export default class BuyStatus extends Component<Partial<IBuyStatusProps>, T.IBuyStatusState> {
  constructor(props: IBuyStatusProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  /**
    预约
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    const {preBuyInfo} = this.props;

    let ruleInfo = main.ruleContent[0] ? main.ruleContent[0].content : '';
    let appointmentSaleVO = main.appointmentSaleVO;
    return appointmentSaleVO && appointmentSaleVO.id ? (
      <View className="buyStatus">
        <View
          className="buy-info-rule"
          onClick={() => {
            this.props.actions.publicAction.fetchRule();
            this.setState({
              isShow: true,
            });
          }}
        >
          <Text>{appointmentSaleVO.appointmentType == 1 ? '开售后即可购买' : '开售后凭预约资格购买'}</Text>
          <Image src={require('../img/tag.png')} className="tag__image" />
        </View>
        <View className={`buy-step ${this.isBuyStatus(appointmentSaleVO, 1) ? 'buy-step-check' : ''}`}>
          <View className="buy-step-type">预约</View>
          <View className="buy-step-date">
            {moment(appointmentSaleVO.appointmentStartTime).format('M月DD日 HH:mm')}~
            {moment(appointmentSaleVO.appointmentEndTime).format('M月DD日 HH:mm')}
          </View>
        </View>
        <View className="line-state">
          <View className="step-line"></View>
        </View>
        <View className={`buy-step ${this.isBuyStatus(appointmentSaleVO, 2) ? 'buy-step-check' : ''}`}>
          <View className="buy-step-type">抢购</View>
          <View className="buy-step-date">
            {moment(appointmentSaleVO.snapUpStartTime).format('M月DD日 HH:mm')}~
            {moment(appointmentSaleVO.snapUpEndTime).format('M月DD日 HH:mm')}
          </View>
        </View>
        <View className="line-state">
          <View className="step-line"></View>
        </View>
        <View className="buy-step">
          <View className="buy-step-type">开始发货</View>
          <View className="buy-step-date">{moment(appointmentSaleVO.deliverTime).format('M月DD日')}</View>
        </View>
        <View
          className={this.state.isShow == false ? 'address-picker-container' : 'address-picker-container show-picker'}
        >
          <View className="picker-content">
            <View>
              <View className="picker-view-wrap">
                <ScrollView scrollY style={{height: '810rpx'}}>
                  <RichText className="text" nodes={_.formatRichText(ruleInfo) || '暂无预约规则'} />
                </ScrollView>
              </View>
            </View>
            <View
              className="cancel"
              onClick={() => {
                this.setState({isShow: false});
              }}
            >
              <Image className="close" src={require('../img/close.png')} />
            </View>
          </View>
        </View>
      </View>
    ) : (
      <View />
    );
  }
  //判断当前的预约状态
  isBuyStatus = (status, index) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;
    //如果预约开始时间在当前时间之前则代表预约中
    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);
    if (index == 1) {
      if (
        (isAppointmentStart && isAppointmentEnd) ||
        (isSnapUpStartTime && isSnapUpEndTime) ||
        (!isAppointmentEnd && !isSnapUpStartTime)
      )
        return true;
    } else if (index == 2) {
      if (isSnapUpStartTime && isSnapUpEndTime) return true;
    }
  };
}

//create by moon https://github.com/creasy2010/moon
