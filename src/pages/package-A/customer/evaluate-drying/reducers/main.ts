import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  //晒单图片
  enclosures: [],
  //店铺评价
  storeBaseInfo: {},
  //订单信息
  orderBaseInfo: {},
  //店铺评分
  storeEvaluate: {},
  //订单评分
  orderEvaluate: {},
  //店铺信息
  storeInfo: {},
  //是否显示
  isShow: 0,
  //评价类型
  evaluateType: 0,
  //店铺信息
  storeVO: {},
  //订单ID
  tid: '',
  //订单创建时间
  createTime: '',
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
