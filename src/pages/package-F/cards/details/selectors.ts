import { createSelector } from 'reselect';

export function store2Props({ CardsDetails }: any): any {
  return {
    main: CardsDetails,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
