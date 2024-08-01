import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

export default class Notice extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      notice: [
        '       即日起进行商城维护升级，预计时间2-3天，期间或影响商城正常使用，我们将尽快恢复上线，感谢您的理解与支持！',
      ],
    };
  }

  render() {
    return (
      <View style={{padding: '40px', width: '100vw', height: '100vh', backgroundColor: 'rgb(38,74,163)'}}>
        <View
          style={{
            wordBreak: 'break-all',
            marginBottom: '5px',
            marginTop: '70px',
            fontWeight: 500,
            flexDirection: 'row',
          }}
        >
          <Text style={{fontSize: '20px', color: '#fff', lineHeight: 1.4, textAlign: 'center', width: '100%'}}>
            停机维修公告
          </Text>
        </View>
        <View
          style={{
            wordBreak: 'break-all',
            marginBottom: '5px',
            marginTop: '60px',
            fontWeight: 500,
            flexDirection: 'row',
          }}
        >
          <Text style={{fontSize: '16px', color: '#fff', lineHeight: 1.8}}>尊敬的用户：</Text>
        </View>
        {this.state.notice.length > 0 &&
          this.state.notice.map((item, index) => {
            return (
              <View key={index} style={{wordBreak: 'break-all', marginBottom: '5px', flexDirection: 'row'}}>
                <Text style={{fontSize: '16px', color: '#fff', lineHeight: 1.8}}>{item}</Text>
              </View>
            );
          })}
      </View>
    );
  }
}
