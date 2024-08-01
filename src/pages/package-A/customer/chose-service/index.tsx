import { View, Button, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';

import List from './components/list';
import AppointModal from './components/appoint-modal';
import WeChat from './components/weChat';
import Qimo from './components/qimo';
import qQServiceController from 'api/QQServiceController';
async function loadJS(jsPath) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = jsPath;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CommonChoseService extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      showMessageCard: null,
    };
  }
  async handleClick() {
    window.qimoChatClick && window.qimoChatClick()
  }
  async init() {
    try {
      if (window.qimo_loaded && window.qimoChatClick) return
      Taro.showLoading()
      const res = await qQServiceController.qqDetail(0, 3)
      const qqOnlineServerRop = res?.qqOnlineServerRop
      if (qqOnlineServerRop.status === 1 && qqOnlineServerRop.serviceKey) {
        const key = qqOnlineServerRop.serviceKey
        if (!window.qimoChatClick) {
          let timer = null
          //9099ebb0-5dbd-11ea-9638-3135132b39c3
          await loadJS(`https://ykf-webchat02.7moor.com/javascripts/7moorInit.js?accessId=${key}&autoShow=false&language=ZHCN`)
          timer = setInterval(() => {
            if (window.qimo_loaded) {
              Taro.hideLoading()
              clearInterval(timer)
            }
          }, 100);
        } else {
          Taro.hideLoading()
        }
      }
    } catch (error) {
      Taro.hideLoading()
    }
  }
  componentDidMount() {
    // let params = getCurrentInstance().router.params;
    // let storeId = params && params.storeId;
    // const { showMessageCard, xSite, enterpriseId, serviceUrl } = params;
    // this.setState({ showMessageCard, xSite, enterpriseId, serviceUrl })
    // this.props.actions.init(storeId);
    this.init()
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    const { showMessageCard, xSite, enterpriseId, serviceUrl } = this.state;
    return (
      <View className="service-main">
        <Qimo handleClick={this.handleClick} />
      </View>
    )
    return main ? (
      <View className="service-main">
        {xSite ? (
          <WeChat enterpriseId={enterpriseId} serviceUrl={serviceUrl} />
        ) : (
            <List showMessageCard={showMessageCard} />
          )}
        {main.isAppointFlag && <AppointModal />}
      </View>
    ) : (
        <View />
      );
  }
}

//create by moon https://github.com/creasy2010/moon
