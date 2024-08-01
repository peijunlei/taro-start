import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GrouponCateBaseController';

/**
 *
 * 列表查询拼团分类信息
 *
 */
async function findGrouponCateList(): Promise<GrouponCateListResponse> {
  let result = await sdk.get<GrouponCateListResponse>(
    '/groupon/cate/list',

    {},
  );
  return result.context;
}

export default {
  findGrouponCateList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponCateListResponse»".
 */
export interface BaseResponseGrouponCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponCateListResponse;
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
export interface GrouponCateListResponse {
  grouponCateVOList?: GrouponCateVO[];
  [k: string]: any;
}
export interface GrouponCateVO {
  /**
   * 是否是默认精选分类 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  defaultCate?: 0 | 1;
  /**
   * 拼团分类Id
   */
  grouponCateId?: string;
  /**
   * 拼团分类名称
   */
  grouponCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponCateListResponse".
 */
export interface GrouponCateListResponse1 {
  grouponCateVOList?: GrouponCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponCateVO".
 */
export interface GrouponCateVO1 {
  /**
   * 是否是默认精选分类 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  defaultCate?: 0 | 1;
  /**
   * 拼团分类Id
   */
  grouponCateId?: string;
  /**
   * 拼团分类名称
   */
  grouponCateName?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
