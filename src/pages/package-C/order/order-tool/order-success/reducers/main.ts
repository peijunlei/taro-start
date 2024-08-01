import {Command} from './../constant';
import _ from 'lodash';
import {IMainReducer} from './../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  payOrders: [],
  tid: '',
  relationGoodsIdList: [],
  // 支付类型：0线上支付、1线下支付
  payType: -1,
  // 付款类型：0已收款、1未收款、2待确认
  _payOrderStatus: -1,
  paymentOrder: '',
  auditState: '',
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      // 通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});
      // 初始化
      case Command.init:
        for (const propKey in payload.main) {
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;
      // 重置
      case Command.clean:
        for (const propKey in INITIAL_STATE) {
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}
