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
import CollectionCheckBox from './collection-checkbox';
import defaultImg from '@/assets/image/store/collect-default.png';

import {getGlobalData} from '@/service/config';
const isIphoneX = getGlobalData('isIphoneX');
type ICollectionListProps = T.IProps & T.ICollectionListProps;
@connect<Partial<ICollectionListProps>, T.ICollectionListState>(store2Props, actions)
export default class CollectionList extends Component<Partial<ICollectionListProps>, T.ICollectionListState> {
  constructor(props: ICollectionListProps) {
    super(props);
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {list, ifModify, selectedList, reload, ifSelectAll},
    } = this.props;
    this._changeNavigation();
    const height = ifModify ? (isIphoneX ? 136 : 102) : 46;
    return (
      <WMListView
        reload={reload}
        height={
          !ifModify ? 'calc(100vh - env(safe-area-inset-bottom))' : 'calc(100vh - 24px - env(safe-area-inset-bottom))'
        }
        style={{
          paddingTop: '50px',
        }}
        url={'/goods/goodsFollows'}
        dataPath={['goodsInfos']}
        getData={(list: GoodsInfoVO[], total, other) => {
          const _list = list.map(v=>{
            const item = other[3].find(v2=>v2.goodsId===v.goodsId)
            const goodsStatus = item?.goodsStatus
            return {
              ...v,
              goodsStatus:goodsStatus===0&&v.stock<=0 ? 1: goodsStatus,
              stock:item?.goodsStatus===5?9999999:v.stock,
              // estimatedDeliveryTime:item?.estimatedDeliveryTime
            }
          })
          commonChange('main.list', _list);
          commonChange('main.total', total);
          commonChange('main.bookingSaleVOList', other[1]);
          commonChange('main.appointmentSaleVOList', other[2]);
          commonChange('main.goodses', other[3]);
          if (ifSelectAll) {
            commonChange(
              'main.selectedList',
              list.map((goods) => goods.goodsInfoId),
            );
          }
          Taro.setNavigationBarTitle({
            title: `我的收藏(${total})`,
          });
        }}
        otherProps={[['goodsIntervalPrices'], ['bookingSaleVOList'], ['appointmentSaleVOList'], ['goodses']]}
        noneContent={'您的收藏是空的'}
        noneImg={defaultImg}
        isShowRecommendGoodsList={true}
        type="5"
        recommendListCOMStyle={{
          paddingBottom: '10px',
        }}
        changeCommonModalProps={
          !ifModify
            ? {
                chooseStyle: {
                  bottom: 0,
                },
              }
            : {}
        }
      >
        {list.map((goods) => (
          <View className="collectionList_item" key={goods.goodsInfoId}>
            {ifModify ? (
              <CollectionCheckBox
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
    );
  }

  _changeNavigation = () => {
    const {
      main: {total},
    } = this.props;
    Taro.setNavigationBarTitle({
      title: `我的收藏(${total || 0})`,
    });
  };

  changeSelectedList = (goodsInfoId) => {
    let {
      main: {selectedList, ifSelectAll, total},
      actions: {
        action: {commonChange},
      },
    } = this.props;
    let length = total;
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
    } else if (selectedList.length < length && ifSelectAll) {
      commonChange('main.ifSelectAll', false);
    }
  };
}

//create by moon https://github.com/creasy2010/moon
