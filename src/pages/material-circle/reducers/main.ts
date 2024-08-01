import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  reload: false,
  matterType: 0,
  imageModal: false,

  imageList: [],

  chooseImageIndex: 0,

  shareVisible: false,

  goodsShareVisible: false,

  shareModalVisible: false,

  visibleMap: {0: false},

  currentMatterList: [],

  moments: false,

  currentMatterId: "' '",

  checkedSku: {},

  addSelfShop: true,

  momentSuccess: false,

  customer: {},

  noticeNum: 0,

  preferentialNum: 0,

  //按钮类型0:保存，1：朋友圈，2：好友,共用的页面 3图片分享
  buttonType: 0,
  //点击保存图片时存储的素材id
  chooseMatterId: '',

  //分页
  pageNum: 0,

  isLoading: false,

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
