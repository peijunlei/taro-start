import { Text, View } from '@tarojs/components';
import { Input } from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import WMFormInput from '@/pages/common/form-input';
import FormSwitch from '@/pages/common/form/form-switch';
import FormItem from '@/pages/common/form-item';
import FormSelect from '@/pages/common/form-select';
import AddressSelect from '@/pages/common/address-select';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, Partial<T.ActionType>>(store2Props, actions)
export default class Infos extends Component<Partial<IInfoProps>, T.IInfoState> {
  //选择省市区
  selectAddress = (obj) => {
    let { actions } = this.props;
    if (obj) {
      //获取省事区对应的id
      actions.action.commonChange([
        {
          paths: 'main.provinceId',
          value: obj.provincesId,
        },
        {
          paths: 'main.cityId',
          value: obj.citiesId,
        },
        {
          paths: 'main.areaId',
          value: obj.areasId,
        },
        {
          paths: 'main.areaInfo',
          value: obj.areaInfo,
        },
      ]);
    }
    this.setState({
      pickerShow: false,
    });
  };
  render() {
    let {
      main: { consigneeName, consigneeNumber, houseNum,deliveryAddress, isDefaltAddress, latitude, longitude, areaInfo, cityId },
      actions: { action },
    } = this.props;
    let address = latitude ? { latitude, longitude, cityId } : '';

    return (
      <View>
        <View className="edit_info">
          <Input
            label="收货人"
            type="text"
            placeholder="请输入收货人姓名"
            defaultValue={consigneeName}
            onInput={(e) => {
              action.onChange('consigneeName', e.detail.value);
            }}
            underline
            maxlength={15}
          />
        </View>
        <View className="edit_info">
          <Input
            label="手机号码"
            placeholder="请输入手机号码"
            type="number"
            defaultValue={consigneeNumber}
            onInput={(e) => {
              action.onChange('consigneeNumber', e.detail.value);
            }}
            underline
            maxlength={11}
          />
        </View>
        <View className="info2">
          <View className="top-select-add">
            <FormSelect
              labelName="所在地区"
              value={deliveryAddress}
              formStyle={{
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: '12px',
                marginRight: '12px',
              }}
              placeholder="请选择所在地区"
              selectRight={{ flex: 1, justifyContent: 'space-between' }}
              inputStyle={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'rgba(0,0,0,0.8)',
                textAlign: 'left',
                flex: '1',
              }}
              onClick={() => {
                const url = __TARO_ENV === 'weapp' ? '/pages/package-A/customer/select-address-map/index?address=' : '/pages/package-A/customer/select-receive-address/index?address=';
                Taro.navigateTo({ url: url + JSON.stringify(address) });
              }}
            />
          </View>
        </View>
        <View className="edit_info">
          <Input
            type="text"
            label="详细地址"
            placeholder="请填写详细地址"
            defaultValue={houseNum}
            onInput={(e) => {
              action.onChange('houseNum', e.detail.value);
            }}
            underline
          />
        </View>

        <View className="info2 info3">
          <View className="wm-form-btn-box form__underline">
            <FormItem labelName="设为默认" textStyle={{ textAlign: 'right' }} placeholder="" />
            <FormSwitch
              checked={isDefaltAddress != 0}
              title=""
              onChange={(bool) => {
                action.onChange('isDefaltAddress', bool == true ? 1 : 0);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

}

//create by moon https://github.com/creasy2010/moon
