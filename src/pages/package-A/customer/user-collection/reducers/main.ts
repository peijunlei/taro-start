import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  edit: false,

  invalidFlag: false,

  totalCount: 0,

  ifEvalShow: false,

  request: {q: '', pageNum: 0, pageSize: 10},

  total: 0,

  list: [],

  ifModify: false,

  selectedList: [],

  ifSelectAll: false,

  reload: false,

  //预约活动列表
  appointmentSaleVOList: [],

  //预售活动列表
  bookingSaleVOList: [],

  // 企业购业务信息
  iepInfo: {},
  // 企业购服务开关
  iepSwitch: false,
  // 显示骨架屏
  loadSkeleton: true,
  //商品信息
  goodsInfo: {},
  //分享赚弹窗
  goodsShareVisible: false,
  //是否加入店铺
  addSelfShop: false,
  //图文分享
  shareModalVisible: false,
  goodses: [],
  isOpenWechat: false,
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;

      //清空查询结果
      case Command.cleanList:
        draftState.list = [];
        return draftState;

      //
      case Command.queryResult:
        draftState.list = payload.list;
        draftState.total = payload.total;

        return draftState;

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
