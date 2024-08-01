import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  // 是否正在请求
  isLoading: false,
  isReady: false,
  isLoadingList: true,
  orders: [],
  key: '',
  form: {
    //订单流程状态
    flowState: '',
    //订单付款状态
    payState: '',
    // 邀请人ID
    inviteeId: '',
    // 分销渠道
    channelType: '',
    pageNum: 0,
    pageSize: 10,
    keywords: '',
  },
  total: 0,
  serverTime: '',
  orderButtons: {
    available: [],
    id: '',
  },
  // 小B店铺名字
  inviteeShopName: '',
  showCateMask: false,
  orderListType: 0,
  keywords: '',
  visible: false,
  tid: '',
  needSearchBarUpdate: true,
  ztCode: undefined,
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

      //修改订单进入关键词数据
      case Command.setForms:
        draftState.form = payload.form;
        return draftState;

      case Command.setServerTime:
        draftState.serverTime = payload.serverTime;
    }
  });
}

//create by moon https://github.com/creasy2010/moon