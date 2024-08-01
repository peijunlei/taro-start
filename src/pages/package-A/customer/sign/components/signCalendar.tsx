import {View, Text, Image} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './signCalendar.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {compose} from 'redux';
import classNames from 'classnames';
import pointImg from '@/assets/image/common/point.png';
import WMButton from '@/pages/common/button';
import {AtModal} from 'taro-ui';

type ISignCalendarProps = T.IProps & T.ISignCalendarProps;

@connect<Partial<ISignCalendarProps>, T.ISignCalendarState>(store2Props, actions)
export default class SignCalendar extends Component<Partial<ISignCalendarProps>, T.ISignCalendarState> {
  constructor(props: ISignCalendarProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
      // main: {isOpened, toastContent},
    } = this.props;
    let signFlag = main?.signFlag;
    let pointsFlag = main?.pointsFlag;
    let signPoint = main?.signPoint ? main.signPoint : 0;
    let growthValue = main?.growthValue ? main.growthValue : 0;
    const days = this.getDays(main?.daysNumArr, main?.signRecordList);
    const start = compose(this.getEmpty, this.getStartDay)();

    return (
      <View className="calendar">
        {signFlag ? (
          <View>
            {pointsFlag ? (
              <View className="calender-content">
                <View className="calendar-point">
                  今日已签到,获得
                  <Text className="calendar-point-points">
                    <Text className="calendar-point-points calendar-point-points-big">{signPoint}</Text>
                  </Text>
                  积分
                </View>
                <View className="calendar-point">
                  <Text className="calendar-point-points">
                    <Text className="calendar-point-points calendar-point-points-big">{growthValue}</Text>
                  </Text>
                  成长值
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            {pointsFlag ? (
              <View className="calender-content">
                <View className="calendar-point">
                  今日签到可得
                  <Text className="calendar-point-points">
                    <Text className="calendar-point-points calendar-point-points-big"> {signPoint} </Text>
                  </Text>
                  积分
                </View>
                <View className="calendar-point">
                  <Text className="calendar-point-points">
                    <Text className="calendar-point-points calendar-point-points-big"> {growthValue} </Text>
                  </Text>
                  成长值
                </View>
              </View>
            ) : null}
          </View>
        )}

        <View className="calendar-title">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((item, index) => (
            <View key={index} className="calendar-title-item">
              {item}
            </View>
          ))}
        </View>
        <View className="calendar-content">
          {[...Array(start).keys()].map((item, index) => (
            <View key={index} className="calendar-content-item-empty"></View>
          ))}
          {days.map((date:any, index) =>
            date && typeof date != 'number' ? (
              <View key={index} className="calendar-content-seven">
                <View className="calendar-content-item signed">
                  <View className="small-text">+{date.points}</View>
                  <View className="small-text">已签</View>
                </View>
              </View>
            ) : (
              <View key={index} className="calendar-content-seven">
                <View className="calendar-content-item">
                  <Image src={pointImg} className="point-img" />
                  {(date + 1 + '').padStart(2)}
                </View>
              </View>
            ),
          )}
        </View>
        {signFlag ? (
          <WMButton className="wm-btn-disabled" size="large" theme={'primary'} disabled>
            已签到
          </WMButton>
        ) : (
          <Button size="large" type={'primary'} onClick={async () => {
            await action.sign();
            await this.props.actions.init()
          }}>
            立即签到
          </Button>
        )}
        {/* <View className="modal">
          <AtModal
            isOpened={isOpened}
            content={toastContent}
            confirmText=""
            onConfirm={() => {
              action.commonChange('main.isOpened', false);
            }}
            className = "message"
          ></AtModal>
        </View> */}
      </View>
    );
  }

  /*判断当前是否签到*/
  isSigned = (daySign) => {
    //todo在这获取签到日期数据
    let {
      actions: {action},
      main,
    } = this.props;
    const signDays = main?.daysNumArr;
    return signDays?.includes(daySign + 1);
  };

  /**
   * 获取当前月份1号是星期几
   */
  getStartDay = () => {
    const now = new Date();
    const date = now.getDate();
    const day = now.getDay();
    const result = day - ((date % 7) - 1);
    return result < 0 ? 7 + result : result;
  };
  getEmpty = (emptyNum) => (emptyNum ? emptyNum : 7) - 1;

  /*获取当前月份的总天数*/
  getDays = (daysNumArr, signRecordList) => {
    if (!daysNumArr) {
      daysNumArr = []
    }
    if (!signRecordList) {
      signRecordList = []
    }
    const date = new Date();
    const date1 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [...Array(date1.getDate()).keys()];
    days.map((v, index) => {
      daysNumArr.map((k, y) => {
        if (v == k-1) {
         days[index] = signRecordList[y];
        }
      });
    });
    return days;
  };

  /*生成开始日期之前补空dom*/
  emptyRender = (days) => {
    Array(days - 1).map((item, index) => <View key={index} className="calendar-content-item-empty"></View>);
  };

  /*生成当前月dom*/
  dateRender = (days) => {
    console.log(days);
    return [...Array(days).keys()].map((date, index) => (
      <View key={index} className={classNames('calendar-content-item', {signed: this.isSigned(date)})}>
        <Image src={pointImg} className="point-img" />
        {(date + '').padStart(2)}
      </View>
    ));
  };
}

//create by moon https://github.com/creasy2010/moon
