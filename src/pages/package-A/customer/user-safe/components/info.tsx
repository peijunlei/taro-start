import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormSelect from '@/pages/common/form-select';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  render() {
    let {main} = this.props;
    return (
      <View className="safe-info">
        <View className="top">
          <FormSelect
            labelName="登录密码"
            placeholder=""
            leftStyle={{fontSize: '14px'}}
            onClick={() => {
              Taro.navigateTo({url: '/pages/package-A/customer/user-pw/index'});
            }}
            iconVisible={true}
          />
          <FormSelect
            labelName="支付密码"
            placeholder={!main?.flag ? '未设置' : ''}
            textStyle={{color: '#666', fontSize: '14px'}}
            leftStyle={{fontSize: '14px'}}
            onClick={() => {
              Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            }}
            iconVisible={true}
          />
        </View>
        <View className="top">
          {/* <FormSelect
            labelName="手机号绑定"
            placeholder={main?.customer?.customerAccount}
            textStyle={{color: '#666', fontSize: '14px'}}
            leftStyle={{fontSize: '14px'}}
            onClick={async () => {
              await Taro.navigateTo({url: '/pages/package-A/customer/user-mobile/index'});
            }}
            iconVisible={true}
          /> */}
          <FormSelect
            labelName="关联账号"
            placeholder=""
            textStyle={{color: '#666', fontSize: '14px'}}
            leftStyle={{fontSize: '14px'}}
            onClick={() => {
              Taro.navigateTo({url: '/pages/package-A/customer/linked-account/index'});
            }}
            iconVisible={true}
          />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
