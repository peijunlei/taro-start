import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './price.less';
import {Price as WMprice} from '@wanmi/ui-taro';
interface IPriceP {
  price: string | number;
  buyPoint?: string | number;
  linePrice?: string | number;
  [name: string]: any;
}

interface IPriceS {}
export default class Price extends Component<IPriceP, IPriceS> {
  static defaultProps = {};

  render() {
    const {price, buyPoint, linePrice} = this.props;
    return <WMprice price={Number(price)} buyPoint={Number(buyPoint)} linePrice={Number(linePrice)} />;
  }
}
