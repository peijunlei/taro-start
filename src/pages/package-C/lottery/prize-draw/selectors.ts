import {IAllReducerProps} from './types';

export function store2Props({packageAPrizeDrawMain}: any): IAllReducerProps {
  return {
    main: packageAPrizeDrawMain,
  };
}
