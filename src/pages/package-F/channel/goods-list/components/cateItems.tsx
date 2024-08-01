import React from "react";
import { View, Image, ScrollView } from "@tarojs/components";

import cn from "classnames";
import allIcon from "@/assets/image/goods/goods-list/all.png";
interface IProps {
  data: any[];
  onItemClick: (item: any) => void;
  activeIndex: number;
}

import './cateItems.less';
function CateItems(props: IProps) {
  const { data, onItemClick, activeIndex } = props;
  return (
    <ScrollView className='cate-items' scrollX >
      <View className='list'>
        {
          data.map((item, index) => {
            return (
              <View className={cn('cate-items__item', { active: item.id === activeIndex })} key={item.id} onClick={() => onItemClick(item.id)}>
                <View className='img-box'>
                  <Image src={index === 0 ? allIcon : item.picUrl} mode="aspectFill" className='cate-items__item__img' />
                </View>
                <View className='cate-items__item__text'>{item.cateName.slice(0, 4)}</View>
              </View>
            );
          })
        }
      </View>

    </ScrollView>
  );
}

export default CateItems;