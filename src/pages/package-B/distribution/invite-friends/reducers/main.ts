import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  // 邀请朋友-详情弹层初始化状态
  detailState: false,
  // 邀请好友弹层初始化状态
  invitState: false,
  // 是否分销员
  isDistributor: false,
  //详细说明富文本内容
  detailList: [],
  picture: '',
  totalNum: 0,
  miniProgramCode: '', // 小程序码
  friends: [], // 已邀请好友
  setting: {},
  dSetting: {},
  shareImg: '',
  inviteeId: '',
  isOpenWechat: false,
  isLoadingFlag: true,
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
