import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './seach-header.less';
import * as T from '../type';
import actions from '../actions/index';
import {cache} from 'config';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchImg from '@/assets/image/goods/search.png';
import dropDown from '@/assets/image/goods/drop-down.png';
import searchCancel from '@/assets/image/goods/cancel.png';
import lodash from 'lodash';
import AddressList from './address-list';

type ISeachHeaderProps = T.IProps & T.ISeachHeaderProps;

@connect<Partial<ISeachHeaderProps>, T.ISeachHeaderState>(store2Props, actions)
export default class SearchHeader extends Component<Partial<ISeachHeaderProps>, T.ISeachHeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      //展示取消图标
      cancelShow: false,
      // 搜索词
      searchWords: '',
    };
  }

  // 获取缓存城市
  async componentDidMount() {
    this.props.actions.action.setCurrentCity();
  }

  render() {
    let {
      main,
      actions: {action},
    } = this.props;
    const {cancelShow, searchWords} = this.state;

    const cityName = main.cityName;

    // 读取缓存城市
    // let cache_current_city = Taro.getStorageSync(cache.CACHE_CURRENT_CITY) || {};
    // const cache_city_defult = Taro.getStorageSync(cache.LOCATE_INFO)?.cityName;
    return (
      <View>
        {/* 搜索头部 */}
        <View className="search-address">
          <View
            className="receive-address-select"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/package-A/customer/select_city/index',
              });
            }}
          >
            <Text className="address-city">{cityName || '请选择'}</Text>
            <Image src={dropDown} className="select" />
          </View>
          <View className="content">
            <Image src={searchImg} className="searchImg" />
            <Input
              className="searchText"
              type="text"
              placeholder="输入您的收货地址搜索"
              value={searchWords}
              maxlength={100}
              onFocus={() => {
                action.showMap(false);
              }}
              onInput={lodash.debounce((e) => {
                if (e.detail.value) {
                  this._keySearch(e.detail.value);
                } else {
                  this._onCancel();
                }
              }, 100)}
            />
            {cancelShow ? <Image src={searchCancel} className="searchImg" onClick={this._onCancel} /> : null}
          </View>
          {main?.searchShow ? (
            <View
              onClick={() => {
                this.setState({
                  cancelShow: false,
                  searchWords: '',
                });
                action.showMap(true);
              }}
              className="cancelText"
            >
              取消
            </View>
          ) : null}
        </View>
        {/* 搜索城市列表 */}
        {/* {main?.searchShow ? <AddressList addressList={main?.selectNearAddress} searchWord={searchWords} /> : null} */}
      </View>
    );
  }

  _keySearch = async (search_word) => {
    let {
      main,
      actions: {action},
    } = this.props;
    this.setState({
      cancelShow: true,
      searchWords: search_word,
    });
    action.getNearAddress(search_word);
  };
  _onCancel = () => {
    this.setState({
      cancelShow: false,
      searchWords: '',
    });
  };
}
