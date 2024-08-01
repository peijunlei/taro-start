import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerVerifiedBaseController';

/**
 *
 * 新增人工实名信息
 *
 */
async function add(
  addReq: IAddAddReqReq,
): Promise<CustomerVerifiedAddResponse> {
  let result = await sdk.post<CustomerVerifiedAddResponse>(
    '/customerVerifiedBase/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 查看用户人工实名信息
 *
 */
async function myVerifiedInfo(): Promise<CustomerVerifiedByIdResponse> {
  let result = await sdk.get<CustomerVerifiedByIdResponse>(
    '/customerVerifiedBase/myVerifiedInfo',

    {},
  );
  return result.context;
}

export default {
  add,

  myVerifiedInfo,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVerifiedAddRequest".
 */
export interface CustomerVerifiedAddRequest {
  /**
   * 人工审核备注
   */
  artificialRemake?: string;
  /**
   * 自动审核备注
   */
  automaticRemake?: string;
  /**
   * 身份反面照
   */
  cardNegative?: string;
  /**
   * 身份证号
   */
  cardNo?: string;
  /**
   * 身份正面照
   */
  cardPositive?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 真实姓名
   */
  customerName?: string;
  /**
   * 10-未实名 20-实名成功 30-自动审核拒绝 40-人工审核中 60-人工审核拒绝
   */
  statusType?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerVerifiedAddResponse»".
 */
export interface BaseResponseCustomerVerifiedAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerVerifiedAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerVerifiedAddResponse {
  customerVerifiedVO?: CustomerVerifiedVO;
  [k: string]: any;
}
/**
 * 已新增的系统日志信息
 */
export interface CustomerVerifiedVO {
  /**
   * 人工审核备注
   */
  artificialRemake?: string;
  /**
   * 自动审核备注
   */
  automaticRemake?: string;
  /**
   * 身份反面照
   */
  cardNegative?: string;
  /**
   * 身份证号
   */
  cardNo?: string;
  /**
   * 身份正面照
   */
  cardPositive?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 真实姓名
   */
  customerName?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 10-未实名 20-实名成功 30-自动审核拒绝 40-人工审核中 60-人工审核拒绝
   */
  statusType?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVerifiedAddResponse".
 */
export interface CustomerVerifiedAddResponse1 {
  customerVerifiedVO?: CustomerVerifiedVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVerifiedVO".
 */
export interface CustomerVerifiedVO1 {
  /**
   * 人工审核备注
   */
  artificialRemake?: string;
  /**
   * 自动审核备注
   */
  automaticRemake?: string;
  /**
   * 身份反面照
   */
  cardNegative?: string;
  /**
   * 身份证号
   */
  cardNo?: string;
  /**
   * 身份正面照
   */
  cardPositive?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 真实姓名
   */
  customerName?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 10-未实名 20-实名成功 30-自动审核拒绝 40-人工审核中 60-人工审核拒绝
   */
  statusType?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerVerifiedByIdResponse»".
 */
export interface BaseResponseCustomerVerifiedByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerVerifiedByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerVerifiedByIdResponse {
  customerVerifiedVO?: CustomerVerifiedVO2;
  [k: string]: any;
}
/**
 * 系统日志信息
 */
export interface CustomerVerifiedVO2 {
  /**
   * 人工审核备注
   */
  artificialRemake?: string;
  /**
   * 自动审核备注
   */
  automaticRemake?: string;
  /**
   * 身份反面照
   */
  cardNegative?: string;
  /**
   * 身份证号
   */
  cardNo?: string;
  /**
   * 身份正面照
   */
  cardPositive?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 真实姓名
   */
  customerName?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 10-未实名 20-实名成功 30-自动审核拒绝 40-人工审核中 60-人工审核拒绝
   */
  statusType?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVerifiedByIdResponse".
 */
export interface CustomerVerifiedByIdResponse1 {
  customerVerifiedVO?: CustomerVerifiedVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 人工审核备注
   */
  artificialRemake?: string;
  /**
   * 自动审核备注
   */
  automaticRemake?: string;
  /**
   * 身份反面照
   */
  cardNegative?: string;
  /**
   * 身份证号
   */
  cardNo?: string;
  /**
   * 身份正面照
   */
  cardPositive?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 真实姓名
   */
  customerName?: string;
  /**
   * 10-未实名 20-实名成功 30-自动审核拒绝 40-人工审核中 60-人工审核拒绝
   */
  statusType?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
