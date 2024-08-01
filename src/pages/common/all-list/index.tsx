import {View, WebView} from '@tarojs/components';
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
import { msg, WMkit } from 'wmkit';
import config from '@/service/config';

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
    msg.on({
      "refreshClassifyList":()=>{
        this.props.actions.init(this.props.cateId);
      }
    })
    this.props.actions.init(this.props.cateId);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      const {token} = this.props;
      let {cateList} = this.props.main || {};
      const bol = cateList.some((item) => item.cateId == -1);
      if (bol) {
        if (!token) {
          const cateList_new = cateList.filter((item) => item.cateId != -1);
          this.props.actions.action.commonChange('main.cateList', cateList_new);
        }
      } else {
        if (token) {
          const {isOpen} = (await this.props.actions.action._queryOpenStatus()) || {};
          if (isOpen) {
            this.props.actions.init(this.props.cateId);
          } else {
            const cateList_new = cateList.filter((item) => item.cateId != -1);
            this.props.actions.action.commonChange('main.cateList', cateList_new);
          }
        }
      }
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
      <View className="packageAGoodsAllList_common" style={{height: `calc(100vh - ${__TARO_ENV === 'h5' ? 50 : 0}px)`}}>
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
