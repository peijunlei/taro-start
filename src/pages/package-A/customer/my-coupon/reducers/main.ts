import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoading: true,
  isLoadingList:true,
  delayLoading:false,
  //我的优惠券未使用总数
  unUseCount: 0,
  //我的优惠券已使用总数
  usedCount: 0,
  //我的优惠券已过期总数

  overDueCount: 0,
  //使用状态,0(未使用)，1(使用)，2(已过期)
  useStatus: 0,
  //优惠券类型 null全部类型 0通用券 1 mall ? 优惠券:店铺券 2运费券

  couponType: null,
  // 下拉菜单的显示隐藏
  showDrapMenu: false,
  couponList: [],
  request: {pageNum: 0, couponType: null, pageSize: 10, useStatus: 0},
  total: 0,
  isExplainFlag: false, //领券规则开关
  couponDesc: '', //领券规则
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

      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;
      //
      case Command.queryResult:
        immerUtil.assign(draftState, payload);
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
