import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'search-associational-word-query-controller';

/**
 *
 * 模糊搜索词查询
 *
 */
async function likeAssociationalWord(
  request: ILikeAssociationalWordRequestReq,
): Promise<AssociationLongTailWordLikeResponse> {
  let result = await sdk.post<AssociationLongTailWordLikeResponse>(
    '/search_associational_word/like_associational_word',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  likeAssociationalWord,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AssociationLongTailWordLikeRequest".
 */
export interface AssociationLongTailWordLikeRequest {
  /**
   * 联想词
   */
  associationalWord?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AssociationLongTailWordLikeResponse»".
 */
export interface BaseResponseAssociationLongTailWordLikeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AssociationLongTailWordLikeResponse;
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
export interface AssociationLongTailWordLikeResponse {
  /**
   * 已保存联想词信息
   */
  associationLongTailWordVOList?: AssociationLongTailLikeWordVO[];
  [k: string]: any;
}
export interface AssociationLongTailLikeWordVO {
  /**
   * 主键id
   */
  associationLongTailWordId?: number;
  /**
   * 联想词
   */
  associationalWord?: string;
  /**
   * 长尾词
   */
  longTailWord?: string[];
  /**
   * 关联搜索词id
   */
  searchAssociationalWordId?: number;
  /**
   * 排序号
   */
  sortNumber?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AssociationLongTailWordLikeResponse".
 */
export interface AssociationLongTailWordLikeResponse1 {
  /**
   * 已保存联想词信息
   */
  associationLongTailWordVOList?: AssociationLongTailLikeWordVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AssociationLongTailLikeWordVO".
 */
export interface AssociationLongTailLikeWordVO1 {
  /**
   * 主键id
   */
  associationLongTailWordId?: number;
  /**
   * 联想词
   */
  associationalWord?: string;
  /**
   * 长尾词
   */
  longTailWord?: string[];
  /**
   * 关联搜索词id
   */
  searchAssociationalWordId?: number;
  /**
   * 排序号
   */
  sortNumber?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ILikeAssociationalWordRequestReq".
 */
export interface ILikeAssociationalWordRequestReq {
  /**
   * 联想词
   */
  associationalWord?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
