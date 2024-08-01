import {_} from 'wmkit';
import {isLogin} from '@/wmkit/common/kit';

export enum MarketingTypeEnum {
  /**
   * 满减
   */
  FullReduction = 0,
  /**
   * 满折
   */
  FullFold = 1,
  /**
   * 满赠
   */
  FullGift = 2,
  /**
   * 一口价
   */
  FinalPrice = 3,
  /**
   * 第二件半价
   */
  SecondHalfPrice = 4,
  /**
   * 秒杀
   */
  FlashSale = 5,
  /**
   * 支付赠券(满返)
   */
  FullCoupon = 7,
  /**
   * 加价购
   */
  Preferential = 8,
  /**
   * 限时抢购
   */
  SnapSale = 111,
  /**
   * 拼团
   */
  Groupon = 101,
  /**
   * 预售
   */
  Presale = 102,
  /**
   * 预约
   */
  Reserve = 103,
  /**
   * 分销
   */
  Distribution = 104,
  /**
   * 优惠券
   */
  Coupon = 106,
  /**
   * 会员等级价
   */
  MemberLevelPrice = 107,
  /**
   * 会员价
   */
  MemberPrice = 108,
  /**
   * 企业价
   */
  EnterprisePrice = 109,
  /**
   * 付费会员价格
   */
  PayMemberLevelPrice = 112,
  /**
   * 新人专享价格
   */
  NewPrice = 114,
  /**
   * 拼团
   */
  Suits = 101,
}

export type MarketingType = MarketingTypeEnum;
type MarketingDesc = string;
type PluginPrice = number;

export type Marketing = {
  marketingType: MarketingType;
  marketingDesc: MarketingDesc;
  pluginPrice: PluginPrice;
  linkId?: string;
  marketingId?: string;
  startTime?: string;
  endTime?: string;
};

export type POJO<T = any> = {
  [key: string]: T;
};

export const getMarketings = (marketingPluginLabels: Marketing[]): Marketing[] => {
  marketingPluginLabels = filterEmpty(marketingPluginLabels);
  const marketings = [];
  marketingPluginLabels.forEach((marketing) => {
    switch (marketing.marketingType) {
      case MarketingTypeEnum.FullReduction:
        marketings[MarketingTypeEnum.FullReduction] = marketing;
        break;
      case MarketingTypeEnum.FullFold:
        marketings[MarketingTypeEnum.FullFold] = marketing;
        break;
      case MarketingTypeEnum.FullGift:
        marketings[MarketingTypeEnum.FullGift] = marketing;
        break;
      case MarketingTypeEnum.FinalPrice:
        marketings[MarketingTypeEnum.FinalPrice] = marketing;
        break;
      case MarketingTypeEnum.SecondHalfPrice:
        marketings[MarketingTypeEnum.SecondHalfPrice] = marketing;
        break;
      case MarketingTypeEnum.FlashSale:
        marketings[MarketingTypeEnum.FlashSale] = marketing;
        break;
      case MarketingTypeEnum.SnapSale:
        marketings[MarketingTypeEnum.SnapSale] = marketing;
        break;
      case MarketingTypeEnum.Preferential:
        marketings[MarketingTypeEnum.Preferential] = marketing;
        break;
      case MarketingTypeEnum.Groupon:
        marketings[MarketingTypeEnum.Groupon] = marketing;
        break;
      case MarketingTypeEnum.Presale:
        marketings[MarketingTypeEnum.Presale] = marketing;
        break;
      case MarketingTypeEnum.Reserve:
        marketings[MarketingTypeEnum.Reserve] = marketing;
        break;
      case MarketingTypeEnum.Distribution:
        marketings[MarketingTypeEnum.Distribution] = marketing;
        break;
      case MarketingTypeEnum.Coupon:
        marketings[MarketingTypeEnum.Coupon] = marketing;
        break;
      case MarketingTypeEnum.MemberLevelPrice:
        marketings[MarketingTypeEnum.MemberLevelPrice] = marketing;
        break;
      case MarketingTypeEnum.MemberPrice:
        marketings[MarketingTypeEnum.MemberPrice] = marketing;
        break;
      case MarketingTypeEnum.EnterprisePrice:
        marketings[MarketingTypeEnum.EnterprisePrice] = marketing;
        break;
      case MarketingTypeEnum.FullCoupon:
        marketings[MarketingTypeEnum.FullCoupon] = marketing;
        break;
      case MarketingTypeEnum.PayMemberLevelPrice:
        marketings[MarketingTypeEnum.PayMemberLevelPrice] = marketing;
        break;
      case MarketingTypeEnum.NewPrice:
        marketings[MarketingTypeEnum.NewPrice] = marketing;
        break;
    }
  });
  return marketings;
};

