import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import ShareModal from '@/pages/common/share-modal';
import {getHashParam} from '@/utils/common-functions';
//规格弹窗
import GroupChoose from '@/pages/common/goods/group-choose';

import GoodsDetail from './components/goods-detail';

import DetailBottom from './components/detail-bottom';

import PlayWay from './components/play-way';

import GoodsList from './components/goods-list';

import JoinPeopleModal from './components/join-people-modal';

import WaitGroupModal from './components/wait-group-modal';

import JoinGroup from './components/join-group';

import GoodsShare from './components/goods-share';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBGrouponGroupBuyDetail extends Component<Partial<T.IProps>, any> {
  // 是否正在运行componentDidMount
  isComponentDidMount = true;

  constructor(props) {
    super(props);
    this.setState({
      outerScroll: true,
      innerScroll: false,
    });
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
  componentDidMount() {
    this.isComponentDidMount = true;
    //团号
    const {grouponId, shareUserId} = getCurrentInstance().router.params;
    this.props.actions.init(grouponId, shareUserId).finally(() => {
      this.isComponentDidMount = false;
    });
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  componentDidShow() {
    if(this.isComponentDidMount) return;

    let { onShow, params, } = getCurrentInstance?.()?.router || {};
    if(!params?.grouponId) {
      params = getHashParam<any>(onShow?.split?.('.')?.[0]);
    }
    this.props.actions.init(params?.grouponId, params?.shareUserId);
  }
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return main?.isReady ? (
      <ScrollView
        style={{height: this.state?.outerScroll ? '100vh' : 'auto', background: '#f5f5f5'}}
        scrollY={this.state?.outerScroll}
        onScrollToLower={() => {
          this.setState({
            outerScroll: false,
            innerScroll: true,
          });
        }}
      >
        <GoodsDetail />
        <DetailBottom />
        <PlayWay />
        {main.grouponDetails.grouponDetailOptStatus == '5' && main.grouponInstanceList.length > 0 && <JoinGroup />}
        <GoodsList
          scrollY={this.state?.innerScroll}
          onScrollToUpper={() => {
            this.setState({
              outerScroll: true,
              innerScroll: false,
            });
          }}
        />
        {main.joinPeopleModal && <JoinPeopleModal />}
        {main.waitGroupModal && <WaitGroupModal />}
        {/* {main.goodsShareVisible && <GoodsShare />} */}
        {main.specModal && (
          <GroupChoose
            grouponNo={
              main.grouponDetails.grouponDetailOptStatus == '5' && main.targetGroupNo == '' ? null : main.targetGroupNo
            }
            closePopUp={() => {
              action.commonChange('main.specModal', false);
            }}
            openGroupon={main.grouponDetails.grouponDetailOptStatus == '5' && main.targetGroupNo == '' ? true : false}
            grouponData={main.grouponDetails}
            data={main}
            //关闭弹窗
            onClose={(e) => {
              e && e.stopPropagation();
              e && e.preventDefault();
              console.log('close it');
              action.commonChange('main.specModal', false);
            }}
            shareUserId={main.shareUserId}
          />
        )}
        {main.groupShareModal ? (
          <ShareModal
            grouponNo={main.grouponNo}
            grouponActivityId={main.grouponDetails.grouponActivity.grouponActivityId}
            closeVisible={() => {
              //弹窗关闭
              action.commonChange('main.groupShareModal', false);
            }}
            addSelfShop={false}
            goodsInfo={main.goodsInfos.filter((info) => info.goodsInfoId == main.grouponDetails.goodInfoId)[0]}
            goods={main.goods}
            shareType={3}
            shareModalVisible={main.groupShareModal}
          />
        ) : null}
      </ScrollView>
    ) : (
      <View />
    );
  }
}

//create by moon https://github.com/creasy2010/moon
