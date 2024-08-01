import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributorLevelController';

/**
 *
 * getByCustomerId
 *
 */
async function getByCustomerId(): Promise<DistributorLevelByCustomerIdResponse> {
  let result = await sdk.get<DistributorLevelByCustomerIdResponse>(
    '/distributor/level/getByCustomerId',

    {},
  );
  return result.context;
}

export default {
  getByCustomerId,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributorLevelByCustomerIdResponse»".
 */
export interface BaseResponseDistributorLevelByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributorLevelByCustomerIdResponse;
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
export interface DistributorLevelByCustomerIdResponse {
  distributorLevelVO?: DistributorLevelVO;
  [k: string]: any;
}
/**
 * 分销员等级信息
 */
export interface DistributorLevelVO {
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 分销员等级id
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 邀请人数门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请人数门槛
   */
  inviteThreshold?: number;
  /**
   * 佣金提成比例
   */
  percentageRate?: number;
  /**
   * 到账收益额门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  recordFlag?: 0 | 1;
  /**
   * 到账收益额门槛
   */
  recordThreshold?: number;
  /**
   * 销售额门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  salesFlag?: 0 | 1;
  /**
   * 销售额门槛
   */
  salesThreshold?: number;
  /**
   * 等级排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "DistributorLevelByCustomerIdResponse".
 */
export interface DistributorLevelByCustomerIdResponse1 {
  distributorLevelVO?: DistributorLevelVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributorLevelVO".
 */
export interface DistributorLevelVO1 {
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 分销员等级id
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 邀请人数门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请人数门槛
   */
  inviteThreshold?: number;
  /**
   * 佣金提成比例
   */
  percentageRate?: number;
  /**
   * 到账收益额门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  recordFlag?: 0 | 1;
  /**
   * 到账收益额门槛
   */
  recordThreshold?: number;
  /**
   * 销售额门槛是否开启
   * * NO: 否
   * * YES: 是
   */
  salesFlag?: 0 | 1;
  /**
   * 销售额门槛
   */
  salesThreshold?: number;
  /**
   * 等级排序
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
