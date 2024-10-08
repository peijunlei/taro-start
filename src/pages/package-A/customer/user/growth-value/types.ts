import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  form:{
    pageNum:number;
    pageSize:number;
  };
  funds?: [] ;
  flag:boolean;

  isLastOne?:boolean,
  levelInfo?:{
    nowHaveGrowthValue?:number;
    needGrowthValue?:number;
    nextGrowthValue?:number;
    atPresentLevelName?:string;
    nextLevelName?:string;
  },
  basicRules?:string;
  isLoadingFlag: boolean;
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
