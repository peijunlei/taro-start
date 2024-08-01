import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import moment from 'dayjs';
import * as T from '../../types';
import './../../css/spu-item.less';
import './../../css/sku-item.less';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {AtList, AtSwipeAction} from 'taro-ui';
import SkuSimpleItem from '../sku/sku-simple-item';

type ISpuItemProps = T.IProps & T.ISpuItemProps;

export default class SpuItem extends Component<Partial<ISpuItemProps>, T.ISpuItemState> {
  constructor(props: ISpuItemProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      spu,
      actions,
      actions: {action},
      main: {
        purInfo: {goodsInfos = [], selfBuying},
        useStatus: {isEdit},
        goods: {checkSku, skuMarketingDict},
      },
      singleSpecFlag,
    } = this.props;

    const skuSimpleList = this._skuInit(spu, goodsInfos, isEdit, skuMarketingDict, selfBuying);

    return (
      <AtList>
        {/* <AtSwipeAction
          onClick={async () => await action._deleteSku(spu.goodsInfoIds)}
          key={spu.goodsId}
          autoClose={true}
          options={options}
        >
          <View className="skuItem">
            <View className="goods-item"> */}
        {/* {
                <View
                  className="check-view"
                  onClick={async () => {
                    await action._checkSpu(skuSimpleList);
                  }}
                >
                  <Image className="check-image" src={this._getSpuCheck(skuSimpleList, checkSku) ? check : uncheck} />
                </View>
              } */}

        {/* <View className="cart-to-good">
                <PictureCom type={0} url={spu.goodsImg} />

                <View className="goods-info">
                  <View>
                    <Text className="goods-text">spu{spu.goodsName}</Text>
                  </View>
                </View>
              </View> */}
        {/* </View>
          </View>
        </AtSwipeAction> */}

        {skuSimpleList.map((item, index) => {
          const {sku, noStock, hasManyMarketing} = item;
          return (
            <SkuSimpleItem
              key={index}
              sku={sku}
              main={this.props.main}
              actions={this.props.actions}
              type={sku.goodsStatus}
              singleSpecFlag={singleSpecFlag}
              hasManyMarketing={hasManyMarketing}
              onSkuChange={this.props.onSkuChange}
            />
          );
        })}
      </AtList>
    );
  }

  _getSpuCheck = (list, checkSku) => {
    const newList = list.filter(({sku: {goodsStatus}}) => goodsStatus === 0);
    return newList.length && newList.every(({sku: {goodsInfoId, goodsStatus}}) => checkSku.includes(goodsInfoId));
  };

  _skuInit = (spu, skus, isEdit, skuMarketingDict, showDistributeCommission) => {
    //取出sku
    const skuList = skus
      .filter((sku) => spu.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2)
      //排序spu下面sku
      .sort((sku1, sku2) => {
        const date1 = moment(sku1.createTime);
        const date2 = moment(sku2.createTime);
        if (date1 > date2) {
          return -1;
        } else if (date1 < date2) {
          return 1;
        } else {
          return 0;
        }
      });
    return skuList.map((sku) => {
      let noStock = sku.goodsStatus === 1 && !isEdit;

      let goodsInfoId = sku.goodsInfoId;

      let skuMarketings = skuMarketingDict[goodsInfoId];

      // 是否有营销
      let hasMarketing = skuMarketings && skuMarketings.length;

      let selectedMarketing = null;

      if (hasMarketing) {
        skuMarketings.forEach((skuMarketing, index) => {
          if (skuMarketing.checked) {
            selectedMarketing = skuMarketing;
          }
        });
      }

      let hasManyMarketing = skuMarketings && skuMarketings.length > 1;
      // 社交电商相关内容显示与否
      const social = showDistributeCommission && sku.distributionGoodsAudit == 2;
      return {sku, noStock, hasManyMarketing};
    });
  };
}

const options = [
  {
    text: '删除',
    style: {
      background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
      color: '#fff',
    },
  },
];
//create by moon https://github.com/creasy2010/moon
