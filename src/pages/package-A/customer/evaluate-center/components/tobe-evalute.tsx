import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../index.less';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import notEval from '@/assets/image/goods/goods-detail/not-eval.png';
import {_} from 'wmkit';
const defaultImg = require('@/assets/image/common/default-img.png');
type ITobeEvaluteProps = T.IProps & T.ITobeEvaluteProps;

@connect<Partial<ITobeEvaluteProps>, T.INavState>(store2Props, actions)
export default class TobeEvalute extends Component<Partial<ITobeEvaluteProps>, T.ITobeEvaluteState> {
  constructor(props: ITobeEvaluteProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  render() {
    let {actions, main} = this.props;
    return (
      <WMListView
        url={'/goodsTobeEvaluate/pageGoodsTobeEvaluate'}
        getData={(list, total) => {
          actions.setEvaluateData(list);
        }}
        dataPath={['goodsTobeEvaluateVOPage']}
        noneContent={'还没有人评论哦'}
        style={{height: 'calc(100vh - 57px)'}}
        noneImg={notEval}
        reload={main?.refresh}
      >
        {main?.evaluateData.map((item) => (
          <View
            key={item.evaluateId}
            className="evaluate-item"
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/package-A/customer/evaluate-drying/index?storeId=${item.storeId}&orderId=${item.orderNo}&goodsInfoId=${item.goodsInfoId}&evaluateType=0`,
              })
            }
          >
            <Image
              src={item.goodsImg ? item.goodsImg : defaultImg}
              className="img"
              onClick={(e) => {
                e.stopPropagation();
                Taro.navigateTo({
                  url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`,
                });
              }}
            />
            <View className="right">
              <View>
                {/* <Text className="content">{item.goodsInfoName}</Text>
                <Text className="fs20 c999 mb16">{item.goodsSpecDetail ? item.goodsSpecDetail : ''}</Text> */}
                {item.goodsInfoName && <Text className="content">{item.goodsInfoName}</Text>}
                {item.goodsSpecDetail && (
                  <Text className="fs20 c999 mb16" style={{marginTop: '4px'}}>
                    {item.goodsSpecDetail}
                  </Text>
                )}
              </View>
              <View className="tail">
                <Text className="fs20 c999">购买时间: {_.formatDay(item.buyTime)}</Text>
                <View className="wm-button-2">
                  <Text className="text">评价/晒单</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </WMListView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
