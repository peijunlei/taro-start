import 'taro-ui/dist/style/components/modal.scss';
import {View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import {AtModal} from 'taro-ui';
import {AtModalProps} from 'taro-ui/@types/modal';

export default class WMMask extends Component<AtModalProps, any> {
  constructor(props: AtModalProps) {
    super(props);
  }

  /**

*/
  render() {
    let {isOpened, title, content, confirmText, cancelText, onConfirm, onCancel} = this.props;
    return isOpened ? (
      <View className="common-mask">
        <View className="common-mask-container">
          <View className="common-mask-header">
            <Text className="common-mask-header-title">{title}</Text>
          </View>
          <View className="common-mask-body">
            <Text className="common-mask-body-text">{content}</Text>
          </View>
          <View className="common-mask-btn">
            <View className="common-mask-btn-cancel" onClick={onCancel}>
              {cancelText}
            </View>
            <View className="common-mask-btn-true" onClick={onConfirm}>
              {confirmText}
            </View>
          </View>
        </View>
      </View>
    ) : null;
  }
}

//create by moon https://github.com/creasy2010/moon
