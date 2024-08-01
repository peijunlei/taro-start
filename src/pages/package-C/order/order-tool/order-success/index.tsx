import {Image, Text, View, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {msg, _} from 'wmkit';
import * as T from './types';
import {store2Props} from './selectors';
import actions from './actions';
import lodash from 'lodash';
// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';

import './index.less';

import api from 'api';

import success from '@/assets/image/common/success.png';
import {cache} from 'config';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderFillPaymentSuccess extends React.Component<any, any> {
  state = {
    pageIndex: 0,
    isHideComponent: false,
    currentPageDataIsComplete: false,
    isHideModule: true,
  };

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  componentDidMount() {
    // const stringContext = decodeURIComponent(getCurrentInstance().router.params.param);
    // const objContext = JSON.parse(stringContext);
    // this.props.actions.init(objContext);
    Taro.removeStorageSync(cache.ORDER_CONFIRM_PARAMS)
    const type = decodeURI(getCurrentInstance().router.params.type);
    console.log(getCurrentInstance().router.params);
    if (type && type == 'unionPay') {
      const param = decodeURI(getCurrentInstance().router.params.param);
      const base64 = new _.Base64();
      const encrypted = base64.decode(decodeURIComponent(param));
      const objContext = JSON.parse(encrypted) || {};
      this.props.actions.init(objContext);
    } else {
      const stringContext = decodeURIComponent(getCurrentInstance().router.params.param);
      const objContext = JSON.parse(stringContext) || {};
      this.props.actions.init(objContext);
    }
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  render() {
    const _param = getCurrentInstance().router.params?.param;
    const {isExamine} = _param?.includes?.('isExamine')
      ? JSON.parse(decodeURI(getCurrentInstance().router?.params?.param || '{}'))
      : {};
    const {payType, payOrders, tid, relationGoodsIdList, _payOrderStatus, paymentOrder, auditState} =
      this.props.main || {};

    const {pageIndex, isHideComponent, isHideModule} = this.state;
    let grouponNo = payOrders.length > 0 && payOrders[0].grouponNo;
    let payOrderStatus;
    if (grouponNo) {
      payOrderStatus = payOrders.length > 0 && payOrders[0].payOrderStatus === 0;
    }
    let grouponFlag = grouponNo && payOrderStatus;
    const useGiftCard = (payOrders || []).some((e) => e.giftCardType !== undefined && e.giftCardType !== null);
    return (
      <View className="packageCOrderFillPaymentSuccess">
        <ScrollView
          scrollY
          scrollTop={!isHideModule ? 0 : null}
          scrollWithAnimation
          enableBackToTop
          lowerThreshold={20}
          style={{height: '100vh', background: '#f5f5f5'}}
          onScrollToLower={lodash.debounce(() => {
            this.setState(({pageIndex, currentPageDataIsComplete}) => ({
              pageIndex: currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
            }));
          }, 1000)}
        >
          <View style={{height: !isHideModule ? 'calc(100% + 60px)' : 'auto', paddingTop: '40px'}}>
            <View className="returnS-info">
              <Image className="success" src={success} />
              <Text className="stext" style={{fontWeight: 'bold'}}>
                {/**判断条件：
                 *(paymentOrder && paymentOrder !='PAY_FIRST')    支付方式不是先款后货
                 * auditState == 'NON_CHECKED' || auditState == 'REJECTED'   审核状态为待审核或者打回
                 * (isExamine != undefined ? (isExamine && payType == '1') : payType == '1')   支付类型为线下支付
                 * */}
                {(paymentOrder && paymentOrder != 'PAY_FIRST') ||
                auditState == 'NON_CHECKED' ||
                auditState == 'REJECTED' ||
                (isExamine != undefined ? isExamine && payType == '1' : payType == '1')
                  ? '订单提交成功'
                  : '订单支付成功'}
              </Text>
              {auditState == 'NON_CHECKED' ? (
                <View className="returnS-info">
                  <Text className="stips">您的订单已提交审核</Text>
                  <Text className="stipb">您可在订单列表查看处理进度</Text>
                </View>
              ) : null}

              {auditState != 'NON_CHECKED' &&
              (isExamine != undefined ? isExamine == 1 && payType == '1' : payType == '1') ? (
                <View className="returnS-info">
                  <Text className="stips">您的订单已提交成功</Text>
                  <Text className="stipb">请尽快完成线下付款哦</Text>
                </View>
              ) : null}
            </View>

            <View>
              {payOrders.map((item, index) => {
                return (
                  <View className="slist" key={index}>
                    <View style={styles.box} key={item.orderCode}>
                      <View className="sitem-text">
                        {item.isSelf && !item.xuanKuaTradeFlag && (
                          <View className="store-type">
                            <Text className="store-type-text">自营</Text>
                          </View>
                        )}
                        <Text className="store-name">{item.storeName}</Text>
                      </View>
                      <View className="sitem-text no-bottom">编号：{isExamine ? tid : item.orderCode}</View>
                      <View className="sitem sitem-text no-top" style={{marginBottom: '0.17067rem'}}>
                        订单金额：
                        <Text className="price"> ¥{_.addZero(item.totalPrice)}</Text>
                      </View>

                      {item.receivableNo && (
                        <View className="sitem sitem-text no-top no-bottom">付款流水号：{item.receivableNo}</View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>

            {/* 热门商品推荐 */}
            {typeof isExamine !== 'undefined' || _payOrderStatus === 0 ? (
              <RecommendGoodsList
                pageIndex={pageIndex}
                type="6"
                recommendListCOMStyle={{
                  paddingTop: '16px',
                  paddingBottom: '90px',
                }}
                relationGoodsIdList={relationGoodsIdList}
                changeCommonModalProps={{
                  chooseStyle: {
                    bottom: 0,
                  },
                }}
                getCurrentPageDataIsComplete={(bol) => this.setState({currentPageDataIsComplete: bol})}
                setPageIndex={(index) => this.setState({pageIndex: index})}
                setHideModule={(bol) => this.setState({isHideModule: bol})}
                openModalHideComponent={(bol) => this.setState({isHideComponent: bol})}
              />
            ) : null}
          </View>
        </ScrollView>

        {!isHideComponent ? (
          <View className="bt-box">
            <View className="bt-contain">
              <View
                className="bt-item"
                onClick={async () => {
                  if (payOrders?.[0]?.xuanKuaTradeFlag || [0, 1, 2].includes(payOrders[0].tongKaShuKeTradeType)) {
                    //如果是电影票订单
                    if (__TARO_ENV === 'h5') {
                      window.location.href = payOrders[0].orderQueryUrl;
                    } else {
                      Taro.setStorageSync('movieOrderDetail', payOrders[0].orderQueryUrl);
                      Taro.navigateTo({url: `/pages/package-B/x-site/movie-order-detail/index`});
                    }
                  } else if (grouponFlag) {
                    await Taro.reLaunch({
                      url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${grouponNo}`,
                    });
                  } else if (payOrders.length > 1) {
                    await Taro.reLaunch({
                      url: `/pages/package-C/order/order-list/index`,
                    });
                  } else {
                    await Taro.reLaunch({
                      url: `/pages/package-C/order/order-detail/index?id=${tid ? tid : payOrders[0].orderCode}`,
                    });
                  }
                }}
              >
                {grouponFlag ? '查看团详情' : '查看订单'}
              </View>
              {useGiftCard ? null : (
                <View
                  className="bt-item"
                  onClick={async () => {
                    const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                    const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
                    if (singerCardLogin) {
                      Taro.redirectTo({
                        url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${LOGIN_DATA.userGiftCardId}&preview=false`,
                      });
                    } else {
                      await Taro.switchTab({url: '/pages/index/index'});
                    }
                  }}
                >
                  返回首页
                </View>
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = {
  box: {
    marginTop: '0px',
  } as any,
};
//create by moon https://github.com/creasy2010/moon
