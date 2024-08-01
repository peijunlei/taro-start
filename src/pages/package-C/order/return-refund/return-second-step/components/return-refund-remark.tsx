import {View, Button, Text, Textarea} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-refund-remark.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IReturnRefundRemarkProps = T.IProps & T.IReturnRefundRemarkProps;

@connect<Partial<IReturnRefundRemarkProps>, T.IReturnRefundRemarkState>(store2Props, actions)
export default class ReturnRefundRemark extends Component<
  Partial<IReturnRefundRemarkProps>,
  T.IReturnRefundRemarkState
> {
  constructor(props: IReturnRefundRemarkProps) {
    super(props);
  }

  /**
      退货退款备注
  */
  render() {
    let {
      actions: {
        action: {changeFromValue},
      },
      main,
    } = this.props;

    return (
      <View className="returnRefundRemark ">
        <Text className="check-title">退货描述和凭证</Text>
        <Textarea
          className="mess-text"
          value={main?.bigImageShow ? '' : main?.description}
          maxlength={100}
          cursorSpacing={50}
          placeholder={
            main?.bigImageShow ? '' : '请描述退货原因，还可上传退货凭证，如：货物受损图片，提高审核通过的几率。'
          }
          onInput={(e) => {
            changeFromValue('description', e.detail.value);
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