const filterEmpty = (marketings: Marketing[]) => {
  return marketings || [];
};

export const getMarketing = (
  marketingPluginLabels: Marketing[],
  marketingType: MarketingTypeEnum,
): Marketing | null => {
  marketingPluginLabels = filterEmpty(marketingPluginLabels);
  const marketings = marketingPluginLabels.filter((marketing) => marketing.marketingType === marketingType);
  const marketing = marketings.length ? marketings[0] : null;
  return marketing;
};

export const getMarketingMulit = (
  marketingPluginLabels: Marketing[],
  marketingType: MarketingTypeEnum | MarketingTypeEnum[],
): Marketing[] | null => {
  marketingPluginLabels = filterEmpty(marketingPluginLabels);
  let marketings;
  if (Array.isArray(marketingType)) {
    marketings = marketingPluginLabels.filter((marketing) => marketingType.includes(marketing.marketingType));
  } else {
    marketings = marketingPluginLabels.filter((marketing) => marketing.marketingType === marketingType);
  }
  const marketing = marketings.length ? marketings : null;
  return marketing;
};

/**
 * 获取促销活动标签
 * @param marketingPluginLabels
 * @returns
 */
export const getMarketingFull = (marketingPluginLabels: Marketing[]): Marketing[] | null => {
  marketingPluginLabels = filterEmpty(marketingPluginLabels);
  return getMarketingMulit(marketingPluginLabels, [
    MarketingTypeEnum.FullReduction,
    MarketingTypeEnum.FullFold,
    MarketingTypeEnum.FullGift,
    MarketingTypeEnum.FinalPrice,
    MarketingTypeEnum.SecondHalfPrice,
    MarketingTypeEnum.FullCoupon,
    MarketingTypeEnum.Preferential,
  ]);
};

/**
 * 判断是否存在某种营销活动
 * @param marketings
 * @param marketingType
 * @returns
 */
export const isExist = (marketings: Marketing[], marketingType: MarketingTypeEnum): boolean => {
  marketings = filterEmpty(marketings);
  return !!marketings[marketingType];
};

/**
 * 是否存在营销活动：秒杀、拼团、预售、预约、分销
 * @param marketings
 * @returns
 */
export const isExistSpecialMarketing = (marketings: Marketing[]): boolean => {
  marketings = filterEmpty(marketings);
  return (
    isExist(marketings, MarketingTypeEnum.FlashSale) ||
    isExist(marketings, MarketingTypeEnum.SnapSale) ||
    isExist(marketings, MarketingTypeEnum.Groupon) ||
    isExist(marketings, MarketingTypeEnum.Presale) ||
    isExist(marketings, MarketingTypeEnum.Reserve) ||
    isExist(marketings, MarketingTypeEnum.Distribution)
  );
};

/**
 * 是否存在特定的标签
 * @param marketings
 * @returns
 */
export const isExistSomeMarketing = (marketings: Marketing[], activity: MarketingTypeEnum[]): boolean => {
  marketings = filterEmpty(marketings);
  return marketings.some((marketing) => activity.includes(marketing.marketingType));
};

/**
 * 是否展示活动蒙层：非积分购 && (秒杀、拼团、预售、预约)
 * @param marketings
 * @param buyPoint
 * @param invalid
 * @param flashStock
 * @returns 活动蒙层描述
 */
