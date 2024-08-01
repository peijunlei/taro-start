import produce from 'immer';
import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingList: true,
  customer: {},
  goodsFollow: 0, //收藏商品
  storeFollow: 0, //关注店铺
  growthValueIsOpen: false, //是否打开成长值
  pointsIsOpen: false, //积分是否打开
  evaluateIsOpen: false, //评价是否打开
  accountBalanceTotal: 0, //总余额
  unUseCount: 0, //未使用总张数
  signFlag: false, //今日是否签到标志
  isLogin: false, // 是否已登录状态
  messNum: 0,
  orderCount: {}, //个人中心订单气泡提示数量
  isServiceOpen: false, //qq客服开关
  aliUrl: '', //阿里客服
  isOpen: true,
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
