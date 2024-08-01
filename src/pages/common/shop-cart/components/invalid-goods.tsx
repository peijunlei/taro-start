import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import './../css/invalid-goods.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import SkuItem from './sku/sku-item';

type IInvalidGoodsProps = T.IProps & T.IInvalidGoodsProps;

@connect<Partial<IInvalidGoodsProps>, T.IGiftMaskState>(store2Props, actions)
export default class InvalidGoods extends Component<Partial<IInvalidGoodsProps>, T.IInvalidGoodsState> {
  constructor(props: IInvalidGoodsProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {
        purInfo: {goodsInfos = []},
        isFromC,
      },
    } = this.props;

    const invalidGoods = goodsInfos.filter(({goodsStatus}) => goodsStatus === 2);

    return (
      <View>
        {invalidGoods && Boolean(invalidGoods.length) && (
          <View className={isFromC ? 'invalid-goods-c' : 'invalid-goods'}>
            <View className="invalid-header">
              <Text className="header-title">失效商品</Text>
              <Text className="header-do" onClick={async () => await action._cleanInvalidGoods()}>
                清空失效商品
              </Text>
            </View>
            <View style={{pointerEvents: 'none'}}>
              {invalidGoods.map((sku) => {
                return (
                  <SkuItem
                    main={this.props.main}
                    actions={this.props.actions}
                    type={2}
                    sku={sku}
                    key={sku.goodsInfoId}
                    onSkuChange={() => {}}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
