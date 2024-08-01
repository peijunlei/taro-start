import {View, Button, Text, Picker} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMFormInput from '@/pages/common/form-input';
import FormSelect from '@/pages/common/form-select';
import businessIndustries from '../../../../../wmkit/common/json/business/businessIndustry.json';
import businessEmployeeNums from '../../../../../wmkit/common/json/business/businessEmployeeNums.json';
import businessNature from '../../../../../wmkit/common/json/business/businessNature.json';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.main) {
      return <View />;
    }
    let {
      actions: {action},
      main: {enterpriseInfoVO, enterpriseNum, industry},
    } = this.props;

    //遍历企业人数/企业行业选择项
    const businessIndustry = businessIndustries.map((item) => item.label);
    const businessEmployeeNum = businessEmployeeNums.map((item) => item.label);

    console.log('enterpriseInfoVO', enterpriseInfoVO);
    //公司性质
    //不使用3元运算和index查询
    // businessNatureType = enterpriseInfoVO?.enterpriseId
    //   ? businessNature[enterpriseInfoVO?.businessNatureType-1].label
    //   : '';
    let businessNatureType = '';
    if (enterpriseInfoVO.enterpriseId) {
      const type = businessNature.find((item) => enterpriseInfoVO?.businessNatureType === item.value);
      if (type) {
        businessNatureType = type.label;
      }
    }
    return (
      <View className="user-enter-info">
        <View className="edit_info">
          <WMFormInput
            label="公司性质"
            type="text"
            placeholder=""
            value={businessNatureType}
            underline={true}
            maxlength={15}
            disabled={true}
            inputTextAlign="right"
            inputTextColor="rgb(153, 153, 153)"
          />
        </View>
        <View className="edit_info">
          <WMFormInput
            label="公司名称"
            type="text"
            placeholder=""
            value={enterpriseInfoVO?.enterpriseName}
            underline={true}
            maxlength={15}
            disabled={true}
            inputTextAlign="right"
            inputTextColor="rgb(153, 153, 153)"
          />
        </View>
        <View className="picker">
          <Picker
            mode="selector"
            range={businessEmployeeNum}
            onChange={(e) => {
              action.onChange('main.enterpriseNum', e.detail.value, businessEmployeeNums);
            }}
            value={this.props.main.enterpriseNumValue}
          >
            <FormSelect
              labelName="企业人数"
              value={enterpriseNum}
              placeholder="请选择"
              leftStyle={{fontSize: '14px'}}
              // selectRight={{flex: 1, justifyContent: 'space-between', textAlign: 'right'}}
              textStyle={{fontWeight: 400, fontSize: '14px', color: 'rgba(0,0,0,0.8)'}}
            />
          </Picker>
        </View>
        <View className="picker">
          <Picker
            mode="selector"
            range={businessIndustry}
            onChange={(e) => {
              action.onChange('main.industry', e.detail.value, businessIndustries);
            }}
            value={this.props.main.industryValue}
          >
            <FormSelect
              labelName="企业行业"
              value={industry}
              placeholder="请选择"
              leftStyle={{fontSize: '14px'}}
              // selectRight={{flex: 1, justifyContent: 'space-between', textAlign: 'right'}}
              textStyle={{fontWeight: 400, fontSize: '14px', color: 'rgba(0,0,0,0.8)'}}
            />
          </Picker>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
