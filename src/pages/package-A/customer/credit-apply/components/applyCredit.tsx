import {View, Textarea, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button} from '@wanmi/ui-taro';
import * as T from '../types';
import './applyCredit.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import lo from 'lodash';
type IApplyCreditProps = T.IProps & T.IApplyCreditProps;

@connect<Partial<IApplyCreditProps>, T.IApplyCreditState>(store2Props, actions)
export default class ApplyCredit extends Component<Partial<IApplyCreditProps>, T.IApplyCreditState> {
  constructor(props: IApplyCreditProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="ApplyCredit" catchMove>
        <View className="apply-name">申请说明</View>
        <View className="apply-input">
          <Textarea
            style={{width: '100%', fontSize: '14px'}}
            className="mess-text"
            maxlength={500}
            cursorSpacing={50}
            placeholderStyle="fontSize:14px;height:24px"
            placeholder="请输入，500字以内"
            value={main.applyInfo}
            onInput={(e) => {
              action.commonChange('main.applyInfo', e.target.value);
            }}
          />
        </View>

        <View className="credit-submit-apply">
          {main.applyInfo ? (
            <Button onClick={lo.debounce(() => action.applySubmit(), 100)}>提交申请</Button>
          ) : (
            <Button disabled>提交申请</Button>
          )}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
