import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-evaluation.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import rArrowIcon from '@/assets/image/goods/goods-detail/r-arrow.png';
import notEval from '@/assets/image/goods/goods-detail/not-eval.png';
//评价列表
import EvaluationItem from '../components/evaluation-item';
import {toFixed2, div} from '@/utils/priceFormat';
type IGoodsEvaluationProps = T.IProps & T.IGoodsEvaluationProps;

@connect<Partial<IGoodsEvaluationProps>, T.IGoodsEvaluationState>(store2Props, actions)
export default class GoodsEvaluation extends Component<Partial<IGoodsEvaluationProps>, T.IGoodsEvaluationState> {
  constructor(props: IGoodsEvaluationProps) {
    super(props);
  }

  componentWillMount() {
    if (!getCurrentInstance().router.params) return;

    if (__TARO_ENV != 'h5') {
      let {main} = this.props;
      let {skuId} = getCurrentInstance().router.params;
      let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      if (SkuId == undefined) {
        SkuId = '';
      }
      this.props.actions.publicAction.isGoodsEvaluate().then((re) => {
        if (re) {
          this.props.actions.publicAction.initEvaluate(SkuId);
        }
      });
    } else {
      let {skuId} = getCurrentInstance().router.params;
      this.props.actions.publicAction.isGoodsEvaluate().then((re) => {
        if (re) {
          this.props.actions.publicAction.initEvaluate(skuId);
        }
      });
    }
  }

  /**
    评价
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {top3Evaluate, goodsDetail, isBigImgShow, isShow},
    } = this.props;

    if (JSON.stringify(top3Evaluate) == '{}') {
      return false;
    }

    //评价总数
    const evaluateConut = top3Evaluate.goodsEvaluateCountResponse.evaluateConut;
    let count;
    if (evaluateConut > 10000) {
      count = div(evaluateConut, 10000).toFixed(1) + '万+';
    } else {
      count = evaluateConut;
    }

    const evaluateResp = top3Evaluate.listResponse && top3Evaluate.listResponse.goodsEvaluateVOList;
    const praise =
      top3Evaluate && top3Evaluate.goodsEvaluateCountResponse.praise
        ? top3Evaluate.goodsEvaluateCountResponse.praise
        : 100;

    return (
      <View className="goodsEvaluation">
        {/* 评价数量 好评率 */}
        <View
          className="eval-info"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/package-B/goods/goods-evaluation-list/index?goodsId=${goodsDetail.goods.goodsId}`,
            });
          }}
        >
          <View className="l-content">
            <Text className="title">评价</Text>
            <Text className="num">{count ? count : ''}</Text>
          </View>
          {count > 0 && evaluateResp.length > 0 ? (
            <View className="r-content">
              <Text className="text">好评率 {praise}%</Text>
              <Image src={rArrowIcon} className="arrow" />
            </View>
          ) : (
            <View className="r-content">
              <Image src={rArrowIcon} className="arrow" />
            </View>
          )}
        </View>
        {/* 评价列表 */}
        <EvaluationItem />
        {/* 查看评价 */}
        {evaluateResp.length > 0 ? (
          <View
            className="find-evals"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-evaluation-list/index?goodsId=${goodsDetail.goods.goodsId}`,
              });
            }}
          >
            查看全部评价
          </View>
        ) : (
          <View className="not-eval">
            <Image src={notEval} className="eval-Img" />
            <Text className="eval-text">暂无评论</Text>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
