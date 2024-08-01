import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'VASSettingController';

/**
 *
 * 查询所有增值服务
 *
 */
async function queryAllVAS(): Promise<VASSettingResponse> {
  let result = await sdk.get<VASSettingResponse>(
    '/vas/setting/list',

    {},
  );
  return result.context;
}

export default {
  queryAllVAS,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«VASSettingResponse»".
 */
export interface BaseResponseVASSettingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: VASSettingResponse;
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
export interface VASSettingResponse {
  /**
   * 购买的增值服务列表
   */
  services?: VASEntity[];
  [k: string]: any;
}
export interface VASEntity {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "VASSettingResponse".
 */
export interface VASSettingResponse1 {
  /**
   * 购买的增值服务列表
   */
  services?: VASEntity[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "VASEntity".
 */
export interface VASEntity1 {
  /**
   * 服务名
   * * VAS_CRM_SETTING: 增值服务-CRM-设置
   * * VAS_SAAS_SETTING: 增值服务-Saas-设置
   * * VAS_IEP_SETTING: 增值服务-企业购-设置
   */
  serviceName?: 'vas_crm_setting' | 'vas_saas_setting' | 'vas_iep_setting';
  /**
   * 服务状态
   */
  serviceStatus?: boolean;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
