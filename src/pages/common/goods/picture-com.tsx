import Taro from '@tarojs/taro';
import React, { Component, Fragment } from 'react';
import { Image, Text, View } from '@tarojs/components';
import { WMkit } from 'wmkit';
import defaultImg from '@/assets/image/common/default-img.png';
import './picture-com.less';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
interface PictureComType {
  // 99 前端自定义状态 不支持配送
  type: 0 | 1 | 2 | 3 | 4 | 5 | 99; // 正常，缺货，失效，无购买权限，不支持销售，预售,
  url: string;
  onClick: any;
  goodsInfoId: '';
  appointmentSaleVOList: [];
  bookingSaleVOList: [];
  stock?: number
}

export default class PictureCom extends Component<PictureComType, any> {
  constructor(props: PictureComType) {
    super(props);
  }
  getGoodsStatusText = (type) => {
    switch (type) {
      case 1:
        return <Text className="no-goods-con-text">缺货</Text>
      case 2:
        return <Text className="no-goods-con-text">失效</Text>
      case 3:
        return (
          <Fragment>
            <Text className="no-goods-con-text">无购买 </Text>
            <Text className="no-goods-con-text">权限</Text>
          </Fragment>
        )
      case 4:
        return (
          <Fragment>
            <Text className="no-goods-con-text">不支持 </Text>
            <Text className="no-goods-con-text">销售</Text>
          </Fragment>
        )
      case 99:
        return (
          <Fragment>
            <Text className="no-goods-con-text">不支持 </Text>
            <Text className="no-goods-con-text">配送</Text>
          </Fragment>
        )
      default:
        return null
    }
  }
  render(): any {
    const { type, url, onClick, goodsInfoId, appointmentSaleVOList, bookingSaleVOList, stock } = this.props as any;

    const appointmentSaleVOLists =
      appointmentSaleVOList && appointmentSaleVOList.length > 0 ? appointmentSaleVOList : [];
    const bookingSaleVOLists = bookingSaleVOList && bookingSaleVOList.length > 0 ? bookingSaleVOList : [];
    // 正常的商品会存在库存为负数的情况
    const normal = type === 5 || (type === 0 && stock > 0)
    return normal ? (
      <View className="goods-picture">
        <Image src={url ? url : defaultImg} className="goods-picture" onClick={onClick} />
        {appointmentSaleVOLists.map((item) => {
          const key = item.id;
          return (
            goodsInfoId == item.appointmentSaleGood.goodsInfoId && (
              <View key={key} className="shop-prebuy">
                {this.isBuyStatus(item)}
              </View>
            )
          );
        })}
        {bookingSaleVOLists.map((item) => {
          const key = item.id;
          return (
            goodsInfoId == item.bookingSaleGoods.goodsInfoId &&
            this.isPresaleStatus(item) && (
              <View key={key} className="shop-prebuy">
                {this.isPresaleStatus(item)}
              </View>
            )
          );
        })}
      </View>
    ) : (
        <View className="no-goods-picture">
          <Image src={url ? url : defaultImg} className="goods-picture pic-disabled" onClick={onClick} />
          <View className="no-goods-con">
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
             {this.getGoodsStatusText(type)}
            </View>
          </View>
        </View>
      );
  }
  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;
    //如果预约开始时间在当前时间之前则代表预约中
    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    return result;
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }

    if (isBetween) return '预售中';
  };
}
