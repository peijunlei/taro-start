
import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import arrowImg from '@/assets/image/common/arrow.png';
interface QimoProps {
  handleClick: () => void
}
function Qimo(props: QimoProps) {
  const { handleClick } = props
  return (
    <View className="list">
      <View className="service-list">
        <View
          className="item"
          onClick={handleClick}
        >
          <View className="service_list_item">
            <Text>联系客服</Text>
          </View>
          <Image src={arrowImg} className="arrow" />
        </View>
      </View>
    </View>
  );
}

export default Qimo;