import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import SearchBar from './components/search-bar';

import List from './components/list';

import LeftMenu from './components/left-menu';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageAGoodsAllList extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  componentDidMount() {
    if (__TARO_ENV === 'h5') {
      this.props.actions.init(this.props.cateId);
    }
  }

  componentDidShow() {
    if (__TARO_ENV === 'weapp') {
      this.props.actions.init(this.props.cateId);
    }
  }

  componentWillUnmount() {}

  render() {
    // 商品列表的分类可以整个隐藏，在分类组件里而不是在列表里面直接返回null，保证分类只mount一次，避免在商品列表每次展开都获取一次分类数据
    const hide = this.props.hide;
    if (hide) {
      return null;
    }

    return (
      <View className="packageAGoodsAllList">
        {this.props.source !== 'goodsList' && <SearchBar />}
        <View className="menuItem">
          <LeftMenu {...this.props} />
          <List handleClick={this._handleClick} {...this.props} />
        </View>
      </View>
    );
  }

  _handleClick = (key, ...rest) => {
    const {handleClick} = this.props;
    if (typeof handleClick === 'function') {
      handleClick(...rest);
    } else {
      // 如果是分类的跳转，需要传递二级或三级分类的标识，决定商品列表是否展示分类筛选，三级的是不需要展示的
      if (key == 'cateId') {
        Taro.navigateTo({
          url: `/pages/package-B/goods/goods-list/index?${key}=${
            !['brandIds'].includes(key) ? rest[0] : JSON.stringify([rest[0]])
          }&level=${rest[2]}`,
        });
      } else {
        Taro.navigateTo({
          url: `/pages/package-B/goods/goods-list/index?${key}=${
            !['brandIds'].includes(key) ? rest[0] : JSON.stringify([rest[0]])
          }`,
        });
      }
    }
  };
}

//create by moon https://github.com/creasy2010/moon
