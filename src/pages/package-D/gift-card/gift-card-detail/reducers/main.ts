/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:18:48
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-14 17:24:10
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/reducers/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Command} from '../constant';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isCommLogin: false,
  isReady: false,
  // 礼品卡名称
  name: '',
  // 礼品卡id
  id: '',
  //礼品卡前端自定义类型 '0' 仅预览 '1'可使用
  type: '1',
  preview: undefined,
  giftCardId: '',

  // 背景类型 0：颜色 1：图片
  backgroundType: 0,
  // 礼品卡背景颜色
  backgColor: '#FF9F00, #FF6600',
  // 礼品卡背景图片
  backgroundDetail: '',
  // 礼品卡面值
  parValue: 0,
  status: 0,
  // 卡的使用状态
  /**
   *  0 可用
  1 不可用
   2 待激活
  */
  cardStatus: 0,
  // 礼品卡有效时间 月
  rangeMonth: 0,
  // 礼品卡激活时间
  activationTime: '',
  // 礼品卡有效时间 具体时间
  expirationTime: '',
  /**
    * 礼品卡有效时间 类型
    * 0:长期有效
     1:领取多少月内有效
     2:指定具体时间
    * */
  expirationType: 0,
  // 礼品卡库存类型 无限库存，0：否 1：是"
  stockType: 0,
  // 礼品卡库存
  stock: 0,
  /**
   * 指定目标商品类型
   */
  scopeType: 0,
  //  余额
  balance: 0,
  // 联系方式
  contactPhone: null,
  // 联系方式 类型 0手机, 1电话, 2 微信
  contactType: 0,
  isOpen: false,
  // 使用须知
  useDesc: '',
  // 前景色
  foregroundColor: '',
  /**
    * //null 全部
   0 已用完
  1 已过期
  2 已销卡
   */

  invalidStatus: null,
  // 卡号
  giftCardNo: 0,
  userGiftCardId: null,
  giftCardType: 0,
  totalGoodsNum: 0,
  enterpriseId:'',
  useType: 0,
  mofangConfig: '',
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
