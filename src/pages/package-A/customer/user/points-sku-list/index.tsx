import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Sku from './components/sku';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderToolOrderSkuList extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    const strParmas = getCurrentInstance().router.params.params;
    const param = JSON.parse(decodeURI(strParmas));
    await this.props.actions.init(param);
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
  async componentDidMount() {}
  async componentWillUnmount() {
    await this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      main && (
        <View className="packageCOrderOrderToolOrderSkuList">
          <View className="list-con">
            <Sku sku={main.skus} />
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
