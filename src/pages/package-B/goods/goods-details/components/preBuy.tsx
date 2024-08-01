import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/seckill.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import {_} from 'wmkit';
type IPrebuyProps = T.IProps & T.IPrebuyProps;

@connect<Partial<IPrebuyProps>, T.IPrebuyState>(store2Props, actions)
export default class Prebuy extends Component<Partial<IPrebuyProps>, T.IPrebuyState> {
  constructor(props: IPrebuyProps) {
    super(props);
  }

  /**
    预约
*/
  render() {
    let {main, actions} = this.props;
    let appointmentSaleVO = main?.appointmentSaleVO;
    return (
      main &&
      appointmentSaleVO &&
      appointmentSaleVO.id && (
        <View className="preBuys">
          <View className="preBuys-top">
            <View className="left">{this.isBuyStatus(appointmentSaleVO)}</View>
            <View className="right">
              <View className="middle">
                {this.isBuyStatus(appointmentSaleVO) == '预约中'
                  ? '距预定结束'
                  : this.isBuyStatus(appointmentSaleVO) == '抢购中'
                  ? '距抢购结束'
                  : ''}
              </View>
              <CountDown
                allowFontScaling={false}
                numberOfLines={1}
                groupFlag={true}
                showTimeDays={true}
                serverTime={main.serverTime}
                endTime={moment(
                  this.isBuyStatus(appointmentSaleVO) == '预约中'
                    ? appointmentSaleVO.appointmentEndTime
                    : this.isBuyStatus(appointmentSaleVO) == '抢购中'
                    ? appointmentSaleVO.snapUpEndTime
                    : appointmentSaleVO.snapUpStartTime,
                )}
                timeOffset={moment(
                  this.isBuyStatus(appointmentSaleVO) == '预约中'
                    ? appointmentSaleVO.appointmentEndTime
                    : this.isBuyStatus(appointmentSaleVO) == '抢购中'
                    ? appointmentSaleVO.snapUpEndTime
                    : appointmentSaleVO.snapUpStartTime,
                )
                  .diff(moment(main.serverTime), 's')
                  .toFixed(0)}
                endHandle={async () => {
                  await actions.init(main.skuId, main.pointsGoodsId);
                  await actions.publicAction.inintGoodsInfo(main.skuId, main.pointsGoodsId);
                }}
              />
              {this.isBuyStatus(appointmentSaleVO) == '预约结束' ? (
                <View className="middle middleEnd">后开始抢购</View>
              ) : null}
            </View>
          </View>
        </View>
      )
    );
  }
  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    return result;
  };
}

//create by moon https://github.com/creasy2010/moon
