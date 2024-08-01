import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerController';

/**
 *
 * 会员账号安全信息
 *
 */
async function getCustomerSafeInfo(): Promise<CustomerSafeResponse> {
  let result = await sdk.get<CustomerSafeResponse>(
    '/customer/customerSafeInfo',

    {},
  );
  return result.context;
}

export default {
  getCustomerSafeInfo,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerSafeResponse»".
 */
export interface BaseResponseCustomerSafeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSafeResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerSafeResponse {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  /**
   * 密码安全级别
   */
  safeLevel?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSafeResponse".
 */
export interface CustomerSafeResponse1 {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  /**
   * 密码安全级别
   */
  safeLevel?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
