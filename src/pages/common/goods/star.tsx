import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './star.less';
import starIcon from '@/assets/image/goods/goods-detail/star.png';
import gStarIcon from '@/assets/image/goods/goods-detail/g-star.png';
interface IStarP {
  num: number;
  edit?: boolean; // 是否可编辑
  onNumChange?: Function;
  [name: string]: any;
}

interface IStarS {
  arr: number[];
  num: number;
}
export default class Star extends Component<IStarP, IStarS> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      //根据页面当中的星星的数量来设置默认值
      arr: [1, 2, 3, 4, 5],
      num: props.num,
    };
  }
  render() {
    const {num, edit, onNumChange} = this.props;
    const {arr} = this.state;
    return (
      <View className="star-box">
        {arr.map((item, idx) => {
          const src = num >= item ? starIcon : gStarIcon;
          return (
            <View
              key={idx}
              className="star-click-area"
              onClick={() => {
                if (edit) {
                  const newNum = idx + 1;
                  this.setState({num: newNum});
                  onNumChange && onNumChange(newNum);
                }
              }}
            >
              <Image src={src} className="star-img" />
            </View>
          );
        })}
      </View>
    );
  }
}
