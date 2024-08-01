import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {debounce, throttle} from 'lodash';
declare let AMap: any;
import * as T from '../types';
import './search-head.less';
import actions from '../actions/index';
import {cache} from 'config';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchImg from '@/assets/image/goods/search.png';
import dropDown from '@/assets/image/goods/drop-down.png';
import searchCancel from '@/assets/image/goods/cancel.png';
import AddressList from './address-list';

type ISearchBarProps = T.IProps & T.ISearchBarProps;

@connect<Partial<ISearchBarProps>, T.ISearchBarState>(store2Props, actions)
export default class SearchBar extends Component<Partial<ISearchBarProps>, T.ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      //“取消”文字展示
      cancelShow: false,
    };
  }


  _keySearch = (search_word) => {
    const {showSearchWord} = this.props.actions.action;
    const {cityName} = this.props.main;
    this.setState({
      cancelShow: true,
    });
    showSearchWord(search_word);
    if (!search_word || search_word == '') {
      let {
        actions: {action},
      } = this.props;
      action.showSearchList(false);
    }
    AMap.service(['AMap.PlaceSearch'], () => {
      let current_city = cityName || '上海市';
      //构造地点查询类
      var placeSearch = new AMap.PlaceSearch({
        type: '汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
        pageSize: 30, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: current_city, // 选择的城市
        citylimit: true, //是否强制限制在设置的城市内搜索
        extensions: 'all', //获取POI详细信息
      });
      //关键字查询
      placeSearch.search(search_word, (status, result) => {
        const {getNearAddress, showSearchList} = this.props.actions.action;
        if (status == 'complete') {
          console.log('result',result);
           //将查询到的地点赋值
           showSearchList(true);
           getNearAddress(result.poiList.pois);
        } else {
          showSearchList(false);
          getNearAddress([]);

        }
      });
    });
  };

  _onCancel = () => {
    let {
      actions: {action},
    } = this.props;
    this.setState({
      cancelShow: false,
    });
    action.showSearchWord('');
    action.showSearchList(false);
    action.showMap(true);
  };

  render() {
    const {cancelShow} = this.state;
    let {
      main,
      actions: {action},
    } = this.props;

    const cityName = main.cityName;

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
            <Text className="select-city">{cityName || '请选择'}</Text>
            <Image src={dropDown} className="select" />
          </View>
          <View className="content">
            <Image src={searchImg} className="searchImg" />
            <Input
              className="searchText"
              type="text"
              placeholder="输入您的收货地址搜索"
              onFocus={() => {
                action.showMap(false);
                this.setState({
                  cancelShow: true,
                });
              }}
              value={main?.searchWord}
              maxlength={100}
              onInput={(e) => {
                this._keySearch(e.detail.value);
              }}
              onConfirm={(e) => {
                this._keySearch(e.detail.value);
              }}
            />
            {main.searchWord?.length > 0 ? (
              <Image src={searchCancel} className="searchImg" onClick={this._onCancel} />
            ) : null}
          </View>
          {cancelShow ? (
            <View onClick={this._onCancel} className="cancelText">
              取消
            </View>
          ) : null}
        </View>
        {/* 搜索的地址信息列表 */}
        {/* {main?.searchShow && (
          <AddressList addressList={main?.searchAddressList} searchWord={this.props.main.searchWord} />
        )} */}
      </View>
    );
  }
}
