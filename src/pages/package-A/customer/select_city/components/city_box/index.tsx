/* eslint-disable react/sort-comp */
import Taro from '@tarojs/taro';
import React from 'react';
import {View} from '@tarojs/components';
import lodash from 'lodash';
// 城市列表 - 组件
import CityIndex from './components/city_index';
// 城市字母索引 - 组件
import CityList from './components/city_list';

interface ComponentProps {
  cityMap: {};
}

interface ComponentState {
  listHeights: any[];
  cityScrollViewHeight: string;
  cityList: any[];
  scrollTopToRight: number;
  /**
   * 当前选中城市索引
   */
  cityIndexActive: number;
}

/**
 * 城市列表 + 城市字母索引
 */
export default class CityBox extends React.PureComponent<ComponentProps, ComponentState> {
  isDisabledOnSelectCityIndexClick = false;

  constructor(props) {
    super(props);
    this.state = {
      listHeights: [],
      // 城市列表滚动高度
      cityScrollViewHeight: '100vh',
      // 城市列表
      cityList: [],
      // 记录 - 城市列表滚动距离
      scrollTopToRight: 0,
      cityIndexActive: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._getListItemsHeight();
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(this.props.cityMap, prevProps.cityMap)) {
      setTimeout(() => {
        this._getListItemsHeight();
      }, 1000);
    }
  }

  render() {
    const {cityScrollViewHeight, cityList, scrollTopToRight, listHeights} = this.state;

    if (!Array.isArray(cityList) || !cityList.length) return null;
    const len = listHeights.filter((item) => item).length;
    return (
      <View>
        {/* 城市列表 */}
        <CityList
          scrollTop={scrollTopToRight}
          cityScrollViewHeight={cityScrollViewHeight}
          cityList={cityList}
          onScroll={(e) => {
            this.isDisabledOnSelectCityIndexClick = true;
            this._onScroll(e);
          }}
        />
        {/* 城市字母索引 */}
        {Array.isArray(listHeights) && listHeights.length && len > 1 ? (
          <CityIndex
            cityIndexList={this.getCityIndexList(cityList)}
            handleCheckedIndex={this.handleCheckedIndex}
            onSelectCityIndexClick={this.onSelectCityIndexClick}
          />
        ) : null}
      </View>
    );
  }

  // 当字母被选中时 - 相关逻辑
  handleCheckedIndex = (i) => {
    const {listHeights, scrollTopToRight} = this.state;

    let className = '';
    if (i === 0) {
      if (listHeights[i] <= scrollTopToRight && scrollTopToRight < listHeights[i + 1]) {
        className = ' city_index_item_active';
      }
    } else {
      if (scrollTopToRight && listHeights[i] && listHeights[i + 1]) {
        if (listHeights[i] <= scrollTopToRight && scrollTopToRight < listHeights[i + 1]) {
          className = ' city_index_item_active';
        }
      }
    }

    return `city_index_item${className}`;
  };

  // 监听“城市列表字母索引” - 选中字母索引操作
  onSelectCityIndexClick = (i) => {
    if (this.isDisabledOnSelectCityIndexClick) return;
    const {listHeights, cityIndexActive} = this.state;
    if (cityIndexActive === i) return;

    this.setState({
      scrollTopToRight: listHeights[i] + 2,
      cityIndexActive: i,
    });
  };

  // 获取城市列表字母索引
  getCityIndexList = (list) => {
    if (!Array.isArray(list)) return [];
    return list.map((item) => item[0]) || [];
  };

  // 监听城市列表 - 滚动操作
  _onScroll = lodash.debounce((e) => {
    this.setState(
      {
        scrollTopToRight: e?.detail?.scrollTop || 0,
      },
      () => {
        this.isDisabledOnSelectCityIndexClick = false;
      },
    );
  }, 800);

  /**
   * 计算每个区块列表的高度
   */
  _getListItemsHeight = async () => {
    const {cityMap} = this.props;
    if (!cityMap || !Object.keys(cityMap)?.length) return;
    // 获取“当前定位城市”区域 - 高度
    const select_city_current_height = await this.querySelect('.select_city_current');
    // 获取“历史访问城市”区域 - 高度
    const historicalHeight = await this.querySelect('.historical_visit_to_the_city');
    const list = Object.entries(cityMap) || [];
    // 动态计算城市列表滚动高度
    this.setState({
      cityScrollViewHeight: `calc(100vh - ${select_city_current_height}px - ${historicalHeight}px)`,
      cityList: list,
    });

    const arr = [];
    const listHeights = [];
    // 通过 querySelect 方法获取所有 class 为 .city_box_items_${item.title} 的 DOM 高度
    // 重要，class名称不能带有汉字，否则在小程序端寻找不到
    list.forEach((item) => {
      arr.push(this.querySelect(`.city_box_items_${item[0]}`, select_city_current_height, historicalHeight));
    });

    Promise.all(arr).then((res) => {
      // 高度区间从 0 开始计算
      for (let i = 0; i < res.length; i++) {
        // 高度累加，根据 纵向滚动的值
        listHeights.push(res[i]);
      }

      // 手动拼接一个，使得最后的一项能被选中,加的值多一些，保证能够选中
      listHeights.push(listHeights[res.length - 1] + 10000);
      this.setState({listHeights});
    });
  };

  /**
   * 通过class获取DOM元素高度
   */
  querySelect = (node, _select_city_current_height?, _historicalHeight?) => {
    const query = Taro.createSelectorQuery();
    return new Promise((resolve) => {
      query
        .select(node)
        .boundingClientRect()
        .exec((rect) => {
          if (!rect || !rect[0]) {
            return resolve(0);
          }
          if (['.select_city_current', '.historical_visit_to_the_city'].includes(node)) {
            resolve(rect?.[0]?.height || 0);
          } else {
            // 要减掉上方搜索框的高度，小程序都是整数，H5的带有小数，取整数
            resolve(Math.ceil(rect?.[0]?.top - _select_city_current_height - _historicalHeight));
          }
        });
    });
  };
}
