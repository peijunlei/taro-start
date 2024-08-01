import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  form:{
    pageNum:number;
    pageSize:number;
  };
  totalPages:number;
  funds: [] ;
  //即将过期积分数据
  willExpirePointsData: {
    customerId: string;
    pointsExpireStatus: number;
    pointsExpireDate: string;
    willExpirePoints: number;
  };
  pointsValue: number;
  pointsRule: string;
  flag:boolean;
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
