import React from 'react';
import Taro from '@tarojs/taro';
import {ScrollView, Text, View} from '@tarojs/components';
import {msg, noop} from 'wmkit';
import {cache} from 'config';
import './index.less';

interface PureComponentProps {
  scrollTop: number;
  cityScrollViewHeight: string;
  cityList: any[];
  onScroll: Function;
}

/**
 * 城市列表
 */
export default class CityList extends React.PureComponent<PureComponentProps, any> {
  static defaultProps = {
    // 滚动距离
    scrollTop: 0,
    // 城市列表滚动高度
    cityScrollViewHeight: '100vh',
    // 城市列表
    cityList: [],
    // 监听城市列表 - 滚动操作
    onScroll: noop,
  };

  // 选择城市 - 操作
  onSelectCityClick = (item) => {
    // 获取缓存城市
    let cache_city = Taro.getStorageSync(cache.CACHE_CITY) || [];

    if (!Array.isArray(cache_city) || !cache_city.length) {
      cache_city = [item];
    } else {
      const bol = cache_city.some((item02) => item02.addrId == item.addrId);
      if (!bol) {
        cache_city.push(item);
      }
    }

    console.log(item);
    
    // 更新缓存城市
    Taro.setStorageSync(cache.CACHE_CITY, cache_city);
    // 存储当前定位城市
    Taro.setStorageSync(cache.CACHE_CURRENT_CITY, { addrName: item.addrName ,addrId: item.addrId });
    const homeFlag = Taro.getStorageSync(cache.CACHE_HOME_FLAG)
    homeFlag && Taro.setStorageSync(cache.CACHE_POSITION_CITY, { addrName: item.addrName, addrId: item.addrId });
    Taro.setStorageSync(cache.CACHE_CHOOSE_CITY_TAG, true);
    msg.emit('selectCityPage');

    //跳转到上一个页面
    Taro.navigateBack({
      delta: 1, // 返回上一级页面。
    });
  };

  render() {
    const {onScroll, scrollTop, cityScrollViewHeight, cityList} = this.props;

    return (
      <View className="select_city_box">
        <ScrollView
          className="city_scroll_view"
          style={{height: cityScrollViewHeight}}
          scrollY
          enableBackToTop
          onScroll={(e) => onScroll(e)}
          scrollTopValue={scrollTop}
          scrollTop={scrollTop}
        >
          <View className="city_box_wrapper">
            {cityList.map(([key, value], index) => {
              return (
                <View key={index} className={`city_box_items_${key}`}>
                  {/* 字母 */}
                  <Text className="city_title">{key}</Text>
                  {/* 城市名称 */}
                  <View>
                    {value.map((item, index02) => {
                      return (
                        <View key={index02} className="city_item_wrapper" onClick={() => this.onSelectCityClick(item)}>
                          <Text className="city_name">{item.addrName}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