export const showActivityMaskDesc = (
  marketings: Marketing[],
  buyPoint: number,
  invalid: boolean,
  flashStock?: number,
): any => {
  marketings = filterEmpty(marketings);
  if (
    !buyPoint &&
    (!invalid || flashStock > 0) &&
    (isExist(marketings, MarketingTypeEnum.FlashSale) ||
      isExist(marketings, MarketingTypeEnum.SnapSale) ||
      isExist(marketings, MarketingTypeEnum.Groupon) ||
      isExist(marketings, MarketingTypeEnum.Presale) ||
      isExist(marketings, MarketingTypeEnum.Reserve))
  ) {
    return (
      marketings[MarketingTypeEnum.FlashSale]?.marketingDesc ||
      marketings[MarketingTypeEnum.SnapSale]?.marketingDesc ||
      marketings[MarketingTypeEnum.Groupon]?.marketingDesc ||
      marketings[MarketingTypeEnum.Presale]?.marketingDesc ||
      marketings[MarketingTypeEnum.Reserve]?.marketingDesc ||
      ''
    );
  }
  return undefined;
};

/**
 * @param marketings
 * @param buyPoint 积分
 * @returns 企业价
 */
export const showEnterprisePrice = (marketings: Marketing[], buyPoint: number): any => {
  marketings = filterEmpty(marketings);
  buyPoint = resetPoint(buyPoint);
  if (!buyPoint && !isExistSpecialMarketing(marketings) && isExist(marketings, MarketingTypeEnum.EnterprisePrice)) {
    return marketings[MarketingTypeEnum.EnterprisePrice]?.pluginPrice;
  }
  return undefined;
};

export const showNewPrice = (marketings: Marketing[], buyPoint: number): any => {
  marketings = filterEmpty(marketings);
  buyPoint = resetPoint(buyPoint);
  if (!buyPoint && !isExistSpecialMarketing(marketings) && isExist(marketings, MarketingTypeEnum.NewPrice)) {
    return marketings[MarketingTypeEnum.NewPrice]?.pluginPrice;
  }
  return undefined;
};
/**
 * @param marketings
 * @param buyPoint 积分
 * @returns 粉丝价
 */
export const showFansPrice = (marketings: Marketing[], buyPoint: number): any => {
  marketings = filterEmpty(marketings);
  buyPoint = resetPoint(buyPoint);
  if (
    !buyPoint &&
    !isExistSpecialMarketing(marketings) &&
    (isExist(marketings, MarketingTypeEnum.MemberLevelPrice) || isExist(marketings, MarketingTypeEnum.MemberPrice))
  ) {
    return (
      marketings[MarketingTypeEnum.MemberLevelPrice]?.pluginPrice ??
      marketings[MarketingTypeEnum.MemberPrice]?.pluginPrice
    );
  }
  return undefined;
};

/**
 *
 * @param marketings
 * @param buyPoint
 * @returns 积分+粉丝价的字符串
 */
export const showFansPriceToString = (marketings: Marketing[], buyPoint: number): any => {
  const fansPrice = showFansPrice(marketings, buyPoint);
  if (fansPrice != null) {
    const defaultPrice = !buyPoint ? `¥${_.addZero(0)}` : '';
    const pointPrice = !buyPoint ? '' : `${buyPoint}积分`;
    const plus = !buyPoint ? '' : '+';
    return pointPrice + plus + (fansPrice ? `¥${_.addZero(fansPrice)}` : defaultPrice);
  }
  return undefined;
};

export const showFansPriceAndPayMemberToString = (marketings: Marketing[], buyPoint: number): any => {
  marketings = filterEmpty(marketings);
  buyPoint = resetPoint(buyPoint);
  if (!buyPoint && isExist(marketings, MarketingTypeEnum.PayMemberLevelPrice)) {
    return _.addZero(marketings[MarketingTypeEnum.PayMemberLevelPrice]?.pluginPrice) + '';
  }
  return undefined;
};

