import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './classify-picker.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import gxIcon from '@/assets/image/goods/goods-list/gx.png';

type IClassifyPickerProps = T.IProps & T.IClassifyPickerProps;

@connect<Partial<IClassifyPickerProps>, T.IClassifyPickerState>(store2Props, actions)
export default class ClassifyPicker extends Component<Partial<IClassifyPickerProps>, T.IClassifyPickerState> {
  constructor(props: IClassifyPickerProps) {
    super(props);
  }

  /**
    分类筛选框
*/
  render() {
    let {
      actions: {goodsAction},
      main: {goodsCates, request, pickerHeight},
    } = this.props;
    return (
      <View className="classifyPicker" onClick={() => goodsAction.commonChange('main.navToolsObj.catesFlag', false)}
        style={{ height: pickerHeight, }}
      >
        <View className="picker-content">
          <ScrollView scrollY className="content-scroll">
            <View className="up-content">
              {goodsCates.length > 0 &&
                goodsCates.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="cate-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        this._chooseCate(item.cateId);
                      }}
                    >
                      {request.cateIds.includes(item.cateId) && <Image src={gxIcon} className="gx" />}
                      <Text className={request.cateIds.includes(item.cateId) ? 'text active-text' : 'text'}>
                        {item.cateName}
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
  //选择分类
  _chooseCate = (cateId) => {
    let {
      actions: {goodsAction},
      main: {request},
    } = this.props;
    let cateIds = [...request.cateIds];
    if (cateIds.includes(cateId)) {
      let index = cateIds.findIndex((id) => id == cateId);
      cateIds.splice(index, 1);
    } else {
      cateIds.push(cateId);
    }
    goodsAction.commonChange('main.request.cateIds', cateIds);
  };
  //重置
  _reset = () => {
    let {
      actions: {goodsAction},
    } = this.props;
    goodsAction.commonChange('main.request.cateIds', []);
  };
  //提交
  _confire = () => {
    let {
      actions: {goodsAction},
      main: {marketingId},
    } = this.props;
    goodsAction.commonChange('main.goods', []);
    goodsAction.query(true, marketingId);
    goodsAction.commonChange('main.navToolsObj.catesFlag', false);
  };
}

//create by moon https://github.com/creasy2010/moon
