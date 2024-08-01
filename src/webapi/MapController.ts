import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MapController';

/**
 *
 * 列表
 *
 */
export async function getAddressList(request: IListRequestReq): Promise<BaseResponsePlatformAddressListResponse> {
  let result = await sdk.post<BaseResponsePlatformAddressListResponse>('/map/poiList', {
    ...request,
  });
  return result.context;
}
export async function getAddressListMapUnder(
  request: IMapListRequestReq,
): Promise<BaseResponsePlatformAddressMapListResponse> {
  let result = await sdk.post<BaseResponsePlatformAddressMapListResponse>('/map/address-by-location', {
    ...request,
  });
  return result.context;
}

export async function getAddressListByLatAndLng(
  request: IListByLatAndLngRequestReq,
): Promise<BaseResponsePlatformAddressMapListByLatAndLngResponse> {
  let result = await sdk.post<BaseResponsePlatformAddressMapListByLatAndLngResponse>('/map/aroundPoiList', {
    ...request,
  });
  return result.context;
}

export default {
  getAddressList,
  getAddressListMapUnder,
  getAddressListByLatAndLng,
};

/**
 * city名字
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCityAddrIdReq".
 */
export type IGetCityReq = string;
/**
 * keywords
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDistrictAddrIdReq".
 */
export type IGetKeywordsReq = string;
/**
 * 区县地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetStreetAddrIdReq".
 */
export type IGetMapTypeReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PlatformAddressListResponse»".
 */
export interface BaseResponsePlatformAddressListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PlatformAddressListResponse;
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
 * 地址列表结果
 */
export interface PlatformAddressListResponse {
  /**
   * 地址列表结果
   */
  platformAddressVOList?: PlatformAddressVO[];
  [k: string]: any;
}
export interface PlatformAddressVO {
  /**
   * 地址
   */
  address?: string;
  /**
   * 地址名称
   */
  adname?: string;
  /**
   *
   */
  cityname?: string;
  /**
   *
   */
  location?: string;
  /**
   *
   */
  name?: string;
  /**
   *
   */
  pname?: string;
  /**
   *
   */
  type: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListRequestReq".
 */
export interface IListRequestReq {
  /**
   * 查询城市
   */
  city?: string;
  /**
   * 关键字
   */
  keywords?: string;
  mapType?: '0';
  [k: string]: any;
}

export interface IMapListRequestReq {
  /**
   * 经纬度
   */
  location?: string;
  /**
   * 搜索半径
   */
  raduis?: string;
  mapType?: '0';
  [k: string]: any;
}

export interface PlatformAddressMapListResponse {
  /**
   * 地址列表结果
   */
  platformAddressVOList?: PlatformAddressMapVO[];
  [k: string]: any;
}
export interface PlatformAddressMapVO {
  /**
   * 地址
   */
  city?: string;
  /**
   *
   */
  district?: string;
  /**
   *
   */
  formattedAddress?: string;
  /**
   *
   */
  pois?: PlatformAddressVO[];
  /**
   *
   */
  province?: string;
  /**
   *
   */
  twonship?: string;
  [k: string]: any;
}
export interface BaseResponsePlatformAddressMapListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PlatformAddressMapListResponse;
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

export interface IListByLatAndLngRequestReq {
  city?: string;
  keywords?: string;
  /**
   * 经纬度
   */
  location?: string;
  /**
   * 搜索半径
   */
  raduis?: string;
  mapType?: '0';
  [k: string]: any;
}
export interface BaseResponsePlatformAddressMapListByLatAndLngResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PlatformAddressMapListByLatAndLngResponse;
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
export interface PlatformAddressMapListByLatAndLngResponse {
  /**
   * 地址列表结果
   */
  pois?: PlatformAddressMapByLatAndLngVO[];
  [k: string]: any;
}
export interface PlatformAddressMapByLatAndLngVO {
  /**
   * 地址
   */
  adcode?: string;
  /**
   *
   */
  address?: string;
  /**
   *
   */
  adname?: string;
  /**
   *
   */
  citycode?: string;
  /**
   *
   */
  cityname?: string;
  location?: string;
  name?: string;
  pcode?: string;
  pname?: string;
  type?: string;
  twoncode?: string;
  /**
   *
   */
  twonship?: string;
  [k: string]: any;
}
//create by moon https://github.com/creasy2010/moon
