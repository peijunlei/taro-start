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
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import {Price as WMprice} from '@wanmi/ui-taro';

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
      actions: {publicAction, otherAction},
      main: {goodsDetail, goodsInfo, flashsaleGodos, iepInfo, bookingSaleVO, appointmentSaleVO},
      flashsaleGoodsFlag,
    } = this.props;
    //划线价
    let flashsalePrice;
    const selectdGoodsInfoId = goodsInfo.goodsInfoId;
    if (flashsaleGoodsFlag) {
      flashsaleGodos.map((v) => {
        if (v.goodsInfoId == selectdGoodsInfoId && v.stock >= v.minNum) {
          flashsalePrice = v.price;
        }
      });
    }
    //当商品允许分销且分销审核通过，视为分销商品
    const distributionFlag = goodsInfo.distributionGoodsAudit == '2';
    let bookingSaleOne = bookingSaleVO && bookingSaleVO.bookingType == 1 && this.isPresaleStatus(bookingSaleVO);
    if (bookingSaleOne) {
      flashsalePrice = goodsInfo.marketPrice || 0;
    }

    // iep属性
    // @ts-ignore
    const {isIepAuth: iepSwitch, iepInfo: info} = iepInfo;
    // 默认为企业价
    const {enterprisePriceName} = info || {};
    const bookingFlag = bookingSaleVO && JSON.stringify(bookingSaleVO) != '{}';
    const appointFlag = appointmentSaleVO && JSON.stringify(appointmentSaleVO) != '{}';
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    // 市场价
    const isMarketPrice = bookingFlag || appointFlag;
    //企业购商品的判断
    const iepGoodsShowFlag =
      iepSwitch && goodsInfo.enterPriseAuditState == 2 && !flashsaleGoodsFlag && !bookingFlag && !appointFlag;
    // 积分价>预约预售>秒杀>分销>企业价>拼团
    let price =
      goodsInfo.buyPoint > 0
        ? _.addZero(goodsInfo.salePrice)
        : flashsaleGoodsFlag
        ? _.addZero(flashsalePrice)
        : distributionFlag || isMarketPrice || (loginData.enterpriseCheckState === 2 && iepGoodsShowFlag)
        ? _.addZero(goodsInfo.marketPrice)
        : _.addZero(goodsInfo.salePrice);
    // 是否全款预售
    let isAllMoneySale = bookingFlag && bookingSaleVO.bookingType == 0 ? true : false;
    //划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    const lineShowPrice = appointFlag || isAllMoneySale || flashsaleGoodsFlag ? goodsInfo.marketPrice : 0;
    return (
      <View className="goods-detail-price">
        <WMprice
          price={Number(price)}
          priceSize="long"
          decimalSize="long"
          plusSize="large"
          buyPoint={goodsInfo.buyPoint}
          linePrice={lineShowPrice}
        />
        {iepGoodsShowFlag && (goodsInfo.buyPoint == null || goodsInfo.buyPoint == 0) && (
          <View className="goods-retail-box">
            <Text className="enterPrisePrice">￥{toFixed2(goodsInfo.enterPrisePrice)}</Text>
            <View className="marketing">
              <Text className="marketing-text">{enterprisePriceName}</Text>
            </View>
          </View>
        )}

        {WMkit.isDistributor() &&
          !flashsaleGoodsFlag &&
          goodsInfo.distributionGoodsAudit == '2' &&
          !bookingFlag &&
          (goodsInfo.buyPoint == null || goodsInfo.buyPoint == 0) && (
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
   *     b.2.登陆后,如果按客户设价展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm, priceType) => {
    let token = Taro.getStorageSync('authInfo:token');
    if (token) {
      return linePrice;
    } else {
      return null;
    }
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const {bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime} = item;
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
}

//create by moon https://github.com/creasy2010/moon
