import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SaasDomainWebController';

/**
 *
 * 查询域名信息
 *
 */
async function queryDomainStore(): Promise<DomainStoreRelaVO> {
  let result = await sdk.get<DomainStoreRelaVO>(
    '/domain/domain-store',

    {},
  );
  return result.context;
}

export default {
  queryDomainStore,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DomainStoreRelaVO»".
 */
export interface BaseResponseDomainStoreRelaVO {
  /**
   * 结果码
   */
  code: string;
  context?: DomainStoreRelaVO;
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
export interface DomainStoreRelaVO {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * H5端域名
   */
  h5Domain?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 初始化H5端域名
   */
  initH5Domain?: string;
  /**
   * 初始化PC端域名
   */
  initPcDomain?: string;
  /**
   * PC端域名
   */
  pcDomain?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DomainStoreRelaVO".
 */
export interface DomainStoreRelaVO1 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * H5端域名
   */
  h5Domain?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 初始化H5端域名
   */
  initH5Domain?: string;
  /**
   * 初始化PC端域名
   */
  initPcDomain?: string;
  /**
   * PC端域名
   */
  pcDomain?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
