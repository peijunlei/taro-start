import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '../../../../../../../redux/immer-util';
import {WMkit} from 'wmkit';
const INITIAL_STATE: IMainReducer = {
  isReady: false,
  form: {
    pageNum: 0,
    pageSize: 10,
  },
  totalPages: 1,
  isLoadingList: true,
  baseInfo: {},
  //分销员信息
  customerInfo: {},
  //分销设置
  settingInfo: {},

  goodsList: [],
  isShow: true,

  //小店名称
  shopName: '',
  headImg: '',
  //商品列表查询参数
  request: {
    //关键字
    keywords: '',
    customerId: null,
    //批量品牌id
    brandIds: [],
    //分页
    pageNum: 0,
    pageSize: 10,
  },
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
  //商品品牌分类
  goodsBrands: [],
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
