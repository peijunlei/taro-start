import {Command} from '../constant';
import {IMainReducer, LoadingStatus} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';
import {TabStatus, InvalidStatus} from "api/GiftCardController";

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  loadingStatus: LoadingStatus.LOADING,
  status: TabStatus.USABLE,
  invalidStatus: InvalidStatus.ALL,
  useNum: 0,
  invalidNum: 0,
  notActive: 0,
  cardBalance: 0,
  giftCardList: [],
  pageNum: 0,
  giftCardType: null,
  isCommLogin:null
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
