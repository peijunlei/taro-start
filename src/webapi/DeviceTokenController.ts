import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DeviceTokenController';

/**
 *
 * 新增设备管理
 *
 */
async function add(addReq: IAddAddReqReq): Promise<DeviceTokenAddResponse> {
  let result = await sdk.post<DeviceTokenAddResponse>(
    '/devicetoken/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

export default {
  add,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeviceTokenAddRequest".
 */
export interface DeviceTokenAddRequest {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 设备id
   */
  deviceToken?: string;
  /**
   * 操作系统类型；0Android，1ios
   */
  osType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DeviceTokenAddResponse»".
 */
export interface BaseResponseDeviceTokenAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DeviceTokenAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface DeviceTokenAddResponse {
  deviceTokenVO?: DeviceTokenVO;
  [k: string]: any;
}
/**
 * 已新增的设备管理信息
 */
export interface DeviceTokenVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 设备id
   */
  deviceToken?: string;
  /**
   * 操作系统类型；0Android，1ios
   */
  osType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeviceTokenAddResponse".
 */
export interface DeviceTokenAddResponse1 {
  deviceTokenVO?: DeviceTokenVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeviceTokenVO".
 */
export interface DeviceTokenVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 设备id
   */
  deviceToken?: string;
  /**
   * 操作系统类型；0Android，1ios
   */
  osType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 设备id
   */
  deviceToken?: string;
  /**
   * 操作系统类型；0Android，1ios
   */
  osType?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
