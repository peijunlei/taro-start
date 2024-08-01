import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './bottom-btn.less';
import moment from 'dayjs';
import {ifLogin} from '@/utils/common-functions';
import prizeRule from '@/assets/image/prize-draw/prize-rule.png';
import myPrize from '@/assets/image/prize-draw/my-prize.png';
type IBottomBtnProps = T.IProps & T.IBottomBtnProps;
import {debounce} from 'lodash';
const drawTimesTypeText = {
  0: '今日',
  1: '本周',
  2: '本月',
  3: '您',
};

@connect<Partial<IBottomBtnProps>, T.IBottomBtnState>(store2Props, actions)
export default class BottomBtn extends Component<Partial<IBottomBtnProps>, T.IBottomBtnState> {
  constructor(props: IBottomBtnProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      main: {leftDrawCount, drawTimesType, activityContent, startTime, endTime, pointsAvailable, activityId, drawType},
      actions,
    } = this.props;
    const isLogin = ifLogin();
    return (
      <View className="bottomBtn">
        {(moment(endTime).isAfter(moment(Date.now())) || typeof pointsAvailable === 'number') && (
          <Text className="pd-info">
            {drawType === 1 && typeof pointsAvailable === 'number' && pointsAvailable >= 0 && (
              <>
                现有积分：<Text className="pd-info-text">{pointsAvailable?.toString()}</Text>&nbsp;&nbsp;
              </>
            )}
            {moment(endTime).isAfter(moment(Date.now())) && (
              <>
                {drawTimesTypeText[drawTimesType]}还可抽奖：
                <Text className="pd-info-text">{leftDrawCount?.toString()}</Text>次
              </>
            )}
          </Text>
        )}
        <View className="pd-btn">
          <View
            className="pd-btn-item"
            onClick={debounce(async () => {
              //缓存规则信息
              await Taro.setStorageSync('mini::prize-draw-activityContent', activityContent);
              await Taro.navigateTo({
                url: `/pages/package-C/lottery/prize-draw-rule/index`,
                complete: () => {
                  actions?.clean();
                },
              });
            }, 1000)}
          >
            <Image mode="aspectFit" className="pd-btn-icon" src={prizeRule} />
          </View>
          <View
            className="pd-btn-item"
            onClick={debounce(() => {
              if (!isLogin) {
                Taro.navigateTo({
                  url: '/pages/package-A/login/login/index',
                  complete: () => {
                    actions?.clean();
                  },
                });
                return;
              }
              Taro.navigateTo({
                url: `/pages/package-C/lottery/prize-list/index?id=${activityId}`,
                complete: () => {
                  actions?.clean();
                },
              });
            })}
          >
            <Image mode="aspectFit" className="pd-btn-icon" src={myPrize} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
