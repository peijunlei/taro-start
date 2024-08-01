import {
  GoodsDetailSpecInfoResponse,
  GoodsInfoSimpleDetailByGoodsInfoResponse,
  GoodsInfoSimpleVO,
  GoodsInfoSpecDetailRelSimpleVO,
  GoodsIntervalPriceVO3,
  GoodsSpecVO,
} from 'api/GoodsInfoBaseController';
import {POJO, showPriceForDetail, getMarketings} from './marketing';
import Taro from '@tarojs/taro';
import {cache} from 'config';

interface TMergedData extends Omit<GoodsInfoSimpleDetailByGoodsInfoResponse, 'goodsInfo'> {
  goodsInfos: GoodsInfoSimpleVO[];
  goodsSpecs?: GoodsSpecVO[];
  goodsInfoSpecDetailRelList?: GoodsInfoSpecDetailRelSimpleVO[];
}

export const mergeData = (
  detail: GoodsInfoSimpleDetailByGoodsInfoResponse,
  spec: GoodsDetailSpecInfoResponse,
  list: POJO[] = [],
): TMergedData => {
  const resp = {...detail};
  const {goodsSpecDetailList, goodsInfoSpecDetailRelList} = spec;
  const {goodsIntervalPrices} = resp;
  let {goodsInfo} = resp;
  if (goodsInfo) goodsInfo = handleGoodsInfo(goodsInfo, goodsIntervalPrices, resp.goods.saleType);
  const next = list.filter((e) => e.goodsId === goodsInfo.goodsId);
  if (next.length) {
    if (next.some((e) => e.goodsInfoId === goodsInfo.goodsInfoId)) {
      resp.goodsInfos = next.map((e) => {
        if (e.goodsInfoId === goodsInfo.goodsInfoId) return goodsInfo;
        return e;
      });
    } else {
      resp.goodsInfos = [...list].concat(goodsInfo);
    }
  } else {
    resp.goodsInfos = [resp.goodsInfo];
  }
  resp.goodsSpecs = spec.goodsSpecList;
  resp.goodsSpecDetails = goodsSpecDetailList || [];
  delete resp.goodsInfo;
  delete resp.goodsPropDetailRels;
  const dict: {[key: number]: number[]} = {};
  goodsSpecDetailList?.forEach((item) => {
    if (!dict[item.specId]) dict[item.specId] = [];
    dict[item.specId].push(item.specDetailId);
  });
  resp?.goodsSpecs?.forEach((item) => {
    if (dict[item.specId]) item.specDetailIds = dict[item.specId];
  });
  resp.goodsInfoSpecDetailRelList = goodsInfoSpecDetailRelList || [];
  return resp as TMergedData;
};

const handleGoodsInfo = (
  goodsInfo: GoodsInfoSimpleVO,
  goodsIntervalPrices: GoodsIntervalPriceVO3[],
  saleType: number,
): GoodsInfoSimpleVO => {
  const marketingPluginLabels = goodsInfo.marketingPluginLabels;
  const {marketPrice, priceType, intervalMinPrice, linePrice} = goodsInfo;
  const marketings = getMarketings(marketingPluginLabels);
  const {price, showLinePrice, payMemberPrice, payMemberLabel} = showPriceForDetail(
    marketings,
    priceType,
    intervalMinPrice,
    marketPrice,
    linePrice,
  );

  goodsInfo.salePrice = price;
  goodsInfo.payMemberPrice = payMemberPrice;
  goodsInfo.payMemberLabel = payMemberLabel;
  goodsInfo.showLinePrice = showLinePrice;
  if (saleType !== 0) goodsInfo.intervalPriceIds = (goodsIntervalPrices || []).map((e) => e.intervalPriceId);
  return goodsInfo;
};
