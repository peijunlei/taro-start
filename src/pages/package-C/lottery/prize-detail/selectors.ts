import {IAllReducerProps} from './types';

export function store2Props({packageAPrizeDetailMain}: any): IAllReducerProps {
  return {
    main: packageAPrizeDetailMain,
  };
}
