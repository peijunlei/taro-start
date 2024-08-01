import {Text, View, Image, ScrollView} from '@tarojs/components';
import React, {Component} from 'react';
import {PopupLayer, Label, Price} from '@wanmi/ui-taro';
import * as T from '../types';
import './goods-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import nonePic from '@/assets/image/goods/goods-list/no-data-s.png';

type IGoodsModalProps = T.IProps & T.IGoodsModalProps;

@connect<Partial<IGoodsModalProps>, T.IGoodsModalState>(store2Props, actions)
export default class GoodsModal extends Component<Partial<IGoodsModalProps>, T.IGoodsModalState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;

    return (
      <View className="goods-modal">
        <PopupLayer
          visible
          title="可用商品"
          onClose={() => {
            action.commonChange('main.modalFlag', false);
          }}
        >
          <ScrollView className="stores-wrapper" scrollY>
            {main.modalStoreGoods.map((store) => {
              if(!store.storeName) return null;
              return (
                <View key={store.storeId} className="store-goods">
                  <View className="store-label">
                    {store.isSelf && <Label name="自营" type="gold" />}
                    <Text className="label-text">{store.storeName}</Text>
                  </View>
                  {store.goodsInfos.map((sku) => (
                    <View className="goods-item" key={sku.skuId}>
                      <Image className="item-img" src={sku.pic || nonePic} />
                      <View className="item-right">
                        <View className="right-top">
                          <View className="right-title">
                            {sku.isPreferential && (
                              <Text
                                className="gift-label"
                                style={{background: 'linear-gradient(90deg, #FF6666 0%, #FF0A0A 100%)'}}
                              >
                                换购
                              </Text>
                            )}
                            <Text className="title-txt">{sku.skuName}</Text>
                          </View>
                          <Text className="right-specs">{sku.specDetails}</Text>
                        </View>
                        <View className="right-bottom">
                          <View className="goods-price-preferentail">
                            {sku.isPreferential && <Text className="goods-price-preferentail-text">换购价</Text>}
                            <Price price={sku.price} />
                          </View>
  
                          <Text className="bottom-num">x{sku.num}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )
            })}
          </ScrollView>
        </PopupLayer>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
