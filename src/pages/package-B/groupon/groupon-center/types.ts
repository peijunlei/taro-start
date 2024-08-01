import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag:boolean;
  // 拼团分类列表
  grouponCates: [any];
  form:{
    pageNum:number;
    pageSize:number;
  };
  totalPages:number;
  list: [] ;
  //搜索关键字
  queryString: string;

  // 选中的拼团分类ID
  chooseCateId: string;
  // 关键字搜索
  keyWords: string;
  // 是否精选分类
  sticky: boolean;
  groupCenterList: [any];
  grouponHotList: [any];
  grouponAdvert: [any];
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

//create by moon https://github.com/creasy2010/moon
