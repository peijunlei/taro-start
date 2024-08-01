import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  detailState: IMainDetailState;

  invitState: IMainInvitState;

  isDistributor: false;

  detailList: IMainDetailListSet;

  picture: IMainPicture;

  totalNum: IMainTotalNum;

  miniProgramCode: IMainMiniProgramCode;

  friends: IMainFriendsSet;

  setting: IMainSetting;

  dSetting: IMainDSetting;
  shareImg: '';
  inviteeId: '';
  isOpenWechat: boolean;
  isLoadingFlag:boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IDetailProps = {};
export type IDetailState = {};

export type IFriendListProps = {};
export type IFriendListState = {};

export type IInvitHeadProps = {};
export type IInvitHeadState = {};

export type IInvitModalProps = {};
export type IInvitModalState = {
  tempFilePath: '';
  contentHeight: number;
  thinkList: [];
  contentTitle: '';
  myStoreText: '';
  storeGoodsText: '';
  buyNowText: '长按识别小程序码';
  canvasUrl: '';
  qrCode: ''; //小程序码https图片路径
  accessToken: '';
  skuId: '';
  //商品图片
  goodsInfoImg: string;
  //规格
  specText: '';
  //分享类型
  shareType: 0;
  //邀请人会员ID
  inviteeId: '';
  token: '';
  x: any;
  y: any;
  cx: any;
  cy: any;
  normalPageX: number;
  windowWidth: number;
  windowHeight: number;
  boxWidth: number;
  boxHeight: number;
  boxPageY: number; //boxY轴位置
  storeGoodsTextPageY: number;
  codeWidth: number; //小程序码图片宽度
  codeHeight: number; //小程序码图片高度
  codePageY: number; //小程序码Y轴位置
  whiteBg: any;
};

export type IMainDetailState = boolean;
export type IMainInvitState = boolean;
export type IMainIsDistributor = boolean;
export type IMainDetailListSet = IMainDetailList[];

export interface IMainDetailList {
  [k: string]: any;
}
export type IMainPicture = string;
export type IMainTotalNum = number;
export type IMainMiniProgramCode = string;
export type IMainFriendsSet = IMainFriends[];

export interface IMainFriends {
  [k: string]: any;
}
export interface IMainSetting {
  [k: string]: any;
}
export interface IMainDSetting {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
