import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View, Text, Image} from '@tarojs/components';
import './index.less';
import {ifLogin} from '@/utils/common-functions';
import {getGlobalData} from '@/service/config';
import pack from '@/assets/image/tabbar/pack.jpg';
import packCur from '@/assets/image/tabbar/pack-s.jpg';
import hot from '@/assets/image/tabbar/hot.png';
import hotCur from '@/assets/image/tabbar/hot-1.png';
import wanfa from '@/assets/image/tabbar/wanfa.png';
import wanfaCur from '@/assets/image/tabbar/wanfa-1.png';
import my from '@/assets/image/tabbar/my.png';
import myCur from '@/assets/image/tabbar/my-1.png';
const data = [
  {
    image: pack,
    imageCur: packCur,
    title: '拼购',
    url: '/pages/package-B/groupon/groupon-center/index',
  },
  {
    image: hot,
    imageCur: hotCur,
    title: '热拼排行',
    url: '/pages/package-B/groupon/groupon-selection/index',
  },
  {
    image: wanfa,
    imageCur: wanfaCur,
    title: '玩法介绍',
    url: '/pages/package-B/groupon/groupon-rule/index',
  },
  {
    image: my,
    imageCur: myCur,
    title: '我的拼购',
    url: '/pages/package-B/groupon/customer-groupon-list/index',
  },
];

interface WMGrouponFooterProps {
  //标题
  currTab: string;
}

interface WMGrouponFooterState {
  currTab: string;
}
const isIphoneX = getGlobalData('isIphoneX');
export default class WMGrouponFooter extends Component<WMGrouponFooterProps, WMGrouponFooterState> {
  constructor(props) {
    super(props);
    this.state = {
      currTab: this.props.currTab,
    };
  }

  render() {
    const {currTab} = this.state;
    return (
      <View>
        <View className="wm-bar-bottom">
          {data.map((item, index) => {
            return (
              <View
                // key={Math.random()}
                key={index}
                className="conBox"
                onClick={() => {
                  this.setState(
                    {
                      currTab: item.title,
                    },
                    () => {
                      !ifLogin() && index === 3
                        ? Taro.navigateTo({
                            url: '/pages/package-A/login/login/index',
                          })
                        : Taro.redirectTo({
                            url: item.url,
                          });
                    },
                  );
                }}
              >
                <Image src={currTab == item.title ? item.imageCur : item.image} className="img" />
                <Text className={currTab == item.title ? 'con-text text-cur' : 'con-text'}>{item.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
