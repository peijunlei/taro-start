import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/reduce-price.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
import {WMkit} from 'wmkit';
//促销类型
const marketingType = ['减', '折', '赠', '秒杀'];
//促销类型样式
const _TYPE = {
  '0': {text: '减', color: ''},
  '2': {text: '赠', color: 'red'},
  '1': {text: '折', color: 'orange'},
  '5': {text: '秒杀', color: 'orange'},
};
type IReducePriceProps = T.IProps & T.IReducePriceProps;

@connect<Partial<IReducePriceProps>, T.IReducePriceState>(store2Props, actions)
export default class ReducePrice extends Component<Partial<IReducePriceProps>, T.IReducePriceState> {
  constructor(props: IReducePriceProps) {
    super(props);
  }

  /**
    优惠
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail, goodsInfo},
    } = this.props;
    if (JSON.stringify(goodsDetail) == '{}') {
      return;
    }
    //去重后的所有促销活动
    let marketingList = [];
    let isHaveGift = false;
    if (goodsInfo && goodsDetail.goods) {
      if (goodsDetail.goods.saleType == 1) {
        marketingList = JSON.stringify(goodsInfo) == '{}' ? [] : this.marketAllByOne(goodsInfo);
        if (marketingList.length > 0) {
          marketingList.forEach((label, index) => {
            if (label.marketingType == 2) {
              isHaveGift = true;
            }
          });
        }
      } else if (goodsDetail.goodsInfos.length > 0) {
        marketingList = this.marketAll(goodsDetail.goodsInfos);
        isHaveGift = true;
      }
    }
    //倒序
    //marketingList.reverse();
    //有促销活动时,返回优先级最高的活动
    const marketing = goodsInfo && goodsInfo.marketingLabels.length > 0 ? this.marketOne(goodsInfo)[0] : null;
    //满赠营销
    const giftMarketing = goodsInfo.marketingLabels.find((marketing) => marketing.marketingType == 2);

    // // 未登录时只展示joinLevel为null或-1的标签
    // if (!WMkit.isLogin()) {
    //   marketingList = marketingList.filter((v) => v.joinLevel == null || v.joinLevel == -1);
    // }
    return (
      <View
        className="title-boxs"
        onClick={() => publicAction.marketingDetail(giftMarketing ? giftMarketing.marketingId : null)}
      >
        <View className="label">促销</View>
        <View className="active-content">
          {marketingList.length > 0 &&
            marketingList.map((label, index) => {
              return (
                <View className="active-box" key={index}>
                  <View className="l-content">
                    {label.marketingType == 3 ? (
                      <View className="icon">{label.marketingDesc.split('，')[0]}</View>
                    ) : label.marketingType == 4 ? (
                      <View className="icon">{label.marketingDesc}</View>
                    ) : (
                      <View className="icon">满{marketingType[label.marketingType]}</View>
                    )}
                    <View className="text">{label.marketingDesc}</View>
                  </View>
                  {/* <Image src={moreIcon} className="arrow" /> */}
                </View>
              );
            })}
        </View>
        {/* 更多 */}
        <Image src={moreIcon} className="more" />
      </View>
    );
  }

  /**
   * 根据满减>满折>满赠的优先级，返回需要显示的促销活动
   */
  /**
   * 展示某个规格下的促销活动
   * @param goodsInfos
   */
  marketAllByOne = (goodsInfo) => {
    let hash = {};
    let allSkuMarketings = [];
    goodsInfo &&
      goodsInfo.marketingLabels
        .sort((marketing) => marketing.marketingType)
        .map((marketing) => {
          allSkuMarketings.push(marketing);
        });
    const newArr = allSkuMarketings.reduce((item, next) => {
      hash[next.marketingId] ? '' : (hash[next.marketingId] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  };

  /**
   * 展示所有规格下的促销活动，并去重
   * @param goodsInfos
   */
  marketAll = (goodsInfos) => {
    let hash = {};
    let allSkuMarketings = [];
    goodsInfos.length > 0 &&
      goodsInfos.map((goodsInfo) => {
        goodsInfo.marketingLabels.map((marketing) => {
          allSkuMarketings.push(marketing);
        });
      });
    const newArr = allSkuMarketings.reduce((item, next) => {
      hash[next.marketingId] ? '' : (hash[next.marketingId] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  };
  marketOne = (goodsInfo) => {
    return goodsInfo.marketingLabels.sort((marketing) => marketing.marketingType);
  };
}

//create by moon https://github.com/creasy2010/moon
