import {IAllReducerProps} from './types';

export function store2Props({EXCHANGECARDMain}: any): IAllReducerProps {
  return {
    main: EXCHANGECARDMain,
  };
}
