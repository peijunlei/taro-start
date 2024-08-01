import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import SalesListItem from './components/sales-list-item';
import SalesTagBar from './components/sales-tag-bar';
import SalesTotal from './components/sales-total';
import SalesTop from './components/sales-top';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBSalesSalesPerform extends Component<Partial<T.IProps>, any> {
  static options = {
    addGlobalClass: true,
  };
  componentDidMount() {
    this.props.actions.init();
  }
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
  componentWillUnmount() {
    this.props.actions.clean();
  }
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;
    return (
      <View className="packageBSalesSalesPerform">
        {main?.isLoadingList && <WMLoading />}
        <View className="fixedTop">
          <SalesTop />
          <SalesTagBar />
          <SalesTotal />
        </View>
        <SalesListItem />
        {/* <WMRichModal
          visible={isRuleShow}
          richText={performanceDesc}
          onClose={() => {
            commonChange('main.isRuleShow', !isRuleShow);
          }}
        /> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
