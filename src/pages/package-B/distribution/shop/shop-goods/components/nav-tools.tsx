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
import screenIcon from '@/assets/image/goods/goods-list/screen.png';
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
    const {ifStore, navToolsObj = {}} = (this.props && this.props.main) || {};

    const {selectItem} = this.state;

    return (
      <View className="navTools">
        <View className={selectItem === 0 ? 'tools-item select-item' : 'tools-item'} onClick={() => this._changeNav(0)}>
          <Text className="text">{navToolsObj.composiName}</Text>
          <Image
            className={navToolsObj.arrowFlag ? 'icon trans-icon' : 'icon'}
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
            src={selectItem === 2 ? (navToolsObj.priceSoft ? PriceDownIcon : PriceUpIcon) : PriceIcon}
          />
        </View>

        {!ifStore && (
          <View className="tools-item" onClick={() => this._changeNav(3)}>
            <Text className="text">筛选</Text>
            <Image className="icon" src={screenIcon} />
          </View>
        )}
      </View>
    );
  }
  //切换导航
  _changeNav = (v) => {
    let {
      actions: {goodsAction, activityAction},
      main = {},
    } = this.props;
    const {navToolsObj = {}} = main;
    this.setState({
      selectItem: v,
    });
    //综合
    if (v === 0) {
      goodsAction.commonChange('main.request.sortFlag', 0);
      //综合筛选框显示隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', !navToolsObj.arrowFlag);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      return;

      //销量
    } else if (v === 1) {
      goodsAction.commonChange('main.request.sortFlag', 4);
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);

      //价格
    } else if (v === 2) {
      if (!navToolsObj.priceSoft) {
        //降序
        goodsAction.commonChange('main.request.sortFlag', 2);
      } else {
        //升序
        goodsAction.commonChange('main.request.sortFlag', 3);
      }
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格升序降序切换
      goodsAction.commonChange('main.navToolsObj.priceSoft', !navToolsObj.priceSoft);

      //筛选
    } else if (v === 3) {
      //综合筛选框隐藏
      goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
      //价格置为升序
      goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      //筛选框展示
      goodsAction.commonChange('main.navToolsObj.screenIsShow', true);
      return;
    }
    //查询商品列表
    activityAction.commonChange('main.goods', []);
    goodsAction.query(true);
  };
}

//create by moon https://github.com/creasy2010/moon
