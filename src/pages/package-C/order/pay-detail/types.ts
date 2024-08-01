import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  payDetail: {
    payOrderPoints?: any;
    totalPrice?: any; //应付金额
    payOrderStatus?: any; //付款记录
    payType?: any; //付款方式
    payOrderPrice?: any; //付款金额
    receiveTime?: any; //付款时间
    comment?: any; //备注
    encloses?: any; //附件
    receivableNo?: any; //流水号
    orderCode?: any; //订单号
    receivableAccount?: any; //收款账户
    normalReceivableAccount?: any; //正常展示的收款账户
    buyPoints?: any;
    //订单流程状态
    flowState:any;
    giftCardPrice:any;
  };
  isLoadingFlag:boolean;
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
// payOrderId: "808080816ef9d1b3016efe6500eb002b"
// orderCode: "O201912131634228836"
// createTime: "2019-12-13 16:34:23.000"
// customerName: "小明"
// customerId: "8a9bc76c6147494c01615988998a0001"
// payType: 0
// payOrderStatus: 1
// comment: null
// receivableAccount: null
// receivableNo: null
// payOrderPrice: null
// payOrderPoints: null
// totalPrice: 0.01
// receiveTime: null
// payChannel: null
// payChannelId: null
// companyInfoId: 590
// supplierName: "褚秋云小店"
// encloses: null
// grouponNo: null
