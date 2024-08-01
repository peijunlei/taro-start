import Taro, {getCurrentInstance, getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';
import {WebView, View, Text} from '@tarojs/components';
import config from '@/service/config';
import {pvUvStatics, WMkit, wxShare, _, msg} from 'wmkit';
import api from 'api';
import StoreInvalid from '@/pages/common/store-invalid';
import SkeletonScreen from './skeleton-screen';
import {getHashParam} from '@/utils/common-functions';
export default class Index extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      version: 0,
      flag: true,
      invalidFlage: true,
      companyInfoId: 0,
      storeId: '',
    };
  }

  async componentDidMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    if (WMkit.isLogin()) {
      let result = await api.storeBaseController.queryStore({
        storeId: Number(getCurrentInstance().router.params.storeId),
      });
      msg.emit('webviewLoadSuccess');
      this.setState({
        companyInfoId: result.companyInfoId,
        invalidFlage: result.storeResponseState != 0,
      });
      /**店铺pv/uv埋点*/
      pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
    } else {
      let result = await api.storeBaseController.queryStoreUnlogin({
        storeId: Number(getCurrentInstance().router.params.storeId),
      });
      /**店铺pv/uv埋点*/
      pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
      msg.emit('webviewLoadSuccess');
      this.setState({
        companyInfoId: result.companyInfoId,
        invalidFlage: result.storeResponseState != 0,
      });
    }
  }
  async onShareAppMessage(res) {
    const storeId = Number(getCurrentInstance().router.params.storeId);
    const companyInfoId = this.state.companyInfoId;

    if (WMkit.isLogin()) {
      api.storeShareRecordController.add({
        storeId: storeId,
        companyInfoId: companyInfoId,
        indexType: 1,
      });
    }

    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));

    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const params = getCurrentInstance().router.params;
    const newUrl = await wxShare.changeUrl(res?.from, url, params);
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
      path: newUrl,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }

  async componentDidShow() {
    const current = getCurrentInstance();
    const {onShow} = current.router;
    const storeId = getHashParam<{storeId: any}>(onShow.split('.')[0]).storeId;
    this.fetchConfigOrder();
    // this.fetchMagicVersion();
    this.setState({
      flag: true,
      storeId: storeId,
    });
  }

  render() {
    const token = Taro.getStorageSync('authInfo:token');
    const {customerId} = Taro.getStorageSync('b2b-wechat@login');

    const url = `${WMkit.prefixUrl(config.magicHost)}/mini/index/${getCurrentInstance()?.router?.params?.storeId ||
      this.state.storeId}?token=${token}&customerId=${customerId}`;
    return this.state.flag ? (
      <View>
        {!this.state.invalidFlage ? (
          <WebView
            src={url}
            style={{height: '100%'}}
            onLoad={(e) => {
              msg.emit('webviewLoadSuccess');
            }}
            onError={(e) => {
              this.setState({flag: true});
            }}
          />
        ) : <StoreInvalid />}
        <SkeletonScreen />
      </View>
    ) : (
      <View></View>
    );
  }

  fetchMagicVersion() {
    // 获取storeId的统一写法
    Taro.request({
      method: 'GET',
      mode: 'no-cors',
      url: `${WMkit.prefixUrl(config.renderHost)}/pageinfo-version/d2cStore/000000/weixin/index?storeId=${
        getCurrentInstance().router.params.storeId
      }`,
      success: (res) => {
        this.setState({version: res.data.data.version});
      },
    });
  }

  //获取魔方数据，主要获取分享相关的配置信息
  fetchConfigOrder = () => {
    // 获取storeId的统一写法
    Taro.request({
      method: 'GET',
      // mode: 'no-cors',
      url: `${WMkit.prefixUrl(config.renderHost)}/magic/d2cStore/000000/weixin/index?storeId=${
        getCurrentInstance().router?.params.storeId
      }`,
      success: (res) => {
        if (_.isWeixin()) {
          // 获取分享配置,如果存在的话
          const shareInfo = res.data.data.shareInfo;
          if (Object.keys(shareInfo).length > 0) {
            let {title, desc, imgSrc} = shareInfo;
            // 根据配置自定义分享内容
            wxShare.initShare(title, desc, imgSrc ? imgSrc : '', 0);
          }
        }
      },
    });
  };
}
