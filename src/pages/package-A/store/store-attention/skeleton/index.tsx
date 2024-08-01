import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View} from '@tarojs/components';
import './index.less';
import {msg} from 'wmkit';
import WMLoading from '@/pages/common/loading';

export default class SkeletonScreen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showSkeleton: true,
    };
    msg.on({
      webviewLoaded: this.hideSkeleton,
    });
  }

  componentWillUnmount() {
    msg.bus.off('webviewLoaded', this.hideSkeleton);
  }

  hideSkeleton = () => {
    this.setState({
      showSkeleton: false,
    });
  };

  render() {
    let skeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      this.state.showSkeleton && (
        <View className="ske-store-skeContainer">
          <View className="ske-store-skeList">
            {skeList.map((item) => {
              return (
                <View className="ske-store-skeItem" key={item}>
                  <View className="ske-store-skeItemLeft"></View>
                  <View className="ske-store-skeItemRight">
                    <View className="ske-store-skeItemLineBox">
                      <View className="skeColor ske-store-skeSqure1"></View>
                      <View className="skeColor ske-store-skeSqure2"></View>
                      <View className="skeColor ske-store-skeSqure3"></View>
                    </View>
                    <View className="skeColor ske-store-skeRightBtn"></View>
                  </View>
                </View>
              );
            })}
          </View>

          <WMLoading />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon

// import {View, Button, Text, Image} from '@tarojs/components';
// import Taro, {Component, Config} from '@tarojs/taro';
// // import {AtModal} from 'taro-ui';

// import * as T from '../types';
// import './index.less';
// import actions from '../actions/index';
// import {connect} from '@tarojs/redux';
// import {store2Props} from '../selectors';
// // import CountDown from '@/pages/common/count-down';
// import moment from 'dayjs';
// import msLogo from '@/assets/image/goods/goods-detail/ms-logo.png';
// import {_} from 'wmkit';
// // import 'taro-ui/dist/className/components/modal.scss';

// type IBuyStatusProps = T.IProps & T.IBuyStatusProps;

// @connect<Partial<IBuyStatusProps>, T.IBuyStatusState>(store2Props, actions)
// export default class BuyStatus extends Component<Partial<IBuyStatusProps>, T.IBuyStatusState> {
//   constructor(props: IBuyStatusProps) {
//     super(props);
//     this.state = {
//       isShow: false,
//     };
//   }

//   /**
//     预约
// */
//   render() {
//     let skeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     return (
//       <View className="ske-store-skeContainer">
//         <View className="ske-store-skeList">
//           {skeList.map((item) => {
//             return (
//               <View className="ske-store-skeItem" key={item}>
//                 <View className="ske-store-skeItemLeft"></View>
//                 <View className="ske-store-skeItemRight">
//                   <View className="ske-store-skeItemLineBox">
//                     <View className="skeColor ske-store-skeSqure1"></View>
//                     <View className="skeColor ske-store-skeSqure2"></View>
//                     <View className="skeColor ske-store-skeSqure3"></View>
//                   </View>
//                   <View className="skeColor ske-store-skeRightBtn"></View>
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     );
//   }
// }
