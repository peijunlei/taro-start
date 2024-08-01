import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/presale.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import {_} from 'wmkit';
type IPresaleProps = T.IProps & T.IPresaleProps;

@connect<Partial<IPresaleProps>, T.IPresaleState>(store2Props, actions)
export default class Prebuy extends Component<Partial<IPresaleProps>, T.IPresaleState> {
  constructor(props: IPresaleProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //结束时间不变时不重新渲染
    if (nextProps.presaleInfo == this.props.presaleInfo) {
      return false;
    }
    return true;
  }

  /**
    预售
*/
  render() {
    let {
      actions: {publicAction, init},
      main,
    } = this.props;
    const {presaleInfo} = this.props;
    const {bookingType, bookingSaleGoods} = presaleInfo;
    let endTime;

    //全款预售
    if (bookingType == 0) {
      endTime = presaleInfo.bookingEndTime;
    }
    //定金预售取定金支付结束时间
    else if (bookingType == 1) {
      endTime = presaleInfo.handSelEndTime;
    }
    return (
      main &&
      this.isPresaleStatus(presaleInfo) && (
        <View className="presale">
          <View className="presale-top">
            <View className="left">预定中</View>
            <View className="right">
              <View style={{flexDirection: 'row'}}>
                <View className="middle">距预定结束</View>
                <View>
                  <CountDown
                    allowFontScaling={false}
                    numberOfLines={1}
                    groupFlag={true}
                    showTimeDays={true}
                    endHandle={async () => {
                      await init(main?.skuId, '');
                      await publicAction.inintGoodsInfo(main.skuId, '');
                    }}
                    serverTime={main.serverTime}
                    endTime={moment(endTime)}
                    timeOffset={moment(endTime)
                      .diff(moment(main.serverTime), 's')
                      .toFixed(0)}
                  />
                </View>
              </View>
            </View>
          </View>
          {bookingSaleGoods.bookingCount && (
            <View className="presale-bottom">{`限量发售${bookingSaleGoods.bookingCount}件 售完为止`}</View>
          )}
        </View>
      )
    );
  }
  //判断当前的预约状态
  isPresaleStatus = (item) => {
    const {bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime} = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }

    return isBetween;
  };
}

//create by moon https://github.com/creasy2010/moon
