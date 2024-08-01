import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {ValidConst, FormRegexUtil} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //获取会员增票资质数据
    async changeIsEdit() {
      action.commonChange('main.isEdit', true);
    },
    //获取会员增票资质数据
    async getCustomerInvoice() {},
    //保存会员增票资质数据
    async saveCustomerInvoice() {
      const {saveCustomerInvoiceForm} = getData().main;

      if (
        !FormRegexUtil(saveCustomerInvoiceForm.companyName, '单位全称', {required: true, maxlength: 50}) ||
        !FormRegexUtil(saveCustomerInvoiceForm.taxpayerNumber, '纳税人识别号', {
          required: true,
          regexType: 'number&letter',
          minLength: 15,
          maxlength: 20,
        }) ||
        !FormRegexUtil(saveCustomerInvoiceForm.companyPhone, '注册电话', {
          required: true,
          regexType: 'number&-',
          maxlength: 20,
        }) ||
        !FormRegexUtil(saveCustomerInvoiceForm.companyAddress, '注册地址', {required: true, maxlength: 60}) ||
        !FormRegexUtil(saveCustomerInvoiceForm.bankNo, '银行基本户号', {required: true, maxlength: 30}) ||
        !FormRegexUtil(saveCustomerInvoiceForm.bankName, '开户行', {required: true, maxlength: 50})
      ) {
        return;
      }
      if (saveCustomerInvoiceForm.businessLicenseImg == null || saveCustomerInvoiceForm.businessLicenseImg == '') {
        Taro.showToast({
          title: '请填营业执照复印件',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      if (
        saveCustomerInvoiceForm.taxpayerIdentificationImg == null ||
        saveCustomerInvoiceForm.taxpayerIdentificationImg == ''
      ) {
        Taro.showToast({
          title: '请填写一般纳税人认证资格复印件',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      if (saveCustomerInvoiceForm.customerInvoiceId != null && saveCustomerInvoiceForm.companyName != '') {
        let result = (await api.customerInvoiceBaseController.updateCustomerInvoice(saveCustomerInvoiceForm)) as any;
        if (result.code === 'K-000000') {
          Taro.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
              action.commonChange('main.isEdit', false);
              Taro.navigateTo({url: `/pages/package-A/customer/user-invoice/index`});
            }, 1500);
          });
        }
      } else {
        let result = (await api.customerInvoiceBaseController.saveCustomerInvoice(saveCustomerInvoiceForm)) as any;
        if (result.code === 'K-000000') {
          Taro.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1000,
          }).then(() => {
            setTimeout(() => {
              action.commonChange('main.isEdit', false);
              Taro.navigateTo({url: `/pages/package-A/customer/user-invoice/index`});
            }, 1500);
          });
        }
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('userInvoiceMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
