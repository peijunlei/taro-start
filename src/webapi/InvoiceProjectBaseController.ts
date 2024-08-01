import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'InvoiceProjectBaseController';

/**
 *
 * 根据商家id集合，查询商家是否支持开票
 *
 */
async function queryProjectSwitchByIds(
  switchRequest: IQueryProjectSwitchByIdsSwitchRequestReq,
): Promise<InvoiceProjectSwitchSupportVOArray> {
  let result = await sdk.post<InvoiceProjectSwitchSupportVOArray>(
    '/account/invoice/switch',

    {
      ...switchRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据公司ID查询商家所有开票项
 *
 */
async function findAllInvoiceProject(
  companyInfoId: IFindAllInvoiceProjectCompanyInfoIdReq,
): Promise<InvoiceProjectListVOArray> {
  let result = await sdk.get<InvoiceProjectListVOArray>(
    '/account/invoiceProjects/{companyInfoId}'.replace('{companyInfoId}', companyInfoId + ''),

    {},
  );
  return result.context;
}

export default {
  queryProjectSwitchByIds,

  findAllInvoiceProject,
};

/**
 * 内容
 */
export type InvoiceProjectSwitchSupportVOArray = InvoiceProjectSwitchSupportVO[];
/**
 * 内容
 */
export type InvoiceProjectListVOArray = InvoiceProjectListVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectSwitchSupportVOArray".
 */
export type InvoiceProjectSwitchSupportVOArray1 = InvoiceProjectSwitchSupportVO2[];
/**
 * 商家公司ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindAllInvoiceProjectCompanyInfoIdReq".
 */
export type IFindAllInvoiceProjectCompanyInfoIdReq = number;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectListVOArray".
 */
export type InvoiceProjectListVOArray1 = InvoiceProjectListVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectSwitchListSupportByCompanyInfoIdRequest".
 */
export interface InvoiceProjectSwitchListSupportByCompanyInfoIdRequest {
  /**
   * 批量公司信息Id
   */
  companyInfoIds?: number[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«InvoiceProjectSwitchSupportVO»»".
 */
export interface BaseResponseListInvoiceProjectSwitchSupportVO {
  /**
   * 结果码
   */
  code: string;
  context?: InvoiceProjectSwitchSupportVOArray;
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
export interface InvoiceProjectSwitchSupportVO {
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 是否支持开票
   * * NO: 否
   * * YES: 是
   */
  supportInvoice?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectSwitchSupportVO".
 */
export interface InvoiceProjectSwitchSupportVO1 {
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 是否支持开票
   * * NO: 否
   * * YES: 是
   */
  supportInvoice?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«InvoiceProjectListVO»»".
 */
export interface BaseResponseListInvoiceProjectListVO {
  /**
   * 结果码
   */
  code: string;
  context?: InvoiceProjectListVOArray;
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
export interface InvoiceProjectListVO {
  /**
   * 开票项id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项目修改时间
   */
  projectUpdateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectListVO".
 */
export interface InvoiceProjectListVO1 {
  /**
   * 开票项id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项目修改时间
   */
  projectUpdateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryProjectSwitchByIdsSwitchRequestReq".
 */
export interface IQueryProjectSwitchByIdsSwitchRequestReq {
  /**
   * 批量公司信息Id
   */
  companyInfoIds?: number[];
  [k: string]: any;
}
export interface InvoiceProjectSwitchSupportVO2 {
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 是否支持开票
   * * NO: 否
   * * YES: 是
   */
  supportInvoice?: 0 | 1;
  [k: string]: any;
}
export interface InvoiceProjectListVO2 {
  /**
   * 开票项id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项目修改时间
   */
  projectUpdateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
