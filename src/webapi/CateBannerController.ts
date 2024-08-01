import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CateBannerController';

/**
 *
 * 查询一级分类banner
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<CateBannerListResponse> {
  let result = await sdk.post<CateBannerListResponse>(
    '/cateBanner/getBanners',

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
 * via the `definition` "CateBannerListRequest".
 */
export interface CateBannerListRequest {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * banner主键
   */
  cateBannerId?: string;
  /**
   * 批量查询-banner主键List
   */
  cateBannerIdList?: string[];
  /**
   * 一级分类id
   */
  cateId?: number;
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
   * 删除人id
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
   * APP路由
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
   * H5链接
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
 * via the `definition` "BaseResponse«CateBannerListResponse»".
 */
export interface BaseResponseCateBannerListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CateBannerListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CateBannerListResponse {
  /**
   * 分类banner表列表结果
   */
  cateBannerVOList?: CateBannerVO[];
  [k: string]: any;
}
export interface CateBannerVO {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * banner主键
   */
  cateBannerId?: string;
  /**
   * 一级分类id
   */
  cateId?: number;
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
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * APP路由
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
   * H5链接
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CateBannerListResponse".
 */
export interface CateBannerListResponse1 {
  /**
   * 分类banner表列表结果
   */
  cateBannerVOList?: CateBannerVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CateBannerVO".
 */
export interface CateBannerVO1 {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * banner主键
   */
  cateBannerId?: string;
  /**
   * 一级分类id
   */
  cateId?: number;
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
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * APP路由
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
   * H5链接
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
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * banner主键
   */
  cateBannerId?: string;
  /**
   * 批量查询-banner主键List
   */
  cateBannerIdList?: string[];
  /**
   * 一级分类id
   */
  cateId?: number;
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
   * 删除人id
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
   * APP路由
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
   * H5链接
   */
  url?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
