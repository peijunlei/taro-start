import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  stores: [],
  coupons: [],
  cityId:null,
  orderList: {
    //地址相关数据
    address: {},
    //发票数据
    invoiceData: {},
    //订单备注
    buyRemark: {},
    //附件图片
    enclosures: {},
    //订货人手机号
    dangaoPhone:{},
    dangaoDate:{},
    dangaoTime:{},
    dangaoGreeting:{},
    dangaoShop:{},
    dangaoDeliverWay:{},
    //快递规则描述
    dangaoDeliveryText:{},
    dangaoDistributionRuleId:{},
    dangaoDeliveryAmount:{},
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
  },
  localData: {
    deliverType: 0,
    confirmCoupon: {
      unreachedIds: [],
      couponTotalPrice: 0,
      checkGoodsInfos: {},
      checkCoupon: {},
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
  },
  useStatus: {
    selectCoupon: {},
  },
  grouponFreeDelivery: false,
  openGroupon: false,
  flashFreeDelivery: false,
  payWay: [{id: 1, name: '线下支付'}],
  visible: false,

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
