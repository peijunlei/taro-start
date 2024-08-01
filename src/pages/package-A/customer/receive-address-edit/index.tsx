import { Button, Image, View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import Info from './components/info';
import Infos from './components/infos';
import { debounce } from 'lodash';
import errorTip from '@/assets/image/customer/address/errorTip.png';
import AddressTip from '@/pages/package-A/customer/receive-address-edit/components/AddressTip';
import AddressSelect from '@/pages/common/address-select';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ReceiveAddressEdit extends Component<Partial<T.IProps>, any> {

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    const { mode, localKey, addressId: tid } = getCurrentInstance().router.params;
    this.props.actions.init(tid, mode, localKey);
    Taro.setNavigationBarTitle({
      title: `${tid == '-1' ? '新增' : '编辑'}收货地址`,
    });

  }
  componentWillUnmount() {
    this.props.actions.clean();
  }
  componentDidShow() {
    this.props.actions.init('-1');
  }
  onShareTimeline() {
    // 默认分享内容
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  render() {
    let {
      main,
      actions: { action },
    } = this.props;
    let tid = getCurrentInstance().router.params.addressId;
    let areaAddress = main?.areaIds;
    if (areaAddress && !areaAddress[3]) {
      areaAddress[3] = -1;
    }
    return (
      main && (
        <View className="packageACustomerReceiveAddressEdit">
          {tid == '-1' ? <Infos /> : <Info />}
          <View className="btn_box">
            <View className="register-btn">
              <Button
                className="btn btn-primary"
                onClick={debounce(() => {
                  this.props.actions.action.submit(tid);
                }, 1000)}
              >
                保存
              </Button>
              {/* {main.maskShow ? <Fragment /> : <AddressTip />} */}
            </View>
          </View>
          {/* {main?.pickerShow && (
            <AddressSelect
              title="请选择"
              areaIds={areaAddress}
              onCancel={() => action.commonChange('main.pickerShow', !main.pickerShow)}
              onSelect={(selAreas) => {
                this.props.actions.action.commonChange(
                  'main.areaIds',
                  selAreas.map((item) => item.addrId),
                );
                const areaInfo = selAreas.reduce((a, b: any) => `${a}${b.addrName} `, '');
                this.props.actions.action.commonChange('main.areaInfo', areaInfo);
                action.commonChange('main.pickerShow', !main.pickerShow);
              }}
            />
          )} */}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
