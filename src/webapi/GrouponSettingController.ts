import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GrouponSettingController';

/**
 *
 * findOne
 *
 */
async function findOne(): Promise<GrouponSettingPageResponse> {
  let result = await sdk.get<GrouponSettingPageResponse>(
    '/groupon/setting/info',

    {},
  );
  return result.context;
}

export default {
  findOne,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponSettingPageResponse»".
 */
export interface BaseResponseGrouponSettingPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponSettingPageResponse;
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
export interface GrouponSettingPageResponse {
  grouponSettingVO?: GrouponSettingVO;
  [k: string]: any;
}
export interface GrouponSettingVO {
  /**
   * 广告
   */
  advert?: string;
  /**
   * 拼团商品审核
   * * NO: 否
   * * YES: 是
   */
  goodsAuditFlag?: 0 | 1;
  /**
   * 主键
   */
  id?: string;
  /**
   * 拼团规则
   */
  rule?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponSettingPageResponse".
 */
export interface GrouponSettingPageResponse1 {
  grouponSettingVO?: GrouponSettingVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponSettingVO".
 */
export interface GrouponSettingVO1 {
  /**
   * 广告
   */
  advert?: string;
  /**
   * 拼团商品审核
   * * NO: 否
   * * YES: 是
   */
  goodsAuditFlag?: 0 | 1;
  /**
   * 主键
   */
  id?: string;
  /**
   * 拼团规则
   */
  rule?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
