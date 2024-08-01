import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsEvaluateController';

/**
 *
 * 添加商品评价
 *
 */
async function addGoodsEvaluate(evaluateAddRequest: IAddGoodsEvaluateEvaluateAddRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goodsEvaluate/add',

    {
      ...evaluateAddRequest,
    },
  );
  return result.context;
}

/**
 *
 * 修改商品评价
 *
 */
async function editGoodsEvaluate(modifyRequest: IEditGoodsEvaluateModifyRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/goodsEvaluate/edit',

    {
      ...modifyRequest,
    },
  );
  return result.context;
}

/**
 *
 * 获取商品评价详情
 *
 */
async function getCustomerGoodsEvaluate(
  goodsEvaluateByIdRequest: IGetCustomerGoodsEvaluateGoodsEvaluateByIdRequestReq,
): Promise<GoodsEvaluateVO> {
  let result = await sdk.post<GoodsEvaluateVO>(
    '/goodsEvaluate/getCustomerGoodsEvaluate',

    {
      ...goodsEvaluateByIdRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查看商品评价
 *
 */
async function evaluateInfo(request: IEvaluateInfoRequestReq): Promise<EvaluateInfoResponse> {
  let result = await sdk.post<EvaluateInfoResponse>(
    '/goodsEvaluate/getEvaluate',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 添加商品评价
 *
 */
async function getGoodsAndStore(
  queryGoodsAndStoreRequest: IGetGoodsAndStoreQueryGoodsAndStoreRequestReq,
): Promise<GoodsEvaluateQueryGoodsAndStoreResponse> {
  let result = await sdk.post<GoodsEvaluateQueryGoodsAndStoreResponse>(
    '/goodsEvaluate/getGoodsAndStore',

    {
      ...queryGoodsAndStoreRequest,
    },
  );
  return result.context;
}

/**
 *
 * 商品详情晒图列表
 *
 */
async function getGoodsEvaluateImg(req: IGetGoodsEvaluateImgReqReq): Promise<GoodsEvaluateImagePageResponse> {
  let result = await sdk.post<GoodsEvaluateImagePageResponse>(
    '/goodsEvaluate/getGoodsEvaluateImg',

    {
      ...req,
    },
  );
  return result.context;
}

/**
 *
 * 获取已评价商品数量
 *
 */
async function getGoodsEvaluateNum(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/goodsEvaluate/getGoodsEvaluateNum',

    {},
  );
  return result.context;
}

/**
 *
 * 获取某店铺某商品评价总数数量
 *
 */
async function getStoreGoodsEvaluateNum(
  goodsId: IGetStoreGoodsEvaluateNumGoodsIdReq,
): Promise<GoodsDetailEvaluateResp> {
  let result = await sdk.get<GoodsDetailEvaluateResp>(
    '/goodsEvaluate/getStoreGoodsEvaluateNum/{goodsId}'.replace('{goodsId}', goodsId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询商品评价列表
 *
 */
async function page(goodsEvaluatePageRequest: IPageGoodsEvaluatePageRequestReq): Promise<GoodsEvaluatePageResponse> {
  let result = await sdk.post<GoodsEvaluatePageResponse>(
    '/goodsEvaluate/page',

    {
      ...goodsEvaluatePageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询spu评价列表
 *
 */
async function spuGoodsEvaluatePage(request: ISpuGoodsEvaluatePageRequestReq): Promise<GoodsEvaluatePageResponse> {
  let result = await sdk.post<GoodsEvaluatePageResponse>(
    '/goodsEvaluate/spuGoodsEvaluatePage',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询spu评价列表
 *
 */
async function spuGoodsEvaluatePageLogin(
  request: ISpuGoodsEvaluatePageLoginRequestReq,
): Promise<GoodsEvaluatePageResponse> {
  let result = await sdk.post<GoodsEvaluatePageResponse>(
    '/goodsEvaluate/spuGoodsEvaluatePageLogin',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  addGoodsEvaluate,

  editGoodsEvaluate,

  getCustomerGoodsEvaluate,

  evaluateInfo,

  getGoodsAndStore,

  getGoodsEvaluateImg,

  getGoodsEvaluateNum,

  getStoreGoodsEvaluateNum,

  page,

  spuGoodsEvaluatePage,

  spuGoodsEvaluatePageLogin,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;
/**
 * goodsId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetStoreGoodsEvaluateNumGoodsIdReq".
 */
export type IGetStoreGoodsEvaluateNumGoodsIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateAddRequest".
 */
export interface EvaluateAddRequest {
  goodsEvaluateAddRequest?: GoodsEvaluateAddRequest;
  goodsEvaluateImageAddRequest?: GoodsEvaluateImageAddRequest[];
  storeEvaluateAddRequestList?: StoreEvaluateAddRequest;
  [k: string]: any;
}
export interface GoodsEvaluateAddRequest {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
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
export interface GoodsEvaluateImageAddRequest {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
export interface StoreEvaluateAddRequest {
  buyTime?: string;
  compositeScore?: number;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  goodsScore?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateAddRequest".
 */
export interface GoodsEvaluateAddRequest1 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateAnswer?: string;
  evaluateAnswerAccountName?: string;
  evaluateAnswerEmployeeId?: string;
  evaluateAnswerTime?: string;
  evaluateContent?: string;
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
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
 * via the `definition` "GoodsEvaluateImageAddRequest".
 */
export interface GoodsEvaluateImageAddRequest1 {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreEvaluateAddRequest".
 */
export interface StoreEvaluateAddRequest1 {
  buyTime?: string;
  compositeScore?: number;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  goodsScore?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateModifyRequest".
 */
export interface EvaluateModifyRequest {
  goodsEvaluateImageAddRequestList?: GoodsEvaluateImageAddRequest2[];
  goodsEvaluateModifyRequest?: GoodsEvaluateModifyRequest;
  [k: string]: any;
}
export interface GoodsEvaluateImageAddRequest2 {
  artworkUrl?: string;
  createTime?: string;
  delFlag?: number;
  evaluateId?: string;
  goodsId?: string;
  imageKey?: string;
  imageName?: string;
  isShow?: number;
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsEvaluateModifyRequest {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
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
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
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
 * via the `definition` "GoodsEvaluateModifyRequest".
 */
export interface GoodsEvaluateModifyRequest1 {
  buyTime?: string;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
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
  evaluateScore?: number;
  evaluateTime?: string;
  goodNum?: number;
  goodsId?: string;
  goodsImg?: string;
  goodsInfoId?: string;
  goodsInfoName?: string;
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
 * via the `definition` "GoodsEvaluateByIdRequest".
 */
export interface GoodsEvaluateByIdRequest {
  evaluateId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsEvaluateVO»".
 */
export interface BaseResponseGoodsEvaluateVO {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsEvaluateVO;
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
 * via the `definition` "GoodsEvaluateQueryGoodsAndStoreRequest".
 */
export interface GoodsEvaluateQueryGoodsAndStoreRequest {
  /**
   * 货品id
   */
  skuId?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 订单ID
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EvaluateInfoResponse»".
 */
export interface BaseResponseEvaluateInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EvaluateInfoResponse;
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
export interface EvaluateInfoResponse {
  /**
   * 订单时间
   */
  createTime?: string;
  /**
   * 商品评论信息-图片
   */
  goodsEvaluateImageVOS?: GoodsEvaluateImageVO2[];
  goodsEvaluateVO?: GoodsEvaluateVO3;
  storeEvaluateSumVO?: StoreEvaluateSumVO;
  storeEvaluateVO?: StoreEvaluateVO;
  storeVO?: StoreVO;
  /**
   * 订单ID
   */
  tid?: string;
  tradeVO?: TradeItemVO;
  [k: string]: any;
}
export interface GoodsEvaluateImageVO2 {
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
 * 商品评论信息
 */
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
 * 店铺评分聚合信息
 */
export interface StoreEvaluateSumVO {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * 店铺评分信息
 */
export interface StoreEvaluateVO {
  compositeScore?: number;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateId?: string;
  goodsScore?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * 店铺信息
 */
export interface StoreVO {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 公司信息
 */
export interface CompanyInfoVO {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO1[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface EmployeeVO {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: CompanyInfoVO1;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 商家
 */
export interface CompanyInfoVO1 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO1[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface StoreVO1 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 订单信息
 */
export interface TradeItemVO {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface CouponSettlementVO {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
export interface MarketingSettlementVO {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EvaluateInfoResponse".
 */
export interface EvaluateInfoResponse1 {
  /**
   * 订单时间
   */
  createTime?: string;
  /**
   * 商品评论信息-图片
   */
  goodsEvaluateImageVOS?: GoodsEvaluateImageVO2[];
  goodsEvaluateVO?: GoodsEvaluateVO3;
  storeEvaluateSumVO?: StoreEvaluateSumVO;
  storeEvaluateVO?: StoreEvaluateVO;
  storeVO?: StoreVO;
  /**
   * 订单ID
   */
  tid?: string;
  tradeVO?: TradeItemVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreEvaluateSumVO".
 */
export interface StoreEvaluateSumVO1 {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreEvaluateVO".
 */
export interface StoreEvaluateVO1 {
  compositeScore?: number;
  createPerson?: string;
  createTime?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;
  delFlag?: number;
  delPerson?: string;
  delTime?: string;
  evaluateId?: string;
  goodsScore?: number;
  logisticsScore?: number;
  orderNo?: string;
  serverScore?: number;
  storeId?: number;
  storeName?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreVO".
 */
export interface StoreVO2 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyInfoVO".
 */
export interface CompanyInfoVO2 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: StoreVO1[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EmployeeVO".
 */
export interface EmployeeVO1 {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: CompanyInfoVO1;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemVO".
 */
export interface TradeItemVO1 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponSettlementVO".
 */
export interface CouponSettlementVO1 {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingSettlementVO".
 */
export interface MarketingSettlementVO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * BUYOUT_PRICE: 3：一口价优惠活动
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsEvaluateQueryGoodsAndStoreResponse»".
 */
export interface BaseResponseGoodsEvaluateQueryGoodsAndStoreResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsEvaluateQueryGoodsAndStoreResponse;
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
export interface GoodsEvaluateQueryGoodsAndStoreResponse {
  /**
   * 订单时间
   */
  createTime?: string;
  /**
   * 订单商品是否已评价
   */
  goodsTobe?: number;
  storeEvaluateSumVO?: StoreEvaluateSumVO2;
  /**
   * 店铺服务是否已评价
   */
  storeTobe?: number;
  storeVO?: StoreVO3;
  /**
   * 订单ID
   */
  tid?: string;
  tradeVO?: TradeItemVO2;
  [k: string]: any;
}
/**
 * 店铺评分聚合信息
 */
export interface StoreEvaluateSumVO2 {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * 店铺信息
 */
export interface StoreVO3 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 订单信息
 */
export interface TradeItemVO2 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 积分价
   */
  buyPoint?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  enterPriseAuditState?: '0' | '1' | '2' | '3';
  enterPrisePrice?: number;
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateQueryGoodsAndStoreResponse".
 */
export interface GoodsEvaluateQueryGoodsAndStoreResponse1 {
  /**
   * 订单时间
   */
  createTime?: string;
  /**
   * 订单商品是否已评价
   */
  goodsTobe?: number;
  storeEvaluateSumVO?: StoreEvaluateSumVO2;
  /**
   * 店铺服务是否已评价
   */
  storeTobe?: number;
  storeVO?: StoreVO3;
  /**
   * 订单ID
   */
  tid?: string;
  tradeVO?: TradeItemVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateImgPageReq".
 */
export interface GoodsEvaluateImgPageReq {
  goodsId?: string;
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
 * via the `definition` "BaseResponse«GoodsEvaluateImagePageResponse»".
 */
export interface BaseResponseGoodsEvaluateImagePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsEvaluateImagePageResponse;
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
export interface GoodsEvaluateImagePageResponse {
  goodsEvaluateImageVOPage?: MicroServicePageGoodsEvaluateImageVO;
  [k: string]: any;
}
export interface MicroServicePageGoodsEvaluateImageVO {
  /**
   * 具体数据内容
   */
  content?: GoodsEvaluateImageVO3[];
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
export interface GoodsEvaluateImageVO3 {
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsEvaluateImagePageResponse".
 */
export interface GoodsEvaluateImagePageResponse1 {
  goodsEvaluateImageVOPage?: MicroServicePageGoodsEvaluateImageVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GoodsEvaluateImageVO»".
 */
export interface MicroServicePageGoodsEvaluateImageVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsEvaluateImageVO3[];
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
 * via the `definition` "BaseResponse«long»".
 */
export interface BaseResponseLong {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: number;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsDetailEvaluateResp»".
 */
export interface BaseResponseGoodsDetailEvaluateResp {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsDetailEvaluateResp;
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
export interface GoodsDetailEvaluateResp {
  countResponse?: GoodsEvaluateCountResponse;
  imagePageResponse?: GoodsEvaluateImagePageResponse2;
  [k: string]: any;
}
export interface GoodsEvaluateCountResponse {
  evaluateConut?: number;
  postOrderCount?: number;
  praise?: string;
  [k: string]: any;
}
export interface GoodsEvaluateImagePageResponse2 {
  goodsEvaluateImageVOPage?: MicroServicePageGoodsEvaluateImageVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsDetailEvaluateResp".
 */
export interface GoodsDetailEvaluateResp1 {
  countResponse?: GoodsEvaluateCountResponse;
  imagePageResponse?: GoodsEvaluateImagePageResponse2;
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
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort4;
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
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort4 {
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
  content?: GoodsEvaluateVO4[];
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
  sort?: Sort5;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GoodsEvaluateVO4 {
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
export interface Sort5 {
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
  content?: GoodsEvaluateVO4[];
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
  sort?: Sort5;
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
 * via the `definition` "IAddGoodsEvaluateEvaluateAddRequestReq".
 */
export interface IAddGoodsEvaluateEvaluateAddRequestReq {
  goodsEvaluateAddRequest?: GoodsEvaluateAddRequest;
  goodsEvaluateImageAddRequest?: GoodsEvaluateImageAddRequest[];
  storeEvaluateAddRequestList?: StoreEvaluateAddRequest;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEditGoodsEvaluateModifyRequestReq".
 */
export interface IEditGoodsEvaluateModifyRequestReq {
  goodsEvaluateImageAddRequestList?: GoodsEvaluateImageAddRequest2[];
  goodsEvaluateModifyRequest?: GoodsEvaluateModifyRequest;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCustomerGoodsEvaluateGoodsEvaluateByIdRequestReq".
 */
export interface IGetCustomerGoodsEvaluateGoodsEvaluateByIdRequestReq {
  evaluateId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEvaluateInfoRequestReq".
 */
export interface IEvaluateInfoRequestReq {
  /**
   * 货品id
   */
  skuId?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 订单ID
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGoodsAndStoreQueryGoodsAndStoreRequestReq".
 */
export interface IGetGoodsAndStoreQueryGoodsAndStoreRequestReq {
  /**
   * 货品id
   */
  skuId?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 订单ID
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGoodsEvaluateImgReqReq".
 */
export interface IGetGoodsEvaluateImgReqReq {
  goodsId?: string;
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
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageGoodsEvaluatePageRequestReq".
 */
export interface IPageGoodsEvaluatePageRequestReq {
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
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort4;
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
 * via the `definition` "ISpuGoodsEvaluatePageRequestReq".
 */
export interface ISpuGoodsEvaluatePageRequestReq {
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
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort4;
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
 * via the `definition` "ISpuGoodsEvaluatePageLoginRequestReq".
 */
export interface ISpuGoodsEvaluatePageLoginRequestReq {
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
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  sort?: Sort4;
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
