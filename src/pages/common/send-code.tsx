import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './send-code.less';
import { debounce } from 'lodash';
import cn from 'classnames'

interface ISendCodeP {
  onClick: (e) => any;
  type?: "default" | "grey";
  [name: string]: any;
}

interface ISendCodeS {
  count: number;
  isDoing: boolean;
  textName: string;
  [name: string]: any;
}
export default class SendCode extends Component<ISendCodeP, ISendCodeS> {
  static defaultProps = {
    type: 'default'
  };

  constructor(props) {
    super(props);
    this.state = {
      //默认倒计时时间，正整数，单位：秒
      count: 0,
      //准备发送阶段;
      isDoing: false,
      textName: '获取验证码',
    };
  }

  render() {
    let { count, isDoing, textName } = this.state;
    const { type } = this.props
    const classNames = cn('send-code', { grey: type === 'grey' })
    return (
      <View className={classNames} onClick={debounce(this._click, 500)}>
        {isDoing ? (
          <Text className="number" style={{ whiteSpace: 'nowrap' }}>
            {count}s 后重试
          </Text>
        ) : (
            <Text className="send-text">{textName}</Text>
          )}
      </View>
    );
  }

  //倒计时事件
  _click = async (e) => {
    try {
      if (this.state.count === 0) {
        if (this.state.isDoing) {
          return;
        }

        try {
          let result = await this.props.onClick(e);
          console.log(result);
          if (typeof result === 'boolean' && !result) {
            this.setState({ isDoing: false });
            this.setState({ count: 0 });
            return;
          }
        } catch (err) {
          this.setState({ isDoing: false });
          this.setState({ count: 0 });
          return;
        }
        //准备发送阶段
        // this.setState({isDoing: true});
        this.setState(
          {
            count: 60,
            isDoing: true,
          },
          () => {
            let t = setInterval(() => {
              if (this.state.count === 0) {
                clearInterval(t);
                this.setState({
                  isDoing: false,
                  textName: '重新获取',
                });
              } else {
                this.setState({ count: this.state.count - 1 });
              }
            }, 1000);
          },
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };
}
