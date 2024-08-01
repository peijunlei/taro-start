import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/group.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
type IGroupProps = T.IProps & T.IGroupProps;

@connect<Partial<IGroupProps>, T.IGroupState>(store2Props, actions)
export default class Group extends Component<Partial<IGroupProps>, T.IGroupState> {
  constructor(props: IGroupProps) {
    super(props);
  }

  /**
    拼团
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    const alreadyGrouponNum = main?.grouponActivity?.alreadyGrouponNum;
    //拼团结束时间
    const endTime = moment(main?.grouponActivity?.endTime);
    return (
      <View className="group">
        <View className="left">
          <Text className="people">
            {main?.grouponActivity?.grouponNum}
            <Text className="text">人团</Text>
          </Text>
        </View>
        <View className="right">
          <View className="time-down">
            <Text className="group-name">距离开团结束</Text>
            {main && main.serverTime > 0 && (
              <CountDown
                allowFontScaling={false}
                //倒计时结束跳转首页 照搬H5
                endHandle={() => {
                  Taro.switchTab({
                    url: '/pages/index/index',
                  });
                }}
                serverTime={main.serverTime}
                endTime={endTime}
                numberOfLines={1}
                groupFlag={true}
                showTimeDays={true}
                timeOffset={moment(endTime)
                  .diff(moment(main.serverTime), 's')
                  .toFixed(0)}
                // timeOffset={ 10 }
                font-bold="font-bold"
              />
            )}
          </View>
          <Text className="info">
            <Text className="num">{alreadyGrouponNum || "0"}</Text>
            人已成团
          </Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
