import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'AccountBaseController';

/**
 *
 * 查询所有有效线下账户
 *
 */
async function findValidOfflineAccounts(): Promise<OfflineAccountVOArray> {
  let result = await sdk.get<OfflineAccountVOArray>(
    '/account/offlineValidAccounts',

    {},
  );
  return result.context;
}

export default {
  findValidOfflineAccounts,
};

/**
 * 内容
 */
export type OfflineAccountVOArray = OfflineAccountVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OfflineAccountVOArray".
 */
export type OfflineAccountVOArray1 = OfflineAccountVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«OfflineAccountVO»»".
 */
export interface BaseResponseListOfflineAccountVO {
  /**
   * 结果码
   */
  code: string;
  context?: OfflineAccountVOArray;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
export interface OfflineAccountVO {
  /**
   * 线下账户id
   */
  accountId?: number;
  /**
   * 账户名称
   */
  accountName?: string;
  /**
   * 支行
   */
  bankBranch?: string;
  /**
   * 开户银行
   */
  bankName?: string;
  /**
   * 账号
   */
  bankNo?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  bankStatus?: string;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  deleteFlag?: number;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 是否主账号
   * * NO: 否
   * * YES: 是
   */
  isDefaultAccount?: 0 | 1;
  /**
   * 是否收到平台首次打款
   * * NO: 否
   * * YES: 是
   */
  isReceived?: 0 | 1;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 修改时间
   */
  update_time?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OfflineAccountVO".
 */
export interface OfflineAccountVO1 {
  /**
   * 线下账户id
   */
  accountId?: number;
  /**
   * 账户名称
   */
  accountName?: string;
  /**
   * 支行
   */
  bankBranch?: string;
  /**
   * 开户银行
   */
  bankName?: string;
  /**
   * 账号
   */
  bankNo?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  bankStatus?: string;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  deleteFlag?: number;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 是否主账号
   * * NO: 否
   * * YES: 是
   */
  isDefaultAccount?: 0 | 1;
  /**
   * 是否收到平台首次打款
   * * NO: 否
   * * YES: 是
   */
  isReceived?: 0 | 1;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 修改时间
   */
  update_time?: string;
  [k: string]: any;
}
export interface OfflineAccountVO2 {
  /**
   * 线下账户id
   */
  accountId?: number;
  /**
   * 账户名称
   */
  accountName?: string;
  /**
   * 支行
   */
  bankBranch?: string;
  /**
   * 开户银行
   */
  bankName?: string;
  /**
   * 账号
   */
  bankNo?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  bankStatus?: string;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  deleteFlag?: number;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 是否主账号
   * * NO: 否
   * * YES: 是
   */
  isDefaultAccount?: 0 | 1;
  /**
   * 是否收到平台首次打款
   * * NO: 否
   * * YES: 是
   */
  isReceived?: 0 | 1;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 修改时间
   */
  update_time?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
