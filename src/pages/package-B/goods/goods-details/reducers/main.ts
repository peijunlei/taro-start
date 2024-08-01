import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isMenuBoxFlag: false,
  menuList: [],
  currentPreBuyStatus: '', //0,预约，1，抢购
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
  //是否立即购买
  isPay: false,
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
  goodsProps: {
    characterPropertyList: [],
    goodsPropertyVOList: [],
    goodsPropertyDetailVOList: [],
    goodsPropertyDetailRelVOList: [],
    provinceVOList: [],
    countryVOList: [],
  },

  //品牌信息
  goodsBrand: {},

  // 商品详情内容
  descData: '',

  //抢购商品
  flashsaleGodos: {},

  //服务时间
  serverTime: 0,
  subscriptionFlag: false,
  buyTime: 0,
  //预约信息
  appointmentSaleVO: {},
  //预售信息
  bookingSaleVO: {},
  //规则说明
  ruleContent: [],
  isShowRule: false, //是否显示规则弹窗
  //分享赚弹窗
  goodsShareVisible: false,
  shareModalVisible: false,
  addSelfShop: true,

  isBigImgShow: false,
  bigEvalItem: {},
  currentImg: 1,

  isPointsGoods: false,
  //积分商品信息
  pointsGoods: {},
  //积分商品Id
  pointsGoodsId: '',
  //积分商品规格弹框展示
  pointsExchangeVisible: false,
  //组合商品数据
  marketingSuits: [],

  // 企业购业务信息
  iepInfo: {},
  // 企业购服务开关
  iepSwitch: false,
  // 预约弹窗显示
  isAppointFlag: false,
  //弹窗打开方式 1:商品详情底部、2:商品详情规格、3:商品列表、4:购物车
  openType: '',
  //客服开关
  isServiceOpen: false,
  serviceUrl: '',
  enterpriseId: '',

  //商品名称
  goodsName: '',

  goodsPropertyModalVisible: false,

  //商品副标题
  goodsSubtitle: '',
  //是否展示骨架屏
  isLoadSkeleton: true,
  isOpenWechat: false,
  pvUvStaticsNum: 0,
  isRun: false,
  defaultAddress:{},
  address:{},
  goodsRestrictedTemplateVO:null,
  dangaoRestrictedVO:null
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
