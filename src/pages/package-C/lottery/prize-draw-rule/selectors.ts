import {IAllReducerProps} from './types';

export function store2Props({packageAPrizeRuleMain}: any): IAllReducerProps {
  return {
    main: packageAPrizeRuleMain,
  };
}
