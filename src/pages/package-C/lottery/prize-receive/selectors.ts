import {IAllReducerProps} from './types';

export function store2Props({packageAPrizeReceiveMain}: any): IAllReducerProps {
  return {
    main: packageAPrizeReceiveMain,
  };
}
