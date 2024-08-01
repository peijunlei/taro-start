import {View, Picker, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormSelect from '@/pages/common/form-select';
import AddressSelect from '@/pages/common/address-select';
import SelectAddress from '@/pages/common/picker-address';
import moment from 'dayjs';

type IInfoProps = T.IProps & T.IInfoProps;

const GenderConst = {
  0: '女',
  1: '男',
  2: '暂时保密',
};

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      gender: ['女', '男', '暂时保密'],
      pickerShow: false,
    };
  }

  state = {
    gender: ['女', '男', '暂时保密'],
    pickerShow: false,
  };
  render() {
    let {
      main,
      actions: {action},
    } = this.props;
    let {gender, pickerShow} = this.state;
    console.log(main, '!!!!');
    const {headImg, customerName, birthDay, customerAddress, contactName, contactPhone} = main.customer;

    const selectInit = [main.customer.provinceId, main.customer.cityId, main.customer.areaId];
    console.log('debug88 customerName', customerName, main.addressInfo);
    return (
      main && (
        <View className="userInfo__info">
          <View className="top2">
            <View className="form-item" onClick={() => {}}>
              <Text className="form-text">{'头像'}</Text>
              <View className="select-right">
                <View className="select-text">
                  <Image className="img_logo" src={headImg ? headImg : require('../img/none_img.png')} />
                </View>
              </View>
            </View>
          </View>
          <View className="top select-right-weui-input-color-black">
            <FormSelect
              labelName="昵称"
              value={customerName ? customerName : '暂时保密'}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user-info/edit-accountName/index?customerAccount=${
                    customerName ? customerName : ''
                  }`,
                });
              }}
              iconVisible={true}
            />
            <Picker
              className="picker select-right-weui-input-color-black"
              mode="date"
              value={birthDay ? birthDay : ''}
              onChange={(e) =>
                action.commonChange('main.customer.birthDay', moment(e.detail.value).format('YYYY-MM-DD'))
              }
            >
              <FormSelect labelName="生日" placeholder="请选择出生日期" value={birthDay} iconVisible={true} />
            </Picker>

            <Picker
              className="picker"
              mode="selector"
              range={gender}
              value={main.customer.gender}
              onChange={(e) => action.commonChange('main.customer.gender', e.detail.value)}
            >
              <FormSelect
                labelName="性别"
                value={GenderConst[main.customer.gender]}
                placeholder="请选择"
                iconVisible={true}
              />
            </Picker>
          </View>
          <View className="top select-right-weui-input-color-black">
            <View className="top-select-add">
              <FormSelect
                labelName="所在地区"
                placeholder={main.addressInfo}
                selectRight={{flex: 1, justifyContent: 'flex-end'}}
                inputStyle={{flex: 1}}
                textStyle={{color: '#666', fontSize: '24rpx'}}
                leftStyle={{fontSize: '28rpx'}}
                onClick={() => {
                  this.setState({
                    pickerShow: !pickerShow,
                  });
                }}
                iconVisible={true}
              />
              {pickerShow && (
                <AddressSelect
                  title="请选择"
                  areaIds={[
                    main.customer.provinceId,
                    main.customer.cityId,
                    main.customer.areaId,
                    main.customer.streetId,
                  ]}
                  onCancel={() => this.setState({pickerShow: false})}
                  onSelect={(selAreas) => {
                    const addrIds = selAreas.map((item) => item.addrId);
                    this.props.actions.action.commonChange('main.customer.provinceId', addrIds[0]);
                    this.props.actions.action.commonChange('main.customer.cityId', addrIds[1]);
                    this.props.actions.action.commonChange('main.customer.areaId', addrIds[2]);
                    this.props.actions.action.commonChange('main.customer.streetId', addrIds[3]);
                    const addressInfo = selAreas.reduce((a, b: any) => `${a}${b.addrName} `, '');
                    this.props.actions.action.commonChange('main.addressInfo', addressInfo);
                    this.setState({pickerShow: false});
                  }}
                />
              )}
            </View>

            <FormSelect
              labelName="详细地址"
              selectRight={{flex: 1, justifyContent: 'flex-end'}}
              inputStyle={{flex: 1}}
              value={customerAddress ? customerAddress : '暂时保密'}
              placeholder="请填写详细地址"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user-info/edit-addressInfo/index?customerAccount=${
                    customerAddress ? customerAddress : ''
                  }`,
                });
              }}
              iconVisible={true}
            />
          </View>
          <View className="top select-right-weui-input-color-black">
            <FormSelect
              labelName="联系人"
              value={contactName ? contactName : '暂时保密'}
              placeholder="请填写联系人信息"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user-info/edit-contactName/index?customerAccount=${
                    contactName ? contactName : ''
                  }`,
                });
              }}
              iconVisible={true}
            />
            <FormSelect
              labelName="联系电话"
              value={contactPhone ? contactPhone : '暂时保密'}
              placeholder={'请填写联系电话'}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user-info/edit-contactPhone/index?customerAccount=${
                    contactPhone ? contactPhone : ''
                  }`,
                });
              }}
              iconVisible={true}
            />
          </View>
        </View>
      )
    );
  }
  //选择省市区
  selectAddress = (obj) => {
    if (obj) {
      let {actions} = this.props;
      //获取省事区对应的id
      actions.action.commonChange([
        {
          paths: 'main.customer.provinceId',
          value: obj.provincesId,
        },
        {
          paths: 'main.customer.cityId',
          value: obj.citiesId,
        },
        {
          paths: 'main.customer.areaId',
          value: obj.areasId,
        },
        {
          paths: 'main.addressInfo',
          value: obj.areaInfo,
        },
      ]);
    }
    this.setState({
      pickerShow: false,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
