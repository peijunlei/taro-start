import {View, ScrollView, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import CardCarousel from './components/card-carousel';

import ZhiboList from './components/zhibo-list';
import WMLoading from '@/pages/common/loading';

const emptyLiveList = require('@/assets/image/live/empty_live_list.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class Live extends Component<Partial<T.IProps>, any> {
  constructor(props: T.IProps) {
    super(props);
  }
  componentWillMount() {
    // Taro.setNavigationBarTitle({title:  '发现' });
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

  //从load-page页面登录进来强制页面刷新
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  //scrollview滚动监听
  onScroll(e) {
    let {
      actions: {action},
      main,
    } = this.props;

    //监听设置直播列表是否可以滚动状态(是否吸顶)
    if (main.isScroll == false && e.detail.scrollTop > 146) {
      action.commonChange('main.isScroll', true);
    }

    if (main.isScroll == true && e.detail.scrollTop <= 146) {
      action.commonChange('main.isScroll', false);
    }
  }

  //加载下一页
  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    //直播tab
    const live_tabs = [
      {title: '全部', key: -1},
      {title: '直播中', key: 0},
      {title: '即将开播', key: 3},
      {title: '精彩回放', key: 4},
    ];

    const isH5 = __TARO_ENV === 'h5';
    if (!(main && main.isOpen && !isH5) || isH5) {
      return (
        <View className="emptyBox">
          <Image src={emptyLiveList} className="emptyImg" />
          <Text className="emptyText">暂无直播哦</Text>
        </View>
      );
    }

    if (main.isLoadingFlag && !isH5) {
      return <WMLoading />;
    }
    return main && main.isReady ? (
      <View>
        <ScrollView
          className="zhibo"
          scrollY={true}
          onScroll={(e) => this.onScroll(e)}
          onScrollToLower={() => this._onScrollToLower()}
        >
          {main?.carouselList.length > 0 && <CardCarousel />}
          <View>
            <View
              className="titleBox"
              style={!(main && main.isScroll) ? {} : {background: '#fff', position: 'sticky', top: '0', width: '100vw'}}
            >
              <View className="title" style={!(main && main.isScroll) ? {} : {background: '#F5F5F5'}}>
                {live_tabs.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className={
                        !(main && main.isScroll)
                          ? (main && main.currentLiveTabIndex) == item.key
                            ? 'titleItemSelect'
                            : 'titleItem'
                          : (main && main.currentLiveTabIndex) == item.key
                          ? 'titleItemTopSelect'
                          : 'titleItemTop'
                      }
                      onClick={() => {
                        action.handleLiveTab(item.key);
                      }}
                    >
                      {item.title}
                    </View>
                  );
                })}
              </View>
            </View>
            {!(main && main.isScroll) && <View className="zhiboBackground" />}
            <ZhiboList />
          </View>
        </ScrollView>
      </View>
    ) : (
      <View />
    );
  }
}

//create by moon https://github.com/creasy2010/moon
