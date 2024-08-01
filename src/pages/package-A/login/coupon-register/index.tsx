import {Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import moment from 'dayjs';
import {msg} from 'wmkit';
import './index.less';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class IndexCouponRegister extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示弹框
      visible: false,
      // 是否展示我的优惠券按钮
      isShowButton: false,
      //优惠券列表
      couponList: [],
      //活动标题
      title: '',
      //活动描述
      desc: '',
    };
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
  componentDidMount() {
    this.props.actions.init();

    msg.on({
      registerCouponVisible: (coupon) => {
        console.log('registerCouponVisible coupon=', coupon);
        this.initModel(coupon);
      },
    });
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  //初始化弹框
  initModel = (params) => {
    const {couponList, title, desc, isShowButton, visible, isStoreModel} = params;
    if (visible) {
      let newArray = [];
      for (let j = 0; j < couponList.length; j++) {
        for (let i = 0; i < couponList[j].totalCount; i++) {
          newArray.push(couponList[j]);
        }
      }
      this.setState({
        couponList: newArray,
        title,
        desc,
        isShowButton,
        visible: true,
        isStoreModel,
      });
    } else {
      //关闭弹框
      this.setState({visible: visible});
    }
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    const {visible, couponList, title, desc, isShowButton, isStoreModel} = this.state;
    const headerUrl = isStoreModel ? require('./img/coupon-bg.png') : require('./img/coupon-bg-register.png');
    const buttonBg = isStoreModel ? require('./img/button.png') : require('./img/button-register.png');

    return (
      <View className="indexCouponRegister">
        {visible && (
          <View className="mask mask-center">
            <View className="r-coupon">
              <View className="r-header" style={{backgroundImage: `url(${headerUrl}`}}>
                <View className="r-title"> {title}</View>
                <View className="r-tips">{desc}</View>
              </View>
              {couponList && (
                <View
                  className="r-content"
                  style={{
                    backgroundColor: isStoreModel ? '#008DEB' : '#F53636',
                  }}
                >
                  {couponList.map((coupon) => {
                    return (
                      <View className="r-item" key={coupon.couponId}>
                        <Text className="left">
                          ￥<Text className="denomination">{coupon.denomination}</Text>
                        </Text>
                        <View className="right">
                          <View className="rules">
                            <Text>{coupon.fullBuyType == 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`}</Text>
                          </View>
                          <Text className="time">{this.showTime(coupon)}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              <View className="r-bottom">
                {(isShowButton || isStoreModel) && (
                  <View
                    className="r-bottom-box"
                    style={{backgroundImage: `url(${buttonBg}`}}
                    onClick={() => this.hideModal()}
                  >
                    立即查看
                  </View>
                )}
              </View>
              <img src={require('./img/close.png')} className="r-close-img" onClick={() => this.hideModal()} />
            </View>
          </View>
        )}
      </View>
    );
  }

  hideModal = () => {
    msg.emit('registerCouponVisible', {visible: false});

    const url = !this.state.isStoreModel ? '/pages/index/index' : '/pages/package-A/customer/my-coupon/index';
    Taro.navigateTo({
      url,
    });
  };

  //展示时间
  showTime(coupon) {
    const DATE_FORMAT = 'YYYY-MM-D';
    if (coupon.rangeDayType == 0) {
      return moment(coupon.startTime).format(DATE_FORMAT) + ' 至 ' + moment(coupon.endTime).format(DATE_FORMAT);
    } else {
      return (
        moment().format(DATE_FORMAT) +
        ' 至 ' +
        moment()
          .add(coupon.effectiveDays, 'days')
          .format(DATE_FORMAT)
      );
    }
  }
}

//create by moon https://github.com/creasy2010/moon
