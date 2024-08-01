import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
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

    //保存开票
    async _saveInvoice() {
      const {
        main: {
          tabType,
          commonProjects,
          customerInvoiceResponse,
          commonCheck,
          supplierId,
          commonCheckProjectId,
          isAddressAlone,
          invoiceAddress,
        },
      } = getData();
      const invoiceData = await Taro.getStorageSync('mini::invoice');

      //普通发票
      if (tabType === 2) {
        const {projectName} = commonProjects.filter((item) => item.projectId === commonCheckProjectId)[0];
        await action._checkCommonInvoice(
          commonCheck,
          invoiceData,
          supplierId,
          commonCheckProjectId,
          isAddressAlone,
          invoiceAddress,
          projectName,
        );
      } else {
        if (isAddressAlone && invoiceAddress.deliveryAddressId === undefined) {
          await action._showToast(`请选择发票收货地址`);
          return;
        }
        invoiceData[supplierId] = {
          supportInvoice: tabType,
          commonCheck: {
            invoiceProject: '00000000000000000000000000000000',
            invoiceProjectName: '明细',
          },
          invoiceAddress: isAddressAlone ? invoiceAddress : {},
          //增值发票的相关信息
          customerInvoiceResponse,
        };
        await Taro.setStorageSync('mini::invoice', invoiceData);
        await Taro.navigateBack();
      }
    },

    /**
     * 切换tab事件
     * @param tabKey
     */
    changeInvoiceTab(tabKey) {
      action.commonChange([
        {paths: 'main.isAddressAlone', value: false},
        {paths: 'main.tabType', value: tabKey},
      ]);
    },

    //发票收货地址缓存
    async _loaclInvoiceAddress() {
      const local = (await Taro.getStorageSync('mini::invoiceAddress')) || {};
      Taro.removeStorageSync('mini::invoiceAddress');
      await action.commonChange('main.invoiceAddress', local);
    },

    //普通发票存储与校验
    async _checkCommonInvoice(
      {invoiceType, invoiceTitle, invoiceIdentification, invoiceProject},
      invoiceData,
      supplierId,
      commonCheckProjectId,
      isAddressAlone,
      invoiceAddress,
      invoiceProjectName,
    ) {
      //普通发票 单位
      if (invoiceType === 1) {
        if (invoiceTitle === '') {
          await action._showToast(`请填写发票抬头`);
          return;
        }
        if (invoiceIdentification !== '') {
          if (invoiceIdentification.length < 15 || invoiceIdentification.length > 20) {
            await action._showToast(`纳税人税号应该在15-20个字符之间`);
            return;
          }
        }
      }
      if (isAddressAlone && invoiceAddress.deliveryAddressId === undefined) {
        await action._showToast(`请选择发票收货地址`);
        return;
      }
      invoiceData[supplierId] = {
        supportInvoice: 2,
        commonCheck: {
          invoiceType,
          invoiceTitle,
          invoiceIdentification,
          invoiceProject: commonCheckProjectId,
          invoiceProjectName,
        },
        invoiceAddress: isAddressAlone ? invoiceAddress : {},
      };
      await Taro.setStorageSync('mini::invoice', invoiceData);
      await Taro.navigateBack();
    },

    //showToast
    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderOrderToolOrderInvoiceMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
