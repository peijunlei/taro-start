import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import StoreItem from './store-item';
import WMListView from '@/pages/common/list-view';
import {getAddressInfo} from '@/utils/getAddressInfo';
import defaultImg from '@/assets/image/store/shop-default.png';

type IListProps = T.IProps & T.IListProps;
//@ts-ignore
const isH5 = __TARO_ENV === 'h5';
@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, any> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      list: [],
      total: 0,
    };
  }

  /**

*/
  render() {
    const {main} = this.props;
    return main ? (
      <WMListView
        url={'/stores'}
        noneContent={'没有搜到店铺哦'}
        noneImg={defaultImg}
        getData={(list, total) => {
          this.setState({
            total,
            list,
          });
        }}
        style={main.filterModalVisible ? {position: 'fixed'} : {position: 'relative'}}
        params={this.props.main.request}
        height={isH5 ? 'calc(100vh - 48px)' : 'calc(100vh - 96rpx)'}
        dataPreProcessing={(list) => {
          list.map(async (store) => {
            const addressInfoStr = await getAddressInfo(store.provinceId, store.cityId, store.areaId);
            store.addressInfo = addressInfoStr;
            return store;
          });
          return list;
        }}
      >
        {this.state.list.map((store) => (
          <StoreItem storeInfo={store} key={store.storeId} />
        ))}
      </WMListView>
    ) : null;
  }
}

//create by moon https://github.com/creasy2010/moon
