import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ArticleSubjectWebController';

/**
 *
 * 根据subjectId获取专题信息
 *
 */
async function getById(id: IGetByIdIdReq): Promise<ArticleSubjectByIdResponse> {
  let result = await sdk.get<ArticleSubjectByIdResponse>(
    '/articlesubject/web/getById/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  getById,
};

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdIdReq".
 */
export type IGetByIdIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleSubjectByIdResponse»".
 */
export interface BaseResponseArticleSubjectByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleSubjectByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleSubjectByIdResponse {
  articleSubjectVO?: ArticleSubjectVO;
  [k: string]: any;
}
/**
 * 专题管理信息
 */
export interface ArticleSubjectVO {
  /**
   * 专题名称
   */
  articleSubjecName?: string;
  /**
   * 友课专题id
   */
  articleSubjectId?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleSubjectByIdResponse".
 */
export interface ArticleSubjectByIdResponse1 {
  articleSubjectVO?: ArticleSubjectVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleSubjectVO".
 */
export interface ArticleSubjectVO1 {
  /**
   * 专题名称
   */
  articleSubjecName?: string;
  /**
   * 友课专题id
   */
  articleSubjectId?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
