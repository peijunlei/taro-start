import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Image, Text, View} from '@tarojs/components';
import {immutable, WMkit} from 'wmkit';
import './marketing-label.less';
import {Label} from '@wanmi/ui-taro';

interface MarketingLabelType {
  marketingLabels: any;
  couponLabels?: any;
  grouponLabel?: any;
  goodsLabel?: any;
  isFlashFlag?: boolean;
  isSocial?: boolean;
  isCollect?: boolean;
  isDistribution?: boolean;
  noWhiteCover?: boolean;
}
// 排序规则 -- 满减-0、满折-1、满赠-2、满返、优惠券
const _SORT = [5, -1, 0, 1, 2, 3, 4, 6];
const _TYPE = {
  '-1': {text: '拼团'},
  '0': {text: '满减'},
  '1': {text: '满折'},
  '2': {text: '满赠'},
  '3': {text: 'N件N元'},
  '4': {text: '第二件半价'},
  '5': {text: '秒杀'},
  '6': {text: '券'},
};
export default class MarketingLabel extends Component<MarketingLabelType, any> {
  constructor(props: MarketingLabelType) {
    super(props);
  }

  static defaultProps = {
    marketingLabels: immutable.fromJS([]),
    goodsLabel: immutable.fromJS([]),
    noWhiteCover: false,
  };

  componentDidMount() {}

  render() {
    let {
      marketingLabels,
      couponLabels,
      grouponLabel,
      isSocial,
      goodsLabel,
      isCollect,
      isDistribution,
      noWhiteCover,
    } = this.props;
    // let mLabels = marketingLabels;
    /**
     * 将秒杀活动过滤出来，秒杀活动优先级大于其他活动，当有秒杀标签的时候不显示其他标签
     */
    let mLabels = marketingLabels.toJS();
    // // 未登录时只展示joinLevel为null或-1的标签
    // if (!WMkit.isLogin()) {
    //   mLabels = mLabels.filter((v) => v.joinLevel == null || v.joinLevel == -1);
    // }
    let isExitFlash = mLabels.some((item) => item.marketingType == 5);
    if (isExitFlash) {
      mLabels = mLabels.filter((item) => {
        return item.marketingType == 5;
      });
    }

    if (!isExitFlash && isSocial) {
      mLabels = [];
    }

    //拼团
    if (grouponLabel && grouponLabel.size > 0) {
      mLabels.push(
        immutable.fromJS({
          marketingType: -1,
          marketingId: grouponLabel.get('grouponActivityId'),
          marketingDesc: grouponLabel.get('marketingDesc'),
        }),
      );
    }

    if (!isExitFlash && couponLabels && couponLabels.size > 0) {
      couponLabels.toJS().forEach((item) => {
        mLabels.push(
          immutable.fromJS({
            marketingType: 6,
            marketingId: `${item.couponActivityId}-${item.couponInfoId}`,
            marketingDesc: item.couponDesc,
          }),
        );
      });
    }

    const labels = immutable.fromJS(mLabels || []);
    const sortedLabels = this.getList(labels);
    //商品标签最多展示三个
    const goodsLabels = goodsLabel
      ? goodsLabel
          .toJS()
          .filter((v) => v.labelVisible && !v.delFlag)
          .slice(0, 3)
          .sort((a, b) => {
            return a.labelSort - b.labelSort;
          })
      : [];
    // goodsLabels = goodsLabels.slice(0, 3);
    // goodsLabels = goodsLabels.sort((a, b) => {
    //   return a.labelSort - b.labelSort;
    // });
    return (
      <View className={noWhiteCover ? 'marketing-label paddR' : 'marketing-label'}>
        <View className={`marketing-label-con ${isDistribution ? 'marginDis' : ''}`}>
          {goodsLabels &&
            goodsLabels.length > 0 &&
            goodsLabels.map((item, index) => {
              if (item.labelVisible) {
                return (
                  <Label
                    name={item.labelName}
                    labelStyle={{
                      background: 'pink',
                      border: 0,
                      color: '#fff',
                    }}
                  />
                );
              }
            })}
          {sortedLabels.toJS().map((label, index) => {
            return (
              <Label
                name={
                  label.marketingType == 3
                    ? label.marketingDesc.split('，')[0]
                    : label.marketingType == 4
                    ? label.marketingDesc
                    : _TYPE[label.marketingType].text
                }
              />
            );
          })}
        </View>
        {!noWhiteCover && (
          <View className="white-con">
            <View className={`con ${isCollect ? 'marginNull' : ''} `}> </View>
          </View>
        )}
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
