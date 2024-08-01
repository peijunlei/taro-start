import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps, LoadingStatus } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { TabStatus, InvalidStatus, queryList } from 'api/GiftCardController';
import { getCurrentInstance } from '@tarojs/taro';

const numMap = {
  [TabStatus.USABLE]: 'useNum',
  [TabStatus.UN_USABLE]: 'invalidNum',
  [TabStatus.TO_ACTIVE]: 'notActive'
};

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async init() {
      const { isCommLogin } = getCurrentInstance().router.params || {}
      const { status, giftCardType, } = getData().main
      const info = await queryList({
        pageNum: 0,
        status,
        giftCardTabType: giftCardType,
        isCommLogin: isCommLogin ? 1 : null
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            isCommLogin: isCommLogin ? 1 : null,
            pageNum: 0, // 如果小程序中，切换后台，在进入参数会有问题，所以这边得初始化
            giftCardList: info.giftCardList,
            notActive: info.notActive,
            useNum: info.useNum,
            invalidNum: info.invalidNum,
            cardBalance: info.cardBalance,
            loadingStatus: info.noMore ? LoadingStatus.LOADED_NO_MORE : LoadingStatus.LOADED
          },
        },
      });
    },
    // 查询下一页信息
    async nextPage() {
      let { pageNum, status, giftCardList, loadingStatus, invalidStatus, giftCardType, isCommLogin } = getData().main;
      if (loadingStatus !== LoadingStatus.LOADED) return;
      action.commonChange('main.loadingStatus', LoadingStatus.LOADING);
      const info = await queryList({ pageNum: ++pageNum, status, invalidStatus, giftCardTabType: giftCardType, isCommLogin });
      const list = [...giftCardList, ...info.giftCardList];
      action.commonChange([
        { paths: 'main.pageNum', value: pageNum },
        { paths: 'main.giftCardList', value: list },
        { paths: 'main.loadingStatus', value: info.noMore ? LoadingStatus.LOADED_NO_MORE : LoadingStatus.LOADED },
      ]);
    },
    // 切换tab
    async changeTab(status: TabStatus, invalidStatus: InvalidStatus = InvalidStatus.ALL) {
      const { giftCardType, isCommLogin } = getData().main || {};
      action.commonChange([
        { paths: 'main.status', value: status },
        { paths: 'main.invalidStatus', value: invalidStatus },
        { paths: 'main.giftCardList', value: [] },
        { paths: 'main.loadingStatus', value: LoadingStatus.LOADING }
      ]);
      const info = await queryList({
        pageNum: 0, status, invalidStatus, giftCardTabType: giftCardType,
        isCommLogin
      });
      action.commonChange([
        { paths: 'main.pageNum', value: 0 },
        { paths: 'main.giftCardList', value: info.giftCardList },
        // {paths: `main.${numMap[status]}`, value: info[numMap[status]]},
        { paths: 'main.notActive', value: info.notActive },
        { paths: 'main.useNum', value: info.useNum },
        { paths: 'main.invalidNum', value: info.invalidNum },
        { paths: 'main.cardBalance', value: info.cardBalance },
        { paths: 'main.loadingStatus', value: info.noMore ? LoadingStatus.LOADED_NO_MORE : LoadingStatus.LOADED },
      ]);
    },
    // 切换子tab
    async changeSubTab(invalidStatus: InvalidStatus) {
      const { status } = getData().main;
      await action.changeTab(status, invalidStatus);
    },
    // 刷新列表
    async refresh() {
      const { status, invalidStatus } = getData().main;
      await action.changeTab(status, invalidStatus);
    },

    /**
     * 监听 - 切换卡类型Tab - 操作
     * @param type
     */
    onGiftCardTypeTabChange(type) {
      action.commonChange('main.giftCardType', type);
      action.refresh();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('MYGIFTCARDMain'),
  };
}
