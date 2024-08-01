import { View, Image, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Price from '@/pages/common/goods/price';
import CartCount from '@/pages/common/goods/cart-count';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import moment from 'moment';
import './goods-item.less';
import { Const } from 'config';
import { _ } from 'wmkit';
import InputNumber from './inputnumber';
import { checkThemeJSON } from 'miniprogram-ci';

@connect(store2Props, actions)
export default class GoodsItem extends Component<any, any> {
  render() {
    if (!this.props?.main) return null; // 为了防止报错
    let { main = {}, actions = {} } = this.props;

    let { selectGoodsList, type, cardStatus, giftCard } = main;
    let goodsInfo = this.props?.goodsInfo || {};
    let isStepper = (this.props?.isStepper && type === '1' && cardStatus !== '0') || false;
    let groupId = this.props?.groupId || null;
    let canTodesc = this.props?.canTodesc == undefined ? true : this.props?.canTodesc;
    const scopeGoodsNum = giftCard?.scopeGoodsNum || goodsInfo.scopeGoodsNum;
    let index = selectGoodsList.findIndex((item) => item.goodsInfoId === goodsInfo?.goodsInfoId);
    if (index > -1) {
      goodsInfo = selectGoodsList[index];
    }
    const { cardRuleTypes, giftCardType } = giftCard || {};
    const goodsStatus = goodsInfo?.goodsStatus;
    const eTime = goodsInfo?.estimatedDeliveryTime;
    return (
      <View
        className="goods-item"
      >
        <View className="img-content"
          onClick={(e) => canTodesc && actions.action.showOrHideGoodsDetail(goodsInfo)}
        >
          <Image className="goodsImg" src={goodsInfo.goodsInfoImg || noDataIcon} />
          {goodsInfo.goodsStatus == 2 && (
            <View className="goods-no-stock">
              <View className="no-stock-text">失效</View>
            </View>
          )}
          {goodsInfo.goodsStatus == 1 && (
            <View className="goods-no-stock">
              <View className="no-stock-text">缺货</View>
            </View>
          )}
          {goodsInfo.goodsStatus == 4 && (
            <View className="goods-no-stock">
              <View className="no-stock-text">不支持销售</View>
            </View>
          )}
          {goodsInfo.goodsStatus == 99 && (
            <View className="goods-no-stock">
              <View className="no-stock-text">不支持配送</View>
            </View>
          )}
        </View>
        <View className="goods-content">
          <View style={{
            flex: 1,
            justifyContent: 'center'
          }}
            onClick={(e) => canTodesc && actions.action.showOrHideGoodsDetail(goodsInfo)}
          >
            <View className="goods-top">
              <Text className="goods-name">{goodsInfo?.goodsInfoName}</Text>
              {goodsInfo?.portionNum > 1 && <Text className="goods-num">{`x${goodsInfo?.portionNum}`}</Text>}
            </View>
            <Text className="goods-desc">{goodsInfo?.specText}</Text>
            {goodsInfo?.goodsSubtitle && <Text className="goods-title">{goodsInfo?.goodsSubtitle}</Text>}
          </View>
          <View>
            <View className="goods-price">
              {!cardRuleTypes?.includes(4) ? (
                <Price price={goodsInfo?.exchangePrice ? goodsInfo?.exchangePrice : goodsInfo?.marketPrice} />
              ) : (
                  <View />
                )}
              {isStepper && (
                // <CartCount
                //   min={0}
                //   count={goodsInfo?.addNum || 0}
                //   inventory={
                //     goodsInfo.goodsType === 6 ? 1 :
                //       Math.min(
                //         Number(goodsInfo.stock),
                //         Number(goodsInfo.residueQuota == null ? goodsInfo.stock : goodsInfo.residueQuota),
                //         Number(goodsInfo.cardLimit === null ? goodsInfo.stock : goodsInfo.cardLimit),
                //       )}
                //   getNum={async (index) => { }}
                //   handleValue={({ type, currentValue, nextValue }) => {
                //     let addNum = 0;
                //     if (type === 'add') {
                //       addNum = Number(currentValue) + Number(goodsInfo?.portionNum || 1);
                //     } else if (type === 'minus') {
                //       addNum = Number(currentValue) - Number(goodsInfo?.portionNum || 1);
                //     } else if (type === 'input') {
                //       addNum =
                //         Number(nextValue) * Number(goodsInfo?.portionNum || 1) >
                //           Math.min(
                //             Number(goodsInfo.stock),
                //             Number(goodsInfo.residueQuota == null ? goodsInfo.stock : goodsInfo.residueQuota),
                //             Number(goodsInfo.cardLimit === null ? goodsInfo.stock : goodsInfo.cardLimit),
                //           )
                //           ? Number(currentValue) * Number(goodsInfo?.portionNum || 1)
                //           : Number(nextValue) * Number(goodsInfo?.portionNum || 1);
                //     }
                //     console.log('addNum', addNum);
                //     actions.action.changeSkuNum({
                //       ...goodsInfo,
                //       addNum,
                //       groupId,
                //     });
                //   }}
                // />
                <InputNumber
                  min={0}
                  value={goodsInfo?.addNum || 0}
                  step={1}
                  disabled={[1,2,3,4,99].includes(goodsStatus)}// 1:缺货 2:失效 3:无权限 4:不支持销售 99:不支持配送
                  max={
                    goodsInfo.goodsType === 6 ? 1 :
                      Math.min(
                        Number(goodsInfo.stock),
                        Number(goodsInfo.residueQuota == null ? goodsInfo.stock : goodsInfo.residueQuota),
                        Number(goodsInfo.cardLimit === null ? goodsInfo.stock : _.div(goodsInfo.cardLimit, goodsInfo.portionNum)),
                        giftCardType === 2 ? scopeGoodsNum : Number(goodsInfo.stock),
                      )}
                  // onBlur={(e) => {
                  //   if (giftCardType !== 2) return
                  //   const portionNum = goodsInfo?.portionNum || 1;
                  //   const num = _.mul(Math.floor(_.div(e, portionNum)), portionNum);
                  //   actions.action.changeSkuNum({
                  //     ...goodsInfo,
                  //     addNum: num,
                  //     groupId,
                  //   });
                  // }}
                  onChange={(e) => {
                    console.log('e1', e);
                    // const num = _.mul(e, goodsInfo?.portionNum || 1)
                    actions.action.changeSkuNum({
                      ...goodsInfo,
                      addNum: e,
                      groupId,
                    });
                  }}
                />
              )}
            </View>
            {
              (goodsStatus === 5 || eTime) && <Text className='goods-pre'>预售商品，预计发货时间：{moment(eTime).format(Const.DATE_FORMAT)}</Text>
            }
          </View>
        </View>
      </View>
    );
  }
}
