import {View, Text, Image, ScrollView, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './share-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import userImg from '@/assets/image/customer/user-center/default.png';
import {_} from 'wmkit';
import api from 'api';
import closeImg from '@/assets/image/common/coupon-close.png';

type IShareModalProps = T.IProps & T.IShareModalProps;
@connect<Partial<IShareModalProps>, T.IInfoState>(store2Props, actions)
export default class ShareModalT extends Component<Partial<IShareModalProps>, T.IShareModalState> {
  constructor(props: IShareModalProps) {
    super(props);
  }

  async componentDidMount() {
    const {
      main: {customerInfo, baseInfo, inviteeId},
      actions: {action},
    } = this.props;

    const shareCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
      tag: 'shop',
      inviteeId,
    });
    this.setState({shareCode});
  }

  state = {
    shareCode: '',
  };

  render() {
    const {
      main: {customerInfo, baseInfo, inviteeId},
      actions: {action},
    } = this.props;
    const {shareCode} = this.state;
    let headImg = customerInfo.headImg ? customerInfo.headImg : userImg;

    const params = {
      baseInfo,
      headImg,
      inviteeId,
    };

    return (
      <View className="share-modal">
        <View className="share-modal-con">
          <View className="con-top">
            <View className="title">
              <Image src={headImg} className="head-icon" />
              <View className="header-content">
                <Text className="by-per">{`by${baseInfo.customerName}的分享的店铺`}</Text>
                <Text className="content">这家店铺很不错呦</Text>
              </View>
            </View>
          </View>

          <View className="img-con">
            <Image src={baseInfo.shopShareImg} className="share-img" />
            {shareCode && <Image src={shareCode} className="share-code" />}
          </View>
        </View>

        <View
          className="share-modal-close"
          onClick={() => {
            action.commonChange('main.shareModalVisible', false);
          }}
        >
          <Image src={closeImg} className="share-modal-close-img" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
