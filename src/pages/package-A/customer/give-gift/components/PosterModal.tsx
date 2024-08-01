
import React from 'react';

import { View, Image, Text, Button } from '@tarojs/components';

import imgBg from '@/assets/image/customer/give-gift/red-packet-bg.png'
import close from '@/assets/image/draw/close.png';


import './PosterModal.less';
const isH5 = __TARO_ENV === 'h5'
interface PosterModalProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  onShare: () => void;
}
/**
 * 
 *  grantAmount: 0,
    grantCustomerImg: '',
    grantCustomerName: '',
    grantMsg: '',
    grantState: 0
 */
function PosterModal(props: PosterModalProps) {
  const { onClose, data, visible, onShare } = props
  if (!visible || !data) return null
  const { grantAmount } = data
  return (
    <View className='poster-wrapper' onClick={onClose}>

      <View className='poster' onClick={(e) => {
        e.stopPropagation()
      }}>
        <Image src={imgBg} className='img' />

        <View className='balance'>
          <Text className='amount'>{grantAmount.toFixed(2)}</Text>
          <Text className='unit'>元</Text>
        </View>
        {
          isH5 ? <View className='btn' onClick={onShare} >
            {'红包转赠'}
          </View> : <Button openType='share' className='share_btn btn' >红包转赠</Button>
        }

      </View>
    </View>
  )
}

export default PosterModal