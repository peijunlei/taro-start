import * as sdk from './fetch';
import config from '@/service/config';
import {IPatchcaUuidReq} from 'api/LoginBaseController';

let host = config.host;

export default {
  queryUseNum,

  getGiftCardDetail,

  getGiftCardBlessing,

  queryList,

  checkGiftCard,

  exchangeGiftCard,

  getTradeUserGiftCard,

  checkUserGiftCard,

  getUserGiftCardDetail,

  listGoodsByGiftCardId,

  activateGiftCard,

  getUserGiftCardBillInfo,
};

/**
 * 查询礼品卡可用数量
 * @returns
 */
export async function queryUseNum(): Promise<any> {
  const result = await sdk.post(`/userGiftCard/getUserGiftCardNum`, {});
  return result.context;
}

export enum TabStatus {
  // 可用
  USABLE = 0,
  // 不可用
  UN_USABLE = 1,
  // 待激活
  TO_ACTIVE = 2,
}

export enum CardStatus {
  // 待激活
  TO_ACTIVE = 0,
  // 可用(已激活)
  USABLE = 1,
}

export enum InvalidStatus {
  // 全部
  ALL = null,
  // 已用完
  USE_UP = 0,
  // 已过期
  EXPIRATION = 1,
  // 已销卡
  CANCEL = 2,
}

export enum BackgroundType {
  COLOR = 0,
  IMAGE = 1,
}

export interface GiftCardInfo {
  userGiftCardId: string;
  // 名称
  name: string;
  // 面值
  parValue: number;
  // 余额
  balance: number;
  // 卡号
  giftCardNo: string;
  // 过期时间类型(0：长期有效 1：领取多少月内有效 2:指定具体时间)
  expirationType: 0 | 1 | 2;
  // 过期时间
  expirationTime: string;
  // 针对过期类型为1：领取多少月内有效 时，返回对应的余额数
  rangeMonth: number;
  // 计算后的过期文案
  expirationValue: string;
  // 失效状态
  invalidStatus?: InvalidStatus;
  // 背景类型
  backgroundType: BackgroundType;
  // 背景值
  backgroundDetail: string;
  // 前景值
  foregroundColor: string;
  giftCardId: string | number;
  skuIdList: string[];
  [key: string]: any;
}

export interface QueryListRequest {
  isCommLogin?: number;
  invalidStatus?: InvalidStatus;
  status: TabStatus;
  pageNum: number;
  pageSize?: number;
  /** 卡类型 - 0福点卡，1提货卡 */
  giftCardTabType: number;
}

let num = 0;

const fmtDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.substring(0, 10).replace(/-/g, '.');
};

/**
 * card 卡信息
 * isReturn 是否可以返回
 */
export const calcExpirationValue = (card, isReturn?) => {
  let value = '';
  if (card.expirationType === 0) {
    value = '长期有效';
  } else if (card.expirationType === 2) {
    if (card.expirationStartTime) {
      value = `${fmtDate(card.expirationStartTime)}至${fmtDate(card.expirationTime)}`;
    } else {
      value = `有效期至${fmtDate(card.expirationTime)}`;
    }
  } else {
    // 自激活后X月
    if (card.expirationTime) value = `有效期至${fmtDate(card.expirationTime)}`;
    else value = `自激活后${card.rangeMonth}月内有效`;
  }
  card.expirationValue = value;
  if (isReturn) return card;
};

/**
 * 查询礼品卡列表
 */
export async function queryList(
  params: QueryListRequest,
): Promise<{
  // 礼品卡集合
  giftCardList: GiftCardInfo[];
  // 礼品卡余额
  cardBalance: number;
  // 可用数量
  useNum: number;
  // 不可用数量
  invalidNum: number;
  // 未激活礼品卡数量
  notActive: number;
  // 总数
  // total: number,
  noMore?: boolean;
}> {
  params.pageSize = 10;
  const context: any = (await sdk.post(`/userGiftCard/getUserGiftCardPage`, params)).context;
  const giftCardList = context.userGiftCardInfoVOS;
  const result = {
    giftCardList: giftCardList.content,
    useNum: context.useNum,
    notActive: context.notActiveNum,
    invalidNum: context.invalidNum,
    cardBalance: context.cardBalance,
    noMore: params.pageSize * params.pageNum + giftCardList.content.length === giftCardList.total,
  };
  // 过期文案计算
  result.giftCardList.forEach((card) => calcExpirationValue(card));
  return result;
}

