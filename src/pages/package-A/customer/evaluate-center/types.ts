import Actions from './actions';

export interface IMainReducer {
  //导航数据
  navData: any;
  //当前的id
  isId: number;
  preId: number;
  //评价数据
  evaluateData: Array<any>;
  refresh: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type INavProps = {};
export type INavState = {};

export type ITobeEvaluteProps = {};
export type ITobeEvaluteState = {};

//create by moon https://github.com/creasy2010/moon
