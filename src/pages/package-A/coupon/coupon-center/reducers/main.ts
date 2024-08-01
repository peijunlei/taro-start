import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoading:true,
  isLoadingList:true,
  //优惠券类型 0通用券 1优惠券 2运费券
  couponType: null,
  //选中分类id
  couponCateId: '8',
  //分类列表
  couponCateList: [],
  //选中分类的下标
  activedKey: 0,
  //优惠券分类弹窗的显示隐藏
  showCateMask: false,
  //优惠券类型弹窗的显示隐藏
  showDrapMenu: false,
  // 是否初始化解析参数完毕
  initialEnd: false,
  //优惠券列表  后面用scrollView代替
  couponInfo: {},
  couponList: [],
  request: {pageNum: 0, pageSize: 10, couponCateId: null, couponType: null},
  total: 0,
  isLogin: false,
  isExplainFlag: false, //领券规则开关
  couponDesc: '', //领券规则
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
      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;
      //
      case Command.queryResult:
        immerUtil.assign(draftState, payload);
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
