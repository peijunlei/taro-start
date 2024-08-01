import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {_} from 'wmkit';
import Header from './components/header';
import RecommendGoods from '@/pages/common/goods/recommend-goods/index';
import ListView from '@/pages/common/list-view';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBRewardCenter extends Component<Partial<T.IProps>, any> {
  config = {
    enablePullDownRefresh: true,
  };

  //使得从个人中心页退出再登录以后进入页面能刷新
  async componentDidShow() {
    const isLogin = await _._isLogin();
    if (isLogin) {
      await this.props.actions.init();
    } else {
      await Taro.navigateTo({
        url: `/pages/package-A/login/wecat-login/index`,
      });
    }
  }

  //从load-page页面登录进来强制页面刷新
  async componentDidMount() {
    const isLogin = await _._isLogin();
    if (isLogin) {
      await this.props.actions.init();
    } else {
      // Taro.navigateTo({
      //   url: `/pages/package-A/login/wecat-login/index`,
      // });
    }

    // Taro.setNavigationBarTitle({
    //   title: '奖励中心',
    // });
  }

  async componentWillUnmount() {
    await this.props.actions.clean();
  }

  state = {
    lists: [],
    request: {
      sortFlag: 0,
    },
  };

  render() {
    const {lists, request} = this.state;

    return (
      <View className="packageBRewardCenter">
        <ListView
          dataPath={['esGoodsInfoPage', 'content']}
          url="/goods/shop/add-distributor-goods"
          style={{height: 'calc(100vh)'}}
          params={request}
          getData={(list, total) => {
            console.log(list);
            this.setState({lists: list});
          }}
        >
          {/* 热销商品 */}
          <RecommendGoods hotGoodsList={lists} distributor={{forbiddenFlag: false}} />
        </ListView>
      </View>
    );
  }
}
