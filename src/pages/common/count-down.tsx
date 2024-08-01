import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './count-down.less';
import moment from 'dayjs';
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
export default class CountDown extends Component<any, any> {
  timer;
  _isMounted;
  static defaultProps = {
    timeOffset: 0,
    overHandler: () => { },
    timeStyle: {},
    colonStyle: {},
    timeClock: {},
    time: {},
    timeDaysStyle: {},
    hideSeconds: true, //隐藏秒
    parame: {},
    //倒计时结束的处理
    endHandle: () => { },
    //默认展示
    visible: true,
    visibleSecond: false, //是否展示秒数
    //拼团秒杀倒计时样式专用
    groupFlag: false,
    theme: 'default',
    //是否展示天，默认否
    showTimeDays: false,
    prelistFlag: false,
    serverTime: null,
    endTime: null,
    hourFlag: false,
  };

  static externalClasses = ['font-bold'];

  constructor(props) {
    super(props);
    this.state = {
      //默认倒计时时间，正整数，单位：秒
      timeOffset: this.props.timeOffset,
      visible: this.props.visible,
      visibleSecond: this.props.visibleSecond,
      hour: '',
      min: '',
      secound: '',
      day: '',
      serverTime: null,
      endTime: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this._doCount();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { serverTime, endTime, timeOffset, visible } = nextProps;
    if (
      (serverTime && serverTime !== this.state.serverTime) ||
      (endTime && endTime !== this.state.endTime) ||
      timeOffset !== this.state.timeOffset
    ) {
      if (timeOffset == 0) {
        this.setState({
          visible: false,
        });
      } else {
        this.setState({
          serverTime: serverTime,
          endTime: endTime,
          timeOffset:
            endTime && serverTime
              ? moment(endTime)
                .diff(moment(serverTime), 's')
                .toFixed(0)
              : timeOffset,
          visible: visible,
        });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { theme } = this.props;
    //拼团秒杀专用
    // if (this.props.groupFlag && !isH5) {
    //   this._timeFormat(this.state.timeOffset);
    // }
    return this.state.visible && this.state.timeOffset >= 0 ? (
      <View>
        {!this.props.groupFlag ? (
          /**prelistFlag :true 如果是预约活动则组件className为timeprelist **/
          <View
            className={`time ${this.props.prelistFlag ? 'timeprelist' : ''}`}
            style={this.props.timeStyle ? this.props.timeStyle : null}
          >
            {this._timeFormat(this.state.timeOffset)}
          </View>
        ) : isH5 ? (
          <View>{this._Grouptime(this.state.timeOffset)}</View>
        ) : (
              // <View className={this.props.theme === 'black' ? 'group-time black num-bold' : 'group-time'}>
              //   {this.props.showTimeDays && this.state.day !== '00' && (
              //     <View className="hour font-bold">{this.state.day}</View>
              //   )}
              //   {this.props.showTimeDays && this.state.day !== '00' && (
              //     <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>天</View>
              //   )}
              //   <View className="hour font-bold">{this.state.hour}</View>
              //   <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
              //   <View className="min font-bold">{this.state.min}</View>
              //   <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
              //   <View className="secound font-bold">{this.state.secound}</View>
              // </View>
              <View>
                {this._timeFormat(this.state.timeOffset)}
              </View>
            )
            }
      </View>
    ) : null;
  }

  _timeFormat = (timeOffset) => {
    const day = Math.floor(timeOffset / (24 * 3600));
    const hour = Math.floor((timeOffset / 60 / 60) % 24);
    const min = Math.floor((timeOffset / 60) % 60);
    let trueDay = day < 10 ? '0' + day : day;
    const second = timeOffset % 60;
    let trueHour = hour < 10 ? '0' + hour : hour;
    let truemin = min < 10 ? '0' + min : min;
    let trueSec = second < 10 ? '0' + second : second;
    if (trueDay == '00' && trueHour == '00' && truemin == '00' && trueSec == '00') {
      //只显示时分  基础数据会加上59秒
      //清除定时器
      this.props.endHandle(this.props.parame);
    }
    if (this.props.visibleSecond) {
      //天不为0且需要显示的时候
      if (this.props.showTimeDays && trueDay != '00') {
        return `${trueDay}天 ${trueHour}:${truemin}:${trueSec}`;
      } else {
        return `${trueHour}:${truemin}:${trueSec}`;
      }
    } else if (this.props.groupFlag) {
      return (
        <View className={this.props.theme === 'black' ? 'group-time black num-bold' : 'group-time or1'}>
          {this.props.showTimeDays && this.state.day !== '00' && (
            <View className="hour font-bold">{trueDay}</View>
          )}
          {this.props.showTimeDays && this.state.day !== '00' && (
            <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>天</View>
          )}
          <View className="hour font-bold">{trueHour}</View>
          <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
          <View className="min font-bold">{truemin}</View>
          <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
          <View className="secound font-bold">{trueSec}</View>
        </View>
      )
    } else if (this.props.prelistFlag) {
      return trueDay !== '00' ? `${trueDay}天 ${trueHour}:${truemin}:${trueSec}` : `${trueHour}:${truemin}:${trueSec}`;
    } else if (this.props.hourFlag) {
      return trueDay !== '00' ? `${trueDay}天 ${trueHour}:${truemin}:${trueSec}` : trueHour != '00' ? `${trueHour}:${truemin}:${trueSec}` : `${truemin}:${trueSec}`;
    } else {
      return `${trueHour}:${truemin}`;
    }
  };

  _Grouptime = (timeOffset) => {
    console.log('timeOffset==', timeOffset);
    const day = Math.floor(timeOffset / (24 * 3600));
    const hour = Math.floor((timeOffset / 60 / 60) % 24);
    const min = Math.floor((timeOffset / 60) % 60);
    let trueDay = day < 10 ? '0' + day : day;
    const second = timeOffset % 60;
    let trueHour = hour < 10 ? '0' + hour : hour;
    let truemin = min < 10 ? '0' + min : min;
    let trueSec = second < 10 ? '0' + second : second;
    if (trueDay == '00' && trueHour == '00' && truemin == '00' && trueSec == '00') {
      //只显示时分  基础数据会加上59秒
      //清除定时器
      this.props.endHandle(this.props.parame);
    }

    return (
      <View className={this.props.theme === 'black' ? 'group-time black' : 'group-time'}>
        {this.props.showTimeDays && trueDay !== '00' && <View className="hour font-bold">{trueDay}</View>}
        {this.props.showTimeDays && trueDay !== '00' && (
          <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>天</View>
        )}
        <View className="hour font-bold">{trueHour}</View>
        <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
        <View className="min font-bold">{truemin}</View>
        <View className={this.props.groupFlag ? 'symbol' : 'symbol'}>:</View>
        <View className="secound font-bold">{trueSec}</View>
      </View>
    );
  };

  /**
   * 计时器倒计时
   */
  _doCount = () => {
    this.timer = setInterval(() => {
      if (this.state.timeOffset <= 1) {
        clearTimeout(this.timer);
        this.props.overHandler();
      }
      if (this._isMounted) {
        this.setState({
          timeOffset: this.state.timeOffset - 1,
        });
      } else {
        clearTimeout(this.timer);
      }
    }, 1000);
  };
}
