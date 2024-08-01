import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../less/price.less';
import * as T from '../../types';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {toFixed2} from '@/utils/priceFormat';
import {cache} from 'config';
import {_, WMkit} from 'wmkit';

type IPriceProps = T.IProps & T.IPriceProps;

@connect<Partial<IPriceProps>, T.IPriceState>(store2Props, actions)
export default class Price extends Component<Partial<IPriceProps>, T.IPriceState> {
  constructor(props: IPriceProps) {
    super(props);
  }

  /**
   价格
   */
  render() {
    let {
      // actions: {publicAction, otherAction},
      main,
    } = this.props;
    if (!main) {
      return;
    }
    const {goodsDetail, goodsInfo} = main;
    //划线价
    let lineShowPrice = this._originPriceInfo(goodsDetail?.goods?.linePrice, goodsInfo);
    return (
      <View className="social-goods-detail-priceprice">
        <Text className="now-price">
          <Text className="unit">￥</Text>
          { toFixed2(goodsInfo?.salePrice)}
        </Text>
        {/*{!!lineShowPrice && <Text className="old-price">￥{toFixed2(lineShowPrice)}</Text>}*/}
        {WMkit.isDistributor() && goodsInfo?.distributionGoodsAudit == '2' && !WMkit.isDistributorLoginForShare() && (
          <Text className="make">赚{_.addZero(goodsInfo.distributionCommission)}</Text>
        )}
      </View>
    );
  }

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm) => {
    let token = Taro.getStorageSync('authInfo:token');
    if (linePrice) {
      return linePrice;
    } else {
      if (token) {
        return goodsInfoIm.marketPrice;
      } else {
        return null;
      }
    }
  };
}

//create by moon https://github.com/creasy2010/moon