/**
 * @param marketings
 * @param priceType 售价类型 0：客户 1：订货
 * @param intervalMinPrice 最低的区间价
 * @param marketPrice 市场价
 * @returns 活动价||市场价
 */
export const showActivityPrice = (
  marketings: Marketing[],
  priceType: number,
  intervalMinPrice: number,
  marketPrice: number,
): number => {
  marketings = filterEmpty(marketings);
  if (
    isExistSomeMarketing(marketings, [
      MarketingTypeEnum.FlashSale,
      MarketingTypeEnum.SnapSale,
      MarketingTypeEnum.Groupon,
      MarketingTypeEnum.Reserve,
      MarketingTypeEnum.Presale,
    ])
  ) {
    return (
      marketings[MarketingTypeEnum.FlashSale]?.pluginPrice ??
      marketings[MarketingTypeEnum.SnapSale]?.pluginPrice ??
      marketings[MarketingTypeEnum.Groupon]?.pluginPrice ??
      marketings[MarketingTypeEnum.Reserve]?.pluginPrice ??
      marketings[MarketingTypeEnum.Presale]?.pluginPrice ??
      marketPrice
    );
  } else if (isExist(marketings, MarketingTypeEnum.Distribution)) {
    return marketPrice;
  }
  return priceType === 1 ? intervalMinPrice : marketPrice;
};

/**
 * 商品详情页获取价格和划线价格
 * @param marketings
 * @param priceType
 * @param intervalMinPrice
 * @param marketPrice
 * @returns
 */
export const showPriceForDetail = (
  marketings: Marketing[],
  priceType: number,
  intervalMinPrice: number,
  marketPrice: number,
  linePrice: number,
) => {
  marketings = filterEmpty(marketings);
  let price, payMemberPrice, payMemberLabel;
  if (!isLogin()) {
    price =
      marketings[MarketingTypeEnum.FlashSale]?.pluginPrice ??
      marketings[MarketingTypeEnum.SnapSale]?.pluginPrice ??
      marketings[MarketingTypeEnum.Reserve]?.pluginPrice ??
      marketings[MarketingTypeEnum.MemberPrice]?.pluginPrice ??
      marketings[MarketingTypeEnum.MemberLevelPrice]?.pluginPrice ??
      marketings[MarketingTypeEnum.Presale]?.pluginPrice ??
      marketPrice;
    payMemberPrice = marketings[MarketingTypeEnum.PayMemberLevelPrice]?.pluginPrice;
    payMemberLabel = marketings[MarketingTypeEnum.PayMemberLevelPrice]?.marketingDesc;
  } else if (
    isExistSomeMarketing(marketings, [
      MarketingTypeEnum.FlashSale,
      MarketingTypeEnum.SnapSale,
      // MarketingTypeEnum.Groupon,
      MarketingTypeEnum.Reserve,
      MarketingTypeEnum.MemberPrice,
      MarketingTypeEnum.MemberLevelPrice,
      MarketingTypeEnum.PayMemberLevelPrice,
    ])
  ) {
    price =
      marketings[MarketingTypeEnum.FlashSale]?.pluginPrice ??
      marketings[MarketingTypeEnum.SnapSale]?.pluginPrice ??
      // marketings[MarketingTypeEnum.Groupon]?.pluginPrice ||
      marketings[MarketingTypeEnum.Reserve]?.pluginPrice ??
      marketings[MarketingTypeEnum.PayMemberLevelPrice]?.pluginPrice ??
      marketings[MarketingTypeEnum.MemberPrice]?.pluginPrice ??
      marketings[MarketingTypeEnum.MemberLevelPrice]?.pluginPrice ??
      marketPrice;
    payMemberLabel = marketings[MarketingTypeEnum.PayMemberLevelPrice]?.marketingDesc;
  } else if (isExist(marketings, MarketingTypeEnum.Presale)) {
    const pluginPrice = marketings[MarketingTypeEnum.Presale]?.pluginPrice;
    if (pluginPrice === null || pluginPrice === undefined) {
      // 定金预售 (显示市场价，没有划线价)
      price = marketPrice;
    } else {
      price = pluginPrice;
    }
  } else if (isExist(marketings, MarketingTypeEnum.Distribution)) {
    price = marketPrice;
  } else if (priceType === 1) {
    price = intervalMinPrice;
  } else {
    price = marketPrice;
  }

  let showLinePrice = getLinePrice(price, marketPrice, linePrice);

  return {
    price,
    payMemberPrice,
    payMemberLabel,
    showLinePrice,
  };
};

