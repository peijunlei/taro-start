import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingFlag: true,
  //商品列表数据
  goods: [],
  //分类集合
  goodsCates: [],
  //品牌集合
  goodsBrands: [],
  //优惠券信息
  couponInfo: [],
  //nav-tools相关参数
  navToolsObj: {
    //综合箭头切换
    arrowFlag: false,
    //价格升序降序
    priceSoft: false,
    //composiName
    composiName: '综合',
    //composiId
    composiId: 0,
    //分类箭头切换
    catesFlag: false,
    //品牌箭头切换
    brandFlag: false,
  },
  //商品列表查询参数
  request: {
    //分类id集合
    cateIds: [],
    //批量品牌id
    brandIds: [],
    couponId: '',
    activity: '',
    //排序
    sortFlag: 0,
    //分页
    pageNum: 0,
    pageSize: 10,
  },
  total: 0,
  //0:小图,1:大图
  imageShowType: null,
  //marketingId
  marketingId: null,
  // 商品选择的营销
  goodsMarketing: {},
  //标题
  title: '',
  // 营销信息
  marketing: {},
  //显示骨架屏
  loadSkeleton: true,
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;

      //清空查询结果
      case Command.cleanList:
        draftState.goods = [];
        return draftState;

      //
      case Command.queryResult:
        draftState.goods = payload.list;
        draftState.total = payload.total;

        return draftState;

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
