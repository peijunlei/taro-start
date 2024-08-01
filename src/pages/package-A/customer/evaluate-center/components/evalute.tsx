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
export default class Evalute extends Component<Partial<ITobeEvaluteProps>, T.ITobeEvaluteState> {
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
        url={'/goodsEvaluate/page'}
        getData={(list) => {
          actions.setEvaluateData(list);
        }}
        dataPath={['goodsEvaluateVOPage']}
        noneContent={'暂无评价信息哦'}
        noneImg={notEval}
        style={{height: 'calc(100vh - 57px)'}}
      >
        {main?.evaluateData.map((item) => (
          <View
            key={item.evaluateId}
            className="evaluate-item"
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/package-A/customer/evaluate-drying/index?storeId=${item.storeId}&orderId=${item.orderNo}&goodsInfoId=${item.goodsInfoId}&evaluateType=2`,
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
                {item.goodsInfoName && <Text className="content">{item.goodsInfoName}</Text>}
                {item.specDetails && (
                  <Text className="fs20 c999 mb16" style={{marginTop: '4px'}}>
                    {item.specDetails}
                  </Text>
                )}
              </View>
              <View className="tail">
                <Text className="fs20 c999">购买时间: {_.formatDay(item.buyTime)}</Text>
                <View className="view-btn">
                  <Text className="text">查看评价</Text>
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
