import {View, Button, Text, Image, ScrollView, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {AtModal} from 'taro-ui';

import * as T from '../types';
import './less/presale-status.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
moment.extend(isSameOrAfter);
import {_} from 'wmkit';
import classNames from 'classnames';

type IPresaleStatusProps = T.IProps & T.IPresaleStatusProps;

@connect<Partial<IPresaleStatusProps>, T.IPresaleStatusState>(store2Props, actions)
export default class PresaleStatus extends Component<Partial<IPresaleStatusProps>, T.IPresaleStatusState> {
  constructor(props: IPresaleStatusProps) {
    super(props);
  }

  /**
    预售规则
*/
  render() {
    const {
      presaleInfo,
      actions: {
        publicAction: {commonChange},
      },
      main,
      main: {isShowRule},
    } = this.props;

    const ruleInfo = main.ruleContent[1] ? main.ruleContent[1].content : '';
    let bookingSaleVO = main.bookingSaleVO;
    return (
      bookingSaleVO &&
      bookingSaleVO.id && (
        <View>
          {presaleInfo.bookingType == 0 ? this.renderRule() : this.renderPresale()}
          <View className="presaleModal">
            <View
              className={classNames('address-picker-container', {'show-picker': main.isShowRule})}
              onClick={(e) => {
                e.stopPropagation();
                commonChange('main.isShowRule', false);
              }}
            >
              <View
                className="picker-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <View className="picker-view-wrap">
                  <ScrollView scrollY style={{height: '810rpx'}}>
                    <RichText className="text" nodes={_.formatRichText(ruleInfo) || '暂无预售规则'} />
                  </ScrollView>
                </View>
                <View className="cancel" onClick={() => commonChange('main.isShowRule', !isShowRule)}>
                  <Image className="close" src={require('../img/close.png')} />
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    );
  }

  //定金
  renderPresale() {
    const {
      presaleInfo,
      actions: {publicAction},
    } = this.props;
    return (
      this.isBuyStatus(presaleInfo, 3) && (
        <View className="presaleStatus">
          <View
            className="buy-info-rule"
            onClick={() => {
              publicAction.commonChange('main.isShowRule', true);
            }}
          >
            <Text>开售后凭资格预约购买</Text>
            <Image src={require('../img/tag.png')} className="tag__image" />
          </View>
          <View className={`buy-step ${this.isBuyStatus(presaleInfo, 1) ? 'buy-step-check' : ''}`}>
            <View className="buy-step-type">支付定金</View>
            <View className="buy-step-date">
              {moment(presaleInfo.handSelStartTime).format('M月DD日 HH:mm')}~
              {moment(presaleInfo.handSelEndTime).format('M月DD日 HH:mm')}
            </View>
          </View>
          <View className="line-state">
            <View className="step-line"></View>
          </View>
          <View className={`buy-step ${this.isBuyStatus(presaleInfo, 2) ? 'buy-step-check' : ''}`}>
            <View className="buy-step-type">支付尾款</View>
            <View className="buy-step-date">
              {moment(presaleInfo.tailStartTime).format('M月DD日 HH:mm')}~
              {moment(presaleInfo.tailEndTime).format('M月DD日 HH:mm')}
            </View>
          </View>
          <View className="line-state">
            <View className="step-line"></View>
          </View>
          <View className={`buy-step ${this.isDeliverStatus(presaleInfo) ? 'buy-step-check' : ''}`}>
            <View className="buy-step-type">开始发货</View>
            <View className="buy-step-date">{moment(presaleInfo.deliverTime).format('M月DD日')}</View>
          </View>
        </View>
      )
    );
  }

  //全款
  renderRule() {
    const {
      presaleInfo,
      actions: {publicAction},
    } = this.props;
    return (
      this.isBuyStatus(presaleInfo, 1) && (
        <View className="presaleStatus">
          <View
            className="buy-info-rule"
            onClick={() => {
              publicAction.commonChange('main.isShowRule', true);
            }}
          >
            <Text className="rule-text">预售规则</Text>
            <Image className="rule-image" src={require('../img/tag.png')} style={{width: 16, height: 16}} />
          </View>
          <View className={`buy-step ${this.isBuyStatus(presaleInfo, 0) ? 'buy-step-check' : ''}`}>
            <View className="buy-step-type">支付全款</View>
            <View className="buy-step-date">
              {moment(presaleInfo.bookingStartTime).format('M月DD日 HH:mm')} ~{' '}
              {moment(presaleInfo.bookingEndTime).format('M月DD日 HH:mm')}
            </View>
          </View>

          <View className="line-state">
            <View className="step-line"></View>
          </View>
          <View className={`buy-step ${this.isDeliverStatus(presaleInfo) ? 'buy-step-check' : ''}`}>
            <View className="buy-step-type">开始发货</View>
            <View className="buy-step-date">{moment(presaleInfo.deliverTime).format('M月DD日')}</View>
          </View>
        </View>
      )
    );
  }
  //判断当前的预售状态
  isBuyStatus = (item, type) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime,
      tailStartTime,
      tailEndTime,
    } = item;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      return moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金
    if (bookingType == 1) {
      //定金支付起止时间内
      if (type == 1) {
        return (
          moment(new Date()).isBetween(handSelStartTime, handSelEndTime) ||
          moment(new Date()).isBetween(tailStartTime, tailEndTime)
        );
      } else if (type == 2) {
        //尾款支付起止时间内
        return moment(new Date()).isBetween(tailStartTime, tailEndTime);
      } else if (type == 3) {
        //判断是否正在进行中
        return moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
      }
    }
  };

  /**
   * 判断预售是否发货状态
   */
  isDeliverStatus = (item) => {
    const {deliverTime} = item;
    return moment(new Date()).isSameOrAfter(deliverTime);
  };
}

//create by moon https://github.com/creasy2010/moon
