import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsShareRecordController';

/**
 *
 * 新增商品分享
 *
 */
async function add(addReq: IAddAddReqReq): Promise<GoodsShareRecordAddResponse> {
  let result = await sdk.post<GoodsShareRecordAddResponse>(
    '/goods/share/record/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

export default {
  add,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsShareRecordAddRequest".
 */
export interface GoodsShareRecordAddRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsShareRecordAddResponse»".
 */
export interface BaseResponseGoodsShareRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsShareRecordAddResponse;
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
export interface GoodsShareRecordAddResponse {
  goodsShareRecordVO?: GoodsShareRecordVO;
  [k: string]: any;
}
/**
 * 已新增的商品分享信息
 */
export interface GoodsShareRecordVO {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * shareId
   */
  shareId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsShareRecordAddResponse".
 */
export interface GoodsShareRecordAddResponse1 {
  goodsShareRecordVO?: GoodsShareRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsShareRecordVO".
 */
export interface GoodsShareRecordVO1 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * shareId
   */
  shareId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
