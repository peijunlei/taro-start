import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './brand-picker.less';
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
      main: {goodsBrands, request},
      main,
    } = this.props;
    return (
      <View
        className="packageBGoodsCouponListPromotion"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <View
          className="brandPicker classifyPicker"
          onClick={() => goodsAction.commonChange('main.navToolsObj.brandFlag', false)}
        >
          <View className="picker-content">
            <View className="up-content">
              {goodsBrands.length > 0 &&
                goodsBrands.map((item, index) => {
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
      main,
    } = this.props;
    goodsAction.commonChange('main.request.brandIds', []);
    // 点击重置，重新加载所有品牌
    goodsAction.commonChange('main.goods', []);
    goodsAction.query(true, main?.request?.activity, main?.request?.couponId);
  };
  //提交
  _confire = () => {
    let {
      actions: {goodsAction},
      main,
    } = this.props;
    goodsAction.commonChange('main.goods', []);
    goodsAction.query(true, main.request.activity, main.request.couponId);
    goodsAction.commonChange('main.navToolsObj.brandFlag', false);
  };
}

//create by moon https://github.com/creasy2010/moon
