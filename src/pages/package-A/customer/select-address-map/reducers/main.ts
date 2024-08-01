import {Command} from '../constant';
import {IMainReducer} from '../type';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isShowMap:true,
  searchShow:false,
  nearAddress:[],
  selectNearAddress:[],
  initLng: 0, // 初始化地图经度 上海
  initLat: 0, // 初始化地图纬度 
  cityName: '', //缓存城市
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});
    }
  });
}

//create by moon https://github.com/creasy2010/moon
