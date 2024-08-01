import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SmallShopCustomerAnalyzeInfoController';

/**
 *
 * 会员分析信息
 *
 */
async function info(
  request: IInfoRequestReq,
): Promise<SmallShopCustomerAnalyzeInfoByCustomerIdResponse> {
  let result = await sdk.post<SmallShopCustomerAnalyzeInfoByCustomerIdResponse>(
    '/smallshopcustomeranalyze/info',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 *  分页推送用户最爱列表
 *
 */
async function recommendPage(
  request: IRecommendPageRequestReq,
): Promise<SmallShopCustomerRecommendPageResponse> {
  let result = await sdk.post<SmallShopCustomerRecommendPageResponse>(
    '/smallshopcustomeranalyze/recommend-page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  info,

  recommendPage,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerAnalyzeInfoByCustomerIdRequest".
 */
export interface SmallShopCustomerAnalyzeInfoByCustomerIdRequest {
  /**
   * 用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCustomerAnalyzeInfoByCustomerIdResponse»".
 */
export interface BaseResponseSmallShopCustomerAnalyzeInfoByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCustomerAnalyzeInfoByCustomerIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCustomerAnalyzeInfoByCustomerIdResponse {
  customerInfoVO?: CustomerInfoVO;
  smallShopCustomerAnalyzeInfoVO?: SmallShopCustomerAnalyzeInfoVO;
  /**
   * 微店主客户关系关联表列表结果
   */
  smallShopCustomerTagVOs?: SmallShopCustomerTagVO[];
  [k: string]: any;
}
/**
 * 会员基本信息
 */
export interface CustomerInfoVO {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 星座
   */
  constellation?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  defaultAddress?: CustomerDeliveryAddressVO;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 是否有小孩，0：无 1：有
   */
  hadchildren?: number;
  /**
   * 职位
   */
  proCertification?: string;
  /**
   * 默认地址
   */
  provinceId?: string;
  usualAddress?: CustomerDeliveryAddressVO1;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * 默认地址
 */
export interface CustomerDeliveryAddressVO {
  /**
   * 删除人
   */
  addrLat?: string;
  /**
   * 删除人
   */
  addrLng?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
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
   * 客户ID
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * 常用地址
 */
export interface CustomerDeliveryAddressVO1 {
  /**
   * 删除人
   */
  addrLat?: string;
  /**
   * 删除人
   */
  addrLng?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
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
   * 客户ID
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * 会员分析信息
 */
export interface SmallShopCustomerAnalyzeInfoVO {
  /**
   * 行为分析-活跃-天数
   */
  activeDay?: string;
  /**
   * 行为分析-活跃-最近登录时间
   */
  activeLastLoginDay?: string;
  /**
   * 收藏-最近收藏的商品id
   */
  collectLatelyGoodsInfoId?: string;
  /**
   * 收藏-最近收藏的商品名称
   */
  collectLatelyGoodsInfoName?: string;
  /**
   * 收藏-最多的商品分类id
   */
  collectMostCateId?: string;
  /**
   * 收藏-最多的商品分类名称
   */
  collectMostCateName?: string;
  /**
   * 收藏-累计收藏商品数量
   */
  collectTotal?: string;
  /**
   * 会员分析详情id
   */
  customerAnalyzeId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员得分-RFM会员类型 0:高价值会员 1:重点唤回会员 2:持续深耕会员 3.重点挽留会员 4:潜力会员 5:新会员 6:一般维持会员 7:流失会员
   * * HIGHVALUEMEMBER: 0:高价值会员
   * * FOCUSRECALLMEMBER: 1:重点唤回会员
   * * DEEPCAREMEMBER: 2:持续深耕会员
   * * ASKTOSTAYMEMBER: 3.重点挽留会员
   * * POTENTIALMEMBER: 4:潜力会员
   * * NEWMEMBER: 5:新会员
   * * GENERALKEEPMEMBER: 6:一般维持会
   * * LOSTMEMBER: 7:流失会员
   */
  customerRfmType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 评价-最近评价的商品id
   */
  evaluateLatelyGoodsInfoId?: string;
  /**
   * 评价-最近评价的商品名称
   */
  evaluateLatelyGoodsInfoName?: string;
  /**
   * 评价-内容最多的商品id
   */
  evaluateMostGoodsInfoId?: string;
  /**
   * 评价-内容最多的商品名称
   */
  evaluateMostGoodsInfoName?: string;
  /**
   * 评价-累计评价数量
   */
  evaluateTotal?: string;
  /**
   * 会员得分-RFM综合评价分【14】分
   */
  gradeRfm?: string;
  /**
   * 问诊-最近一次问诊时间
   */
  inquiryLatelyTime?: string;
  /**
   * 问诊-最多的药品（可以逗号分隔）
   */
  inquiryMostGoodsInfoName?: string;
  /**
   * 问诊-最多的内容**病
   */
  inquiryMostWords?: string;
  /**
   * 问诊-累计问诊次数
   */
  inquiryTotal?: string;
  /**
   * 优惠活动-累计最多类型使用优惠券数量
   */
  marketingMostCouponCount?: string;
  /**
   * 优惠活动-使用最多的优惠券类型
   */
  marketingMostCouponType?: string;
  /**
   * 会员得分-营销建议
   */
  marketingSuggestion?: string;
  /**
   * 优惠活动-累计领取优惠券数量
   */
  marketingTotalCouponCount?: string;
  /**
   * 优惠活动-累计使用优惠券数量
   */
  marketingUsedCouponCount?: string;
  /**
   * 最喜欢-文章分类id
   */
  preferBlogCateId?: string;
  /**
   * 最喜欢-文章分类名称
   */
  preferBlogCateName?: string;
  /**
   * 最喜欢-品牌分类id
   */
  preferGoodsBrandId?: string;
  /**
   * 最喜欢-品牌分类名称
   */
  preferGoodsBrandName?: string;
  /**
   * 最喜欢-最关注的商品类目id
   */
  preferGoodsCateId?: string;
  /**
   * 最喜欢-最关注的商品类目名称
   */
  preferGoodsCateName?: string;
  /**
   * 最喜欢-商品id
   */
  preferGoodsInfoId?: string;
  /**
   * 最喜欢-商品名称
   */
  preferGoodsInfoName?: string;
  /**
   * 最喜欢-最喜欢参加活动id
   */
  preferMarketingActivetyId?: string;
  /**
   * 最喜欢-最喜欢参加活动名称
   */
  preferMarketingActivetyName?: string;
  /**
   * 最喜欢-最喜欢参加活动类型
   */
  preferMarketingActivetyType?: string;
  /**
   * 最喜欢-处方药名品称（可逗号分隔）
   */
  preferMedicineGoodsInfoName?: string;
  /**
   * 最喜欢-处方单id
   */
  preferMedicineRecipeId?: string;
  /**
   * 分享-次数最多的文章id
   */
  shareMostBlogId?: string;
  /**
   * 分享-次数最多的文章名称
   */
  shareMostBlogName?: string;
  /**
   * 分享-次数最多的商品id
   */
  shareMostGoodsInfoId?: string;
  /**
   * 分享-次数最多的商品名称
   */
  shareMostGoodsInfoName?: string;
  /**
   * 分享-累计分享次数
   */
  shareTotal?: string;
  /**
   * 会员得分-从注册至今已经累计消费金额
   */
  shoppingAmount?: number;
  /**
   * 会员得分-最近一年内累计消费金额
   */
  shoppingAmountLastYear?: number;
  /**
   * 购物车-最近添加的商品id
   */
  shoppingCartLatelyGoodsInfoId?: string;
  /**
   * 购物车-最近添加的商品名称
   */
  shoppingCartLatelyGoodsInfoName?: string;
  /**
   * 购物车-添加数量最多的商品id
   */
  shoppingCartMostGoodInfoId?: string;
  /**
   * 购物车-添加数量最多的商品名称
   */
  shoppingCartMostGoodsInfoName?: string;
  /**
   * 购物车-累计添加商品数量
   */
  shoppingCartTotal?: string;
  /**
   * 会员得分-未下单购物天数
   */
  shoppingLatelyCount?: string;
  /**
   * 会员得分-最近购物时间：2019-07-01
   */
  shoppingLatelyTime?: string;
  /**
   * 会员得分-从注册账户至今已下单购物次数
   */
  shoppingTimes?: string;
  /**
   * 会员得分-最近一年内总共下单购次数
   */
  shoppingTimesLastYear?: string;
  /**
   * 点赞-累计点赞文章数量
   */
  tagsBlogTotal?: string;
  /**
   * 点赞-最近点赞文章名称
   */
  tagsLatelyBlogName?: string;
  /**
   * 下单-最近交易金额
   */
  tradeLatelyAmount?: number;
  /**
   * 下单-最近交易商品名称（可以逗号分隔）
   */
  tradeLatelyGoodsInfoName?: string;
  /**
   * 下单-累计下单数量
   */
  tradeTotal?: string;
  /**
   * 下单-累计消费金额
   */
  tradeTotalAmount?: number;
  /**
   * 下单-累计购买商品数量
   */
  tradeTotalGoodsNum?: string;
  /**
   * 浏览-最近的商品id
   */
  viewLatelyGoodsInfoId?: string;
  /**
   * 浏览-最近的商品名称
   */
  viewLatelyGoodsInfoName?: string;
  /**
   * 浏览-最多的商品id
   */
  viewMostGoodsInfoId?: string;
  /**
   * 浏览-最多的商品名称
   */
  viewMostGoodsInfoName?: string;
  /**
   * 浏览-累计浏览商品次数
   */
  viewTotal?: string;
  [k: string]: any;
}
export interface SmallShopCustomerTagVO {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerAnalyzeInfoByCustomerIdResponse".
 */
export interface SmallShopCustomerAnalyzeInfoByCustomerIdResponse1 {
  customerInfoVO?: CustomerInfoVO;
  smallShopCustomerAnalyzeInfoVO?: SmallShopCustomerAnalyzeInfoVO;
  /**
   * 微店主客户关系关联表列表结果
   */
  smallShopCustomerTagVOs?: SmallShopCustomerTagVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerInfoVO".
 */
export interface CustomerInfoVO1 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 星座
   */
  constellation?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  defaultAddress?: CustomerDeliveryAddressVO;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 是否有小孩，0：无 1：有
   */
  hadchildren?: number;
  /**
   * 职位
   */
  proCertification?: string;
  /**
   * 默认地址
   */
  provinceId?: string;
  usualAddress?: CustomerDeliveryAddressVO1;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressVO".
 */
export interface CustomerDeliveryAddressVO2 {
  /**
   * 删除人
   */
  addrLat?: string;
  /**
   * 删除人
   */
  addrLng?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
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
   * 客户ID
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "SmallShopCustomerAnalyzeInfoVO".
 */
export interface SmallShopCustomerAnalyzeInfoVO1 {
  /**
   * 行为分析-活跃-天数
   */
  activeDay?: string;
  /**
   * 行为分析-活跃-最近登录时间
   */
  activeLastLoginDay?: string;
  /**
   * 收藏-最近收藏的商品id
   */
  collectLatelyGoodsInfoId?: string;
  /**
   * 收藏-最近收藏的商品名称
   */
  collectLatelyGoodsInfoName?: string;
  /**
   * 收藏-最多的商品分类id
   */
  collectMostCateId?: string;
  /**
   * 收藏-最多的商品分类名称
   */
  collectMostCateName?: string;
  /**
   * 收藏-累计收藏商品数量
   */
  collectTotal?: string;
  /**
   * 会员分析详情id
   */
  customerAnalyzeId?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员得分-RFM会员类型 0:高价值会员 1:重点唤回会员 2:持续深耕会员 3.重点挽留会员 4:潜力会员 5:新会员 6:一般维持会员 7:流失会员
   * * HIGHVALUEMEMBER: 0:高价值会员
   * * FOCUSRECALLMEMBER: 1:重点唤回会员
   * * DEEPCAREMEMBER: 2:持续深耕会员
   * * ASKTOSTAYMEMBER: 3.重点挽留会员
   * * POTENTIALMEMBER: 4:潜力会员
   * * NEWMEMBER: 5:新会员
   * * GENERALKEEPMEMBER: 6:一般维持会
   * * LOSTMEMBER: 7:流失会员
   */
  customerRfmType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 评价-最近评价的商品id
   */
  evaluateLatelyGoodsInfoId?: string;
  /**
   * 评价-最近评价的商品名称
   */
  evaluateLatelyGoodsInfoName?: string;
  /**
   * 评价-内容最多的商品id
   */
  evaluateMostGoodsInfoId?: string;
  /**
   * 评价-内容最多的商品名称
   */
  evaluateMostGoodsInfoName?: string;
  /**
   * 评价-累计评价数量
   */
  evaluateTotal?: string;
  /**
   * 会员得分-RFM综合评价分【14】分
   */
  gradeRfm?: string;
  /**
   * 问诊-最近一次问诊时间
   */
  inquiryLatelyTime?: string;
  /**
   * 问诊-最多的药品（可以逗号分隔）
   */
  inquiryMostGoodsInfoName?: string;
  /**
   * 问诊-最多的内容**病
   */
  inquiryMostWords?: string;
  /**
   * 问诊-累计问诊次数
   */
  inquiryTotal?: string;
  /**
   * 优惠活动-累计最多类型使用优惠券数量
   */
  marketingMostCouponCount?: string;
  /**
   * 优惠活动-使用最多的优惠券类型
   */
  marketingMostCouponType?: string;
  /**
   * 会员得分-营销建议
   */
  marketingSuggestion?: string;
  /**
   * 优惠活动-累计领取优惠券数量
   */
  marketingTotalCouponCount?: string;
  /**
   * 优惠活动-累计使用优惠券数量
   */
  marketingUsedCouponCount?: string;
  /**
   * 最喜欢-文章分类id
   */
  preferBlogCateId?: string;
  /**
   * 最喜欢-文章分类名称
   */
  preferBlogCateName?: string;
  /**
   * 最喜欢-品牌分类id
   */
  preferGoodsBrandId?: string;
  /**
   * 最喜欢-品牌分类名称
   */
  preferGoodsBrandName?: string;
  /**
   * 最喜欢-最关注的商品类目id
   */
  preferGoodsCateId?: string;
  /**
   * 最喜欢-最关注的商品类目名称
   */
  preferGoodsCateName?: string;
  /**
   * 最喜欢-商品id
   */
  preferGoodsInfoId?: string;
  /**
   * 最喜欢-商品名称
   */
  preferGoodsInfoName?: string;
  /**
   * 最喜欢-最喜欢参加活动id
   */
  preferMarketingActivetyId?: string;
  /**
   * 最喜欢-最喜欢参加活动名称
   */
  preferMarketingActivetyName?: string;
  /**
   * 最喜欢-最喜欢参加活动类型
   */
  preferMarketingActivetyType?: string;
  /**
   * 最喜欢-处方药名品称（可逗号分隔）
   */
  preferMedicineGoodsInfoName?: string;
  /**
   * 最喜欢-处方单id
   */
  preferMedicineRecipeId?: string;
  /**
   * 分享-次数最多的文章id
   */
  shareMostBlogId?: string;
  /**
   * 分享-次数最多的文章名称
   */
  shareMostBlogName?: string;
  /**
   * 分享-次数最多的商品id
   */
  shareMostGoodsInfoId?: string;
  /**
   * 分享-次数最多的商品名称
   */
  shareMostGoodsInfoName?: string;
  /**
   * 分享-累计分享次数
   */
  shareTotal?: string;
  /**
   * 会员得分-从注册至今已经累计消费金额
   */
  shoppingAmount?: number;
  /**
   * 会员得分-最近一年内累计消费金额
   */
  shoppingAmountLastYear?: number;
  /**
   * 购物车-最近添加的商品id
   */
  shoppingCartLatelyGoodsInfoId?: string;
  /**
   * 购物车-最近添加的商品名称
   */
  shoppingCartLatelyGoodsInfoName?: string;
  /**
   * 购物车-添加数量最多的商品id
   */
  shoppingCartMostGoodInfoId?: string;
  /**
   * 购物车-添加数量最多的商品名称
   */
  shoppingCartMostGoodsInfoName?: string;
  /**
   * 购物车-累计添加商品数量
   */
  shoppingCartTotal?: string;
  /**
   * 会员得分-未下单购物天数
   */
  shoppingLatelyCount?: string;
  /**
   * 会员得分-最近购物时间：2019-07-01
   */
  shoppingLatelyTime?: string;
  /**
   * 会员得分-从注册账户至今已下单购物次数
   */
  shoppingTimes?: string;
  /**
   * 会员得分-最近一年内总共下单购次数
   */
  shoppingTimesLastYear?: string;
  /**
   * 点赞-累计点赞文章数量
   */
  tagsBlogTotal?: string;
  /**
   * 点赞-最近点赞文章名称
   */
  tagsLatelyBlogName?: string;
  /**
   * 下单-最近交易金额
   */
  tradeLatelyAmount?: number;
  /**
   * 下单-最近交易商品名称（可以逗号分隔）
   */
  tradeLatelyGoodsInfoName?: string;
  /**
   * 下单-累计下单数量
   */
  tradeTotal?: string;
  /**
   * 下单-累计消费金额
   */
  tradeTotalAmount?: number;
  /**
   * 下单-累计购买商品数量
   */
  tradeTotalGoodsNum?: string;
  /**
   * 浏览-最近的商品id
   */
  viewLatelyGoodsInfoId?: string;
  /**
   * 浏览-最近的商品名称
   */
  viewLatelyGoodsInfoName?: string;
  /**
   * 浏览-最多的商品id
   */
  viewMostGoodsInfoId?: string;
  /**
   * 浏览-最多的商品名称
   */
  viewMostGoodsInfoName?: string;
  /**
   * 浏览-累计浏览商品次数
   */
  viewTotal?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerTagVO".
 */
export interface SmallShopCustomerTagVO1 {
  /**
   * 会员标识UUID
   */
  customerId?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  /**
   * 标签id
   */
  tagId?: string;
  /**
   * 标签名称
   */
  tagName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerRecommendPageRequest".
 */
export interface SmallShopCustomerRecommendPageRequest {
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 推荐列表类型 0：最喜欢的商品 1：最喜欢的文章 2：最喜欢的品牌 3：最喜欢的商品类目 4：最喜欢的优惠活动  5：最需要的处方药
   * * GOODS: 最喜欢的商品
   * * BLOGS: 最喜欢的文章
   * * BARND: 最喜欢的品牌
   * * CATES: 最喜欢的商品类目
   * * MARKETING: 最喜欢的优惠活动
   * * MEDICINE: 最需要的处方药
   */
  recommendType?: '0' | '1' | '2' | '3' | '4' | '5';
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SmallShopCustomerRecommendPageResponse»".
 */
export interface BaseResponseSmallShopCustomerRecommendPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SmallShopCustomerRecommendPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface SmallShopCustomerRecommendPageResponse {
  blogVOS?: MicroServicePageBlogVO;
  goodsInfoVOS?: MicroServicePageGoodsInfoVO;
  [k: string]: any;
}
/**
 * 文章列表
 */
export interface MicroServicePageBlogVO {
  /**
   * 具体数据内容
   */
  content?: BlogVO[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface BlogVO {
  /**
   * 文章id
   */
  blogId?: string;
  /**
   * 文章图片
   */
  blogImg?: string;
  /**
   * 文章名称
   */
  blogName?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * 商品列表
 */
export interface MicroServicePageGoodsInfoVO {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO[];
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
  sort?: Sort1;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
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
   * 批准文号
   */
  approvalNumber?: string;
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
   * 商品采购价
   */
  caigouPrice?: number;
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
   * 供应商类型
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
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * erp编码
   */
  erpCode?: string;
  /**
   * 是否收藏
   */
  followState?: boolean;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 通用名
   */
  generalName?: string;
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
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 商品所属的纬度
   */
  latitude?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 商品所属的经度
   */
  longitude?: number;
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
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 原参与营销商品总数
   */
  oldProductNum?: number;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 实际销量
   */
  presaleNum?: number;
  /**
   * 营销活动价格
   */
  presalePrice?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 参与营销商品总数
   */
  productNum?: number;
  /**
   * 记录购物车商品价格
   */
  purchasePrice?: number;
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
   * 是否支持上门自提
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
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
  specificStock?: boolean;
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
   * 临时距离 非查询值
   */
  tempDistance?: number;
  /**
   * 是否支持2小时达
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
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
  /**
   * 是否禁止在新增众测活动时选择
   */
  zhongceForbiddenFlag?: boolean;
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
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
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
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
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
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
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
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
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
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * 剂型对象
 */
export interface DrugFormVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 品牌对象
 */
export interface GoodsBrandVO {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
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
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 国家对象
 */
export interface CountryVO {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
export interface GoodsCateVO {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
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
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCatePropVO {
  /**
   * 分类id
   */
  cateId?: number;
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
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropDetailVO {
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
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 计量单位
 */
export interface MeterUnitVO {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * 生产厂商
 */
export interface ProductorVO {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
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
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerRecommendPageResponse".
 */
export interface SmallShopCustomerRecommendPageResponse1 {
  blogVOS?: MicroServicePageBlogVO;
  goodsInfoVOS?: MicroServicePageGoodsInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«BlogVO»".
 */
export interface MicroServicePageBlogVO1 {
  /**
   * 具体数据内容
   */
  content?: BlogVO[];
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
  sort?: Sort;
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
 * via the `definition` "BlogVO".
 */
export interface BlogVO1 {
  /**
   * 文章id
   */
  blogId?: string;
  /**
   * 文章图片
   */
  blogImg?: string;
  /**
   * 文章名称
   */
  blogName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GoodsInfoVO»".
 */
export interface MicroServicePageGoodsInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO[];
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
  sort?: Sort1;
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
   * 批准文号
   */
  approvalNumber?: string;
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
   * 商品采购价
   */
  caigouPrice?: number;
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
   * 供应商类型
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
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * erp编码
   */
  erpCode?: string;
  /**
   * 是否收藏
   */
  followState?: boolean;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 通用名
   */
  generalName?: string;
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
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 商品所属的纬度
   */
  latitude?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 商品所属的经度
   */
  longitude?: number;
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
   * 商品药品分类
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 原参与营销商品总数
   */
  oldProductNum?: number;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 实际销量
   */
  presaleNum?: number;
  /**
   * 营销活动价格
   */
  presalePrice?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 参与营销商品总数
   */
  productNum?: number;
  /**
   * 记录购物车商品价格
   */
  purchasePrice?: number;
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
   * 是否支持上门自提
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
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
  specificStock?: boolean;
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
   * 临时距离 非查询值
   */
  tempDistance?: number;
  /**
   * 是否支持2小时达
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
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
  /**
   * 是否禁止在新增众测活动时选择
   */
  zhongceForbiddenFlag?: boolean;
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
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
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
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
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
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
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
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
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
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrugFormVO".
 */
export interface DrugFormVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
export interface GoodsBrandVO1 {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
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
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CountryVO".
 */
export interface CountryVO1 {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateVO".
 */
export interface GoodsCateVO1 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
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
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCatePropVO".
 */
export interface GoodsCatePropVO1 {
  /**
   * 分类id
   */
  cateId?: number;
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
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailVO".
 */
export interface GoodsPropDetailVO1 {
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
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MeterUnitVO".
 */
export interface MeterUnitVO1 {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ProductorVO".
 */
export interface ProductorVO1 {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
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
 * via the `definition` "IInfoRequestReq".
 */
export interface IInfoRequestReq {
  /**
   * 用户编号
   */
  customerId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRecommendPageRequestReq".
 */
export interface IRecommendPageRequestReq {
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 推荐列表类型 0：最喜欢的商品 1：最喜欢的文章 2：最喜欢的品牌 3：最喜欢的商品类目 4：最喜欢的优惠活动  5：最需要的处方药
   * * GOODS: 最喜欢的商品
   * * BLOGS: 最喜欢的文章
   * * BARND: 最喜欢的品牌
   * * CATES: 最喜欢的商品类目
   * * MARKETING: 最喜欢的优惠活动
   * * MEDICINE: 最需要的处方药
   */
  recommendType?: '0' | '1' | '2' | '3' | '4' | '5';
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
