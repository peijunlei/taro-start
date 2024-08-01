import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionGoodsMatterController';

/**
 *
 * 统计某个SKU分销素材分享次数
 *
 */
async function deleteList(updateRecommendNumRequest: IDeleteListUpdateRecommendNumRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/distribution/goods-matter/matter-recommend-num',

    {
      ...updateRecommendNumRequest,
    },
  );
  return result.context;
}

/**
 *
 * 分页分销商品素材
 *
 */
async function page(
  distributionGoodsMatterPageRequest: IPageDistributionGoodsMatterPageRequestReq,
): Promise<DistributionGoodsMatterPageResponse> {
  let result = await sdk.post<DistributionGoodsMatterPageResponse>(
    '/distribution/goods-matter/page',

    {
      ...distributionGoodsMatterPageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询分销商品素材
 *
 */
async function pageNew(
  distributionGoodsMatterPageRequest: IPageNewDistributionGoodsMatterPageRequestReq,
): Promise<DistributionGoodsMatterPageResponse> {
  let result = await sdk.post<DistributionGoodsMatterPageResponse>(
    '/distribution/goods-matter/page/new',

    {
      ...distributionGoodsMatterPageRequest,
    },
  );
  return result.context;
}

export default {
  deleteList,

  page,

  pageNew,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UpdateRecommendNumRequest".
 */
export interface UpdateRecommendNumRequest {
  /**
   * 分销素材的ID
   */
  id?: string;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionGoodsMatterPageRequest".
 */
export interface DistributionGoodsMatterPageRequest {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 平台类目
   */
  cateId?: number;
  /**
   * 批量商品分类
   */
  cateIds?: number[];
  /**
   * customerId
   */
  customerId?: string;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 商品skuid
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * Sku编码
   */
  goodsInfoNo?: string;
  /**
   * 素材类型
   * * GOODS: 0: 商品素材
   * * MARKETING: 1: 营销素材
   */
  matterType?: 0 | 1;
  /**
   * 发布者id
   */
  operatorId?: string;
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
   * 引用次数范围（大）
   */
  recommendNumMax?: number;
  /**
   * 引用次数范围（小）
   */
  recommendNumMin?: number;
  sort?: Sort1;
  /**
   * 引用次数排序
   * * ASC: asc:升序
   * * DESC: desc:倒序
   */
  sortByRecommendNum?: number;
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
   * 店铺id
   */
  storeId?: number;
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
 * via the `definition` "BaseResponse«DistributionGoodsMatterPageResponse»".
 */
export interface BaseResponseDistributionGoodsMatterPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionGoodsMatterPageResponse;
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
export interface DistributionGoodsMatterPageResponse {
  /**
   * 商家信息数据
   */
  companyInfoList?: CompanyInfoVO[];
  distributionGoodsMatterPage?: MicroServicePageDistributionGoodsMatterPageVO;
  /**
   * 商品SKU的规格值全部数据
   */
  goodsInfoSpecDetails?: GoodsInfoSpecDetailRelVO[];
  [k: string]: any;
}
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
  storeVOList?: StoreVO[];
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
  companyInfo?: CompanyInfoVO1;
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
 * 商家
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
  storeVOList?: StoreVO[];
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
  companyInfo?: CompanyInfoVO2;
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
export interface CompanyInfoVO2 {
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
  storeVOList?: StoreVO[];
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
 * 分页分销商品素材信息
 */
export interface MicroServicePageDistributionGoodsMatterPageVO {
  /**
   * 具体数据内容
   */
  content?: DistributionGoodsMatterPageVO[];
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
export interface DistributionGoodsMatterPageVO {
  /**
   * 发布者账号
   */
  account?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * 商品sku的id
   */
  goodsInfoId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 素材
   */
  matter?: string;
  /**
   * 素材类型
   * * GOODS: 0: 商品素材
   * * MARKETING: 1: 营销素材
   */
  matterType?: 0 | 1;
  /**
   * 发布者名称
   */
  name?: string;
  /**
   * 发布者id
   */
  operatorId?: string;
  /**
   * 推荐语
   */
  recommend?: string;
  /**
   * 推荐次数
   */
  recommendNum?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 商品信息
 */
export interface GoodsInfoVO {
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
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
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
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
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
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterPriseAuditState?: 0 | 1 | 2 | 3;
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
  goods?: GoodsVO;
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
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
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
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
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
export interface CouponLabelVO {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
export interface GoodsVO {
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
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 分类编号
   */
  cateId?: number;
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
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
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
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 商品类型
   */
  goodsType?: number;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 注水销量
   */
  shamSalesNum?: number;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
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
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 促销标签
 */
export interface GrouponLabelVO {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
export interface MarketingLabelVO {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface GoodsInfoSpecDetailRelVO {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionGoodsMatterPageResponse".
 */
export interface DistributionGoodsMatterPageResponse1 {
  /**
   * 商家信息数据
   */
  companyInfoList?: CompanyInfoVO[];
  distributionGoodsMatterPage?: MicroServicePageDistributionGoodsMatterPageVO;
  /**
   * 商品SKU的规格值全部数据
   */
  goodsInfoSpecDetails?: GoodsInfoSpecDetailRelVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CompanyInfoVO".
 */
export interface CompanyInfoVO3 {
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
  storeVOList?: StoreVO[];
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EmployeeVO".
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
  companyInfo?: CompanyInfoVO1;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreVO".
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
  companyInfo?: CompanyInfoVO2;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«DistributionGoodsMatterPageVO»".
 */
export interface MicroServicePageDistributionGoodsMatterPageVO1 {
  /**
   * 具体数据内容
   */
  content?: DistributionGoodsMatterPageVO[];
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
 * via the `definition` "DistributionGoodsMatterPageVO".
 */
export interface DistributionGoodsMatterPageVO1 {
  /**
   * 发布者账号
   */
  account?: string;
  goodsInfo?: GoodsInfoVO;
  /**
   * 商品sku的id
   */
  goodsInfoId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 素材
   */
  matter?: string;
  /**
   * 素材类型
   * * GOODS: 0: 商品素材
   * * MARKETING: 1: 营销素材
   */
  matterType?: 0 | 1;
  /**
   * 发布者名称
   */
  name?: string;
  /**
   * 发布者id
   */
  operatorId?: string;
  /**
   * 推荐语
   */
  recommend?: string;
  /**
   * 推荐次数
   */
  recommendNum?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoVO".
 */
export interface GoodsInfoVO1 {
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
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
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
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
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
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 企业购商品的审核状态
   * * INIT: 0：无状态
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核
   * * NOT_PASS: 3：审核未通过
   */
  enterPriseAuditState?: 0 | 1 | 2 | 3;
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
  goods?: GoodsVO;
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
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
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
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponLabelVO".
 */
export interface CouponLabelVO1 {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO1 {
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
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 购买积分
   */
  buyPoint?: number;
  /**
   * 分类编号
   */
  cateId?: number;
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
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
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
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品来源，0供应商，1商家
   */
  goodsSource?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 商品类型
   */
  goodsType?: number;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 注水销量
   */
  shamSalesNum?: number;
  /**
   * 排序号
   */
  sortNo?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
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
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 供货价
   */
  supplyPrice?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponLabelVO".
 */
export interface GrouponLabelVO1 {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingLabelVO".
 */
export interface MarketingLabelVO1 {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoSpecDetailRelVO".
 */
export interface GoodsInfoSpecDetailRelVO1 {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteListUpdateRecommendNumRequestReq".
 */
export interface IDeleteListUpdateRecommendNumRequestReq {
  /**
   * 分销素材的ID
   */
  id?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageDistributionGoodsMatterPageRequestReq".
 */
export interface IPageDistributionGoodsMatterPageRequestReq {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 平台类目
   */
  cateId?: number;
  /**
   * 批量商品分类
   */
  cateIds?: number[];
  /**
   * customerId
   */
  customerId?: string;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 商品skuid
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * Sku编码
   */
  goodsInfoNo?: string;
  /**
   * 素材类型
   * * GOODS: 0: 商品素材
   * * MARKETING: 1: 营销素材
   */
  matterType?: 0 | 1;
  /**
   * 发布者id
   */
  operatorId?: string;
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
   * 引用次数范围（大）
   */
  recommendNumMax?: number;
  /**
   * 引用次数范围（小）
   */
  recommendNumMin?: number;
  sort?: Sort1;
  /**
   * 引用次数排序
   * * ASC: asc:升序
   * * DESC: desc:倒序
   */
  sortByRecommendNum?: number;
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
   * 店铺id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageNewDistributionGoodsMatterPageRequestReq".
 */
export interface IPageNewDistributionGoodsMatterPageRequestReq {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 平台类目
   */
  cateId?: number;
  /**
   * 批量商品分类
   */
  cateIds?: number[];
  /**
   * customerId
   */
  customerId?: string;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 商品skuid
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * Sku编码
   */
  goodsInfoNo?: string;
  /**
   * 素材类型
   * * GOODS: 0: 商品素材
   * * MARKETING: 1: 营销素材
   */
  matterType?: 0 | 1;
  /**
   * 发布者id
   */
  operatorId?: string;
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
   * 引用次数范围（大）
   */
  recommendNumMax?: number;
  /**
   * 引用次数范围（小）
   */
  recommendNumMin?: number;
  sort?: Sort1;
  /**
   * 引用次数排序
   * * ASC: asc:升序
   * * DESC: desc:倒序
   */
  sortByRecommendNum?: number;
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
   * 店铺id
   */
  storeId?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
