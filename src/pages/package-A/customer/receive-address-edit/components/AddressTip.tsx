import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component,Fragment} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import errorTip from '@/assets/image/customer/address/errorTip.png';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, Partial<T.ActionType>>(store2Props, actions)
export default class Infos extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    console.log(main.maskShow)

    return (
       <View className="pass-bg"
             onClick={(e)=>{
               e.stopPropagation();
             }}
             catchMove onTouchMove={(e) => {
               e.stopPropagation();
             }}
       >
         <View className="pass-show"
               onClick={(e) => {
                 e.stopPropagation();
               }}>
           <View className="pass-header">
             <Image src={errorTip} className='bug-img-address' />
           </View>
           <Text className='tip-edit-address'>请完善收货地址</Text>
           <View className="pass-btn">
             <Text className='edit-address'
             onClick={()=> {
               action.commonChange('main.maskShow',true)
               action.commonChange('main.pickerShow', true);
             }}
             >立即完善</Text>
           </View>
         </View>
       </View>
    )

  }
}
