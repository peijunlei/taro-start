import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  //退货商品
  skus: [],
  // 订单营销活动信息
  tradeMarketings: [],
  // 退货赠品
  gifts: [],
  //退货退款第二步 保存的赠品信息
  giftSecond: [],
  // 该订单原来的商品
  originTradeItems: [],
  // 已经完成的退单
  returnOrderList: [],
  // 订单编号
  tid: '',
  //退货退款金额
  totalPrice: 0,
  //订单使用积分
  tradePoints: 0,
  // 是否为退货，true：退货  false：退款
  isReturn: false,
  // 退货原因
  returnReasonList: [],
  // 退货方式
  returnWayList: [],
  // 选中的退货原因
  selectedReturnReason: '',
  // 选中的退货方式
  selectedReturnWay: '',
  // 退货说明
  description: '',
  // 退单附件
  images: [],
  //提交退货结果
  returnsResult: {
    // 退单号
    id: '',
    // 退款金额
    returnPrice: {
      totalPrice: 0,
    },
  },
  newPrice: 0,
  newPoints: 0,
  allReturnGifts: {},
  //退赠品标识，1必须退
  giftFlag: 0,
  bigImageShow: false,
  crossBorderFlag: false,
  flowState: '',
  payState: '',
  isLoading: false,
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
