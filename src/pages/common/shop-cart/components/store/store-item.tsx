import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { Checkbox } from '@wanmi/ui-taro';
import * as T from '@/pages/shop-cart/types';
import SkuItem from '../sku/sku-item';
import SpuItem from '../spu/spu-item';
import Marketing from './marketing';
import GiftItem from '../gift/gift-item';
import '../../css/store-item.less';
import InvalidGoods from './../invalid-goods';
import { getReducerData } from '@/redux/store';
import actions from '@/pages/shop-cart/actions';
import { connect } from 'react-redux';
import { store2Props } from '@/pages/shop-cart/selectors';
import moment from 'dayjs';
import { debounce } from 'lodash';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
type IStoreItemProps = T.IProps & T.IStoreItemProps;

@connect<Partial<IStoreItemProps>, T.IStoreItemState>(store2Props, actions)
export default class StoreItem extends Component<Partial<IStoreItemProps>, T.IStoreItemState> {
  // 自定义checkbox样式
  static externalClasses = ['wanmi-checkbox'];
  constructor(props: IStoreItemProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      myStore,
      index,
      len,
      storeCouponFlag,
      actions,
      main,
      main: {
        goods: { checkSku, storeMarketing, selectedMarketingGifts },
        purInfo: { goodsInfos = [], goodses = [] },
        useStatus: { isEdit },
        isFromC,
      },
      actions: { action },
    } = this.props;

    //获取店铺的spu
    const storeSpus = myStore?.goodsIds;
    const thisStoreSku = goodsInfos.filter(
      ({ storeId, goodsStatus }) => storeId === myStore?.storeId && goodsStatus !== 2,
    );

