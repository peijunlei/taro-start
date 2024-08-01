import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ExpressCompanyController';

/**
 *
 * 根据ID查询物流公司信息
 *
 */
async function findOne(expressCompanyId: IFindOneExpressCompanyIdReq): Promise<ExpressCompanyVO> {
  let result = await sdk.get<ExpressCompanyVO>(
    '/expressCompany/{expressCompanyId}'.replace('{expressCompanyId}', expressCompanyId + ''),

    {},
  );
  return result.context;
}

export default {
  findOne,
};

/**
 * 物流公司Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindOneExpressCompanyIdReq".
 */
export type IFindOneExpressCompanyIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ExpressCompanyVO»".
 */
export interface BaseResponseExpressCompanyVO {
  /**
   * 结果码
   */
  code: string;
  context?: ExpressCompanyVO;
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
export interface ExpressCompanyVO {
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 物流公司代码
   */
  expressCode?: string;
  /**
   * 主键ID,自增
   */
  expressCompanyId?: number;
  /**
   * 物流公司名称
   */
  expressName?: string;
  /**
   * 是否是用户新增 0：否 1：是
   */
  isAdd?: number;
  /**
   * 是否是常用物流公司 0：否 1：是
   */
  isChecked?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ExpressCompanyVO".
 */
export interface ExpressCompanyVO1 {
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 物流公司代码
   */
  expressCode?: string;
  /**
   * 主键ID,自增
   */
  expressCompanyId?: number;
  /**
   * 物流公司名称
   */
  expressName?: string;
  /**
   * 是否是用户新增 0：否 1：是
   */
  isAdd?: number;
  /**
   * 是否是常用物流公司 0：否 1：是
   */
  isChecked?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
