import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  id: '',
  activityName: '',
  startTime: '',
  endTime: '',
  drawTimesType: 0,
  leftDrawCount: 0,
  pointsAvailable:0,
  prizeList: [],
  checkId: 0,
  prizeId: '',
  modalShow: false,
  startWheelLoading: false,
  click: false,
  prizeInfo: null,
  tipsNotWin: '谢谢参与', //未中奖提示
  maxAwardTip: '没有抽奖次数！', //抽奖次数上限提示
  activityId: 0,
  activityContent: '',
  pauseFlag: 1,
  formType: 0,
  wheelPrizes: [],
  wheelButtons: [],
  consumePoints: 0,
  drawType: 0,
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
