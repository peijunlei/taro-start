import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreCateBaseController';

/**
 *
 * 查询店铺商品分类List(扁平的)
 *
 */
async function list(request: IListRequestReq): Promise<StoreCateResponseVOArray> {
  let result = await sdk.post<StoreCateResponseVOArray>(
    '/storeCate',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  list,
};

/**
 * 内容
 */
export type StoreCateResponseVOArray = StoreCateResponseVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCateResponseVOArray".
 */
export type StoreCateResponseVOArray1 = StoreCateResponseVO2[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCateListWithoutDefaultByStoreIdRequest".
 */
export interface StoreCateListWithoutDefaultByStoreIdRequest {
  /**
   * 店铺Id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«StoreCateResponseVO»»".
 */
export interface BaseResponseListStoreCateResponseVO {
  /**
   * 结果码
   */
  code: string;
  context?: StoreCateResponseVOArray;
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
export interface StoreCateResponseVO {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO[];
  /**
   * 店铺标识
   */
  storeId?: number;
  [k: string]: any;
}
export interface StoreCateVO {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
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
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO1[];
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface StoreCateVO1 {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
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
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO1[];
  /**
   * 店铺标识
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
 * via the `definition` "StoreCateResponseVO".
 */
export interface StoreCateResponseVO1 {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO[];
  /**
   * 店铺标识
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCateVO".
 */
export interface StoreCateVO2 {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
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
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO1[];
  /**
   * 店铺标识
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
 * via the `definition` "IListRequestReq".
 */
export interface IListRequestReq {
  /**
   * 店铺Id
   */
  storeId?: number;
  [k: string]: any;
}
export interface StoreCateResponseVO2 {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 店铺分类名称
   */
  cateName?: string;
  /**
   * 父分类标识
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 店铺分类标识
   */
  storeCateId?: number;
  /**
   * 一对多关系，子分类
   */
  storeCateList?: StoreCateVO[];
  /**
   * 店铺标识
   */
  storeId?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
