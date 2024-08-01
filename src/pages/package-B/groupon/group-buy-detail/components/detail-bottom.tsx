import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './detail-bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
import CountDown from '@/pages/common/count-down';

type IDetailBottomProps = T.IProps & T.IDetailBottomProps;

const addImage = require('@/assets/image/groupon/add2x.png');
import userImg from '@/assets/image/customer/user-center/default.png';

const buttonText = {
  //活动已结束
  2: '快去看看其他团吧~',
  4: '我要参团',
  5: '我也开个团',
  //已经参团，拼团成功，等待收货
  7: '看看其他团购',
  8: '邀请好友',
};

@connect<Partial<IDetailBottomProps>, T.IDetailBottomState>(store2Props, actions)
export default class DetailBottom extends Component<Partial<IDetailBottomProps>, T.IDetailBottomState> {
  constructor(props: IDetailBottomProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    const endTime = moment(main.grouponDetails.grouponActivity.endTime);
    console.log(main.grouponDetails.customerVOList.length, 'main.grouponDetails.customerVOList.length---->');
    return (
      <View className="detailBottom">
        <View className="join-people">
          {main.grouponDetails.customerVOList.length > 0 &&
            main.grouponDetails.customerVOList.map((item, index) => {
              return (
                <View style={{position: 'relative'}} key={index}>
                  <View
                    className={
                      (index + 1) % 5 == 0
                        ? 'avatar-container avatar-container-last first-item'
                        : 'avatar-container first-item'
                    }
                  >
                    <Image src={item.headimgurl ? item.headimgurl : userImg} className="avatar" />
                  </View>
                  {main.grouponDetails.groupCustomerId == item.customerId && <View className="leader">团长</View>}
                </View>
              );
            })}
          {main.grouponDetails.grouponActivity.waitGrouponNum > 0 &&
            Array.from({length: main.grouponDetails.grouponActivity.waitGrouponNum}).map((v, index) => {
              return (
                <View
                  key={index}
                  className={
                    (index + 1 + main.grouponDetails.customerVOList.length) % 5 == 0
                      ? 'avatar-container avatar-container-last'
                      : 'avatar-container'
                  }
                  onClick={() =>
                    this.props.actions.doGroup(
                      main.grouponNo,
                      main.grouponDetails.goodInfoId,
                      main.grouponDetails.grouponDetailOptStatus,
                    )
                  }
                >
                  <Image src={addImage} className="avatar" />
                </View>
              );
            })}
        </View>
        <View className="info">
          {main.grouponDetails.grouponDetailOptStatus == '2' ? (
            <Text className="info-text">活动已结束，你来晚了</Text>
          ) : main.grouponDetails.grouponDetailOptStatus == '5' ? (
            <Text className="info-text">来晚一步，已成功组团!</Text>
          ) : main.grouponDetails.grouponDetailOptStatus == '7' ? (
            <Text className="info-text">拼团成功，等待收货吧!</Text>
          ) : (
            <Text className="info-text">还差{main.grouponDetails.grouponActivity.waitGrouponNum}人组团成功，</Text>
          )}

          {main.grouponDetails.grouponDetailOptStatus == '4' || main.grouponDetails.grouponDetailOptStatus == '8' ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountDown
                endHandle={() => {
                  this.props.actions.init(main.grouponNo);
                }}
                visibleSecond={true}
                showTimeDays={true}
                timeStyle={{color: '#ff6600'}}
                timeOffset={moment(endTime)
                  .diff(moment(moment()), 's')
                  .toFixed(0)}
                // timeOffset={10}
              />
              <Text className="info-text">后结束</Text>
            </View>
          ) : null}
        </View>
        <View
          className="button"
          onClick={() =>
            this.props.actions.doGroup(
              main.grouponNo,
              main.grouponDetails.goodInfoId,
              main.grouponDetails.grouponDetailOptStatus,
            )
          }
        >
          <Text className="btn-text">{buttonText[main.grouponDetails.grouponDetailOptStatus]}</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
