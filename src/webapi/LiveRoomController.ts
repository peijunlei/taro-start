import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LiveRoomController';

/**
 *
 * 查询直播是否开启
 *
 */
async function isLiveOpen(): Promise<SystemConfigResponse> {
  let result = await sdk.get<SystemConfigResponse>('/liveroomweb/isOpen', {});
  return result.context;
}

/**
 *
 * 列表查询直播间
 *
 */
async function getList(listReq: IGetListListReqReq): Promise<LiveRoomListResponse> {
  let result = await sdk.post<LiveRoomListResponse>('/liveroomweb/list', {...listReq});
  return result.context;
}

/**
 *
 * 分页查询直播间
 *
 */
async function getPage(pageReq: IGetPagePageReqReq): Promise<LiveRoomPageMobileResponse> {
  let result = await sdk.post<LiveRoomPageMobileResponse>('/liveroomweb/page', {...pageReq});
  return result.context;
}

/**
 *
 * 根据id查询直播间
 *
 */
async function getById(id: IGetByIdIdReq): Promise<LiveRoomByIdResponse> {
  let result = await sdk.get<LiveRoomByIdResponse>('/liveroomweb/{id}'.replace('{id}', id + ''), {});
  return result.context;
}

export default {
  isLiveOpen,

  getList,

  getPage,

  getById,
};

/**
 * id
 *
 */
export type IGetByIdIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface BaseResponseSystemConfigResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SystemConfigResponse;
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
export interface SystemConfigResponse {
  /**
   * 系统配置信息
   */
  configVOList?: ConfigVO[];
  systemConfigVOList?: SystemConfigVO[];
  [k: string]: any;
}
export interface ConfigVO {
  /**
   * 配置键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface SystemConfigVO {
  /**
   * 键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 配置内容，如JSON内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   *  编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态,0:未启用1:已启用
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface SystemConfigResponse1 {
  /**
   * 系统配置信息
   */
  configVOList?: ConfigVO[];
  systemConfigVOList?: SystemConfigVO[];
  [k: string]: any;
}
/**
 */
