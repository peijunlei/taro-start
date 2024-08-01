import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'EnterpriseInfoBaseController';

/**
 *
 * 查询企业信息
 *
 */
async function getEnterpriseInfo(): Promise<
  EnterpriseInfoByCustomerIdResponse
> {
  let result = await sdk.get<EnterpriseInfoByCustomerIdResponse>(
    '/enterpriseInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 更新企业信息
 *
 */
async function updateEnterpriseInfo(
  request: IUpdateEnterpriseInfoRequestReq,
): Promise<EnterpriseInfoModifyResponse> {
  let result = await sdk.put<EnterpriseInfoModifyResponse>(
    '/enterpriseInfo',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getEnterpriseInfo,

  updateEnterpriseInfo,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EnterpriseInfoByCustomerIdResponse»".
 */
export interface BaseResponseEnterpriseInfoByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EnterpriseInfoByCustomerIdResponse;
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
export interface EnterpriseInfoByCustomerIdResponse {
  enterpriseInfoVO?: EnterpriseInfoVO;
  [k: string]: any;
}
/**
 * 企业信息表信息
 */
export interface EnterpriseInfoVO {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 营业执照地址
   */
  businessLicenseUrl?: string;
  /**
   * 企业性质
   */
  businessNatureType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 企业Id
   */
  enterpriseId?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 统一社会信用代码
   */
  socialCreditCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EnterpriseInfoByCustomerIdResponse".
 */
export interface EnterpriseInfoByCustomerIdResponse1 {
  enterpriseInfoVO?: EnterpriseInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EnterpriseInfoVO".
 */
export interface EnterpriseInfoVO1 {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 营业执照地址
   */
  businessLicenseUrl?: string;
  /**
   * 企业性质
   */
  businessNatureType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 企业Id
   */
  enterpriseId?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 统一社会信用代码
   */
  socialCreditCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EnterpriseInfoModifyForWebRequest".
 */
export interface EnterpriseInfoModifyForWebRequest {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EnterpriseInfoModifyResponse»".
 */
export interface BaseResponseEnterpriseInfoModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EnterpriseInfoModifyResponse;
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
export interface EnterpriseInfoModifyResponse {
  enterpriseInfoVO?: EnterpriseInfoVO2;
  [k: string]: any;
}
/**
 * 已修改的企业信息表信息
 */
export interface EnterpriseInfoVO2 {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 营业执照地址
   */
  businessLicenseUrl?: string;
  /**
   * 企业性质
   */
  businessNatureType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 企业Id
   */
  enterpriseId?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 统一社会信用代码
   */
  socialCreditCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EnterpriseInfoModifyResponse".
 */
export interface EnterpriseInfoModifyResponse1 {
  enterpriseInfoVO?: EnterpriseInfoVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateEnterpriseInfoRequestReq".
 */
export interface IUpdateEnterpriseInfoRequestReq {
  /**
   * 企业人数 0：1-49，1：50-99，2：100-499，3：500-999，4：1000以上
   */
  businessEmployeeNum?: number;
  /**
   * 企业行业
   */
  businessIndustryType?: number;
  /**
   * 企业会员id
   */
  customerId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
