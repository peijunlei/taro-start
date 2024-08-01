import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: IMainListSet;

  goodsId: string;

  goodsEvaluate: any;

  isBigImgShow: boolean;

  bigEvalItem: any;
  currentImg: number;

  iepInfo: {};
  iepSwitch: boolean;

  currentEvalKey: string;

  loading: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IEvalListProps = {};
export type IEvalListState = {
  reload: boolean;
  openFlag: any[];
  arr: any[];
  screenHeight: number;
};

export type IBigPictureProps = {};
export type IBigPictureState = {
  show: boolean;
};

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}
export type IMainTotal = number;
export type IMainListSet = IMainList[];

export interface IMainList {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
