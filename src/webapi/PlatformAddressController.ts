import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PlatformAddressController';

/**
 *
 * 城市列表
 *
 */
async function getCity(addrId: IGetCityAddrIdReq): Promise<PlatformAddressListResponse> {
  let result = await sdk.get<PlatformAddressListResponse>(
    '/platformaddress/city/{addrId}'.replace('{addrId}', addrId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 区县列表
 *
 */
async function getDistrict(addrId: IGetDistrictAddrIdReq): Promise<PlatformAddressListResponse> {
  let result = await sdk.get<PlatformAddressListResponse>(
    '/platformaddress/district/{addrId}'.replace('{addrId}', addrId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询省市区
 *
 */
async function listByIds(request: IListByIdsRequestReq): Promise<PlatformAddressListResponse> {
  let result = await sdk.post<PlatformAddressListResponse>(
    '/platformaddress/listByIds',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 仅查询省市
 *
 */
async function listByArea(): Promise<PlatformAddressListResponse> {
  let result = await sdk.get<PlatformAddressListResponse>(
    '/platformaddress/listLimitCity',

    {},
  );
  return result.context;
}

/**
 *
 * 省份列表
 *
 */
async function getProvince(): Promise<PlatformAddressListResponse> {
  let result = await sdk.get<PlatformAddressListResponse>(
    '/platformaddress/province',

    {},
  );
  return result.context;
}

/**
 *
 * 初始化地址信息
 *
 */
async function initAddressJson(): Promise<any> {
  let result = await sdk.get<any>(
    '/platformaddress/initAddressJson',

    {},
  );
  return result.context;
}

/**
 *
 * 乡镇街道列表
 *
 */
async function getStreet(addrId: IGetStreetAddrIdReq): Promise<PlatformAddressListResponse> {
  let result = await sdk.get<PlatformAddressListResponse>(
    '/platformaddress/street/{addrId}'.replace('{addrId}', addrId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 校验是否需要完善地址,true表示需要完善，false表示不需要完善
 *
 */
async function verifyAddress(request: IVerifyAddressRequestReq): Promise<IsSubscriptionFlaggetRes> {
  let result = await sdk.post<IsSubscriptionFlaggetRes>('/platformaddress/verifyAddress', {
    ...request,
  });
  return result.context;
}

export default {
  getCity,

  getDistrict,

  listByIds,

  listByArea,

  getProvince,

  getStreet,

  verifyAddress,

  initAddressJson,
};

/**
 * 内容
 */
export type IsSubscriptionFlaggetRes = boolean;

/**
 * 省份地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCityAddrIdReq".
 */
export type IGetCityAddrIdReq = string;
/**
 * 城市地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDistrictAddrIdReq".
 */
export type IGetDistrictAddrIdReq = string;
/**
 * 区县地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetStreetAddrIdReq".
 */
export type IGetStreetAddrIdReq = string;

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
 * 内容
 */
export interface PlatformAddressListResponse {
  /**
   * 平台地址信息列表结果
   */
  platformAddressVOList?: PlatformAddressVO[];
  [k: string]: any;
}
export interface PlatformAddressVO {
  /**
   * 地址id
   */
  addrId?: string;
  /**
   * 地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevel?: '0' | '1' | '2' | '3';
  /**
   * 地址名称
   */
  addrName?: string;
  /**
   * 父地址ID
   */
  addrParentId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 主键id
   */
  id?: string;
  /**
   * 是否叶子节点 true:是 false:否
   */
  leafFlag?: boolean;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PlatformAddressListResponse".
 */
export interface PlatformAddressListResponse1 {
  /**
   * 平台地址信息列表结果
   */
  platformAddressVOList?: PlatformAddressVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PlatformAddressVO".
 */
export interface PlatformAddressVO1 {
  /**
   * 地址id
   */
  addrId?: string;
  /**
   * 地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevel?: '0' | '1' | '2' | '3';
  /**
   * 地址名称
   */
  addrName?: string;
  /**
   * 父地址ID
   */
  addrParentId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 主键id
   */
  id?: string;
  /**
   * 是否叶子节点 true:是 false:否
   */
  leafFlag?: boolean;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PlatformAddressListRequest".
 */
export interface PlatformAddressListRequest {
  /**
   * 地址id
   */
  addrId?: string;
  /**
   * 批量查询-地址id
   */
  addrIdList?: string[];
  /**
   * 地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevel?: '0' | '1' | '2' | '3';
  /**
   * 批量查询-地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevels?: ('0' | '1' | '2' | '3')[];
  /**
   * 地址名称
   */
  addrName?: string;
  /**
   * 父地址ID
   */
  addrParentId?: string;
  /**
   * 批量查询-父地址ID
   */
  addrParentIdList?: string[];
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 搜索条件:入库时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:入库时间截止
   */
  createTimeEnd?: string;
  /**
   * 是否删除标志 0：否，1：是；默认0
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 主键id
   */
  id?: string;
  /**
   * 批量查询-主键idList
   */
  idList?: string[];
  /**
   * 是否叶子节点验证
   */
  leafFlag?: boolean;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListByIdsRequestReq".
 */
export interface IListByIdsRequestReq {
  /**
   * 地址id
   */
  addrId?: string;
  /**
   * 批量查询-地址id
   */
  addrIdList?: string[];
  /**
   * 地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevel?: '0' | '1' | '2' | '3';
  /**
   * 批量查询-地址层级(0-省级;1-市级;2-区县级;3-乡镇或街道级)
   * * PROVINCE: 0：省级
   * * CITY: 1：市级
   * * DISTRICT: 2：区县级
   * * STREET: 3：乡镇或街道级
   */
  addrLevels?: ('0' | '1' | '2' | '3')[];
  /**
   * 地址名称
   */
  addrName?: string;
  /**
   * 父地址ID
   */
  addrParentId?: string;
  /**
   * 批量查询-父地址ID
   */
  addrParentIdList?: string[];
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 搜索条件:入库时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:入库时间截止
   */
  createTimeEnd?: string;
  /**
   * 是否删除标志 0：否，1：是；默认0
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 主键id
   */
  id?: string;
  /**
   * 批量查询-主键idList
   */
  idList?: string[];
  /**
   * 是否叶子节点验证
   */
  leafFlag?: boolean;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IVerifyAddressRequestReq {
  /**
   * 区县id
   */
  areaId?: string;
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 城市id
   */
  cityId?: string;
  /**
   * 省级id
   */
  provinceId?: string;
  /**
   * 街道id
   */
  streetId?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
