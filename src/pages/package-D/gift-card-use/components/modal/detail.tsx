import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text, ScrollView, RichText } from '@tarojs/components';
import { connect } from 'react-redux';
import { store2Props } from '../../selectors';
import * as T from '../../types';
import actions from '../../actions';
import './detail.less';
import IconFont from '@/wmkit/common/iconfont';
import { _ } from 'wmkit';
import { POJO } from '@/wmkit/common/marketing';
import Price from '@/pages/common/goods/price';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

@connect<Partial<T.IProps>, any>(store2Props, actions)
class Details extends Component<Partial<T.IProps>, any> {
  state = {
    isShow: false,
  };

  componentDidMount(): void {
    this.setState({
      isShow: true,
    });
  }
  showRestricted = () => {
    let {
      main: { goodsRestrictedTemplateVO, dangaoRestrictedVO },
    } = this.props;
    // 配送范围始终展示
    if (dangaoRestrictedVO) return true
    return goodsRestrictedTemplateVO && [1, 2].includes(goodsRestrictedTemplateVO.restrictedType)
  }
  getRestrictedTempDesc = () => {
    let {
      main: { goodsRestrictedTemplateVO, dangaoRestrictedVO },
    } = this.props; // 配送范围始终展示
    if (dangaoRestrictedVO) {
      return ['配送范围', dangaoRestrictedVO.distrubtion || '无']
    }
    const str1 =
      goodsRestrictedTemplateVO.restrictedType === 1
        ? '仅以下地区支持配送：'
        : goodsRestrictedTemplateVO.restrictedType === 2
          ? '以下地区不支持配送：'
          : '';
    const str2 = [1, 2].includes(goodsRestrictedTemplateVO.restrictedType)
      ? _.convertToFormattedString(goodsRestrictedTemplateVO.restrictedAreaList).join(';')
      : '';
    return [str1, str2];
  };
  formatRichText = (html) => {
    if (html) {
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match
          .replace(/width:[^;]+;/gi, 'max-width:100%;overflow-x:hidden')
          .replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      /* eslint-disable */
      newContent = newContent.replace(
        /\<img/gi,
        '<img style="width:100%;max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;overflow-x:hidden"',
      );
      if(__TARO_ENV === 'h5') {
        newContent = newContent.replace(/text-wrap: nowrap; /gi, '')
      }
      /* eslint-disable */
      return newContent;
    } else {
      return '';
    }
  };
  render() {
    let { main = {}, actions = {} } = this.props;
    const { defaltAddress, goodsList, selectedId, descData, giftCard, dangaoRestrictedVO, goodsRestrictedTemplateVO } = main as POJO;
    const { openGroupType, cardRuleTypes } = giftCard || {};
    const { action } = actions as POJO;
    const { isShow } = this.state;
    const _goodsList = openGroupType == 1 ? goodsList.map((e) => e.goodsInfoList).flat() : goodsList;
    const goodsInfo = _goodsList.find((e) => e.goodsInfoId === selectedId);
    if (!goodsInfo) return null;
    const urls = main.images.filter((e) => e.artworkUrl).map((e) => e.artworkUrl)
    console.log('urls', urls);
    return (
      <View className="m_detail" catchMove>
        <View className="content" style={{ transform: `translateY(${isShow ? 0 : '100vh'})` }}>
          <IconFont
            value="guanbi"
            className="close"
            size={18}
            color="#000"
            onClick={() => action.showOrHideGoodsDetail(undefined)}
          />
          <ScrollView scrollY className="scroll">
            <View className="row">
              <Image
                src={goodsInfo.goodsInfoImg || noDataIcon}
                className="goodsImg"
                onClick={() => {
                  if (!main.images || main.images.length === 0) return;
                  Taro.previewImage({
                    current: urls[0],
                    urls,
                  });
                }}
              />
              <View className="info">
                <Text className="name">{goodsInfo.goodsInfoName}</Text>
                <View className="fill">
                  <Text className="spex">{goodsInfo.specText}</Text>
                </View>
                {!cardRuleTypes.includes(4) && (
                  <Price price={goodsInfo?.exchangePrice ? goodsInfo?.exchangePrice : goodsInfo?.marketPrice} />
                )}
              </View>
            </View>
            <View
              className="row addrs"
              onClick={async () => {
                await action._savaLocal();
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/receive-address/index?mode=1&localKey=shopCardAddress`,
                });
              }}
            >
              <Text className="addr">配送</Text>
              <Text className="addr_detail">
                {defaltAddress ? defaltAddress.addressInfo || defaltAddress.deliveryAddress : '点击新增收货地址'}
              </Text>
              <IconFont value="xiangyou" size={14} color="rgba(0,0,0,0.4)" />
            </View>
            {this.showRestricted() && (
              <View className="restricted">
                {(goodsRestrictedTemplateVO?.restrictedFlag || dangaoRestrictedVO?.canBuy == '0') && (
                  <View className="tip">
                    <IconFont value="zhuyi" size={15} color="#FF0022" />
                    <Text className="text">当前地区不支持销售，可更换收货地址购买</Text>
                  </View>
                )}
                <View
                  className="area-container"
                  style={{ marginTop: goodsRestrictedTemplateVO?.restrictedFlag ? 0 : '12px' }}
                >
                  <View className="area">
                    <Text className='area-text'>{this.getRestrictedTempDesc()[0]}</Text>
                    <Text className='area-text a2'>{this.getRestrictedTempDesc()[1]}</Text>
                  </View>
                </View>
              </View>
            )}
            {descData && (
              <View className="row rich">
                <RichText nodes={this.formatRichText(descData)} />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Details;
