import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingList:true,
  delayLoading: false,
  //商品列表数据
  goods: [],
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
    //筛选框显示隐藏
    screenIsShow: false,
  },
  //商品列表查询参数
  request: {
    storeId: '',
    //关键字
    keywords: '',
    //分类id
    cateId: null,
    //供应商类型
    companyType: '',
    //批量品牌id
    brandIds: [],
    //批量分类id
    cateIds: [],
    //多个 属性与对应的属性值id
    propDetails: [],
    //排序
    sortFlag: 0,
    //未登录时,前端采购单缓存信息
    esGoodsInfoDTOList: [],
    hideSelectedDistributionGoods: false,
    //分页
    pageNum: 0,
    pageSize: 10,
    //storecate
    storeCateIds: [],
    labelIds: [],
    // 是否反查分类
    cateAggFlag: true,
  },
  total: 0,
  //0:sku列表,1:spu列表
  goodsShowType: 0,
  //0:小图,1:大图
  imageShowType: 0,
  //批发规格显示隐藏
  batchSpecIsShow: false,
  //零售规格显示隐藏
  retailSpecIsShow: false,
  //商品分类
  goodsCates: [],
  //商品品牌分类
  goodsBrands: [],
  // 属性
  goodsPropertyVOS: [],
  //商品规格
  goodsSpecs: {},
  //购物车角标
  shopCarNum: 0,

  ifStore: false,

  //是否显示分享赚、发圈素材、只看分享赚按钮
  isDistributor: false,
  //商品标签
  goodsLabels: [],

  loadStatus: 'unload',
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
