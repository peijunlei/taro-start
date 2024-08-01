import {ifLogin} from '@/utils/common-functions';
import {getAddressInfo} from '@/utils/getAddressInfo';
import {Command} from '../reducers/constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import storeProfileStaticMain from '../reducers/main';
import {pvUvStatics} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      await actions.loadReducer();
      let storeId = params.storeId;
      const evaluate = (await api.systemPointsConfigController.isGoodsEvaluate()).evaluate;
      actions.action.commonChange('main.isShow', evaluate);

      const store = await api.storeBaseController.queryStoreDocument({storeId});
      const addressInfoStr = await getAddressInfo(store.provinceId, store.cityId, store.areaId);
      store.addressInfo = addressInfoStr;
      actions.action.commonChange('main.store', store);

      /**店铺pv/uv埋点*/
      pvUvStatics.myPvUvStatis({shopId: store.companyInfoId});

      if (!ifLogin()) {
        return;
      }
      const level = (await api.storeBaseController.queryStoreVip({storeId})).level;
      actions.action.commonChange('main.level', level);

      let levelList = [];
      let result = [];
      //如果是自营
      if (store.companyType === 0) {
        result = await Promise.all([
          api.customerLevelBaseController.getCustomerLevelRightsInfos(),
          api.customerLevelRightsBaseController.queryCustomerLevelRightsList(),
          api.systemGrowthValueConfigController.isGrowthValueOpen(),
        ]);
      } else {
        result = await Promise.all([
          api.storeLevelBaseController.queryStoreCustomerLevel(storeId),
          api.storeLevelBaseController.queryStoreLevelList(storeId),
        ]);
      }
      actions.action.commonChange('main.userInfo', result[0]);

      if (store.companyType === 0) {
        levelList = result[1].customerLevelVOList.map((value) => {
          return {
            customerLevelName: value.customerLevelName,
            customerLevelDiscount: value.customerLevelDiscount,
            growthValue: value.growthValue,
          };
        });
      } else {
        levelList = result[1].storeLevelVOList.map((value) => {
          return {
            customerLevelName: value.levelName,
            customerLevelDiscount: value.discountRate,
            amountConditions: value.amountConditions,
            orderConditions: value.orderConditions,
          };
        });
      }
      actions.action.commonChange('main.levelList', levelList);
      if (!result[2] || result[2].open) {
        actions.action.commonChange('main.growthValueIsOpen', true);
      }
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        storeProfileStaticMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['storeProfileStaticMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