/**
 * 划线价显示：存在营销活动（定金预售除外）时显示市场价 其他不显示
 * @param marketings
 * @param marketPrice
 * @returns 划线价
 */
export const showLinePrice = (marketings: Marketing[], marketPrice: number): number | undefined => {
  marketings = filterEmpty(marketings);
  return !isExistSpecialMarketing(marketings) ||
    (marketings[MarketingTypeEnum.Presale] && !marketings[MarketingTypeEnum.Presale].pluginPrice) ||
    isExist(marketings, MarketingTypeEnum.Distribution)
    ? undefined
    : marketPrice;
};

/**
 * 营销标签展示逻辑判断
 * @param marketings
 * @param buyPoint 积分
 * @returns
 */
export const showActivity = (marketings: Marketing[], buyPoint: number): boolean => {
  buyPoint = resetPoint(buyPoint);
  return !buyPoint;
};

const resetPoint = (point: number) => {
  return 0;
};

/**
 * 步进器展示逻辑判断
 * @param marketings
 * @param buyPoint 积分
 * @param spreadFlag 是否是推广商品
 * @param isDistributor 是否显示分享赚、发圈素材、只看分享赚按钮
 * @returns
 */
export const showCartCount = (
  marketings: Marketing[],
  buyPoint: number,
  spreadFlag: boolean,
  isDistributor: boolean,
): boolean => {
  marketings = filterEmpty(marketings);
  return (
    !spreadFlag &&
    (!!buyPoint ||
      isExist(marketings, MarketingTypeEnum.FlashSale) ||
      isExist(marketings, MarketingTypeEnum.SnapSale) ||
      isExist(marketings, MarketingTypeEnum.Presale) ||
      !isDistributor ||
      !isExist(marketings, MarketingTypeEnum.Distribution))
  );
};

/**
 * 商品发圈、分享赚展示营销部分逻辑判断
 * @param marketings
 * @param buyPoint
 * @param spreadFlag
 * @param isDistributor
 */
export const showShare = (marketings: Marketing[], buyPoint: number): boolean => {
  marketings = filterEmpty(marketings);
  return (
    !buyPoint &&
    !isExist(marketings, MarketingTypeEnum.FlashSale) &&
    !isExist(marketings, MarketingTypeEnum.SnapSale) &&
    !isExist(marketings, MarketingTypeEnum.Reserve) &&
    !isExist(marketings, MarketingTypeEnum.Presale) &&
    isExist(marketings, MarketingTypeEnum.Distribution)
  );
};

/**
 * 是否满足拼团条件：拼团 && !预售 && !预约 && !分销
 * @param marketings
 * @param buyPoint
 */
export const isGroupon = (marketings: Marketing[], buyPoint: number) => {
  marketings = filterEmpty(marketings);
  return (
    isExist(marketings, MarketingTypeEnum.Groupon) &&
    !buyPoint &&
    !isExist(marketings, MarketingTypeEnum.Reserve) &&
    !isExist(marketings, MarketingTypeEnum.Presale) &&
    !isExist(marketings, MarketingTypeEnum.Distribution)
  );
};

/**
 * 是否预约
 * @param marketings
 * @param buyPoint
 * @returns
 */
export const isExistReserve = (marketings: Marketing[], buyPoint: number) => {
  marketings = filterEmpty(marketings);
  return !buyPoint && isExist(marketings, MarketingTypeEnum.Reserve);
};

/**
 * 是否预售
 * @param marketings
 * @param buyPoint
 * @returns
 */
