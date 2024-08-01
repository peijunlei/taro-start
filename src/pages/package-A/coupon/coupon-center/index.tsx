import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {fetchModal, handleUrl, setModalShow, pvUvStatics} from 'wmkit';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import CouponList from './components/coupon-list';

import CouponCateMask from './components/coupon-cate-mask';

import CateTab from './components/cate-tab';

import CouponTypeMask from './components/coupon-type-mask';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACouponCouponCenter extends Component<Partial<T.IProps>, any> {
  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: null,
  };
  componentDidMount() {
    this.props.actions.init();
  }
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.updateModalStatus(null);
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
  async updateModalStatus(id: number) {
    const res = await fetchModal('securitiesCenter');
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'securitiesCenter', popupId);
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
  render() {
    let {main} = this.props;

    return (
      <View className="packageACouponCouponCenter">
        {/*<Header />*/}
        <CateTab />
        <CouponList />
        {main?.showDrapMenu && <CouponTypeMask />}
        {main?.showCateMask && <CouponCateMask />}
        <AdvModal
          imgUrl={this.state.imgUrl}
          handleUrl={() => handleUrl(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
        />
        {/* {isExplainFlag && <Explain />} */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
