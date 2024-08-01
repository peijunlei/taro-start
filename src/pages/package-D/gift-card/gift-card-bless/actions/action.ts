import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import {msg} from 'wmkit';
import {getUserGiftCardDetail, activateGiftCard, TabStatus} from 'api/GiftCardController';
import api from 'api';

let globalTimer;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async fetchGiftCardDetailInfo(id,userGiftCardId) {
      try {
        action.commonChange('main.isReady', true);
        const {giftCardBlessingConfigVO} = (await api.giftCardController.getGiftCardBlessing(id)) as any;
        Taro.setNavigationBarTitle({title: giftCardBlessingConfigVO.title});
        dispatch({
          type: Command.init,
          payload: {
            main: {
              isReady: false,
              id,
              userGiftCardId,
              cardBlessingForm: giftCardBlessingConfigVO,
            },
          },
        });
      } catch (error) {
        action.commonChange('main.isReady', false);
        Taro.showToast({title: error});
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
      const {giftCardType, giftCardId, userGiftCardId, cardStatus, isReady} = getData().main;
      if (isReady) return;

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
        url: `/pages/package-D/gift-card-use/index?userGiftCardId=${userGiftCardId}`,
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
    main: getReducerData('GiftCardBlessMain'),
  };
}
