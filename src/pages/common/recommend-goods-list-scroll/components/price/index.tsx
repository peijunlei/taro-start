import {View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {toFixed2} from '@/utils/priceFormat';
import classNames from 'classnames';
import './index.less';

interface IPriceP {
  price: string | number;
  buyPoint?: string | number;
  linePrice?: string | number;
  [name: string]: any;
}

interface IPriceS {}
export default class Price extends Component<IPriceP, IPriceS> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    // console.log(props);
  }

  render() {
    const {price, buyPoint, linePrice, priceStyle} = this.props;
    let total = toFixed2(price || 0);
    let arr = total.split('.');
    let len = buyPoint ? ('' + buyPoint + arr[0]).length : (price + '').length;

    return (
      <Text className="price-style_recommend" style={{color: 'var(--themeColor)', ...priceStyle}}>
        {buyPoint > 0 ? this.renderPointsItem(buyPoint, len) : null}
        {/* 当有积分的时候不展示价格为0的价格 */}

        {buyPoint > 0 && Number(price) > 0 ? this.renderPlusItem() : null}
        {buyPoint > 0 && Number(price) == 0 ? null : (
          <Text className={len >= 10 ? 'plain small-plain' : 'plain'}>
            <Text className={classNames('price-unit', {'price-mini': len >= 14, 'price-smallest': len >= 17})}>￥</Text>
            <Text
              className={classNames('wm-price_new', {
                'price-small': (arr[0] + '').length > 4,
                'price-little': len >= 10,
                'price-mini': len >= 14,
                'price-smallest': len >= 17,
              })}
            >
              {arr[0]}
            </Text>
            <Text className={classNames('price-fixed2', {'price-mini': len >= 14, 'price-smallest': len >= 17})}>
              .{arr[1]}
            </Text>
          </Text>
        )}
        {buyPoint > 0 ? '' : linePrice > 0 && <Text className="line-price">￥{toFixed2(linePrice)}</Text>}
      </Text>
    );
  }
  renderPointsItem = (buyPoint, len) => {
    return (
      <Text className="points-price">
        <Text
          className={classNames('wm-price_new', {
            'price-small': (buyPoint + '').length > 4,
            'price-little': len >= 10,
            'price-mini': len >= 14,
            'price-smallest': len >= 17,
          })}
        >
          {buyPoint}
        </Text>
        <Text className={classNames('price-point-text', {'price-smallest': len >= 17})}>积分</Text>
      </Text>
    );
  };

  renderPlusItem = () => {
    return (
      <Text className="plus">
        <Text className="price price-plus">+</Text>
      </Text>
    );
  };
}
