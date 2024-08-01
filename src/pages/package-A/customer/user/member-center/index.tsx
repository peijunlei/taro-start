import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchModal, handleUrl, setModalShow} from 'wmkit';
import './index.less';
import * as T from './types';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import Hot from './components/hot';
import 'taro-ui/dist/style/components/progress.scss';
import 'taro-ui/dist/style/components/icon.scss';
import MemberFooter from '../member-footer';
import MemberCenterList from './components/member-center-list';
import WMLoading from '@/pages/common/loading';
import lodash from 'lodash';
// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MemberCenter extends Component<Partial<T.IProps>, any> {
  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
    pageIndex: 0,
    isHideModule: true,
    currentPageDataIsComplete: false,
  };

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
  componentDidShow(): void {
    this.props.actions.init();
  }

  async componentWillUnmount() {
    this.props.actions.clean();
  }
  async updateModalStatus(id) {
    const res = await fetchModal('memberCenter');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'memberCenter', popupId);
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
    const {buyList, total} = this.props.main || {};
    const {pageIndex, isHideModule, currentPageDataIsComplete} = this.state;

    return (
      main && (
        <View className="packageACustomerMemberCenter">
          <ScrollView
            scrollY
            scrollWithAnimation
            enableBackToTop={true}
            lowerThreshold={20}
            style={{height: 'calc(100vh - 50px)', background: '#f5f5f5'}}
            onScrollToLower={lodash.debounce(() => {
              this.setState(({pageIndex}) => ({
                pageIndex: currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
              }));
            }, 1000)}
          >
            <Info />

            {/*热门兑换，会员最爱买*/}
            {<Hot />}

            <MemberCenterList isHideModule={isHideModule} />

            {/* 热门推荐商品 */}
            {buyList.length && total && buyList.length === total ? (
              <RecommendGoodsList
                pageIndex={pageIndex}
                type="4"
                recommendListCOMStyle={{
                  paddingBottom: '10px',
                  marginTop: '-4px',
                }}
                getCurrentPageDataIsComplete={(bol) => this.setState({currentPageDataIsComplete: bol})}
                setPageIndex={(index) => this.setState({pageIndex: index})}
                setHideModule={(bol) => this.setState({isHideModule: bol})}
              />
            ) : null}
          </ScrollView>

          <AdvModal
            imgUrl={this.state.imgUrl}
            handleUrl={() => handleUrl(this.state.jumpPage)}
            handleClose={() => this.handleClose()}
            isModalFlag={this.state.isModalFlag}
          />
          {/*导航栏*/}
          <MemberFooter path="/member-center" pointsIsOpen={main.pointsIsOpen} />
          {main.isLoadingFlag && <WMLoading />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
