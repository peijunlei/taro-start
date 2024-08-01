import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import MatericalItem from './material-item';
import WMListView from '@/pages/common/list-view';
const noneImg = require('@/assets/image/groupon/empty.png');
type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, Partial<T.ActionType>>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      list: [],
      total: 0,
    };
  }
  /**
    商品推荐/素材推广list
  */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const listViewProps = {
      style: {height: 'calc(100vh - 60px)', marginLeft: '12px', marginRight: '12px', marginTop: '12px'},
      url: '/distribution/goods-matter/page/new',
      params: {
        goodsInfoId: main.goodsInfoId,
        sortColumn: 'updateTime',
        sortRole: 'desc',
      },
      noneImg: noneImg,
      noneContent: '暂无发圈素材',
      dataPath: ['distributionGoodsMatterPage'],
      getData: (list, total) => {
        this.setState({total, list});
      },
    };

    /**
     * 勿动，合起来写会有问题
     */
    return (
      <WMListView {...listViewProps}>
        {this.state.list.map((matter) => {
          return (
            <MatericalItem
              main={main}
              action={action}
              matterItem={matter}
              //changeShare={() => action.changeShare(0, matter.matter)}
              key={matter.id}
              visible={main.visibleMap[matter.id]}
              //onSpread={() => action.changeText(matter.id)}
              // moments={() => action.moments()}
            />
          );
        })}
      </WMListView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
