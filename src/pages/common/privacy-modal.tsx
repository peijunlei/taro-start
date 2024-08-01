import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './privacy-modal.less';

import { msg } from 'wmkit';

let isH5 = __TARO_ENV === 'h5';

export default class PrivacyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示隐私弹框
      visible: false,
      //隐私政策名称
      privacyContractName: '',
      callback: () => { },
    };
  }

  resolvePrivacyAuthorization;

  componentDidMount() {
    if (isH5) return;
    wx.onNeedPrivacyAuthorization && wx.onNeedPrivacyAuthorization((resolve) => {
      // 需要用户同意隐私授权时
      this.resolvePrivacyAuthorization = resolve;
    });
    wx.requirePrivacyAuthorize && wx.requirePrivacyAuthorize({
      success: () => {

      },
      fail: () => { },
    });
    msg.on({
      privacyModalVisible: (data) => {
        this.initModal(data);
      },
    });
  }

  render() {
    const { visible, privacyContractName } = this.state as any;
    if (!visible || isH5) {
      return null;
    }

    return (
      <View className="privacy-mask">
        <View className="privacy-mask-container">
          <View className="privacy-mask-header">
            <Text className="privacy-mask-header-title">用户隐私保护提示</Text>
          </View>
          <View className="privacy-mask-body">
            <View className="privacy-mask-body-text">感谢您使用本程序，您使用本程序前应当阅读并同意</View>
            <View className="privacy-mask-body-privacy" onClick={() => { this.openPrivacyContact() }}>{privacyContractName}</View>
            <View className="privacy-mask-body-text">
              当您点击同意并开始使用产品服务时，即代表您已阅读并同意该条款内容，该条款将对您产生法律约束力，如您拒绝，将无法使用。
            </View>
          </View>
          <View className="privacy-mask-btn">
            <button
              id="disagree-btn"
              className="privacy-mask-btn-cancel"
              onClick={() => {
                this.disAgree();
              }}
            >
              拒绝
            </button>
            <Button
              id="agree-btn"
              className="privacy-mask-btn-true"
              open-type="agreePrivacyAuthorization"
              onClick={() => {
                this.agree();
              }}
              bindagreeprivacyauthorization='bindagreeprivacyauthorization'
            >
              同意
            </Button>
          </View>
        </View>
      </View>
    );
  }

  //初始化弹框
  initModal = (data) => {
    const { visible, privacyContractName = '', callback = () => { } } = data;
    if (visible) {
      this.setState({
        visible: true,
        privacyContractName,
        callback,
      });
    } else {
      //关闭弹框
      this.setState({ visible: visible });
    }
  };

  // 同意方法
  agree = () => {
    const { callback } = this.state as any;
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      callback()
    }, 800)
  };

  // 拒绝方法
  disAgree = () => {
    console.log('拒绝');
    this.setState({
      visible: false,
    });
    msg.emit('privacyModalVisible', {
      visible: false,
    });
  };

  // 打开隐私协议
  openPrivacyContact = () => {
    if (wx.openPrivacyContract) {
      wx.openPrivacyContract();
    }
  };

}
