import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  shareModalVisible: boolean;
  inviteeId: string;
  form: {
    pageNum: number;
    pageSize: number;
  };
  //分销员基本信息
  baseInfo?: any;
  //分销员信息
  customerInfo: any;
  //分销设置
  settingInfo: any;
  goodsList: IMainHotGoodsListSet;
  //商品评价是否打开
  isShow: boolean;
  totalPages: 0;
  goodsInfo: {};
  //分享赚弹窗
  goodsShareVisible: false;
  addSelfShop: true;
  goodsShareModalVisible: boolean;
  isOpenWechat: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

export type IShareModalProps = {};
export type IShareModalState = {};

export type IMainHotGoodsListSet = IMainHotGoodsList[];

export interface IMainHotGoodsList {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
