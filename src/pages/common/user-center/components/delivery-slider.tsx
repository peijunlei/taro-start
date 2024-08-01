import {View, Button, Text, Swiper, SwiperItem, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './delivery-slider.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import 'taro-ui/dist/style/components/flex.scss';

type IDeliverySliderProps = T.IProps & T.IDeliverySliderProps;

@connect<Partial<IDeliverySliderProps>, T.IDeliverySliderState>(store2Props, actions)
export default class DeliverySlider extends Component<Partial<IDeliverySliderProps>, T.IDeliverySliderState> {
  constructor(props: IDeliverySliderProps) {
    super(props);
  }

  //切换轮播图
  _changePicture = (item) => {
    console.log('_changePicture item', item);
    const {orderNo, deliverId} = item;
    Taro.navigateTo({url: `/pages/package-C/order/logistics-info/index?oid=${orderNo}&tid=${deliverId}`});
  };

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {isLogin, delivery},
    } = this.props;

    return (
      isLogin &&
      delivery.length != 0 && (
        <View className="deliverySlider">
          <Swiper
            className="imgSlides"
            indicatorColor="#101010"
            indicatorActiveColor="#ff6600"
            indicatorDots={delivery.length != 1 ? true : false}
            autoplay={delivery.length > 1 ? true : false}
            // circular
            interval={3000}
          >
            {delivery.map((item) => {
              const time = item.time;
              let date;
              if (time) {
                date = time.split('-')[1] + '-' + time.split('-')[2].split(' ')[0];
              }
              return (
                <SwiperItem key={item.id}>
                  <View className="at-row delivery-box" onClick={() => this._changePicture(item)}>
                    <View className="at-col at-col-2 at-col--auto">
                      <Image className="delivery-img" src={item.goodsImg} />
                    </View>
                    <View className="at-col">
                      <View>
                        <View className="at-col at-col-7 delivery-status">{item.status}</View>
                        <View className="at-col at-col-3 delivery-time">{date}</View>
                      </View>
                      <View className="at-col delivery-desc">{item.context}</View>
                    </View>
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
          <View />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
