import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GroupCateWebController';

/**
 *
 * 查询关注的友群分类信息
 *
 */
async function findFollowGroupCate(): Promise<GroupCateListByFollowResponse> {
  let result = await sdk.get<GroupCateListByFollowResponse>(
    '/group/cate/web/follow/info',

    {},
  );
  return result.context;
}

/**
 *
 * 查询最热友群分类信息
 *
 */
async function findHotGroupCate(): Promise<GroupCateHotResponse> {
  let result = await sdk.get<GroupCateHotResponse>(
    '/group/cate/web/hot/info',

    {},
  );
  return result.context;
}

/**
 *
 * 查询友群分类
 *
 */
async function info(
  groupCateId: IInfoGroupCateIdReq,
): Promise<GroupCateGetByGroupCateIdResponse> {
  let result = await sdk.get<GroupCateGetByGroupCateIdResponse>(
    '/group/cate/web/info/{groupCateId}'.replace(
      '{groupCateId}',
      groupCateId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询友群分类信息
 *
 */
async function findGroupCateList(): Promise<GroupCateListResponse> {
  let result = await sdk.get<GroupCateListResponse>(
    '/group/cate/web/list',

    {},
  );
  return result.context;
}

/**
 *
 * 查询推荐的友群分类信息
 *
 */
async function findRecommendGroupCate(): Promise<
  GroupCateListByRecommendResponse
> {
  let result = await sdk.get<GroupCateListByRecommendResponse>(
    '/group/cate/web/recommend/info',

    {},
  );
  return result.context;
}

export default {
  findFollowGroupCate,

  findHotGroupCate,

  info,

  findGroupCateList,

  findRecommendGroupCate,
};

/**
 * 友群分类id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInfoGroupCateIdReq".
 */
export type IInfoGroupCateIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateListByFollowResponse»".
 */
export interface BaseResponseGroupCateListByFollowResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateListByFollowResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateListByFollowResponse {
  /**
   * 友群分类表列表结果
   */
  groupCateVOList?: GroupCateVO[];
  [k: string]: any;
}
export interface GroupCateVO {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateListByFollowResponse".
 */
export interface GroupCateListByFollowResponse1 {
  /**
   * 友群分类表列表结果
   */
  groupCateVOList?: GroupCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateVO".
 */
export interface GroupCateVO1 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateHotResponse»".
 */
export interface BaseResponseGroupCateHotResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateHotResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateHotResponse {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateHotResponse".
 */
export interface GroupCateHotResponse1 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateGetByGroupCateIdResponse»".
 */
export interface BaseResponseGroupCateGetByGroupCateIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateGetByGroupCateIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateGetByGroupCateIdResponse {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateGetByGroupCateIdResponse".
 */
export interface GroupCateGetByGroupCateIdResponse1 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateListResponse»".
 */
export interface BaseResponseGroupCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateListResponse {
  /**
   * 友群分类列表
   */
  list?: GroupCateVO2[];
  [k: string]: any;
}
export interface GroupCateVO2 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateListResponse".
 */
export interface GroupCateListResponse1 {
  /**
   * 友群分类列表
   */
  list?: GroupCateVO2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateListByRecommendResponse»".
 */
export interface BaseResponseGroupCateListByRecommendResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateListByRecommendResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateListByRecommendResponse {
  /**
   * 友群分类表列表结果
   */
  groupCateVOList?: GroupCateVO3[];
  [k: string]: any;
}
export interface GroupCateVO3 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateListByRecommendResponse".
 */
export interface GroupCateListByRecommendResponse1 {
  /**
   * 友群分类表列表结果
   */
  groupCateVOList?: GroupCateVO3[];
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
