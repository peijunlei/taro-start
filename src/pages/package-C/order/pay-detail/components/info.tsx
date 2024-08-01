import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormItem from '@/pages/common/form-item';
import moment from 'dayjs';
import {OrderWrapper, _,immutable} from 'wmkit';
import ImageListScroll from '@/pages/common/image-list-scroll';

type IInfoProps = T.IProps & T.IInfoProps;

const PAY_STATUS = {
  0: '已付款',
  1: '未付款',
  2: '待确认',
};
const PAY_TYPE = {
  0: '线上支付',
  1: '线下支付',
};
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      main: {payDetail},
    } = this.props;
    let orderWrapper = OrderWrapper(immutable.fromJS(payDetail));
    return (
      <View>
        <View className="pay_info">
          <FormItem
            leftStyle={{fontSize: '12px'}}
            textStyle={{color: '#ff6600', fontWeight: '500', textAlign: 'right'}}
            labelName="应付积分"
            placeholder={
              payDetail.buyPoints && payDetail.buyPoints > 0
                ? payDetail.buyPoints
                : payDetail.payOrderPoints && payDetail.payOrderPoints > 0
                ? payDetail.payOrderPoints
                : '0'
            }
          />
          <FormItem
            leftStyle={{fontSize: '12px'}}
            textStyle={{fontSize: '24rpx', color: '#ff6600', fontWeight: '500', textAlign: 'right'}}
            labelName="应付金额"
            placeholder={payDetail.totalPrice ? '￥' + _.addZero(payDetail.totalPrice) : '￥' + _.addZero(0)}
          />
          <FormItem
            leftStyle={{fontSize: '12px'}}
            textStyle={{fontSize: '24rpx', color: '#ff6600', fontWeight: '500', textAlign: 'right'}}
            labelName="应付卡包"
            placeholder={payDetail?.giftCardPrice ? '￥' + _.addZero(payDetail?.giftCardPrice) : '￥' + _.addZero(0)}
          />
        </View>
        <View className="pay_info2">
          {/* <FormItem
            leftStyle={{fontWeight: 500, fontSize: '14px', color: '#333333'}}
            labelName="付款信息"
            placeholder={''}
          /> */}
          <FormItem
            labelName="付款记录"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={PAY_STATUS[payDetail.payOrderStatus] || '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="付款方式"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={PAY_TYPE[payDetail.payType] || '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="商家收款账户"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.normalReceivableAccount || '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="付款金额"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.payOrderPrice ? '￥' + _.addZero(payDetail.payOrderPrice) : '￥' + _.addZero(0)}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="实付积分"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.payOrderPoints ? payDetail.payOrderPoints : '0'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="实付卡包"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail?.giftCardPrice ? '￥' + _.addZero(payDetail?.giftCardPrice) : '￥' + _.addZero(0)}
            textStyle={{textAlign: 'right', color: '#333333'}}
          />
          <FormItem
            labelName="付款时间"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.receiveTime ? moment(payDetail.receiveTime).format('YYYY-MM-DD HH:mm:ss') : '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <ImageListScroll imageList={orderWrapper.encloses() || []} labelName="订单附件" />
        </View>
        <View className="pay_info2">
          <FormItem
            labelName="备注"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.comment ? payDetail.comment : '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
          <FormItem
            labelName="流水号"
            leftStyle={{color: '#333333', fontSize: '12px'}}
            placeholder={payDetail.receivableNo || '无'}
            textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
          />
        </View>
      </View>
    );
  }
}
