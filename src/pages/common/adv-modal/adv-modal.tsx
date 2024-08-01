import 'taro-ui/dist/style/components/modal.scss';
import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import ModalClose from '@/assets/image/common/modal-close.png';
import './adv-modal.less';

export default class AdvModal extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      imgHeight: 0,
    };
  }

  componentDidMount() {
    const {imgUrl} = this.props;
    if (imgUrl) {
      Taro.getImageInfo({
        src: imgUrl,
        success: (res) => {
          this.setState({
            imgHeight: res.height,
          });
        },
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {imgUrl} = this.props;
    if (nextProps.imgUrl && nextProps.imgUrl !== imgUrl) {
      Taro.getImageInfo({
        src: nextProps.imgUrl,
        success: (res) => {
          this.setState({
            imgHeight: res.height,
          });
        },
      });
    }
  }

  render() {
    let {isModalFlag, imgUrl, handleUrl, nextPopupId} = this.props;
    const {imgHeight} = this.state;

    if (!isModalFlag) return null;
    return (
      <View>
        {isModalFlag &&
          (__TARO_ENV === 'weapp' ? (
            <View className="modal-box">
              <View className="modal-mask" onClick={() => this.props.handleClose(nextPopupId)}></View>
              {imgHeight > 400 && (
                <View className="modal-img-height">
                  <Image
                    mode="aspectFit"
                    className="modal-content"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUrl();
                    }}
                    src={imgUrl}
                  />
                  <Image onClick={() => this.props.handleClose(nextPopupId)} className="modal-close" src={ModalClose} />
                </View>
              )}
              {imgHeight <= 400 && (
                <View className="modal-img">
                  <Image
                    mode="aspectFit"
                    className="modal-content"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUrl();
                    }}
                    src={imgUrl}
                  />
                  <Image onClick={() => this.props.handleClose(nextPopupId)} className="modal-close" src={ModalClose} />
                </View>
              )}
              {/*<View>*/}
              {/*  <Image onClick={() => this.props.handleClose(nextPopupId)} className="modal-close" src={ModalClose}/>*/}
              {/*</View>*/}
            </View>
          ) : (
            <View className="modal-box-h5">
              <View className="modal-mask" onClick={() => this.props.handleClose(nextPopupId)}></View>
              {imgHeight > 400 && (
                <View className="modal-img-height">
                  <Image
                    mode="aspectFit"
                    className="modal-content"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUrl();
                    }}
                    src={imgUrl}
                  />
                </View>
              )}
              {imgHeight <= 400 && (
                <View className="modal-img">
                  <Image
                    mode="aspectFit"
                    className="modal-content"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUrl();
                    }}
                    src={imgUrl}
                  />
                </View>
              )}
              <View>
                <Image onClick={() => this.props.handleClose(nextPopupId)} className="modal-close" src={ModalClose} />
              </View>
            </View>
          ))}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
