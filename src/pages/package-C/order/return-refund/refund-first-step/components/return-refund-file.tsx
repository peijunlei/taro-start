import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-refund-file.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import close from '@/assets/image/common/black-close.png';
import plus from '@/assets/image/common/plus.png';
type IReturnRefundFileProps = T.IProps & T.IReturnRefundFileProps;

@connect<Partial<IReturnRefundFileProps>, T.IReturnRefundFileState>(store2Props, actions)
export default class ReturnRefundFile extends Component<Partial<IReturnRefundFileProps>, T.IReturnRefundFileState> {
  constructor(props: IReturnRefundFileProps) {
    super(props);
  }
  state = {
    // bigImageShow: false,
    bigImage: '',
  };
  /** * 退货退款附件  */
  render() {
    let {
      actions: {
        action: {_chooseImage, _deleteImage},
      },
      main,
    } = this.props;
    const {bigImage} = this.state;

    return (
      <View className="returnRefundFile">
        <Text className="check-title">退货附件</Text>
        <View className="file-box">
          {main?.images &&
            main?.images.length > 0 &&
            main?.images.map((item, key) => {
              return (
                <View className="enclosure" key={key}>
                  <Image src={item} className="pic" onClick={() => this.findBigImg(item)} />
                  <Image
                    src={close}
                    className="close-pic"
                    onClick={async () => {
                      await _deleteImage(key);
                    }}
                  />
                </View>
              );
            })}
          {main?.images.length < 10 ? (
            <View
              className="upload-box"
              onClick={async () => {
                await _chooseImage(main?.images);
              }}
            >
              <Image className="arrow-img" src={plus} />
            </View>
          ) : null}
        </View>
        <Text className="enclosure-tips">仅支持jpg、jpeg、png、gif文件，最多上传10张，大小不超过5M</Text>

        {/* 查看大图 */}
        {main?.bigImageShow && (
          <View
            className="black-layer"
            onClick={() => this.props.actions.action.commonChange('main.bigImageShow', false)}
          >
            <Image src={bigImage} className="big-img" />
          </View>
        )}
      </View>
    );
  }
  //查看大图
  findBigImg = (item) => {
    //无图片的时候 不允许点开大图
    if (item == '') {
      return;
    }
    this.setState({bigImage: item});
    this.props.actions.action.commonChange('main.bigImageShow', true);
  };
}

//create by moon https://github.com/creasy2010/moon
