import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';
import OrderListShowTypeController from 'api/OrderListShowTypeController';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isAgree: false,
  phone: '',

  verifiCode: '',

  password: '',

  routers: [],

  //微信授权登录参数
  wecatAuthParams: {
    channel: 'WEAPP',
    unionId: '',
    phonNumber: '18761694530',
    nickName: '',
    headimgurl: '',
    openId: '',
    sessionKey: '',
    appId: '',
  },
  // 填写邀请码的弹窗
  visible: false,
  // 登录标识，是登录还是注册，默认登录
  loginFlag: true,
  // 邀请码，如需要填的话
  inviteCode: '',
  pcLogo: [],
  code: '',
  encryptedData: '',
  iv: '',
  openFlag: '',
  registerLimitType: '',
  isOpenWechat: false,
  switchLogin: true,
  flag: true,
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
