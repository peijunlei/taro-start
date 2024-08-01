import {View, Text, Image} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './rights.less';
// import back from '@/assets/image/store/back.png';
// import backGrey from '@/assets/image/store/profile-back.png';
import iconMedal from '@/assets/image/store/icon-medal.png';
import actions from '../actions/index';
import {store2Props} from '../selectors';

import {connect} from 'react-redux';
import * as T from '../types';
import {cache} from 'config';
import back from '@/assets/image/store/back.png';
import backGrey from '@/assets/image/store/profile-back.png';
type IRightsProps = T.IProps & T.IRightsProps;

@connect<Partial<IRightsProps>, T.IRightsState>(store2Props, actions)
export default class Rights extends Component<Partial<IRightsProps>, T.IRightsState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IRightsProps) {
    super(props);
  }

  render() {
    //是否为自营店铺
    const {store, level, levelList, userInfo} = this.props.main;

    let isSelf = store.companyType == 0;

    let customerName = '';
    if (Taro.getStorageSync(cache.LOGIN_DATA)) {
      customerName = Taro.getStorageSync(cache.LOGIN_DATA).customerDetail.customerName;
    }
    return (
      <View className="rights">
        <View className="main">
          {level && level.customerLevelId ? (
            <View className="customer-info-box">
              <Image src={back} className="back" />
              <View className="card customer-info">
                <View className="name">{customerName}</View>
                <View className="info">
                  <View className="discount">
                    <Text className="num">
                      {isSelf
                        ? parseFloat((userInfo.customerLevelDiscount * 10).toString()).toFixed(1)
                        : (parseFloat(userInfo.storeLevelVO.discountRate) * 10).toFixed(1)}
                    </Text>
                    <Text className="suffix">折</Text>
                  </View>
                  <View className="level">
                    {isSelf ? userInfo.customerLevelName : userInfo.storeLevelVO.levelName}
                    {/* <View className="tip"></View> */}
                  </View>
                </View>
                <View className="name">
                  {isSelf
                    ? `成长值: ${userInfo.growthValue || 0}`
                    : `当前购物${userInfo.totalOrder || 0}笔 消费 ${userInfo.totalAmount || 0}元`}
                </View>
              </View>
            </View>
          ) : (
            <View className="customer-info-box">
              <Image src={backGrey} className="back" />
              <View className="card customer-info">
                <View className="name">{customerName}</View>
                <View className="fs56">非会员</View>
                <View className="fs28">您可联系商家成为会员</View>
              </View>
            </View>
          )}

          <View className="customer-rights card">
            <View className="title">
              会员权益
              <Image src={iconMedal} className="icon-medal" />
            </View>
            <View className="content">
              {isSelf
                ? '您享受平台会员等级对应的商品折扣率，会员等级根据成长值自动升级，成长值获取规则请至个人中心查看'
                : '成为该店铺的会员，可以享受该店铺会员等级对应的商品折扣率，当商家未按照会员等级设置价格或者单独指定了您的采购价时，商品折扣率不生效。店铺会员满足购物笔数和购物金额的条件会自动升级。'}
            </View>
          </View>

          <View className="table">
            <View className="thead">
              <View className="td" style={{textAlign: 'left'}}>
                会员等级
              </View>
              <View className="td">折扣</View>
              <View className="td">所需成长值</View>
            </View>
            <View className="tbody">
              {levelList &&
                levelList.map((item) => (
                  <View className="tr" key={`${item.growthValue}${item.customerLevelDiscount}`}>
                    <View className="td" style={{textAlign: 'left'}}>
                      {item.customerLevelName}
                    </View>
                    <View className="td">{(item.customerLevelDiscount * 10).toFixed(1)}</View>
                    {isSelf ? (
                      <View className="td">{item.growthValue}</View>
                    ) : (
                      <View className="td">{this.renderColumn(item)}</View>
                    )}
                  </View>
                ))}
            </View>
          </View>
        </View>

        <View className="rights-bottom">
          <View className="contact"
            onClick={() => {
              Taro.makePhoneCall({
                phoneNumber: store.contactMobile,
              });
            }}
          >
            <Button size="long" >
              联系商家
            </Button>
            {/* <Text className="white fs28">联系商家</Text> */}
          </View>
        </View>
      </View>
    );
  }

  renderColumn = (rowInfo) => {
    let orderConditions = rowInfo.orderConditions ? '购物满' + rowInfo.orderConditions + '笔' : '';
    let amountConditions = rowInfo.amountConditions ? '消费' + rowInfo.amountConditions + '元' : '';
    if (orderConditions == '' || amountConditions == '') {
      return (
        <View>
          <Text className="noMember">{orderConditions}</Text>
          <Text className="noMember">{amountConditions}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>{orderConditions}</Text>
        <Text>或{amountConditions}</Text>
      </View>
    );
  };
}
