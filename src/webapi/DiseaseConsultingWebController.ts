import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DiseaseConsultingWebController';

/**
 *
 * 查询常见病症
 *
 */
async function commonSymptom(
  symptomPageReq: ICommonSymptomSymptomPageReqReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/diseaseConsulting/commonSymptom',

    {
      ...symptomPageReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询疾病百科
 *
 */
async function queryDiseaseInfo(
  queryRequest: IQueryDiseaseInfoQueryRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/diseaseConsulting/queryDiseaseInfo',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询疾病百科详情
 *
 */
async function queryDiseaseInfoDetail(
  diseaseInfoByIdRequest: IQueryDiseaseInfoDetailDiseaseInfoByIdRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/diseaseConsulting/queryDiseaseInfoDetail',

    {
      ...diseaseInfoByIdRequest,
    },
  );
  return result.context;
}

/**
 *
 * 病症联想
 *
 */
async function symptomSuggest(
  symptomPageReq: ISymptomSuggestSymptomPageReqReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/diseaseConsulting/symptomSuggest',

    {
      ...symptomPageReq,
    },
  );
  return result.context;
}

export default {
  commonSymptom,

  queryDiseaseInfo,

  queryDiseaseInfoDetail,

  symptomSuggest,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SymptomPageRequest".
 */
export interface SymptomPageRequest {
  /**
   * 是否常见
   * * NO: 否
   * * YES: 是
   */
  commonFlag?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 症状联想
   */
  keyword?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 症状等级
   */
  symptomGrade?: number;
  /**
   * 症状编号
   */
  symptomId?: string;
  /**
   * 批量查询-症状编号List
   */
  symptomIdList?: string[];
  /**
   * 症状名称
   */
  symptomName?: string;
  /**
   * 父症状编号
   */
  symptomParentId?: string;
  /**
   * 症状排序
   */
  symptomSort?: number;
  token?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse".
 */
export interface BaseResponse {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsDiseaseQueryInfoRequest".
 */
export interface EsDiseaseQueryInfoRequest {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 疾病百科id列表
   */
  idList?: string[];
  /**
   * 查询值
   */
  keyword?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 排序参数
   */
  sorts?: SortBuilder[];
  /**
   * 症状id
   */
  symptomId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface AggregationBuilder {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
export interface SortBuilder {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AggregationBuilder".
 */
export interface AggregationBuilder1 {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SortBuilder".
 */
export interface SortBuilder1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DiseaseInfoByIdRequest".
 */
export interface DiseaseInfoByIdRequest {
  /**
   * id
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICommonSymptomSymptomPageReqReq".
 */
export interface ICommonSymptomSymptomPageReqReq {
  /**
   * 是否常见
   * * NO: 否
   * * YES: 是
   */
  commonFlag?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 症状联想
   */
  keyword?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 症状等级
   */
  symptomGrade?: number;
  /**
   * 症状编号
   */
  symptomId?: string;
  /**
   * 批量查询-症状编号List
   */
  symptomIdList?: string[];
  /**
   * 症状名称
   */
  symptomName?: string;
  /**
   * 父症状编号
   */
  symptomParentId?: string;
  /**
   * 症状排序
   */
  symptomSort?: number;
  token?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryDiseaseInfoQueryRequestReq".
 */
export interface IQueryDiseaseInfoQueryRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 疾病百科id列表
   */
  idList?: string[];
  /**
   * 查询值
   */
  keyword?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 排序参数
   */
  sorts?: SortBuilder[];
  /**
   * 症状id
   */
  symptomId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryDiseaseInfoDetailDiseaseInfoByIdRequestReq".
 */
export interface IQueryDiseaseInfoDetailDiseaseInfoByIdRequestReq {
  /**
   * id
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISymptomSuggestSymptomPageReqReq".
 */
export interface ISymptomSuggestSymptomPageReqReq {
  /**
   * 是否常见
   * * NO: 否
   * * YES: 是
   */
  commonFlag?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 症状联想
   */
  keyword?: string;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 症状等级
   */
  symptomGrade?: number;
  /**
   * 症状编号
   */
  symptomId?: string;
  /**
   * 批量查询-症状编号List
   */
  symptomIdList?: string[];
  /**
   * 症状名称
   */
  symptomName?: string;
  /**
   * 父症状编号
   */
  symptomParentId?: string;
  /**
   * 症状排序
   */
  symptomSort?: number;
  token?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
