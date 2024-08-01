import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { store2Props } from '../selectors';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';

import grayArrowIcon from '@/assets/image/goods/goods-list/gray-arrow.png';
import './screen-modal.less';
import { WMkit } from 'wmkit';
let closeTimer = null;
type IScreenModalProps = T.IProps & T.IScreenModalProps;
const skuSizes = [
  {
    label: '6寸',
    value: '6寸',
  },
  {
    label: '8寸',
    value: '8寸',
  },
  {
    label: '10寸',
    value: '10寸',
  },
  {
    label: '12寸',
    value: '12寸',
  },
]
@connect<Partial<IScreenModalProps>, T.IScreenModalState>(store2Props, actions)
export default class ScreenModal extends Component<Partial<IScreenModalProps>, T.IScreenModalState> {
  constructor(props: IScreenModalProps) {
    super(props);
    let {
      main,
    } = this.props;
    const { goodsLabels, goodsBrands } = main
    this.state = {
      findAllSizes: false, //是否查看全部尺寸
      findAllLabels: false, //是否查看全部标签
      findAllBrands: false, //是否查看全部品牌
      fadeState: true,
      chooseLabels:
        goodsLabels.filter((item) => {
          if (main.request.labelIds.includes(item.goodsLabelId)) {
            return { goodsLabelId: item.goodsLabelId, labelName: item.labelName };
          }
        }),
      chooseBrands:
        goodsBrands.filter((item) => {
          if (main.request.brandIds.includes(item.brandId)) {
            return { brandId: item.brandId, brandName: item.brandName };
          }
        }),
      chooseSizes: skuSizes.filter((item) => {
        if (main.request.specNameList.includes(item.value)) {
          return { label: item.label, value: item.value };
        }
      }),
    };
  }
  componentWillReceiveProps(nextProps: IScreenModalProps) {
    //chooseLabels chooseSizes
    let {
      main,
    } = nextProps;
    this.setState({
      chooseLabels:
        main.goodsLabels.filter((item) => {
          if (main.request.labelIds.includes(item.goodsLabelId)) {
            return { goodsLabelId: item.goodsLabelId, labelName: item.labelName };
          }
        }),
      chooseBrands: main.goodsBrands.filter((item) => {
        if (main.request.brandIds.includes(item.brandId)) {
          return { brandId: item.brandId, brandName: item.brandName };
        }
      }),
      chooseSizes: skuSizes.filter((item) => {
        if (main.request.specNameList.includes(item.value)) {
          return { label: item.label, value: item.value };
        }
      }),
    });
  }
  componentWillUnmount(): void {
    clearTimeout(closeTimer);
  }

  //展示动画效果
  showAnimate = () => {
    this.setState({
      fadeState: false,
    });
    Taro.showTabBar()
  };

