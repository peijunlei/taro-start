import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerCreditAuditBaseController';

/**
 *
 * applyAudit
 *
 */
async function applyAudit(request: IApplyAuditRequestReq): Promise<unknown> {
  let result = await sdk.post<unknown>('/credit/audit/applyAudit', {
    ...request,
  });
  return result.context;
}

export default {
  applyAudit,
};

export interface IgnoreType {
  [k: string]: any;
}

/**
 */
export interface CreditApplyRequest {
  /**
   * 申请原因
   */
  applyNotes?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;

  [k: string]: any;
}

/**
 */
export interface BaseResponse {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
    [k: string]: any;
  };
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
 */
export interface IApplyAuditRequestReq {
  /**
   * 申请原因
   */
  applyNotes?: string;
  customerAccount?: string;
  customerId?: string;
  customerName?: string;

  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
