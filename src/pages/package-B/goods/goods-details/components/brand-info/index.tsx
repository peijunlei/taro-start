import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import rArrowIcon from '@/assets/image/goods/goods-detail/r-arrow.png';
import none from '@/assets/image/common/none.png';

import './index.less'

interface IProps {
  goodsBrand: {
    brandName: string,
    logo: string,
    brandId: number,
    nickName?: string
  }
}
function BrandInfo(props: IProps) {
  const { brandName, logo, brandId, nickName } = props.goodsBrand;

  function handleClick() {
    Taro.navigateTo({
      url: `/pages/package-B/goods/goods-list/index?brandIds=${JSON.stringify([brandId])}`,
    })
  }
  return (
    <View className='brand_info'>
      <Image src={logo || none} className='brand_info_logo' />
      <View className='brand_info_name'>
        {brandName}{nickName || ''}
      </View>
      <View className='brand_info_more' onClick={handleClick} >
        <Text className='all'>全部</Text>
        <Image src={rArrowIcon} className='arrow' />
      </View>
    </View>
  )

}
export default BrandInfo;
