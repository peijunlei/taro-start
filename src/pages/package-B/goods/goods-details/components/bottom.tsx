import {View, Text, Image} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import customer from '@/assets/image/goods/goods-detail/customer.png';
import cart from '@/assets/image/goods/goods-detail/cart.png';
import store from '@/assets/image/goods/goods-detail/store.png';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {_, WMkit} from 'wmkit';
moment.extend(isBetween);
moment.extend(isSameOrBefore);
moment.extend(isSameOrAfter);
const defaultImage =
  'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/pandora-ui/assets/components/images/image-slider/icon-no-img.png';

type IBottomProps = T.IProps & T.IBottomProps;
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IBottomProps) {
    super(props);
  }

  /**
   去购物车
   */
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    //当前选中商品是否为正在进行的抢购活动
    let flashsaleGoodsFlag = false;
    let flashsalePrice;
    let flashsaleGoods;
    let flashSaleGoodsId;
    const selectdGoodsInfoId = main && main.goodsInfo && main.goodsInfo.goodsInfoId;
    if (main && main.flashsaleGodos && main.flashsaleGodos.length > 0) {
      main.flashsaleGodos.map((v) => {
        if (v.goodsInfoId == selectdGoodsInfoId && v.stock >= v.minNum) {
          flashsaleGoodsFlag = true;
          flashSaleGoodsId = v.id;
          flashsalePrice = v.price;
          flashsaleGoods = v;
        }
      });
    }
    return (
      <View className="goods-detail-bottom" style={{position: 'fixed', bottom: 0}}>
        <View className="l-content">
          {main.isServiceOpen ? (
            <View
              className="down-text"
              onClick={() => {
                this._choseService()
              }}
            >
              <Image className="dh" src={customer} />
              <Text className="text">客服</Text>
            </View>
          ) : null}

          {/* {WMkit.isMall() ? null : (
            <View
              className="down-text"
              onClick={() => {
                if (!main.storeInfo.storeId) {
                  return;
                }
                WMkit.inviteeId() && WMkit.channelType() == '2'
                  ? Taro.redirectTo({
                      url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
                    })
                  : Taro.switchTab({url: '/pages/index/index'});
              }}
            >
              <Image className="dh" src={store} />
              <Text className="text">店铺</Text>
            </View>
          )} */}
          <View
            className="down-text"
            onClick={() =>
              WMkit.inviteeId() && WMkit.channelType() == '2'
                ? Taro.redirectTo({url: '/pages/package-B/distribution/store/social-c/shop-cart-c/index'})
                : Taro.navigateTo({
                    url: '/pages/package-B/goods/shop-cart-without-bottom/index',
                  })
            }
          >
            {main?.shopCarNum > 0 && (
              <View className="box">
                <Text className="num">{main.shopCarNum}</Text>
              </View>
            )}
            <Image className="dh" src={cart} />
            <Text style={{whiteSpace: 'nowrap'}} className="text">
              购物车
            </Text>
          </View>
        </View>
        <View></View>
        {main?.isPointsGoods ? (
          //积分商品 点击触发弹框
          <View className="btn-box">
            <View
              className="btn-item"
              onClick={() => {
                if (!WMkit.isLogin()) {
                  Taro.navigateTo({
                    url: '/pages/package-A/login/login/index',
                  });
                } else {
                  publicAction.commonChange('main.pointsExchangeVisible', !main.pointsExchangeVisible);
                }
              }}
            >
              立即兑换
            </View>
          </View>
        ) : /* 秒杀按钮 */
        main?.appointmentSaleVO &&
          main.appointmentSaleVO.id &&
          ((main.goodsInfo && main.goodsInfo.buyPoint == null) || (main.goodsInfo && main.goodsInfo.buyPoint == 0)) ? (
          this.isBuyStatus(main.appointmentSaleVO) == '抢购中' ? (
            <View className="btn-box">
              <View
                className="btn-item"
                onClick={() => publicAction.openSpecModal(main.goodsDetail.goods.saleType, true, 1)}
              >
                立即抢购
              </View>
            </View>
          ) : /**立即预约按钮 */
          this.isBuyStatus(main.appointmentSaleVO) == '预约中' ? (
            !main.subscriptionFlag ? (
              <View className="btn-box">
                <View
                  className="btn-item"
                  onClick={() => {
                    publicAction.openSpecModal(main.goodsDetail.goods.saleType, true, 5);
                    publicAction.commonChange('main.currentPreBuyStatus', 0);
                  }}
                >
                  立即预约
                </View>
              </View>
            ) : (
              <View className="btn-box">
                <View className="btn-item btn-item-disable">已预约</View>
              </View>
            )
          ) : (
            <View className="btn-box">
              <View className="btn-item btn-item-disable">
                <View>
                  {main.appointmentSaleVO &&
                    !moment(main.appointmentSaleVO.snapUpStartTime).isSameOrBefore(main.serverTime) && (
                      <CountDown
                        allowFontScaling={false}
                        numberOfLines={1}
                        groupFlag={false}
                        prelistFlag
                        showTimeDays
                        endHandle={() => {
                          publicAction.queryPreBuyTime(selectdGoodsInfoId);
                        }}
                        endTime={main.appointmentSaleVO && main.appointmentSaleVO.snapUpStartTime}
                        serverTime={main.serverTime}
                        timeOffset={moment(main.appointmentSaleVO && main.appointmentSaleVO.snapUpStartTime)
                          .diff(moment(main.serverTime), 's')
                          .toFixed(0)}
                      />
                    )}
                </View>
                <View className="btn-item-text">后开抢</View>
              </View>
            </View>
          )
        ) : main?.bookingSaleVO?.id &&
          this.isPresaleStatus(main.bookingSaleVO) &&
          ((main.goodsInfo && main.goodsInfo.buyPoint == null) || (main.goodsInfo && main.goodsInfo.buyPoint == 0)) ? (
          // 预售活动
          <View className="btn-box">
            {main?.bookingSaleVO?.bookingType == 0 ? (
              <View
                className="btn-item"
                onClick={() => publicAction.openSpecModal(main?.goodsDetail?.goods?.saleType, true, 6)}
              >
                全款预定
              </View>
            ) : (
              <View
                className="btn-item"
                onClick={() => publicAction.openSpecModal(main?.goodsDetail?.goods?.saleType, true, 6)}
              >
                支付定金
              </View>
            )}
          </View>
        ) : flashsaleGoodsFlag && (main?.goodsInfo?.buyPoint == null || main?.goodsInfo?.buyPoint == 0) ? (
          <View className="btn-box">
            <View
              className="btn-item"
              onClick={() => otherAction.rushToBuyingFlashSaleGoodsInfo(flashsaleGoods.id, flashsaleGoods.minNum)}
            >
              立即抢购
            </View>
          </View>
        ) : (
          <View className="btn-box">
            {/* 普通商品详情按钮 */}
            {main?.goodsDetail?.goods?.goodsBuyTypes?.indexOf('0') > -1 && (
              <View className="btn-item-light" style={{marginRight: '8px', flex: 1}}>
                <Button
                  type="gold"
                  onClick={(e) => {
                    publicAction.openSpecModal(main.goodsDetail.goods.saleType, false, '1');
                  }}
                >
                  加入购物车
                </Button>
              </View>
            )}

            {main?.goodsDetail?.goods?.goodsBuyTypes?.indexOf('1') > -1 && (
              <View style={{flex: 1}}>
                <Button
                  onClick={(e) => {
                    publicAction.openSpecModal(main.goodsDetail.goods.saleType, true, '1');
                  }}
                >
                  立即购买
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  //判断当前的预约状态
  isBuyStatus = (status) => {
    if (!status) return;
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = appointmentStartTime ? moment(appointmentStartTime).isBefore(new Date()) : null;
    let isAppointmentEnd = appointmentEndTime ? moment(new Date()).isBefore(appointmentEndTime) : null;

    let isSnapUpStartTime = snapUpStartTime ? moment(snapUpStartTime).isBefore(new Date()) : null;
    let isSnapUpEndTime = snapUpEndTime ? moment(new Date()).isBefore(snapUpEndTime) : null;

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    return result;
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

  /**
   * 判断预售是否发货状态
   */
  isDeliverStatus = (item) => {
    const {deliverTime} = item;
    return moment(new Date()).isSameOrAfter(deliverTime);
  };

  /**
   * 未登录去登录页
   * @private
   */
  _isLogin = () => {
    if (!WMkit.isLogin()) {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
  };

  _choseService = () => {
    Taro.navigateTo({
      url: `/pages/package-A/customer/chose-service-webview/index`,
    });
    return
    let {serviceUrl, enterpriseId, storeInfo, goodsInfo} = this.props.main;
    const pageInfo: any = Taro.getCurrentInstance().page;
    const route = pageInfo.route;
    const skuId = pageInfo?.options?.skuId;
    if (serviceUrl && enterpriseId) {
      // 直接跳转
      if (__TARO_ENV === 'h5') {
        window.location.href = serviceUrl;
      } else {
        wx.openCustomerServiceChat({
          extInfo: {url: serviceUrl},
          corpId: enterpriseId,
          showMessageCard: true,
          sendMessageTitle: goodsInfo.goodsInfoName,
          sendMessageImg: goodsInfo.goodsInfoImg || defaultImage,
          sendMessagePath: `${route}.html?skuId=${skuId}`,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res);
          },
        });
      }
      return;
    }
    if (__TARO_ENV === 'h5') {
      Taro.navigateTo({
        url: `/pages/package-A/customer/chose-service-webview/index?storeId=${
         storeInfo.storeId
        }`,
      });
    } else {
      Taro.setStorageSync(
        'weChatInfo',
        JSON.stringify({
          sendMessageTitle: goodsInfo.goodsInfoName,
          sendMessageImg: goodsInfo.goodsInfoImg || defaultImage,
          sendMessagePath: `${route}.html?skuId=${skuId}`,
        }),
      );
      Taro.navigateTo({
        url: `/pages/package-A/customer/chose-service-webview/index?storeId=${
         storeInfo.storeId
        }&showMessageCard=true`,
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
