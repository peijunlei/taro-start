import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsRecommendBannerController';

/**
 *
 * 查询好货推荐banner
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<GoodsRecommendBannerListResponse> {
  let result = await sdk.post<GoodsRecommendBannerListResponse>(
    '/recommendBanner/getBanners',

    {
      ...listReq,
    },
  );
  return result.context;
}

export default {
  getList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsRecommendBannerListRequest".
 */
export interface GoodsRecommendBannerListRequest {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * bannerSort
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * delPerson
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 主键
   */
  recommendBannerId?: string;
  /**
   * 批量查询-主键List
   */
  recommendBannerIdList?: string[];
  /**
   * route
   */
  route?: string;
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
   * 状态：0未启用，1启用
   */
  state?: number;
  token?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * url
   */
  url?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsRecommendBannerListResponse»".
 */
export interface BaseResponseGoodsRecommendBannerListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsRecommendBannerListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GoodsRecommendBannerListResponse {
  /**
   * 好货推荐banner表列表结果
   */
  goodsRecommendBannerVOList?: GoodsRecommendBannerVO[];
  [k: string]: any;
}
export interface GoodsRecommendBannerVO {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * bannerSort
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * delPerson
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  recommendBannerId?: string;
  /**
   * route
   */
  route?: string;
  /**
   * 状态：0未启用，1启用
   */
  state?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * url
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsRecommendBannerListResponse".
 */
export interface GoodsRecommendBannerListResponse1 {
  /**
   * 好货推荐banner表列表结果
   */
  goodsRecommendBannerVOList?: GoodsRecommendBannerVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsRecommendBannerVO".
 */
export interface GoodsRecommendBannerVO1 {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * bannerSort
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * delPerson
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  recommendBannerId?: string;
  /**
   * route
   */
  route?: string;
  /**
   * 状态：0未启用，1启用
   */
  state?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * url
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * bannerSort
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * delPerson
   */
  delPerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 主键
   */
  recommendBannerId?: string;
  /**
   * 批量查询-主键List
   */
  recommendBannerIdList?: string[];
  /**
   * route
   */
  route?: string;
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
   * 状态：0未启用，1启用
   */
  state?: number;
  token?: string;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * url
   */
  url?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
