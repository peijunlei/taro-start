import {_} from 'wmkit';
import * as lo from 'lodash';

export const calcSplitInfo = (checkedCards, goodsInfos) => {
  console.log('1111: ', checkedCards, goodsInfos);
  checkedCards.forEach((card) => {
    card.deduction = 0;
    if (card.balance === 0) return;
    const cardSkus = [];
    card.skuIdList.forEach((id) => {
      goodsInfos.forEach((g) => {
        if (g.skuId === id) cardSkus.push(g);
      });
    });
    const total = cardSkus.reduce(
      (a, b) => _.add(a, b.earnestPrice ? _.sub(b.splitPrice, b.earnestPrice) : b.splitPrice),
      0,
    );
    if (total === 0) return;
    // 均摊抵扣
    let balance = card.balance;
    if (balance >= total) {
      // 完全抵扣商品金额
      card.deduction = total;
      cardSkus.forEach((sku) => (sku.splitPrice = 0));
    } else {
      // 不完全抵扣商品金额
      card.deduction = balance;
      cardSkus.forEach((sku, idx) => {
        if (idx === cardSkus.length - 1) {
          sku.splitPrice = _.sub(sku.splitPrice, balance);
        } else {
          const split = lo.ceil(_.mul(balance, _.div(sku.splitPrice, total)), 2);
          sku.splitPrice = _.sub(sku.splitPrice, split);
          balance = _.sub(balance, split);
        }
      });
    }
  });
};
