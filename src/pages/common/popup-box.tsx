import {View, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './popup-box.less';
import classNames from 'classnames';
import closeIcon from '@/assets/image/common/close.png';

interface IWMPopupBoxProps {
  position?: 'bottom' | 'top' | 'right' | 'center' | 'left';
  title?: any;
  footer?: any;
  scrollX?: boolean;
  scrollY?: boolean;
  visible?: boolean;
  ifNeedCloseIcon?: boolean;
  width?: any;
  heigth?: any;
  onClose: Function;
  renderTitle?: any;
  className?: object;
}

interface IWMPopupBoxState {}

export default class WMPopupBox extends Component<IWMPopupBoxProps, IWMPopupBoxState> {
  static defaultProps = {
    position: 'bottom',
    title: null,
    footer: null,
    scrollX: false,
    scrollY: false,
    visible: false,
    width: '100%',
    heigth: '0',
    onClose: () => {},
    ifNeedCloseIcon: true,
  };

  constructor(props: IWMPopupBoxProps) {
    super(props);
  }

  render() {
    const {onClose, ifNeedCloseIcon, scrollY, position, className, title} = this.props;
    return (
      <View className={classNames('wm-popupBox', {'wm-popupBox_show': this.props.visible}, className)}>
        {/* 蒙层 */}
        <View
          className={classNames('popupBox__overlay', {popupBox__overlay_show: this.props.visible})}
          onClick={(e) => typeof onClose === 'function' && onClose()}
        ></View>
        <View
        // className={classNames('popupBox__overlay', { popupBox__overlay_show: this.props.visible })}
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
        >
          <View
            className={classNames(
              'popupBox__body',
              {popupBox__body_left: position === 'left'},
              {popupBox__body_right: position === 'right'},
              {popupBox__body_center: position === 'center'},
              {popupBox__body_bottom: position === 'bottom'},
              className,
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {title && (
              <View className="popupBox__header">
                <View className="title">{title}</View>
              </View>
            )}
            {ifNeedCloseIcon && (
              <View
                className="close"
                onClick={() => {
                  onClose();
                }}
              >
                <Image src={closeIcon} className="close-img" />
              </View>
            )}
            {scrollY ? (
              <ScrollView
                className="popupBox__content_scroll"
                scrollY
                scrollWithAnimation
                scrollTop={20}
                lowerThreshold={0}
                upperThreshold={0}
                // onScrollToUpper={this._onScrollToUpper}
                // onScrollToLower={this._onScrollToLower}
              >
                {this.props.children}
              </ScrollView>
            ) : (
              <View className="popupBox__content">{this.props.children}</View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
