import {Command} from '../constant';
import _ from 'lodash';
import {IActorReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IActorReducer = {
  isReady: false,
};

export default function actor(state = INITIAL_STATE, action: Action): IActorReducer {
  const {type, payload} = action;

  return produce<IActorReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'actor'});

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.actor) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.actor[propKey];
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
