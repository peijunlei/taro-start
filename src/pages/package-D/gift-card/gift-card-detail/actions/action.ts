/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:18:48
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-15 11:15:28
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/actions/action.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import {msg, handleUrl} from 'wmkit';
import {
  getUserGiftCardDetail,
  activateGiftCard,
  TabStatus,
  getUserGiftCardDetailUnLogin,
  getGiftCard,
} from 'api/GiftCardController';
import { ifLogin } from '@/utils/common-functions';

let globalTimer;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async fetchGiftCardDetailInfo(id, type, preview) {
      try {
        action.commonChange('main.isReady', true);
        // 从兑换入口跳转详情页时 或者从卡券登录页登录时type='1'  扫码入口直接进入卡券详情页时type='0';
        let userGiftCardInfoVO: any = {};
        const res = (type === '1' ? await getUserGiftCardDetail(id) : await getGiftCard(id)) as any;
        userGiftCardInfoVO = res.userGiftCardInfoVO || res.giftCardVO;
        console.log('userGiftCardInfoVO', userGiftCardInfoVO);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              isReady: false,
              id,
              type,
              preview,
              name: userGiftCardInfoVO.name,
              parValue: userGiftCardInfoVO.parValue,
              backgroundDetail: userGiftCardInfoVO.backgroundDetail,
              backgroundType: userGiftCardInfoVO.backgroundType,
              balance: userGiftCardInfoVO.balance,
              activationTime: userGiftCardInfoVO.activationTime,
              expirationTime: userGiftCardInfoVO.expirationTime,
              expirationType: userGiftCardInfoVO.expirationType,
              expirationStartTime: userGiftCardInfoVO.expirationStartTime,
              expirationEndTime: userGiftCardInfoVO.expirationEndTime,
              giftCardNo: userGiftCardInfoVO.giftCardNo || 'xxxxxxxxxxxxxxxxxxx',
              rangeMonth: userGiftCardInfoVO.rangeMonth,
              scopeType: userGiftCardInfoVO.scopeType,
              cardStatus: userGiftCardInfoVO.cardStatus,
              invalidStatus: type === '1' ? userGiftCardInfoVO.invalidStatus : null,
              contactPhone: userGiftCardInfoVO.contactPhone,
              contactType: userGiftCardInfoVO.contactType,
              userGiftCardId: userGiftCardInfoVO.userGiftCardId,
              useDesc: userGiftCardInfoVO.useDesc,
              giftCardId: userGiftCardInfoVO.giftCardId,
              giftCardType: userGiftCardInfoVO.giftCardType,
              totalGoodsNum: userGiftCardInfoVO?.totalGoodsNum ?? 0,
              foregroundColor: userGiftCardInfoVO?.foregroundColor,
              enterpriseId: userGiftCardInfoVO?.enterpriseId,
              useType: userGiftCardInfoVO?.useType,
              mofangConfig: userGiftCardInfoVO?.mofangConfig,
            },
          },
        });
      } catch (error) {
        action.commonChange('main.isReady', false);
        Taro.showToast({ title: error });
      }
    },
    // 激活卡
    async activateGiftCard() {
      let { giftCardNo, id, type ,preview} = getData().main;
      try {
        const ignoreCode = ['K-080028', 'K-080029'];
        const res = (await activateGiftCard(giftCardNo, ignoreCode)) as any;
        console.log('activateGiftCard', res);
        if (res.code === 'K-000000') {
          action.commonChange('main.isOpen', false);
          Taro.showToast({ title: '激活成功' });
          action.fetchGiftCardDetailInfo(id, type);
        } 
      } catch (error) {
        action.commonChange('main.isOpen', false);
        Taro.showToast({ title: error.message,icon:'none' });
      }
    },

    cleanTimer() {
      if (globalTimer) {
        clearTimeout(globalTimer);
      }
    },

    /**
     * 跳转至”适用商品“列表页面 - 操作
     * @returns
     */
    onGoGiftCardListPromotionClick() {
      const {giftCardType, giftCardId, userGiftCardId, cardStatus, isReady,mofangConfig, type,useType} = getData().main;
      if (isReady) return;
      if(useType === 1&&mofangConfig){
        handleUrl(JSON.parse(mofangConfig),true)
        return
      }
      /** 开启loading */
      action.commonChange('main.isReady', true);

      const params = {
        giftCardType,
        giftCardId,
        userGiftCardId,
        cardStatus,
      };

      let params_str = '';
      Object.entries(params).forEach(([key, value], index, arr) => {
        if (index === 0) {
          params_str += '?';
        }

        params_str += `${key}=${value}`;

        if (index < arr.length - 1) {
          params_str += '&';
        }
      });

      Taro.navigateTo({
        url: `/pages/package-D/gift-card-use/index?userGiftCardId=${
          userGiftCardId || giftCardId
          }&type=${type}&cardStatus=${cardStatus}`,
        complete() {
          setTimeout(() => {
            /** 关闭loading */
            action.commonChange('main.isReady', false);
          }, 360);
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GIFTCARDDETAILMain'),
  };
}
