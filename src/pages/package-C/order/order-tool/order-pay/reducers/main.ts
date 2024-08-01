import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';
import {AtModal} from 'taro-ui';
import Taro from '@tarojs/taro';

const INITIAL_STATE: IMainReducer = {
  giftCardPrice: null,
  isReady: false,
  payInfo: [],
  mask: {
    isOpen: false,
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onClose: () => {},
    onConfirm: () => {},
  },
  //支付密码弹窗
  passwordMaskShow: false,
  payErrorTime: 0,
  //余额
  balance: {
    balancMoney: 0,
    channelCode: 0,
  },
  checkedBalance: false,
  // 组合支付的第二选择
  comPayType: '',
  password: null,
  balancePrice: null,
  tradeNo: '',
  parentTid: '',
  tradePrice: '',
  orderTimeOut: '',
  isBookingSaleGoods: false,
  tradeState: {payState: ''},
  isSubmit: false, //支付弹窗是否点击提交
  // 0全款预售，1定金预售
  bookingType: -1,
  credit: {
    alias: '授信', //授信显示别名
    usableAmount: 0, //可用额度
    enabled: 0, //启用状态 0未启用 1已启用
    id: '', //主键ID
    visible: false, //是否显示授权错误弹框
    showType: 0, //0：不可用 1：额度不足 2：未申请
    passwordMaskShow: false, //支付密码弹框
  },
  paying: false, //支付状态
  serviceShow: false, //服务弹窗
  servicePrice: 0, //服务费
  servicePriceRate: 0, //服务费率
  originPrice:0,//原始订单金额
  serviceFeeAmount: 0, //随单服务费
  ordersource:'',//订单来源
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
