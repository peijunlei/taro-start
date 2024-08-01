import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerShareRecordController';

/**
 *
 * 新增会员分享记录
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerShareRecordAddResponse> {
  let result = await sdk.post<CustomerShareRecordAddResponse>(
    '/customersharerecord/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询会员分享记录
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CustomerShareRecordListResponse> {
  let result = await sdk.post<CustomerShareRecordListResponse>(
    '/customersharerecord/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询会员分享记录
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerShareRecordPageResponse> {
  let result = await sdk.post<CustomerShareRecordPageResponse>(
    '/customersharerecord/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询会员分享记录
 *
 */
async function getById(
  shareId: IGetByIdShareIdReq,
): Promise<CustomerShareRecordByIdResponse> {
  let result = await sdk.get<CustomerShareRecordByIdResponse>(
    '/customersharerecord/{shareId}'.replace('{shareId}', shareId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  getList,

  getPage,

  getById,
};

/**
 * shareId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdShareIdReq".
 */
export type IGetByIdShareIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordAddRequest".
 */
export interface CustomerShareRecordAddRequest {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerShareRecordAddResponse»".
 */
export interface BaseResponseCustomerShareRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerShareRecordAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerShareRecordAddResponse {
  customerShareRecordVO?: CustomerShareRecordVO;
  [k: string]: any;
}
/**
 * 已新增的会员分享记录信息
 */
export interface CustomerShareRecordVO {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordAddResponse".
 */
export interface CustomerShareRecordAddResponse1 {
  customerShareRecordVO?: CustomerShareRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordVO".
 */
export interface CustomerShareRecordVO1 {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordListRequest".
 */
export interface CustomerShareRecordListRequest {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 批量查询-idList
   */
  shareIdList?: string[];
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 搜索条件:分享时间开始
   */
  shareTimeBegin?: string;
  /**
   * 搜索条件:分享时间截止
   */
  shareTimeEnd?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerShareRecordListResponse»".
 */
export interface BaseResponseCustomerShareRecordListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerShareRecordListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerShareRecordListResponse {
  /**
   * 会员分享记录列表结果
   */
  customerShareRecordVOList?: CustomerShareRecordVO2[];
  [k: string]: any;
}
export interface CustomerShareRecordVO2 {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordListResponse".
 */
export interface CustomerShareRecordListResponse1 {
  /**
   * 会员分享记录列表结果
   */
  customerShareRecordVOList?: CustomerShareRecordVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordPageRequest".
 */
export interface CustomerShareRecordPageRequest {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 批量查询-idList
   */
  shareIdList?: string[];
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 搜索条件:分享时间开始
   */
  shareTimeBegin?: string;
  /**
   * 搜索条件:分享时间截止
   */
  shareTimeEnd?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerShareRecordPageResponse»".
 */
export interface BaseResponseCustomerShareRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerShareRecordPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerShareRecordPageResponse {
  customerShareRecordVOPage?: MicroServicePageCustomerShareRecordVO;
  [k: string]: any;
}
/**
 * 会员分享记录分页结果
 */
export interface MicroServicePageCustomerShareRecordVO {
  /**
   * 具体数据内容
   */
  content?: CustomerShareRecordVO3[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CustomerShareRecordVO3 {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordPageResponse".
 */
export interface CustomerShareRecordPageResponse1 {
  customerShareRecordVOPage?: MicroServicePageCustomerShareRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerShareRecordVO»".
 */
export interface MicroServicePageCustomerShareRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerShareRecordVO3[];
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
  sort?: Sort;
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
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerShareRecordByIdResponse»".
 */
export interface BaseResponseCustomerShareRecordByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerShareRecordByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerShareRecordByIdResponse {
  customerShareRecordVO?: CustomerShareRecordVO4;
  [k: string]: any;
}
/**
 * 会员分享记录信息
 */
export interface CustomerShareRecordVO4 {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerShareRecordByIdResponse".
 */
export interface CustomerShareRecordByIdResponse1 {
  customerShareRecordVO?: CustomerShareRecordVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 分享时间
   */
  shareTime?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 批量查询-idList
   */
  shareIdList?: string[];
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 搜索条件:分享时间开始
   */
  shareTimeBegin?: string;
  /**
   * 搜索条件:分享时间截止
   */
  shareTimeEnd?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 分享人ID
   */
  customerId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4;
  /**
   * id
   */
  shareId?: string;
  /**
   * 批量查询-idList
   */
  shareIdList?: string[];
  /**
   * 分享对象的名字
   */
  shareName?: string;
  /**
   * 分享对象的id
   */
  shareTargetId?: string;
  /**
   * 搜索条件:分享时间开始
   */
  shareTimeBegin?: string;
  /**
   * 搜索条件:分享时间截止
   */
  shareTimeEnd?: string;
  /**
   * 分享类型：0商品，1文章，2视频，3音频，4店铺，5优惠券
   * * GOODS: 商品
   * * ARTICLE: 文章
   * * VIDEO: 视频
   * * AUDIO: 音频
   * * SHOP: 店铺
   * * COUPON: 优惠券
   */
  shareType?: 0 | 1 | 2 | 3 | 4 | 5;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
