import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import searchImg from '@/assets/image/goods/search.png';

interface IWMInputSearchProps {
  placeholder?: string;
  keywords?: string;
  url?: string;
  disabled?: boolean;
  style?: any;
  value?: string;
  onInput?: Function;
  theme?: 'default' | 'white';
}

interface IWMInputSearchState {
  value: string;
}

export default class WMInputSearch extends Component<IWMInputSearchProps, IWMInputSearchState> {
  constructor(props: IWMInputSearchProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  static defaultProps = {
    disabled: false,
    theme: 'default',
  };

  render() {
    const {keywords, url, placeholder, disabled, style, value, onInput, theme} = this.props;
    return disabled ? (
      <View
        style={style}
        className={theme === 'white' ? 'content' : 'content white'}
        onClick={() => {
          Taro.navigateTo({
            url,
          });
        }}
      >
        <Image src={searchImg} className="searchImg" />
        <Input
          className="searchText"
          type="text"
          placeholder={placeholder || ''}
          disabled
          value={keywords || ''}
          onClick={() => {
            Taro.navigateTo({
              url,
            });
          }}
        />
      </View>
    ) : (
      <View className={theme === 'white' ? 'content' : 'content white'} style={style}>
        <Image src={searchImg} className="searchImg" />
        <Input
          className="searchText"
          type="text"
          value={value}
          placeholder={placeholder || ''}
          autoFocus
          onInput={(e) => {
            this.setState(
              {
                value: e.detail.value,
              },
              () => {
                onInput(this.state.value);
              },
            );
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
