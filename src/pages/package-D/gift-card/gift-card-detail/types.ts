import Actions from './actions';

export interface IMainReducer {
  isCommLogin: boolean;
  isReady: boolean;
  // 礼品卡名称
  name: string;
  // 礼品卡id
  id: string;
  //礼品卡前端自定义类型 '0' 仅预览 '1'可使用
  type: '0' | '1';
  // 预览模式
  preview?: undefined;
  // 背景类型 0：颜色 1：图片
  backgroundType: number;
  giftCardId: number;
  // 礼品卡背景颜色
  backgColor: string;
  // 礼品卡背景图片
  backgroundDetail: string;
  // 礼品卡面值
  parValue: number;
  // 礼品卡有效时间 月
  rangeMonth: number;
  // 礼品卡激活时间
  activationTime: string;
  // 礼品卡有效时间 具体时间
  expirationTime: string;
  useDesc: string;
  foregroundColor: string;
  /**
    * 礼品卡有效时间 类型
    * 0:长期有效
     1:领取多少月内有效
     2:指定具体时间
    * */
  expirationType: number;
  // 礼品卡库存类型 无限库存，0：否 1：是"
  stockType: number;
  // 礼品卡库存
  stock: number;
  /**
   * 指定目标商品类型
   */
  scopeType: number;
  status: number;
  // 使用状态
  invalidStatus: any;
  balance: number;
  giftCardNo: number;
  cardStatus: number;
  contactPhone: string;
  contactType: number;
  userGiftCardId: string | number;
  isOpen: boolean;
  /** 卡类型 - 0福点卡，1提货卡 */
  giftCardType: 0 | 1;
  /** 可兑换N种商品 - N */
  totalGoodsNum: number;
  enterpriseId: string;
  useType: number;
  mofangConfig: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IGiftCardInfoProps = {};
export type IGiftCardInfoState = {};

export type IGiftCardToolProps = {};
export type IGiftCardToolState = {};

export type IGiftCardBottomProps = {};
export type IGiftCardBottomState = {};
