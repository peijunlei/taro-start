import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import * as _ from 'lodash';
import {giftCard} from 'wmkit';
import {checkUserGiftCard} from 'api/GiftCardController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    changeTab(tab) {
      action.commonChange('main.tab', tab);
    },
    checkCard(cardId) {
      let {checkedCardIds} = getData().main;
      checkedCardIds = [...checkedCardIds, cardId];
      action.commonChange('main.checkedCardIds', checkedCardIds);
      action.calcPrice(checkedCardIds);
    },
    // 取消选择卡片
    uncheckCard(cardId) {
      let {checkedCardIds} = getData().main;
      checkedCardIds = checkedCardIds.filter((i) => i !== cardId);
      action.commonChange('main.checkedCardIds', checkedCardIds);
      action.calcPrice(checkedCardIds);
    },
    calcPrice(checkedCardIds) {
      let {validList, goodsInfos} = getData().main;
      const checkedCards = [];
      validList.forEach((valid) => {
        if (checkedCardIds.includes(valid.userGiftCardId)) checkedCards.push(valid);
      });
      goodsInfos.forEach((item) => (item.splitPrice = item.pointSplitPrice));
      validList.forEach((valid) => (valid.deduction = 0));
      giftCard.calcSplitInfo(checkedCards, goodsInfos);
      console.log('validList: ', validList);
      action.commonChange('main.validList', [...validList]);
    },
    // 查看本单可用商品
    showGoods(card) {
      const storeGoods = action._sortStoreGoods(card);
      action.commonChange([
        {paths: 'main.modalFlag', value: true},
        {paths: 'main.modalStoreGoods', value: storeGoods},
      ]);
    },
    /**
     * @description: 这里对可用商品进行排序，要求主商品在换购等之上
     * @param {*} card
     * @return {*}
     */
    _sortStoreGoods(card) {
      let storeGoods = card.storeGoods;
      storeGoods.forEach((item) => {
        if (item.goodsInfos && Array.isArray(item.goodsInfos)) {
          item.goodsInfos.sort((goodsItem) => (goodsItem.isPreferential ? 1 : -1));
        }
      });

      return storeGoods;
    },
    // 确定使用礼品卡
    async onOk() {
      let {validList, checkedCardIds, modalFlag} = getData().main;
      if (modalFlag) {
        action.commonChange('main.modalFlag', false);
        return;
      }
      const checkedCards = [];
      validList.forEach((card) => {
        if (checkedCardIds.includes(card.userGiftCardId)) {
          checkedCards.push({
            userGiftCardId: card.userGiftCardId,
            usePrice: card.deduction,
            balance: card.balance,
            skuIdList: card.skuIdList,
          });
        }
      });
      if (checkedCards.length > 0) {
        try {
          await checkUserGiftCard({checkVOList: checkedCards}, ['K-080041']);
        } catch (e) {
          if (e?.code === 'K-080041') {
            action.commonChange('main.tipModal', true);
            return;
          }
        }
      }
      const info = Taro.getStorageSync('confirm:split:info');
      info.checkedGiftCards = checkedCards;
      Taro.setStorageSync('confirm:split:info', info);
      Taro.navigateBack();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('USEGIFTCARDMain'),
  };
}
