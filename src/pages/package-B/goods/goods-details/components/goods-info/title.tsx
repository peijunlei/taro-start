import { View, Button, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import '../less/title.less';
import * as T from '../../types';
import actions from '../../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../../selectors';
import dayjs from 'dayjs'
import { Const } from 'config';
type ITitleProps = T.IProps & T.ITitleProps;

@connect<Partial<ITitleProps>, T.ITitleState>(store2Props, actions)
export default class Title extends Component<Partial<ITitleProps>, T.ITitleState> {
  constructor(props: ITitleProps) {
    super(props);
  }

  componentWillMount() {
    if (!getCurrentInstance().router.params) return;

    let { skuId } = getCurrentInstance().router.params;
    if (__TARO_ENV == 'h5') {
      this.props.actions.publicAction.initGoodsDetailSimple(skuId);
    }
  }

  componentDidShow() {
    let { skuId } = getCurrentInstance().router.params;
    if (__TARO_ENV != 'h5') {
      let { main } = this.props;
      let { skuId } = getCurrentInstance().router.params;
      let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      if (SkuId == undefined) {
        SkuId = '';
      }
      this.props.actions.publicAction.initGoodsDetailSimple(SkuId);
    } else {
      this.props.actions.publicAction.initGoodsDetailSimple(skuId);
    }
  }

  /**
    标题副标题
*/
  render() {
    let { main } = this.props;
    const gs = main?.goodsDetail?.goods?.goodsStatus
    const time = main?.goodsDetail?.goods?.estimatedDeliveryTime
    const thirdPlatformType = main?.goodsDetail?.goods?.thirdPlatformType
    const goodsInfo = main?.goodsInfo
    return (
      <View className="title-box">
        <View className="title">{thirdPlatformType != null && (
          <View className="marketing">
            <Text className="market-text">{Const.thirdPlatformTypeList[thirdPlatformType]}</Text>
          </View>
        )}{goodsInfo.goodsInfoName||main?.goodsName}</View>
        {main?.goodsSubtitle && <View className="sub-title">{main?.goodsSubtitle}</View>}
        {gs === 5 && <View className="pre-sale">
          <View className='text'>当前商品为预售商品，预计发货时间 </View>
          <View className='time'>{dayjs(time).format('YYYY年MM月DD日')}</View>
        </View>}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
