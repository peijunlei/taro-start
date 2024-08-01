import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Button} from '@wanmi/ui-taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CateItem from './cate-item';
import WMButton from '@/pages/common/button';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      main,
      // main: { storeCateTree, storeId },
    } = this.props;

    return (
      main && (
        <View className="list">
          <Button
            size="large"
            type="grey"
            onClick={() => {
              Taro.redirectTo({
                url: `/pages/package-B/goods/goods-list/index?storeId=${main.storeId}`,
              });
            }}
          >
            全部商品
          </Button>
          <View className="cate-list">
            {main.storeCateTree &&
              Object.keys(main.storeCateTree).map((cate: any) => {
                const {cateName, storeCateId, children: childList} = main.storeCateTree[cate];
                return (
                  <CateItem
                    cateName={cateName}
                    storeCateId={storeCateId}
                    childList={childList}
                    // key={cate.storeCateId}
                    key={cate}
                  />
                );
              })}
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
