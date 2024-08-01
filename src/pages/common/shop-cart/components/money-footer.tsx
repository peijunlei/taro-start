import {View, Button, Text} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {isEqual} from 'lodash';
import * as T from '@/pages/shop-cart/types';
import './../css/money-footer.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import check from '@/assets/image/shop-cart/check.png';
import {toFixed2} from '@/utils/priceFormat';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import {WMkit} from 'wmkit';
import {debounce} from 'lodash';
import {Checkbox} from '@wanmi/ui-taro';

type IMoneyFooterProps = T.IProps & T.IMoneyFooterProps;

@connect<Partial<IMoneyFooterProps>, T.IGiftMaskState>(store2Props, actions)
export default class MoneyFooter extends Component<Partial<IMoneyFooterProps>, T.IMoneyFooterState> {
  constructor(props: IMoneyFooterProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      actions,
      main: {
        customerInfo,
        isFromC,
        purInfo: {totalPrice, tradePrice, totalBuyPoint, distributeCommission, discountPrice, goodsInfos = []},
        useStatus: {isEdit},
        goods: {checkSku},
        getPriceInfoFlag,
        canClick,
      },
      isSecondShopCart,
    } = this.props;
    //分销员 购物车
    const countInvalid = this._getErrorNum(goodsInfos, checkSku);
    const textColor = ['submit-btn-text', checkSku.length ? '' : 'disabled-text'].join(' ');
    const rightBtn = ['submit-edit-btn', 'right-btn', checkSku.length ? '' : 'no-check2'].join(' ');
    const disabledBtn = ['submit-edit-btn', checkSku.length ? '' : 'no-check2'].join(' ');
    //@ts-ignore
    const isH5 = __TARO_ENV === 'h5';
    return (
      <View
        className={this._getFooterClass(isH5, isFromC, isSecondShopCart)}
        onTouchMove={(e) => e.preventDefault()}
        style={{
          bottom: isSecondShopCart ? 'calc(0px + env(safe-area-inset-bottom))' : 0,
        }}
      >
        {Boolean(countInvalid) && !isEdit && (
          <View className="no-do">
            <Text className="no-do-text">有{countInvalid}种商品不符合下单条件，无法下单</Text>
          </View>
        )}

        <View className="money-footer">
          <View className="money-con">
            <View className="money-left">
              <View className="check-view">
                <Checkbox
                  checked={actions._getIsAllCheck(checkSku, goodsInfos)}
                  onClick={(checked) => {
                    action._checkAllSkus(checked);
                  }}
                />
              </View>
              <Text className="check-text">全选</Text>
            </View>

            {!isEdit && (
              <View className="money-total">
                <View className="total-con">
                  <Text className="total-key">合计:</Text>

                  <Text className="total-num">
                    {totalBuyPoint > 0 && (
                      <Text className="point-price-state">
                        {totalBuyPoint}
                        <Text className="point-price-state-title">积分</Text>+
                      </Text>
                    )}
                    <Text className="total-icon">¥</Text>
                    {this.addZero(tradePrice)}
                  </Text>
                </View>
                <View className="total-coupon">
                  <Text className="total-coupon-key">总额:</Text>
                  <Text className="total-coupon-val" style={{paddingRight: '5px'}}>
                    {totalBuyPoint > 0 && (
                      <Text className="point-price-state">
                        {totalBuyPoint}
                        <Text className="point-price-state-title">积分</Text>+
                      </Text>
                    )}
                    ¥{this.addZero(totalPrice)}
                  </Text>
                  <Text className="total-coupon-key">优惠:</Text>
                  <Text className="total-coupon-val">-¥{this.addZero(discountPrice)}</Text>
                </View>
                {customerInfo.pointsAvailable > 0 && totalBuyPoint > 0 && (
                  <View className="total-coupon  total-point">
                    <Text className="total-coupon-key">可用积分:</Text>
                    <Text className="total-coupon-val">{customerInfo.pointsAvailable || 0}</Text>
                  </View>
                )}
                {distributeCommission > 0 && WMkit.isDistributor() && WMkit.channelType() != '2' && !isFromC && (
                  <View className="total-coupon  total-point">
                    <Text className="total-coupon-key">返利:</Text>
                    <Text className="total-coupon-val">￥{toFixed2(distributeCommission)}</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {!isEdit && (
            <View
              className={[
                'submit-shop-cart',
                checkSku.length && !countInvalid && getPriceInfoFlag ? '' : 'no-check1',
              ].join(' ')}
              onClick={() => {
                canClick && this._toConfirm(checkSku, countInvalid, getPriceInfoFlag);
              }}
            >
              <Text className="submit-text">结算({checkSku.length})</Text>
            </View>
          )}

          {isEdit && (
            <View className="submit-edit-con">
              {!WMkit.isShop() && (
                <View className={disabledBtn} onClick={async () => checkSku.length && action._addFollow(checkSku)}>
                  <Text className={textColor}>移入收藏夹({checkSku.length})</Text>
                </View>
              )}
              <View className={rightBtn} onClick={async () => await this._delete(checkSku)}>
                <Text className={textColor}>删除({checkSku.length})</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  _toConfirm = async (checkSku, countInvalid, getPriceInfoFlag) => {
    let {
      actions: {action},
    } = this.props;
    if (checkSku.length && !countInvalid && getPriceInfoFlag) {
      await action.toConfirm();
    }
  };

  _getFooterClass = (isH5, isFromC, isSecondShopCart) => {
    //二级购物车
    if (isSecondShopCart) {
      return 'footer-con-s';
    }
    if (isH5) {
      return 'footer-con-h5';
    }
    if (isFromC) {
      return 'footer-con-c';
    } else {
      return 'footer-con';
    }
  };
  //统计不符合下单条件的
  _getErrorNum = (goodsInfos, checkSku) => {
    let num = 0;
    goodsInfos.forEach((item) => {
      const index = checkSku.indexOf(item.goodsInfoId);
      const skuNum = item.buyCount || 0;
      const min = item.count || 0;
      const max = item.maxCount == 0 ? 0 : item.maxCount || Infinity;
      if (~index) {
        num += skuNum > max || skuNum < min || item.goodsStatus === 3 ? 1 : 0;
      }
    });
    return num;
  };

  _delete = async (checkSku) => {
    const action = this.props.actions.action;
    if (checkSku.length) {
      await action._deleteSku(checkSku);
      await action.commonChange('main.useStatus.isEdit', false);
    }
  };
  /**
   * 为整数添加两位小数
   * 四舍五入
   */
  addZero = function (num) {
    return new Number(num ? num : 0).toFixed(2);
  };
}

//create by moon https://github.com/creasy2010/moon
