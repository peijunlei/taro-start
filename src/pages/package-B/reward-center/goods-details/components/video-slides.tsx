import {View, Button, Text, Image, Video} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/video-slides.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IVideoSlidesProps = T.IProps & T.IVideoSlidesProps;

@connect<Partial<IVideoSlidesProps>, T.IVideoSlidesState>(store2Props, actions)
export default class VideoSlides extends Component<Partial<IVideoSlidesProps>, T.IVideoSlidesState> {
  constructor(props: IVideoSlidesProps) {
    super(props);
  }

  /**
    视频
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    return (
      <View className="videoSlides">
        <View className="video-box">
          <Video
            src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
            className="img"
          />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
