import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingFlag: true,
  userInfo: {}, //用户信息
  gradeList: [], //等级列表
  hotExchange: [], //积分兑换
  nextGradeInfo: {}, //下一个等级
  isLastOne: false, //是否是最后一个
  notGetGradeList: [], //当前后面所有的等级。不与上面数据合并
  nowPossessGradeInfo: {}, //当前的等级信息
  pointsAvailable: 0, //积分 值
  pointsIsOpen: true, //积分是否打开
  //商品评价相关信息是否展示
  isShow: true,

  form: {
    keywords: '',
    brandIds: [],
    sortFlag: 0,
    esGoodsInfoDTOList: [],
    stockFlag: 1,
    pageNum: 0,
    pageSize: 20,
  },
  buyList: [], //会员最爱买列表
  flag: false, //积分规则开关
  pointsRule: '', //积分规则
  total: 0,
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
