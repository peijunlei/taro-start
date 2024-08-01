import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '@/pages/shop-cart/types';
import actions from '@/pages/shop-cart/actions';
import { connect } from 'react-redux';
import { store2Props } from '@/pages/shop-cart/selectors';
import close from '@/assets/image/common/close.png';
import '../../css/package-mask.less';
import Price from '@/pages/common/goods/price';
import defaultImg from '@/assets/image/common/default-img.png';

type IMaskProps = T.IProps & T.IMaskProps;

@connect<Partial<IMaskProps>, T.IMaskState>(store2Props, actions)
export default class PackageMask extends Component<Partial<IMaskProps>, T.IConfirmMaskState> {
  static defaultProps = {
    shopCartMaskStyle: {},
  };

  constructor(props: IMaskProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: { action },
      main: {
        packageMaskData: { isPackageMaskOpen, packageList },
      },
    } = this.props;

    return (
      <View
        className="shop-cart-mask"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
        onClick={async () => {
          Taro.showTabBar();
          await action.loadingWML(false);
          action.commonChange([{ paths: 'main.packageMaskData.isPackageMaskOpen', value: false }]);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="mask-header">
            <Text className="header-text">套餐详情</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await action.loadingWML(false);
                await action.commonChange([{ paths: 'main.packageMaskData.isPackageMaskOpen', value: false }]);
                Taro.showTabBar();
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <ScrollView
            scrollY
            className="mask-con"
            style={__TARO_ENV === 'h5' ? { paddingBottom: 'calc( 20px + env(safe-area-inset-bottom))' } : {}}
          >
            {packageList.map(item => {
              return (
                <View
                  key={item.goodsInfoId}
                  className='goods-item'
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`,
                    })
                  }
                >
                  <View className='img-content'>
                    <Image src={item.goodsInfoImg || defaultImg} className="goods-img" />
                    {item.goodsStatus == 2 && <View className='goods-no-stock'>
                      <View className='no-stock-text'>失效</View>
                    </View>}
                    {item.goodsStatus == 1 && <View className='goods-no-stock'>
                      <View className='no-stock-text'>缺货</View>
                    </View>}
                  </View>
                  <View className='goods-content'>
                    <Text className='goods-name'>{item.goodsInfoName}</Text>
                    <Text className='goods-desc'>{item.specText}</Text>
                    <View className='goods-bottom'>
                      <Price price={item.marketPrice} buyPoint={item.buyPoint} />
                      <Text className='goods-num'>x{item.packageNum}</Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
