import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './nav-tools.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dArrowIcon from '@/assets/image/goods/goods-list/d-arrow.png';
import sArrowIcon from '@/assets/image/goods/goods-list/d-arrow-s.png';
import PriceIcon from '@/assets/image/goods/goods-list/price.png';
import PriceUpIcon from '@/assets/image/goods/goods-list/price-up.png';
import PriceDownIcon from '@/assets/image/goods/goods-list/price-down.png';

type INavToolsProps = T.IProps & T.INavToolsProps;

@connect<Partial<INavToolsProps>, Partial<T.ActionType>>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
    this.state = {
      //nav默认选中第一个
      selectItem: 0,
    };
  }

  /**
    功能导航
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;

    const {selectItem} = this.state;

    return (
      <View className="navTools goods_list_promotion_navTools">
        <View className={selectItem === 0 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(0)}>
          <Text className="text">{main.navToolsObj.composiName}</Text>
          <Image
            className={main.navToolsObj.arrowFlag ? 'icon trans-icon' : 'icon'}
            src={selectItem === 0 ? sArrowIcon : dArrowIcon}
          />
        </View>

        <View className={selectItem === 1 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(1)}>
          <Text className="text">销量</Text>
        </View>

        <View className={selectItem === 2 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(2)}>
          <Text className="text">价格</Text>
          <Image
            className="icon"
            src={selectItem === 2 ? (main.navToolsObj.priceSoft ? PriceDownIcon : PriceUpIcon) : PriceIcon}
          />
        </View>

        <View className={selectItem === 3 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(3)}>
          <Text className="text">分类</Text>
          <Image
            className={main.navToolsObj.catesFlag ? 'icon trans-icon' : 'icon'}
            src={selectItem === 3 ? sArrowIcon : dArrowIcon}
          />
        </View>

        <View className={selectItem === 4 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(4)}>
          <Text className="text">品牌</Text>
          <Image
            className={main.navToolsObj.brandFlag ? 'icon trans-icon' : 'icon'}
            src={selectItem === 4 ? sArrowIcon : dArrowIcon}
          />
        </View>
      </View>
    );
  }
  //切换导航
  _changeNav = (v) => {
    let {
      actions: {goodsAction},
      main,
    } = this.props;
    this.setState({
      selectItem: v,
    });
    //综合
    if (v === 0) {
      goodsAction.commonChange('main.request.sortFlag', 0);
      //综合筛选框显示隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', !main.navToolsObj.arrowFlag);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      goodsAction.commonChange('main.navToolsObj.catesFlag', false);
      goodsAction.commonChange('main.navToolsObj.brandFlag', false);
      return;

      //销量
    } else if (v === 1) {
      goodsAction.commonChange('main.request.sortFlag', 4);
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      goodsAction.commonChange('main.navToolsObj.catesFlag', false);
      goodsAction.commonChange('main.navToolsObj.brandFlag', false);

      //价格
    } else if (v === 2) {
      if (!main.navToolsObj.priceSoft) {
        //降序
        goodsAction.commonChange('main.request.sortFlag', 2);
      } else {
        //升序
        goodsAction.commonChange('main.request.sortFlag', 3);
      }
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格升序降序切换
      goodsAction.commonChange('main.navToolsObj.priceSoft', !main.navToolsObj.priceSoft);
      goodsAction.commonChange('main.navToolsObj.catesFlag', false);
      goodsAction.commonChange('main.navToolsObj.brandFlag', false);

      //分类
    } else if (v === 3) {
      //分类筛选框显示隐藏
      goodsAction.commonChange('main.navToolsObj.catesFlag', !main.navToolsObj.catesFlag);
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      goodsAction.commonChange('main.navToolsObj.brandFlag', false);
      //品牌
    } else if (v === 4) {
      //品牌筛选框显示隐藏
      goodsAction.commonChange('main.navToolsObj.brandFlag', !main.navToolsObj.brandFlag);
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      goodsAction.commonChange('main.navToolsObj.catesFlag', false);
    }
    //查询商品列表
    goodsAction.query(false, main.marketingId);
  };
}

//create by moon https://github.com/creasy2010/moon
