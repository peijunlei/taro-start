import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './goods-share.less';
import {_} from 'wmkit';
import WMCheckbox from '@/pages/common/input-checkbox';

const share = require('@/assets/image/distribution/share.png');
let isH5 = __TARO_ENV === 'h5';

export interface IGoodsShareProps {
  checkedSku: any;
  onClose: () => any;
  shareModalVisible: () => any;
  addSelfShop: (e) => any;
  isOpenWechat: boolean;
}

export default class GoodsShare extends Component<Partial<IGoodsShareProps>, any> {
  static defaultProps = {
    checkedSku: {},
    isOpenWechat: false,
  };

  constructor(props: IGoodsShareProps) {
    super(props);
    this.state = {
      addSelfShop: true,
    };
  }

  render() {
    let {checkedSku, isOpenWechat} = this.props;
    let {addSelfShop} = this.state;
    let isWeixin = _.isWeixin();
    return (
      <View className="goodsShare"
            catchMove onTouchMove={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
      >
        <View className="mask" onClick={() => this.props.onClose()}>
          <View className="menuContainer" onClick={(e) => e.stopPropagation()}>
            <View className="header ">
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text className="zhuan">赚 ￥</Text>
                <Text className="price">{_.addZero(checkedSku.distributionCommission)}</Text>
              </View>
              <Text className="socialTips">
                好友通过你分享的链接购买商此商品，你就能赚{_.addZero(checkedSku.distributionCommission)}的利润
              </Text>
            </View>

            <View className="shareBox">
              <Image
                src={share}
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  this.props.onClose();
                  if (!isOpenWechat) {
                    Taro.showToast({
                      title: '功能不可用',
                      icon: 'none',
                      duration: 2000,
                    });
                  } else {
                    if (isH5) {
                      Taro.showToast({
                        title: '请使用微信浏览器进行分享',
                        icon: 'none',
                        duration: 2000,
                      });
                    } else {
                      this.props.shareModalVisible();
                    }
                  }
                }}
              ></Image>
              <Text className="text">图文分享</Text>
            </View>

            <View className="socialShare">
              <WMCheckbox
                checked={addSelfShop}
                onClick={() => {
                  this.setState({addSelfShop: !addSelfShop});
                  this.props.addSelfShop(!addSelfShop);
                }}
              />
              <Text className="shareText">分享此商品后添加至我的店铺</Text>
            </View>

            <View
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                this.props.onClose();
                //显示tabbar
                Taro.showTabBar();
              }}
            >
              <Text className="btntext">取消分享</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