    return (
      <View>
        {thisStoreSku.length ? (
          <View className={!isFromC ? 'storeItem' : 'storeItemFromc'}>
            {!isFromC && (
              <View className="store-header">
                <View className="store-con-noEdit">
                  <View className="store-header-con">
                    <View className="money-left">
                      <View className="check-view">
                        <Checkbox
                          checked={actions._getStoreCheck(storeSpus, checkSku, goodsInfos)}
                          onClick={(checked) => {
                            // 选中状态，1为选中，0为未选中
                            // let checked = event.detail.value.length > 0;
                            action._checkStore(storeSpus, myStore?.storeId, checked);
                            // const maskResult = actions._getStoreCheck(storeSpus, checkSku, goodsInfos);
                            // action.loadingWML(!maskResult);
                          }}
                        />
                      </View>
                    </View>
                    <View className="store-header-content">
                      <View
                        className="store-header-left"
                        onClick={(e) => {
                          return
                          e.stopPropagation();
                          Taro.navigateTo({
                            url: `/pages/package-A/store/store-main/index?storeId=${myStore?.storeId}`,
                          });
                        }}
                      >
                        {myStore.companyType === 0 && (
                          <View className="store-type">
                            <Text className="store-type-text">自营</Text>
                          </View>
                        )}
                        <Text className="store-name">{myStore.storeName}</Text>
                      </View>

                      {/*优惠券*/}
                      {storeCouponFlag && !isEdit && (
                        <View
                          className="store-header-right"
                          onClick={async () => {
                            await action.loadingWML(true);
                            setTimeout(async () => {
                              await action._couponInit(storeSpus);
                            }, 300);
                            Taro.hideTabBar();
                          }}
                        >
                          <Text className="coupon-text">优惠券</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View className={isFromC ? '' : 'store-header-con-bottom'}></View>
            {this._goodsItemHtml(myStore)}
          </View>
        ) : null}
        {/*失效商品*/}
        {index + 1 === len && <InvalidGoods onSkuChange={this.props.onSkuChange} />}
      </View>
    );
  }

  _goodsItemHtml = (store) => {
    let {
      myStore,
      main,
      main: {
        goods: { selectedMarketingGifts, giftGoodsInfos },
        purInfo: { goodsInfos = [] },
        useStatus: { isEdit },
        storeMarketingGroup,
      },
    } = this.props;

    const mergerSelectedGift = this._mergeSelects(selectedMarketingGifts, myStore);
    const item: Array<any> = storeMarketingGroup[store.storeId];
    if (item) {
      return item.map((value, index) => {
        if (value.marketingId) {
          const goodses = value.goodses;
          return (
            <View key={value.marketingId + '' + value.storeId + ''}>
              {!isEdit && <Marketing marketings={Array.of(value)} />}
              {goodses.map((spu, index) => {
                const renderSpuStatus =
                  goodsInfos.filter((sku) => spu.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2)
                    .length > 1;
                //取出spu中只有一个sku的skuids
                const skuItems = goodsInfos.filter(
                  (sku) => spu.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2,
                );
                const renderSkuStatus = skuItems.length === 1;
                const sku = skuItems[0];

                const singleSpecFlag = spu.singleSpecFlag; //判断是否为多规格，单规格不可切换
                // renderSpuStatus这个值有问题,感觉判断的不是sku和spu,而是批发和非批发
                return renderSpuStatus ? (
                  <SpuItem
                    key={index}
                    main={this.props.main}
                    actions={this.props.actions}
                    spu={spu}
                    onSkuChange={this.props.onSkuChange}
                    singleSpecFlag={singleSpecFlag}
                  />
                ) : (
                    renderSkuStatus && (
                      <SkuItem
                        key={index}
                        main={this.props.main}
                        actions={this.props.actions}
                        type={sku.goodsStatus}
                        sku={sku}
                        singleSpecFlag={singleSpecFlag}
                        onSkuChange={this.props.onSkuChange}
                      />
                    )
                  );
              })}

              {
                //赠品
                !isEdit &&
                mergerSelectedGift.map((selectedMarketingGift, index) => {
                    const sku =
                      giftGoodsInfos[selectedMarketingGift.marketingId + '_' + selectedMarketingGift.goodsInfoId];
                    return value.marketingId == selectedMarketingGift.marketingId ? (
                      <GiftItem
                        main={main}
                        type={3}
                        sku={sku}
                        key={index}
                        productNum={selectedMarketingGift.goodsNum}
                      />
                    ) : null;
                  })
              }
              {/*当促销商品组不是最后一项item时展示border*/}
              {index !== item.length - 1 && <View className="salesPromotionBorder"></View>}
            </View>
          );
        } else {
          const renderSpuStatus =
            goodsInfos.filter((sku) => value.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2).length >
            1;
          //取出spu中只有一个sku的skuids
          const skuItems = goodsInfos.filter(
            (sku) => value.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2,
          );
          const renderSkuStatus = skuItems.length === 1;
          const sku = skuItems[0];

          const singleSpecFlag = value.singleSpecFlag; //判断是否为多规格，单规格不可切换
          return renderSpuStatus ? (
            <SpuItem
              key={sku.goodsInfoId}
              main={this.props.main}
              actions={this.props.actions}
              spu={value}
              onSkuChange={this.props.onSkuChange}
              singleSpecFlag={singleSpecFlag}
            />
          ) : (
              renderSkuStatus && (
                <SkuItem
                  key={sku.goodsInfoId}
                  main={this.props.main}
                  actions={this.props.actions}
                  type={sku.goodsStatus}
                  sku={sku}
                  singleSpecFlag={singleSpecFlag}
                  onSkuChange={this.props.onSkuChange}
                />
              )
            );
        }
      });
    }
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }

    return isBetween;
  };

  _getData = (): any => {
    return {
      main: getReducerData('packageCShopCartMain'),
    };
  };

  _spuInit = (spus, skus, storeSpus) => {
    return spus
      .filter((spu) => storeSpus.includes(spu.goodsId))
      .map((spu) => {
        const renderSpuStatus =
          skus.filter((sku) => spu.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2).length > 1;
        //取出spu中只有一个sku的skuids
        const skuItems = skus.filter((sku) => spu.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2);
        const renderSkuStatus = skuItems.length === 1;
        const sku = skuItems[0];
        return { spu, sku, renderSpuStatus, renderSkuStatus };
      });
  };

  _mergeSelects = (selectedMarketingGifts, store) => {
    const selectedGifts = selectedMarketingGifts.filter((item) => item.storeId === store.storeId);

    let mergeSelectedGifts = this._groupBy(selectedGifts, (item) => {
      return [item.marketingId + '_' + item.goodsInfoId];
    });

    return mergeSelectedGifts.reduce((a, b) => {
      let goodsNum = 0;
      b.forEach((gift) => {
        goodsNum += gift.goodsNum;
      });
      b[0].goodsNum = goodsNum;
      a.push(b[0]);
      return a;
    }, []);
  };

  _groupBy = (array, f) => {
    let groups = {};
    array.forEach(function (o) {
      let group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  };
}

//create by moon https://github.com/creasy2010/moon
