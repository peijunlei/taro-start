import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  // 拼团分类列表
  isLoadingFlag:true,
  grouponCates: [],
  list: [] ,//明细列表=
  form:{
    pageNum:0,
    pageSize:10,
  },
  totalPages: 0,
  //搜索关键字
  queryString: '',

  // 选中的拼团分类ID
  chooseCateId: '-1',
  // 关键字搜索
  keyWords: '',
  // 是否精选分类
  sticky: true,

  groupCenterList: [],

  grouponHotList: [],
  grouponAdvert: [],
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