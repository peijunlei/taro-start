import { View, ScrollView, Text, Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import searchImg from '@/assets/image/goods/search.png';
import defaultCateImg from '@/assets/image/common/default-img.png';
import React, { useEffect, useState, useMemo } from "react";
import api from 'api';
import WMLoading from "../loading";
import './index.less'




export function GoodsAllList() {
  const [cateList, setCateList] = useState([])
  const [currIndex, setCurrIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [scrollTop, setTop] = useState(0)
  async function getData() {
    try {
      let cateList = await api.goodsCateBaseController.allGoodsCates() as any
      cateList = JSON.parse(cateList) || [];
      setCateList(cateList)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }

  }
  function handleClick(key, ...rest) {
    // 如果是分类的跳转，需要传递二级或三级分类的标识，决定商品列表是否展示分类筛选，三级的是不需要展示的
    if (key == 'cateId') {
      Taro.navigateTo({
        url: `/pages/package-B/goods/goods-list/index?${key}=${
          !['brandIds'].includes(key) ? rest[0] : JSON.stringify([rest[0]])
          }&level=${rest[2]}`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/package-B/goods/goods-list/index?${key}=${
          !['brandIds'].includes(key) ? rest[0] : JSON.stringify([rest[0]])
          }`,
      });
    }
  }
  const cate = useMemo(() => cateList[currIndex], [cateList, currIndex])
  useEffect(() => {
    getData()
  }, [])
  return (
    <View className="packageAGoodsAllList_common" style={{ height: `calc(100vh - ${__TARO_ENV === 'h5' ? 50 : 0}px)` }}>
      <SearchBar />

      {
        loading ? <WMLoading /> : (
          <View className="menuItem">
            <LeftMenu cateList={cateList} currIndex={currIndex} setCurrIndex={setCurrIndex} setTop={setTop} />
            <List cate={cate} scrollTop={scrollTop} handleClick={handleClick} />
          </View>
        )
      }
    </View>
  );
}


function LeftMenu({ cateList, currIndex, setCurrIndex, setTop }) {
  return (
    <ScrollView scrollY enhanced className="leftMenu">
      {cateList &&
        cateList.map((v: any, k) => {
          return (
            <View
              key={k}
              onClick={() => {
                if (k === currIndex || v.cateId == -1) return
                setCurrIndex(k)
                // setTop(Math.random())
              }}
              className={k === currIndex ? 'item active' : 'item'}
            >
              <Text className="text">{v.cateName}</Text>
              <View className="borderRight" />
            </View>
          );
        })}
    </ScrollView>
  );
}

function List({ cate, scrollTop, handleClick }) {
  if (!cate) return null
  return (
    <ScrollView
      scrollY
      // scrollTop={scrollTop}
      enhanced
      className="listContent"
    >
      {cate.goodsCateList.map((level2Cate, index) => {
        if (cate.cateId == -1 && !level2Cate?.goodsCateList?.length) return;
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
    </ScrollView>
  )
}

function SearchBar() {
  return (
    <View className="searchBar">
      <View
        className="content"
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/package-B/goods/search/index',
          });
        }}
      >
        <Image src={searchImg} className="searchImg" lazyLoad />
        <Text className="searchText">搜索商品</Text>
      </View>
    </View>
  )

}