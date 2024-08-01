import {View, Button, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../../types';
import './rule-modal.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {_} from 'wmkit';

// const user = require('@/assets/image/customer/user-center/default.png');
const close = require('@/assets/image/distribution/close.png');

type IRuleModalProps = T.IProps & T.IRuleModalProps;

@connect<Partial<IRuleModalProps>, T.IRuleModalState>(store2Props, actions)
export default class SalesRuleModal extends Component<Partial<IRuleModalProps>, T.IRuleModalState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IRuleModalProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {isRuleShow, performanceDesc},
      isShow,
    } = this.props;

    return (
      isShow && (
        <View
          className="salesRuleModal"
          onClick={(e) => {
            e.stopPropagation();
            commonChange('main.isRuleShow', !isRuleShow);
          }}
        >
          <View
            className="modalBox"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <View className="contentBox">
              <Text className="title">分销等级规格</Text>
              <RichText nodes={_.formatRichText(performanceDesc)} />
            </View>
            <Image
              src={close}
              className="close"
              onClick={() => {
                commonChange('main.isRuleShow', !isRuleShow);
              }}
            />
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
