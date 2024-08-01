import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './collection-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CollectionListItem from './collection-list-item';
import WMListView from '@/pages/common/list-view';
import {GoodsInfoVO, GoodsIntervalPriceVO} from 'api/GoodsFollowBaseController';
import {} from 'api/AppointmentSaleBaseController';
import WMCheckbox from '@/pages/common/input-checkbox';

type ICollectionListProps = T.IProps & T.ICollectionListProps;

@connect<Partial<ICollectionListProps>, T.ICollectionListState>(store2Props, actions)
export default class CollectionList extends Component<Partial<ICollectionListProps>, T.ICollectionListState> {
  constructor(props: ICollectionListProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      // main: {list, ifModify, selectedList, reload},
      main,
    } = this.props;
    return (
      <View className="collectionList">
        <WMListView
          reload={main?.reload}
          url={'/appointmentsale/appointmentSalePage'}
          dataPath={['appointmentRecordPage']}
          style={{height:'calc(100vh - 22px)'}}
          getData={(list, total) => {
            commonChange('main.list', list);
            commonChange('main.total', total);
            Taro.setNavigationBarTitle({
              title: `我的预约(${total})`,
            });
          }}
          // otherProps={[['goodsIntervalPrices']]}
          noneContent={'暂无预约商品'}
        >
          {main?.list.map((goods) => (
            <View className="item" key={goods.goodsInfoId}>
              {main?.ifModify ? (
                <WMCheckbox
                  style={{marginRight: '12px'}}
                  onClick={() => {
                    this.changeSelectedList(goods.goodsInfoId);
                  }}
                  checked={this.props.main.selectedList.indexOf(goods.goodsInfoId) > -1}
                />
              ) : null}
              <CollectionListItem goods={goods} />
            </View>
          ))}
        </WMListView>
      </View>
    );
  }

  changeSelectedList = (goodsInfoId) => {
    let {
      main: {selectedList, ifSelectAll, total},
      actions: {
        action: {commonChange},
      },
    } = this.props;
    let length = total > 10 ? 10 : total;
    let list = selectedList;
    let index = selectedList.indexOf(goodsInfoId);
    if (index > -1) {
      list.splice(index, 1);
      commonChange('main.selectedList', [...list]);
    } else {
      commonChange('main.selectedList', [...list, goodsInfoId]);
    }
    if (selectedList.length + 1 === length && !ifSelectAll) {
      commonChange('main.ifSelectAll', true);
    } else if (selectedList.length + 1 < length && ifSelectAll) {
      commonChange('main.ifSelectAll', false);
    }
  };
}

//create by moon https://github.com/creasy2010/moon
