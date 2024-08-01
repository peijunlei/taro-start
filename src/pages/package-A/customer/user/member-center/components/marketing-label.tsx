import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Text, View} from '@tarojs/components';
import {immutable} from 'wmkit';
import './marketing-label.less';

interface MarketingLabelType {
  marketingLabels: any;
  couponLabels?: any;
  grouponLabel?: any;
  goodsLabel?: any;
}
// 排序规则 -- 满减-0、满折-1、满赠-2、优惠券-3 、拼团-4
const _SORT = [0, 1, 2, 3, 4, 5];
const _TYPE = {
  '0': {text: '满减'},
  '1': {text: '满折'},
  '2': {text: '满赠'},
  '3': {text: '券'},
  '4': {text: '拼'},
  '5': {text: '秒杀'},
};
export default class MarketingLabel extends Component<MarketingLabelType, any> {
  constructor(props: MarketingLabelType) {
    super(props);
  }

  static defaultProps = {
    goodsLabel: immutable.fromJS([]),
    isSeat: false,
  };

  render() {
    const {marketingLabels, couponLabels, grouponLabel, goodsLabel, isSeat} = this.props;
    let mLabels = marketingLabels;

    if (couponLabels && couponLabels.size > 0) {
      couponLabels.toJS().forEach((item) => {
        mLabels = mLabels.push(
          immutable.fromJS({
            marketingType: 3,
            marketingId: `${item.couponActivityId}-${item.couponInfoId}`,
            marketingDesc: item.couponDesc,
          }),
        );
      });
    }
    if (grouponLabel) {
      mLabels = mLabels.push(
        immutable.fromJS({
          marketingType: 4,
        }),
      );
    }

    const labels = immutable.fromJS(mLabels || []);
    const sortedLabels = this.getList(labels);
    //商品标签最多展示三个
    let goodsLabels = goodsLabel.toJS().filter((v) => v.labelVisible && !v.delFlag);
    goodsLabels = goodsLabels.slice(0, 3);
    goodsLabels = goodsLabels.sort((a, b) => {
      return a.labelSort - b.labelSort;
    });
    return (
      <View className="memberCenter__goods-active">
        {!sortedLabels.size && !goodsLabels.length && isSeat ? (
          <View style={{height: '14px', color: 'transparent'}}>占位</View>
        ) : null}
        {goodsLabels &&
          goodsLabels.map((item, index) => {
            if (item.labelVisible) {
              return (
                <View key={index} className="goods-label" id={item.goodsLabelId}>
                  {item.labelName}
                </View>
              );
            }
          })}
        {sortedLabels.toJS().map((label, index) => {
          return (
            <View className="active-item" key={index} id={index}>
              <Text className="active-text">{_TYPE[label.marketingType].text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  getList = (marketingLabels) => {
    let array = immutable.List();
    if (marketingLabels && marketingLabels.size > 0) {
      let labelMap = marketingLabels.groupBy((label) => label.get('marketingType'));
      _SORT.forEach((type) => {
        if (labelMap.has(type)) {
          array = array.push(labelMap.get(type).get(0));
        }
      });
    }
    return array;
  };
}
