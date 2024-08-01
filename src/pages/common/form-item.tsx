import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './form-item.less';
import { getPrivacySetting,msg } from 'wmkit';
export interface IFormItemProps {
  labelName?: string;
  placeholder?: string;
  // 输入框样式
  textStyle?: Object;
  leftStyle?: Object;
  styles?: Object;
  showCopy: boolean
}

/**
 * form中普通展示项
 */
export default class FormItem extends Component<IFormItemProps, any> {
  constructor(props: IFormItemProps) {
    super(props);
  }

  render() {
    const { labelName, showCopy = false, placeholder, textStyle, leftStyle, styles } = this.props;
    return (
      <View className="form-item flex-start-item" style={styles}>
        <Text className="form-text" style={leftStyle}>
          {labelName}
        </Text>
        <View className="form-context2">
          <Text className="select-text" style={textStyle}>
            {placeholder}
            {showCopy &&
              <Text
                className="copy"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: placeholder,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: placeholder,
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });

                }}
              >
                复制
              </Text>
            }
          </Text>
        </View>
      </View>
    );
  }
}
