import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './prize-status.less';
import dayjs from 'dayjs';
import arrow from '@/assets/image/common/arrow.png';
const deliverStatus = {
  0: '未发货',
  1: '已发货',
};

type IOrderListProps = T.IProps & T.IOrderListProps;

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class PrizeStatus extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }
  render() {
    let {
      main: {detail},
    } = this.props;
    return (
      detail && (
        <View className="prize-status">
          {detail.prizeType !== 3 && (
            <View className="status">
              <Text className="text">订单状态</Text>
              <Text className="text">{deliverStatus[detail.deliverStatus]}</Text>
            </View>
          )}

          <View className="status">
            <Text className="text">确认领取时间</Text>
            <View className="text" style={{flexDirection: 'row', alignItems: 'center'}}>
              {dayjs(detail.redeemPrizeTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>

          {detail.prizeType === 2 && (
            <View className="status">
              <Text className="text">物流信息</Text>
              <View
                className="text"
                style={{flexDirection: 'row', alignItems: 'center'}}
                onClick={() => {
                  if (detail.deliverStatus === 1) {
                    Taro.navigateTo({
                      url: `/pages/package-C/order/logistics-info/index?type=prizeInfo&logisticsCode=${detail.logisticsCode}&logisticsNo=${detail.logisticsNo}&logisticsCompany=${detail.logisticsCompany}&deliveryTimeOfString=${detail.deliveryTimeOfString}`,
                    });
                  }
                }}
              >
                {detail.deliverStatus === 1 ? (
                  <>
                    点击查看
                    <Image src={arrow} className="draw-arrow" />
                  </>
                ) : (
                  '-'
                )}
              </View>
            </View>
          )}
        </View>
      )
    );
  }
}
