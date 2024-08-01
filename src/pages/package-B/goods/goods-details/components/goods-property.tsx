import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-property.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import moment from 'dayjs';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
type IGoodsSpecProps = T.IProps & T.IGoodsSpecProps;

@connect<Partial<IGoodsSpecProps>, T.IGoodsSpecState>(store2Props, actions)
export default class GoodsSpec extends Component<Partial<IGoodsSpecProps>, T.IGoodsSpecState> {
  constructor(props: IGoodsSpecProps) {
    super(props);
  }

  /**
    参数
*/
  render() {
    let {
      actions: {publicAction},
      main: {goodsProps},
    } = this.props;
    const {characterPropertyList} = goodsProps;
    const windowHeight = Taro.getSystemInfoSync().windowWidth - 97;
    let width = characterPropertyList.length >= 3 ?  windowHeight/ 3 : windowHeight / characterPropertyList.length;
    let showCharacterPropList = characterPropertyList;
    if (characterPropertyList.length > 3) {
      showCharacterPropList = characterPropertyList.slice(0, 3);
    }
    return (
      <View className="goodsProperty" onClick={() => publicAction.openPropsCharacterModal(true)}>
        <View className="left-box">
          <Text className="text-title">参数</Text>
        </View>
        <View className="middle-box">
          {showCharacterPropList.map((prop, index) => {
            return (
              <View className="character-box" style={{width: `${width}px`}}>
                <Text className="character-title">{prop.propName}</Text>
                <View
                  className={
                    index == showCharacterPropList.length - 1
                      ? 'character-value-box character-last-value'
                      : 'character-value-box'
                  }
                >
                  <Text className="character-value">{this._getPropertyValue(prop.propId, prop.propType)}</Text>
                </View>
              </View>
            );
          })}
        </View>
        {/* 更多 */}
        <Image src={moreIcon} className="more" />
      </View>
    );
  }

  _getPropertyValue = (propId, type) => {
    let {goodsProps} = this.props.main;
    const {goodsPropertyDetailVOList, goodsPropertyDetailRelVOList, provinceVOList, countryVOList} = goodsProps;
    if (type == 0) {
      let propValue = '';
      goodsPropertyDetailVOList
        ?.filter((detail) => detail.propId == propId)
        .map((detail) => {
          propValue += detail.detailName + ' ';
        });
      return propValue;
    } else if (type == 1) {
      return goodsPropertyDetailRelVOList.find((rel) => rel.propId == propId).propValueText;
    } else if (type == 2) {
      let propValueDate = goodsPropertyDetailRelVOList.find((rel) => rel.propId == propId).propValueDate;
      return moment(propValueDate).format('YYYY-MM-DD');
    } else if (type == 3) {
      let propValue = '';
      let provinceStr = goodsPropertyDetailRelVOList.find((prop) => prop.propId == propId).propValueProvince;
      let provinceArr = provinceStr.split(',');
      for (let i = 0; i < provinceArr.length; i++) {
        let addressName = provinceVOList.find((address) => address.addrId === provinceArr[i]).addrName;
        propValue += addressName + ' ';
      }
      return propValue;
    } else if (type == 4) {
      let propValue = '';
      let countryStr = goodsPropertyDetailRelVOList.find((prop) => prop.propId == propId).propValueCountry;
      let countryArr = countryStr.split(',');
      for (let i = 0; i < countryArr.length; i++) {
        let countryName = countryVOList.find((country) => country.id == parseInt(countryArr[i])).name;
        propValue += countryName + ' ';
      }
      return propValue;
    }
  };
}

//create by moon https://github.com/creasy2010/moon
