import {View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './screen-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type IScreenModalProps = T.IProps & T.IScreenModalProps;
@connect<Partial<IScreenModalProps>, T.IScreenModalState>(store2Props, actions)
export default class ScreenModal extends Component<Partial<IScreenModalProps>, T.IScreenModalState> {
  constructor(props: IScreenModalProps) {
    super(props);
  }
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View
        className="screenModal"
        onClick={() => {
          action.commonChange('main.navToolsObj.screenIsShow', false);
          action.submitChooseCate();
        }}
      >
        <View className="screen-content">
          {/* 分类 */}
          <View className="up-content">
            {/* 品牌 */}
            <View className="screen-box">
              <View className="screen-title">品牌</View>
              <View className="screen-list">
                {main &&
                  main.goodsBrands.length > 0 &&
                  main.goodsBrands.map((item, index) => {
                    return (
                      <View
                        className={
                          main.request.brandIds.includes(item.brandId) ? 'screen-item active-item' : 'screen-item'
                        }
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.chooseBrands(item.brandId);
                        }}
                      >
                        <Text className="screen-text">
                          {item.brandName}
                          {item.nickName ? `(${item.nickName})` : ''}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>

          {/* 按钮 */}
          <View className="screen-two-btn">
            <View
              className="reset-btn"
              onClick={(e) => {
                e.stopPropagation();
                action.resetCates();
              }}
            >
              重置
            </View>
            <View
              className="confire-btn"
              onClick={(e) => {
                e.stopPropagation();
                action.submitChooseCate();
              }}
            >
              确定
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
