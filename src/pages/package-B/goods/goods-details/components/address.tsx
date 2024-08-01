/* eslint-disable react/sort-comp */
import { Image, Text, View, ScrollView, Button } from '@tarojs/components';
import Taro, { getStorageSync } from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './less/address.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { VAS, WMkit, _ as utils } from 'wmkit';
import remind from '@/assets/image/common/remind.png';
import addressIcon from '@/assets/image/shop-cart/address.png';
import ListItem from '@/pages/common/list-item';
import { Const } from 'config';
import _ from 'lodash';
import IconFont from '@/wmkit/common/iconfont';

type ILoginHeaderProps = T.IProps;

@connect<Partial<ILoginHeaderProps>, any>(store2Props, actions)
export default class Address extends Component<Partial<ILoginHeaderProps>, any> {


  onRefresherRestore = () => {
    this.props.init();
  };

  onRefresherAbort = (e) => {
    // this.setState({triggered: false});
  };
  getRestrictedTempDesc = () => {
    let {
      main: { goodsRestrictedTemplateVO, dangaoRestrictedVO },
    } = this.props;
    // 配送范围始终展示
    if (dangaoRestrictedVO) {
      return ['配送范围', dangaoRestrictedVO.distrubtion||'无']
    }
    if(!goodsRestrictedTemplateVO) return []
    const str1 = goodsRestrictedTemplateVO.restrictedType === 1 ? '仅以下地区支持配送：' : goodsRestrictedTemplateVO.restrictedType === 2 ? '以下地区不支持配送：' : ''
    const str2 = [1, 2].includes(goodsRestrictedTemplateVO.restrictedType) ? utils.convertToFormattedString(goodsRestrictedTemplateVO.restrictedAreaList).join(';') : ''
    return [str1, str2]
  }

  showRestricted = () => {
    let {
      main: { goodsRestrictedTemplateVO, dangaoRestrictedVO,goodsDetail },
    } = this.props;

    // 配送范围始终展示
    if (dangaoRestrictedVO||(goodsDetail.isCurrAddressSale===false)) return true
    return goodsRestrictedTemplateVO && [1, 2].includes(goodsRestrictedTemplateVO.restrictedType)
  }
  render() {
    if (!this.props.main) return <View />;
    let {
      main: { address, goodsRestrictedTemplateVO, dangaoRestrictedVO,goodsDetail },
      onScrollToLower,
      isHideModule,
    } = this.props;

    return (
      <View
        className="choose-address"
        onTouchEnd={() => {
          if (isHideModule) return;
          typeof onScrollToLower === 'function' && onScrollToLower();
        }}
      >
        <ListItem
          onClick={async () => {
            await Taro.navigateTo({
              url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'confirmAddress'}`,
            });
          }}
          label="收货"
          content={
            <View>
              <View className="edit-icon-con">
                <View className="edit-wrap">
                  <View className="edit-address">
                    <IconFont value="dingwei" size={15} color="var(--themeColor)" />
                    <Text className={address && address.needComplete ? 'acceptAddressSmall' : 'acceptAddress'}>
                      {(address&&address.addressInfo)
                        ? this._noWrap(address.addressInfo)
                        : '点击新增收货地址'}
                    </Text>
                  </View>
                  {address && address.needComplete && (
                    <View className="remindTip" style={{ flexDirection: 'row' }}>
                      <Image src={remind} className="remindIcon" />
                      <Text className="remindText">请完善收货地址</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          }
        />
        {
          this.showRestricted() && (
            <View className='restricted'>
              {
                (goodsRestrictedTemplateVO?.restrictedFlag || dangaoRestrictedVO?.canBuy==='0'||(goodsDetail.isCurrAddressSale===false)) &&
                <View className='tip'>
                  <IconFont value="zhuyi" size={15} color="#FF0022" />
                  <Text className='text'>当前地区不支持销售，可更换收货地址购买</Text>
                </View>
              }
              <View className='area-container'>
                <View className='area'>
                  <Text className='area-text'>{this.getRestrictedTempDesc()[0]}</Text>
                  <Text className='area-text a2'>{this.getRestrictedTempDesc()[1]}</Text>
                </View>
              </View>
            </View>
          )
        }


      </View>
    );
  }

  //去除换行符
  _noWrap = (str, houseNum=null) => {
    str = str.toString().replace(/[\r\n]/g, '');
    return houseNum ? str + houseNum : str;
  };
  _getEmptyHeight = () => {
    if (__TARO_ENV === 'h5') {
      return 'calc(100vh - 96px - 38px - env(safe-area-inset-bottom))';
    } else {
      return 'calc(100vh - 96px - 38px)';
    }
  };
}
//create by moon https://github.com/creasy2010/moon
