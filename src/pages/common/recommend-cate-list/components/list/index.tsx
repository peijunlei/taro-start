import React from 'react';
import Taro from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {noop} from 'wmkit';
import noDataIcon from '@/assets/image/common/default-img.png';
// 标题
import Title from './../title';
import './index.less';

export default class List extends React.Component<any, any> {
  static options = {addGlobalClass: true};

  static defaultProps = {
    dataSource: [],
    title: '',
    _clickCates: noop,
  };

  render() {
    const {dataSource = [], title, _clickCates} = this.props || {};
    return (
      <View className="recommend_goods_cate_list_spu">
        <View className="recommend_goods_cate_list_spu__item">
          {/* 标题 */}
          <Title title={title} />
          {/* 列表 */}
          <View className="recommend_goods_cate_list_spu__lev3ItemBox">
            {dataSource.map((item, index) => {
              return (
                <View
                  className="recommend_goods_cate_list_spu__lev3ItemBox--lev3Item"
                  key={index}
                  onClick={() => {
                    _clickCates({cateId: item.cateId});
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-list/index?cateId=${item.cateId}`,
                    });
                  }}
                >
                  <Image
                    className="recommend_goods_cate_list_spu__lev3ItemBox--lev3Img"
                    src={item.cateImg || noDataIcon}
                  />
                  <Text className="recommend_goods_cate_list_spu__lev3ItemBox--lev3Text">{item.cateName}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
