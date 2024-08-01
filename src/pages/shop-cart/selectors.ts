import {IAllReducerProps} from './types';
export function store2Props({packageCShopCartMain}: any): IAllReducerProps {
  return {
    main: packageCShopCartMain,
  };
}
