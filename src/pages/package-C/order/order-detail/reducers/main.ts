import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isThirdPlatform: false,
  isLoadingFlag: true,
  tid: '',
  detail: {}, //订单详情
  orderButtons: {
    available: [],
    id: '',
  },
  pointsOrder: false, //是否从积分商城兑换列表详情进入
  promotionOrder: false, //推广订单详情
  pointConfig: {}, //积分使用设置
  isPresale: true, //是否预售
  isBookingSaleGoods: false, //是否定金预售
  localData: {
    confirmCoupon: {
      unreachedIds: [],
      couponTotalPrice: 0,
      checkGoodsInfos: {},
      checkCoupon: {},
    },
  },
  coupons: [],
  points: {
    showPointInput: false,
    //用户拥有的总积分
    totalPoint: 0,
    //最多可使用的积分
    maxPoint: 0,
    //用戶使用的积分
    usePoint: 0,
  },
  useStatus: {
    selectCoupon: {},
  },
  isPayBalance: false,
  goodsTotalPrice: 0, //商品总价
  param: {},
  serverTime: '', //服务器时间
  thirdPlatformOrderId: '',
  thirdPlatformType: null,
  maskInfo:null,

  giftCardType: null,
  pickUpCardName: null,
  giftCardNum: 0,
  giftCardPrice: 0,
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
