import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  invoiceInfo: {
    // 订单开票id
    orderInvoiceId: '',
    //发票类型，0：普通发票 1：增值税专用发票 -1：无
    type: true,
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
  },
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
