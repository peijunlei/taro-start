import {IAllReducerProps} from './types';

export function store2Props({GiftCardLoginMain}: any): IAllReducerProps {
  return {
    main: GiftCardLoginMain,
  };
}
