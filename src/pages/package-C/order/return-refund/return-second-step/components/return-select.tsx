import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-select.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
type IReturnRefundReasonProps = T.IProps & T.IReturnRefundReasonProps;

@connect<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState>(store2Props, actions)
export default class ReturnSelect extends Component<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState> {
  constructor(props: IReturnRefundReasonProps) {
    super(props);
  }

  /**  * 退货退款原因  */
  render() {
    let {
      actions: {
        action: {changeFromValue},
      },
      main,
    } = this.props;

    return (
      main && (
        <View className="mySet__info">
          <View className="mb24 border-all">
            {main.returnType === 'REFUND' && (
              <View
                className="set-item2"
                onClick={() => {
                  changeFromValue('isShowGoodsStateBox', true);
                }}
              >
                <Text className="set-title fs28">货物状态</Text>
                <Text className="return-ins fs24">
                  {main.returnGoodsStateList &&
                  main.selectReturnState &&
                  main.selectReturnState !== '' &&
                  main.returnGoodsStateList.length > 0
                    ? main.returnGoodsStateList[Number(main.selectReturnState)].name
                    : '请选择'}
                </Text>
                <Image className="set-arrow" src={moreIcon} />
              </View>
            )}
            <View
              className="set-item2 setItem__border_top"
              onClick={() => {
                changeFromValue('isShowRefundReasonBox', true);
              }}
            >
              <Text className="set-title fs28">退款原因</Text>
              <Text className="return-ins fs24">
                {main.returnReasonList && main.selectedReturnReason !== '' && main.returnReasonList.length > 0
                  ? main.returnReasonList.find((item) => item.id === main.selectedReturnReason).name
                  : '请选择'}
              </Text>
              <Image className="set-arrow" src={moreIcon} />
            </View>
            <View className="item-des">
              <View className="set-item-des">
                <Text className="set-title fs28">退款金额</Text>
                <Text className="return-ins fs24 refund-num">{main?.totalPrice}</Text>
              </View>
              <Text className="refund-num-des fs24">
                最多可退￥{main?.totalPrice}，如需退运费请联系客服修改退款金额
              </Text>
            </View>

            {main.returnType === 'RETURN' && (
              <View
                className="item-des"
                onClick={() => {
                  changeFromValue('isShowReturnWayBox', true);
                }}
              >
                <View className="set-item-des">
                  <Text className="set-title fs28">退货方式</Text>
                  <Text className="return-ins fs24">
                    {main.returnWayList && main.selectedReturnWay !== '' && main.returnWayList.length > 0
                      ? main.returnWayList[Number(main.selectedReturnWay)].name
                      : '请选择'}
                  </Text>
                  <Image className="set-arrow" src={moreIcon} />
                </View>
                <Text className="refund-num-des fs24">退单审核通过后，您可在退单详情看到退货地址</Text>
              </View>
            )}
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
