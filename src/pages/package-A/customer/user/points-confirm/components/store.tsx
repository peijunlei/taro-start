import {Image, Input, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/store.less';
import '../css/index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PictureCom from './picture-com';
import {_} from 'wmkit';

import arrow from '@/assets/image/common/arrow.png';
import arrowDown from '@/assets/image/order/arrow-down.png';
import arrowUp from '@/assets/image/order/arrow-up.png';
import IconFont from '@/wmkit/common/iconfont';

type IStoreItemProps = T.IProps & T.IStoreItemProps;

@connect<Partial<IStoreItemProps>, T.IStoreItemState>(store2Props, actions)
export default class Store extends Component<Partial<IStoreItemProps>, T.IStoreItemState> {
  constructor(props: IStoreItemProps) {
    super(props);
  }
  renderRestrictedInfo = (item: any) => {
    console.log('renderRestrictedInfo', item);
    if (!item.restrictedFlag) return null;
    return (
      <View className='tips'>
        <IconFont value="zhuyi" size={15} color="#FF0022" />
        <Text className='text'>当前地区不支持销售，可更换收货地址购买</Text>
      </View>
    )
  }
  render() {
    console.log('render store');
    let {
      main = {},
      actions: {action},
    } = this.props;
    const {myStore = {}, orderList = {}} = main;
    const {supplier = {}, tradeItem = {}} = myStore.pointsTradeConfirmItem || {};
    const { packageGoodsRels } = tradeItem;
    return (
      <View className="confirm-store">
        <View className="confirm-store-left">
          {supplier.isSelf && (
            <View className="confirm-store-type">
              <Text className="confirm-store-type-text">自营</Text>
            </View>
          )}
          <Text className="confirm-store-name">{supplier.storeName}</Text>
        </View>

        <View
          className="order-store-item"
          onClick={async () => {
            const strParams = JSON.stringify({
              pointsGoodsId: tradeItem.pointsGoodsId,
              num: tradeItem.num,
            });
            await this.props.actions.action._savaLocal();
            await Taro.navigateTo({url: `/pages/package-A/customer/user/points-sku-list/index?params=${strParams}`});
          }}
        >
          {/*图片列表*/}
          <View className="sku-pic-list">
            <PictureCom type={0} url={tradeItem.pic} />
          </View>
          {/* <View className="store-item-right">
            <Text className="item-text">{1}</Text>
            <Image className="arrow-img" src={arrow} />
          </View> */}
          <View className={['goods-info-point', 'goods-info-'].join(' ')}>
            <View className="gift-con">
              {/* {isSelf && (
                    <View className="gift-sku-icon">
                      <Text className="gift-sku-text">自营</Text>
                    </View>
                  )} */}

              <Text className="goods-text" decode={true}>
                {tradeItem.skuName}
              </Text>
            </View>

            <View className="goods-spec">
              <Text className="spec-text">{tradeItem.specDetails || ''}</Text>
            </View>

            <View className="goods-price">
              <View className="price-goods">
                <Text className="points-icon">{tradeItem.points}积分</Text>
              </View>

              <View className="produce-con">
                <Text className="product-icon">x</Text>
                <Text className="product-num">
                  {tradeItem.num}
                  {tradeItem.unit ? tradeItem.unit : ''}
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
        {this.renderRestrictedInfo(tradeItem)}
        {packageGoodsRels && packageGoodsRels.length > 0 && (
          <View>
            <View className="package-top">
              <View className="package-desc">套餐内包含以下商品</View>
              <View className="package-arrow">
                <Text
                  className="package-arrow-text"
                  onClick={() => {
                    this.setState({
                      [`status`]: !this.state[`status`],
                    });
                  }}
                >
                  {this.state[`status`] ? '展开' : '收起'}
                </Text>
                <Image
                  style={{ width: '12px', height: '12px' }}
                  src={this.state[`status`] ? arrowDown : arrowUp}
                />
              </View>
            </View>
            <View className="packages-goods">
              {packageGoodsRels.map((item1, index) => {
                if (this.state[`status`] && index > 0) return null;
                return (
                  <View className="goods-item">
                    <View className="item-name">
                      <Text className="name-left">·</Text>
                      <Text className="name-right">{item1.skuName}</Text>
                    </View>
                    <Text className="item-num">×{item1.num}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* <View className="order-store-item">
          <Text className="order-item-label">支付配送</Text>
          <View className="store-item-right">
            <Text className="item-text">在线支付</Text>
            <Text className="item-text">快递配送</Text>
          </View>
        </View> */}

        <View className="order-store-item">
          <Text className="order-item-label">发票信息</Text>
          <View className="store-item-right">
            <Text className="item-text">暂不支持</Text>
          </View>
        </View>

        <View className="order-store-item point-order">
          <Text className="order-item-label">订单备注</Text>

          <View className="order-item-input">
            <Input
              maxlength={100}
              value={orderList.buyRemark?.[supplier.storeId]}
              placeholder="点击输入，100字以内"
              className="invoice-input"
              onInput={(e) => {
                action._orderBuyRemarkChange(supplier.storeId, e.target.value);
              }}
            />
          </View>
        </View>

        <View className="order-store-item">
          <Text className="order-item-label">订单金额</Text>
          <View className="store-item-right">
            <Text className="item-text">{_.mul(tradeItem.points, tradeItem.num)}积分</Text>
          </View>
        </View>

        <View className="order-store-item">
          <Text className="order-item-label">商品金额</Text>
          <View className="store-item-right">
            <Text className="item-text">{_.mul(tradeItem.points, tradeItem.num)}积分</Text>
          </View>
        </View>

        {!orderList.isVirtualGoods && (
          <View className="order-store-item">
            <Text className="order-item-label">配送费用</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{0.0}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
