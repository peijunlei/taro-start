import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageCOrderOrderToolOrderInvoiceMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {addressInfo} from '@/utils/location/area/area';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(supplierId) {
      console.log('supplierId', supplierId);
      await actions.loadReducer();
      const invoiceData = await Taro.getStorageSync('mini::invoice');
      const thisInvoice = invoiceData[supplierId];
      let item = thisInvoice.invoiceAddress;
      if (item) {
        const addressInfoStr = await addressInfo(item.provinceId, item.cityId, item.areaId, item.streetId);
        item.addressInfo = addressInfoStr + item.deliveryAddress;
      }

      try {
        Promise.all([
          //初始化普通开票项目
          await api.invoiceProjectBaseController.findAllInvoiceProject(supplierId),
          //增值税开票信息初始化
          await api.customerInvoiceBaseController.findInfoByCompanyInfoId(supplierId),
        ]).then(([one, two]) => {
          const commonCheck =
            thisInvoice.commonCheck && thisInvoice.commonCheck.invoiceProject
              ? thisInvoice.commonCheck
              : {
                  invoiceType: 0,
                  invoiceTitle: '',
                  invoiceIdentification: '',
                  invoiceProject: one[0].projectId,
                  invoiceProjectName: one[0].projectName,
                };
          dispatch({
            type: Command.init,
            payload: {
              main: {
                supplierId,
                commonCheck,
                commonProjects: one,
                configFlag: two.configFlag,
                customerInvoiceResponse: two.customerInvoiceResponse,
                tabInit: [true, two.paperInvoice, two.flag && two.configFlag],
                commonCheckProjectId: commonCheck.invoiceProject,
                tabType: thisInvoice.supportInvoice,
                invoiceAddress: item || {},
                isAddressAlone: Boolean(item && item.deliveryAddressId),
              },
            },
          });
        });
      } catch (e) {
        await actions.action.commonChange('main.isOpen', true);
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
        packageCOrderOrderToolOrderInvoiceMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderToolOrderInvoiceMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
