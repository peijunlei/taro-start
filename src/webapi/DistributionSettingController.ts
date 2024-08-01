import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionSettingController';

/**
 *
 * 查询分销设置
 *
 */
async function findOne(): Promise<DistributionSimSettingResponse> {
  let result = await sdk.get<DistributionSimSettingResponse>(
    '/distribution-setting',

    {},
  );
  return result.context;
}

export default {
  findOne,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionSimSettingResponse»".
 */
export interface BaseResponseDistributionSimSettingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSimSettingResponse;
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
export interface DistributionSimSettingResponse {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;
  [k: string]: any;
}
export interface DistributionCustomerSimVO {
  /**
   * 分销员标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  [k: string]: any;
}
export interface DistributionSettingSimVO {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSimSettingResponse".
 */
export interface DistributionSimSettingResponse1 {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerSimVO".
 */
export interface DistributionCustomerSimVO1 {
  /**
   * 分销员标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSettingSimVO".
 */
export interface DistributionSettingSimVO1 {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
