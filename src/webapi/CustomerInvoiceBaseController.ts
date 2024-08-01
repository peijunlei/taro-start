import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerInvoiceBaseController';

/**
 *
 * 根据会员ID查询未删除的会员增专票
 *
 */
async function findCustomerInvoiceByCustomerId(): Promise<CustomerInvoiceByCustomerIdAndDelFlagResponse> {
  let result = await sdk.get<CustomerInvoiceByCustomerIdAndDelFlagResponse>(
    '/customer/invoice',

    {},
  );
  return result.context;
}

/**
 *
 * 新增会员增专票
 *
 */
async function saveCustomerInvoice(saveRequest: ISaveCustomerInvoiceSaveRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/customer/invoice',

    {
      ...saveRequest,
    },
  );
  return result;
}

/**
 *
 * 修改会员增专票
 *
 */
async function updateCustomerInvoice(saveRequest: IUpdateCustomerInvoiceSaveRequestReq): Promise<unknown> {
  let result = await sdk.put(
    '/customer/invoice',

    {
      ...saveRequest,
    },
  );
  return result;
}

/**
 *
 * 根据会员ID查询审核通过的会员增专票
 *
 */
async function findInfoByCustomerId(): Promise<CustomerInvoiceByCustomerIdResponse> {
  let result = await sdk.get<CustomerInvoiceByCustomerIdResponse>(
    '/customer/invoiceInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 根据供应商公司ID查询会员增专票
 *
 */
async function findInfoByCompanyInfoId(
  companyInfoId: IFindInfoByCompanyInfoIdCompanyInfoIdReq,
): Promise<CustomerInvoiceByCustomerIdResponse> {
  let result = await sdk.get<CustomerInvoiceByCustomerIdResponse>(
    '/customer/invoiceInfo/{companyInfoId}'.replace('{companyInfoId}', companyInfoId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * pc订单确认页面批量查询每个店铺下的发票状态
 *
 */
async function findInvoices(request: IFindInvoicesRequestReq): Promise<CustomerInvoiceByCustomerIdResponseArray> {
  let result = await sdk.post<CustomerInvoiceByCustomerIdResponseArray>(
    '/customer/invoices',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  findCustomerInvoiceByCustomerId,

  saveCustomerInvoice,

  updateCustomerInvoice,

  findInfoByCustomerId,

  findInfoByCompanyInfoId,

  findInvoices,
};

/**
 * 内容
 */
export type CustomerInvoiceByCustomerIdResponseArray = CustomerInvoiceByCustomerIdResponse2[];
/**
 * 供应商公司ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindInfoByCompanyInfoIdCompanyInfoIdReq".
 */
export type IFindInfoByCompanyInfoIdCompanyInfoIdReq = number;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceByCustomerIdResponseArray".
 */
export type CustomerInvoiceByCustomerIdResponseArray1 = CustomerInvoiceByCustomerIdResponse3[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerInvoiceByCustomerIdAndDelFlagResponse»".
 */
export interface BaseResponseCustomerInvoiceByCustomerIdAndDelFlagResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerInvoiceByCustomerIdAndDelFlagResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerInvoiceByCustomerIdAndDelFlagResponse {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 增专资质是否作废
   * * NO: 增专资质是否作废 0：否
   * * YES: 增专资质是否作废 1：是
   */
  invalidFlag?: '0' | '1';
  /**
   * 审核未通过原因
   */
  rejectReason?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceByCustomerIdAndDelFlagResponse".
 */
export interface CustomerInvoiceByCustomerIdAndDelFlagResponse1 {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 增专资质是否作废
   * * NO: 增专资质是否作废 0：否
   * * YES: 增专资质是否作废 1：是
   */
  invalidFlag?: '0' | '1';
  /**
   * 审核未通过原因
   */
  rejectReason?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceAddRequest".
 */
export interface CustomerInvoiceAddRequest {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse".
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceModifyRequest".
 */
export interface CustomerInvoiceModifyRequest {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerInvoiceByCustomerIdResponse»".
 */
export interface BaseResponseCustomerInvoiceByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerInvoiceByCustomerIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerInvoiceByCustomerIdResponse {
  /**
   * 供应商Id
   */
  companyInfoId?: number;
  /**
   * 是否支持增票资质
   */
  configFlag?: boolean;
  customerInvoiceResponse?: CustomerInvoiceVO;
  /**
   * 是否有增票资质
   */
  flag?: boolean;
  /**
   * 是否支持纸质发票
   */
  paperInvoice?: boolean;
  /**
   * 是否支持开票
   */
  support?: boolean;
  [k: string]: any;
}
/**
 * 增票资质信息
 */
export interface CustomerInvoiceVO {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 增专资质是否作废
   * * NO: 增专资质是否作废 0：否
   * * YES: 增专资质是否作废 1：是
   */
  invalidFlag?: '0' | '1';
  /**
   * 审核未通过原因
   */
  rejectReason?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceByCustomerIdResponse".
 */
export interface CustomerInvoiceByCustomerIdResponse1 {
  /**
   * 供应商Id
   */
  companyInfoId?: number;
  /**
   * 是否支持增票资质
   */
  configFlag?: boolean;
  customerInvoiceResponse?: CustomerInvoiceVO;
  /**
   * 是否有增票资质
   */
  flag?: boolean;
  /**
   * 是否支持纸质发票
   */
  paperInvoice?: boolean;
  /**
   * 是否支持开票
   */
  support?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInvoiceVO".
 */
export interface CustomerInvoiceVO1 {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 增专资质是否作废
   * * NO: 增专资质是否作废 0：否
   * * YES: 增专资质是否作废 1：是
   */
  invalidFlag?: '0' | '1';
  /**
   * 审核未通过原因
   */
  rejectReason?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceProjectSwitchRequest".
 */
export interface InvoiceProjectSwitchRequest {
  /**
   * 供应商id集合
   */
  companyInfoIds?: number[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CustomerInvoiceByCustomerIdResponse»»".
 */
export interface BaseResponseListCustomerInvoiceByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerInvoiceByCustomerIdResponseArray;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
export interface CustomerInvoiceByCustomerIdResponse2 {
  /**
   * 供应商Id
   */
  companyInfoId?: number;
  /**
   * 是否支持增票资质
   */
  configFlag?: boolean;
  customerInvoiceResponse?: CustomerInvoiceVO;
  /**
   * 是否有增票资质
   */
  flag?: boolean;
  /**
   * 是否支持纸质发票
   */
  paperInvoice?: boolean;
  /**
   * 是否支持开票
   */
  support?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISaveCustomerInvoiceSaveRequestReq".
 */
export interface ISaveCustomerInvoiceSaveRequestReq {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateCustomerInvoiceSaveRequestReq".
 */
export interface IUpdateCustomerInvoiceSaveRequestReq {
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 银行基本户号
   */
  bankNo?: string;
  /**
   * 营业执照复印件
   */
  businessLicenseImg?: string;
  /**
   * 增票资质审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 单位地址
   */
  companyAddress?: string;
  /**
   * 单位全称
   */
  companyName?: string;
  /**
   * 单位电话
   */
  companyPhone?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 增专资质ID
   */
  customerInvoiceId?: number;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 一般纳税人认证资格复印件
   */
  taxpayerIdentificationImg?: string;
  /**
   * 纳税人识别号
   */
  taxpayerNumber?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindInvoicesRequestReq".
 */
export interface IFindInvoicesRequestReq {
  /**
   * 供应商id集合
   */
  companyInfoIds?: number[];
  [k: string]: any;
}
export interface CustomerInvoiceByCustomerIdResponse3 {
  /**
   * 供应商Id
   */
  companyInfoId?: number;
  /**
   * 是否支持增票资质
   */
  configFlag?: boolean;
  customerInvoiceResponse?: CustomerInvoiceVO;
  /**
   * 是否有增票资质
   */
  flag?: boolean;
  /**
   * 是否支持纸质发票
   */
  paperInvoice?: boolean;
  /**
   * 是否支持开票
   */
  support?: boolean;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
