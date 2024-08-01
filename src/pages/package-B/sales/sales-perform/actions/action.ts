import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import { getReducerData } from '@/redux/store';
import Taro from '@tarojs/taro';
import api from 'api';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async changeDayOrMonthFlag(flag) {
      const {
        main: {distributionId},
      } = getData();
      action.commonChange([
        {paths: 'main.dayOrMonthFlag', value: flag},
        {paths: 'main.isShowTagList', value: false},
        {paths: 'main.isLoadingList', value: true},
      ]);
      if (!flag) {
        //日维度统计
        this.changeChoiceTab('1', {});
        return;
      }
      //月销售额
      const res = await api.distributionPerformanceController.queryByLast6Months({distributionId: distributionId});
      action.commonChange([
        {paths: 'main.data', value: res},
        {paths: 'main.length', value: res.dataList.length},
        {paths: 'main.isLoadingList', value: false},
      ]);
    },
    /**
     * 改变日销售业绩展示方式
     */
    async changeChoiceTab(choiceTabFlag, dayForm) {
      const {
        main: {distributionId},
      } = getData();
      action.commonChange({paths: 'main.choiceTabFlag', value: choiceTabFlag},
        {paths: 'main.isLoadingList', value: true});
      dayForm.distributionId = distributionId as any;
      dayForm.dateCycleEnum = (choiceTabFlag - 1) as any;
      if (choiceTabFlag == 1 || choiceTabFlag == 2) {
        action.commonChange([{paths: 'main.monthStr', value: '自然月'}]);
      }
      const res = await api.distributionPerformanceController.queryByDay(dayForm);
      action.commonChange([
        {paths: 'main.data', value: res},
        {paths: 'main.length', value: res.dataList.length},
        {paths: 'main.choiceTabFlag', value: choiceTabFlag},
        {paths: 'main.isLoadingList', value: false}
      ]);
    },
    /**
     * 改变选择的自然月
     * @param monthStr
     */
    changeMonth(value) {
      const {
        main: {monthData},
      } = getData();

      const currMonth = monthData[value].value;
      action.commonChange([{paths: 'main.monthStr', value: currMonth}]);
      let dayForm = {};
      dayForm.year = monthData[value].year;
      dayForm.month = monthData[value].month;
      this.changeChoiceTab('3', dayForm);
    },
    //规则弹窗的显隐
    async changeRuleShow() {
      const {
        main: {isRuleShow},
      } = getData();
      action.commonChange('main.isRuleShow', !isRuleShow);
      const res = await api.distributionSettingController.findOne();
      action.commonChange('main.performanceDesc', res.distributionSettingSimVO.performanceDesc);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageBSalesSalesPerformMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
