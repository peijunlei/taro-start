import 'taro-ui/dist/style/components/modal.scss';
import {View, RichText, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import {_} from 'wmkit';
import closeIcon from '@/assets/image/common/coupon-close.png';

interface IWMPopupBoxProps {
  visible?: boolean;
  richText?: any;
  onClose: Function;
}

interface IWMPopupBoxState {}

export default class WMRichModal extends Component<IWMPopupBoxProps, IWMPopupBoxState> {
  static defaultProps = {
    visible: false,
    richText: null,
    onClose: () => {},
  };

  constructor(props: IWMPopupBoxProps) {
    super(props);
  }

  /**
    
*/
  render() {
    if (!this.props) {
      return false;
    }

    let {visible, richText, onClose} = this.props;
    return (
      <View className={visible ? 'info-mask show-mask' : 'info-mask'}>
        <View className="info-mask-box">
          <View className="info-mask-con">
            <RichText nodes={visible && _.formatRichText(richText)} />
          </View>

          <View
            className="info-mask-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <Image src={closeIcon} className="info-mask-close-img" />
          </View>
        </View>
      </View>
    );
  }
}
