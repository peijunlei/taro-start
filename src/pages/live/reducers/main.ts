import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingFlag:true,
  visibleMap: {0: false},

  roomInfo: [],

  liveGoodsList: [],

  //当前轮播图
  currentSwiperIndex: 0,

  //当前直播tab下标
  currentLiveTabIndex: -1,

  //当前发现tab页
  currentTab: 0,

  //当前直播列表id
  currentLiveId: 0,

  //分页
  pageNum: 0,

  //轮播图列表
  carouselList: [],

  //回放列表
  liveRoomReplayVOList: [],

  //直播列表是否可滚动
  isScroll: false,

  //logo图片列表
  logoList: [],

  isLoading: false,

  //是否开启
  isOpen: false,

  //是否轮播
  autoPlay: true,
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
