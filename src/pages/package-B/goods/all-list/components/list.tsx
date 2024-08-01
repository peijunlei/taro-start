import {View, Text, ScrollView, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import defaultCateImg from '../img/defaultCateImg.png';
import lodash from 'lodash';
// 热门分类推荐 - 坑位
import RecommendCateList from '@/pages/common/recommend-cate-list';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props) {
    super(props);
    this.state = {
      currentPageDataIsComplete: false,
    };
  }

  _commonChange = (key, value) => {
    const {action} = this.props.actions || {};
    action.commonChange(`main.${key}`, value);
  };

  render() {
    let {main} = this.props;

    if (!main) {
      return;
    }

    let cate = main?.cateList && main.cateList[main?.index];

    return this._getCateList(cate);
  }

  _getCateList = (cate) => {
    const {pageIndex, scrollTop, cateList} = this.props.main || {};
    const {action} = this.props.actions || {};
    const handleClick = this.props.handleClick;
    const {currentPageDataIsComplete} = this.state;
    const {cateId} = this.props;

    return cate?.goodsCateList && cate.goodsCateList.length > 0 ? (
      <ScrollView
        scrollY
        className="listContent"
        scrollTop={scrollTop}
        onScrollToLower={lodash.debounce(() => {
          if (cate.cateId == -1) {
            return;
          }
          this._commonChange(
            'pageIndex',
            currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
          );
        }, 1000)}
      >
        <View style={{paddingBottom: '46px'}}>
          <View>
            {cate.goodsCateList.map((level2Cate, index) => {
              return (
                <View className="item" key={index}>
                  <View
                    onClick={() => {
                      if ([-1].includes(cate.cateId)) return;
                      handleClick('cateId', level2Cate.cateId, level2Cate.cateName);
                    }}
                  >
                    <Text className="title">{level2Cate.cateName || level2Cate.brandName || '-'}</Text>
                  </View>
                  <View className="lev3ItemBox">
                    {
                      // 三级分类
                      level2Cate?.goodsCateList &&
                        level2Cate.goodsCateList.length > 0 &&
                        level2Cate.goodsCateList.map((level3Cate, index) => {
                          return (
                            <View
                              className="lev3Item"
                              key={index}
                              onClick={() => {
                                handleClick(
                                  level2Cate.brandId ? 'brandIds' : 'cateId',
                                  level3Cate.cateId || level3Cate.brandId,
                                  level3Cate.cateName || level3Cate.brandName,
                                  'level3',
                                );
                              }}
                            >
                              <Image
                                mode="aspectFit"
                                className="lev3Img"
                                src={level3Cate.cateImg || level3Cate.logo || defaultCateImg}
                              />
                              <Text className="lev3Text">{level3Cate.cateName || level3Cate.brandName || '-'}</Text>
                            </View>
                          );
                        })
                    }
                  </View>
                </View>
              );
            })}
          </View>

          {/* 热门分类推荐 */}
          {cate.cateId && cate.cateId !== -1 ? (
            <RecommendCateList
              pageIndex={pageIndex}
              type="7"
              relationCateIdList={[cate.cateId]}
              getCurrentPageDataIsComplete={(bol) => this.setState({currentPageDataIsComplete: bol})}
              setPageIndex={(index) => this._commonChange('pageIndex', index)}
            />
          ) : null}
        </View>
      </ScrollView>
    ) : (
      <View />
    );
  };
}

//create by moon https://github.com/creasy2010/moon
