import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './profile.less';
import actions from '../actions/index';
import {store2Props} from '../selectors';
import {connect} from 'react-redux';
import * as T from '../types';
import _ from 'lodash';
import moment from 'dayjs';
import callImg from '@/assets/image/store/call.png';
import {getGlobalData} from '@/service/config';
import arrow from '@/assets/image/common/arrow.png';
const isIphoneX = getGlobalData('isIphoneX');

type IProfileProps = T.IProps & T.IProfileProps;

@connect<Partial<IProfileProps>, Partial<T.ActionType>>(store2Props, actions)
export default class Profile extends Component<Partial<IProfileProps>, T.IProfileState> {
  static options = {
    addGlobalClass: true,
  };

  componentWillUnmount() {
    this.hideLargeImg();
  }

  constructor(props) {
    super(props);
    this.state = {
      ifShow: false,
    };
  }

  render() {
    const {store, isShow} = this.props.main;
    let isSelf = store.companyType == 0;
    const {ifShow, onChangeIfShow} = this.props;

    let follow;
    const followSum = store.followCount;
    if (followSum > 10000) {
      follow = _.divide(followSum, 10000).toFixed(1) + '万';
    } else {
      follow = followSum;
    }
    if (!store) {
      return false;
    }
    let sumCompositeScore: number, sumGoodsScore: number, sumServerScore: number, sumLogisticsScoreScore: number;
    if (store.storeEvaluateSumVO) {
      sumCompositeScore = store.storeEvaluateSumVO.sumCompositeScore;
      sumGoodsScore = store.storeEvaluateSumVO.sumGoodsScore;
      sumServerScore = store.storeEvaluateSumVO.sumServerScore;
      sumLogisticsScoreScore = store.storeEvaluateSumVO.sumLogisticsScoreScore;
    } else {
      sumCompositeScore = 5;
      sumGoodsScore = 5;
      sumServerScore = 5;
      sumLogisticsScoreScore = 5;
    }

    return (
      <View className="profile">
        {isShow && (
          <View className="store-info">
            <View className="block">
              <Image src={require('@/assets/image/store/store-icon.png')} className="img" />
              {isSelf && (
                <View className="block1">
                  <Text className="white fs20">自营</Text>
                </View>
              )}
              <Text className="c333 fs32">{store.storeName}</Text>
            </View>
            <View className="infos">
              <View className="item">
                <View className="box">
                  <Image src={require('@/assets/image/store/icon-1.png')} className="icon" />
                  <Text className="c333 fs24">粉丝数</Text>
                </View>
                <Text className="red20">{follow}</Text>
              </View>
              <View className="item">
                <View className="box">
                  <Image src={require('@/assets/image/store/icon-2.png')} className="icon" />
                  <Text className="c333 fs24">商品数</Text>
                </View>
                <Text className="red20">{store.goodsInfoCount}</Text>
              </View>
              <View className="item">
                <View className="box">
                  <Image src={require('@/assets/image/store/icon-3.png')} className="icon" />
                  <Text className="c333 fs24">综合评分</Text>
                </View>
                <Text className="red20">{sumCompositeScore.toFixed(2)}</Text>
              </View>
            </View>

            <View className="scores">
              <View className="score">
                <Text className="c333 fs24 mr16">商品质量</Text>
                <Text className="yellow fs24">{sumGoodsScore.toFixed(2)}</Text>
              </View>
              <View className="score">
                <Text className="c333 fs24 mr16">服务态度</Text>
                <Text className="yellow fs24">{sumServerScore.toFixed(2)}</Text>
              </View>
              <View className="score">
                <Text className="c333 fs24 mr16">发货速度</Text>
                <Text className="yellow fs24">{sumLogisticsScoreScore.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}

        <View className={isIphoneX ? 'x-bottom profile-items' : 'profile-items '}>
          {/* <View className="title-bar">
            <Text className="c333 fs32">基础信息</Text>
          </View> */}
          <View
            className="profile-item"
            style={{marginTop: '12px'}}
            onClick={() => {
              Taro.makePhoneCall({
                phoneNumber: store.contactMobile,
              });
            }}
          >
            <Text className="label">联系卖家</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image className="call" src={callImg} />
              <Image className="arrow" src={arrow} />
            </View>
          </View>
          <View
            className="profile-item"
            style={{marginBottom: '12px'}}
            onClick={() => {
              onChangeIfShow(true);
            }}
          >
            <Text className="label">店铺二维码</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image className="code" src={store.smallProgramCode} />
              <Image className="arrow" src={arrow} />
            </View>
          </View>
          <View className="profile-item">
            <Text className="label">店铺名称</Text>
            <Text className="text">{store.storeName}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">店铺类型</Text>
            <Text className="text">{store.companyType == 0 ? '自营' : '第三方商家'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">商家名称</Text>
            <Text className="text">{store.supplierName ? store.supplierName : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">所在地区</Text>
            <Text className="text">{store.addressInfo}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">统一社会信用代码</Text>
            <Text className="text">{store.socialCreditCode ? store.socialCreditCode : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">企业名称</Text>
            <Text className="text">{store.companyName ? store.companyName : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">住所</Text>
            <Text className="text">{store.address ? store.address : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">法定代表人</Text>
            <Text className="text">{store.legalRepresentative ? store.legalRepresentative : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">注册资本</Text>
            <Text className="text">{store.registeredCapital ? store.registeredCapital + '万元' : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">成立日期</Text>
            <Text className="text">{store.foundDate ? this._formatDate(store.foundDate) : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">营业期限自</Text>
            <Text className="text">{store.businessTermStart ? this._formatDate(store.businessTermStart) : '无'}</Text>
          </View>
          <View className="profile-item">
            <Text className="label">营业期限至</Text>
            <Text className="text">{store.businessTermEnd ? this._formatDate(store.businessTermEnd) : '无'}</Text>
          </View>
          <View className="profile-item multi">
            <Text className="label">经营范围</Text>
            <Text className="text">{store.businessScope}</Text>
          </View>
        </View>

        {ifShow && (
          <View
            className="large"
            onClick={(e) => {
              e.stopPropagation();
              onChangeIfShow(false);
            }}
          >
            <View
              className="large-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <View className="large-text">{store.storeName}</View>
              <Image className="large-img" src={store.smallProgramCode} />
              <View className="large-text">邀请好友来扫一扫，把店铺分享给他</View>
            </View>
          </View>
        )}
      </View>
    );
  }

  showLargeImg = () => {
    this.setState({
      ifShow: true,
    });
  };

  hideLargeImg = () => {
    this.setState({
      ifShow: false,
    });
  };

  _formatDate = (data) => {
    return moment(data).format('YYYY/MM/DD');
  };
}
