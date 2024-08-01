import {Image, Input, Picker, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './account-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import rArrowIcon from '@/assets/image/login/r-arrow.png';
import failedIcon from '@/assets/image/login/tip-failed.png';

import PickerAddress from '@/pages/common/picker-address';
import moment from 'dayjs';
import AddressSelect from '@/pages/common/address-select';
import perfect from '@/assets/image/login/perfect.png';

type IAccountInfoProps = T.IProps & T.IAccountInfoProps;

@connect<Partial<IAccountInfoProps>, Partial<T.ActionType>>(store2Props, actions)
export default class AccountInfo extends Component<Partial<IAccountInfoProps>, T.IAccountInfoState> {
  constructor(props: IAccountInfoProps) {
    super(props);
    this.state = {
      pickerShow: false,
      // areaInfo: '',
      gender: ['女', '男', '暂时保密'],
    };
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    let {pickerShow, gender} = this.state;
    let accountInfo = this.props.main?.accountInfo;
    return (
      <View className="accountInfo">
        {/* 审核未通过 */}
        {main?.checked == 2 ? (
          <View className="informat">
            <Image className="success" src={failedIcon} />
            <Text className="text1">您提交的账户信息审核未通过！</Text>
            <View className="reason-contain">
              <Text className="text2">原因是：</Text>
              <Text className="high">{main?.rejectReason}</Text>
            </View>
            <Text className="text3">请您修改账户基本信息后重新提交</Text>
          </View>
        ) : (
          <View className="informat">
            <View className="perfect-info">
              <Image src={perfect} className="perfect-img" />
            </View>
            <Text className="text-perfect">您还需完善账户信息才可正常访问</Text>
          </View>
        )}

        {/* 账户信息 */}
        <View className="form-info">
          {/* 称呼 */}
          <View className="form-input">
            <Text className="xing require">*</Text>
            <Text className="label">昵称</Text>
            <Input
              className="int"
              value={main?.accountInfo?.uName}
              placeholder="请填写您的称呼或是您公司的名称"
              placeholderClass="int-placeholder"
              maxlength={15}
              onInput={(e) => {
                action.commonChange('main.accountInfo.uName', e.detail.value);
              }}
              type="text"
            />
          </View>

          {/* 生日 */}
          <View className="form-input">
            <Text className="xing">*</Text>
            <Text className="label">生日</Text>
            <Picker
              className="picker"
              mode="date"
              value=""
              onChange={(e) =>
                action.commonChange('main.accountInfo.birthDay', moment(e.detail.value).format('YYYY-MM-DD'))
              }
            >
              <View className="picker-view">
                <Input
                  className="int"
                  value={main?.accountInfo?.birthDay}
                  placeholder="请选择"
                  placeholderClass="int-placehoder"
                  type="text"
                  disabled
                />
                <Image className="arrow-picker" src={rArrowIcon} />
              </View>
            </Picker>
          </View>

          {/* 性别 */}
          <View className="form-input">
            <Text className="xing">*</Text>
            <Text className="label">性别</Text>
            <Picker
              className="picker"
              mode="selector"
              range={gender}
              value={main?.accountInfo?.gender}
              onChange={(e) => {
                action.commonChange('main.accountInfo.gender', e.detail.value);
              }}
            >
              <View className="picker-view">
                <Input
                  className="int"
                  value={gender[main?.accountInfo?.gender]}
                  placeholder="请选择"
                  placeholderClass="int-placehoder"
                  onClick={() => {}}
                  type="text"
                  disabled
                />
                <Image className="arrow" src={rArrowIcon} />
              </View>
            </Picker>
          </View>

          {/* 所在地区 */}
          <View className="form-input">
            <Text className="xing">*</Text>
            <Text className="label">所在地区</Text>
            <Input
              className="int"
              value={main?.areaInfo}
              placeholder="请选择所在地区"
              placeholderClass="int-placehoder"
              onClick={() => {
                this.setState({
                  pickerShow: !pickerShow,
                });
              }}
              type="text"
              disabled
            />
            <Image className="arrow" src={rArrowIcon} />
            {/* <SelectAddress  /> */}
            {/*<PickerAddress onHandleToggleShow={(e) => this.selectAddress(e)} editAddress={main.areaIds} />*/}
            {pickerShow && (
              <AddressSelect
                title="请选择"
                areaIds={[accountInfo.provinceId, accountInfo.cityId, accountInfo.areaId, accountInfo.streetId]}
                onCancel={() => this.setState({pickerShow: false})}
                onSelect={(selAreas) => {
                  const addrIds = selAreas.map((item) => item.addrId);
                  action.commonChange('main.accountInfo.provinceId', addrIds[0]);
                  action.commonChange('main.accountInfo.cityId', addrIds[1]);
                  action.commonChange('main.accountInfo.areaId', addrIds[2]);
                  action.commonChange('main.accountInfo.streetId', addrIds[3]);
                  const areaInfoStr = selAreas.reduce((a, b: any) => `${a}${b.addrName} `, '');
                  action.commonChange('main.areaInfo', areaInfoStr);
                  this.setState({pickerShow: false});
                }}
              />
            )}
          </View>

          {/* 详细地址 */}
          <View className="form-input">
            <Text className="xing">*</Text>
            <Text className="label">详细地址</Text>
            <Input
              className="int"
              value={main?.accountInfo?.address}
              placeholder="请填写详细地址"
              placeholderClass="int-placehoder"
              maxlength={60}
              onInput={(e) => {
                action.commonChange('main.accountInfo.address', e.detail.value);
              }}
              type="text"
            />
          </View>

          {/* 常用联系人 */}
          <View className="form-input">
            <Text className="xing require">*</Text>
            <Text className="label">联系人</Text>
            <Input
              className="int"
              value={main?.accountInfo?.contact}
              placeholder="请输入"
              placeholderClass="int-placehoder"
              maxlength={15}
              onInput={(e) => {
                action.commonChange('main.accountInfo.contact', e.detail.value);
              }}
              type="text"
            />
          </View>

          {/* 联系人常用手机号 */}
          <View className="form-input">
            <Text className="xing require">*</Text>
            <Text className="label">联系人电话</Text>
            <Input
              className="int"
              value={main?.accountInfo?.phone}
              placeholder="请填写联系人常用手机号"
              placeholderClass="int-placehoder"
              maxlength={11}
              onInput={(e) => {
                action.commonChange('main.accountInfo.phone', e.detail.value);
              }}
              type="number"
            />
          </View>
        </View>
        {/* 提交按钮 */}
        <View className="account-submit-btn" onClick={() => action.submit()}>
          提交
        </View>
      </View>
    );
  }

  //选择省市区
  selectAddress = (obj) => {
    let {main, actions} = this.props;
    //获取省事区对应的id
    if (obj) {
      actions.action.commonChange([
        {
          paths: 'main.accountInfo.provinceId',
          value: obj.provincesId,
        },
        {
          paths: 'main.accountInfo.cityId',
          value: obj.citiesId,
        },
        {
          paths: 'main.accountInfo.areaId',
          value: obj.areasId,
        },
        {
          paths: 'main.areaInfo',
          value: obj.areaInfo,
        },
      ]);
    }
  };
}

//create by moon https://github.com/creasy2010/moon
