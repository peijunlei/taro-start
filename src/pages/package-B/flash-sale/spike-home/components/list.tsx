import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import SKUItem from './sku-item';
const emptyImage = require('@/assets/image/groupon/empty.png');
import TimeNav from './time-nav';
import BannerList from './banner-list';
import {WMkit} from 'wmkit';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, any> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      isLoading: false,
    };
  }

  render() {
    let {
      main: {activityDate, activityTime, cateId, activityStatus, isLoadingList},
      main,
      actions: {action},
    } = this.props;

    if (!activityDate || !activityTime || !activityStatus) {
      return null;
    }

    return (
      <View className="flash-sale-list">
        <WMListView
          url={WMkit.isLogin() ? '/flashsale/goodsList' : '/flashsale/unlogin/goodsList'}
          params={{
            activityDate,
            activityTime,
            cateId,
          }}
          showText={isLoadingList}
          dataPath={['flashSaleGoodsVOPage']}
          noneImg={emptyImage}
          getData={(list, total) => {
            this.setState(
              {
                list,
                total,
              },
              () => action.commonChange([{paths: 'main.isLoadingList', value: false}]),
              // this.setState({
              //   isLoading: this.state.list.length == 0,
              // }),
            );
          }}
          style={{height: 'calc(100vh - 44px)', position: 'relative'}}
          noMoreStyle={{paddingTop: '0px'}}
        >
          <View className="flash-sale-bgc"></View>
          <BannerList />
          <TimeNav />
          {this.state.list.map((item, index) => (
            <SKUItem key={index} flashSaleGoods={item} main={main} action={action} />
          ))}
        </WMListView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
