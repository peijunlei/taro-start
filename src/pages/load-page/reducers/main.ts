import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  distribute: {
    //分销设置信息
    distributeSetting: {},
    //邀请人信息
    inviteInfo: {},
  },
  isLoadingFlag: true,
  refresh: false,
  // 显示在会员中心的数据
  customerInfo: {},
  // 分销员信息
  distributor: {},
  // 分销设置信息
  distributeSetting: {},
  // 会员余额
  customerBalance: {},
  // 分销员昨天销售业绩
  yesterdayPerformance: {},
  // 分销员本月销售业绩
  monthPerformance: {},
  // 邀请人信息
  inviteInfo: {},
  // 我的客户 - 邀新人数
  inviteCustomer: {},
  // 热销前十分销商品
  hotGoodsList: [],
  // 分享赚选中的sku
  checkedSku: {},
  // 分销等级详细说明弹层初始化状态
  detailState: false,
  // 分享弹出显示与否
  shareVisible: false,
  forbiddenShow: false,
  // 消息数量
  noticeNum: 0,
  preferentialNum: 0,
  isRuleShow: false,
  performanceDesc: '',

  //分享赚相关
  goodsInfo: {},
  //分享赚弹窗
  goodsShareVisible: false,
  shareModalVisible: false,
  addSelfShop: true,
  isOpenWechat: false,
  isrefresh: true,
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
