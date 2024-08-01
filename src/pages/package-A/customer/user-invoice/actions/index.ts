import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import userInvoiceMain from '../reducers/main';
import {UploadImage} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingList', true);
      let result = await api.customerInvoiceBaseController.findCustomerInvoiceByCustomerId();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            invoiceForm: result,
            saveCustomerInvoiceForm: result,
            isLoadingList: false,
          },
        },
      });
    },
    //上传图片
    async _chooseImage(type) {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      //图片大小不能超过5M
      const FILE_MAX_SIZE = 500 * 1024 * 10;
      const {context} = await UploadImage(FILE_MAX_SIZE);
      this.newUploadImg(context, type);
    },
    /**
     * 新文件上传
     * @param context
     */
    newUploadImg(context, type) {
      if (type == 'businessLicenseImg') {
        // [{uid: 0, status: 'done', url: context[0]}];
        actions.action.commonChange([
          {
            paths: 'main.invoiceForm.businessLicenseImg',
            value: context && context[0] ? JSON.stringify([{ uid: 0, status: 'done', url: context[0] }]) : '',
          },
        ]);
        actions.action.commonChange([
          {
            paths: 'main.saveCustomerInvoiceForm.businessLicenseImg',
            value: context && context[0] ? JSON.stringify([{ uid: 0, status: 'done', url: context[0] }]) : '',
          },
        ]);
      } else if (type == 'taxpayerIdentificationImg') {
        actions.action.commonChange([
          {
            paths: 'main.invoiceForm.taxpayerIdentificationImg',
            value: context && context[0] ? JSON.stringify([{ uid: 0, status: 'done', url: context[0] }]) : '',
          },
        ]);
        actions.action.commonChange([
          {
            paths: 'main.saveCustomerInvoiceForm.taxpayerIdentificationImg',
            value: context && context[0] ? JSON.stringify([{ uid: 0, status: 'done', url: context[0] }]) : '',
          },
        ]);
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
        userInvoiceMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['userInvoiceMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
