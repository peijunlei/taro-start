import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  repayInfo: IMainRepayInfo;

  payItems: any;

  mask: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onCancel: Function;
    onConfirm: Function;
  };
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IRepayTopProps = {};
export type IRepayTopState = {};

export type IReapyListProps = {};
export type IReapyListState = {};

export type IMaskProps = {};
export type IMaskState = {};

export interface IMainRepayInfo {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
