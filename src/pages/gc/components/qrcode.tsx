import React from 'react';
import { View } from "@tarojs/components";

import './qrcode.less';
interface QrcodeProps {
  onClick: () => void;
}


function Qrcode(props: QrcodeProps) {
  const { onClick } = props;
  return ( 
    <View className='xxqrcode' onClick={onClick}>
      <View id='reader'></View>
    </View>
   );
}

export default Qrcode;