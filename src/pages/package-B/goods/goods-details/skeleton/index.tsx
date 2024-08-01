import {View, Button, Text, Image} from '@tarojs/components';
import React, {Component} from 'react';
import {AtModal} from 'taro-ui';

import * as T from '../types';
import './index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import 'taro-ui/dist/style/components/modal.scss';
import WMLoading from '@/pages/common/loading';
type IBuyStatusProps = T.IProps & T.IBuyStatusProps;

@connect<Partial<IBuyStatusProps>, T.IBuyStatusState>(store2Props, actions)
export default class BuyStatus extends Component<Partial<IBuyStatusProps>, T.IBuyStatusState> {
  constructor(props: IBuyStatusProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  /**
    预约
*/
  render() {
    let imgList = [1, 2, 3, 4, 5];
    return (
      <View className="ske-detail-skeContainer ske-detail-skeBgColor">
        <WMLoading/>
        <View className="ske-detail-skeSwiper">
          <View className="ske-detail-headLine">
            <Image className="ske-detail-shareBtnImg" src={require('../img/shareBtn.png')}></Image>
            <Image className="ske-detail-menuImg" src={require('../img/menu.png')}></Image>
          </View>
          <View className="ske-detail-pagination">
            <Text className="ske-detail-pageCur">1/</Text>
            <Text className="ske-detail-pageTotal">4</Text>
          </View>
        </View>
        <View className="ske-detail-goodsInfo">
          <View className="ske-detail-priceContainer ">
            <View className="ske-detail-price ske-detail-skeBgColor"></View>
            <View className="ske-detail-share ske-detail-skeBgColor"></View>
          </View>
          <View className="ske-detail-box ske-detail-box2">
            <View className="ske-detail-squre1 ske-detail-skeBgColor"></View>
            <View className="ske-detail-squre2 ske-detail-skeBgColor"></View>
          </View>
          <View className="ske-detail-mb8">
            <View className="ske-detail-squre3 ske-detail-skeBgColor"></View>
          </View>
          <View className="ske-detail-box ske-detail-mb12">
            <View className="ske-detail-squre4 ske-detail-skeBgColor"></View>
          </View>

          <View className="ske-detail-squre5 ske-detail-skeBgColor"></View>
        </View>
        <View className="ske-detail-box ske-detail-readMore">
          <View className="ske-detail-readMoreBox">
            <View className="ske-detail-squre7 ske-detail-skeBgColor"></View>
            <View className="ske-detail-squre8 ske-detail-skeBgColor"></View>
            <View className="ske-detail-squre9 ske-detail-skeBgColor"></View>
          </View>
          <Image className="ske-detail-readMoreImg" src={require('../img/readMore.png')}></Image>
        </View>
        <View className="ske-detail-box ske-detail-box3">
          <View className="ske-detail-readMoreBox">
            <View className="ske-detail-squre10 ske-detail-skeBgColor"></View>
            <View className="ske-detail-squre11 ske-detail-skeBgColor"></View>
          </View>
          <Image className="ske-detail-readMoreImg" src={require('../img/readMore.png')}></Image>
        </View>
        <View className="ske-detail-store">
          <View className="ske-detail-box ske-detail-box4">
            <View className="ske-detail-squre12 ske-detail-skeBgColor"></View>
            <View className="ske-detail-arrowRightbox">
              <View className="ske-detail-squre13 ske-detail-skeBgColor"></View>
              <Image className="ske-detail-arrowRightImg" src={require('../img/arrowRight.png')}></Image>
            </View>
          </View>
          <View className="ske-detail-iconBox ske-detail-mb16">
            <View className="ske-detail-avatar ske-detail-skeBgColor"></View>
            <View className="ske-detail-iconRight">
              <View className="ske-detail-iconRightTop ske-detail-skeBgColor"></View>
              <View className="ske-detail-box1">
                <View className="ske-detail-squre14 ske-detail-skeBgColor"></View>
                <View className="ske-detail-squre14 ske-detail-skeBgColor"></View>
                <View className="ske-detail-squre14 ske-detail-skeBgColor"></View>
                <View className="ske-detail-squre14 ske-detail-skeBgColor"></View>
                <View className="ske-detail-squre14 ske-detail-skeBgColor"></View>
              </View>
            </View>
          </View>
          <View className="ske-detail-squre19 ske-detail-skeBgColor ske-detail-mb8"></View>
          <View className="ske-detail-squre19 ske-detail-skeBgColor ske-detail-mb16"></View>
          <View className="ske-detail-imageBox">
            {imgList.map((item, index) => {
              return <View key={index} className="ske-detail-imgItem ske-detail-skeBgColor"></View>;
            })}
          </View>
        </View>
        {/* <WMLoading /> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
