import Actions from './actions';
import {
  CustomerInvoiceByCustomerIdAndDelFlagResponse,
  ISaveCustomerInvoiceSaveRequestReq,
} from 'api/CustomerInvoiceBaseController';

export interface IMainReducer {
  isReady: boolean;
  isEdit: boolean;
  isLoading?: boolean;
  isLoadingList:boolean;
  reviewStatus: IMainReviewStatus;

  invoiceForm: IMainInvoiceForm;

  saveCustomerInvoiceForm: ISaveCustomerInvoiceForm;

  ifModify: IMainIfModify;
  isShowLicense: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IFormProps = {};
export type IFormState = {};

export type ITopStatusProps = {};
export type ITopStatusState = {};

export type IBottomProps = {};
export type IBottomState = {};

export type ISaveCustomerInvoiceForm = ISaveCustomerInvoiceSaveRequestReq;

export interface IMainReviewStatus {
  WAIT_CHECK: 0;
  CHECKED: 1;
  NOT_PASS: 2;
}

export type IMainInvoiceForm = CustomerInvoiceByCustomerIdAndDelFlagResponse;

// export interface IMainInvoiceForm {
//   customerInvoiceId:'',
//   customerId:'',
//   customerName:'',
//   companyName:'',
//   taxpayerNumber:'',
//   companyPhone:'',
//   companyAddress:'',
//   bankNo:'',
//   bankName:'',
//   businessLicenseImg:'',
//   taxpayerIdentificationImg:'',
//   checkState:0,
//   rejectReason:'',
//   invalidFlag:'';
//   // [k: string]: any;
// }
export type IMainIfModify = boolean;
export type IMainIsShowLicense = boolean;

//create by moon https://github.com/creasy2010/moon
