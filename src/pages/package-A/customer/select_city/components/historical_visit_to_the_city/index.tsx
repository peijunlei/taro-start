import React from 'react';
import Taro from '@tarojs/taro';
import { cache } from 'config';
import { Text, View } from '@tarojs/components';
import './index.less';
import { msg } from 'wmkit';

/**
 * 历史访问城市
 */
export default class HistoricalVisitToTheCity extends React.Component {
  render() {
    const cache_city = Taro.getStorageSync(cache.CACHE_CITY) || [];
    if (!cache_city || !cache_city.length) return null;
    const cache_current_city = Taro.getStorageSync(cache.CACHE_CURRENT_CITY).addrId || '';
    const historyStyle = 'historical_visit_to_the_city__content--text overflow';
    const currentStyle = 'current_visit_to_the_city__content--text overflow';
    return (
      <View className="historical_visit_to_the_city">
        <Text className="historical_visit_to_the_city__title">历史访问城市</Text>
        <View className="historical_visit_to_the_city__content">
          {cache_city.map((item, index) => {
            return (
              <Text
                key={index}
                className={item.addrId == cache_current_city ? currentStyle : historyStyle}
                onClick={() => {
                  // 缓存当前定位城市
                  Taro.setStorageSync(cache.CACHE_CURRENT_CITY, { addrName: item.addrName, addrId: item.addrId });
                  const homeFlag = Taro.getStorageSync(cache.CACHE_HOME_FLAG)
                  homeFlag && Taro.setStorageSync(cache.CACHE_POSITION_CITY, { addrName: item.addrName, addrId: item.addrId });
                  Taro.setStorageSync(cache.CACHE_CHOOSE_CITY_TAG, true);
                  msg.emit('selectCityPage');
                  Taro.navigateBack();
                }}
              >
                {item.addrName}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}
