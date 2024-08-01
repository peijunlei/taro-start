import {Image, Text, View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Button} from '@wanmi/ui-taro';
import React, {Component, Fragment} from 'react';
import './goods-property-character.less';
import moment from 'dayjs';
import propsCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
let close = null;

interface IGoodsPropertyP {
  onClose: () => any;
  goodsProperty: any;
  visible: boolean;
}

interface IGoodsPropertyS {}

//spu零售规格弹窗
export default class GoodsPropertyCharacter extends Component<IGoodsPropertyP, IGoodsPropertyS> {
  constructor(props) {
    super(props);
    this.state = {
      goodsProperty: {},
      // 黑色蒙层淡入淡出效果
      fadeState: true,
      visible: true,
      stop: true,
    };
  }

  render() {
    const {goodsProperty, onClose, visible} = this.props;

    const {characterPropertyList} = goodsProperty;
    return (
      visible && (
        <View
          onTouchMove={(e) => {
            e.stopPropagation();
            if (this.state.stop) {
              e.preventDefault();
            }
          }}
          className="goodsPropertyCharacter"
        >
          <View className="props-container">
            <View className="props-title-box">
              <Text className="props-title">产品参数</Text>
              <Image src={propsCloseIcon} className="props-close" onClick={() => onClose()} />
            </View>
            <ScrollView
              scrollY
              className="scroll-props-box"
              onTouchStart={() =>
                this.setState({
                  stop: false,
                })
              }
              onTouchEnd={() =>
                this.setState({
                  stop: true,
                })
              }
            >
              <View className="props-content-box">
                {characterPropertyList.map((prop) => {
                  return (
                    <View className="content-item">
                      <View className="item-left-box">
                        <Text className="left-text">{prop.propName}</Text>
                      </View>
                      <View className="item-right-box">
                        <Text className="right-text">{this._getPropertyValue(prop.propId, prop.propType)}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View className="props-bottom">
              <Button type="primary" onClick={() => onClose()}>
                确定
              </Button>
            </View>
          </View>
        </View>
      )
    );
  }

  _getPropertyValue = (propId, type) => {
    let {goodsProperty} = this.props;
    const {goodsPropertyDetailVOList, goodsPropertyDetailRelVOList, provinceVOList, countryVOList} = goodsProperty;
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
