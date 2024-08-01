import {Command} from '../constant';
import {Dispatch} from 'typings';
import * as lo from 'lodash';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import {_, giftCard} from 'wmkit';
import {Const} from 'config';

const flowState = (status, payState, payTypeId) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待付款';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status != 'VOID' && payState == 'NOT_PAID' && payTypeId == '0') {
    return '待付款';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};

const urlType = {
  0: 'order-delivery',
  1: 'order-coupon',
  2: 'order-invoice',
  3: 'order-sku-list',
  4: 'order-pay',
};

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    // 加购商品
    async addGoods(item) {
      try {
        await api.purchaseBaseController.purchase({ goodsInfoId: item.skuId, goodsNum: 1 }).then(() => {
          Taro.showToast({
            title: '加入成功',
            icon: 'none',
            duration: 2000,
          });
        });
      } catch (error) {
        Taro.showToast({
          title: error,
          icon: 'none',
          duration: 2000,
        });
      }
    },
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
    },
    /**
     * 设置
     */
    async setServerTime() {
      //获取服务时间
      try {
        const serverTime = await api.systemController.queryServerTime();
        //存储服务时间
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.serverTime',
            value: serverTime,
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
    //判断是否登录
    async _isLogin() {
      const isLogin = Taro.getStorageSync('authInfo:token') ? Boolean(Taro.getStorageSync('authInfo:token')) : false;
      await action.commonChange('main.isLogin', Boolean(isLogin));
      return isLogin;
    },
    //初始化订单详情
    async _dataReady(tid, pointsOrder, promotionOrder, usePoint) {
      let res;
      if (pointsOrder) {
        //积分订单详情
        res = await api.pointsTradeBaseController.details(tid);
      } else if (promotionOrder) {
        //推广订单详情
        res = await api.tradeBaseController.distributeDetails(tid);
      } else {
        //正常订单详情
        res = await api.tradeBaseController.details(tid);
      }
      let pointConfig = await api.systemPointsConfigController.query();
      const { tradeState, tradePrice } = res;
      dispatch({
        type: Command.init,
        payload: {
          main: {
            detail: res,
            pointsOrder: pointsOrder,
            promotionOrder: promotionOrder,
            pointConfig,
            isThirdPlatform: res.tradeItems.some((n) => n.thirdPlatformType === 0),
            isBookingSaleGoods: res.isBookingSaleGoods && res.bookingType == 1, //预售定金
            isPresale: res.isBookingSaleGoods, //是否预售
            localData: {
              confirmCoupon: {
                unreachedIds: [],
                couponTotalPrice: tradePrice.couponPrice,
                checkGoodsInfos: {},
                checkCoupon: {},
              },
            },
            coupons: res.couponCodes,
            points: {
              totalPoint: 0,
              maxPoint: 0,
              showPointInput: usePoint ? true : false,
              usePoint: usePoint || tradePrice.points || 0,
            },
            isPayBalance: tradeState.payState == 'PAID_EARNEST' && tradeState.flowState == 'AUDIT', //是否已支付尾款
            goodsTotalPrice: tradePrice.goodsPrice,
          },
        },
      });
      await this._pointInit();
    },
    // 因为在子组件中拿不到getCurrentInstance().router.param 传的参数所以需要保存一下
    async saveTid(tid) {
      await action.commonChange('main.tid', tid);
    },
    //获取最新支付尾款时间
    async _queryPayStatus(tid) {
      let res = await api.tradeBaseController.details(tid);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            detail: res,
          },
        },
      });
    },

    /**
     * 取消订单
     */
    async cancelOrder(tid) {
      Taro.showModal({
        title: '取消订单',
        content: '您确定要取消该订单?',
      }).then(async (res) => {
        if (res.confirm) {
          try {
            await api.tradeBaseController.cancel(tid);
            Taro.showToast({
              title: '取消成功',
              icon: 'none',
              duration: 2000,
            });
            // window.location.reload();
            //获取订单列表
            this._dataReady(tid);
          } catch (error) {
            //
          }
        }
      });
    },
    /**
     * 0元支付
     */
    async defaultPay(tid) {
      try {
        await api.tradeBaseController.defaultPay(tid);
        let res = await api.tradeBaseController.details(tid);
        if (res) {
          let context = [];
          context.push({
            extendMap: res.extendMap,
            tid: res.id,
            parentTid: res.parentId,
            tradeState: res.tradeState,
            paymentOrder: res.paymentOrder,
            orderTimeOut: res.orderTimeOut,
            isBookingSaleGoods: res.isBookingSaleGoods,
            bookingType: res.bookingType,
            storeName: res?.supplier?.storeName || '',
            isSelf: res?.supplier?.isSelf,
            storeType: res?.supplier?.storeType,
            crossBorderFlag: res.crossBorderFlag,
            price: res?.tradePrice?.totalPrice || 0,
            totalPrice: null,
          });
          let stringContext = encodeURIComponent(JSON.stringify(context));
          Taro.navigateTo({
            url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
          });
        } else {
          Taro.navigateTo({
            url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`,
          });
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    async applyRefund(tid) {
      let context = await api.returnOrderBaseController.tradeDetails(tid);
      let tradeDetail = context;
      let errMsg;
      let canApply = false;
      if (tradeDetail) {
        const flowState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['flowState'] : '';
        const payState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['payState'] : '';
        const deliverStatus = tradeDetail['tradeState'] ? tradeDetail['tradeState']['deliverStatus'] : '';

        // 获取该订单所有的待处理及已完成的退单列表
        let orderReturnListRes = await api.returnOrderBaseController.findByTid(tid);

        if (orderReturnListRes) {
          canApply = true;

          if (tradeDetail['isAllReturn']) {
            canApply = false;
            errMsg = '订单已没有可退商品';
          }
          // 没有待处理的申请
          if (canApply) {
            if (tradeDetail['tradeItems'] && tradeDetail['tradeItems'].filter((v) => v.canReturnNum > 0).length == 0) {
              // 退货申请，如果没有可退商品则不允许申请
              canApply = false;
              errMsg = '订单已没有可退商品';
            } else if (tradeDetail['payInfo']['payTypeId'] == '0') {
              // 在线支付需判断退款金额
              let totalApplyPrice = 0;
              (orderReturnListRes as any).forEach((v) => {
                // 计算已完成的申请单退款总额
                if (v.returnFlowState == 'COMPLETED') {
                  totalApplyPrice = _.add(
                    totalApplyPrice,
                    v.returnPrice.applyStatus ? v.returnPrice.applyPrice : v.returnPrice.totalPrice,
                  );
                }
              });
              if (
                totalApplyPrice > tradeDetail['tradePrice']['totalPrice'] &&
                tradeDetail['tradePrice']['totalPrice'] !== 0
              ) {
                canApply = false;
                errMsg = '无可退金额';
              }
            }
          }
        } else {
          errMsg = '系统异常';
        }
      }

      //  可以申请，进入申请页面，否则提示错误信息
      if (canApply) {
        Taro.navigateTo({
          url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${tid}`,
        });
      } else {
        Taro.showToast({
          title: errMsg,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    //积分相关信息
    async _pointInit() {
      Promise.all([await api.customerBaseController.findCustomerCenterInfo()])
        .then(([one]) => {
          action.commonChange([{ paths: 'main.points.totalPoint', value: one.pointsAvailable }]);
        })
        .then(async () => {
          await action._maxPointCal();
        });
    },

    //计算积分可抵扣最大
    async _maxPointCal() {
      const { detail = {}, points = {}, pointConfig, localData = {}, goodsTotalPrice } = getData().main || {};
      const { confirmCoupon = {} } = localData;
      if (JSON.stringify(detail) == '{}') return;

      let totalPrice = 0;
      if (detail.isBookingSaleGoods && detail.bookingType == 1) {
        //尾款价格
        const { tradePrice } = detail;
        totalPrice = _.sub(_.sub(goodsTotalPrice, tradePrice.swellPrice), confirmCoupon.couponTotalPrice || 0);
      }
      if (points.totalPoint <= 0) return;
      // 最大积分
      let maxPoint = 0;

      // 当前用户的总积分
      let mePoint = points.totalPoint;
      //  积分转换单位，即多少积分抵扣1元
      let pointWorth = Const.pointRatio;
      let limitPercent = _.div(pointConfig.maxDeductionRate, 100);
      //  积分使用最高限额
      let limitPrice = _.mul(totalPrice, limitPercent);
      // 如果积分价值设置了，则计算当前积分可以抵扣多少金额
      if (pointWorth != null) {
        // 当前订单值多少积分，比如订单金额为10元，10积分=1元，则buyPoint = 100积分
        let buyPoint = Math.floor(_.mul(limitPrice, Const.pointRatio));

        // 比较二方积分，以最少的为准
        if (buyPoint > mePoint) {
          maxPoint = mePoint;
        } else {
          maxPoint = buyPoint;
        }
      }
      await action.commonChange('main.points.maxPoint', maxPoint);
    },

    //取得优惠券信息
    async _getLoacl() {
      const confirmCoupon = (await Taro.getStorageSync('mini::confirmCoupon')) || {};
      const checkCoupon = (await Taro.getStorageSync('mini::checkCoupon')) || {};
      const {
        main: {
          detail,
          goodsTotalPrice,
          points: { usePoint },
        },
      } = getData();
      if (JSON.stringify(detail) == '{}') return;
      const { tradePrice } = detail;

      //如果优惠券价格大于尾款价格，则直接失败尾款价格显示优惠价格，尾款显示0
      if (confirmCoupon.couponTotalPrice != 0) {
        //计算尾款价格
        let price = _.sub(goodsTotalPrice, tradePrice.swellPrice);
        if (price < 0) {
          price = 0;
        }
        if (confirmCoupon.couponTotalPrice > price) {
          //优惠价格设置为尾款
          confirmCoupon.couponTotalPrice = price;
        }

        let finalPrice = _.sub(_.sub(price, confirmCoupon.couponTotalPrice), await this._pointToMoney(usePoint));
        if (confirmCoupon.couponTotalPrice == price || finalPrice < 0) {
          await action.commonChange([
            { paths: 'main.points.showPointInput', value: false },
            { paths: 'main.points.usePoint', value: 0 },
          ]);
        }
      }
      await action.commonChange([
        { paths: 'main.localData.confirmCoupon', value: confirmCoupon },
        { paths: 'main.localData.checkCoupon', value: checkCoupon },
      ]);
    },

    //跳转页面
    async _urlChange(type, param = '') {
      await action._savaLocal();
      await Taro.navigateTo({ url: `/pages/package-C/order/order-tool/${urlType[type]}/index?param=${param}` });
    },

    //选择优惠券后默认关闭积分使用开关
    async _savaLocal() {
      //优惠券缓存处理
      await action._couponLocal();
    },

    //优惠券缓存处理
    async _couponLocal() {
      const {
        main: {
          coupons,
          useStatus: { selectCoupon },
          detail,
          localData: { confirmCoupon },
        },
      } = getData();
      const storeId = detail.supplier.storeId;
      //查询优惠券的字段
      await Taro.setStorageSync('mini::orderCoupon', { coupons, selectCoupon, storeId });
      //选中的优惠券
      await Taro.setStorageSync('mini::checkCoupon', confirmCoupon.checkCoupon);
      await Taro.setStorageSync('mini::checkCouponStore', confirmCoupon.checkCouponStore);

      //优惠券折扣
      await Taro.setStorageSync('mini::confirmCoupon', confirmCoupon);
    },

    /**
     * 清空缓存
     */
    async _cleanLoacl() {
      await Taro.removeStorageSync('mini::orderCoupon');
      //选中的优惠券
      await Taro.removeStorageSync('mini::checkCoupon');
      await Taro.removeStorageSync('mini::checkCouponStore');

      //优惠券折扣
      await Taro.removeStorageSync('mini::confirmCoupon');
    },

    //支付尾款
    async payBalance(tid) {
      const {
        main: {
          detail,
          localData,
          points: { usePoint },
        },
      } = getData();
      const { consignee, supplier, tailNoticeMobile, isBookingSaleGoods } = detail;
      const { confirmCoupon } = localData;
      const { checkCouponStore, checkCoupon } = confirmCoupon as any;

      console.log('localData--------->', localData);
      Taro.showLoading();

      const params = {
        baseStoreId: supplier.supplierId,
        commonCodeId:
          checkCouponStore && checkCouponStore.storeId === -1 && checkCouponStore.couponCodeId
            ? checkCouponStore.couponCodeId
            : null, //平台优惠券id
        consigneeAddress: consignee.detailAddress,
        consigneeId: consignee.id,
        forceCommit: 0,
        isBookingSaleGoods: true,
        orderSource: Taro.getEnv() === 'WEAPP' ? 'LITTLEPROGRAM' : 'WECHAT', // 需要校验营销活动,
        points: usePoint,
        shopName: supplier.storeName,
        storeCommitInfoList: [
          {
            storeId: supplier.storeId,
            payType: 0,
            invoiceType: -1,
            generalInvoice: {},
            specialInvoice: {},
            specialInvoiceAddress: false,
            invoiceAddressId: '',
            invoiceAddressDetail: '',
            invoiceAddressUpdateTime: null,
            invoiceProjectId: null,
            invoiceProjectName: '',
            invoiceProjectUpdateTime: null,
            buyerRemark: '',
            encloses: '',
            deliverWay: 1,
            couponCodeId:
              checkCoupon && supplier.storeId === checkCoupon.storeId && checkCoupon.couponCodeId
                ? checkCoupon.couponCodeId
                : null, //店铺优惠券id
          },
        ],
        tailNoticeMobile,
        tid,
        tradeMarketingList: [],
      };
      const checkedGiftCards = Taro.getStorageSync('confirm:split:info')?.checkedGiftCards || [];
      checkedGiftCards?.forEach((card) => (card.usePrice = card.deduction));
      params.giftCardTradeCommitVOList = checkedGiftCards;
      try {
        if (isBookingSaleGoods) {
          const res = (await api.tradeBaseController.commitTail(params as any)) as any;

          if (res && res[0].price == 0) {
            //0元支付
            this.defaultPay(tid);
            return;
          }
        }
        Taro.removeStorageSync('confirm:split:info');
        Taro.redirectTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`});
      } catch (err) {
        Taro.hideLoading();
        if (err.code == 'K-080157') {
          action.commonChange('main.maskInfo', {
            isOpen: true,
            title: '',
            content: err.message,
          })
          return
        }
        Taro.showToast({
          title: err.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },
    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },
    //通过积分算对应的金额
    _pointToMoney(point) {
      return _.div(point, Const.pointRatio);
    },
    //获取限售的商品
    async getRestrictedGoodsList() {
      const {
        detail
      } = getData().main;
      const goodsIdList = detail.tradeItems.map(item => item.spuId)
      const consignee = detail.consignee
      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: consignee.id
      })
      const list = res.goodsRestrictedTemplateVOList
      const newItems = detail.tradeItems.map(item => {
        const temp = list.find(i => i.goodsId === item.spuId)
        if (temp) {
          return {
            ...item,
            restrictedFlag: temp.restrictedFlag
          }
        } else {
          return item
        }
      })
      // console.log('newStores', newStores)
      action.commonChange('main.detail',{...detail, tradeItems: newItems})
      // action.commonChange('main.goodsRestrictedTemplateVOList', list)
    },

    // 计算礼品卡均摊信息
    calcSplitInfo() {
      const {
        pointConfig,
        points: {usePoint},
        detail,
        price,
        giftCardType,
        storeBagsFlag,
      } = getData().main;
      if (storeBagsFlag) return;
      const confirmCoupon = Taro.getStorageSync('mini::confirmCoupon');
      let checkGoodsInfos = confirmCoupon?.checkGoodsInfos || [];
      let checkPreferentialSku = confirmCoupon?.checkPreferentialSku || [];
      if (JSON.stringify(checkGoodsInfos) === '{}') checkGoodsInfos = [];
      if (JSON.stringify(checkPreferentialSku) === '{}') checkPreferentialSku = [];

      // 1.构建初始信息
      const goodsInfos = [];
      detail.tradeItems?.forEach((item) => {
        goodsInfos.push({
          storeInfo: {
            storeId: item.storeId,
          },
          skuId: item.skuId,
          skuName: item.skuName,
          specDetails: item.specDetails,
          price: item.price,
          num: item.num,
          pic: item.pic,
          splitPrice: item.splitPrice,
          earnestPrice: item.earnestPrice,
          marketingIds: item.marketingIds,
          isPreferential: false,
        });
      });
      const checkedGiftCards = Taro.getStorageSync('confirm:split:info')?.checkedGiftCards || [];
      // 2.读取券信息
      goodsInfos.forEach((goodsInfo) => {
        if (goodsInfo.isPreferential) {
          const marketingId = goodsInfo?.marketingIds?.[0];
          const couponSku = checkPreferentialSku.find(
            (i) => i.goodsInfoId === goodsInfo.skuId && marketingId === i.preferentialMarketingId,
          );
          if (couponSku) goodsInfo.splitPrice = couponSku.splitPrice;
        } else {
          const couponSku = checkGoodsInfos.find((i) => i.goodsInfoId === goodsInfo.skuId);
          if (couponSku) goodsInfo.splitPrice = couponSku.splitPrice;
        }
      });

      // 3.计算积分信息
      let pointDeduction = _.div(usePoint, pointConfig.pointsWorth || 100);
      if (pointDeduction > 0) {
        const total = goodsInfos.reduce((a, b) => _.add(a, b.splitPrice), 0);
        goodsInfos.forEach((sku, idx) => {
          if (idx === goodsInfos.length - 1) {
            sku.splitPrice = _.sub(sku.splitPrice, pointDeduction);
          } else {
            const split = lo.ceil(_.mul(pointDeduction, _.div(sku.splitPrice, total)), 2);
            sku.splitPrice = _.sub(sku.splitPrice, split);
            pointDeduction = _.sub(pointDeduction, split);
          }
        });
      }

      // 4.计算礼品卡信息
      goodsInfos.forEach((item) => (item.pointSplitPrice = item.splitPrice));
      giftCard.calcSplitInfo(checkedGiftCards, goodsInfos);
      const cardUsed = checkedGiftCards.reduce((a, b) => _.add(a, b.deduction), 0);
      action.commonChange('main.giftCardPrice', cardUsed);

      // 5.存储数据
      Taro.setStorageSync('confirm:split:info', {goodsInfos, checkedGiftCards});
      console.log('1111: ', goodsInfos, checkedGiftCards);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('OrderDetailMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
