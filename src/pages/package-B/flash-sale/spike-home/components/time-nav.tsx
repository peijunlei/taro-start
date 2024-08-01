import {View, ScrollView, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './time-nav.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import logo from '@/assets/image/goods/logo.png';
type ITimeNavProps = T.IProps & T.ITimeNavProps;

@connect<Partial<ITimeNavProps>, T.ITimeNavState>(store2Props, actions)
export default class TimeNav extends Component<Partial<ITimeNavProps>, T.ITimeNavState> {
  _cateRefs = [];
  _scroll;
  constructor(props: ITimeNavProps) {
    super(props);
    Taro.getSystemInfo({
      success: (res) => {
        this.state = {
          // 获取窗口宽度，尺寸不写死，根据宽度动态计算
          windowWidth: res.windowWidth,
        };
      },
    });
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main: {sceneList, activityDate, activityTime, isLoadingList},
    } = this.props;

    //找到正在抢购的下标
    let activeIndex = null;
    sceneList.forEach((item, index) => {
      if (item.activityDate.includes(activityDate) && item.activityTime.includes(activityTime)) {
        activeIndex = index + 1;
      }
    });

    return (
      <View className="timeNav">
        <View className="item">
          <Image src={logo} className="logo" />
        </View>
        <ScrollView
          className="scrollView"
          scrollLeft={activeIndex > 3 ? ((activeIndex - 3) * 61.02 * this.state.windowWidth) / 375 : 0}
          scrollX
          scrollWithAnimation
          ref={(ref) => {
            this._scroll = ref;
          }}
        >
          {sceneList &&
            sceneList.map((scene, index) => {
              return (
                <View
                  ref={(dom) => {
                    this._cateRefs[scene.activityFullTime] = dom;
                  }}
                  key={index}
                  className="item"
                  onClick={() => {
                    if(isLoadingList) return
                    if(activityDate === scene.activityDate && activityTime === scene.activityTime) return;
                    action.setScene(scene.activityDate, scene.activityTime, scene.status)
                  }}
                >
                  <View
                    className={
                      activityDate == scene.activityDate && activityTime == scene.activityTime
                        ? 'time sale-time'
                        : 'time'
                    }
                  >
                    {scene.activityTime}
                  </View>
                  <View
                    className={
                      activityDate == scene.activityDate && activityTime == scene.activityTime ? 'sale' : 'info'
                    }
                  >
                    {scene.status}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
