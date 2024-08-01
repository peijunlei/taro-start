import * as reduxStore from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import Taro from '@tarojs/taro';
import Action from './action';
import { ifLogin } from '@/utils/common-functions';
import { cashCardBuy, pickupCardBuy } from 'api/TradeBaseController';

import packageCOrderOrderConfirmMain from '../reducers/main';
import { _ } from 'wmkit';
import { cache, Const } from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(params, ctx = {} as any) {
      const type = params?.type || '1';
      const giftCardType = params?.giftCardType;
      const activityId = params?.activityId;
      const leaderId = params?.leaderId;
      await actions.loadReducer();
      //地址初始化
      const address = await actions.action._addressInit();
      let purchaseItems;
      try {
        purchaseItems = Taro.getStorageSync(cache.PURCHASE_SETTLEMENT);
        if (!purchaseItems) {
          purchaseItems = await api.tradeBaseController.getPurchaseItems();
        } else {
          Taro.removeStorageSync(cache.PURCHASE_SETTLEMENT);
        }
        var {
          totalPrice,
          goodsTotalPrice,
          discountsTotalPrice,
          storeBagsFlag,
          tradeConfirmItems,
          couponCodes,
          grouponFreeDelivery,
          openGroupon,
          totalBuyPoint,
          totalCommission,
          shopName,
          inviteeName,
          purchaseBuy,
          orderTagVO,
          userGiftCardId,
          kaGuanZhiChongNumber,
          cityId
        } = purchaseItems || {};
        if (!storeBagsFlag) {
          //检查小店分销状态(小店外购买返回true)
          const status = api.distributionController.checkStatus();
          if (!status) {
            await actions.action._getMasK('storeBagsFlag', '');
            return;
          }
        }
        var customer = await api.customerBaseController.findCustomerMobile();
        Taro.hideLoading()
      } catch (e) {
        Taro.hideLoading()
        await actions.action._confirmMaskInit(e);
        return;
      }
      //可用优惠券
      let canUseCoupons = couponCodes.filter((item) => item.status == 0);
      const canUseCouponsLength = canUseCoupons.length;
      let deliverType = 0;
      tradeConfirmItems.forEach((item, index) => {
        const v = { ...item.supplier };
        const skuId =  item.tradeItems[0].skuId;
        item.supplier._storeId = `${v.storeId}_${skuId}`;
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            userGiftCardId: userGiftCardId,
            kaGuanZhiChongNumber: kaGuanZhiChongNumber,
            cashCardName: purchaseItems.cashCardName,
            giftCardType: Number(giftCardType),
            pickUpCardName: purchaseItems?.pickUpCardName,
            giftCardNum: purchaseItems.giftCardNum || 0,
            stores: tradeConfirmItems,
            cityId,
            orderList: {
              //地址相关数据
              address: address,
              //订单备注
              buyRemark: {},
              //附件图片
              enclosures: {},
              dangaoDate: {},
              dangaoGreeting: {},
              dangaoPhone: {},
              dangaoTime: {},
              dangaoShop: {},
              dangaoDeliverWay: {},
              dangaoDeliveryText: {},
              dangaoDistributionRuleId: {},
              dangaoDeliveryAmount: {},
              kaGuanZhiChong:{},
              isVirtualGoods: orderTagVO?.electronicCouponFlag || orderTagVO?.virtualFlag,
            },
            coupons: couponCodes,
            price: {
              totalPrice,
              goodsTotalPrice,
              discountsTotalPrice,
              totalDeliveryPrice: 0,
              couponTotalPrice: 0,
              pointTotalPrice: 0,
              totalBuyPoint,
              totalCommission,
            },
            grouponFreeDelivery: grouponFreeDelivery,
            openGroupon: openGroupon,
            purchaseBuy: purchaseBuy,
            localData: {
              deliverType: deliverType,
              confirmCoupon: {
                unreachedIds: [],
                couponTotalPrice: 0,
                checkGoodsInfos: {},
                checkCoupon: {},
                checkCouponStore: {},
              },
            },
            storeBagsFlag: storeBagsFlag == 1,
            isBookingSaleGoods:
              tradeConfirmItems &&
              tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods &&
              tradeConfirmItems[0].tradeItems[0].bookingType == '1', //预售定金
            isPresale: tradeConfirmItems && tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods,
            isThirdPlatform: tradeConfirmItems.some((n) => n.tradeItems.some((item) => item.thirdPlatformType === 0)),
            tailNoticeMobile: customer && customer.customerAccount,
            inviteeName: inviteeName,
            shopName: shopName,
            canUseCouponsLength: canUseCouponsLength,
          },
        },
      });
      actions.action.getRestrictedGoodsList()
      await actions.action._switchInit()
      await actions.action._calcFreight()
      if (purchaseItems.userGiftCardId) {
        await this.getGiftCard(purchaseItems);
      }else{
        actions.action.commonChange([
          { paths: 'main.loaded', value: true },
        ]);
      }
      actions.action.calcSplitInfo();
      // actions.action.getRestrictedGoodsList();

    },

    async getGiftCard(purchaseItems: any) {
      const id = purchaseItems.userGiftCardId;
      const result = (await api.giftCardController.getUserGiftCardDetail(id)) as any;
      const giftCart = ifLogin()
        ? await api.GiftCardUseBaseController.queryGiftCard({
          userGiftCardId: id,
          giftCardId: id,
        })
        : await api.GiftCardUseBaseController.queryGiftCardUnLogin({
          userGiftCardId: id,
          giftCardId: id,
        });
      const skuIdList = purchaseItems.tradeConfirmItems.map((e) => e.tradeItems.map((x) => x.skuId)).flat();
      const value = [
        {
          userGiftCardId: id,
          usePrice: Math.min(purchaseItems.totalPrice, result?.userGiftCardInfoVO?.balance),
          balance: result?.userGiftCardInfoVO?.balance,
          skuIdList: skuIdList,
          deduction: 0,
        },
      ];
      Taro.setStorageSync('confirm:split:info', {
        checkedGiftCards: value,
        goodsInfos: [],
      });
      actions.action.commonChange([
        { paths: 'main.giftCard2', value: giftCart.giftCard },
        { paths: 'main.giftCardType', value: result.userGiftCardInfoVO.giftCardType },
        { paths: 'main.cashCardName', value: result.userGiftCardInfoVO.name },
        { paths: 'main.loaded', value: true },
      ]);
    },
    async initConfirm(address: any) {
      if (!address) return
      try {
        // TODO 缓存中获取订单确认参数 区分立即购买和购物车结算
        const cacheParams = Taro.getStorageSync(cache.ORDER_CONFIRM_PARAMS)
        if (cacheParams) {
          const { type, ...restPatams } = cacheParams;
          let params={}
          switch (type) {
            case 'confirm': {
              params = {
                ...restPatams,
                areaId: address.areaId,
                dangaossAddrId: address.dangaossAddrId,
                platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
              }
              await api.tradeBaseController.confirm(params);
              break;
            }
            case 'immediateBuy': {
              params = {
                ...restPatams,
                consigneeId: address.deliveryAddressId,
                platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
                dangaossAddrId: address.dangaossAddrId,
              }
              await api.tradeBaseController.immediateBuy2(params);
              break;
            }
            case 'cashCardBuy': {
              params = {
                ...restPatams,
                areaId: address.areaId,
                dangaossAddrId: address.dangaossAddrId,
                platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
              }
              await cashCardBuy(params);
              break;
            }
            case 'pickupCardBuy': {
              params = {
                ...restPatams,
                areaId: address.areaId,
                dangaossAddrId: address.dangaossAddrId,
                platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
              }
              await pickupCardBuy(params);
              break;
            }
            default:
              throw new Error('操作失败');
          }
        }
      } catch (error) {

        actions.action._confirmMaskInit(error);
        // Taro.showModal({
        //   title: '提示',
        //   content: error.message,
        //   showCancel: false,
        //   success:(res)=>{
        //     if(res.confirm){
        //       Taro.setStorageSync(cache.MINI_CHOOSE_ADDRESS, true);
        //       Taro.navigateTo({url:'/pages/package-A/customer/receive-address/index?mode=1&localKey=confirmAddress'})
        //     }
        //   }
        // })
      }
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({ type: Command.clean });
    },

    /**
     * 为整数添加两位小数
     * 四舍五入
     */
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
    },

    /**
     * 设置了优惠券，重新计算可以使用的最大积分
     * @param maxpoint
     * @param couponTotalPrice
     * @private
     */
    _resetMaxPoint(maxpoint, couponTotalPrice) {
      //计算优惠券抵扣了多少积分
      let couponTotalPricePoint = Math.floor(_.mul(couponTotalPrice, Const.pointRatio));

      //用可用的最大积分减去优惠券抵用的积分
      if (_.sub(maxpoint, couponTotalPricePoint) <= 0) {
        return 0;
      }
      return _.sub(maxpoint, couponTotalPricePoint);
    },

    //通过积分算对应的金额
    _pointToMoney(point) {
      return _.div(point, Const.pointRatio);
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderOrderConfirmMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderConfirmMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
