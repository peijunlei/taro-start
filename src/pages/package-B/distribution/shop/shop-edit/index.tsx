import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import InfoList from './components/info';
import InfoListH5 from './components/info-h5';
import {msg} from 'wmkit';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ShopIndex extends Component<Partial<T.IProps>, any> {
  async componentDidShow() {
    await this.props.actions.init();
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  componentDidHide() {
    msg.emit('shop-goods');
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;
    let headImg = main && main.isLarge ? require('./img/big.png') : require('./img/small.png');
    let isH5 = __TARO_ENV === 'h5';
    return (
      main && (
        <View className="packageShopEdit">
          <View className="shop-head">
            <View className="head-right">
              <Image src={require('./img/remind.png')} className="right-img" />
              <Text className="right-text">长按商品可拖动排序</Text>
            </View>

            <View className="head">
              <View
                className="head-left"
                onClick={() => {
                  action.commonChange('main.isLarge', !main.isLarge);
                  if (!main.isLarge) {
                    action.commonChange('main.form.pageNum', 0);
                    action.page();
                  } else {
                    action.commonChange('main.formSmall.pageNum', 0);
                    action.pageSmall();
                  }
                }}
              >
                <Image src={headImg} className="shop-img" />
                <View>
                  <Text className="left-top">{main.isLarge ? '大图' : '列表'}</Text>
                </View>
              </View>
            </View>
          </View>
          {isH5 ? <InfoListH5 /> : <InfoList />}
          {main.isLoadingList && <WMLoading />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
