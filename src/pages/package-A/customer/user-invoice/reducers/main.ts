import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isLoadingList:true,
  isEdit: false,
  reviewStatus: null,
  invoiceForm: {
    customerInvoiceId: null,
    customerId: '',
    customerName: '',
    companyName: '',
    taxpayerNumber: '',
    companyPhone: '',
    companyAddress: '',
    bankNo: '',
    bankName: '',
    businessLicenseImg: '',
    taxpayerIdentificationImg: '',
    checkState: null,
    rejectReason: '',
    invalidFlag: '0',
  },

  saveCustomerInvoiceForm: {
    /**
     * 开户行
     */
    bankName: '',
    /**
     * 银行基本户号
     */
    bankNo: '',
    /**
     * 营业执照复印件
     */
    businessLicenseImg: '',
    /**
     * 增票资质审核状态
     * * WAIT_CHECK: 0：待审核
     * * CHECKED: 1：已审核
     * * NOT_PASS: 2：审核未通过
     */
    checkState: 0,
    /**
     * 单位地址
     */
    companyAddress: '',
    /**
     * 单位全称
     */
    companyName: '',
    /**
     * 单位电话
     */
    companyPhone: '',
    /**
     * 会员ID
     */
    customerId: '',
    /**
     * 增专资质ID
     */
    customerInvoiceId: null,
    /**
     * 负责业务员
     */
    employeeId: '',
    /**
     * 一般纳税人认证资格复印件
     */
    taxpayerIdentificationImg: '',
    /**
     * 纳税人识别号
     */
    taxpayerNumber: '',
  },

  ifModify: false,

  isShowLicense: false,
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}

//create by moon https://github.com/creasy2010/moon
