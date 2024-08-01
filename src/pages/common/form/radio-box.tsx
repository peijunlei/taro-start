import {View, Input, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './radio-box.less';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
export interface IRadioBoxProps {
  // count: any;
  // getNum: Function;
  // inventory?: any;
  //选中值
  checked: any;
  //选择方法
  onCheck: Function;
  //样式
  style?: any;
  //选项数据
  data: any;
}

export default class RadioBox extends Component<IRadioBoxProps, any> {
  constructor(props: IRadioBoxProps) {
    super(props);
  }

  static defaultProps = {
    data: [],
  };

  render() {
    const {checked, data, style} = this.props;
    return (
      <View className="Checkbox" style={{paddingLeft: __TARO_ENV === 'h5' ? 12 + 'px' : 0}}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              className="checkBox-item"
              style={style}
              onClick={() => {
                this._onCheck(item.id);
              }}
            >
              <Text className="check-label">{item.name}</Text>
              <Image className="checkImg" src={checked == item.id ? check : uncheck} />
            </View>
          );
        })}
      </View>
    );
  }
  _onCheck(v) {
    this.props.onCheck(v);
  }
}
