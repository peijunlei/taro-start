import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  passwordMaskShow: false,
  isLoadingFlag: true,
  isShowCheckPayPwRes: false,
  myStore: {
    pointsTradeConfirmItem: {
      supplier: {},
      tradeItem: {},
    },
    totalPoints: 0,
  },
  orderList: {
    //地址相关数据
    address: {},
    //订单备注
    buyRemark: {},
    // 订单类型
    isVirtualGoods: false,
  },
  mask: {
    isOpen: false,
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onClose: () => {},
    onConfirm: () => {},
  },
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}

//create by moon https://github.com/creasy2010/moon