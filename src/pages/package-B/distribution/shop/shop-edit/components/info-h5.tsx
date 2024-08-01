import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info-h5.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import Blank from '@/pages/common/blank';
import {store2Props} from '../selectors';
import GoodsItem from './goods-item';
import GoodsItemSmall from './goods-item-small';
import {_} from 'wmkit';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

type IInfoProps = T.IProps & T.IInfoProps;
//商品拖拽
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class InfoList extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  //列表排序完成后结果输出
  onSortEnd = async ({oldIndex, newIndex}) => {
    const list = this.props.main.goodsList;
    const items = arrayMove(list, oldIndex, newIndex);
    await this.props.actions.action.commonChange([{paths: 'main.goodsList', value: items}]);
    await this.props.actions.action.saveH5(items);
  };

  //大图排序完成后结果输出
  onSortEndSmall = async ({oldIndex, newIndex}) => {
    const list = this.props.main.goodsListSmall;
    const items = arrayMove(list, oldIndex, newIndex);
    await this.props.actions.action.commonChange([{paths: 'main.goodsListSmall', value: items}]);
    await this.props.actions.action.saveH5(items);
  };
  render() {
    let {
      main: {goodsList, isLarge, totalSmallPages, goodsListSmall, totalPages, form, formSmall, isLoadingList},
    } = this.props;

    let list = [];
    goodsList.map((goods, index) => {
      list.push({
        content: <GoodsItem key={index} goods={goods} index={index} />,
        classes: ['test'],
      });
    });

    //小图
    const SortableItemSmall = SortableElement(({value, index}) => (
      <GoodsItemSmall key={index} goods={value} index={index} />
    ));
    const SortableListSmall = SortableContainer(({items}) => {
      return (
        <ul>
          {items.map((value, index) => (
            <SortableItemSmall key={`item-${value.id}`} index={index} value={value} />
          ))}
        </ul>
      );
    });

    //列表
    const SortableItem = SortableElement(({value, index}) => <GoodsItem key={index} goods={value} index={index} />);
    const SortableList = SortableContainer(({items}) => {
      return (
        <ul>
          {items.map((value, index) => (
            <SortableItem key={`item-${value.id}`} index={index} value={value} />
          ))}
        </ul>
      );
    });

    return (
      <View>
        <ScrollView scrollY className="shop-body-edit-h5">
          {goodsList.length > 0 ? (
            isLarge ? (
              <View className="drag-area">
                <SortableList items={goodsList} onSortEnd={this.onSortEnd} pressDelay={200} />
              </View>
            ) : (
              <View className="drag-area-small">
                <SortableListSmall items={goodsListSmall} onSortEnd={this.onSortEndSmall} axis="xy" pressDelay={200} />
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
      </View>
    );
  }
  // _onScrollToLower = () => {
  //   let {
  //     main: {isLarge},
  //   } = this.props;
  //   if (isLarge) {
  //     this.props.actions.action.nextPage();
  //   } else {
  //     this.props.actions.action.nextPageSmall();
  //   }
  // };
}

//create by moon https://github.com/creasy2010/moon
