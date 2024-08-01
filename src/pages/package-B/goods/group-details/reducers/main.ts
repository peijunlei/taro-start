import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  //商品详情
  goodsDetail: {},
  //单挑sku信息
  goodsInfo: {},
  //店铺信息
  storeInfo: {},
  //是否收藏
  collect: false,
  //轮播图
  slideImages: [],
  //skuid
  skuId: '',
  //批发规格显示隐藏
  batchSpecIsShow: false,
  //零售规格显示隐藏
  retailSpecIsShow: false,
  //领券弹框
  isCouponShow: false,
  //促销弹框
  isPromotionShow: false,

  gift: [],

  fullGiftLevelList: [],

  //评价相关信息是否展示
  isShow: false,

  //top3评价信息
  top3Evaluate: {},

  //购物车角标数
  shopCarNum: 0,

  //分类拥有的所有属性信息
  goodsProps: [],

  //品牌信息
  goodsBrand: {},

  // 商品详情内容
  descData: '',

  //直接参团列表
  grouponInsts: [],

  //服务时间
  serverTime: 0,

  //拼团活动信息
  grouponActivity: {},

  //是否显示拼团弹窗
  isWaitGroup: false,

  //等待成团弹窗列表
  waitGroupList: [],

  //开团按钮
  grouponDetailOptStatus: 0,

  //组合商品数据
  marketingSuits: {},

  grouponDetails: {},

  spuContext: {},

  shareModalVisible: false,
  addSelfShop: true,

  isServiceOpen: false,
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
