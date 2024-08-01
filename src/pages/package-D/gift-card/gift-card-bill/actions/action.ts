import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import {fetchMock} from 'wmkit';
import {getUserGiftCardBillInfo} from 'api/GiftCardController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async fetchGiftCardBillInfo(isRest?) {
      try {
        action.commonChange('main.isReady', true);
        if (isRest) {
          // 初始化
          await action.commonChange('main.billList', []);
          await action.commonChange('main.pageNum', 0);
          await action.commonChange('main.total', 0);
          await action.commonChange('main.totalPages', 0);
        }
        const {id, pageNum, pageSize, billList,giftCardId} = getData().main
        const params = {
          userGiftCardId: id ,
          giftCardId,
          pageNum,
          pageSize
        }

        const {giftCardBillVOPage} = (await getUserGiftCardBillInfo(params)) as any;
        dispatch({
          type: Command.init,
          payload: {
            main: {
              id,
              isReady: false,
              totalPages: giftCardBillVOPage.totalPages,
              billList: billList.concat(giftCardBillVOPage.content),
              total: giftCardBillVOPage.total,
              pageSize: giftCardBillVOPage.size,
              pageNum: giftCardBillVOPage.number,
            },
          },
        });
      } catch (error) {
        action.commonChange('main.isReady', false);
        Taro.showToast({title: error});
      }
    },
       /**
     * 查询下一页
     */
       async nextPage() {
        let {pageNum, totalPages} = getData().main;
        let num = pageNum + 1;
        if (num == totalPages) return;
        action.commonChange('main.pageNum', num);
        await this.fetchGiftCardBillInfo();
      },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GIFTCARDBILLMain'),
  };
}
