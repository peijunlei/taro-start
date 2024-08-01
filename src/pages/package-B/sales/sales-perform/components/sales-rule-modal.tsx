import {View, ScrollView, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/sales-rule-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import close from '@/assets/image/distribution/close.png';

type ISalesConfirmProps = T.IProps & T.ISalesConfirmProps;

@connect<Partial<ISalesConfirmProps>, T.ISalesConfirmState>(store2Props, actions)
export default class SalesRuleModal extends Component<Partial<ISalesConfirmProps>, T.ISalesConfirmState> {
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
        action: {commonChange},
      },
      main,
    } = this.props;

    return (
      main && (
        <View
          className={main.isRuleShow == false ? 'salesRuleModal' : 'salesRuleModal show-picker'}
          onClick={(e) => {
            e.stopPropagation();
            commonChange('main.isRuleShow', false);
          }}
        >
          <View
            className="modalBox"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <View className="contentBox">
              <Text className="title">业绩统计规则</Text>
              <ScrollView scrollY style={{height: '60vh'}}>
                <RichText className="content" nodes={_.formatRichText(main.performanceDesc)} />
              </ScrollView>
            </View>
            <Image
              src={close}
              className="close"
              onClick={() => {
                commonChange('main.isRuleShow', !main.isRuleShow);
              }}
            />
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
