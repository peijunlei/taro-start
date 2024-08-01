import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'EvaluateController';

/**
 *
 * 商品评价分页数据
 *
 */
async function evaluatePage(pageRequest: IEvaluatePagePageRequestReq): Promise<GoodsEvaluatePageResponse> {
  let result = await sdk.post<GoodsEvaluatePageResponse>(
    '/goodsDetailEvaluate/evaluatePage',

    {
      ...pageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 商品评价分页数据
 *
 */
async function evaluatePageLogin(pageRequest: IEvaluatePageLoginPageRequestReq): Promise<GoodsEvaluatePageResponse> {
  let result = await sdk.post<GoodsEvaluatePageResponse>(
    '/goodsDetailEvaluate/evaluatePageLogin',

    {
      ...pageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 获取某店铺某商品评价总数数量、好评率、top3评价信息
 *
 */
async function top3EvaluateAndPraise(goodsId: ITop3EvaluateAndPraiseGoodsIdReq): Promise<GoodsDetailEvaluateTop3Resp> {
  let result = await sdk.get<GoodsDetailEvaluateTop3Resp>(
    '/goodsDetailEvaluate/top3EvaluateAndPraise/{goodsId}'.replace('{goodsId}', goodsId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 获取某店铺某商品评价总数数量、好评率、top3评价信息
 *
 */
async function top3EvaluateAndPraiseBySkuId(
  skuId: ITop3EvaluateAndPraiseSkuIdReq,
): Promise<GoodsDetailEvaluateTop3Resp> {
  let result = await sdk.get<GoodsDetailEvaluateTop3Resp>(
    '/goodsDetailEvaluate/top3EvaluateAndPraiseBySkuId/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

export default {
  evaluatePage,

  evaluatePageLogin,

  top3EvaluateAndPraise,

  top3EvaluateAndPraiseBySkuId,
};

/**
 * goodsId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITop3EvaluateAndPraiseGoodsIdReq".
 */
export type ITop3EvaluateAndPraiseGoodsIdReq = string;

/**
 * skuId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITop3EvaluateAndPraiseGoodsIdReq".
 */
export type ITop3EvaluateAndPraiseSkuIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluatePageRequest".
 */
export interface GoodsEvaluatePageRequest {
  beginTime?: string;
  createPerson?: string;
  createTimeBegin?: string;
  createTimeEnd?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTimeBegin?: string;
  delTimeEnd?: string;
  endTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTimeBegin?: string;
  evaluateAnswerTimeEnd?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateIdList?: string[];
  evaluateScore?: number;
  evaluateTimeBegin?: string;
  evaluateTimeEnd?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTimeBegin?: string;
  historyEvaluateAnswerTimeEnd?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTimeBegin?: string;
  historyEvaluateTimeEnd?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTimeBegin?: string;
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsEvaluatePageResponse»".
 */
export interface BaseResponseGoodsEvaluatePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsEvaluatePageResponse;
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
export interface GoodsEvaluatePageResponse {
  goodsEvaluateVOPage?: MicroServicePageGoodsEvaluateVO;
  [k: string]: any;
}
export interface MicroServicePageGoodsEvaluateVO {
  /**
   * 具体数据内容
   */
  content?: GoodsEvaluateVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GoodsEvaluateVO {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsEvaluateImageVO {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsEvaluate?: GoodsEvaluateVO1;
  goodsId?: string;
  imageId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsEvaluateVO1 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsImageVO {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluatePageResponse".
 */
export interface GoodsEvaluatePageResponse1 {
  goodsEvaluateVOPage?: MicroServicePageGoodsEvaluateVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GoodsEvaluateVO»".
 */
export interface MicroServicePageGoodsEvaluateVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsEvaluateVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateVO".
 */
export interface GoodsEvaluateVO2 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateImageVO".
 */
export interface GoodsEvaluateImageVO1 {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsEvaluate?: GoodsEvaluateVO1;
  goodsId?: string;
  imageId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsImageVO".
 */
export interface GoodsImageVO1 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
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
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsDetailEvaluateTop3Resp»".
 */
export interface BaseResponseGoodsDetailEvaluateTop3Resp {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsDetailEvaluateTop3Resp;
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
export interface GoodsDetailEvaluateTop3Resp {
  goodsEvaluateCountResponse?: GoodsEvaluateCountResponse;
  listResponse?: GoodsEvaluateListResponse;
  [k: string]: any;
}
export interface GoodsEvaluateCountResponse {
  evaluateConut?: number;
  postOrderCount?: number;
  praise?: string;
  [k: string]: any;
}
export interface GoodsEvaluateListResponse {
  goodsEvaluateVOList?: GoodsEvaluateVO3[];
  [k: string]: any;
}
export interface GoodsEvaluateVO3 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  /**
   * 会员标签
   */
  customerLabelList?: string[];
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateImageList?: GoodsEvaluateImageVO[];
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImages?: GoodsImageVO[];
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTime?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTime?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isPraise?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsDetailEvaluateTop3Resp".
 */
export interface GoodsDetailEvaluateTop3Resp1 {
  goodsEvaluateCountResponse?: GoodsEvaluateCountResponse;
  listResponse?: GoodsEvaluateListResponse;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateCountResponse".
 */
export interface GoodsEvaluateCountResponse1 {
  evaluateConut?: number;
  postOrderCount?: number;
  praise?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateListResponse".
 */
export interface GoodsEvaluateListResponse1 {
  goodsEvaluateVOList?: GoodsEvaluateVO3[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEvaluatePagePageRequestReq".
 */
export interface IEvaluatePagePageRequestReq {
  beginTime?: string;
  createPerson?: string;
  createTimeBegin?: string;
  createTimeEnd?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTimeBegin?: string;
  delTimeEnd?: string;
  endTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTimeBegin?: string;
  evaluateAnswerTimeEnd?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateIdList?: string[];
  evaluateScore?: number;
  evaluateTimeBegin?: string;
  evaluateTimeEnd?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTimeBegin?: string;
  historyEvaluateAnswerTimeEnd?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTimeBegin?: string;
  historyEvaluateTimeEnd?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTimeBegin?: string;
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEvaluatePageLoginPageRequestReq".
 */
export interface IEvaluatePageLoginPageRequestReq {
  beginTime?: string;
  createPerson?: string;
  createTimeBegin?: string;
  createTimeEnd?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTimeBegin?: string;
  delTimeEnd?: string;
  endTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTimeBegin?: string;
  evaluateAnswerTimeEnd?: string;
  evaluateContent?: string;
  evaluateId?: string;
  evaluateIdList?: string[];
  evaluateScore?: number;
  evaluateTimeBegin?: string;
  evaluateTimeEnd?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
  historyEvaluateAnswer?: string;
  historyEvaluateAnswerAccountName?: string;
  historyEvaluateAnswerEmployeeId?: string;
  historyEvaluateAnswerTimeBegin?: string;
  historyEvaluateAnswerTimeEnd?: string;
  historyEvaluateContent?: string;
  historyEvaluateScore?: number;
  historyEvaluateTimeBegin?: string;
  historyEvaluateTimeEnd?: string;
  isAnonymous?: number;
  isAnswer?: number;
  isEdit?: number;
  isShow?: number;
  isUpload?: number;
  orderNo?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
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
  specDetails?: string;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTimeBegin?: string;
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
