import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
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
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MaterialCircle extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.share = '';
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
  componentDidMount() {}

  componentDidShow() {
    Taro.setNavigationBarTitle({title: '发圈素材'});
    let {goodsInfoId} = getCurrentInstance().router.params;
    if (goodsInfoId == undefined) {
      goodsInfoId = '';
    } else {
      this.props.actions.init(goodsInfoId);
    }
  }

  componentWillUnmount() {
    // this.props.actions.clean();
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
    return (
      main &&
      main.isReady && (
        <View className="materialCircle">
          {main.goodsInfoId && <List key={main.goodsInfoId}/>}

          <ImageModal onSaveShare={() => this.onSaveShare()} />
          <GoodsShare />
          {main && main.shareModalVisible && Object.keys(main.checkedSku).length > 0 ? (
            <ShareModal
              onRefs={(item) => {
                this.share = item;
              }}
              closeVisible={() => {
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
          <PrivacyModal />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
