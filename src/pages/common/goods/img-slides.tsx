import {View, Text, Image, Swiper, SwiperItem, Video} from '@tarojs/components';
// import Taro from '@tarojs/taro';
import playIcon from '@/assets/image/goods/goods-detail/play.png';
import notImg from '@/assets/image/goods/goods-list/no-data-b.png';
import close from '@/assets/image/goods/goods-list/close.png';
import ImagesViewer from '@/pages/common/images-viewer';
import React, {Component} from 'react';
import './img-slides.less';

interface ICouponLabelP {
  slideImages: any;
  goodsVideo?: string;
  [name: string]: any;
}

interface ICouponLabelS {
  num: number;
  playVideo: boolean;
  isShowPage: boolean;
  bigImage: string;
  idx: number;
  // bigImageShow: boolean;
}
export default class CouponLabel extends Component<ICouponLabelP, ICouponLabelS> {
  static defaultProps = {
    slideImages: [],
    // index: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      playVideo: false,
      isShowPage: true,
      // eslint-disable-next-line react/no-unused-state
      bigImage: '',
      idx: 0,
      // bigImageShow: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // eslint-disable-next-line react/sort-comp
  render() {
    //@ts-ignore
    // const isH5 = __TARO_ENV === 'h5';
    const {slideImages, goodsVideo, bigImageShow, onChangeBigImageShow} = this.props;
    const {num, playVideo, isShowPage, idx} = this.state;
    return (
      <View className="imgSlides">
        {slideImages && slideImages.length > 0 ? (
          <Swiper
            className="swiper-box"
            // indicatorColor="#999"
            // indicatorActiveColor="#333"
            circular
            current={num - 1}
            indicatorDots={false} //是否显示面板指示点
            autoplay={false} //是否自动播放
            onChange={(e) => this._changePicture(e)}
            onClick={() => this.findBigImg(slideImages[num - 1] ? slideImages[num - 1] : notImg, num - 1)}
          >
            {slideImages.map((item, index) => {
              return (
                <SwiperItem id={index} key={index}>
                  {/* 满足条件将第一张轮播图替换成视频 */}
                  {index == 0 && goodsVideo && playVideo ? (
                    <View className="video-box">
                      <Image
                        src={close}
                        className="close"
                        onClick={() => this.setState({playVideo: false, isShowPage: true})}
                      />
                      {__TARO_ENV === 'h5' ? (
                        // eslint-disable-next-line react/forbid-elements
                        <video
                          autoplay={playVideo} //是否自动播放
                          controls
                          src={goodsVideo}
                          className="video-img"
                        />
                      ) : (
                        <Video
                          autoplay={playVideo} //是否自动播放
                          controls
                          src={goodsVideo}
                          className="img"
                        />
                      )}
                    </View>
                  ) : (
                    <Image className="img" src={item ? item : notImg} />
                  )}
                </SwiperItem>
              );
            })}
          </Swiper>
        ) : (
          <View className="no-img">
            <Image className="img" src={notImg} onClick={() => this.findBigImg(notImg)} />
          </View>
        )}
        {isShowPage && (
          <View className="bottom-page">
            {goodsVideo && !playVideo && (
              <View
                className="play-btn"
                onClick={() => {
                  this.openVideo();
                }}
              >
                <Image className="play" src={playIcon} />
                {/* <Text className="time">00:58</Text> */}
              </View>
            )}
            <View className="video-size">
              <Text className="text">
                {this.state.num}
                <Text className="num">/{slideImages.length ? slideImages.length : 1}</Text>
              </Text>
            </View>
          </View>
        )}

        {/* 查看大图 */}
        {bigImageShow && slideImages.length > 0 && (
          <ImagesViewer
            images={slideImages}
            current={idx}
            onCancel={() => {
              typeof onChangeBigImageShow === 'function' && onChangeBigImageShow(false);
            }}
          />
        )}
      </View>
    );
  }
  //查看大图
  findBigImg = (item, index = 0) => {
    //无图片的时候 不允许点开大图
    // if (item == '') {
    //   return;
    // }
    // eslint-disable-next-line react/no-unused-state
    this.setState({bigImage: item});
    this.setState({idx: index});
    typeof this.props.onChangeBigImageShow === 'function' && this.props.onChangeBigImageShow(true);
  };

  //打开视频
  openVideo = () => {
    this.setState({
      playVideo: true,
      num: 1,
      isShowPage: false,
    });
  };

  //切换轮播图
  _changePicture = (e) => {
    const {playVideo} = this.state;
    this.setState({
      num: e.detail.current + 1,
    });
    //如果视频存在
    if (e.detail.current > 0 && playVideo) {
      this.setState({
        playVideo: false,
        isShowPage: true,
      });
    }
  };
}
