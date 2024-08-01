import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './classify-picker.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import gxIcon from '@/assets/image/goods/goods-list/gx.png';
type IBrandPickerProps = T.IProps & T.IBrandPickerProps;

@connect<Partial<IBrandPickerProps>, T.IBrandPickerState>(store2Props, actions)
export default class BrandPicker extends Component<Partial<IBrandPickerProps>, T.IBrandPickerState> {
  constructor(props: IBrandPickerProps) {
    super(props);
  }

  /**
    品牌筛选框
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main: {goodsBrands, request, pickerHeight, },
    } = this.props;

    return (
      <View
        className="brandPicker classifyPicker"
        style={{ height: pickerHeight, }}
        onClick={() => goodsAction.commonChange('main.navToolsObj.brandFlag', false)}
      >
        <View className="picker-content">
          <ScrollView scrollY className="content-scroll">
            <View className="up-content">
              {goodsBrands.length > 0 &&
                [...goodsBrands].map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="cate-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        this._chooseBrand(item.brandId);
                      }}
                    >
                      {request.brandIds.includes(item.brandId) && <Image src={gxIcon} className="gx" />}
                      <Text className={request.brandIds.includes(item.brandId) ? 'text active-text' : 'text'}>
                        {item.brandName}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
          <View className="down-btn">
            <View
              className="reset"
              onClick={(e) => {
                e.stopPropagation();
                this._reset();
              }}
            >
              重置
            </View>
            <View
              className="confire"
              onClick={(e) => {
                e.stopPropagation();
                this._confire();
              }}
            >
              确定
            </View>
          </View>
        </View>
      </View>
    );
  }
  //选择品牌
  _chooseBrand = (brandId) => {
    let {
      actions: {goodsAction},
      main: {request},
    } = this.props;
    let brandIds = [...request.brandIds];
    if (brandIds.includes(brandId)) {
      let index = brandIds.findIndex((id) => id == brandId);
      brandIds.splice(index, 1);
    } else {
      brandIds.push(brandId);
    }
    goodsAction.commonChange('main.request.brandIds', brandIds);
  };
  //重置
  _reset = () => {
    let {
      actions: {goodsAction},
    } = this.props;
    goodsAction.commonChange('main.request.brandIds', []);
  };
  //提交
  _confire = () => {
    let {
      actions: {goodsAction},
      main: {marketingId},
    } = this.props;
    goodsAction.commonChange('main.goods', []);
    goodsAction.query(true, marketingId);
    goodsAction.commonChange('main.navToolsObj.brandFlag', false);
  };
}

//create by moon https://github.com/creasy2010/moon
