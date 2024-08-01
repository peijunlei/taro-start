import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCreditOrderBaseController';

/**
 *
 * 关联订单（已还款）
 *
 */
async function findRepayOrderPage(request: IFindRepayOrderPageRequestReq): Promise<PageCreditRepayDetailResponse> {
  let result = await sdk.post<PageCreditRepayDetailResponse>(
    '/credit/order/has-repaid-order',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 授信订单使用记录
 *
 */
async function findCreditRepayPage(
  request: IFindCreditRepayPageRequestReq,
): Promise<MicroServicePageCreditTradePageResponse> {
  let result = await sdk.post<MicroServicePageCreditTradePageResponse>(
    '/credit/order/used-list',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  findRepayOrderPage,

  findCreditRepayPage,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface CreditRepayDetailRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
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
   * 还款单号
   */
  repayOrderCode?: string;
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
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponsePageCreditRepayDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PageCreditRepayDetailResponse;
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
export interface PageCreditRepayDetailResponse {
  content?: CreditRepayDetailResponse[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CreditRepayDetailResponse {
  /**
   * 订单状态
   */
  flowState?: string;
  /**
   * 商品数量
   */
  goodsNum?: number;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 订单金额
   */
  orderPrice?: number;
  /**
   * 支付状态
   */
  payOrderStatus?: string;
  /**
   * 商品名称
   */
  skuName?: string;
  /**
   * 图片
   */
  urlList?: string[];
  [k: string]: any;
}
export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface PageCreditRepayDetailResponse1 {
  content?: CreditRepayDetailResponse[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface CreditRepayDetailResponse1 {
  /**
   * 订单状态
   */
  flowState?: string;
  /**
   * 商品数量
   */
  goodsNum?: number;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 订单金额
   */
  orderPrice?: number;
  /**
   * 支付状态
   */
  payOrderStatus?: string;
  /**
   * 商品名称
   */
  skuName?: string;
  /**
   * 图片
   */
  urlList?: string[];
  [k: string]: any;
}
/**
 */
export interface Pageable1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 */
export interface CreditTradePageRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 授信截止时间
   */
  endTime?: string;
  /**
   * 订单状态
   */
  flowState?: string;
  /**
   * 是否已还款 false 否，true 是
   */
  hasRepaid?: boolean;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 支付状态
   */
  payOrderStatus?: string;
  sort?: Sort5;
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
   * 授信开始时间
   */
  startTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort5 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseMicroServicePageCreditTradePageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageCreditTradePageResponse;
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
export interface MicroServicePageCreditTradePageResponse {
  /**
   * 具体数据内容
   */
  content?: CreditTradePageResponse[];
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
  sort?: Sort6;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CreditTradePageResponse {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 订单状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  flowState?:
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  /**
   * 商品数量
   */
  goodNum?: number;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 订单应还款金额
   */
  orderPrice?: number;
  /**
   * 订单原始金额
   */
  orderOriginPrice?: number;
  /**
   * 支付状态 0未支付 1待确认 2已支付
   */
  payOrderStatus?: string;
  /**
   * 下单时间
   */
  payTime?: string;
  /**
   * 图片地址
   */
  urlList?: string[];
  [k: string]: any;
}
export interface Sort6 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageCreditTradePageResponse1 {
  /**
   * 具体数据内容
   */
  content?: CreditTradePageResponse[];
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
  sort?: Sort6;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface CreditTradePageResponse1 {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 订单状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * WAIT_PAY_EARNEST: 10: WAIT_PAY_EARNEST 待支付定金
   * * WAIT_PAY_TAIL: 11: WAIT_PAY_TAIL 待支付尾款
   */
  flowState?:
    | 'INIT'
    | 'REMEDY'
    | 'REFUND'
    | 'AUDIT'
    | 'DELIVERED_PART'
    | 'DELIVERED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'VOID'
    | 'GROUPON'
    | 'WAIT_PAY_EARNEST'
    | 'WAIT_PAY_TAIL';
  /**
   * 商品数量
   */
  goodNum?: number;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 订单金额
   */
  orderPrice?: number;
  /**
   * 支付状态 0未支付 1待确认 2已支付
   */
  payOrderStatus?: string;
  /**
   * 下单时间
   */
  payTime?: string;
  /**
   * 图片地址
   */
  urlList?: string[];
  [k: string]: any;
}
/**
 */
export interface IFindRepayOrderPageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
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
   * 还款单号
   */
  repayOrderCode?: string;
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
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IFindCreditRepayPageRequestReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 授信截止时间
   */
  endTime?: string;
  /**
   * 订单状态
   */
  flowState?: string;
  /**
   * 是否已还款 false 否，true 是
   */
  hasRepaid?: boolean;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 支付状态
   */
  payOrderStatus?: string;
  sort?: Sort5;
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
   * 授信开始时间
   */
  startTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
