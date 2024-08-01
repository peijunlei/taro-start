import {View} from '@tarojs/components';
import Taro, {getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import FriendList from './components/friend-list';
import InvitHead from './components/invit-head';
import {wxShare} from 'wmkit';
// import ShareModal from '@/pages/common/share-modal';
import InvitModal from './components/invit-modal';
import WMRichModal from '@/pages/common/modal/rich-modal';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBDistributionInviteFriends extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
    this.initShareMenu();
  }
  initShareMenu() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage(res) {
    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const newUrl = wxShare.changeUrl(res.from, url, this.$router.params, 3);
    return {
      path: newUrl,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }
  config = {
    navigationBarTitleText: '邀请好友',
  };

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;

    const newContent = `<style>a {pointer-events: none;}</style>${main?.detailList}`;

    return (
      <View className="_page">
        {!main || Object.keys(main).length <= 0 ? null : (
          <View className="packageBDistributionInviteFriends">
            <InvitHead />
            <FriendList />
            {main?.detailState && (
              <WMRichModal
                visible={main?.detailState}
                richText={newContent}
                onClose={() => {
                  commonChange('main.detailState', !main?.detailState);
                }}
              />
            )}
            {main?.invitState && <InvitModal />}
            {main.isLoadingFlag && <WMLoading />}
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
