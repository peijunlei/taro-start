import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsBrandBaseController';

/**
 *
 * 条件查询商品品牌列表
 *
 */
async function allGoodsBrands(
  brandIds: IAllGoodsBrandsBrandIdsReq,
  brandName: IAllGoodsBrandsBrandNameReq,
  brandType: IAllGoodsBrandsBrandTypeReq,
  delFlag: IAllGoodsBrandsDelFlagReq,
  keywords: IAllGoodsBrandsKeywordsReq,
  likeBrandName: IAllGoodsBrandsLikeBrandNameReq,
  likeNickName: IAllGoodsBrandsLikeNickNameReq,
  likePinYin: IAllGoodsBrandsLikePinYinReq,
  nickName: IAllGoodsBrandsNickNameReq,
  notBrandId: IAllGoodsBrandsNotBrandIdReq,
): Promise<GoodsBrandVOArray> {
  let result = await sdk.get<GoodsBrandVOArray>(
    '/goods/allGoodsBrands',

    {
      ...brandIds,

      brandName,

      brandType,

      delFlag,

      keywords,

      likeBrandName,

      likeNickName,

      likePinYin,

      nickName,

      notBrandId,
    },
  );
  return result.context;
}

/**
 *
 * 根据商品品牌id查询商品品牌信息
 *
 */
async function list(brandId: IListBrandIdReq): Promise<GoodsBrandByIdResponse> {
  let result = await sdk.get<GoodsBrandByIdResponse>(
    '/goods/goodsBrand/{brandId}'.replace('{brandId}', brandId + ''),

    {},
  );
  return result.context;
}

export default {
  allGoodsBrands,

  list,
};

/**
 * 内容
 */
export type GoodsBrandVOArray = GoodsBrandVO[];
/**
 * 批量品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsBrandIdsReq".
 */
export type IAllGoodsBrandsBrandIdsReq = number[];
/**
 * and 精准查询，品牌名称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsBrandNameReq".
 */
export type IAllGoodsBrandsBrandNameReq = string;
/**
 * 品牌类型 0：药品  1：非药品
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsBrandTypeReq".
 */
export type IAllGoodsBrandsBrandTypeReq = number;
/**
 * 删除标记
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsDelFlagReq".
 */
export type IAllGoodsBrandsDelFlagReq = number;
/**
 * 品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsKeywordsReq".
 */
export type IAllGoodsBrandsKeywordsReq = string;
/**
 * and 模糊查询，品牌名称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsLikeBrandNameReq".
 */
export type IAllGoodsBrandsLikeBrandNameReq = string;
/**
 * and 模糊查询，品牌昵称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsLikeNickNameReq".
 */
export type IAllGoodsBrandsLikeNickNameReq = string;
/**
 * 模糊查询，品牌拼音
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsLikePinYinReq".
 */
export type IAllGoodsBrandsLikePinYinReq = string;
/**
 * and 精准查询，品牌昵称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsNickNameReq".
 */
export type IAllGoodsBrandsNickNameReq = string;
/**
 * 品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAllGoodsBrandsNotBrandIdReq".
 */
export type IAllGoodsBrandsNotBrandIdReq = number;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVOArray".
 */
export type GoodsBrandVOArray1 = GoodsBrandVO2[];
/**
 * 商品品牌id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListBrandIdReq".
 */
export type IListBrandIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«GoodsBrandVO»»".
 */
export interface BaseResponseListGoodsBrandVO {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsBrandVOArray;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
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
 * via the `definition` "BaseResponse«GoodsBrandByIdResponse»".
 */
export interface BaseResponseGoodsBrandByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsBrandByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GoodsBrandByIdResponse {
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
  countryVO?: CountryVO2;
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
export interface CountryVO2 {
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
 * via the `definition` "GoodsBrandByIdResponse".
 */
export interface GoodsBrandByIdResponse1 {
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
  countryVO?: CountryVO2;
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
export interface GoodsBrandVO2 {
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

//create by moon https://github.com/creasy2010/moon
