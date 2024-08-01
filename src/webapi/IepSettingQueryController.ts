import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'IepSettingQueryController';

/**
 *
 * 查询缓存中的企业购设置信息提供给用户
 *
 */
async function findCacheForCustomer(): Promise<IepSettingTopOneResponse> {
  let result = await sdk.get<IepSettingTopOneResponse>(
    '/vas/iep/setting/cache',

    {},
  );
  return result.context;
}

/**
 *
 * 查询企业购设置信息
 *
 */
async function findTopOne(): Promise<IepSettingTopOneResponse> {
  let result = await sdk.get<IepSettingTopOneResponse>(
    '/vas/iep/setting/detail',

    {},
  );
  return result.context;
}

export default {
  findCacheForCustomer,

  findTopOne,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IepSettingTopOneResponse»".
 */
export interface BaseResponseIepSettingTopOneResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IepSettingTopOneResponse;
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
/**
 * 内容
 */
export interface IepSettingTopOneResponse {
  iepSettingVO?: IepSettingVO;
  [k: string]: any;
}
/**
 * 企业购设置信息
 */
export interface IepSettingVO {
  /**
   *  企业会员审核 0: 不需要审核 1: 需要审核
   * * NO: 否
   * * YES: 是
   */
  enterpriseCustomerAuditFlag?: 0 | 1;
  /**
   *  企业会员logo
   */
  enterpriseCustomerLogo?: string;
  /**
   *  企业会员名称
   */
  enterpriseCustomerName?: string;
  /**
   *  企业会员注册协议
   */
  enterpriseCustomerRegisterContent?: string;
  /**
   *  企业商品审核 0: 不需要审核 1: 需要审核
   * * NO: 否
   * * YES: 是
   */
  enterpriseGoodsAuditFlag?: 0 | 1;
  /**
   *  企业价名称
   */
  enterprisePriceName?: string;
  /**
   *  id
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IepSettingTopOneResponse".
 */
export interface IepSettingTopOneResponse1 {
  iepSettingVO?: IepSettingVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IepSettingVO".
 */
export interface IepSettingVO1 {
  /**
   *  企业会员审核 0: 不需要审核 1: 需要审核
   * * NO: 否
   * * YES: 是
   */
  enterpriseCustomerAuditFlag?: 0 | 1;
  /**
   *  企业会员logo
   */
  enterpriseCustomerLogo?: string;
  /**
   *  企业会员名称
   */
  enterpriseCustomerName?: string;
  /**
   *  企业会员注册协议
   */
  enterpriseCustomerRegisterContent?: string;
  /**
   *  企业商品审核 0: 不需要审核 1: 需要审核
   * * NO: 否
   * * YES: 是
   */
  enterpriseGoodsAuditFlag?: 0 | 1;
  /**
   *  企业价名称
   */
  enterprisePriceName?: string;
  /**
   *  id
   */
  id?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
