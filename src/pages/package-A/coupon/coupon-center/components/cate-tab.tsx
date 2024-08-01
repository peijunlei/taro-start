import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './cate-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dowmImg from '@/assets/image/coupon/down.png';
import upImg from '@/assets/image/coupon/up.png';
type ICateTabProps = T.IProps & T.ICateTabProps;

@connect<Partial<ICateTabProps>, T.ICateTabState>(store2Props, actions)
export default class CateTab extends Component<Partial<ICateTabProps>, any> {
  _cateRefs = [];
  _scroll;
  constructor(props: ICateTabProps) {
    super(props);
    this.state = {
      allLeft: 0,
      activedKey: 0,
    };
  }
  static options = {
    addGlobalClass: true,
  };

  /**
    
*/
  render() {
    let {
      actions: {
        action: {changeMaskShow, changeCateId},
      },
      main = {},
    } = this.props;
    const {couponCateList = [], couponCateId, showCateMask} = main;
    return (
      <View className="coupon__cateTab">
        <ScrollView
          scrollX
          className="tab-left"
          scrollIntoView={'a' + couponCateId}
          scrollWithAnimation={true}
          ref={(ref) => {
            this._scroll = ref;
          }}
        >
          {couponCateList.map((cateItem, index) => {
            return (
              <Text
                key={cateItem.couponCateId}
                className={couponCateId == cateItem.couponCateId ? 'tab-text curr' : 'tab-text'}
                ref={(dom) => {
                  this._cateRefs[cateItem.couponCateId] = dom;
                }}
                style={index === 0 ? {paddingLeft: '12px'} : {paddingLeft: 0}}
                id={'a' + cateItem.couponCateId}
                onClick={() => {
                  showCateMask && changeMaskShow(2);
                  changeCateId(cateItem.couponCateId, index);
                }}
              >
                {cateItem.couponCateName}
              </Text>
            );
          })}
        </ScrollView>
        <View
          className="tab-right"
          onClick={() => {
            changeMaskShow(2);
          }}
        >
          <View className="tab-right__linear"></View>
          <View className="back">
            <Text className={showCateMask ? 'curr-text fs24' : 'fs24'}>全部</Text>
            <Image className="down-img" src={showCateMask ? upImg : dowmImg} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
