import {View, Button, Text, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-desc.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IGoodsDescProps = T.IProps & T.IGoodsDescProps;

@connect<Partial<IGoodsDescProps>, T.IGoodsDescState>(store2Props, actions)
export default class GoodsDesc extends Component<Partial<IGoodsDescProps>, T.IGoodsDescState> {
  constructor(props: IGoodsDescProps) {
    super(props);
  }

  /**
    详情
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main = {},
    } = this.props;
    const {goodsProps, goodsBrand, goodsDetail, descData} = main;
    return (
      <View className="goodsDesc">
        <View className="title">———— 商品详情 ————</View>
        {/* 说明 */}

        <View className="instruct">
          {goodsBrand && goodsBrand.brandName && (
            <View className="instruct-item">
              <Text className="left">品牌</Text>
              <Text className="right">
                {goodsBrand.brandName}
                {goodsBrand.nickName ? `(${goodsBrand.nickName})` : ''}
              </Text>
            </View>
          )}

          {goodsProps?.length > 0
            ? goodsProps.map((prop, index) => {
                let detailNm = this._PropDetail(prop, goodsDetail.goodsPropDetailRels);
                return (
                  detailNm && (
                    <View className="instruct-item" key={index}>
                      <Text className="left">{prop.propName}</Text>
                      <Text className="right">{detailNm}</Text>
                    </View>
                  )
                );
              })
            : ''}
        </View>

        {/* 副文本 商品详情 */}
        <View className="desc">
          <RichText nodes={this.formatRichText(descData)} />
        </View>
      </View>
    );
  }
  /**
   * 渲染具体属性值
   * @param prop
   * @param goodsPropDetailRels
   * @returns {string}
   */
  _PropDetail = (prop, goodsPropDetailRels) => {
    let detailNm = null;
    if (goodsPropDetailRels.length > 0) {
      const goodsDetailRel = goodsPropDetailRels.find((rel) => rel.propId == prop.propId);
      if (goodsDetailRel) {
        const goodsDetail = prop.goodsPropDetails.find((detail) => goodsDetailRel.detailId == detail.detailId);
        if (goodsDetail) {
          detailNm = goodsDetail.detailName;
        }
      }
    }
    return detailNm;
  };

  formatRichText = (html) => {
    if (html) {
      let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"',
      );
      return newContent;
    } else {
      return '';
    }
  };
}

//create by moon https://github.com/creasy2010/moon
