import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  // 是否正在请求
  isLoading: false,
  isReady: false,
  //是否为分销员购物车
  isFromC: false,
  isSecondShopCart: false,
  //接口元数据
  purInfo: {},
  restrictedList: [],
  //打包一口价
  purInfos: {
    appointmentSaleVOList: [],
    bookingSaleVOList: [],
  },
  customerInfo: {},
  //store信息是否加载完
  isStoreInit: false,
  coupon: {
    goodsInfoIds: [],
  },
  goods: {
    chooseMarketingSkuId: '',
    selectedMarketingGifts: [],
    checkselectedMarketingGift: [],
    marketing: [],
    setMessage: [],
    checkStore: [],
    checkSku: [],
    storeMarketing: [],
    goodsMarketing: [],
    giftGoodsInfos: [],
    skuMarketingDict: [],
  },

  useStatus: {
    isMaskOpen: false,
    maskType: 0,
    confirmMask: {
      isOpen: false,
      type: 4,
      message: '',
    },
    isEmpty: false, //购物车是否为空
    isEdit: false, //是否是编辑状态
    isLogin: false, //是否已登录
  },
  packageMaskData: {
    isPackageMaskOpen: false,
    packageList: [],
  },
  messNum: 0,
  defaltAddress: '', //默认地址
  addressList: [],
  retailSpecIsShow: false,
  //商品详情
  goodsDetail: {},
  //单挑sku信息
  goodsInfo: {},
  // 企业购业务信息
  iepInfo: {},
  sku: {}, //商品选中的sku
  goodsInfoId: {},
  appointmentSaleVOList: [],
  //勾选商品后结算按钮可点击，同时也会请求相关营销数据，然后为相关营销变量赋值
  //此变量的作用是防止在勾选商品后，结算按钮可用，营销数据的请求还没有响应的情况下，点击结算确认订单，生成的快照中没有营销数据
  getPriceInfoFlag: true,
  // 店铺分组-营销分组
  storeMarketingGroup: {},
  activedItem: '',
  pageIndex: 0,
  //分页信息，一个Map对象，以店铺为纬度，形如 1 => { size: 6, index: 2, area: [ 0, 1, 2 ] },表示第一页，显示索引为0，1，2三个店铺
  pageArea: new Map(),
  relationGoodsIdList: [],
  pickerShow: false,
  currentAddress: null,
  canClick: true,
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
