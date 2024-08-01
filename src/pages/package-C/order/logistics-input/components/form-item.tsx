import {View, Button, Text, Image, Input, Picker} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import WMButton from '@/pages/common/button';
import * as T from '../types';
import './form-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import arrowImg from '@/assets/image/common/arrow.png';
import {cache} from 'config';
import moment from 'dayjs';

type IFormItemProps = T.IProps & T.IFormItemProps;

@connect<Partial<IFormItemProps>, T.IFormItemState>(store2Props, actions)
export default class FormItem extends Component<Partial<IFormItemProps>, T.IFormItemState> {
  constructor(props: IFormItemProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  /**

*/
  render() {
    let {
      main,
      actions: {
        action: {commonChange, changeLogistics, save},
      },
      main: {form, newLogisticsList, checkLogistics},
    } = this.props;
    return (
      main && (
        <View className="payment">
          <View className="from-select chose-logistics">
            <Text className="select-label">物流公司</Text>
            {/* <View className="value"> */}
            <Picker
              mode="selector"
              range={newLogisticsList}
              value={checkLogistics}
              onChange={(e) => {
                changeLogistics(e.detail.value);
              }}
              style={{flex: 1}}
            >
              <View className={newLogisticsList[checkLogistics] ? 'fs28 c333' : 'fs28 c999'}>
                {newLogisticsList[checkLogistics] ? newLogisticsList[checkLogistics] : '选择物流公司'}
              </View>
            </Picker>
            {/* </View> */}
            <Image className="arrow" src={arrowImg} />
          </View>
          <View className="from-textArea">
            <Text className="select-label">物流单号</Text>
            <Input
              className="mess-text"
              placeholder="点此输入物流单号"
              onInput={(e) => {
                commonChange('main.form.logisticsNo', e.detail.value);
              }}
            />
          </View>

          <View className="from-select">
            <Text className="select-label">发货时间</Text>
            {/* <View className="value"> */}
            <Picker
              mode="date"
              style={{flex: 1}}
              onChange={(e) => {
                commonChange('main.form.formatTime', e.detail.value);
              }}
            >
              <View className={form.formatTime ? 'fs28 c333' : 'fs28 c999'}>
                {form.formatTime ? form.formatTime : '选择发货时间'}
              </View>
            </Picker>
            {/* </View> */}
            <Image className="arrow" src={arrowImg} />
          </View>

          <View
            className="bottom"
            onClick={() => {
              save();
            }}
          >
            <WMButton size="large" theme="primary">
              保存
            </WMButton>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
