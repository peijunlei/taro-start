import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PresetSearchTermsQueryController';

/**
 *
 * listPresetSearchTerms
 *
 */
async function listPresetSearchTerms(): Promise<PresetSearchTermsQueryResponse> {
  let result = await sdk.post<PresetSearchTermsQueryResponse>(
    '/preset_search_terms/list',

    {},
  );
  return result.context;
}

export default {
  listPresetSearchTerms,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PresetSearchTermsQueryResponse»".
 */
export interface BaseResponsePresetSearchTermsQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PresetSearchTermsQueryResponse;
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
export interface PresetSearchTermsQueryResponse {
  /**
   * 新增预置搜索词信息
   */
  presetSearchTermsVO?: PresetSearchTermsVO[];
  [k: string]: any;
}
export interface PresetSearchTermsVO {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 预置搜索词字
   */
  presetSearchKeyword?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PresetSearchTermsQueryResponse".
 */
export interface PresetSearchTermsQueryResponse1 {
  /**
   * 新增预置搜索词信息
   */
  presetSearchTermsVO?: PresetSearchTermsVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PresetSearchTermsVO".
 */
export interface PresetSearchTermsVO1 {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 预置搜索词字
   */
  presetSearchKeyword?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
