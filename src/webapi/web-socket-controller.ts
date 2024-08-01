import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'web-socket-controller';

/**
 *
 * getGrouponInstanceInfo
 *
 */
async function getGrouponInstanceInfo(grouponNo: IGetGrouponInstanceInfoGrouponNoReq): Promise<GrouponInstanceVO> {
  let result = await sdk.get<GrouponInstanceVO>(
    '/test/grouponInstanceInfo/{grouponNo}'.replace('{grouponNo}', grouponNo + ''),

    {},
  );
  return result.context;
}

/**
 *
 * getGrouponInstanceInfoByMQ
 *
 */
async function getGrouponInstanceInfoByMQ(
  grouponNo: IGetGrouponInstanceInfoByMQGrouponNoReq,
): Promise<GrouponInstanceVO> {
  let result = await sdk.get<GrouponInstanceVO>(
    '/testmq/grouponInstanceInfo/{grouponNo}'.replace('{grouponNo}', grouponNo + ''),

    {},
  );
  return result.context;
}

export default {
  getGrouponInstanceInfo,

  getGrouponInstanceInfoByMQ,
};

/**
 * grouponNo
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponInstanceInfoGrouponNoReq".
 */
export type IGetGrouponInstanceInfoGrouponNoReq = string;
/**
 * grouponNo
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponInstanceInfoByMQGrouponNoReq".
 */
export type IGetGrouponInstanceInfoByMQGrouponNoReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponInstanceVO»".
 */
export interface BaseResponseGrouponInstanceVO {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponInstanceVO;
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
export interface GrouponInstanceVO {
  /**
   * 成团时间
   */
  completeTime?: string;
  /**
   * 开团时间
   */
  createTime?: string;
  /**
   * 团长用户id
   */
  customerId?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 拼团活动id
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团状态
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstanceVO".
 */
export interface GrouponInstanceVO1 {
  /**
   * 成团时间
   */
  completeTime?: string;
  /**
   * 开团时间
   */
  createTime?: string;
  /**
   * 团长用户id
   */
  customerId?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 拼团活动id
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团状态
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 参团人数
   */
  joinNum?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
