import React from 'react';
import Taro from '@tarojs/taro';
import { cache } from 'config';
import { Image, Text, View } from '@tarojs/components';
import './index.less';
import IconFont from '@/wmkit/common/iconfont';

/**
 * 当前定位城市
 */
export default class Address extends React.Component {
    render() {
        const cache_current_city = Taro.getStorageSync(cache.CACHE_POSITION_CITY) || {};
        return (
            <View className='select_city_current'>
                <IconFont value='dingwei' size={15} color="var(--themeColor)" className='select_city_current__img' />
                <View className='select_city_current__content'>
                    <Text className='select_city_current__content--text'>当前定位城市</Text>
                    <Text className='select_city_current__content--text'>{ cache_current_city?.addrName || '-' }</Text>
                </View>
            </View>
        );
    }
}