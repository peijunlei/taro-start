import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import {_} from 'wmkit';
import giftIcon from '@/assets/image/distribution/gift-icon.png';
import api from 'api';
import Price from '@/pages/common/goods/price';
import WMRichModal from '@/pages/common/modal/rich-modal';

import defaultImg from '@/assets/image/common/default-img.png';

export default class StoreBags extends Component<any, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    const {applyFlag, applyType, recruitDesc, goodsInfos, recruitImg} = await api.distributionController.storeBags();
    if (applyFlag === 1 && applyType === 0) {
      this.setState({
        goodsInfos,
        recruitDesc,
        recruitImg,
      });
    }
    this.setState({
      goodsInfos,
      recruitDesc,
      recruitImg,
    });
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  onShareTimeline() {
    // 默认分享内容
  }

  state = {
    maskOpened: false,
    goodsInfos: [],
    recruitDesc: '',
    recruitImg: '',
  };

  componentWillUnmount() {}

  componentDidShow() {
    // 清除订单tab缓存
    Taro.removeStorageSync('order_list_tab');
  }

  render() {
    const {goodsInfos, recruitDesc, recruitImg, maskOpened} = this.state;
    console.log(maskOpened);
    return (
      <View className="invite-friends">
        <View className="invite-con">
          <Image src={recruitImg} className="invite-bg" />
          <View
            className="rule-btn"
            onClick={() => {
              this.setState({maskOpened: true});
            }}
          >
            <Text className="rule-text">详细说明</Text>
          </View>
        </View>

        <View className="invite-list">
          <View className="invite-top">
            <Image src={giftIcon} className="gift-icon" />
            <Text className="gift-title">超值开店礼包</Text>
          </View>
          <View className="list-con">
            {goodsInfos.map((goodsInfo, key) => {
              const {
                goodsStatus,
                goodsInfoImg,
                companyType,
                goodsInfoName,
                specText,
                salePrice,
                count,
                stock,
              } = goodsInfo;
              // 库存等于0或者起订量大于剩余库存
              const invalid = stock <= 0;
              return (
                <View
                  key={key}
                  className="good-item"
                  onClick={async () => {
                    if (!invalid) {
                      await Taro.navigateTo({
                        url: `/pages/package-B/reward-center/goods-details/index?skuId=${goodsInfo.goodsInfoId}`,
                      });
                    }
                  }}
                >
                  <View className="img-wrap">
                    <Image src={goodsInfoImg ? goodsInfoImg : defaultImg} className="good-pic" />
                    {(goodsStatus === 1 || goodsStatus === 2) && (
                      <View className="cover">
                        {goodsStatus === 1 && <View className="status">缺货</View>}
                        {goodsStatus === 2 && <View className="status">失效</View>}
                      </View>
                    )}
                  </View>

                  <View className="good-con">
                    <View className="store-top">
                      {companyType === 0 && (
                        <View className="store-type">
                          <Text className="store-text">自营</Text>
                        </View>
                      )}
                      <Text className="store-name">{goodsInfoName}</Text>
                    </View>
                    <View className="spec-list">
                      <Text className="spect-text" style={!specText && {color: 'transparent'}}>
                        {specText || '我是规格。。。'}
                      </Text>
                    </View>
                    <View className="priceH">
                      <Price price={_.addZero(salePrice || 0)} />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {maskOpened && (
          <WMRichModal
            visible={maskOpened}
            richText={recruitDesc}
            onClose={() => {
              this.setState({maskOpened: false});
            }}
          />
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
