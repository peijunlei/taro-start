import {View, Button, Text, Image, ScrollView, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './screen-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import grayArrowIcon from '@/assets/image/goods/goods-list/gray-arrow.png';
import {WMkit} from 'wmkit';
import goodsAction from '../actions/goodsAction';

import {Dispatch} from 'typings';

type IScreenModalProps = T.IProps & T.IScreenModalProps;
let closeTimer = null;

@connect<Partial<IScreenModalProps>, T.IScreenModalState>(store2Props, actions)
export default class ScreenModal extends Component<Partial<IScreenModalProps>, T.IScreenModalState> {
  constructor(props: IScreenModalProps) {
    super(props);
    let {main} = this.props;
    this.state = {
      findAllBrands: false,
      //是否查看全部分类
      findAllCates: false,
      //是否查看全部标签
      findAllLabels: false,
      // 是否查看全部属性,为对象，key:propId,value:false
      findAllProps:
        main.goodsPropertyVOS?.length > 0 &&
        main.goodsPropertyVOS.reduce((pre, cur) => {
          if (!pre[cur.propId]) {
            pre[cur.propId] = false;
            return pre;
          }
          return pre;
        }, {}),
      fadeState: true,
      chooseBrands:
        main.goodsBrands?.length > 0
          ? main.goodsBrands.filter((item) => {
              if (main.request.brandIds.includes(item.brandId)) {
                return {brandId: item.brandId, brandName: item.brandName};
              }
            })
          : [],
      chooseCates:
        main.goodsCates?.length > 0
          ? main.goodsCates.filter((item) => {
              if (WMkit.isMall()) {
                if (main.request.storeCateIds.includes(item.cateId)) {
                  return {cateId: item.cateId, cateName: item.cateName};
                }
              } else {
                if (main.request.cateIds.includes(item.cateId)) {
                  return {cateId: item.cateId, cateName: item.cateName};
                }
              }
            })
          : [],
      chooseProperty:
        main.goodsPropertyVOS?.length > 0
          ? main.goodsPropertyVOS.map((item) => {
              const index = main.request.propDetails.findIndex((v) => v.propId == item.propId);
              if (index > -1) {
                return {propId: item.propId, detailIds: main.request.propDetails[index]?.detailIds};
              } else {
                return {propId: item.propId, detailIds: []};
              }
            })
          : [],
    };
  }

  componentWillUnmount(): void {
    clearTimeout(closeTimer);
  }

  //展示动画效果
  showAnimate = () => {
    this.setState({
      fadeState: false,
    });
  };

  /**
    筛选弹框
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main: {goodsLabels},
      main,
    } = this.props;
    let {findAllBrands, findAllLabels, findAllCates, findAllProps} = this.state;
    let {goodsBrands, request = {}, goodsCates = []} = main || {};
    if (!main) return <View />;
    if (!findAllBrands) {
      goodsBrands = goodsBrands.slice(0, 6);
    }

    const labels = goodsLabels.filter((v: any) => v.labelVisible);
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
            <ScrollView scrollY style={{height: '100%'}}>
              {/* 商城服务 */}
              <View className="screen-box">
                <View className="screen-titleBox">
                  <View className="screeen-title-container">
                    <Text className="screen-title">商城服务</Text>
                  </View>
                  {labels.length > 7 && (
                    <View
                      className="screen-unfold"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({findAllLabels: !findAllLabels});
                      }}
                    >
                      <Text className="cate-text">展开</Text>
                      <Image
                        src={grayArrowIcon}
                        className="arrow"
                        style={findAllLabels ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}
                      />
                    </View>
                  )}
                </View>
                <View className="screen-list">
                  <View
                    className={request.companyType == '0' ? 'screen-item active-item' : 'screen-item'}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.isChooseCompany();
                    }}
                  >
                    <Text className="screen-text">自营商品</Text>
                  </View>
                  <View
                    className={request.hideSelectedDistributionGoods ? 'screen-item active-item' : 'screen-item'}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await goodsAction.commonChange(
                        'main.request.hideSelectedDistributionGoods',
                        !request.hideSelectedDistributionGoods,
                      );
                    }}
                  >
                    <Text className="screen-text">隐藏已选商品</Text>
                  </View>
                  {labels &&
                    labels.length > 0 &&
                    labels.map((item: any, index) => {
                      if (!findAllLabels && index >= 7) {
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

              {/*分割线*/}
              {((main.goodsBrands && main.goodsBrands.length > 0) ||
                (main.goodsCates && main.goodsCates.length > 0)) && <View className="split-line" />}

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
                          this.setState({findAllBrands: !findAllBrands});
                        }}
                      >
                        {!findAllBrands && <Text className="cate-text">展开</Text>}
                        <Image
                          src={grayArrowIcon}
                          className="arrow"
                          style={findAllBrands ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}
                        />
                      </View>
                    )}
                  </View>
                  <View className="screen-list">
                    {goodsBrands &&
                      goodsBrands.length > 0 &&
                      goodsBrands.map((item, index) => {
                        if (!findAllBrands && index >= 9) {
                          return null;
                        }
                        // 全部品牌大于24个，则最后一个展示
                        if (findAllBrands && index == 23 && goodsBrands.length > 24) {
                          return (
                            <View
                              className={'screen-item'}
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                // 关闭当前筛选面板，显示tab
                                goodsAction.commonChange([
                                  {paths: 'main.navToolsObj.screenIsShow', value: false},
                                  {paths: 'main.navToolsObj.brandFilter', value: true},
                                ]);
                              }}
                            >
                              <Text className="screen-text">全部品牌...</Text>
                            </View>
                          );
                        }
                        if (findAllBrands && index > 23 && goodsBrands.length > 24) {
                          return null;
                        }
                        return (
                          <View
                            className={
                              request.brandIds.includes(item.brandId) ? 'screen-item active-item' : 'screen-item'
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
                                    {brandId: item.brandId, brandName: item.brandName, nickName: item.nickName},
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
              {/* 分类*/}
              {main.goodsCates && main.goodsCates.length > 0 && (
                <View className="screen-box">
                  <View className="screen-titleBox">
                    <View className="screeen-title-container">
                      <Text className="screen-title">全部分类</Text>
                      <View className="screen-choose">
                        <Text className="text">
                          {this.state.chooseCates.length > 0 && this.state.chooseCates.map((v) => v.cateName).join(',')}
                        </Text>
                      </View>
                    </View>
                    {/* 品牌数量大于6个展示 */}
                    {main.goodsCates && main.goodsCates.length > 9 && (
                      <View
                        className="screen-unfold"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.setState({findAllCates: !findAllCates});
                        }}
                      >
                        {!findAllCates && <Text className={'cate-text'}>展开</Text>}
                        <Image src={grayArrowIcon} className={findAllCates ? 'arrow rote-out' : 'arrow rote-in'} />
                      </View>
                    )}
                  </View>
                  <View className="screen-list">
                    {main.goodsCates &&
                      main.goodsCates.length > 0 &&
                      main.goodsCates.map((item, index) => {
                        if (!findAllCates && index >= 9) {
                          return null;
                        }
                        return (
                          <View
                            className={
                              (
                                WMkit.isMall()
                                  ? main.request.storeCateIds?.includes(item.cateId)
                                  : main.request.cateIds?.includes(item.cateId)
                              )
                                ? 'screen-item active-item'
                                : 'screen-item'
                            }
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              // 如果分类集合里面已存在，则做删除
                              if (this.state.chooseCates.findIndex((v) => v.cateId == item.cateId) > -1) {
                                this.setState({
                                  chooseCates: this.state.chooseCates.filter((v) => v.cateId != item.cateId),
                                });
                              } else {
                                // 做添加
                                this.setState({
                                  chooseCates: this.state.chooseCates.concat([
                                    {cateId: item.cateId, cateName: item.cateName},
                                  ]),
                                });
                              }
                              goodsAction.chooseCates(item.cateId);
                            }}
                          >
                            <Text className="screen-text">{item.cateName}</Text>
                          </View>
                        );
                      })}
                  </View>
                </View>
              )}

              {/*分割线*/}
              {main.goodsPropertyVOS && main.goodsPropertyVOS.length > 0 && <View className="split-line" />}

              {main.goodsPropertyVOS?.length > 0 &&
                main.goodsPropertyVOS.filter((item) => Object.keys(item.detailMap).length > 0).length > 0 &&
                main.goodsPropertyVOS
                  .filter((item) => Object.keys(item.detailMap).length > 0)
                  .map((prop, index1) => {
                    const detailMap = prop.detailMap;
                    let keys = [];
                    for (let key in detailMap) {
                      keys.push(key);
                    }
                    // 前两个默认展示，后面的属性默认收起
                    return (
                      <View className="screen-box">
                        <View className="screen-titleBox">
                          <View className="screeen-title-container">
                            <Text className="screen-title">{prop.propName}</Text>
                            <View className="screen-choose">
                              <Text className="text">
                                {this.state.chooseProperty?.length > 0 &&
                                  this.state.chooseProperty
                                    .filter((item) => item?.propId == prop.propId)
                                    .map((v) => {
                                      return v.detailIds.map((det) => prop.detailMap[det]).join(',');
                                    })}
                              </Text>
                            </View>
                          </View>
                          {keys.length > 9 || index1 >= 2 ? (
                            <View
                              className="screen-unfold"
                              onClick={(e) => {
                                let toggleProp = {};
                                toggleProp[prop.propId] = !this.state.findAllProps[prop.propId];
                                e.stopPropagation();
                                this.setState({findAllProps: Object.assign(findAllProps, toggleProp)});
                              }}
                            >
                              {!findAllProps[prop.propId] && <Text className="cate-text">展开</Text>}
                              <Image
                                src={grayArrowIcon}
                                className={findAllProps[prop.propId] ? 'arrow rote-out' : 'arrow rote-in'}
                              />
                            </View>
                          ) : null}
                        </View>
                        <View className="screen-list">
                          {keys &&
                            keys.length > 0 &&
                            keys.map((key, index) => {
                              // 前两个属性默认展示9个，后面的默认不展示
                              if (index1 >= 2 && !findAllProps[prop.propId]) {
                                return null;
                              }
                              if (index1 < 2 && index > 8 && !findAllProps[prop.propId]) {
                                return null;
                              }
                              return (
                                <View
                                  className={
                                    this.state.chooseProperty.filter(
                                      (v) => v.detailIds?.includes(key) && v.propId == prop.propId,
                                    ).length > 0
                                      ? 'screen-item active-item'
                                      : 'screen-item'
                                  }
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // 如果属性集合里面已存在，则做删除
                                    // eslint-disable-next-line @typescript-eslint/no-shadow
                                    const index = this.state.chooseProperty.findIndex(
                                      (v) => v.detailIds.includes(key) && v.propId == prop.propId,
                                    );
                                    if (index > -1) {
                                      this.setState({
                                        chooseProperty: this.state.chooseProperty.filter((v) => {
                                          if (v.propId == prop.propId) {
                                            v.detailIds = v.detailIds.filter((item) => item && item != key);
                                          }
                                          return v;
                                        }),
                                      });
                                    } else {
                                      if(this.state.chooseProperty.length===0) {
                                        // 做添加
                                      this.setState({
                                        chooseProperty: [{
                                          detailIds: [key],
                                          propId: prop.propId
                                        }],
                                      });
                                      } else {
                                        // 做添加
                                      this.setState({
                                        chooseProperty: this.state.chooseProperty.filter((v) => {
                                          if (v.propId == prop.propId) {
                                            v.detailIds = v.detailIds.concat([key]);
                                          }
                                          return v;
                                        }),
                                      });
                                      }
                                      
                                    }
                                    goodsAction.chooseProperty(prop.propId, key);
                                  }}
                                >
                                  <Text className="screen-text">{detailMap[key]}</Text>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    );
                  })}
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
                  chooseBrands: [],
                  chooseCates: [],
                  chooseProperty: main.goodsPropertyVOS?.length > 0
                  ? main.goodsPropertyVOS.map((item) => {
                        return {propId: item.propId, detailIds: []};
                    })
                  : [],
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
      actions: {goodsAction},
      main = {},
    } = this.props;
    let num = '';
    if (main.request.companyType == '') {
      num = '0';
    }
    goodsAction.commonChange('main.request.companyType', num);
  };
}

//create by moon https://github.com/creasy2010/moon
