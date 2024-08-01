import {IAllReducerProps} from './types';

export function store2Props({GiftCardBlessMain}: any): IAllReducerProps {
  return {
    main: GiftCardBlessMain,
  };
}
