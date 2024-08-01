import Actions from './actions';
import {FollowListResponse} from 'api/GoodsFollowBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  edit: IMainEdit;

  invalidFlag: IMainInvalidFlag;

  totalCount: IMainTotalCount;

  ifEvalShow: IMainIsShow;

  request: IMainRequest;

  total: IMainTotal;

  list: FollowListResponse;

  ifModify: false;

  selectedList: any;

  ifSelectAll: false;

  reload: boolean;

  //预约活动列表
  appointmentSaleVOList: any;

  //预售活动列表
  bookingSaleVOList: any;

  iepInfo: {};
  iepSwitch: boolean;
  //商品信息
  goodsInfo: any;
  //分享赚弹窗
  goodsShareVisible: boolean;
  //是否加入店铺
  addSelfShop: boolean;
  //图文分享
  shareModalVisible: boolean;
  goodses: any;
  loadSkeleton: boolean;
  isOpenWechat: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICollectionBottomProps = {};
export type ICollectionBottomState = {};

export type ICollectionListItemProps = {};
export type ICollectionListItemState = {};

export type ICollectionListProps = {};
export type ICollectionListState = {};

export type ICollectionTopProps = {};
export type ICollectionTopState = {};

export type IMainEdit = boolean;
export type IMainInvalidFlag = boolean;
export type IMainTotalCount = number;
export type IMainIsShow = boolean;
export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}
export type IMainTotal = number;

//create by moon https://github.com/creasy2010/moon
