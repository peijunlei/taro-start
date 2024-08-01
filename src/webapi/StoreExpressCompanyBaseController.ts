import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreExpressCompanyBaseController';

/**
 *
 * pc/h5修改退货物流公司为平台配置物流
 *
 */
async function allExpressCompanyList(): Promise<any> {
  let result = await sdk.get<any>(
    '/boss/expressCompany',

    {},
  );
  return result.context;
}

/**
 *
 * 查询店铺正在使用的物流公司
 *
 */
async function findCheckedExpressCompanies(storeId: IFindCheckedExpressCompaniesStoreIdReq): Promise<any> {
  let result = await sdk.get<any>(
    '/store/expressCompany/{storeId}'.replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

export default {
  allExpressCompanyList,

  findCheckedExpressCompanies,
};

/**
 * 内容
 */
export type Any = {
  [k: string]: any;
}[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "any".
 */
export type Any1 = {
  [k: string]: any;
}[];
/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindCheckedExpressCompaniesStoreIdReq".
 */
export type IFindCheckedExpressCompaniesStoreIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List»".
 */
export interface BaseResponseList {
  /**
   * 结果码
   */
  code: string;
  context?: Any;
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

//create by moon https://github.com/creasy2010/moon
