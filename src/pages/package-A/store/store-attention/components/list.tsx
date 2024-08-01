import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import StoreItem from './store-item';
import CollectionCheckBox from './checkbox';
import WMListView from '@/pages/common/list-view/index';
import {getAddressInfo} from '@/utils/getAddressInfo';
import defaultImg from '@/assets/image/store/default-img.png';
type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = {};
  }

  /**
    列表
*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {list, selectedList, ifModify, reload, customerId},
    } = this.props;

    return (
      <WMListView
        noneContent={'暂无关注'}
        reload={reload}
        url={'/store/storeFollows'}
        noneImg={defaultImg}
        // style={{ height: '100vh-44px' }}
        dataPreProcessing={(list) => {
          return Promise.all(
            list.map(async (store) => {
              const addressInfoStr = await getAddressInfo(store.provinceId, store.cityId, store.areaId);
              store.addressInfo = addressInfoStr;
              return store;
            }),
          );
          return list;
        }}
        getData={(list, total) => {
          commonChange('main.list', list);
          commonChange('main.total', total);
        }}
      >
        {list.map((store, index) => (
          <View className="store-attention__item" key={index}>
            {ifModify ? (
              <CollectionCheckBox
                checked={selectedList.indexOf(store.storeId) > -1}
                onClick={() => {
                  this.changeSelectedList(store.storeId);
                }}
                style={{marginRight: '12px'}}
              />
            ) : null}
            <StoreItem ifHideBtn={ifModify} storeInfo={store}></StoreItem>
          </View>
        ))}
      </WMListView>
    );
  }

  changeSelectedList = async (storeId) => {
    const {
      actions: {
        action: {commonChange},
      },
      main: {selectedList, total, ifSelectAll},
    } = this.props;
    let length = total > 10 ? 10 : total;
    let index = selectedList.indexOf(storeId);
    if (index > -1) {
      selectedList.splice(index, 1);
      await commonChange('main.selectedList', [...selectedList]);
    } else {
      await commonChange('main.selectedList', [...selectedList, storeId]);
    }
    if (selectedList.length + 1 === length && !ifSelectAll) {
      commonChange('main.ifSelectAll', true);
    } else if (selectedList.length < length && ifSelectAll) {
      commonChange('main.ifSelectAll', false);
    }
  };
}

//create by moon https://github.com/creasy2010/moon
