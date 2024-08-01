import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import OrderItem from './components/order-item';
import OrderBottom from './components/order-bottom';

import WMListView from '@/pages/common/list-view';
import empty from '@/assets/image/customer/credit/creditEmpty.png';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CreditAssociateOrder extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidShow() {
    let {repayOrderCode} = Taro.getCurrentInstance().router.params || {};
    // this.props.actions.init(repayOrderCode);
    this.props.actions.action.commonChange('main.repayOrderCode', repayOrderCode);
    Taro.setBackgroundColor({
      backgroundColor: '#f4f4f4', // 窗口的背景色为白色
    });
  }

  componentWillUnmount() {
    // this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    let {repayOrderCode} = Taro.getCurrentInstance().router.params || {};
    return (
      <View className="creditIn">
        <View>
          <WMListView
            url={'/credit/order/has-repaid-order'}
            style={{height: 'calc(100vh - 50px)', paddingBottom: '50px'}}
            params={{repayOrderCode}}
            noneContent="暂无数据哦" //为空提示
            noneImg={empty}
            getData={(list, total) => {
              console.log('list', list);
              const totalPrice = list.map((item) => item.orderPrice).reduce((a, b) => a + b);
              action.commonChange([
                {
                  paths: 'main.orderList',
                  value: list,
                },
                {
                  paths: 'main.totalPrice',
                  value: totalPrice,
                },
              ]);
            }}
          >
            {main?.orderList.map((item) => {
              return <OrderItem item={item} />;
            })}
          </WMListView>

          {/* <OrderItem /> */}
        </View>
        <OrderBottom />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
