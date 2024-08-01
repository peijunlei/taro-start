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
const storeDefaultImg = require('@/assets/image/store/store.png');
@connect<Partial<ITobeEvaluteProps>, T.INavState>(store2Props, actions)
export default class ServiceEvalute extends Component<Partial<ITobeEvaluteProps>, T.ITobeEvaluteState> {
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
        url={'/storeTobeEvaluate/pageStoreTobeEvaluate'}
        getData={(list, total) => {
          actions.setEvaluateData(list);
        }}
        dataPath={['storeTobeEvaluateVOPage']}
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
                url: `/pages/package-A/customer/evaluate-drying/index?storeId=${item.storeId}&orderId=${item.orderNo}&goodsInfoId=${item.goodsInfoId}&evaluateType=1`,
              })
            }
          >
            <Image
              src={item.storeLogo ? item.storeLogo : storeDefaultImg}
              className="service-img"
              onClick={(e) => {
                return
                e.stopPropagation();
                Taro.navigateTo({
                  url: `/pages/package-A/store/store-main/index?storeId=${item.storeId}`,
                });
              }}
            />
            <View className="service-right">
              {/* <Text className="content">{item.storeName}</Text> */}
              {item.storeName && <Text className="service-content">{item.storeName}</Text>}
              {/* <Text className="fs20 c999 mb16">灰色 66CM</Text> */}
              <View className="service-tail">
                <Text className="fs20 c999">购买时间: {_.formatDay(item.buyTime)}</Text>
                <View className="wm-button-2">
                  <Text className="text">评价</Text>
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
