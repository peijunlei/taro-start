import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DrawActivityController';

/**
 *
 * 已登录根据id查询抽奖活动表
 *
 */
export async function detailForWeb(request: IDetailForWebRequestReq): Promise<DrawDetailByIdResponse> {
  let result = await sdk.post<DrawDetailByIdResponse>(
    '/drawactivity/detailForWeb',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询抽奖活动表
 *
 */
export async function getList(listReq: IGetListListReqReq): Promise<DrawActivityListResponse> {
  let result = await sdk.post<DrawActivityListResponse>(
    '/drawactivity/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 抽奖按钮点击开始接口
 *
 */
export async function lotteryDraw(request: ILotteryDrawRequestReq): Promise<DrawResultResponse> {
  let result = await sdk.post<DrawResultResponse>(
    '/drawactivity/lotteryDraw',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 未登陆登录根据id查询抽奖活动表
 *
 */
export async function unLoginDetail(request: IUnLoginDetailRequestReq): Promise<DrawDetailByIdResponse> {
  let result = await sdk.post<DrawDetailByIdResponse>(
    '/drawactivity/unLogin/detailForWeb',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  detailForWeb,

  getList,

  lotteryDraw,

  unLoginDetail,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawDetailByIdRequest".
 */
export interface DrawDetailByIdRequest {
  /**
   * 活动编号
   */
  activityId?: number;
  /**
   * 当前查看人的用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DrawDetailByIdResponse»".
 */
export interface BaseResponseDrawDetailByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DrawDetailByIdResponse;
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
export interface DrawDetailByIdResponse {
  drawDetail?: DrawDetail;
  [k: string]: any;
}
/**
 * C端查看活动返回信息
 */
export interface DrawDetail {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 当前用户剩余抽奖次数
   */
  leftDrawCount?: number;
  /**
   * 活动奖品集合
   */
  prizeVOList?: WebPrizeVO[];
  /**
   * 开始时间
   */
  startTime?: string;
  [k: string]: any;
}
export interface WebPrizeVO {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawDetailByIdResponse".
 */
export interface DrawDetailByIdResponse1 {
  drawDetail?: DrawDetail;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawDetail".
 */
export interface DrawDetail1 {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 当前用户剩余抽奖次数
   */
  leftDrawCount?: number;
  /**
   * 活动奖品集合
   */
  prizeVOList?: WebPrizeVO[];
  /**
   * 开始时间
   */
  startTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "WebPrizeVO".
 */
export interface WebPrizeVO1 {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 奖品名称
   */
  prizeName?: string;
  /**
   * 奖品图片
   */
  prizeUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawActivityListRequest".
 */
export interface DrawActivityListRequest {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 实际中奖人/次
   */
  awardCount?: number;
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
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 实际抽奖人/次
   */
  drawCount?: number;
  /**
   * 抽奖次数，默认为0
   */
  drawTimes?: number;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 批量查询-主键List
   */
  idList?: number[];
  /**
   * 抽奖次数上限提示
   */
  maxAwardTip?: string;
  /**
   * 未中奖提示
   */
  notAwardTip?: string;
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
   * 是否暂停 0进行 1暂停
   */
  pauseFlag?: number;
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
   * 搜索条件:开始时间开始
   */
  startTimeBegin?: string;
  /**
   * 搜索条件:开始时间截止
   */
  startTimeEnd?: string;
  /**
   * 修改人
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
  /**
   * 每人每天最多中奖次数，默认为0
   */
  winTimes?: number;
  /**
   * 中奖次数限制类型 （0：无限制，1：每人每天）
   */
  winTimesType?: number;
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
 * via the `definition` "BaseResponse«DrawActivityListResponse»".
 */
export interface BaseResponseDrawActivityListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DrawActivityListResponse;
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
export interface DrawActivityListResponse {
  /**
   * 抽奖活动表列表结果
   */
  drawActivityVOList?: DrawActivityVO[];
  [k: string]: any;
}
export interface DrawActivityVO {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 实际中奖人/次
   */
  awardCount?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 查询类型，0：全部，1：进行中，2：暂停中，3：未开始，4：已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  drawActivityStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 实际抽奖人/次
   */
  drawCount?: number;
  /**
   * 抽奖次数，默认为0
   */
  drawTimes?: number;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 抽奖次数上限提示
   */
  maxAwardTip?: string;
  /**
   * 未中奖提示
   */
  notAwardTip?: string;
  /**
   * 是否暂停 0进行 1暂停
   */
  pauseFlag?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 每人每天最多中奖次数，默认为0
   */
  winTimes?: number;
  /**
   * 中奖次数限制类型 （0：无限制，1：每人每天）
   */
  winTimesType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawActivityListResponse".
 */
export interface DrawActivityListResponse1 {
  /**
   * 抽奖活动表列表结果
   */
  drawActivityVOList?: DrawActivityVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawActivityVO".
 */
export interface DrawActivityVO1 {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 实际中奖人/次
   */
  awardCount?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 查询类型，0：全部，1：进行中，2：暂停中，3：未开始，4：已结束
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   */
  drawActivityStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 实际抽奖人/次
   */
  drawCount?: number;
  /**
   * 抽奖次数，默认为0
   */
  drawTimes?: number;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 抽奖次数上限提示
   */
  maxAwardTip?: string;
  /**
   * 未中奖提示
   */
  notAwardTip?: string;
  /**
   * 是否暂停 0进行 1暂停
   */
  pauseFlag?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 每人每天最多中奖次数，默认为0
   */
  winTimes?: number;
  /**
   * 中奖次数限制类型 （0：无限制，1：每人每天）
   */
  winTimesType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LotteryByIdRequest".
 */
export interface LotteryByIdRequest {
  /**
   * 活动编号
   */
  activityId?: number;
  /**
   * 当前查看人的用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DrawResultResponse»".
 */
export interface BaseResponseDrawResultResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DrawResultResponse;
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
export interface DrawResultResponse {
  drawResult?: DrawResultVO;
  [k: string]: any;
}
/**
 * 抽奖结果
 */
export interface DrawResultVO {
  /**
   * 剩余抽奖次数
   */
  lessDrawCount?: number;
  /**
   * 返回奖品编号
   */
  prizeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawResultResponse".
 */
export interface DrawResultResponse1 {
  drawResult?: DrawResultVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrawResultVO".
 */
export interface DrawResultVO1 {
  /**
   * 剩余抽奖次数
   */
  lessDrawCount?: number;
  /**
   * 返回奖品编号
   */
  prizeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDetailForWebRequestReq".
 */
export interface IDetailForWebRequestReq {
  /**
   * 活动编号
   */
  activityId?: string | number;
  /**
   * 当前查看人的用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 活动规则说明
   */
  activityContent?: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 实际中奖人/次
   */
  awardCount?: number;
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
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 实际抽奖人/次
   */
  drawCount?: number;
  /**
   * 抽奖次数，默认为0
   */
  drawTimes?: number;
  /**
   * 抽奖次数限制类型（0：每日，1：每人）
   */
  drawTimesType?: number;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 批量查询-主键List
   */
  idList?: number[];
  /**
   * 抽奖次数上限提示
   */
  maxAwardTip?: string;
  /**
   * 未中奖提示
   */
  notAwardTip?: string;
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
   * 是否暂停 0进行 1暂停
   */
  pauseFlag?: number;
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
   * 搜索条件:开始时间开始
   */
  startTimeBegin?: string;
  /**
   * 搜索条件:开始时间截止
   */
  startTimeEnd?: string;
  /**
   * 修改人
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
  /**
   * 每人每天最多中奖次数，默认为0
   */
  winTimes?: number;
  /**
   * 中奖次数限制类型 （0：无限制，1：每人每天）
   */
  winTimesType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ILotteryDrawRequestReq".
 */
export interface ILotteryDrawRequestReq {
  /**
   * 活动编号
   */
  activityId?: number;
  /**
   * 当前查看人的用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUnLoginDetailRequestReq".
 */
export interface IUnLoginDetailRequestReq {
  /**
   * 活动编号
   */
  activityId?: number;
  /**
   * 当前查看人的用户编号
   */
  customerId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
