export interface IMainReducer {
    isReady: boolean,
    goodsInfo?: any
    storeInfo?: any
    coupon?: 'coupon' | 'zhichong'
    // 兑换流程/须知的key
    activeKey: string
    isServiceOpen: boolean;
    enterpriseId: string;
    serviceUrl: string;

    showModal: boolean

    //充值号码
    rechargeNumber: string

    showLoading: boolean

    scrollIntoView?: string
}
