import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/sales-top.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import question from '@/assets/image/distribution/question.png';
import rArrowIcon from '@/assets/image/goods/goods-list/r-arrow.png';
import SalesRuleModal from '../components/sales-rule-modal';
const warrow = require('@/assets/image/common/white-arrow.png');

type ISalesConfirmProps = T.IProps & T.ISalesConfirmProps;

@connect<Partial<ISalesConfirmProps>, T.ISalesConfirmState>(store2Props, actions)
export default class SalesTop extends Component<Partial<ISalesConfirmProps>, T.ISalesConfirmState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISalesConfirmProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {changeRuleShow},
      },
      // main,
    } = this.props;

    return (
      <View className="salesConfirm">
        <View
          className="salesC-left"
          onClick={() => {
            changeRuleShow();
          }}
        >
          <Image src={question} className="question" />
          业绩规则
          <Image src={rArrowIcon} className="arrowImg" />
        </View>
        <View
          className="salesC-right"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/package-B/sales/sales-rank/index`,
            });
          }}
        >
          <Text className="salesC-right-text">排行榜</Text>
          <Image src={warrow} className="arrowImg" />
        </View>
        <SalesRuleModal />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
