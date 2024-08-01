import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
// import WMButton from '@/pages/common/button';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import qqImg from '@/assets/image/common/qq.png';
import arrowImg from '@/assets/image/common/arrow.png';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  // constructor(props: IListProps) {
  //   super(props);
  // }

  /**
      
  */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    // let list = main.serviceList && main.serviceList.qqOnlineServerItemRopList;
    let list = main && main.serviceList;

    return (
      <View className="list">
        <View className="service-list">
          {list &&
            list.map((item, index) => {
              return (
                <View
                  key={index}
                  className="item"
                  onClick={() => {
                    this.openCustomer(item);
                  }}
                >
                  <View className="service_list_item">
                    <Image src={item.serviceIcon || qqImg} className="icon-item" />
                    <Text>{item.customerServiceName}</Text>
                  </View>
                  <Image src={arrowImg} className="arrow " />
                </View>
              );
            })}
        </View>
      </View>
    );
  }

  openCustomer(item) {
    if(item?.customerServiceAccount){
      this.qqCustomerService(item?.customerServiceAccount)
    }
    if(item?.serviceUrl){
      this.wechatCustomer(item)
    }
  }

  wechatCustomer = async(item) => {
    if(__TARO_ENV === 'h5'){
      window.location.href = item.serviceUrl;
    } else {
      const {showMessageCard} = this.props;
      console.log(showMessageCard, 'showMessageCard')
      if(showMessageCard){
        const weChatInfo = await Taro.getStorageSync('weChatInfo');
        const {sendMessageTitle, sendMessageImg, sendMessagePath} = JSON.parse(weChatInfo);
        console.log(item, 'item',sendMessageTitle, sendMessageImg,  sendMessagePath, '------>')
        wx.openCustomerServiceChat({
          extInfo: {url: item.serviceUrl},
          corpId: this.props.main?.enterpriseId,
          showMessageCard: true,
          sendMessageTitle,
          sendMessageImg,
          sendMessagePath,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res);
          },
        })
      } else {
        wx.openCustomerServiceChat({
          extInfo: {url: item.serviceUrl},
          corpId: this.props.main?.enterpriseId,
        })
      }
    }
  }
  /**
   *
   */
  qqCustomerService(qq) {
    let {
      actions: {action},
    } = this.props;

    const bIsWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
    if (bIsWeixin) {
      window.location.href = `https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`;
    } else {
      window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web`;
    }
    //当前页面对用户可见，展示提示信息
    setTimeout(() => {
      !window.document.webkitHidden &&
        top.location == self.location &&
        setTimeout(() => {
          action.commonChange('main.isAppointFlag', true);
        }, 500);
    }, 500);
  }
}

//create by moon https://github.com/creasy2010/moon
