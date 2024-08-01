import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'HoverNavMobileController';

/**
 *
 * 店铺移动端悬浮导航栏
 *
 */
async function get(storeId: IGetStoreIdReq, usePageType: IGetUsePageTypeReq): Promise<HoverNavMobileByIdResponse> {
  let result = await sdk.get<HoverNavMobileByIdResponse>(
    '/hoverNavMobile/{storeId}/{usePageType}'

      .replace('{storeId}', storeId + '')

      .replace('{usePageType}', usePageType + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 平台移动端悬浮导航栏
 *
 */
async function getByMain(usePageType: IGetByMainUsePageTypeReq): Promise<HoverNavMobileByIdResponse> {
  let result = await sdk.get<HoverNavMobileByIdResponse>(
    '/hoverNavMobile/{usePageType}'.replace('{usePageType}', usePageType + ''),

    {},
  );
  return result.context;
}

export default {
  get,

  getByMain,
};

/**
 * storeId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetStoreIdReq".
 */
export type IGetStoreIdReq = number;
/**
 * usePageType
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetUsePageTypeReq".
 */
export type IGetUsePageTypeReq = number;
/**
 * usePageType
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByMainUsePageTypeReq".
 */
export type IGetByMainUsePageTypeReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«HoverNavMobileByIdResponse»".
 */
export interface BaseResponseHoverNavMobileByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: HoverNavMobileByIdResponse;
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
export interface HoverNavMobileByIdResponse {
  hoverNavMobileVO?: HoverNavMobileVO;
  [k: string]: any;
}
/**
 * 移动端悬浮导航栏信息
 */
export interface HoverNavMobileVO {
  /**
   * 导航项
   */
  navItems?: HoverNavMobileItemVO[];
  /**
   * 编号
   */
  storeId?: number;
  /**
   * 应用页面
   * * STORE_INDEX: 0：店铺首页
   * * GOODS_LIST: 1：商品列表
   * * GOODS_DETAIL: 2：商品详情
   * * SPECIAL_PAGE: 3：专题页
   */
  usePages?: (0 | 1 | 2 | 3)[];
  [k: string]: any;
}
export interface HoverNavMobileItemVO {
  /**
   * 图片
   */
  imgSrc?: string;
  /**
   * 落地页的json字符串
   */
  linkInfoPage?: string;
  /**
   * 导航名称
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "HoverNavMobileByIdResponse".
 */
export interface HoverNavMobileByIdResponse1 {
  hoverNavMobileVO?: HoverNavMobileVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "HoverNavMobileVO".
 */
export interface HoverNavMobileVO1 {
  /**
   * 导航项
   */
  navItems?: HoverNavMobileItemVO[];
  /**
   * 编号
   */
  storeId?: number;
  /**
   * 应用页面
   * * STORE_INDEX: 0：店铺首页
   * * GOODS_LIST: 1：商品列表
   * * GOODS_DETAIL: 2：商品详情
   * * SPECIAL_PAGE: 3：专题页
   */
  usePages?: (0 | 1 | 2 | 3)[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "HoverNavMobileItemVO".
 */
export interface HoverNavMobileItemVO1 {
  /**
   * 图片
   */
  imgSrc?: string;
  /**
   * 落地页的json字符串
   */
  linkInfoPage?: string;
  /**
   * 导航名称
   */
  title?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
