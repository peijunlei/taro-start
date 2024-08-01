import React from 'react';
import {View} from '@tarojs/components';
// loading - 组件
import WMLoading from '@/pages/common/loading';
// 当前定位城市
import CurrentCity from './components/current_city';
// 历史访问城市
import HistoricalVisitToTheCity from './components/historical_visit_to_the_city';
// 城市列表 + 城市字母索引
import CityBox from './components/city_box';
// 数据管理中心
import store from './store';

interface ComponentState {
  isShowLoading: boolean;
  cityMap: {};
}

/**
 * 选择城市
 */
export default class SelectCity extends React.Component<any, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      // loading是否可见
      isShowLoading: true,
      // 城市列表 - 数据
      cityMap: {},
    };
  }

  componentDidMount() {
     // 获取 - 该客户的所有收货地址
     store._platformaddressCityListGroup((obj = {}) => {
      this.setState(obj);
    });
  }

  componentDidShow() {
   
  }

  render() {
    const {isShowLoading, ...rest} = this.state;

    return (
      <View className="_page select_city">
        {/* 当前定位城市 */}
        <CurrentCity />
        {/* 历史访问城市 */}
        <HistoricalVisitToTheCity />
        {/* 城市列表 + 城市字母索引 */}
        <CityBox {...rest} />
        {/* loading  */}
        {isShowLoading && <WMLoading />}
      </View>
    );
  }
}
