import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './list-item.less';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
//@ts-ignore
export default class ListItem extends Component<any, any> {
  static defaultProps = {
    style: {}, //最外层自定义样式
    contentStyle: {}, //内容自定义样式
    label: '', //标题
    content: '', //内容
    icon: '', //自定义图标
    onClick: () => {}, //点击事件
    noIcon: false, //是否隐藏图标
  };


  render() {
    const {label, content, icon, onClick, style, noIcon, contentStyle} = this.props;
    return (
      <View className="listItem" onClick={onClick} style={style}>
        <View className="listItemContent">
          <Text className="label">{label || ''}</Text>
          <View className="content" style={contentStyle}>
            {content}
          </View>
        </View>
        {!noIcon ? <Image src={icon || moreIcon} className="listItemIcon" /> : <View />}
      </View>
    );
  }
}
