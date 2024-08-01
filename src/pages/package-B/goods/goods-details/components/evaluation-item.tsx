import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import {StarRate} from '@wanmi/ui-taro';
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
      main,
    } = this.props;
    const evaluateResp =
      main && main.top3Evaluate && main.top3Evaluate.listResponse && main.top3Evaluate.listResponse.goodsEvaluateVOList;

    //企业购的判断
    // @ts-ignore
    const {isIepAuth: iepSwitch, iepInfo: info = {}} = main.iepInfo;
    //企业名称
    const {enterpriseCustomerName, enterpriseCustomerLogo} = info || {};
    const iepLogo = enterpriseCustomerLogo ? JSON.parse(enterpriseCustomerLogo) : [];

    return (
      <View className="eval-box">
        {evaluateResp &&
          evaluateResp.map((v, k) => {
            const isEnterpriseCustomer = this._iepHandle(v);
            return (
              <View className="eval-item" id={k} key={k}>
                {/* 评价用户信息 */}
                <View className="eval-user-info" onClick={this.goToUrl}>
                  <Image src={v.isAnonymous == 0 ? v.headimgurl || headIcon : headIcon} className="head" />
                  <View className="infoEvaluation">
                    <View className="iepBox">
                      <Text className="name">{v.isAnonymous == 0 ? v.customerName : '匿名'}</Text>
                      {/* {isEnterpriseCustomer && (
                        <View className="iepCustomerName">
                          {iepLogo && (
                            <Image src={iepLogo && iepLogo.length > 0 ? iepLogo[0].url : ''} className="picture" />
                          )}
                          {enterpriseCustomerName}
                        </View>
                      )} */}
                    </View>

                    {/* 星级评价 */}
                    <StarRate size="small" rating={v.evaluateScore} />
                  </View>
                </View>
                {/* 标题 */}
                <View className="eval-title" onClick={this.goToUrl}>
                  {v.evaluateContent}
                </View>
                {/* 评价图片 */}
                {v.evaluateImageList && (
                  <ScrollView scrollX className="scroll-view1">
                    <View className="eval-pictures">
                      {v.evaluateImageList &&
                        v.evaluateImageList.map((item, index) => {
                          return (
                            // <Image
                            //   src={item.artworkUrl}
                            //   className="picture"
                            //   onClick={() => otherAction.findBigImg(v, index)}
                            // />
                            <View
                              key={index}
                              className="picture"
                              style={{
                                background: 'url(' + item.artworkUrl + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                              }}
                              onClick={() => otherAction.findBigImg(v, index)}
                            />
                          );
                        })}
                      <View className="picture-last">
                        <Text>&nbsp; </Text>
                      </View>
                    </View>
                  </ScrollView>
                )}
              </View>
            );
          })}
      </View>
    );
  }

  /**
   *
   * 跳转评价详情页
   */
  goToUrl = () => {
    let {main} = this.props;
    Taro.navigateTo({
      url: `/pages/package-B/goods/goods-evaluation-list/index?goodsId=${main.goodsDetail.goods.goodsId}`,
    });
  };

  /**
   * 判断是否是企业会员
   * @param value
   * @private
   */
  _iepHandle = (value) => {
    // let checkEnterpriseEnable = true;
    // if (checkEnterpriseEnable) {
    const customerLabelList = value.customerLabelList;
    return customerLabelList && customerLabelList.indexOf('enterprise-customer') > -1;
    // } else {
    //   return false;
    // }
  };
}

//create by moon https://github.com/creasy2010/moon
