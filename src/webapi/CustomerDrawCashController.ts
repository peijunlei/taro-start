import * as sdk from './fetch';

const controllerName = 'CustomerDrawCashController';

/**
 *
 * 新增提现记录
 *
 */
async function addCustomerDrawCash(
  customerDrawCashAddRequest: IAddCustomerDrawCashCustomerDrawCashAddRequestReq,
): Promise<CustomerDrawCashAddResponse> {
  let result = await sdk.post<CustomerDrawCashAddResponse>(
    '/draw/cash/addCustomerDrawCash',

    {
      ...customerDrawCashAddRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询提现单详情
 *
 */
async function cancel(dcId: ICancelDcIdReq): Promise<CustomerDrawCashModifyResponse> {
  let result = await sdk.get<CustomerDrawCashModifyResponse>(
    '/draw/cash/cancel/{dcId}'.replace('{dcId}', dcId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * countDrawCashSumByCustId
 *
 */
async function countDrawCashSumByCustId(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/draw/cash/countDrawCashSumByCustId',

    {},
  );
  return result.context;
}

/**
 *
 * 查询提现单详情
 *
 */
async function detail(dcId: IDetailDcIdReq): Promise<CustomerDrawCashByIdResponse> {
  let result = await sdk.get<CustomerDrawCashByIdResponse>(
    '/draw/cash/detail/{dcId}'.replace('{dcId}', dcId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * S2B 会员提现管理列表
 *
 */
async function page(request: IPageRequestReq): Promise<MicroServicePageCustomerDrawCashVO> {
  let result = await sdk.post<MicroServicePageCustomerDrawCashVO>(
    '/draw/cash/page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  addCustomerDrawCash,

  cancel,

  countDrawCashSumByCustId,

  detail,

  page,
};

/**
 * 提现单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancelDcIdReq".
 */
export type ICancelDcIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;
/**
 * 提现单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDetailDcIdReq".
 */
export type IDetailDcIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashAddRequest".
 */
export interface CustomerDrawCashAddRequest {
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核不通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 换取access_token的票据
   */
  code?: string;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 密码
   */
  payPassword?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDrawCashAddResponse»".
 */
export interface BaseResponseCustomerDrawCashAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDrawCashAddResponse;
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
export interface CustomerDrawCashAddResponse {
  customerDrawCashVO?: CustomerDrawCashVO;
  [k: string]: any;
}
/**
 * 已新增的会员提现管理信息
 */
export interface CustomerDrawCashVO {
  /**
   * 账户余额
   */
  accountBalance?: number;
  /**
   * 账号状态 0启用  1禁用
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  accountStatus?: '0' | '1';
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员资金列表唯一主键
   */
  customerFundsId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashAddResponse".
 */
export interface CustomerDrawCashAddResponse1 {
  customerDrawCashVO?: CustomerDrawCashVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashVO".
 */
export interface CustomerDrawCashVO1 {
  /**
   * 账户余额
   */
  accountBalance?: number;
  /**
   * 账号状态 0启用  1禁用
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  accountStatus?: '0' | '1';
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员资金列表唯一主键
   */
  customerFundsId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDrawCashModifyResponse»".
 */
export interface BaseResponseCustomerDrawCashModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDrawCashModifyResponse;
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
export interface CustomerDrawCashModifyResponse {
  customerDrawCashVO?: CustomerDrawCashVO2;
  [k: string]: any;
}
/**
 * 已修改的会员提现管理信息
 */
export interface CustomerDrawCashVO2 {
  /**
   * 账户余额
   */
  accountBalance?: number;
  /**
   * 账号状态 0启用  1禁用
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  accountStatus?: '0' | '1';
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员资金列表唯一主键
   */
  customerFundsId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashModifyResponse".
 */
export interface CustomerDrawCashModifyResponse1 {
  customerDrawCashVO?: CustomerDrawCashVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«bigdecimal»".
 */
export interface BaseResponseBigdecimal {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: number;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDrawCashByIdResponse»".
 */
export interface BaseResponseCustomerDrawCashByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDrawCashByIdResponse;
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
export interface CustomerDrawCashByIdResponse {
  customerDrawCashVO?: CustomerDrawCashVO3;
  [k: string]: any;
}
/**
 * 会员提现管理信息
 */
export interface CustomerDrawCashVO3 {
  /**
   * 账户余额
   */
  accountBalance?: number;
  /**
   * 账号状态 0启用  1禁用
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  accountStatus?: '0' | '1';
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员资金列表唯一主键
   */
  customerFundsId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashByIdResponse".
 */
export interface CustomerDrawCashByIdResponse1 {
  customerDrawCashVO?: CustomerDrawCashVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDrawCashQueryRequest".
 */
export interface CustomerDrawCashQueryRequest {
  /**
   * 搜索条件:申请时间开始
   */
  applyTimeBegin?: string;
  /**
   * 搜索条件:申请时间截止
   */
  applyTimeEnd?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 批量查询-提现idList
   */
  drawCashIdList?: string[];
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 搜索条件:提现单完成时间开始
   */
  finishTimeBegin?: string;
  /**
   * 搜索条件:提现单完成时间截止
   */
  finishTimeEnd?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  sort?: Sort1;
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
   * 接口请求来源是否是平台端
   */
  sourceFromPlatForm?: boolean;
  /**
   * 操作人
   */
  supplierOperateId?: string;
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
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroServicePage«CustomerDrawCashVO»»".
 */
export interface BaseResponseMicroServicePageCustomerDrawCashVO {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageCustomerDrawCashVO;
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
export interface MicroServicePageCustomerDrawCashVO {
  /**
   * 具体数据内容
   */
  content?: CustomerDrawCashVO4[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CustomerDrawCashVO4 {
  /**
   * 账户余额
   */
  accountBalance?: number;
  /**
   * 账号状态 0启用  1禁用
   * * ENABLE: 启用
   * * DISABLE: 禁用
   */
  accountStatus?: '0' | '1';
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员资金列表唯一主键
   */
  customerFundsId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   */
  drawCashSource?: '0' | '1' | '2';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerDrawCashVO»".
 */
export interface MicroServicePageCustomerDrawCashVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerDrawCashVO4[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddCustomerDrawCashCustomerDrawCashAddRequestReq".
 */
export interface IAddCustomerDrawCashCustomerDrawCashAddRequestReq {
  /**
   * 申请时间
   */
  applyTime?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核不通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 换取access_token的票据
   */
  code?: string;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 微信openId来源
   * * PC: PC
   * * MOBILE: MOBILE
   * * APP: APP
   * * MINI: MINI
   */
  drawCashSource?: '0' | '1' | '2' | '3';
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 提现单完成时间
   */
  finishTime?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 密码
   */
  payPassword?: string;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  /**
   * 操作人
   */
  supplierOperateId?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 搜索条件:申请时间开始
   */
  applyTimeBegin?: string;
  /**
   * 搜索条件:申请时间截止
   */
  applyTimeEnd?: string;
  /**
   * 运营端审核状态(0:待审核,1:审核不通过,2:审核通过)
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   */
  auditStatus?: 0 | 1 | 2;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 用户操作状态(0:已申请,1:已取消)
   * * APPLY: 已申请
   * * CANCEL: 已取消
   */
  customerOperateStatus?: 0 | 1;
  /**
   * 删除标志(0:未删除,1:已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 提现账户账号
   */
  drawCashAccount?: string;
  /**
   * 提现账户名称
   */
  drawCashAccountName?: string;
  /**
   * 提现渠道 0:微信 1:支付宝
   * * WECHAT: 微信
   * * ALPAY: 支付宝
   */
  drawCashChannel?: '0' | '1';
  /**
   * 提现失败原因
   */
  drawCashFailedReason?: string;
  /**
   * 提现id
   */
  drawCashId?: string;
  /**
   * 批量查询-提现idList
   */
  drawCashIdList?: string[];
  /**
   * 提现单号(订单编号)
   */
  drawCashNo?: string;
  /**
   * 提现备注
   */
  drawCashRemark?: string;
  /**
   * 提现状态(0:未提现,1:提现失败,2:提现成功)
   * * WAIT: 未提现
   * * FAIL: 提现失败
   * * SUCCESS: 提现成功
   */
  drawCashStatus?: 0 | 1 | 2;
  /**
   * 本次提现金额
   */
  drawCashSum?: number;
  /**
   * 提现单完成状态(0:未完成,1:已完成)
   * * UNSUCCESS: 未完成
   * * SUCCESS: 已完成
   */
  finishStatus?: 0 | 1;
  /**
   * 搜索条件:提现单完成时间开始
   */
  finishTimeBegin?: string;
  /**
   * 搜索条件:提现单完成时间截止
   */
  finishTimeEnd?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  /**
   * 运营端驳回原因
   */
  rejectReason?: string;
  sort?: Sort1;
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
   * 接口请求来源是否是平台端
   */
  sourceFromPlatForm?: boolean;
  /**
   * 操作人
   */
  supplierOperateId?: string;
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

//create by moon https://github.com/creasy2010/moon
