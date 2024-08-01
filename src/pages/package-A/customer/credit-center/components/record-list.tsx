import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button} from '@wanmi/ui-taro';
import * as T from '../types';
import './record-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import OrderItem from './order-item';
import RepaymentItem from './repayment-item';
import empty from '@/assets/image/customer/credit/creditEmpty.png';
type IRecordListProps = T.IProps & T.IRecordListProps;

@connect<Partial<IRecordListProps>, T.IRecordListState>(store2Props, actions)
export default class RecordList extends Component<Partial<IRecordListProps>, T.IRecordListState> {
  constructor(props: IRecordListProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {selectKey, creditInfo} = main;
    return (
      <View className="RecordList">
        {/*获取到基本信息以后再去查使用记录，需要传递起止时间*/}
        {selectKey == 0 && creditInfo.customerId && (
          <View>
            <WMListView
              url={'/credit/order/used-list'}
              style={{maxHeight: '54vh'}}
              emptyStyle={{paddingTop: '32px'}}
              params={{startTime: creditInfo.startTime, endTime: creditInfo.endTime}}
              noneImg={empty}
              noneContent="暂无记录哦" //为空提示
              getData={(list, total) => {
                console.log('list', list);
                action.commonChange([
                  {
                    paths: 'main.historyUsedList',
                    value: list,
                  },
                ]);
              }}
            >
              {main.historyUsedList.map((item, index) => {
                return <OrderItem key={index} item={item} />;
              })}
            </WMListView>
          </View>
        )}
        {selectKey == 1 && (
          <View>
            <WMListView
              url={'/credit/repay/has-repaid-list'}
              style={{maxHeight: '47vh', paddingBottom: '20px'}}
              emptyStyle={{paddingTop: '32px'}}
              params={{startTime: creditInfo.startTime, endTime: creditInfo.endTime}}
              noneContent="暂无记录哦" //为空提示
              noneImg={empty}
              getData={(list, total) => {
                action.commonChange([
                  {
                    paths: 'main.historyRecoverList',
                    value: list,
                  },
                ]);
              }}
            >
              {main.historyRecoverList.map((item, index) => {
                return <RepaymentItem key={index} item={item} />;
              })}
            </WMListView>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