export interface ConfigVO1 {
  /**
   * 配置键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface SystemConfigVO1 {
  /**
   * 键
   */
  configKey?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 类型
   */
  configType?: string;
  /**
   * 配置内容，如JSON内容
   */
  context?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   *  编号
   */
  id?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态,0:未启用1:已启用
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface LiveRoomListRequest {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   */
  liveStatus?: number;
  /**
   * 直播房间名
   */
  name?: string;
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
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
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
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
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
export interface BaseResponseLiveRoomListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomListResponse;
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
export interface LiveRoomListResponse {
  /**
   * 直播间列表结果
   */
  liveRoomVOList?: LiveRoomVO[];
  [k: string]: any;
}
export interface LiveRoomVO {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
  /**
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 小程序时间展示
   */
  startTimeSting?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomListResponse1 {
  /**
   * 直播间列表结果
   */
  liveRoomVOList?: LiveRoomVO[];
  [k: string]: any;
}
/**
 */
export interface LiveRoomVO1 {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
  /**
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 小程序时间展示
   */
  startTimeSting?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomPageRequest {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTime?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中,1: 暂停中, 2: 异常,3: 未开始, 4: 已结束, 5: 禁播, , 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
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
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  sort?: Sort3;
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
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomPageMobileResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomPageMobileResponse;
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
export interface LiveRoomPageMobileResponse {
  /**
   * 直播预告数量
   */
  foreShowCount?: number;
  /**
   * 直播中的数量
   */
  liveCount?: number;
  /**
   * 直播间商品
   */
  liveGoodsList?: {
    [k: string]: LiveGoodsByWeChatVO[];
  };
  liveRoomReplayVOList?: {
    [k: string]: LiveRoomReplayVO[];
  };
  liveRoomVOPage?: MicroServicePageLiveRoomVO;
  /**
   * 直播回放房间数量
   */
  playbackCount?: number;
  /**
   * 直播间所属店铺名字
   */
  storeVO?: {
    [k: string]: StoreVO;
  };
  [k: string]: any;
}
export interface LiveGoodsByWeChatVO {
  /**
   * 审核单ID
   */
  auditId?: number;
  /**
   * 审核原因
   */
  auditReason?: string;
  /**
   * 审核状态,0:未审核1 审核通过2审核失败3禁用中
   */
  auditStatus?: number;
  /**
   * 填入mediaID
   */
  coverImgUrl?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 主键id
   */
  goodsId?: number;
  /**
   * 商品详情id
   */
  goodsInfoId?: string;
  /**
   * 商品标题
   */
  name?: string;
  /**
   * 直播商品价格左边界
   */
  price?: number;
  /**
   * 直播商品价格右边界
   */
  price2?: number;
  /**
   * 价格类型，1：一口价，2：价格区间，3：显示折扣价
   */
  priceType?: number;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 1,2：表示是为api添加商品，否则是在MP添加商品
   */
  thirdPartyTag?: number;
  /**
   * 商品详情页的小程序路径
   */
  url?: string;
  [k: string]: any;
}
export interface LiveRoomReplayVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 * 直播间分页结果
 */
export interface MicroServicePageLiveRoomVO {
  /**
   * 具体数据内容
   */
  content?: LiveRoomVO2[];
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
  sort?: Sort4;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface LiveRoomVO2 {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
  /**
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 小程序时间展示
   */
  startTimeSting?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface StoreVO {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 公司信息
 */
export interface CompanyInfoVO {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: null[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface EmployeeVO {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: null;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface LiveRoomPageMobileResponse1 {
  /**
   * 直播预告数量
   */
  foreShowCount?: number;
  /**
   * 直播中的数量
   */
  liveCount?: number;
  /**
   * 直播间商品
   */
  liveGoodsList?: {
    [k: string]: LiveGoodsByWeChatVO[];
  };
  liveRoomReplayVOList?: {
    [k: string]: LiveRoomReplayVO[];
  };
  liveRoomVOPage?: MicroServicePageLiveRoomVO;
  /**
   * 直播回放房间数量
   */
  playbackCount?: number;
  /**
   * 直播间所属店铺名字
   */
  storeVO?: {
    [k: string]: StoreVO;
  };
  [k: string]: any;
}
/**
 */
export interface LiveGoodsByWeChatVO1 {
  /**
   * 审核单ID
   */
  auditId?: number;
  /**
   * 审核原因
   */
  auditReason?: string;
  /**
   * 审核状态,0:未审核1 审核通过2审核失败3禁用中
   */
  auditStatus?: number;
  /**
   * 填入mediaID
   */
  coverImgUrl?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 主键id
   */
  goodsId?: number;
  /**
   * 商品详情id
   */
  goodsInfoId?: string;
  /**
   * 商品标题
   */
  name?: string;
  /**
   * 直播商品价格左边界
   */
  price?: number;
  /**
   * 直播商品价格右边界
   */
  price2?: number;
  /**
   * 价格类型，1：一口价，2：价格区间，3：显示折扣价
   */
  priceType?: number;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 1,2：表示是为api添加商品，否则是在MP添加商品
   */
  thirdPartyTag?: number;
  /**
   * 商品详情页的小程序路径
   */
  url?: string;
  [k: string]: any;
}
/**
 */
export interface LiveRoomReplayVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 视频过期时间
   */
  expireTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频回放路径
   */
  mediaUrl?: string;
  /**
   * 直播房间id
   */
  roomId?: number;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageLiveRoomVO1 {
  /**
   * 具体数据内容
   */
  content?: LiveRoomVO2[];
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
  sort?: Sort4;
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
export interface StoreVO1 {
  /**
   * 结算日
   */
  accountDay?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 申请入驻时间
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 审核未通过原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityId?: number;
  companyInfo?: CompanyInfoVO;
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 使用的运费模板类别(0:店铺运费,1:单品运费)
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 店铺关店原因
   */
  storeClosedReason?: string;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 */
export interface CompanyInfoVO1 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 入驻时间(第一次审核通过时间)
   */
  applyEnterTime?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 法人身份证反面
   */
  backIDCard?: string;
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家编号
   */
  companyCode?: string;
  /**
   * 公司简介
   */
  companyDescript?: string;
  /**
   * 编号
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详细地址
   */
  detailAddress?: string;
  /**
   * 员工信息
   */
  employeeVOList?: EmployeeVO[];
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * 法人身份证正面
   */
  frontIDCard?: string;
  /**
   * 多个SPU编号
   */
  goodsIds?: string[];
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 是否确认打款
   * * NO: 否
   * * YES: 是
   */
  remitAffirm?: 0 | 1;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  /**
   * 商家类型0品牌商城，1商家
   * * PROVIDER: 0:供应商
   * * SUPPLIER: 1:商家
   */
  storeType?: 0 | 1;
  /**
   * 店铺信息
   */
  storeVOList?: null[];
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface EmployeeVO1 {
  /**
   * 账号禁用原因
   */
  accountDisableReason?: string;
  /**
   * 账户名
   */
  accountName?: string;
  /**
   * 密码
   */
  accountPassword?: string;
  /**
   * 账号状态
   * * ENABLE: 启用
   * * DISABLE: 禁用
   * * DIMISSION: 离职
   */
  accountState?: 0 | 1 | 2;
  /**
   * 账号类型
   * * b2bBoss: b2b账号
   * * s2bBoss: s2b平台端账号
   * * s2bSupplier: s2b商家端账号
   * * s2bProvider: s2b供应商端账号
   */
  accountType?: 0 | 1 | 2 | 3;
  /**
   * 是否激活会员账号，0：否，1：是
   */
  becomeMember?: number;
  /**
   * 生日
   */
  birthday?: string;
  companyInfo?: null;
  /**
   * 商家Id
   */
  companyInfoId?: number;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所属部门集合
   */
  departmentIds?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 会员电话
   */
  employeeMobile?: string;
  /**
   * 会员名称
   */
  employeeName?: string;
  /**
   * salt
   */
  employeeSaltVal?: string;
  /**
   * 交接人员工ID
   */
  heirEmployeeId?: string;
  /**
   * 是否业务员(0 是 1否)
   */
  isEmployee?: number;
  /**
   * 是否是主账号
   * * NO: 否
   * * YES: 是
   */
  isMasterAccount?: number;
  /**
   * 工号
   */
  jobNo?: string;
  /**
   * 登录失败次数
   */
  loginErrorTime?: number;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 会员登录时间
   */
  loginTime?: string;
  /**
   * 管理部门集合
   */
  manageDepartmentIds?: string;
  /**
   * 职位
   */
  position?: string;
  /**
   * 角色id集合
   */
  roleIds?: string;
  /**
   * 性别，0：保密，1：男，2：女
   * * SECRET: 保密
   * * MALE: 男
   * * FEMALE: 女
   */
  sex?: 0 | 1 | 2;
  /**
   * 第三方店铺id
   */
  thirdId?: string;
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseLiveRoomByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LiveRoomByIdResponse;
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
export interface LiveRoomByIdResponse {
  /**
   * 直播间商品
   */
  goodsInfoVOList?: LiveGoodsInfoVO[];
  /**
   * 直播间商品
   */
  liveGoodsList?: LiveGoodsByWeChatVO2[];
  liveRoomVO?: LiveRoomVO3;
  /**
   * 所属店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
export interface LiveGoodsInfoVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品审核被驳回的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 建议零售价
   */
  retailPrice?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
export interface LiveGoodsByWeChatVO2 {
  /**
   * 审核单ID
   */
  auditId?: number;
  /**
   * 审核原因
   */
  auditReason?: string;
  /**
   * 审核状态,0:未审核1 审核通过2审核失败3禁用中
   */
  auditStatus?: number;
  /**
   * 填入mediaID
   */
  coverImgUrl?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 主键id
   */
  goodsId?: number;
  /**
   * 商品详情id
   */
  goodsInfoId?: string;
  /**
   * 商品标题
   */
  name?: string;
  /**
   * 直播商品价格左边界
   */
  price?: number;
  /**
   * 直播商品价格右边界
   */
  price2?: number;
  /**
   * 价格类型，1：一口价，2：价格区间，3：显示折扣价
   */
  priceType?: number;
  /**
   * 库存
   */
  stock?: number;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 1,2：表示是为api添加商品，否则是在MP添加商品
   */
  thirdPartyTag?: number;
  /**
   * 商品详情页的小程序路径
   */
  url?: string;
  [k: string]: any;
}
/**
 * 直播间信息
 */
export interface LiveRoomVO3 {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
  /**
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 小程序时间展示
   */
  startTimeSting?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface LiveRoomByIdResponse1 {
  /**
   * 直播间商品
   */
  goodsInfoVOList?: LiveGoodsInfoVO[];
  /**
   * 直播间商品
   */
  liveGoodsList?: LiveGoodsByWeChatVO2[];
  liveRoomVO?: LiveRoomVO3;
  /**
   * 所属店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 */
export interface LiveGoodsInfoVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品审核被驳回的原因
   */
  enterPriseGoodsAuditReason?: string;
  /**
   * 企业购商品的销售价格
   */
  enterPrisePrice?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 建议零售价
   */
  retailPrice?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
/**
 */
export interface IGetListListReqReq {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:结束时间开始
   */
  endTimeBegin?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中, 1: 未开始, 2: 已结束, 3: 禁播, 4: 暂停中, 5: 异常, 6: 已过期
   */
  liveStatus?: number;
  /**
   * 直播房间名
   */
  name?: string;
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
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
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
   * 店铺id
   */
  storeId?: number;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
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
  [k: string]: any;
}
/**
 */
export interface IGetPagePageReqReq {
  /**
   * 主播昵称
   */
  anchorName?: string;
  /**
   * 主播微信
   */
  anchorWechat?: string;
  /**
   * 1：关闭评论 0：打开评论，关闭后无法开启
   */
  closeComment?: number;
  /**
   * 1：关闭货架 0：打开货架，关闭后无法开启
   */
  closeGoods?: number;
  /**
   * 1：关闭点赞 0：开启点赞，关闭后无法开启
   */
  closeLike?: number;
  /**
   * 直播背景墙
   */
  coverImg?: string;
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 搜索条件:删除时间开始
   */
  deleteTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  deleteTimeEnd?: string;
  /**
   * 搜索条件:结束时间截止
   */
  endTime?: string;
  /**
   * 搜索条件:视频过期时间开始
   */
  expireTimeBegin?: string;
  /**
   * 搜索条件:视频过期时间截止
   */
  expireTimeEnd?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 批量查询-主键idList
   */
  idList?: number[];
  /**
   * 直播商户id
   */
  liveCompanyId?: string;
  /**
   * 直播状态 0: 直播中,1: 暂停中, 2: 异常,3: 未开始, 4: 已结束, 5: 禁播, , 6: 已过期
   * * ZERO: 0:直播中
   * * ONE: 1:暂停
   * * TOW: 2:异常
   * * THREE: 3:未开始
   * * FOUR: 4:已结束
   * * FIVE: 5:禁播
   * * SIX: 6:已过期
   */
  liveStatus?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 直播房间名
   */
  name?: string;
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
   * 是否推荐
   */
  recommend?: number;
  /**
   * 直播房间id
   */
  roomId?: number;
  /**
   * 1：横屏，0：竖屏
   */
  screenType?: number;
  /**
   * 分享卡片封面
   */
  shareImg?: string;
  sort?: Sort3;
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
  startTime?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 直播类型，1：推流，0：手机直播
   */
  type?: number;
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
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
