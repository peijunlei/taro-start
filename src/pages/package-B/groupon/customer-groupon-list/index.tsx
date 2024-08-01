import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMListView from '@/pages/common/list-view';
import {GrouponTradeVO} from 'api/TradeBaseController';
import StoreItem from '@/pages/package-B/groupon/customer-groupon-list/components/store-item';
import WMButton from '@/pages/common/button';
import WMGrouponFooter from '@/pages/common/groupon-bar';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import {fetchModal, handleUrl, setModalShow} from 'wmkit';

const emptyImage = require('@/assets/image/groupon/empty.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CustomerGrouponList extends Component<Partial<T.IProps>, any> {
  state = {
    showMore: false,
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
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
    this.updateModalStatus('');
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
  async updateModalStatus(id) {
    const res = await fetchModal('groupChannel');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    console.log('====', res);
    const flagParams = await setModalShow(res, 'groupChannel', popupId);
    console.log('flagParams', flagParams);
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage: (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      },
    );
  }
  async isGo(id) {
    await this.updateModalStatus(id);
  }
  handleClose() {
    this.setState({isModalFlag: false}, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId);
      }
    });
  }

  async onPullDownRefresh() {
    await this.props.actions.reload();
    Taro.stopPullDownRefresh();
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main = {},
    } = this.props;
    const {reload, list = [], serverTime, total} = main;
    return (
      <View className="customerGrouponList">
        <WMListView
          reload={reload}
          url={'/trade/page/groupons'}
          getData={(list: GrouponTradeVO[], total) => {
            commonChange('main.list', list);
            commonChange('main.total', total);
          }}
          noneImg={emptyImage}
          noneContent={'暂无拼团哦～'}
        >
          {list.map((store, index) => {
            if (!this.state.showMore && index < 10) {
              return <StoreItem key={index} storeInfo={store} serverTime={serverTime} />;
            } else if (this.state.showMore) {
              return <StoreItem key={index} storeInfo={store} serverTime={serverTime} />;
            }
          })}
          {list.length > 10 && !this.state.showMore && (
            <View
              className="bottoms"
              onClick={() => {
                this.setState({
                  showMore: true,
                });
              }}
            >
              <WMButton>查看更多订单</WMButton>
            </View>
          )}
          {/* {(list.length < 4 || (list.length > 0 && list.length === total && this.state.showMore)) && (
            <View className="no-more">没有更多了</View>
          )} */}
        </WMListView>
        <AdvModal
          imgUrl={this.state.imgUrl}
          handleUrl={() => handleUrl(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
        />
        <WMGrouponFooter currTab="我的拼购" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
