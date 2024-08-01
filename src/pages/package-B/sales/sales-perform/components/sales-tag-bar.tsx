import {View, Button, Text, Image, Picker} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/sales-tag-bar.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dArrowIcon from '@/assets/image/goods/goods-list/d-arrow.png';

import whiteDown from '@/assets/image/distribution/white-down.png';

type ISalesTagBarProps = T.IProps & T.ISalesTagBarProps;

@connect<Partial<ISalesTagBarProps>, T.ISalesTagBarState>(store2Props, actions)
export default class SalesTagBar extends Component<Partial<ISalesTagBarProps>, T.ISalesTagBarState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props: ISalesTagBarProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {
        action: {changeDayOrMonthFlag, changeChoiceTab, changeMonth, commonChange},
      },
      main,
    } = this.props;

    return (
      main && (
        <View className="salesTagBar">
          <View className="tag-bar">
            <View
              className={main.dayOrMonthFlag ? 'tag-bar-item ' : 'tag-bar-item curr'}
              onClick={() => {
                changeDayOrMonthFlag(false);
              }}
            >
              日销售业绩
              <Text className="line" />
            </View>
            <View
              className={main.dayOrMonthFlag ? 'tag-bar-item  curr' : 'tag-bar-item '}
              onClick={() => {
                changeDayOrMonthFlag(true);
              }}
            >
              月销售业绩
              <Text className="line" />
            </View>
          </View>
          {!main.dayOrMonthFlag && (
            <View className="day-tag-bar">
              <View
                className={main.choiceTabFlag == 1 ? 'day-item curr' : 'day-item'}
                onClick={() => {
                  changeChoiceTab(1, {});
                }}
              >
                最近7天
              </View>
              <View
                className={main.choiceTabFlag == 2 ? 'day-item curr' : 'day-item'}
                onClick={() => {
                  changeChoiceTab(2, {});
                }}
              >
                最近30天
              </View>
              <Picker
                ref={(picker) => {
                  this.picker = picker;
                }}
                style={{zIndex: 999}}
                mode="selector"
                range={main.monthData}
                rangeKey={'value'}
                onChange={(e) => {
                  changeMonth(e.detail.value);
                }}
                className="picker-icon"
              >
                <View className={main.choiceTabFlag == 3 ? 'day-item month curr' : 'day-item month'}>
                  {main.monthStr}
                  <Image src={main.choiceTabFlag == 3 ? whiteDown : dArrowIcon} className="arrow" />
                </View>
              </Picker>
            </View>
          )}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
