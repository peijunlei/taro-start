import Actions from './actions';
import {InvoiceProjectListVO} from 'api/InvoiceProjectBaseController';
import {CustomerInvoiceVO} from 'api/CustomerInvoiceBaseController';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';

export interface IMainReducer {
  isReady: boolean;
  isOpen: boolean;
  tabType: 1 | 2 | 3;
  configFlag: boolean;
  customerInvoiceResponse: CustomerInvoiceVO;
  //不开发票 是否支持普通发票 是否支持增值发票
  tabInit: [boolean, boolean, boolean];
  isLoading?: boolean;
  supplierId: number;
  commonCheckProjectId: string;
  commonProjects: InvoiceProjectListVO;
  commonCheck: {
    invoiceType: 0 | 1;
    invoiceTitle: string;
    invoiceIdentification: string;
    invoiceProject: 0;
  };
  isAddressAlone: boolean;
  invoiceAddress: CustomerDeliveryAddressVO;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInvoiceTabProps = {};
export type IInvoiceTabState = {};

export type IInvoiceCommonProps = {};
export type IInvoiceCommonState = {};

export type IInvoiceAddProps = {};
export type IInvoiceAddState = {};

export type IInvoiceAddressProps = {};
export type IInvoiceAddressState = {};

export type INoMaskProps = {};
export type INoMaskState = {};

//create by moon https://github.com/creasy2010/moon
