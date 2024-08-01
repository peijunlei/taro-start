import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingList: true,
  shareModalVisible: false,
  form: {
    pageNum: 0,
    pageSize: 10,
  },
  inviteeId: '',
  baseInfo: {},
  //分销员信息
  customerInfo: {},
  //分销设置
  settingInfo: {},

  goodsList: [],
  isShow: true,
  totalPages: 0,
  //分享赚相关
  goodsInfo: {},
  //分享赚弹窗
  goodsShareVisible: false,
  addSelfShop: true,
  goodsShareModalVisible: false,
  isOpenWechat: false,
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
