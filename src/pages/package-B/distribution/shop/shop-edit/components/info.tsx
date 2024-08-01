import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import Blank from '@/pages/common/blank';
import {store2Props} from '../selectors';
import GoodsItem from './goods-item';
import GoodsItemSmall from './goods-item-small';
import {_} from 'wmkit';

type IInfoProps = T.IProps & T.IInfoProps;
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class InfoList extends Component<Partial<IInfoProps>, T.IInfoState> {
  originKey: number;
  windowHeight: number;
  startX: number;
  startY: number;
  tranX: number;
  tranY: number;
  windowWidth: number;
  itemres: any;
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      isLongPress: false,
      cur: 0,
      curZ: 0,
      tranX: 0,
      tranY: 0,
      itemTransition: false,
      list: [],
    };
    this.windowHeight = Taro.getSystemInfoSync().windowHeight;
    this.windowWidth = Taro.getSystemInfoSync().windowWidth;
    this.originKey = -1;
    this.startX = 0;
    this.startY = 0;
    this.tranX = 0;
    this.tranY = 0;
    this.itemres = {};
  }

  /**
   *
   * 长按触发移动排序
   */
  longPress = (e) => {
    this.setState({
      isLongPress: true,
    });

    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
    //选中的下标
    let index = e.currentTarget.dataset.index;

    Taro.createSelectorQuery()
      .select('.item')
      .boundingClientRect((res) => {
        const {
          main: {isLarge},
        } = this.props;
        let columns = isLarge ? 1 : 3; //计算当前布局一行多少个
        let widthInfo = Math.ceil((this.windowWidth - 24) / 3); //计算九空格每一个宽

        this.itemres = res;
        this.itemres.height = isLarge ? 114 : widthInfo;
        this.itemres.width = isLarge ? this.itemres.width : widthInfo;

        Taro.createSelectorQuery()
          .select('.item-wrap')
          .boundingClientRect((res) => {
            if (columns === 1) {
              // 单列时候X轴初始不做位移
              this.tranX = 0;
            } else {
              // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
              this.tranX = this.startX - this.itemres.height / 2 - res.left;
            }

            // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
            this.tranY = this.startY - this.itemres.height / 2 - res.top;
            this.setState({
              cur: index,
              curZ: index,
              tranX: this.tranX,
              tranY: this.tranY,
            });
          })
          .exec();
      })
      .exec();
  };

  /**
   *
   * 拖拽时
   */
  touchMove = (e) => {
    const currentTouch = e.changedTouches[0];
    if (!currentTouch) return;
    if (!this.state.isLongPress) return;

    const tranX = e.touches[0].pageX - this.startX + this.tranX,
      tranY = e.touches[0].pageY - this.startY + this.tranY;

    this.setState({tranX, tranY});

    //计算选中下标及拖动目标的下标
    const originKey = e.currentTarget.dataset.key;
    const endKey = this.calculateMoving(tranX, tranY);

    // 防止拖拽过程中发生乱序问题
    if (originKey == endKey || this.originKey == originKey) return;

    this.originKey = originKey;

    this.insert(originKey, endKey);
  };

  /**
   * 根据当前的手指偏移量计算目标key
   */
  //  根据列表的长度以及列数计算出当前的拖拽元素行数 rows
  // 根据 tranX 和 当前元素的宽度 计算出 x 轴上的偏移数 i
  // 根据 tranY 和 当前元素的高度 计算出 y 轴上的偏移数 j
  // 判断 i 和 j 的最大值和最小值
  // 根据公式 endKey = i + columns * j 计算出 目标key
  // 判断 目标key 的最大值
  // 返回 目标key

  calculateMoving = (tranX, tranY) => {
    const {
      main: {isLarge, goodsList, goodsListSmall},
    } = this.props;
    const dataList = isLarge ? goodsList : goodsListSmall;
    const columns = isLarge ? 1 : 3;

    let rows = Math.ceil(dataList.length / columns) - 1,
      i = Math.round(tranX / this.itemres.width),
      j = Math.round(tranY / this.itemres.height);

    i = i > columns - 1 ? columns - 1 : i;
    i = i < 0 ? 0 : i;

    j = j < 0 ? 0 : j;
    j = j > rows ? rows : j;

    let endKey = i + columns * j;

    endKey = endKey >= dataList.length ? dataList.length - 1 : endKey;

    return endKey;
  };

  /**
   * 根据起始key和目标key去重新计算每一项的新的key
   */
  // 首先判断 origin 和 end 的大小进行不同的逻辑处理
  // 循环列表 list 进行逻辑处理
  // 如果是 origin 小于 end 则把 origin 到 end 之间(不包含 origin 包含 end) 所有元素的 key 减去 1, 并把 origin 的key值设置为 end
  // 如果是 origin 大于 end 则把 end 到 origin 之间(不包含 origin 包含 end) 所有元素的 key 加上 1, 并把 origin 的key值设置为 end
  // 调用 getPosition 方法进行渲染
  insert = (origin, end) => {
    let list;
    const {
      main: {isLarge, goodsList, goodsListSmall, isLoadingList},
    } = this.props;
    const dataList = isLarge ? goodsList : goodsListSmall;

    if (origin < end) {
      list = dataList.map((item) => {
        if (item.index > origin && item.index <= end) {
          item.index = item.index - 1;
        } else if (item.index == origin) {
          item.index = end;
        }
        return item;
      });
      this.getPosition(list);
    } else if (origin > end) {
      list = dataList.map((item) => {
        if (item.index >= end && item.index < origin) {
          item.index = item.index + 1;
        } else if (item.index == origin) {
          item.index = end;
        }
        return item;
      });
      this.getPosition(list);
    }
  };

  /**
   * 根据排序后 list 数据进行位移计算
   */
  // 首先对传入的 data 数据进行循环处理, 根据以下公式计算出每个元素的 tranX 和 tranY (this.item.width, this.item.height 分别是元素的宽和高, this.data.columns 是列数, item.key 是当前元素的排序key值)
  // item.tranX = this.item.width * (item.key % this.state.columns);
  // item.tranY = Math.floor(item.key / this.state.columns) * this.item.height;
  // 设置处理后的列表数据 list
  // 判断是否需要执行抖动以及触发事件逻辑, 该判断用于区分初始化调用和insert方法中调用, 初始化时候不需要后面逻辑
  // 首先设置 itemTransition 为 true 让 item 变换时候加有动画效果
  // 最后copy一份 list 然后出发 change 事件把排序后的数据抛出去
  getPosition = (data, vibrate = true) => {
    const {
      main: {isLarge},
    } = this.props;
    const columns = isLarge ? 1 : 3;

    let list = data.map((item, index) => {
      item.tranX = this.itemres.width * (item.index % columns);
      item.tranY = Math.floor(item.index / columns) * this.itemres.height;
      return item;
    });

    this.setState({
      itemTransition: true,
      list,
    });
  };

  /**
   * 拖拽结束数组重新排序并保存
   */
  touchEnd = () => {
    if (!this.state.isLongPress) return;
    let {list} = this.state;
    list.sort(function(a, b) {
      return a.index - b.index;
    });
    this.clearData();
    this.setState({
      isLongPress: false,
    });

    //保存数据
    this.props.actions.action.saveH5(list);
  };

  /**
   * 清除参数
   */
  clearData = () => {
    this.originKey = -1;

    this.setState({
      isLongPress: false,
      cur: -1,
      tranX: 0,
      tranY: 0,
    });

    // 延迟清空
    setTimeout(() => {
      this.setState({
        curZ: -1,
      });
    }, 300);
  };

  render() {
    let {
      main: {
        goodsList,
        isLarge,
        totalSmallPages,
        goodsListSmall,
        totalPages,
        form,
        formSmall,
        movableSmallHeight,
        movableViewHeight,
        isLoadingList,
      },
    } = this.props;
    const {cur, curZ, tranX, itemTransition, tranY, isLongPress} = this.state;
    const columns = isLarge ? 1 : 3;
    return (
      <ScrollView
        scrollY={isLongPress ? false : true}
        onScrollToLower={this._onScrollToLower}
        className="shop-body-edit"
        style={isLongPress && {overflow: 'hidden'}}
      >
        {goodsList.length > 0 ? (
          isLarge ? (
            <View className="item-wrap" style={{height: movableViewHeight + 'px'}}>
              {goodsList.map((item, index) => {
                return (
                  <View
                    className={
                      'item item-list ' +
                      (cur == index ? 'cur' : '') +
                      ' ' +
                      (curZ == index ? 'zIndex' : '') +
                      ' ' +
                      (itemTransition && index !== cur ? 'itemTransition' : '')
                    }
                    key={index}
                    data-key={item.index}
                    data-index={index}
                    data-top={item.top}
                    style={
                      'transform: translate3d(' +
                      (index === cur ? tranX : item.tranX) +
                      'px, ' +
                      (index === cur ? tranY : item.tranY) +
                      'px, 0px);width: ' +
                      100 / columns +
                      '%'
                    }
                    onLongPress={this.longPress}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                  >
                    <GoodsItem key={index} goods={item} index={index} />
                  </View>
                );
              })}
              {goodsList.length != 0 && form.pageNum + 1 != totalSmallPages && (
                <View className="drag-area-status" style={{top: movableViewHeight + 20 + 'px'}}>
                  加载中
                </View>
              )}
              {!isLoadingList && goodsList.length !== 0 && form.pageNum + 1 === totalSmallPages && (
                <View className="drag-area-status" style={{top: movableViewHeight + 20 + 'px'}}>
                  没有更多了
                </View>
              )}
            </View>
          ) : (
            <View className="item-wrap" style={{height: movableSmallHeight + 'px'}}>
              {goodsListSmall.map((item, index) => {
                return (
                  <View
                    className={
                      'item item-small ' +
                      (cur == index ? 'cur' : '') +
                      ' ' +
                      (curZ == index ? 'zIndex' : '') +
                      ' ' +
                      (itemTransition && index !== cur ? 'itemTransition' : '')
                    }
                    key={index}
                    data-key={item.index}
                    data-index={index}
                    data-top={item.top}
                    style={
                      'transform: translate3d(' +
                      (index === cur ? tranX : item.tranX) +
                      'px, ' +
                      (index === cur ? tranY : item.tranY) +
                      'px, 0px);width: ' +
                      100 / columns +
                      '%'
                    }
                    onLongPress={this.longPress}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                  >
                    <GoodsItemSmall key={index} goods={item} index={index} />
                  </View>
                );
              })}
            </View>
          )
        ) : (
          !isLoadingList && (
            <View>
              <Blank
                content="没有搜到任何商品~"
                img={require('../img/empty.png')}
                imgStyle={{width: '104px', height: '104px'}}
              />
            </View>
          )
        )}
      </ScrollView>
    );
  }
  _onScrollToLower = () => {
    let {
      main: {isLarge},
    } = this.props;

    //列表分页查询
    if (isLarge) {
      this.props.actions.action.nextPage();
    }
  };
}

//create by moon https://github.com/creasy2010/moon
