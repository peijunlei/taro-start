import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {View} from '@tarojs/components';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import SearchBar from './components/search-bar';
import {pvUvStatics, WMkit} from 'wmkit';

import Tab from './components/tab';

import History from './components/history';
import HotSearch from './components/hot-search';
import SearchResult from './components/search-result';
import WMLoading from '@/pages/common/loading';

const keys = ['goods', 'supplier', 'distribute', 'distributeGoods'];
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageAGoodsSearch extends Component<Partial<T.IProps>, any> {
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
  onShareTimeline() {
    // 默认分享内容
  }
  componentDidShow() {
    pvUvStatics.myPvUvStatis({});
    const {key, keywords} = getCurrentInstance().router.params;
    this.props.actions.init(key, keywords);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      main &&
      main.key && (
        <View className="packageAGoodsSearch">
          <SearchBar />
          {/*分销员搜索不展示此标签*/}
          {WMkit.isMall() ||
          main.key == 'distribute' ||
          main.key == 'distributeGoods' ||
          main.key == 'groupon' ||
          main.key == 'goodsSocial'
            ? null
            : main.associationalWordList.length == 0 && <Tab />}
          {!main.keywords || main.associationalWordList.length == 0 ? (
            <View>
              {main.key == 'goods' && <HotSearch />}
              <History />
            </View>
          ) : (
            <SearchResult />
          )}
          {main.isLoadingFlag && <WMLoading />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
