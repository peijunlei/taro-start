import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CompanyInfoController';

/**
 *
 * 查询公司信息
 *
 */
async function findCompanyInfo(): Promise<CompanyInfoRopResponse> {
  let result = await sdk.get<CompanyInfoRopResponse>(
    '/companyInfo',

    {},
  );
  return result.context;
}

export default {
  findCompanyInfo,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CompanyInfoRopResponse»".
 */
export interface BaseResponseCompanyInfoRopResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CompanyInfoRopResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CompanyInfoRopResponse {
  areaId?: number;
  cityId?: number;
  companyDescript?: string;
  companyInfoId?: number;
  companyName?: string;
  contactName?: string;
  contactPhone?: string;
  copyright?: string;
  detailAddress?: string;
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyInfoRopResponse".
 */
export interface CompanyInfoRopResponse1 {
  areaId?: number;
  cityId?: number;
  companyDescript?: string;
  companyInfoId?: number;
  companyName?: string;
  contactName?: string;
  contactPhone?: string;
  copyright?: string;
  detailAddress?: string;
  provinceId?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
