import React from 'react';

import { View, Text } from "@tarojs/components";
import IconFont from "@/wmkit/common/iconfont";



import '../css/restriction.less';




function Restriction() {
  return (
    <View className="restriction">
      <IconFont value="zhuyi" size={15} color="#FF0022" />
      <Text className="text">当前地区不支持销售，可更换收货地址购买</Text>
    </View>
  );
}

export default Restriction;