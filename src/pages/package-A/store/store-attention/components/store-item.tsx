import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './store-item.less';
import storeImg from '@/assets/image/store/store.png';
import address from '@/assets/image/store/address.png';
import WMButton from '@/pages/common/button';
import {StoreVO} from 'api/StoreController';
const status = ['正常', '已关闭', '已过期', '已关闭'];
interface IStoreItemProps {
  storeInfo: StoreVO;
  ifHideBtn?: boolean;
}

interface IStoreItemState {}
export default class StoreItem extends Component<IStoreItemProps, IStoreItemState> {
  constructor(props: IStoreItemProps) {
    super(props);
  }

  /**

*/
  render() {
    const {
      storeInfo: {storeLogo, storeResponseState, companyType, storeName, supplierName, addressInfo, storeId},
      ifHideBtn,
    } = this.props;

    return (
      <View
        className="search-store-item"
        onClick={() => {
          return
          if (storeResponseState !== 0) {
            return;
          }
          Taro.navigateTo({
            url: `/pages/package-A/store/store-main/index?storeId=${storeId}`,
          });
        }}
      >
        <View className="left">
          <View className="left-wrap">
            {storeResponseState ? (
              <View className="cover">
                <Text className="cover-status">{status[storeResponseState]}</Text>
              </View>
            ) : null}
            <Image src={storeLogo || storeImg} className="store-img" />
          </View>
          <View className="center-wrap">
            <View className="title">
              {companyType === 0 ? (
                <View className="ziying-wrapper">
                  <Text className="ziying">自营</Text>
                </View>
              ) : null}
              <View className="store-name">{storeName}</View>
            </View>
            <View className="info">{supplierName}</View>
            <View className="type">
              {/* <View className="sell">
              <View className="selling-point">保</View>
              <View className="selling-point">次</View>
              <View className="selling-point">货</View>
              <View className="selling-point">邮</View>
            </View> */}
              <Image src={address} className="address" />
              <Text className="address-name">{addressInfo}</Text>
            </View>
          </View>
        </View>

        {ifHideBtn === false && storeResponseState == 0 ? (
          <View
            className="right-wrap"
            // onClick={() => {
            //   Taro.navigateTo({
            //     url: `/pages/package-A/store/store-main/index?storeId=${storeId}`,
            //   });
            // }}
          >
            <WMButton size="mini">进店</WMButton>
          </View>
        ) : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
