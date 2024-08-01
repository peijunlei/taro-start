import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Filter from './components/filter';
import SearchBar from './components/search-bar';
import List from './components/list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageAStoreStoreList extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      filterModalVisible: true,
    };
  }

  async componentWillMount() {
    // this.props.actions.init(getCurrentInstance().router.params);
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

  async componentDidMount() {
    this.props.actions.init(getCurrentInstance().router.params);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    const {main} = this.props;
    return (
      <View
        className="packageAStoreStoreList"
        style={main?.filterModalVisible ? {position: 'fixed'} : {position: 'relative'}}
      >
        <SearchBar />
        <List />
        <Filter />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
