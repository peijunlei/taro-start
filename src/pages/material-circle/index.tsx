import {View, Text, ScrollView} from '@tarojs/components';
import Taro, {showLoading, hideLoading} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import ShareModal from '@/pages/common/share-modal';

import List from './components/list';

import ImageModal from './components/image-modal';

import GoodsShare from './components/goods-share';

import { PrivacyModal } from '@/pages/common';

import {WMkit} from 'wmkit';
import * as reduxStore from '@/redux/store';
import materialCircleMain from '@/pages/material-circle/reducers/main';
import MaterialCircleTabs from './components/material-circle-tabs';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MaterialCircle extends Component<Partial<T.IProps>, any> {
  static defaultProps = {
    isReady: false,

    imageModal: false,

    imageList: [],

    chooseImageIndex: 0,

    shareVisible: false,

    goodsShareVisible: false,

    shareModalVisible: false,

    visibleMap: {0: false},

    currentMatterList: [],

    moments: false,

    currentMatterId: "' '",

    checkedSku: {},

    addSelfShop: true,

    momentSuccess: false,

    customer: {},

    noticeNum: 0,

    preferentialNum: 0,

    //按钮类型0:保存，1：朋友圈，2：好友,共用的页面
    buttonType: 0,
    //点击保存图片时存储的素材id
    chooseMatterId: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.share = '';
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

  async componentDidShow() {
    await this.props.actions.init();
    // Taro.setNavigationBarTitle({
    //   title: '素材广场',
    // });
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps=======>');
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  /**
   * 保存图文到本地
   */
  onSaveShare = () => {
    this.share && this.share._savePicLocal();
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {current = 0} = this.state;

    //分销广场tab
    const material_tabs = [
      {title: '商品推荐', key: 0},
      {title: '素材推广', key: 1},
    ];

    if (!(main && main.isLoading)) {
      hideLoading();
    }
    return (
      main && (
        <View className="materialCircle">
          <View className="wm-tabs">
            {material_tabs.map((item) => {
              return (
                <View
                  key={item.key}
                  className="item"
                  onClick={() => {
                    this.setState({current: item.key});
                  }}
                >
                  <Text className={current === item.key ? 'fs24 curr-text' : 'fs24'}>{item.title}</Text>
                  <View className={current === item.key ? 'line active' : 'line'} />
                </View>
              );
            })}
          </View>
          <View>
            <List current={current} action={action} main={main} />
            <ImageModal onSaveShare={() => this.onSaveShare()} />
            <GoodsShare />
            {main && main.shareModalVisible && main.checkedSku && Object.keys(main.checkedSku).length > 0 ? (
              <ShareModal
                onRefs={(item) => (this.share = item)}
                closeVisible={() => {
                  //显示tab
                  Taro.showTabBar();
                  //弹窗关闭
                  action.commonChange('main.shareModalVisible', false);
                }}
                addSelfShop={main.addSelfShop}
                goodsInfo={main.checkedSku}
                goods={{}}
                shareType={2}
                shareModalVisible={main.shareModalVisible}
                buttonType={main.buttonType}
              />
            ) : null}
          </View>
          <PrivacyModal />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
