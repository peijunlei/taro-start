import {View, Button, Text, RichText, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-desc.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
import descImg from '@/assets/image/goods/goods-detail/desc-img.png';
type IGoodsDescProps = T.IProps & T.IGoodsDescProps;
const isH5 = __TARO_ENV === 'h5';
const marginBottom = isH5 ? {marginBottom: 0} : {marginBottom: 25 + 'px'};
@connect<Partial<IGoodsDescProps>, T.IGoodsDescState>(store2Props, actions)
export default class GoodsDesc extends Component<Partial<IGoodsDescProps>, T.IGoodsDescState> {
  constructor(props: IGoodsDescProps) {
    super(props);
  }

  // componentWillMount() {
  //   if (!getCurrentInstance().router.params) return;

  //   let {skuId} = getCurrentInstance().router.params;
  //   if (__TARO_ENV != 'h5') {
  //     let {main} = this.props;
  //     let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
  //     if (SkuId == undefined) {
  //       SkuId = '';
  //     }
  //     this.props.actions.publicAction.initGoodsProperDetail(SkuId);
  //   } else {
  //     this.props.actions.publicAction.initGoodsProperDetail(skuId);
  //   }
  // }

  /**
    详情
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail, descData, goodsPropDetailRels},
    } = this.props;
    const goodsProps = this.props.main?.goodsProps;
    const goodsBrand = this.props.main?.goodsBrand;
    const {goodsPropertyVOList, goodsPropertyDetailVOList, goodsPropertyDetailRelVOList, provinceVOList} = goodsProps;
    const goodsType = goodsDetail.goods?.goodsType
    return (
      <View className="goodsDesc" style={marginBottom}>
        <View className="title">———— 商品详情 ————</View>
        {/* 说明 */}

        {((goodsBrand && goodsBrand.brandName) || goodsPropertyVOList?.length > 0) && goodsType!== 8 && (
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

            {goodsPropertyVOList?.length > 0
              ? goodsPropertyVOList.map((prop, index) => {
                  let detailNm = this._getPropertyValue(prop.propId, prop.propType);
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
        )}

        {/* 副文本 商品详情 */}
        <View className="desc">
          <RichText nodes={this.formatRichText(descData)} />
        </View>
        {this.formatRichText(descData) == '' && (
          <View className="not-data">
            <Image src={descImg} className="desc-img" />
            <Text className="not-text">暂无图文介绍</Text>
          </View>
        )}
      </View>
    );
  }


  /**
   * 渲染具体属性值
   * @param prop
   * @param goodsPropDetailRels
   * @returns {string}
   */
  /**
   * 渲染具体属性值
   * @param prop
   * @param goodsPropDetailRels
   * @returns {string}
   */
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

  _PropDetail = (prop, goodsPropDetailRels) => {
    let detailNm = null;
    if (goodsPropDetailRels && goodsPropDetailRels.length > 0) {
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
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match
          .replace(/width:[^;]+;/gi, 'max-width:100vw;overflow-x:hidden')
          .replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      /* eslint-disable */
      newContent = newContent.replace(
        /\<img/gi,
        '<img style="width:100vw;max-width:100vw;height:auto;display:block;margin-top:0;margin-bottom:0;overflow-x:hidden"',
      );
      /* eslint-disable */
      return newContent;
    } else {
      return '';
    }
  };
}

//create by moon https://github.com/creasy2010/moon
