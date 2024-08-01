import {IAllReducerProps} from './types';

export function store2Props({packageAPrizeListMain}: any): IAllReducerProps {
  return {
    main: packageAPrizeListMain,
  };
}