export const isExistPresale = (marketings: Marketing[], buyPoint: number) => {
  marketings = filterEmpty(marketings);
  return !buyPoint && isExist(marketings, MarketingTypeEnum.Presale);
};

/**
 * 获取分享Modal的价格
 * @param marketings 标签
 * @param marketPrice 市场价
 * @param isBuyPoint 是否为积分价商品
 * @param isPointsGoods 是否为积分商品
 * @returns
 */
export const getSharePrice = (
  marketings: Marketing[],
  marketPrice: number,
  isBuyPoint: boolean,
  isPointsGoods: boolean,
): {price: number} => {
  marketings = filterEmpty(marketings);
  let price;

  //预约
  const reserveLabel = getMarketing(marketings, MarketingTypeEnum.Reserve);
  if (reserveLabel && !isBuyPoint && !isPointsGoods) {
    price = reserveLabel.pluginPrice;
  }

  //预售
  const presaleLabel = getMarketing(marketings, MarketingTypeEnum.Presale);
  if (presaleLabel && !isBuyPoint && !isPointsGoods) {
    price = presaleLabel.pluginPrice;
  }

  //整点秒杀
  const flashSaleLabel = getMarketing(marketings, MarketingTypeEnum.FlashSale);
  if (flashSaleLabel && !isBuyPoint && !isPointsGoods) {
    price = flashSaleLabel.pluginPrice;
  }

  //限时抢购
  const snapUpLabel = getMarketing(marketings, MarketingTypeEnum.SnapSale);
  if (snapUpLabel && !isBuyPoint && !isPointsGoods) {
    price = snapUpLabel.pluginPrice;
  }

  return {
    price: price || marketPrice,
  };
};

/**
 * 购物车过滤不需要计算价格的营销活动
 * 过滤优惠券、分销商品、企业价、粉丝价、满返
 * @param type
 */
export const filterMarketing = (type: MarketingType) => {
  return [
    MarketingTypeEnum.Coupon,
    MarketingTypeEnum.Distribution,
    MarketingTypeEnum.EnterprisePrice,
    MarketingTypeEnum.MemberPrice,
    MarketingTypeEnum.MemberLevelPrice,
    MarketingTypeEnum.PayMemberLevelPrice,
    MarketingTypeEnum.FullCoupon,
  ].includes(type);
};

/**
 * 加购的时候，需要传入加购时的价格，
 * @param marketingPluginLabels
 * @param marketPrice
 * @returns
 */
export const getBestPriceForAdd = (marketingPluginLabels: Marketing[], marketPrice: number) => {
  const hashMap = {marketPrice, fansPrice: undefined, enterprisePrice: undefined};
  marketingPluginLabels.forEach((label) => {
    if (
      [
        MarketingTypeEnum.MemberLevelPrice,
        MarketingTypeEnum.MemberPrice,
        MarketingTypeEnum.PayMemberLevelPrice,
      ].includes(label.marketingType)
    ) {
      if (MarketingTypeEnum.PayMemberLevelPrice === label.marketingType && !isLogin()) {
        if (hashMap.fansPrice === undefined) hashMap.fansPrice = undefined;
      } else hashMap.fansPrice = label.pluginPrice;
    }
    if (label.marketingType === MarketingTypeEnum.EnterprisePrice) hashMap.enterprisePrice = label.pluginPrice;
  });
  return hashMap.enterprisePrice ?? hashMap.fansPrice ?? hashMap.marketPrice;
};

/**
 * 获取划线价
 * 有划线价展示划线价
 * 没有划线价展示市场价
 * 如果显示的划线价 小于等于 展示的活动价 则不展示划线价
 * @param price 活动价
 * @param marketingPrice 市场价
 * @param linePrice 划线价
 */
export const getLinePrice = (price: number, marketingPrice: number, linePrice: number) => {
  const showLinePrice = linePrice ? linePrice : marketingPrice;
  return price >= showLinePrice ? 0 : showLinePrice;
};
