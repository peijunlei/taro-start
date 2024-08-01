import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  userInfo: {}, //用户信息
  gradeList: [], //等级列表
  hotExchange: [], //积分兑换
  nextGradeInfo: {}, //下一个等级
  isLastOne: false, //是否是最后一个
  notGetGradeList: [], //当前后面所有的等级。不与上面数据合并
  nowPossessGradeInfo: {}, //当前的等级信息
  pointsAvailable: 0, //积分 值
  pointsIsOpen: false, //积分是否打开

  cateList: [], //积分商品分类
  canExchange: false, //我能兑换
  pointsCouponListFlag: false, // 积分优惠券列表展示
  list: [],
  listCou: [],
  cateId: null, //选中的积分商品分类
  sortType: {
    //排序选项
    type: '',
    sort: '',
  },
  latestPointsCouponInfoList: [], // 兑换优惠券后查询到的最新信息
  visible: false, //支付密码弹框展示
  payPwd: '', //支付密码
  payErrorTime: 0,

  couponVisible: false, //优惠券兑换弹框
  pointsCoupon: {},
  couponInfo: {},
  pointsCouponId: '', // 即将兑换的积分优惠券id
  flag: false, //积分规则开关
  pointsRule: '', //积分规则
  integralVisible: true, //积分商城是否打开
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
