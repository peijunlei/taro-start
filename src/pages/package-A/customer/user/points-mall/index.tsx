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
import Info from './components/info';
import Hot from './components/hot';
import List from './components/list';
import MemberFooter from '../member-footer';
import CouponModal from './components/forbidden-modal';
import PassWordMask from './components/password-mask';
import ErrorInfo from './components/error-info';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PointsMall extends Component<Partial<T.IProps>, any> {
  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
    innerScroll: false,
  };

  async componentWillMount() {
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

  componentDidShow() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  async updateModalStatus(id) {
    const res = await fetchModal('integralMall');
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'integralMall', popupId);
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

  onPageScroll(e) {
    const {innerScroll} = this.state;
    let listView;
    if (__TARO_ENV == 'h5') {
      listView = document.getElementsByClassName('wm-list-view hydrated')[0];
    }
    // H5和小程序的计算方式不一样
    if (
      innerScroll === false &&
      ((__TARO_ENV !== 'h5' && e.scrollTop >= 381) || (__TARO_ENV == 'h5' && listView.scrollTop >= 300))
    ) {
      this.setState({
        innerScroll: true,
      });
    }

    // H5不需执行这里，否则列表项错乱
    if (innerScroll === true && __TARO_ENV !== 'h5' && e.scrollTop < 381) {
      this.setState({
        innerScroll: false,
      });
    }
  }

  render() {
    let {couponVisible, visible, integralVisible} = this.props.main || {};
    return (
      /*     <View className="packageACustomerUserPointsMall">
            <CreditRepay />
            <Hot />
            <List />
            {/!*导航栏*!/}
            <MemberFooter path="/points-mall" pointsIsOpen={true} />

            {/!*优惠券兑换弹框*!/}
            {couponVisible && <CouponModal />}
            {/!*支付密码弹框*!/}
            {visible && <PassWordMask />}
          </View>*/
      <View className="packageACustomerUserPointsMall">
        <Info />

        <Hot />

        <List innerScroll={true} />

        {/*导航栏*/}
        <MemberFooter path="/points-mall" pointsIsOpen={true} />

        {/*优惠券兑换弹框*/}
        {couponVisible && <CouponModal />}
        {/*支付密码弹框*/}
        {visible && <PassWordMask />}
        <AdvModal
          imgUrl={this.state.imgUrl}
          handleUrl={() => handleUrl(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
