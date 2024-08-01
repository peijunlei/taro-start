import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerRealNameController';

/**
 *
 * 新增 成功实名认证信息
 *
 */
async function add(addReq: IAddAddReqReq): Promise<RealNameResponseVO> {
  let result = await sdk.post<RealNameResponseVO>(
    '/customerrealname/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 查询我的成功实名认证信息
 *
 */
async function myRealNameInfo(): Promise<CustomerRealNameByIdResponse> {
  let result = await sdk.get<CustomerRealNameByIdResponse>(
    '/customerrealname/myRealNameInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询 成功实名认证信息
 *
 */
async function getById(
  customerRealNameId: IGetByIdCustomerRealNameIdReq,
): Promise<CustomerRealNameByIdResponse> {
  let result = await sdk.get<CustomerRealNameByIdResponse>(
    '/customerrealname/{customerRealNameId}'.replace(
      '{customerRealNameId}',
      customerRealNameId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  add,

  myRealNameInfo,

  getById,
};

/**
 * customerRealNameId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdCustomerRealNameIdReq".
 */
export type IGetByIdCustomerRealNameIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerRealNameAddRequest".
 */
export interface CustomerRealNameAddRequest {
  /**
   * 创建时间，认证时间
   */
  createTime?: string;
  /**
   * 会员身份证号
   */
  customerCardNo?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员实名
   */
  customerName?: string;
  /**
   * 删除区分：0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RealNameResponseVO»".
 */
export interface BaseResponseRealNameResponseVO {
  /**
   * 结果码
   */
  code: string;
  context?: RealNameResponseVO;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RealNameResponseVO {
  /**
   * 信息
   */
  errorMsg?: string;
  /**
   * http响应码
   */
  httpCode?: number;
  realNameBody?: RealNameBodyVO;
  [k: string]: any;
}
/**
 * 响应实体
 */
export interface RealNameBodyVO {
  /**
   * 地区代码
   */
  addrCode?: string;
  /**
   * 身份证所在地(参考)
   */
  area?: string;
  /**
   * 出生年月
   */
  birthday?: string;
  /**
   * 市
   */
  city?: string;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 身份证校验码
   */
  lastCode?: string;
  /**
   * 信息
   */
  msg?: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 区县
   */
  prefecture?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 状态
   */
  status?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RealNameResponseVO".
 */
export interface RealNameResponseVO1 {
  /**
   * 信息
   */
  errorMsg?: string;
  /**
   * http响应码
   */
  httpCode?: number;
  realNameBody?: RealNameBodyVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RealNameBodyVO".
 */
export interface RealNameBodyVO1 {
  /**
   * 地区代码
   */
  addrCode?: string;
  /**
   * 身份证所在地(参考)
   */
  area?: string;
  /**
   * 出生年月
   */
  birthday?: string;
  /**
   * 市
   */
  city?: string;
  /**
   * 身份证号
   */
  idCard?: string;
  /**
   * 身份证校验码
   */
  lastCode?: string;
  /**
   * 信息
   */
  msg?: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 区县
   */
  prefecture?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 状态
   */
  status?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerRealNameByIdResponse»".
 */
export interface BaseResponseCustomerRealNameByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerRealNameByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerRealNameByIdResponse {
  customerRealNameVO?: CustomerRealNameVO;
  [k: string]: any;
}
/**
 *  成功实名认证信息信息
 */
export interface CustomerRealNameVO {
  /**
   * 创建时间，认证时间
   */
  createTime?: string;
  /**
   * 会员身份证号
   */
  customerCardNo?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员实名
   */
  customerName?: string;
  /**
   * 主键
   */
  customerRealNameId?: string;
  /**
   * 删除区分：0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerRealNameByIdResponse".
 */
export interface CustomerRealNameByIdResponse1 {
  customerRealNameVO?: CustomerRealNameVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerRealNameVO".
 */
export interface CustomerRealNameVO1 {
  /**
   * 创建时间，认证时间
   */
  createTime?: string;
  /**
   * 会员身份证号
   */
  customerCardNo?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员实名
   */
  customerName?: string;
  /**
   * 主键
   */
  customerRealNameId?: string;
  /**
   * 删除区分：0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 创建时间，认证时间
   */
  createTime?: string;
  /**
   * 会员身份证号
   */
  customerCardNo?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员实名
   */
  customerName?: string;
  /**
   * 删除区分：0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
