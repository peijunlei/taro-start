import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCreditQueryBaseController';

/**
 *
 * getCreditAccountByCustomerId
 *
 */
async function getCreditAccountByCustomerId(): Promise<CreditAccountDetailResponse> {
  let result = await sdk.post<CreditAccountDetailResponse>(
    '/credit/query/getCreditAccount',

    {},
  );
  return result.context;
}

/**
 *
 * queryApplyInfoByCustomerId
 *
 */
async function queryApplyInfoByCustomerId(): Promise<CreditApplyRecordVo> {
  let result = await sdk.get<CreditApplyRecordVo>(
    '/credit/query/queryApplyInfo',

    {},
  );
  return result.context;
}

/**
 *
 * queryChangeInfoByCustomerId
 *
 */
async function queryChangeInfoByCustomerId(): Promise<CreditApplyRecordVo> {
  let result = await sdk.get<CreditApplyRecordVo>(
    '/credit/query/queryChangeInfo',

    {},
  );
  return result.context;
}

export default {
  getCreditAccountByCustomerId,

  queryApplyInfoByCustomerId,

  queryChangeInfoByCustomerId,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface BaseResponseCreditAccountDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CreditAccountDetailResponse;
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
export interface CreditAccountDetailResponse {
  /**
   * 授信显示别名
   */
  alias?: string;
  /**
   * 变更额度记录ID
   */
  changeRecordId?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信次数
   */
  creditNum?: number;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 使用周期
   */
  effectiveDays?: number;
  /**
   * 启用状态 0未启用 1已启用
   * * NO: 否
   * * YES: 是
   */
  enabled?: 0 | 1;
  /**
   * 到期时间
   */
  endTime?: string;
  /**
   * 是否过期 0未过期 1已过期
   * * NO: 否
   * * YES: 是
   */
  expireStatus?: 0 | 1;
  /**
   * 已还款额度
   */
  hasRepaidAmount?: number;
  /**
   * 主键ID
   */
  id?: string;
  /**
   * 是否开启
   */
  isOpen?: number;
  /**
   * 待还款额度
   */
  repayAmount?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 可用额度
   */
  usableAmount?: number;
  /**
   * 已用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0未使用 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface CreditAccountDetailResponse1 {
  /**
   * 授信显示别名
   */
  alias?: string;
  /**
   * 变更额度记录ID
   */
  changeRecordId?: string;
  /**
   * 授信额度
   */
  creditAmount?: number;
  /**
   * 授信次数
   */
  creditNum?: number;
  /**
   * 会员账号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 使用周期
   */
  effectiveDays?: number;
  /**
   * 启用状态 0未启用 1已启用
   * * NO: 否
   * * YES: 是
   */
  enabled?: 0 | 1;
  /**
   * 到期时间
   */
  endTime?: string;
  /**
   * 是否过期 0未过期 1已过期
   * * NO: 否
   * * YES: 是
   */
  expireStatus?: 0 | 1;
  /**
   * 已还款额度
   */
  hasRepaidAmount?: number;
  /**
   * 主键ID
   */
  id?: string;
  /**
   * 是否开启
   */
  isOpen?: number;
  /**
   * 待还款额度
   */
  repayAmount?: number;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 可用额度
   */
  usableAmount?: number;
  /**
   * 已用额度
   */
  usedAmount?: number;
  /**
   * 是否使用 0未使用 1已使用
   * * NO: 否
   * * YES: 是
   */
  usedStatus?: 0 | 1;
  [k: string]: any;
}
/**
 */
export interface BaseResponseCreditApplyRecordVo {
  /**
   * 结果码
   */
  code: string;
  context?: CreditApplyRecordVo;
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
export interface CreditApplyRecordVo {
  /**
   * 申请原因
   */
  applyNotes?: string;
  /**
   * 审核状态
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   * * RESET_WAIT: 变更额度待审核
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 是否生效
   * * NO: 否
   * * YES: 是
   */
  effectStatus?: 0 | 1;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  [k: string]: any;
}
/**
 */
export interface CreditApplyRecordVo1 {
  /**
   * 申请原因
   */
  applyNotes?: string;
  /**
   * 审核状态
   * * WAIT: 待审核
   * * REJECT: 拒绝
   * * PASS: 通过
   * * RESET_WAIT: 变更额度待审核
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 是否生效
   * * NO: 否
   * * YES: 是
   */
  effectStatus?: 0 | 1;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
