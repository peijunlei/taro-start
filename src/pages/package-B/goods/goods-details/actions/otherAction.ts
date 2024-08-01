import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {getActionProxy} from '@/redux/action-util';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {getShopCartNum, WMkit} from 'wmkit';
import main from '@/pages/common/coupon/reducers/main';
import actions from '@/pages/common/coupon/actions';
import indexActions from './index';

import purchaseBaseController from 'api/PurchaseBaseController';
import { cache } from 'config';
export default (dispatch: Dispatch) => {
  let action = {
    // IndexAction: getActionProxy<typeof IndexAction>(IndexAction)(dispatch),
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     *  立即购买
     * @param buyGoodsInfos
     */
    async _didConfirm(buyGoodsInfos, appointmentSaleId) {
      let {
        appointmentSaleVO,
        bookingSaleVO,
        currentPreBuyStatus,
        openType,
        skuId,
        pointsGoodsId,
        goodsDetail,
        address
      } = getData().main;
      if(!address.deliveryAddressId){
        Taro.showToast({  
          title: '请完善收货地址后再提交订单',
          icon: 'none',
          duration: 2000,
        });
        return 
      }
      if(address.needComplete){
        Taro.showToast({  
          title: '请完善收货地址后再提交订单',
          icon: 'none',
          duration: 2000,
        });
        return 
      }
      //如果是立即预约  currentPreBuyStatus 0立即预约，1立即抢购
      if (currentPreBuyStatus == '0' && openType == '5') {
        let result = await this.rushToPreBuyGoodsInfo(
          appointmentSaleId ? appointmentSaleId : appointmentSaleVO.id,
          appointmentSaleVO.appointmentSaleGood.goodsInfoId,
        );
        if (result !== undefined) {
          let {goodsType} = goodsDetail?.goods || {};
          !WMkit.isVirtualGoods(goodsType) && (await this._addCart(buyGoodsInfos));
          action.commonChange('main.isAppointFlag', true);
        }
      } else {
        try {
          let skuList = [];
          //预约
          if (appointmentSaleVO && appointmentSaleVO.id) {
            buyGoodsInfos.forEach((item) => {
              skuList.push({
                skuId: item.goodsInfoId,
                num: item.buyCount,
                appointmentSaleId: appointmentSaleVO.id,
                isAppointmentSaleGoods: true,
              });
            });
          } else if (bookingSaleVO && bookingSaleVO.id) {
            //判断当前活动是否正进行中
            //预售起止时间内 0:全款 1:定金
            let isBetween = false;
            const {bookingType, bookingStartTime, bookingEndTime, handSelStartTime, handSelEndTime} = bookingSaleVO;
            if (bookingType == 0) {
              isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
            }

            //定金支付起止时间内
            if (bookingType == 1) {
              isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
            }
            if (isBetween) {
              //预售
              buyGoodsInfos.forEach((item) => {
                skuList.push({
                  skuId: item.goodsInfoId,
                  num: item.buyCount,
                  isBookingSaleGoods: true,
                  bookingSaleId: bookingSaleVO.id,
                });
              });
            } else {
              buyGoodsInfos.forEach((item) => {
                skuList.push({
                  skuId: item.goodsInfoId,
                  num: item.buyCount,
                });
              });
            }
          } else {
            buyGoodsInfos.forEach((item) => {
              skuList.push({
                skuId: item.goodsInfoId,
                num: item.buyCount,
              });
            });
          }
          await Promise.all([
            //立即购买校验前置
            api.tradeBaseController.checkGoods({
              tradeItems: skuList,
              tradeMarketingList: [],
              forceConfirm: false,
            }),
          ]);
          const params = {
            consigneeId: address.deliveryAddressId,
            tradeItemRequests: skuList.map(v=>({...v,spuId:goodsDetail.goods.goodsId})),
            platformAddrIds:address.provinceId?[address.provinceId,address.cityId,address.areaId,address.streetId]:null,
            dangaossAddrId:address.dangaossAddrId,
          }
          const res = await api.tradeBaseController.immediateBuy2(params);

          if (res?.code !== 'K-000000') {
            await action.commonChange('main.isLoading', false);
            return;
          }
          Taro.setStorageSync(cache.ORDER_CONFIRM_PARAMS,{...params,type:'immediateBuy'})
          await Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index?type=1'});
        } catch (e) {
          if(e.code == 'K-080157'){
            Taro.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000,
            });
            return
          }
          if (e.code == 'K-180001') {
            Taro.showToast({
              title: '您没有预约购买资格',
              icon: 'none',
              duration: 2000,
            });
            return;
          }
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
          //返回错误信息，页面数据重新init
          await indexActions(dispatch).actions.init(skuId, pointsGoodsId);
        }
      }
    },

    /**
     * 立刻抢购
     */
    async rushToBuyingFlashSaleGoodsInfo(flashSaleGoodsId, num) {
      const {address} = getData().main;
      if (WMkit.isLogin()) {
        try {
          const params = {
            consigneeId:address.deliveryAddressId,
            flashSaleGoodsId: flashSaleGoodsId,
            flashSaleGoodsNum: num,
            platformAddrIds:address.provinceId?[address.provinceId,address.cityId,address.areaId,address.streetId]:null,
            dangaossAddrId:address.dangaossAddrId,
          }

          await api.flashSaleController.rushToBuyFlashSaleGoods(params);
          Taro.setStorageSync(cache.ORDER_CONFIRM_PARAMS,{...params,type:'immediateBuy'})
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-buy-in/index?flashSaleGoodsId=${flashSaleGoodsId}&flashSaleGoodsNum=${num}`,
          });
        } catch (e) {
          if(e.code == 'K-080157'){
            Taro.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000,
            });
            return
          }
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        //显示登录弹框
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
    },
    /**预约商品立即抢购 */
    async rushToAppointmentSaleGoods(appointmentSaleId, num, skuId) {
      if (WMkit.isLogin()) {
        try {
          await api.AppointmentSaleBaseController.rushToAppointmentSaleGoods({
            appointmentSaleId,
            num,
            skuId,
          });
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-prebuy-in/index?appointmentSaleId=${appointmentSaleId}&num=${num}&skuId=${skuId}`,
          });
        } catch (error) {}
      } else {
        //显示登录弹框
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
    },
    async isSubscriptionFlag(skuId) {
      let ruleContent = await api.AppointmentSaleBaseController.isSubscriptionFlag(skuId);
      action.commonChange('main.subscriptionFlag', ruleContent);
    },
    /**
     * 立即预约
     */
    async rushToPreBuyGoodsInfo(appointmentSaleId, skuId) {
      let result;
      if (WMkit.isLogin()) {
        try {
          result = await api.AppointmentSaleBaseController.rushToAppointmentGoods({
            appointmentSaleId,
            skuId,
          });
          this.isSubscriptionFlag(skuId);
        } catch (error) {}
      } else {
        //显示登录弹框
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
      return result;
    },
    // 查看评价大图
    findBigImg(item, index) {
      action.commonChange([
        {paths: 'main.currentImg', value: index},
        {paths: 'main.bigEvalItem', value: item},
        {paths: 'main.isBigImgShow', value: true},
      ]);
    },

    /**
     * 商品评价点赞
     * @param goodsEvaluateId
     */
    async addCustomerGoodsEvaluatePraise(goodsEvaluateId) {
      if (WMkit.isLogin()) {
        await api.customerGoodsEvaluatePraiseController.add({
          goodsEvaluateId: goodsEvaluateId,
        });
        Taro.showToast({
          title: '点赞成功!',
          icon: 'none',
          duration: 2000,
        });
        //获取评价详情
        const res = await api.goodsEvaluateController.getCustomerGoodsEvaluate({
          evaluateId: goodsEvaluateId,
        });
        const {evaluateId, isPraise, goodNum} = res;
        action.commonChange([
          {paths: 'main.goodsEvaluate', value: res},
          {paths: 'main.bigEvalItem', value: res},
          {paths: 'main.zanGoodsEvaluateList', value: {evaluateId, isPraise, goodNum}},
        ]);
      } else {
        Taro.showToast({
          title: '请先登录!',
          icon: 'none',
          duration: 2000,
        });
      }
    },
    async _addCart(buyGoodsInfos) {
      //如果已经登录
      await purchaseBaseController.batchAdd({goodsInfos: buyGoodsInfos});
      let num = await getShopCartNum();
      await action.commonChange('main.shopCarNum', num);
    },

    //发圈素材
    async getDistributor(goodsInfo) {
      const result = await WMkit.getDistributorStatus();
      if (result.distributionEnable) {
        Taro.navigateTo({
          url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${goodsInfo.goodsInfoId}`,
        });
      } else {
        let reason = result.forbiddenReason;
        //店铺关闭或者分销员禁用时弹窗
        // msg.emit('bStoreCloseVisible', {
        //   visible: true,
        //   reason: reason
        // });
      }
    },

    // 获取 - 购物车商品数量
    _getShopCartNum(num) {
      this.commonChange('main.shopCarNum', num);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsDetailsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
