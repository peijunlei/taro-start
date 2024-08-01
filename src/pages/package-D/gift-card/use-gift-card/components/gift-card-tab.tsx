/*
 * @Author:
 * @Date: 2022-12-22 15:28:27
 * @Description:
 */
import {Text, View, Image} from '@tarojs/components';
import React, {Component} from 'react';
import * as T from '../types';
import {TabType} from '../types';
import './gift-card-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import IconFont from '@/wmkit/common/iconfont';
import iconTip from '@/assets/image/gift-card/icon-tip.png';

type IGiftCardTabProps = T.IProps & T.IGiftCardTabProps;

@connect<Partial<IGiftCardTabProps>, T.IGiftCardTabState>(store2Props, actions)
export default class GiftCardTab extends Component<Partial<IGiftCardTabProps>, T.IGiftCardTabState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;

    return (
      <View className="gift-card-tab">
        <View className="tip-info">
          <IconFont className="tip-info-rule-img" value="tishi" size={12} color="var(--themeColor)" />
          {/* <Image className="tip-icon" src={iconTip} /> */}
          <Text className="tip-text">
            根据所选卡列表依次进行扣款；优先扣第一张，如余额大于订单金额，则完成支付；如未完成，继续扣第二张，依次类推。
          </Text>
        </View>
        <View className="main-tab">
          <View
            className={`tab-item ${main.tab === TabType.USABLE ? 'tab-item-active' : ''}`}
            onClick={() => action.changeTab(TabType.USABLE)}
          >
            <Text className="tab-text">可用卡包({main.validNum})</Text>
            <View className="tab-line" />
          </View>
          <View
            className={`tab-item ${main.tab === TabType.UN_USABLE ? 'tab-item-active' : ''}`}
            onClick={() => action.changeTab(TabType.UN_USABLE)}
          >
            <Text className="tab-text">不可用卡包({main.invalidNum})</Text>
            <View className="tab-line" />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
