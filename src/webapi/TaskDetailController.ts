import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'TaskDetailController';

/**
 *
 * 任务信息
 *
 */
async function getDetail(): Promise<TaskDetailResp> {
  let result = await sdk.get<TaskDetailResp>(
    '/taskdetail/detail',

    {},
  );
  return result.context;
}

export default {
  getDetail,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TaskDetailResp»".
 */
export interface BaseResponseTaskDetailResp {
  /**
   * 结果码
   */
  code: string;
  context?: TaskDetailResp;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface TaskDetailResp {
  /**
   * 达标分享文章次数,-1表示未开启
   */
  articleTaskCount?: number;
  /**
   * 分享文章 0:完成 1:未完成
   */
  articleTaskFlag?: number;
  /**
   * 达标分享优惠券次数,-1表示未开启
   */
  couponTaskCount?: number;
  /**
   * 分享优惠券 0:完成 1:未完成
   */
  couponTaskFlag?: number;
  /**
   * 完成数量
   */
  fulfillCount?: number;
  /**
   * 达标分享商品次数,-1表示未开启
   */
  goodsTaskCount?: number;
  /**
   * 分享商品 0：完成 1：未完成
   */
  goodsTaskFlag?: number;
  /**
   * 达标分享店铺次数,-1表示未开启
   */
  storeTaskCount?: number;
  /**
   * 分享店铺 0:完成 1:未完成
   */
  storeTaskFlag?: number;
  /**
   * 今日任务数量
   */
  taskCount?: number;
  /**
   * 达标分享视频次数,-1表示未开启
   */
  videoTaskCount?: number;
  /**
   * 分享视频 0:完成 1:未完成
   */
  videoTaskFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TaskDetailResp".
 */
export interface TaskDetailResp1 {
  /**
   * 达标分享文章次数,-1表示未开启
   */
  articleTaskCount?: number;
  /**
   * 分享文章 0:完成 1:未完成
   */
  articleTaskFlag?: number;
  /**
   * 达标分享优惠券次数,-1表示未开启
   */
  couponTaskCount?: number;
  /**
   * 分享优惠券 0:完成 1:未完成
   */
  couponTaskFlag?: number;
  /**
   * 完成数量
   */
  fulfillCount?: number;
  /**
   * 达标分享商品次数,-1表示未开启
   */
  goodsTaskCount?: number;
  /**
   * 分享商品 0：完成 1：未完成
   */
  goodsTaskFlag?: number;
  /**
   * 达标分享店铺次数,-1表示未开启
   */
  storeTaskCount?: number;
  /**
   * 分享店铺 0:完成 1:未完成
   */
  storeTaskFlag?: number;
  /**
   * 今日任务数量
   */
  taskCount?: number;
  /**
   * 达标分享视频次数,-1表示未开启
   */
  videoTaskCount?: number;
  /**
   * 分享视频 0:完成 1:未完成
   */
  videoTaskFlag?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
