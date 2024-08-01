import {View, Button, Text, Image, Textarea} from '@tarojs/components';
import {StarRate} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import { _, getPrivacySetting, msg } from 'wmkit';
import * as T from '../types';
import './anonymous-eval.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Star from '@/pages/common/goods/star';
import WMCheckbox from '@/pages/common/input-checkbox';
import plus from '@/assets/image/order/plus.png';
import WMButton from '@/pages/common/button';

import defaultImg from '@/assets/image/common/default-img.png';
import close from '@/assets/image/common/black-close.png';
import checkImg from '@/assets/image/shop-cart/check.png';
import uncheckImg from '@/assets/image/shop-cart/uncheck.png';

type IAnonymousEvalProps = T.IProps & T.IAnonymousEvalProps;

@connect<Partial<IAnonymousEvalProps>, T.IAnonymousEvalState>(store2Props, actions)
export default class AnonymousEval extends Component<Partial<IAnonymousEvalProps>, T.IAnonymousEvalState> {
  constructor(props: IAnonymousEvalProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    //普通商品详情
    // let url = main?.orderBaseInfo ? `/pages/package-B/goods/goods-details/index?skuId=${main.orderBaseInfo.skuId}` : '';
    // console.log('url', url);
    const evaluateContent = main?.orderEvaluate.evaluateContent;
    let isH5 = __TARO_ENV === 'h5';
    return (
      main && (
        <View className="evaluate-drying">
          {main.evaluateType == 0 && (
            <View>
              <View className="header">
                <View>
                  <Image src={main.orderBaseInfo.pic ? main.orderBaseInfo.pic : defaultImg} className="imgHead" />
                </View>
                <View className="rightPingHead">
                  <View>
                    <Text className="text">{main.orderBaseInfo.skuName}</Text>
                    <Text className="fs20 c999">
                      {main.orderBaseInfo.specDetails ? main.orderBaseInfo.specDetails : ''}
                    </Text>
                  </View>
                  <Text className="fs20 c999">{main.createTime && `购买时间: ${_.formatDay(main.createTime)}`}</Text>
                </View>
              </View>
              <View className="score">
                <View className="bar">
                  <Text className="fs28 c333 title">商品评分</Text>
                  <StarRate
                    size={'small'}
                    rating={main.orderEvaluate.evaluateScore}
                    onNumChange={(value) => {
                      action.commonChange('main.orderEvaluate.evaluateScore', value);
                    }}
                  />
                </View>
                <View className="textarea-wrap">
                  {isH5 ? (
                    <Textarea
                      className="textarea iconfont"
                      value={evaluateContent}
                      maxlength={500}
                      placeholderClass="placeholderCSS"
                      placeholder="&#xe617; 分享心得体验，给大家多点参考吧"
                      onInput={(e) => {
                        action.commonChange('main.orderEvaluate.evaluateContent', e.target.value);
                      }}
                    />
                  ) : (
                    <Textarea
                      className="textarea iconfont"
                      value={evaluateContent}
                      maxlength={500}
                      placeholder="分享心得体验，给大家多点参考吧"
                      onInput={(e) => {
                        action.commonChange('main.orderEvaluate.evaluateContent', e.target.value);
                      }}
                    />
                  )}
                </View>
                <Text className="input-num">{`${evaluateContent ? evaluateContent.length : 0}/500`}</Text>
              </View>
              <View className="upload">
                <Text className="upload-title">晒单</Text>
                <View className="enclosures">
                  {main.enclosures.map((item, index) => (
                    <View className="enclosure" key={index}>
                      {/* <Image src={item} className="plus" onClick={() => {}} mode="widthFix" /> */}
                      {/**小程序不支持mode属性 */}
                      <View
                        className="plus"
                        style={{
                          background: 'url(' + item + ')',
                          backgroundSize: 'cover',
                          backgroundPosition: '50% 50%',
                        }}
                      />
                      <Image
                        src={close}
                        className="close-pic"
                        onClick={() => {
                          action._deleteImage(index);
                        }}
                      />
                    </View>
                  ))}
                  {main.enclosures.length < 9 && (
                    <View className="enclosure">
                      <Image
                        src={plus}
                        className="plus"
                        onClick={() => {
                          getPrivacySetting().then((res) => {
                            if ((res as any).needAuthorization) {
                              msg.emit('privacyModalVisible', {
                                visible: true,
                                privacyContractName: (res as any).privacyContractName,
                                callback: () => {
                                  action._chooseImage();
                                },
                              });
                            } else {
                              action._chooseImage();
                            }
                          });
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          <View className="padding-bottom-container">
            {main.isShow == 0 && (
              <View>
                <View className="store">
                  <Text className="title">商城服务评价</Text>
                  {/*<View className="block1">*/}
                  {/*  <Image*/}
                  {/*    src={main.storeInfo.storeLogo ? main.storeInfo.storeLogo : storeDefaultImg}*/}
                  {/*    className="logo"*/}
                  {/*  />*/}
                  {/*  <Text className="fs32 c333">{main.storeInfo.storeName}</Text>*/}
                  {/*</View>*/}
                  <View className="line">
                    <Text className="fs28 c333">商品质量</Text>
                    <StarRate
                      rating={main.storeEvaluate.goodsScore}
                      onNumChange={(value) => {
                        action.commonChange('main.storeEvaluate.goodsScore', value);
                      }}
                    />
                  </View>
                  <View className="line">
                    <Text className="fs28 c333">服务态度</Text>
                    <StarRate
                      rating={main.storeEvaluate.serverScore}
                      onNumChange={(value) => {
                        action.commonChange('main.storeEvaluate.serverScore', value);
                      }}
                    />
                  </View>
                  <View className="line">
                    <Text className="fs28 c333">发货速度</Text>
                    <StarRate
                      rating={main.storeEvaluate.logisticsScore}
                      onNumChange={(value) => {
                        action.commonChange('main.storeEvaluate.logisticsScore', value);
                      }}
                    />
                  </View>
                </View>
                {main.evaluateType == 0 && (
                  <View className="noname">
                    <View
                      className="check"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (main.orderEvaluate.isAnonymous) {
                          action.commonChange('main.orderEvaluate.isAnonymous', 0);
                        } else {
                          action.commonChange('main.orderEvaluate.isAnonymous', 1);
                        }
                      }}
                      style={{display: 'flex', visibility: 'visible'}}
                    >
                      <Image className="check-img" src={main.orderEvaluate.isAnonymous == 1 ? checkImg : uncheckImg} />
                      {<Text className="check-label">匿名评价</Text>}
                    </View>
                    {/*<WMCheckbox*/}
                    {/*  checked={main.orderEvaluate.isAnonymous == 1 ? true : false}*/}
                    {/*  label="匿名评价"*/}
                    {/*  style={{display: 'flex', visibility: 'visible'}}*/}
                    {/*  onClick={() => {*/}
                    {/*    if (main.orderEvaluate.isAnonymous) {*/}
                    {/*      action.commonChange('main.orderEvaluate.isAnonymous', 0);*/}
                    {/*    } else {*/}
                    {/*      action.commonChange('main.orderEvaluate.isAnonymous', 1);*/}
                    {/*    }*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </View>
                )}
              </View>
            )}
          </View>
          <View
            className="bottom"
            onClick={() => {
              action.save();
            }}
          >
            <WMButton size="large" theme="primary">
              提交
            </WMButton>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
