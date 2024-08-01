import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {debounce} from 'lodash';

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
import {msg} from 'wmkit';
let closeTimer = null;
type INavToolsProps = T.IProps & T.INavToolsProps;

@connect<Partial<INavToolsProps>, Partial<T.ActionType>>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
    this.state = {
      //nav默认选中第一个
      selectItem: 0,
      roteState: true,
    };
    msg.on({
      'change-rote-state': () => {
        this.changeRoteState();
      },
    });
  }

  //控制箭头动画效果
  changeRoteState = () => {
    this.setState({
      roteState: !this.state.roteState,
    });
  };

  componentWillUnmount(): void {
    clearTimeout(closeTimer);
  }

  /**
    功能导航
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
      main: {ifStore},
    } = this.props;

    const {selectItem, roteState} = this.state;

    return (
      <View className="navTools">
        <View
          className={selectItem === 0 ? 'tools-item select-item' : 'tools-item'}
          onClick={() => {
            this.changeRoteState();
            // 触发弹窗动画效果
            msg.emit('show-composite-picker');
            closeTimer = setTimeout(() => {
              this._changeNav(0);
            }, 300);
          }}
        >
          <Text className="text">{main.navToolsObj.composiName}</Text>
          <Image
            className={roteState ? 'icon rote-out' : 'icon rote-in'}
            src={selectItem === 0 ? sArrowIcon : dArrowIcon}
          />
        </View>

        <View className={selectItem === 1 ? 'tools-item select-item' : 'tools-item'}
              onClick={()=>this._changeWithDebounce(1)}>
          <Text className="text">销量</Text>
        </View>

        <View className={selectItem === 2 ? 'tools-item select-item' : 'tools-item'}
              onClick={()=>this._changeWithDebounce(2)}>
          <Text className="text">价格</Text>
          <Image
            className="icon"
            src={selectItem === 2 ? (main.navToolsObj.priceSoft ? PriceDownIcon : PriceUpIcon) : PriceIcon}
          />
        </View>

        {/* {main.spreadFlag && (
          <View
            className={selectItem === 4 ? 'tools-item select-item' : 'tools-item'}
            onClick={() => this._changeNav(4)}
          >
            <Text className="text">佣金</Text>
            <Image
              className="icon"
              src={selectItem === 4 ? (main.navToolsObj.commission ? PriceDownIcon : PriceUpIcon) : PriceIcon}
            />
          </View>
        )} */}

        {!ifStore && (
          <View
            className="tools-item"
            onClick={() => {
              this._changeNav(3);
            }}
          >
            <Text className="text">筛选</Text>
            <Image className="icon" src={screenIcon} />
          </View>
        )}
      </View>
    );
  }

  // 排序和销量的，需要防抖且立即执行
  _changeWithDebounce=debounce((v)=>this._changeNav(v),500,{leading:true})

  //切换导航
  _changeNav = async (v) => {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;
    if (v != 0) {
      if (main.loadStatus === 'loading') {
        return;
      } else {
        goodsAction.commonChange('main.loadStatus', 'loading');
      }
    }
    this.setState({
      selectItem: v,
    });
    if (v === 0) {
      // goodsAction.commonChange('main.request.sortFlag', 0);
      // //综合筛选框显示隐藏
      // goodsAction.commonChange('main.navToolsObj.arrowFlag', !main.navToolsObj.arrowFlag);
      // //价格置为升序
      // goodsAction.commonChange('main.navToolsObj.priceSoft', false);
      // //佣金置为升序
      // goodsAction.commonChange('main.navToolsObj.commission', false);
      goodsAction.commonChange([
        {
          paths: 'main.request.sortFlag',
          value: 0,
        },
        {
          paths: 'main.navToolsObj.arrowFlag',
          value: !main.navToolsObj.arrowFlag,
        },
        {
          paths: 'main.navToolsObj.priceSoft',
          value: false,
        },
        {
          paths: 'main.navToolsObj.commission',
          value: false,
        },
      ]);
      goodsAction.commonChange('main.loadStatus', 'loaded');
      return;
      //销量
    } else if (v === 1) {
      goodsAction.commonChange([
        {
          paths: 'main.request.sortFlag',
          value: 4,
        },
        {
          paths: 'main.navToolsObj.arrowFlag',
          value: false,
        },
        {
          paths: 'main.navToolsObj.priceSoft',
          value: false,
        },
        {
          paths: 'main.navToolsObj.commission',
          value: false,
        },
      ]);
      //价格
    } else if (v === 2) {
      if (!main.navToolsObj.priceSoft) {
        //降序
        await goodsAction.commonChange([
          {
            paths: 'main.request.sortFlag',
            value: 2,
          },
          {
            paths: 'main.navToolsObj.arrowFlag',
            value: false,
          },
          {
            paths: 'main.navToolsObj.priceSoft',
            value: !main.navToolsObj.priceSoft,
          },
          {
            paths: 'main.navToolsObj.commission',
            value: false,
          },
        ]);
      } else {
        //升序
        // goodsAction.commonChange('main.request.sortFlag', 3);
        await goodsAction.commonChange([
          {
            paths: 'main.request.sortFlag',
            value: 3,
          },
          {
            paths: 'main.navToolsObj.arrowFlag',
            value: false,
          },
          {
            paths: 'main.navToolsObj.priceSoft',
            value: !main.navToolsObj.priceSoft,
          },
          {
            paths: 'main.navToolsObj.commission',
            value: false,
          },
        ]);
      }
      //筛选
    } else if (v === 3) {
      //更改loading状态
      goodsAction.commonChange('main.loadStatus', 'loaded');
      goodsAction.commonChange([
        {
          paths: 'main.navToolsObj.arrowFlag',
          value: false,
        },
        {
          paths: 'main.navToolsObj.priceSoft',
          value: false,
        },
        {
          paths: 'main.navToolsObj.screenIsShow',
          value: true,
        },
        {
          paths: 'main.navToolsObj.commission',
          value: false,
        },
      ]);
      return;
    } else if (v === 4) {
      if (!main.navToolsObj.commission) {
        //降序
        goodsAction.commonChange([
          {
            paths: 'main.request.sortFlag',
            value: 8,
          },
          {
            paths: 'main.navToolsObj.arrowFlag',
            value: false,
          },
          {
            paths: 'main.navToolsObj.commission',
            value: !main.navToolsObj.commission,
          },
          {
            paths: 'main.navToolsObj.priceSoft',
            value: false,
          },
        ]);
      } else {
        //升序
        goodsAction.commonChange([
          {
            paths: 'main.request.sortFlag',
            value: 9,
          },
          {
            paths: 'main.navToolsObj.arrowFlag',
            value: false,
          },
          {
            paths: 'main.navToolsObj.commission',
            value: !main.navToolsObj.commission,
          },
          {
            paths: 'main.navToolsObj.priceSoft',
            value: false,
          },
        ]);
      }
    }
    if (v !== 0) {
      //查询商品列表
      await activityAction.commonChange('main.goods', []);
      await goodsAction.query(true, main.goodsShowType);
    }
    // goodsAction.commonChange('main.loadStatus', 'loaded');
  };
}

//create by moon https://github.com/creasy2010/moon