interface ExchangeRequest {
  exchangeCode: string;
  giftCardNo: string;
  [p: string]: any
}

/**
 * 校验礼品卡
 * @param request
 */
export async function checkGiftCard(request: ExchangeRequest): Promise<any> {
  const result = await sdk.post(`/userGiftCard/checkExchangeGiftCard`, request, {host});
  // // 过期文案计算
  const card = result?.context?.userGiftCardInfoVO;
  if (card) calcExpirationValue(card);
  return result;
}

/**
 * 校验礼品卡
 * @param request
 */
export async function checkGiftCard2(request: ExchangeRequest): Promise<any> {
  const result = await sdk.post(`/userGiftCard/checkExchangeGiftCard/common`, request, { host });
  // // 过期文案计算
  const card = result?.context?.userGiftCardInfoVO;
  if (card) calcExpirationValue(card);
  return result;
}


/**
 * 兑换礼品卡
 * @returns
 */
export async function exchangeGiftCard(request: ExchangeRequest): Promise<any> {
  return sdk.post(`/userGiftCard/exchangeGiftCard`, request, {host});
}

/**
 * 兑换礼品卡
 * @returns
 */
export async function exchangeGiftCard2(request: ExchangeRequest): Promise<any> {
  const result = await sdk.post(`/userGiftCard/exchangeGiftCard/common`, request, { host });
  return result.context
}

/**
 * 确认订单页礼品卡信息查询
 */
export async function getTradeUserGiftCard(request: any): Promise<any> {
  let context = (await sdk.post(`/userGiftCard/getTradeUserGiftCard`, request)).context;
  if (!context.invalidNum) context.invalidNum = 0;
  if (!context.validNum) context.validNum = 0;
  if (!context.invalidGiftCardInfoVO) context.invalidGiftCardInfoVO = [];
  if (!context.validGiftCardInfoVO) context.validGiftCardInfoVO = [];
  context.invalidGiftCardInfoVO.map((card) => calcExpirationValue(card));
  context.validGiftCardInfoVO.map((card) => calcExpirationValue(card));
  return context;
}

/**
 * 确认订单页-验证礼品卡使用预估金额
 */
export async function checkUserGiftCard(request: any, ignoreCode?: string[] | boolean): Promise<any> {
  let result = await sdk.post('/userGiftCard/checkUserGiftCard', request, undefined);
  if (Array.isArray(ignoreCode) || ignoreCode === false) return result;
  return result.context;
}

/**
 *
 * 查询礼品卡详情接口
 *
 */
export async function getUserGiftCardDetail(userGiftCardId: string): Promise<unknown> {
  let result = await sdk.post(
    '/userGiftCard/getUserGiftCardDetail',

    {userGiftCardId},
  );
  return result.context;
}

export async function getUserGiftCardDetailUnLogin(giftCardNo: string): Promise<any> {
  let result = await sdk.post(
    '/userGiftCard/getGiftCardDetailUnLogin',

    {giftCardNo},
  );
  return result.context;
}

export async function getGiftCard(giftCardId: string): Promise<any> {
  let result = await sdk.get(
    '/giftCard/info/{id}'.replace('{id}', giftCardId + ''),
    {},
  );
  return result.context;
}
/**
 *
 * 未登录查询礼品卡登录信息
 *
 */
async function getGiftCardDetail(giftCardId: string): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/giftCard/{giftCardId}'.replace('{giftCardId}', giftCardId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 登录成功后查询礼品卡是否开启了祝福页
 *
 */
async function getGiftCardBlessing(giftCardId: string): Promise<any> {
  let result = await sdk.get<any>(
    '/giftCard/blessing/{giftCardId}'.replace('{giftCardId}', giftCardId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询适用礼品卡的商品
 *
 */
export async function listGoodsByGiftCardId(params: any): Promise<unknown> {
  let result = await sdk.post(
    '/giftCard/gift-card-goods',

    {...params},
  );
  return result.context;
}

/**
 *
 * 礼品卡激活
 *
 */
export async function activateGiftCard(giftCardNo: string | number, ignoreCode: any): Promise<unknown> {
  let result = await sdk.post(
    '/userGiftCard/activateGiftCard',

    {giftCardNo},
    undefined,
  );
  return result;
}

/**
 *
 * 礼品卡使用记录
 *
 */
export async function getUserGiftCardBillInfo(params: any): Promise<unknown> {
  let result = await sdk.post(
    '/giftCardBill/getGiftCardBillPage',

    params,
  );
  return result.context;
}
