import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  invoiceInfo: {
    // 订单开票id
    orderInvoiceId: '',
    //发票类型，0：普通发票 1：增值税专用发票 -1：无
    type: boolean,//true为增票，false为普通发票
    // 0:个人 1:单位，必传
    flag: 0,
    //发票的收货地址
    address: '',
    //联系人
    contacts: '',
    //联系电话
    phone: '',
    //开票项目
    projectName: '',
    //发票抬头
    title: '',
    //纳税人识别号
    identification: '',
    //单位名称
    companyName: '',
    //注册电话
    phoneNo: '',
    //开户行
    bank: '',
    //银行账户
    account: '',
    //注册地址
    companyAddress: '',
    // 省
    provinceId: '',
    // 市
    cityId: '',
    // 区
    areaId: ''
  }
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

//create by moon https://github.com/creasy2010/moon
