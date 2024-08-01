import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isLoading: false, //是否加载中
  defaltAddress: '', //默认地址
  userGiftCardId: '', //礼品卡id
  type: '1', //礼品卡前端自定义类型 '0' 仅预览 '1'可使用
  cardStatus: '0',
  // 礼品卡样式配置
  useConfig: {
    // 页面标题
    title: '',
    // banner图
    bannerImage: '',
    // 页面大背景图
    pageImage: '',
    // 页面大背景色
    pageColor: '',
    // 分组样式 0横向 1竖向
    groupStyle: 0,
    // 横向分组样式 选中未选中颜色
    noSelectedColor: '',
    selectedColor: '',
    // 竖向分组样式 前景色 背景色 背景图
    foregroundColor: '',
    backgroundColor: '',
    backgroundImage: '',
  },
  // 礼品卡使用
  giftCard: {
    // 礼品卡类型 0福点卡 1全选提货卡 2任选提货卡
    giftCardType: 0,
    // 福点卡商品类型
    scopeType: 0,
    // 是否分组
    openGroupType: 0,
    // 是否可以跨组选择 0可跨所有组 1可跨具体数量组
    crossGroupType: 0,
    // 可跨具体数量组数量
    crossGroupNum: 0,
    // 任选分组 可选数量
    cardRuleTypes: [],
    scopeGoodsNum: 0,
    // 福点卡限制使用次数
    cardRuleNum: 0,
    // 福点卡已经使用次数
    cardUseNum: 0,
    // 福点卡余额
    balance: 0,
  },
  // 商品列表
  // groupName 分组名称
  // checkType 0可全选 1可任选
  // checkNum 可任选件数
  // cardLimit 每卡限额
  // residueQuota 剩余限额
  // stock 剩余库存
  // goodsStatus 0正常 1缺货 2失效
  goodsList: [],
  selectGoodsList: [],
  selectedNum: 0,
  selectedPrice: 0,
  selectGroupList: [],
  tradeItems: [],
  totalPrice: 0,
  totalBuyPoint: 0,
  // 商品清单弹框
  selectedGoodsModal: false,
  // 福点卡分页
  pageNum: 0,
  pageSize: 100,
  total: 0,
  searchValue: '',
  goodsRestrictedTemplateVO:null,
  dangaoRestrictedVO:null,
  images:[]
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
