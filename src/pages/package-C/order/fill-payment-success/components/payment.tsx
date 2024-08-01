import {Image, Picker, Text, Textarea, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './payment.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import plus from '@/assets/image/order/plus.png';
import WMButton from '@/pages/common/button';
import {cache} from 'config';
import moment from 'dayjs';
import WMFormInput from '@/pages/common/form-input';

import remind from '@/assets/image/common/remind.png';
import close from '@/assets/image/common/black-close.png';
import arrowImg from '@/assets/image/common/arrow.png';
type IPaymentProps = T.IProps & T.IPaymentProps;

@connect<Partial<IPaymentProps>, T.IPaymentState>(store2Props, actions)
export default class Payment extends Component<Partial<IPaymentProps>, T.IPaymentState> {
  constructor(props: IPaymentProps) {
    super(props);
    this.state = {
      timeList: [],
      timeIndex: [],
    };
  }

  setPickerTime() {
    let yearList = [];
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    for (let i = year - 10; i <= year + 10; i++) {
      yearList.push(i);
    }
    let monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let dayList = [];
    let dayI = 31;
    if (![1, 3, 5, 7, 8, 10, 12].includes(month)) {
      dayI = 30;
    }
    if (month === 2) {
      if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
        dayI = 29;
      } else {
        dayI = 28;
      }
    }
    for (let i = 1; i <= dayI; i++) {
      if (i < 10) {
        dayList.push('0' + i);
      } else {
        dayList.push(i);
      }
    }
    let hourList = [];
    for (let i = 0; i < 25; i++) {
      if (i < 10) {
        hourList.push('0' + i);
      } else {
        hourList.push(i);
      }
    }
    let minuteList = [];
    for (let i = 0; i < 61; i++) {
      if (i < 10) {
        minuteList.push('0' + i);
      } else {
        minuteList.push(i);
      }
    }
    let secondList = [];
    for (let i = 0; i < 61; i++) {
      if (i < 10) {
        secondList.push('0' + i);
      } else {
        secondList.push(i);
      }
    }
    let yIndex = yearList.findIndex((y) => y === year);
    let mIndex = monthList.findIndex((y) => parseInt(y) === month);
    let dIndex = dayList.findIndex((y) => y === day);
    let hIndex = hourList.findIndex((y) => y === hour);
    let mmIndex = minuteList.findIndex((y) => y === minute);
    let sIndex = secondList.findIndex((y) => y === second);
    this.setState({
      timeList: [yearList, monthList, dayList, hourList, minuteList, secondList],
      timeIndex: [yIndex, mIndex, dIndex, hIndex, mmIndex, sIndex],
    });
  }

  static options = {addGlobalClass: true};

  componentDidMount() {
    let {
      actions: {
        action: {setSelectedAccount},
      },
    } = this.props;
    setSelectedAccount();
    this.setPickerTime();
  }

  /**

   */
  render() {
    let {
      actions: {
        action: {commonChange, _chooseImage, applyPay},
      },
      main,
    } = this.props;
    return (
      <View className="payment">
        <View className="payment-tip">
          <Image src={remind} className="remind" />
          <Text className="payment-tip-text">若您已线下支付，请在此填写付款单</Text>
        </View>
        <View className="from-select">
          <Text className="select-label">商家收款账号</Text>
          <Text
            className={main?.sellerAccount && JSON.stringify(main?.sellerAccount) !== '{}' ? 'value bold' : 'fs28 c999'}
            style={{flex: 1}}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-C/order/seller-account/index?tid=${main?.tid}`,
              });
            }}
          >
            {main?.sellerAccount && JSON.stringify(main?.sellerAccount) !== '{}'
              ? main?.sellerAccount.bankName + main?.sellerAccount.bankNo
              : '点击选择商家的收款账号'}
          </Text>
          <Image className="arrow" src={arrowImg} />
        </View>
        <View className="from-select">
          <Text className="select-label">付款时间</Text>
          <View className="value">
            <Picker
              className="picker"
              mode="multiSelector"
              range={this.state?.timeList}
              value={this.state?.timeIndex}
              onColumnChange={(e) => this.handleColChange(e)}
              onChange={(e) => this.chooseChange(e.detail.value)}
            >
              <View className={main?.time ? 'fs28 c333 bold' : 'fs28 c999'}>
                {main?.time ? main?.time : '点击选择付款时间'}
              </View>
            </Picker>
          </View>
          <Image className="arrow" src={arrowImg} />
        </View>
        <View className="upload">
          <Text className="upload-title">附件</Text>
          <View className="enclosure">
            <Image
              onClick={async () => {
                await _chooseImage();
              }}
              className="plus"
              src={main?.payOrder?.encloses ? main?.payOrder?.encloses : plus}
            />
            {main?.payOrder?.encloses && (
              <Image
                src={close}
                className="close-pic"
                onClick={() => {
                  commonChange('main.payOrder.encloses', '');
                  Taro.removeStorageSync(cache.PAYMENT_ENCLOSES);
                }}
              />
            )}
          </View>
          <Text className="tips">上传订单付款凭证，如汇款单等</Text>
          <Text className="tips"> 仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M</Text>
        </View>
        <View className="extra-wrap">
          <WMFormInput
            label="备注"
            type="text"
            placeholder="点击此处输入付款说明（100字以内）"
            value={main?.remark}
            onChange={(e) => {
              commonChange('main.remark', e.detail.value);
              Taro.setStorageSync(cache.PAYMENT_REMARK, e.detail.value);
            }}
            maxlength={100}
            underline={false}
          />
        </View>
        <View
          className="bottom"
          onClick={() => {
            applyPay();
          }}
        >
          <WMButton size="large" theme="primary">
            提交
          </WMButton>
        </View>
      </View>
    );
  }

  chooseChange(value) {
    let {
      actions: {action},
    } = this.props;
    const allTime = this.state.timeList;
    console.log('allltime', allTime);
    let time =
      allTime[0][value[0]] +
      '-' +
      allTime[1][value[1]] +
      '-' +
      allTime[2][value[2]] +
      ' ' +
      allTime[3][value[3]] +
      ':' +
      allTime[4][value[4]] +
      ':' +
      allTime[5][value[5]];
    const now = new Date();
    if (moment(moment(time)).isAfter(now)) {
      let yearList = [];

      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      for (let i = year - 10; i <= year + 10; i++) {
        yearList.push(i);
      }
      let monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      let dayList = [];
      let dayI = 31;
      if (![1, 3, 5, 7, 8, 10, 12].includes(month)) {
        dayI = 30;
      }
      if (month === 2) {
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
          dayI = 29;
        } else {
          dayI = 28;
        }
      }
      for (let i = 1; i <= dayI; i++) {
        if (i < 10) {
          dayList.push('0' + i);
        } else {
          dayList.push(i);
        }
      }
      let hourList = [];
      for (let i = 0; i < 25; i++) {
        if (i < 10) {
          hourList.push('0' + i);
        } else {
          hourList.push(i);
        }
      }
      let minuteList = [];
      for (let i = 0; i < 61; i++) {
        if (i < 10) {
          minuteList.push('0' + i);
        } else {
          minuteList.push(i);
        }
      }
      let secondList = [];
      for (let i = 0; i < 61; i++) {
        if (i < 10) {
          secondList.push('0' + i);
        } else {
          secondList.push(i);
        }
      }
      let yIndex = yearList.findIndex((y) => y === year);
      let mIndex = monthList.findIndex((y) => parseInt(y) === month);
      let dIndex = dayList.findIndex((y) => y === day);
      let hIndex = hourList.findIndex((y) => y === hour);
      let mmIndex = minuteList.findIndex((y) => y === minute);
      let sIndex = secondList.findIndex((y) => y === second);
      this.setState({
        timeList: [yearList, monthList, dayList, hourList, minuteList, secondList],
        timeIndex: [yIndex, mIndex, dIndex, hIndex, mmIndex, sIndex],
      });
      action.commonChange('main.time', moment(now).format('YYYY-MM-DD HH:mm:ss'));
    } else {
      action.commonChange('main.time', time);
    }
  }

  handleColChange(e) {
    const allTime = this.state.timeList;
    const timeIndex = this.state.timeIndex;
    if (e.detail.column == 0) {
      this.setState({
        timeIndex: [e.detail.value, 0, 0, 0, 0, 0],
      });
    } else if (e.detail.column == 1) {
      const year = allTime[0][timeIndex[0]];
      const month = allTime[1][e.detail.value];
      let dayList = [];
      let dayI = 31;
      if (![1, 3, 5, 7, 8, 10, 12].includes(month)) {
        dayI = 30;
      }
      if (parseInt(month) === 2) {
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
          dayI = 29;
        } else {
          dayI = 28;
        }
      }
      for (let i = 1; i <= dayI; i++) {
        if (i < 10) {
          dayList.push('0' + i);
        } else {
          dayList.push(i);
        }
      }
      this.setState({
        timeList: [allTime[0], allTime[1], dayList, allTime[3], allTime[4], allTime[5]],
        timeIndex: [timeIndex[0], e.detail.value, 0, 0, 0, 0],
      });
    } else if (e.detail.column == 2) {
      this.setState({
        timeIndex: [timeIndex[0], timeIndex[1], e.detail.value, 0, 0, 0],
      });
    } else if (e.detail.column == 3) {
      this.setState({
        timeIndex: [timeIndex[0], timeIndex[1], timeIndex[2], e.detail.value, 0, 0],
      });
    } else if (e.detail.column == 4) {
      this.setState({
        timeIndex: [timeIndex[0], timeIndex[1], timeIndex[2], timeIndex[3], e.detail.value, 0],
      });
    } else if (e.detail.column == 5) {
      this.setState({
        timeIndex: [timeIndex[0], timeIndex[1], timeIndex[2], timeIndex[3], timeIndex[4], e.detail.value],
      });
    }
  }
}

//create by moon https://github.com/creasy2010/moon
