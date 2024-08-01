import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './searchinput.less';
import searchImg from '@/assets/image/goods/search.png';

interface IWMSearchInputProps {
  placeholder: string;
}

interface IWMSearchInputState {}

export default class WMSearchInput extends Component<IWMSearchInputProps, IWMSearchInputState> {
  constructor(props: IWMSearchInputProps) {
    super(props);
  }

  render() {
    return (
      <View className="content">
        <Image src={searchImg} className="searchImg" />
        <Input className="searchText" type="text" placeholder="搜索商品" focus />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
