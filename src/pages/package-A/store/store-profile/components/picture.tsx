import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {ImageViewer} from '@wanmi/ui-taro';
import './picture.less';
import rightsActions from '../actions/index';
import {store2Props} from '../selectors';
import {connect} from 'react-redux';
import * as T from '../types';

type IPictureProps = T.IProps & T.IPictureProps;

@connect<Partial<IPictureProps>, T.IPictureState>(store2Props, rightsActions)
export default class Picture extends Component<Partial<IPictureProps>, T.IPictureState> {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this._clearShowImages();
  }

  render() {
    const {
      store,
      showImages: {images, idx: current},
    } = this.props.main;
    const {ifShow, onChangeIfShow} = this.props;
    return (
      <View className="picture">
        {store.businessLicence && (
          <View className="block">
            <View className="head">
              <Text className="title">营业执照</Text>
            </View>
            <View className="papers">
              <View className="paper">
                <Image
                  src={store.businessLicence}
                  className="img"
                  onClick={() => this._changeShowImages([store.businessLicence])}
                />
              </View>
            </View>
          </View>
        )}

        {store.catePicList && store.catePicList.length > 0 && (
          <View className="block">
            <View className="head">
              <Text className="title">经营资质</Text>
            </View>
            <View className="papers">
              {store.catePicList.map((pic, idx) => (
                <View className="paper" key={idx}>
                  <Image src={pic} className="img" onClick={() => this._changeShowImages(store.catePicList, idx)} />
                </View>
              ))}
            </View>
          </View>
        )}
        {store.brandPicList && store.brandPicList.length > 0 && (
          <View className="block">
            <View className="head">
              <Text className="title">品牌经营资质</Text>
            </View>
            <View className="papers">
              {store.brandPicList.map((pic, idx) => (
                <View className="paper" key={idx}>
                  <Image src={pic} className="img" onClick={() => this._changeShowImages(store.brandPicList, idx)} />
                </View>
              ))}
            </View>
          </View>
        )}
        {images.length > 0 && (
          <ImageViewer
            images={images}
            current={current}
            onCancel={() => {
              this._clearShowImages();
            }}
          />
        )}
      </View>
    );
  }

  _changeShowImages = (images, idx = 0) => {
    let action = this.props.actions.action;
    this.props.onChangeIfShow(true);
    action.commonChange('main.showImages', {images, idx});
  };

  _clearShowImages = () => {
    let action = this.props.actions.action;
    this.props.onChangeIfShow(false);
    action.commonChange('main.showImages', {images: [], idx: 0});
  };
}
