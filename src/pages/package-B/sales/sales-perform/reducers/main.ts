import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingList:true,
  isOpenLayer: false,

  isRuleShow: false,

  dayOrMonthFlag: false, //选择日或者月销售业绩 false:日 true：月

  choiceTabFlag: 1, //日销售业绩下tab选择 1:最近7天 2：最近30天,

  monthData: [], //自然月下拉数据

  monthStr: '自然月',

  dayForm: {
    dateCycleEnum: 0, //0:最近7天，1:最近30天，2：自然月份
  },

  monthForm: {}, //月查询条件

  distributionId: '',

  data: {
    // dataList: [],
    // totalSaleAmount:0
  }, //展示的数据
  performanceDesc: '', //分销业绩规则说明

  length: 1,
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
