import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button, Checkbox} from '@wanmi/ui-taro';
import * as T from '../types';
import './order-bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

type IOrderBottomProps = T.IProps & T.IOrderBottomProps;

@connect<Partial<IOrderBottomProps>, T.IOrderBottomState>(store2Props, actions)
export default class OrderBottom extends Component<Partial<IOrderBottomProps>, T.IOrderBottomState> {
  constructor(props: IOrderBottomProps) {
    super(props);
  }
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return;

    return (
      <View className="OrderBottom">
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View className="check-view-all">
            <Checkbox checked={main?.isCheckedAll || false} onClick={(checked) => action.selectAllOrder(checked)} />
            <View className="check-view-txt">全选</View>
          </View>
          <View className="OrderBottomName">还款金额：</View>
          <View className="OrderBottomAmount">￥{_.addZero(main?.totalPrice || 0)}</View>
        </View>

        <View className="confirmBtn">
          <Button size="large" onClick={() => action.saveCheckedOrder()}>
            <Text className="confirm-text" style={{color: '#fff'}}>
              确定
            </Text>
            {`（${main?.selectedOrderIds ? main?.selectedOrderIds.length : '0'}）`}
          </Button>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
