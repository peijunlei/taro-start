import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './tool-img.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import ToolImgItem from './tool-img-item';
const find = require('@/assets/image/distribution/link-find.png');
const goods = require('@/assets/image/distribution/link-goods.png');
const store = require('@/assets/image/distribution/link-store.png');
const grayStore = require('@/assets/image/distribution/link-store-gray.png');

type IToolImgProps = T.IProps & T.IToolImgProps;

@connect<Partial<IToolImgProps>, T.IToolImgState>(store2Props, actions)
export default class ToolImg extends Component<Partial<IToolImgProps>, T.IToolImgState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IToolImgProps) {
    super(props);
  }

  /**
    
*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {
        action: {commonChange},
      },
      main: {distributeSetting, distributor, forbiddenShow},
    } = this.props;
    // 小店是否关闭 0：关闭，1：开启
    let shopOpenFlag = distributeSetting.shopOpenFlag;
    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor?.forbiddenFlag;
    return (
      <View className="toolImg">
        {shopOpenFlag == 1 && (
          <View
            className="link"
            onClick={() =>
              !forbidFlag
                ? Taro.navigateTo({
                    url: `/pages/package-B/distribution/shop/shop-index/index`,
                  })
                : commonChange('main.forbiddenShow', !forbiddenShow)
            }
          >
            <ToolImgItem src={forbidFlag ? grayStore : store} title="管理店铺" contant="管小店" />
          </View>
        )}
        <View
          className={`link ${shopOpenFlag !== 1 && 'linkTwo'}`}
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/package-B/goods/goods-list/index?spreadFlag=${true}`,
            });
          }}
        >
          <ToolImgItem src={goods} title="推广商品" contant="赚佣金" />
        </View>
        <View
          className={`link ${shopOpenFlag !== 1 && 'linkTwo'}`}
          onClick={() => {
            Taro.navigateTo({url: `/pages/material-circle/index`});
          }}
        >
          <ToolImgItem src={find} title="素材广场" contant="去分享" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
