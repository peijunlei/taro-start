import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './goods-share.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import Price from '@/pages/common/goods/price';
import WMCheckbox from '@/pages/common/input-checkbox';
const share = require('@/assets/image/distribution/share.png');

type IGoodsShareProps = T.IProps & T.IGoodsShareProps;

@connect<Partial<IGoodsShareProps>, T.IGoodsShareState>(store2Props, actions)
export default class GoodsShare extends Component<Partial<IGoodsShareProps>, T.IGoodsShareState> {
  constructor(props: IGoodsShareProps) {
    super(props);
  }

  /**
    分享赚step1
*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      main.goodsShareVisible && (
        <View className="goodsShare">
          <View
            className="mask"
            onClick={(e) => {
              action.commonChange('main.goodsShareVisible', false);
              //显示tabbar
              Taro.showTabBar();
            }}
          ></View>
          <View className="menuContainer">
            <View className="header ">
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text className="zhuan">赚 </Text>
                {/* <Price price={main.checkedSku.distributionCommission}/> */}
                <Text className="price">{_.addZero(main.checkedSku.distributionCommission)}</Text>
              </View>
              <Text className="socialTips">
                好友通过你分享的链接购买商此商品，你就能赚
                <Text className="socialTips yellow">{_.addZero(main.checkedSku.distributionCommission)}</Text>的利润
              </Text>
            </View>

            <View className="shareBox">
              <Image
                src={share}
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!main.isOpenWechat) {
                    Taro.showToast({
                      title: '功能不可用',
                      icon: 'none',
                      duration: 2000,
                    });
                  } else {
                    action.pictureShare();
                    action.commonChange('main.buttonType', 3);
                  }
                }}
              ></Image>
              <Text className="text">图文分享</Text>
            </View>

            <View className="socialShare">
              <WMCheckbox checked={main.addSelfShop} onClick={() => action.addShareStore()} />
              <Text className="shareText">分享此商品后添加至我的店铺</Text>
            </View>

            <View
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                action.cancelModal();
              }}
            >
              <Text className="btntext">取消分享</Text>
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