  /**
   筛选弹框
   */
  render() {
    let {
      actions: { goodsAction },
      main,
      main: { spreadFlag, goodsLabels },
      hasNoCateFilter,
    } = this.props;
    const { findAllLabels, findAllSizes, findAllBrands } = this.state;

    if (!main) return <View />;
    const goodsBrands = main.goodsBrands;
    const labels = goodsLabels.filter((v: any) => v.labelVisible);
    const labelsCount = 9
    return (
      <View
        className={this.state.fadeState ? 'screenModal fade-in' : 'screenModal fade-out'}
        onClick={() => {
          this.showAnimate();
          closeTimer = setTimeout(() => {
            //筛选框关闭
            goodsAction.commonChange('main.navToolsObj.screenIsShow', false);
            goodsAction.commonChange('main.loadStatus', 'loaded');
          }, 300);
        }}
      >
        <View
          className={this.state.fadeState ? 'screen-content fade-in-right' : 'screen-content fade-out-right'}
          onClick={(e) => {
            e.stopPropagation();
          }}
          catchMove
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          {/* 分类 */}
          <View className="up-content">
            <ScrollView scrollY style={{ height: '100%' }}>
              {/* 商城服务 */}
              {
                main.goodsLabels?.length > 0 && (
                  <View className="screen-box">
                    <View className="screen-titleBox">
                      <View className="screeen-title-container">
                        <Text className="screen-title">商品标签</Text>
                        <View className="screen-choose">
                          <Text className="text">
                            {this.state.chooseLabels.length > 0 &&
                              this.state.chooseLabels.map((v) => v.labelName).join(',')}
                          </Text>
                        </View>
                      </View>
                      {/* 品牌数量大于9个展示 */}
                      {main.goodsLabels && main.goodsLabels.length > labelsCount && (
                        <View
                          className="screen-unfold"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.setState({ findAllLabels: !findAllLabels });
                          }}
                        >
                          <Text className="unfold-text">{findAllLabels ? '收起' : '展开'}</Text>
                          <Image src={grayArrowIcon} className={findAllLabels ? 'arrow rote-out' : 'arrow rote-in'} />
                        </View>
                      )}
                    </View>
                    <View className="screen-list">
                      {labels &&
                        labels.length > 0 &&
                        labels.map((item: any, index) => {
                          if (!findAllLabels && index >= labelsCount) {
                            return false;
                          }
                          return (
                            <View
                              className={
                                main.request.labelIds.includes(item.goodsLabelId)
                                  ? 'screen-item active-item'
                                  : 'screen-item'
                              }
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                goodsAction.chooseLabels(item.goodsLabelId);
                              }}
                            >
                              <Text className="screen-text">{item.labelName}</Text>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                )
              }
              {/* 品牌 */}
              {goodsBrands && goodsBrands.length > 0 && (
                <View className="screen-box">
                  <View className="screen-titleBox">
                    <View className="screeen-title-container">
                      <Text className="screen-title">品牌</Text>
                      <View className="screen-choose">
                        <Text className="text">
                          {this.state.chooseBrands.length > 0 &&
                            this.state.chooseBrands.map((v) => v.brandName).join(',')}
                        </Text>
                      </View>
                    </View>
                    {/* 品牌数量大于9个展示 */}
                    {main.goodsBrands && main.goodsBrands.length > 9 && (
                      <View
                        className="screen-unfold"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.setState({ findAllBrands: !findAllBrands });
                        }}
                      >
                        <Text className="unfold-text">{findAllBrands ? '收起' : '展开'}</Text>
                        <Image src={grayArrowIcon} className={findAllBrands ? 'arrow rote-out' : 'arrow rote-in'} />
                      </View>
                    )}
                  </View>
                  <View className="screen-list">
                    {goodsBrands.map((item, index) => {
                        if (!findAllBrands && index >= 9) {
                          return null;
                        }
                        
                        return (
                          <View
                            className={
                              main.request.brandIds.includes(item.brandId) ? 'screen-item active-item' : 'screen-item'
                            }
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              goodsAction.chooseBrands(item.brandId);
                              // 如果品牌集合里面已存在，则做删除
                              if (this.state.chooseBrands.findIndex((v) => v.brandId == item.brandId) > -1) {
                                this.setState({
                                  chooseBrands: this.state.chooseBrands.filter((v) => v.brandId != item.brandId),
                                });
                              } else {
                                // 做添加
                                this.setState({
                                  chooseBrands: this.state.chooseBrands.concat([
                                    { brandId: item.brandId, brandName: item.brandName, nickName: item.nickName },
                                  ]),
                                });
                              }
                            }}
                          >
                            <Text className="screen-text">{item.brandName}</Text>
                          </View>
                        );
                      })}
                  </View>
                </View>
              )}


              <View className="screen-box">
                <View className="screen-titleBox">
                  <View className="screeen-title-container">
                    <Text className="screen-title">规格名称</Text>
                    <View className="screen-choose">
                      <Text className="text">
                        {this.state.chooseSizes.length > 0 &&
                          this.state.chooseSizes.map((v) => v.label).join(',')}
                      </Text>
                    </View>
                  </View>
                  {/* 品牌数量大于9个展示 */}
                  {
                    skuSizes.length > labelsCount && (
                      <View
                        className="screen-unfold"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.setState({ findAllSizes: !findAllSizes });
                        }}
                      >
                        <Text className="unfold-text">{findAllSizes ? '收起' : '展开'}</Text>
                        <Image src={grayArrowIcon} className={findAllSizes ? 'arrow rote-out' : 'arrow rote-in'} />
                      </View>
                    )
                  }

                </View>
                <View className="screen-list">
                  {
                    skuSizes.map((item: any, index) => {
                      return (
                        <View
                          className={
                            main.request.specNameList.includes(item.value)
                              ? 'screen-item active-item'
                              : 'screen-item'
                          }
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goodsAction.chooseSizes(item.value);
                          }}
                        >
                          <Text className="screen-text">{item.label}</Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            </ScrollView>
          </View>

          {/* 按钮 */}
          <View className="screen-two-btn">
            <View
              className="reset-btn"
              onClick={(e) => {
                e.stopPropagation();
                // 重置，state置空
                this.setState({
                  chooseLabels: [],
                  chooseSizes: [],
                });
                goodsAction.resetCates();
              }}
            >
              重置
            </View>
            <View
              className="confire-btn"
              onClick={(e) => {
                e.stopPropagation();
                this.showAnimate();
                goodsAction.submitChooseCate();
              }}
            >
              确定
            </View>
          </View>
        </View>
      </View>
    );
  }

  //是否选择商城服务
  isChooseCompany = () => {
    let {
      actions: { goodsAction },
      main,
    } = this.props;
    let num = '';
    if (main.request.companyType == '') {
      num = '0';
    }
    goodsAction.commonChange('main.request.companyType', num);
  };

  //是否选择仅看有货
  isChooseStock = () => {
    let {
      actions: { goodsAction },
      main,
    } = this.props;
    let stockShow = null;
    if (main.request.isOutOfStockShow == null) {
      stockShow = 1;
    }
    goodsAction.chooseOutOfStock(stockShow);
  };
  //是否选择积分抵扣
  isChoosePoint = () => {
    let {
      actions: { goodsAction },
      main,
    } = this.props;
    let num = '';
    if (main.request.pointType == '') {
      num = '0';
    }
    goodsAction.commonChange('main.request.pointType', num);
  };

  /**
   * 处理分享赚
   * @private
   */
  _handleClickShareProfits = () => {
    let {
      actions: { goodsAction },
      main,
    } = this.props;
    goodsAction.commonChange(
      'main.request.distributionGoodsAudit',
      main.request.distributionGoodsAudit === '' ? '2' : '',
    );
  };

  /**
   * 处理点击企业购
   * @private
   */
  _handleClickIepSwitch = () => {
    let {
      actions: { goodsAction },
      main,
    } = this.props;
    goodsAction.commonChange(
      'main.request.enterPriseGoodsStatus',
      main.request.enterPriseGoodsStatus === '' ? '2' : '',
    );
  };
}

//create by moon https://github.com/creasy2010/moon
