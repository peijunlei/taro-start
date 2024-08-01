import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../less/collect.less';
import * as T from '../../types';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import hertIcon from '@/assets/image/goods/goods-detail/hert.png';
import nHertIcon from '@/assets/image/goods/goods-detail/n-hert.png';
type ICollectProps = T.IProps & T.ICollectProps;

@connect<Partial<ICollectProps>, T.ICollectState>(store2Props, actions)
export default class Collect extends Component<Partial<ICollectProps>, T.ICollectState> {
  constructor(props: ICollectProps) {
    super(props);
  }

  /**
    收藏
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main = {},
    } = this.props;
    const {collect} = main;
    return (
      <View className="collect" onClick={() => this._collect()}>
        <Image className="hert" src={collect ? hertIcon : nHertIcon} />
        <Text className={collect ? 'text cut-text' : 'text'}>{collect ? '已收藏' : '收藏 '}</Text>
      </View>
    );
  }
  _collect() {
    let {
      actions: {publicAction, otherAction},
      main = {},
    } = this.props;
    const {goodsDetail, collect, goodsInfo = {}} = main;
    let saleType = goodsDetail?.goods?.saleType;
    let token = Taro.getStorageSync('authInfo:token');
    if (token) {
      publicAction.changeFollow(!collect, saleType == 0 ? goodsInfo.goodsInfoId : goodsInfo.goodsInfoId);
    } else {
      Taro.navigateTo({
        url: `/pages/package-A/login/login/index`,
      });
    }
  }
}

//create by moon https://github.com/creasy2010/moon
