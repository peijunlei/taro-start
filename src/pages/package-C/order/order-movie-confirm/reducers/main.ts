import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isThirdPlatform: false,
  stores: [],
  coupons: [],
  customer: {},
  orderList: {
    //地址相关数据
    address: {},
    //发票数据
    invoiceData: {},
    //订单备注
    buyRemark: {},
    //附件图片
    enclosures: {},
    isVirtualGoods: false,
  },
  mask: {
    isOpen: false,
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  },
  localData: {
    deliverType: 0,
    confirmCoupon: {
      unreachedIds: [],
      couponTotalPrice: 0,
      checkGoodsInfos: {},
      checkCoupon: {},
      checkCouponStore: {},
    },
  },
  points: {
    showPointInput: false,
    //用户拥有的总积分
    totalPoint: 0,
    //最多可使用的积分
    maxPoint: 0,
    //用戶使用的积分
    usePoint: 0,
    pointConfig: {},
  },
  price: {
    totalPrice: 0,
    goodsTotalPrice: 0,
    pointTotalPrice: 0,
    totalDeliveryPrice: 0,
    couponTotalPrice: 0,
    discountsTotalPrice: 0,
    totalBuyPoint: 0,
    totalCommission: 0,
  },
  useStatus: {
    selectCoupon: {},
  },
  grouponFreeDelivery: false,
  openGroupon: false,
  purchaseBuy: false,
  payWay: [{id: 0, name: '在线支付'}],
  stock: 0, //库存
  storeBagsFlag: false,
  isPresale: false, //是否预售
  isBookingSaleGoods: false, //是否定金预售
  isCommit: false, //是否可以支付定金
  tailNoticeMobile: '', //支付定金尾款手机号
  //赠品相关
  gifts: {
    //赠品弹窗开关
    isMaskOpen: false,
    //赠品列表
    fullGiftLevelList: {},
    selectedMarketingGifts: [],
  },
  shopName: '',
  inviteeName: '',
  initGiftMarketLevelId: '',
  canUseCouponsLength: 0,
  //提交订单loading
  isLoading: false,
  // 线下支付开关状态 0 关闭 1开启
  offlineStatus: null,
  tradeno: '',
  //是否过期
  isExpired: true,
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
