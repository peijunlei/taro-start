import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/sales-list-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import Blank from '@/pages/common/blank';

const noneImg = require('@/assets/image/common/noSaleNum.png');

type ISalesListItemProps = T.IProps & T.ISalesListItemProps;

@connect<Partial<ISalesListItemProps>, T.ISalesListItemState>(store2Props, actions)
export default class SalesListItem extends Component<Partial<ISalesListItemProps>, T.ISalesListItemState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISalesListItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      // actions: { action },
      main,
    } = this.props;
    const dataList = main && main.data && main.data.dataList ? main.data.dataList : [];
    return (
      main && (
        <View className={main.dayOrMonthFlag ? 'salesList day' : 'salesList'}>
          {dataList && dataList.length > 0 ? (
            <View>
              <View className="salesListItem">
                <View className="row title">
                  <Text className="item">日期</Text>
                  <Text className="item">销售额</Text>
                  <Text className="item">预估收益</Text>
                </View>
                {dataList.map((v, index) => {
                  return (
                    <View className="row " key={index}>
                      <Text className="item "> {main.dayOrMonthFlag ? v.targetMonth : v.targetDate}</Text>
                      <Text className="item price">￥{_.addZero(v.saleAmount)}</Text>
                      <Text className="item price">￥{_.addZero(v.commission)}</Text>
                    </View>
                  );
                })}
                {/* <View className="status">没有更多了</View> */}
              </View>
              <View className="status">没有更多了</View>
            </View>
          ) : (
            !main.isLoadingList && (
              <Blank
                img={noneImg}
                content="暂无销售业绩"
                imgStyle={{width: '380rpx', height: '320rpx', position: 'inherit'}}
              />
            )
          )}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
