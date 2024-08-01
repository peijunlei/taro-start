import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DrawRecordController';

/**
 *
 * 获取中奖励表
 *
 */
export async function getPrizeList(
  drawRecordPageRequest: IGetPrizeListDrawRecordPageRequestReq,
): Promise<DrawRecordPageResponse> {
  let result = await sdk.post<DrawRecordPageResponse>(
    '/drawrecord/getRedeemPrizeList',

    {
      ...drawRecordPageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 领取奖品
 *
 */
export async function redeemPrize(redeemPrizeRequest: IRedeemPrizeRedeemPrizeRequestReq): Promise<RedeemPrizeResponse> {
  let result = await sdk.post<RedeemPrizeResponse>(
    '/drawrecord/redeemPrize',

    {
      ...redeemPrizeRequest,
    },
  );
  return result.context;
}

/**
 *
 * 获取中奖记录根据记录id
 *
 */
export async function getDrawrecordById(id: IGetDrawrecordByIdIdReq): Promise<DrawRecordByIdResponse> {
  let result = await sdk.get<DrawRecordByIdResponse>(
    '/drawrecord/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  getPrizeList,

  redeemPrize,

  getDrawrecordById,
};

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDrawrecordByIdIdReq".
 */
export type IGetDrawrecordByIdIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawRecordPageRequest".
 */
export interface DrawRecordPageRequest {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 0未发货  1已发货
   */
  deliverStatus?: number;
  /**
   * 搜索条件:发货时间开始
   */
  deliveryTimeBegin?: string;
  /**
   * 搜索条件:发货时间截止
   */
  deliveryTimeEnd?: string;
  /**
   * 详细收货地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖状态 0 未中奖 1 中奖
   */
  drawStatus?: number;
  /**
   * 搜索条件:抽奖时间开始
   */
  drawTimeBegin?: string;
  /**
   * 搜索条件:抽奖时间截止
   */
  drawTimeEnd?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 批量查询-抽奖记录主键List
   */
  idList?: number[];
  /**
   * 物流公司标准编码
   */
  logisticsCode?: string;
  /**
   * 物流公司名称
   */
  logisticsCompany?: string;
  /**
   * 物流单号
   */
  logisticsNo?: string;
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
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 搜索条件:兑奖时间开始
   */
  redeemPrizeTimeBegin?: string;
  /**
   * 搜索条件:兑奖时间截止
   */
  redeemPrizeTimeEnd?: string;
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
   * 编辑人
   */
  updatePerson?: string;
  /**
   * 搜索条件:修改时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:修改时间截止
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
 * via the `definition` "BaseResponse«DrawRecordPageResponse»".
 */
export interface BaseResponseDrawRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DrawRecordPageResponse;
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
export interface DrawRecordPageResponse {
  drawRecordVOPage?: MicroServicePageDrawRecordVO;
  [k: string]: any;
}
/**
 * 抽奖记录表分页结果
 */
export interface MicroServicePageDrawRecordVO {
  /**
   * 具体数据内容
   */
  content?: DrawRecordVO[];
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
export interface DrawRecordVO {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 0未发货  1已发货
   */
  deliverStatus?: number;
  /**
   * 发货时间
   */
  deliveryTime?: string;
  /**
   * 详细收货地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖状态 0 未中奖 1 中奖
   */
  drawStatus?: number;
  /**
   * 抽奖时间
   */
  drawTime?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 物流公司标准编码
   */
  logisticsCode?: string;
  /**
   * 物流公司名称
   */
  logisticsCompany?: string;
  /**
   * 物流单号
   */
  logisticsNo?: string;
  /**
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 兑奖时间
   */
  redeemPrizeTime?: string;
  /**
   * 编辑人
   */
  updatePerson?: string;
  /**
   * 修改时间
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
 * via the `definition` "DrawRecordPageResponse".
 */
export interface DrawRecordPageResponse1 {
  drawRecordVOPage?: MicroServicePageDrawRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«DrawRecordVO»".
 */
export interface MicroServicePageDrawRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: DrawRecordVO[];
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
 * via the `definition` "DrawRecordVO".
 */
export interface DrawRecordVO1 {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 0未发货  1已发货
   */
  deliverStatus?: number;
  /**
   * 发货时间
   */
  deliveryTime?: string;
  /**
   * 详细收货地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖状态 0 未中奖 1 中奖
   */
  drawStatus?: number;
  /**
   * 抽奖时间
   */
  drawTime?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 物流公司标准编码
   */
  logisticsCode?: string;
  /**
   * 物流公司名称
   */
  logisticsCompany?: string;
  /**
   * 物流单号
   */
  logisticsNo?: string;
  /**
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 兑奖时间
   */
  redeemPrizeTime?: string;
  /**
   * 编辑人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RedeemPrizeRequest".
 */
export interface RedeemPrizeRequest {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RedeemPrizeResponse»".
 */
export interface BaseResponseRedeemPrizeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RedeemPrizeResponse;
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
export interface RedeemPrizeResponse {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 兑奖时间
   */
  redeemPrizeTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RedeemPrizeResponse".
 */
export interface RedeemPrizeResponse1 {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 兑奖时间
   */
  redeemPrizeTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DrawRecordByIdResponse»".
 */
export interface BaseResponseDrawRecordByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DrawRecordByIdResponse;
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
export interface DrawRecordByIdResponse {
  drawRecordVO?: DrawRecordVO2;
  [k: string]: any;
}
/**
 * 抽奖记录表信息
 */
export interface DrawRecordVO2 {
  /**
   * 抽奖活动id
   */
  activityId?: number;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 0未发货  1已发货
   */
  deliverStatus?: number;
  /**
   * 发货时间
   */
  deliveryTime?: string;
  /**
   * 详细收货地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 抽奖记录编号
   */
  drawRecordCode?: string;
  /**
   * 抽奖状态 0 未中奖 1 中奖
   */
  drawStatus?: number;
  /**
   * 抽奖时间
   */
  drawTime?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  /**
   * 物流公司标准编码
   */
  logisticsCode?: string;
  /**
   * 物流公司名称
   */
  logisticsCompany?: string;
  /**
   * 物流单号
   */
  logisticsNo?: string;
  /**
   * 奖项id
   */
  prizeId?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  /**
   * 兑奖状态 0未兑奖  1已兑奖
   */
  redeemPrizeStatus?: number;
  /**
   * 兑奖时间
   */
  redeemPrizeTime?: string;
  /**
   * 编辑人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawRecordByIdResponse".
 */
export interface DrawRecordByIdResponse1 {
  drawRecordVO?: DrawRecordVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPrizeListDrawRecordPageRequestReq".
 */
export interface IGetPrizeListDrawRecordPageRequestReq {
  activityId?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRedeemPrizeRedeemPrizeRequestReq".
 */
export interface IRedeemPrizeRedeemPrizeRequestReq {
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 抽奖记录主键
   */
  id?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
