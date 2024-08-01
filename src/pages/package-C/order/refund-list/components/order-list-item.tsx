import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../css/order-list-item.less';
import {Const} from 'config';
const noneImg = require('../img/none.png');
type IOrderListProps = T.IProps & T.IOrderListProps;
import PriceAll from '@/pages/common/goods/priceAll';
import * as _ from 'wmkit';
import {Label} from '@wanmi/ui-taro';

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderList extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {refundOrder} = this.props;

    let returnFlowState = refundOrder.returnFlowState;
    let applyPrice = refundOrder.returnPrice.applyStatus
      ? refundOrder.returnPrice.applyPrice
      : refundOrder.returnPrice.totalPrice;

    //加运费
    if (refundOrder.returnPrice.fee) {
      applyPrice += refundOrder.returnPrice.fee;
    }
    //退货赠品
    const returnGifts = refundOrder.returnGifts || [];
    //所有商品
    let items = refundOrder.returnItems.concat(returnGifts);

    return (
      <View className="user-box">
        <View
          className="user-order-item"
          onClick={() => {
            Taro.navigateTo({url: `/pages/package-C/order/return-detail/index?id=${refundOrder.id}`});
          }}
        >
          <View className="user-order-item-link">
            <View
              style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!(refundOrder && refundOrder.platform == 'CUSTOMER') && (
                <Image className="icon" src={require('../img/dai.png')} />
              )}
              {refundOrder.company.companyType == 0 ? <Label name="自营" type="gold" /> : null}
              <View className="dinapu">
                <Text className="name"> {refundOrder.company.storeName}</Text>
              </View>
              <Image className="icon" src={require('../img/jiantou.png')} />
            </View>
            {refundOrder && (
              <View
                className="status"
                style={
                  Const.returnMoneyState[returnFlowState] == '已作废' ||
                  Const.returnMoneyState[returnFlowState] == '已完成'
                    ? {color: 'rgba(0, 0, 0, 0.4)'}
                    : {color: '#FF6600'}
                }
              >
                {refundOrder.returnType == 'RETURN'
                  ? Const.returnGoodsState[returnFlowState]
                  : Const.returnMoneyState[returnFlowState] || ''}
              </View>
            )}
          </View>
          <View className="middle">
            <View className="pic">
              {refundOrder
                ? items
                    .filter((val, index) => index < 4)
                    .map((item) => <Image className="img-item" key={item} src={item.pic ? item.pic : noneImg} />)
                : null}
            </View>
            <View className="right">
              {refundOrder ? items.length : null}
              <Image className="icon" src={require('../img/jiantou.png')} />
            </View>
          </View>
          <View className="bottom">
            <View className="price">
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PriceAll price={applyPrice.toFixed(2)} />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              {returnFlowState === 'INIT' && (
                <View
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.showModal({
                      title: '取消退货退款',
                      content: '您确定要取消该退货退款?',
                    }).then(async (res) => {
                      if (res.confirm) {
                        this.props.actions.action.cancel(refundOrder.id);
                      }
                    });
                  }}
                >
                  {'取消退单'}
                </View>
              )}
              {/*退货单的已审核状态*/}
              {returnFlowState === 'AUDIT' && refundOrder.returnType == 'RETURN' && (
                <View
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.navigateTo({
                      url: `/pages/package-C/order/logistics-input/index?rid=${refundOrder.id}`,
                    });
                  }}
                >
                  {'填写物流'}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
