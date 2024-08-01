import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerFundsController';

/**
 *
 * S2B web公用-余额账单明细分页列表
 *
 */
async function page(request: IPageRequestReq): Promise<MicroServicePageCustomerFundsDetailVO> {
  let result = await sdk.post<MicroServicePageCustomerFundsDetailVO>(
    '/customer/funds/page',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * S2B 会员端-获取会员资金统计（会员余额总额、冻结余额总额、可提现余额总额）
 *
 */
async function statistics(enterpriseId?:string): Promise<CustomerFundsStatisticsResponse> {
  let result = await sdk.get<CustomerFundsStatisticsResponse>(
    enterpriseId?`/customer/funds/statistics?enterpriseId=${enterpriseId}`:`/customer/funds/statistics`,

    {},
  );
  return result.context;
}
/**
 *
 * /customergrantinfo/add
新增企业余额转赠记录
 *
 */
 async function addCustomergrantinfo(request:{grantAmount:number,grantMsg:string,enterpriseId:string}): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/customergrantinfo/add',
    {...request},
  );
  return result.context;
}
/**
 *
 * /customergrantinfo/add
新增企业余额转赠记录
 *
 */
async function fetchCustomergrantinfoPage(request:any): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/customergrantinfo/page',
    {...request},
  );
  return result.context;
}
/**
 * 历史订单
 */
async function fetchHistoryOrderPage(request:any): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/ordersnormalorders/page',
    {...request},
  );
  return result.context;
}
/**
 * 历史订单详情
 */
 async function fetchHistoryOrderDetail(id:string): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/ordersnormalordersitems/list',
    {orderId:id},
  );
  return result.context;
}
/**
 * 查询红包
 */

 async function getCustomergrantinfoById(id:string): Promise<unknown> {
  let result = await sdk.get<unknown>(
    `/customergrantinfo/getById/${id}`,
    {},
  );
  return result.context;
}
/**
 * 根据id领取红包
 */

async function receiveRedPacket(id:string): Promise<unknown> {
  let result = await sdk.get<unknown>(
    `/customergrantinfo/draw/${id}`,
    {},
  );
  return result.context;
}
export default {
  page,
  addCustomergrantinfo,
  fetchCustomergrantinfoPage,
  getCustomergrantinfoById,
  receiveRedPacket,
  statistics,
  fetchHistoryOrderPage,
  fetchHistoryOrderDetail
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFundsDetailPageRequest".
 */
export interface CustomerFundsDetailPageRequest {
  /**
   * 业务编号
   */
  businessId?: string;
  /**
   * 批量查询-明细主键List
   */
  customerFundsDetailIdList?: string[];
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 佣金提现id
   */
  drawCashId?: string;
  /**
   * 入账结束时间
   */
  endTime?: string;
  /**
   * 资金状态
   * * NO: 未入账
   * * YES: 成功入账
   */
  fundsStatus?: 0 | 1;
  /**
   * 资金类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 分销佣金
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * COMMISSION_COMMISSION: 佣金提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   */
  fundsType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 资金类型集合
   */
  fundsTypeList?: number[];
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
   * 入账开始时间
   */
  startTime?: string;
  /**
   * Tab类型 0: 全部, 1: 收入, 2: 支出, 3:分销佣金&邀新记录
   */
  tabType?: number;
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
 * via the `definition` "BaseResponse«MicroServicePage«CustomerFundsDetailVO»»".
 */
export interface BaseResponseMicroServicePageCustomerFundsDetailVO {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageCustomerFundsDetailVO;
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
export interface MicroServicePageCustomerFundsDetailVO {
  /**
   * 具体数据内容
   */
  content?: CustomerFundsDetailVO[];
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
export interface CustomerFundsDetailVO {
  accountBalance?: number;
  businessId?: string;
  createTime?: string;
  customerFundsDetailId?: string;
  fundsType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  receiptPaymentAmount?: number;
  /**
   * 资金账务子类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 推广返利
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * SELFBUY_COMMISSION: 自购返利
   * * PROMOTION_COMMISSION: 推广提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
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
 * via the `definition` "MicroServicePage«CustomerFundsDetailVO»".
 */
export interface MicroServicePageCustomerFundsDetailVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerFundsDetailVO[];
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
 * via the `definition` "CustomerFundsDetailVO".
 */
export interface CustomerFundsDetailVO1 {
  accountBalance?: number;
  businessId?: string;
  createTime?: string;
  customerFundsDetailId?: string;
  fundsType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  receiptPaymentAmount?: number;
  /**
   * 资金账务子类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 推广返利
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * SELFBUY_COMMISSION: 自购返利
   * * PROMOTION_COMMISSION: 推广提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerFundsStatisticsResponse»".
 */
export interface BaseResponseCustomerFundsStatisticsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerFundsStatisticsResponse;
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
export interface CustomerFundsStatisticsResponse {
  /**
   * 余额总额
   */
  accountBalanceTotal?: number;
  /**
   * 已提现金额
   */
  alreadyDrawAmount?: number;
  /**
   * 冻结余额总额
   */
  blockedBalanceTotal?: number;
  /**
   * 可提现余额总额
   */
  withdrawAmountTotal?: number;

  alias?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerFundsStatisticsResponse".
 */
export interface CustomerFundsStatisticsResponse1 {
  /**
   * 余额总额
   */
  accountBalanceTotal?: number;
  /**
   * 已提现金额
   */
  alreadyDrawAmount?: number;
  /**
   * 冻结余额总额
   */
  blockedBalanceTotal?: number;
  /**
   * 可提现余额总额
   */
  withdrawAmountTotal?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 业务编号
   */
  businessId?: string;
  /**
   * 批量查询-明细主键List
   */
  customerFundsDetailIdList?: string[];
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 佣金提现id
   */
  drawCashId?: string;
  /**
   * 入账结束时间
   */
  endTime?: string;
  /**
   * 资金状态
   * * NO: 未入账
   * * YES: 成功入账
   */
  fundsStatus?: 0 | 1;
  /**
   * 资金类型
   * * ALL: 全部
   * * DISTRIBUTION_COMMISSION: 分销佣金
   * * COMMISSION_WITHDRAWAL: 佣金提现
   * * INVITE_NEW_AWARDS: 邀新奖励
   * * COMMISSION_COMMISSION: 佣金提成
   * * BALANCE_PAY: 余额支付
   * * BALANCE_PAY_REFUND: 余额支付退款
   */
  fundsType?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 资金类型集合
   */
  fundsTypeList?: number[];
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
   * 入账开始时间
   */
  startTime?: string;
  /**
   * Tab类型 0: 全部, 1: 收入, 2: 支出, 3:分销佣金&邀新记录
   */
  tabType?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
