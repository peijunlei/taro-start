import React from 'react';
import { View } from '@tarojs/components';
import { noop } from 'wmkit';
import './index.less';

interface PureComponentProps {
  cityIndexList: any[];
  handleCheckedIndex: Function;
  onSelectCityIndexClick: Function;
}

/**
 * 城市字母索引
 */
export default class CityIndex extends React.PureComponent<PureComponentProps, {}> {

  static defaultProps = {
    // 字母索引列表
    cityIndexList: [],
    // 当字母被选中时 - 相关逻辑
    handleCheckedIndex: noop,
    // 监听“城市列表字母索引” - 选中字母索引操作
    onSelectCityIndexClick: noop,
  }

  render() {
    const { cityIndexList, handleCheckedIndex, onSelectCityIndexClick } = this.props;
    if(!cityIndexList || !cityIndexList.length) return null;

    return (
      <View className="select_city_city_index">
        {
          cityIndexList.map((item, index) => {
            return (
              <View key={ index }
                className={ handleCheckedIndex(index) }
                onClick={() => onSelectCityIndexClick(index)}
              >
                { item }
              </View>
            );
          })}

      </View>
    );
  }

}
