import {View, Image, Text} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './list.less';
import WMButton from '@/pages/common/button';
import moreIcon from '@/assets/image/common/arrow.png';
type IListProps = T.IProps & T.IListProps;

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

@connect<any, any>(store2Props, actions)
export default class CateItem extends Component<any, any> {
  constructor(props: IListProps) {
    super(props);
  }

  render() {
    let {
      cateName,
      storeCateId,
      childList,
      main: {selectedCate, storeId},
    } = this.props;
    // console.log(childList);

    return (
      <View className="parent">
        <View
          className="title"
          onClick={() => {
            Taro.redirectTo({
              url: `/pages/package-B/goods/goods-list/index?storeId=${storeId}&storeCateIds=${storeCateId}&keywords=${cateName}`,
            });
          }}
        >
          {cateName}
          <Image className="arrow" src={moreIcon} />
        </View>
        <View className="wrap">
          {childList &&
            childList.map((cate) => (
              <View key={cate.storeCateId} className="wmbtn-box">
                <Button
                  key={cate.storeCateId}
                  // checked={selectedCate === cate.storeCateId}
                  // theme={'goast'}
                  // style={{
                  //   flex: 1,
                  //   maxWidth: '100%',
                  // }}
                  type="grey"
                  size="middle"
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-list/index?storeId=${storeId}&storeCateIds=${cate.storeCateId}&keywords=${cate.cateName}`,
                    });
                  }}
                >
                  <Text className="elis">{cate.cateName}</Text>
                </Button>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
