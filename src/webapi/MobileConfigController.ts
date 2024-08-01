import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MobileConfigController';

/**
 *
 * 获取配置列表
 *
 */
async function listConfigs(): Promise<ConfigVOArray> {
  let result = await sdk.get<ConfigVOArray>(
    '/mobile/config/audit/list',

    {},
  );
  return result.context;
}

export default {
  listConfigs,
};

/**
 * 内容
 */
export type ConfigVOArray = ConfigVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConfigVOArray".
 */
export type ConfigVOArray1 = ConfigVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«ConfigVO»»".
 */
export interface BaseResponseListConfigVO {
  /**
   * 结果码
   */
  code: string;
  context?: ConfigVOArray;
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
export interface ConfigVO {
  /**
   * 配置键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConfigVO".
 */
export interface ConfigVO1 {
  /**
   * 配置键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface ConfigVO2 {
  /**
   * 配置键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
