import {Command} from '../constant';
import {IMainReducer} from '../type';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE = {
  isReady: false,
  initLng: 116.41667, // 初始化地图经度 北京市中心经度
  initLat: 39.91667, // 初始化地图纬度 北京市中心纬度
  searchAddressList: [], //搜索地址列表
  nearAddressList: [], //附近地址列表
  isShowMap: true, //是否展示地图
  searchShow: false, // 搜索列表展示
  searchWord: '', //搜索文字展示
  cityName: '北京市', //缓存城市
};

export default function main(state = INITIAL_STATE, action: Action) {
  const {type, payload} = action;

  return produce(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});
    }
  });
}

//create by moon https://github.com/creasy2010/moon
