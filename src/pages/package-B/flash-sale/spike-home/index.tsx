import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {fetchModal, handleUrl, setModalShow} from 'wmkit';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import TypeNav from './components/type-nav';
import TimeNav from './components/time-nav';
import List from './components/list';
import BannerList from './components/banner-list';
import Blank from '@/pages/common/blank';
import WMLoading from '@/pages/common/loading';

import SpikeBlank from '@/assets/image/common/spike-blank.png';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class SpikeHome extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isModalFlag: false,
      imgUrl: '',
      jumpPage: {},
      nextPopupId: '',
    };
  }

  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }

    //@ts-ignore
    __TARO_ENV === 'weapp' &&
      Taro.setBackgroundColor({
        backgroundColor: '#FF6600', // 窗口的背景色为主题色
        backgroundColorTop: '#FF6600', // 顶部窗口的背景色为主题色
        backgroundColorBottom: '#F5F5F5', // 底部窗口的背景色为主题色
      });
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
    Taro.setNavigationBarTitle({title: '秒杀'});
  }

  async componentDidMount() {
    this.props.actions.init();
    this.updateModalStatus('');
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  async updateModalStatus(id) {
    const res = await fetchModal('seckillChannel');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId as any;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'seckillChannel', popupId);
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
    const {sceneList = [], isReady, isLoadingList} = this.props.main || {};
    // const sceneList = [];
    if (!isReady) return null;
    return (
      <View className="spikeHome__wrapper">
        {sceneList && sceneList.length > 0 ? (
          <View className="spikeHome">
            {/*<View className="top-back"></View>*/}
            <View className="wrap">
              <TypeNav />
              {/* <BannerList /> */}
            </View>
            {/* <TimeNav /> */}
            <List />
          </View>
        ) : (
          !isLoadingList && <Blank img={SpikeBlank} content="敬请期待" imgStyle={{width: '208px', height: '208px'}} />
        )}

        <AdvModal
          imgUrl={this.state.imgUrl}
          handleUrl={() => handleUrl(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
        />
        {isLoadingList && <WMLoading />}
      </View>
    );
  }
}
