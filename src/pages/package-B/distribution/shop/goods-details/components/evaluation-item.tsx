import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/evaluation-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import rArrowIcon from '@/assets/image/goods/goods-detail/r-arrow.png';
import headIcon from '@/assets/image/goods/goods-detail/head.png';
import Star from '@/pages/common/goods/star';
import {toFixed2, div} from '@/utils/priceFormat';
type IGoodsEvaluationProps = T.IProps & T.IGoodsEvaluationProps;

@connect<Partial<IGoodsEvaluationProps>, T.IGoodsEvaluationState>(store2Props, actions)
export default class EvaluationItem extends Component<Partial<IGoodsEvaluationProps>, T.IGoodsEvaluationState> {
  constructor(props: IGoodsEvaluationProps) {
    super(props);
  }

  /**
    评价
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {top3Evaluate},
    } = this.props;
    const evaluateResp = top3Evaluate.listResponse.goodsEvaluateVOList;
    return (
      <View className="eval-box">
        {evaluateResp.map((v, k) => {
          return (
            <View className="eval-item" id={k}>
              {/* 评价用户信息 */}
              <View className="eval-user-info">
                <Image src={v.isAnonymous == 0 ? v.headimgurl || headIcon : headIcon} className="head" />
                <View className="info">
                  <Text className="name">{v.isAnonymous == 0 ? v.customerName : '匿名'}</Text>
                  {/* 星级评价 */}
                  <Star num={v.evaluateScore} />
                </View>
              </View>
              {/* 标题 */}
              <View className="eval-title">{v.evaluateContent}</View>
              {/* 评价图片 */}
              {v.evaluateImageList && (
                <ScrollView scrollX className="scroll-view">
                  <View className="eval-pictures">
                    {v.evaluateImageList &&
                      v.evaluateImageList.map((item, index) => {
                        return (
                          <Image
                            key={index}
                            src={item.artworkUrl}
                            className="picture"
                            onClick={() => otherAction.findBigImg(v, index)}
                          />
                        );
                      })}
                  </View>
                </ScrollView>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
