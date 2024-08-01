import React, {Component} from 'react';
import {ScrollView, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';

import {connect} from 'react-redux';

import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//无数据
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/goods/goods-list/empty.png';
import WMLoading from '@/pages/common/loading';
import List from './components/list';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MyPrize extends Component<Partial<T.IProps>, any> {
  scrollHeight = 0;
  constructor(props) {
    super(props);
    this.state = {
      triggered: false,
    };
  }

  componentDidShow() {
    const current = getCurrentInstance().router;
    const onShow = __TARO_ENV == 'h5' ? (current.onShow as any) : current.params;
    const params = __TARO_ENV == 'h5' ? getHashParam<{id: string}>(onShow && onShow.split('.')[0]) : onShow;
    const id = params.id;
    this.props.actions.init(id);
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  componentWillUnmount() {
    this.props.actions.clean();
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

  render() {
    const {main = {} as any} = this.props;
    const {isReady, list, total, loadStatus, request} = main;
    return (
      <View className="_page">
        {main && isReady ? (
          <View className="packageAPrizeListMain">
            <ScrollView
              className="prize-list-scroll-view"
              scrollY
              onScrollToLower={this._onScrollToLower}
              refresherEnabled
              refresherTriggered={this.state.triggered}
              onRefresherPulling={this.onRefresherPulling}
              onRefresherRestore={this.onRefresherRestore}
              onRefresherAbort={this.onRefresherAbort}
            >
              <List />
              {loadStatus === 'loaded' && list.length == 0 && <Blank content="暂无中奖记录" img={noneImg} />}
              <div></div>
              {loadStatus === 'loaded' && request.pageNum + 1 == total && <View className="status">没有更多了</View>}
            </ScrollView>
          </View>
        ) : (
          <WMLoading />
        )}
      </View>
    );
  }

  onRefresherPulling = (e) => {
    this.setState({triggered: true}, () => {
      setTimeout(() => {
        this.setState({triggered: false});
      }, 2000);
    });
  };

  onRefresherRestore = () => {
    const id = Number(getCurrentInstance().router.params.id);
    this.props.actions.init(id);
  };

  onRefresherAbort = (e) => {
    this.setState({triggered: false});
  };

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */

  _onScrollToLower = () => {
    this.props.actions.action.nextPage(false);
  };
}
