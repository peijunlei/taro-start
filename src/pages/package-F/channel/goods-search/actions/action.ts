import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import PresetSearchTermsQueryController from 'api/PresetSearchTermsQueryController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //查询联想词
    async getSearchList(keywords) {
      action.commonChange('main.keywords', keywords);
      if (getData()?.main?.key == 'goods') {
        const result = (await api.searchAssociationalWordQueryController.likeAssociationalWord({
          associationalWord: keywords,
        })) as any;
        // 更新热门查询时不需要更新searchBar，否则会置空searchBar
        action.commonChange([
          {
            paths: 'main.associationalWordList',
            value: result.associationLongTailLikeWordList,
          },
          {
            paths: 'main.needSearchBarUpdate',
            value: false,
          },
        ]);
      }
    },
    //设置预置词
    async setPrewords() {
      const result = await PresetSearchTermsQueryController.listPresetSearchTerms();
      action.commonChange(
        'main.preKeywords',
        result.presetSearchTermsVO.length > 0 && result.presetSearchTermsVO[0].presetSearchKeyword,
      );
    },
  };
  return action;
};

export function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageFGoodsSearchMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
