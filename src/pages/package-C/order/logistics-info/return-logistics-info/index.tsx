import {View, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';
import FormItem from '@/pages/common/form-item';
import ItemGift from '../components/item-gift';
import Blank from '@/pages/common/blank';
const detail = [
  {context: '江苏省南京市雨花区分公司 已收入', time: '2018/03/21 15:32:21'},
  {context: '用户签收:门垫 已签收 感谢使用德邦速递', time: '2018/03/21 15:32:21'},
];
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LogisticsInfo extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {rid} = getCurrentInstance().router.params;
    this.props.actions.initReturn(rid);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {main} = this.props;

    return (
      main && (
        <View className="packageCOrderReturnLogisticsInfo">
          {/*订单数据*/}
          <ScrollView scrollY>
            {main.goodList &&
              main.goodList &&
              (main.goodList.deliveryInfo ? (
                <View className="contentBox">
                  <View className="title" style={{fontSize: '14px'}}>
                    基本信息
                  </View>
                  <FormItem
                    labelName="物流信息"
                    leftStyle={{fontSize: '12px'}}
                    textStyle={{textAlign: 'right', fontWeight: '600', color: '#333'}}
                    placeholder={main.goodList.deliveryInfo}
                  />
                  <FormItem
                    labelName="备注"
                    leftStyle={{fontSize: '12px'}}
                    textStyle={{textAlign: 'right', fontWeight: '600', color: '#333'}}
                    placeholder={main.goodList.remark}
                  />
                </View>
              ) : (
                <View className="contentBox">
                  <View className="title" style={{fontSize: '14px'}}>
                    基本信息
                  </View>
                  <FormItem
                    labelName="发货日期"
                    leftStyle={{fontSize: '12px'}}
                    textStyle={{textAlign: 'right', fontWeight: '600', color: '#333'}}
                    placeholder={main.goodList.deliveryTime?.split(' ')?.[0]}
                  />
                  <FormItem
                    labelName="物流公司"
                    leftStyle={{fontSize: '12px'}}
                    textStyle={{textAlign: 'right', fontWeight: '600', color: '#333'}}
                    placeholder={main.goodList.logistics.logisticCompanyName}
                  />
                  <FormItem
                    labelName="物流单号"
                    leftStyle={{fontSize: '12px'}}
                    textStyle={{textAlign: 'right', fontWeight: '600', color: '#333'}}
                    placeholder={main.goodList.logistics.logisticNo}
                  />
                </View>
              ))}
            <View>
              {main.detail && main.detail.length > 0 ? (
                <View className="goods_list">
                  <View className="title">物流详情</View>
                  {main.detail.map((item, index1) => {
                    return (
                      <View key={index1} className="goods_list">
                        <ItemGift order={item} index={index1} />
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Blank
                  content="暂无相关物流信息"
                  img={require('../img/empty.png')}
                  imgStyle={{width: '208rpx', height: '208rpx'}}
                />
              )}
            </View>
          </ScrollView>
        </View>
      )
    );
  }
}
