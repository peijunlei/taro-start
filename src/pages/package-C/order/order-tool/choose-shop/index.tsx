


import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { MyContext } from './context';
import { useSetState } from 'wmkit';
import { DataProps } from './types';
import WMLoading from '@/pages/common/loading';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/coupon/empty.png';
import Taro , { useDidShow, useRouter } from '@tarojs/taro';
import { cache, Const } from 'config';
import api from 'api';
import './index.less'

const mockdata = Array.from({ length: 10 }, (v, k) => ({
  id: k,
  name: `name${k}`,
  address: `address${k}`,
  phone: `phone${k}`,
  distance: k,
}));
function Index() {
  const params = useRouter().params
  const [state, setState] = useSetState<DataProps>({
    id: '',
    cityId: null,
    brandId: null,
    latitude: null,
    longitude: null,
    loading: false,
    list: [],
    total: 0,
    pageNum: 0,
    pageSize: 10,
    reload: false
  })
  const { loading, list, pageNum, pageSize, id, total, reload, brandId, cityId, latitude, longitude } = state
  async function getData() {
    setState({ loading: true })
    const res = await api.tradeBaseController.getDangaoShushuShopList({
      cityId,
      brandId,
      latitude,
      longitude
    }) as any[]
    if (res) {
      setState({
        loading: false,
        list: res,
        total: res.length,
      })
    }
  }
  function nextPage() {
    if (list.length === total) return
    setState({ pageNum: pageNum + 1 })
  }

  function handleClick(item: any) {
    const cacheInfo = Taro.getStorageSync(cache.MINI_CHOOSE_SHOP)
    // console.log(item, cacheInfo);
    const { shop_id, shop_name, address } = item
    cacheInfo[id] = { shop_id, shop_name, address }
    Taro.setStorageSync(cache.MINI_CHOOSE_SHOP, cacheInfo)
    Taro.navigateBack()
  }

  function getCache() {
    const queryObj = JSON.parse(decodeURIComponent(params.param))
    setState({
      id: queryObj.id,
      cityId: queryObj.cityId,
      latitude: queryObj.address.latitude,
      longitude: queryObj.address.longitude,
      brandId: queryObj.brandId,
    })
  }
  useEffect(() => {
    Taro.setStorageSync(cache.MINI_CHOOSE_SHOP_FLAG, true)
    brandId && getData()
  }, [pageNum, reload, brandId])
  useDidShow(() => {
    getCache()
  })
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <View className='choose_shop'>
        <View className='choose_shop_title'>所有门店</View>
        {loading && <WMLoading />}
        <ScrollView scrollY onScrollToLower={nextPage} scrollWithAnimation className='choose_shop_list'>
          <View>
            {
              list.length > 0 ?
                <Fragment>
                  {
                    list.map((item) => {
                      return (
                        <View className='choose_shop_item' key={item.id} onClick={() => handleClick(item)}>
                          <View className='choose_shop_item_left'>
                            <View className='choose_shop_item_left_name'>{item.shop_name}</View>
                            <View className='choose_shop_item_left_address'>{item.address}</View>
                            <View className='choose_shop_item_left_phone'>{item.phone}</View>
                          </View>
                          <View className='choose_shop_item_right'>
                            <View className='choose_shop_item_right_distance'>约{item.distance}km</View>
                          </View>
                        </View>
                      )
                    })
                  }
                  {list.length !== total && <View className='status'>加载中...</View>}
                  {list.length === total && !loading && <View className='status'>没有更多了</View>}
                </Fragment>
                : !loading && <Blank img={noneImg} content='暂无门店' />
            }
          </View>

        </ScrollView>

      </View>
    </MyContext.Provider>
  )
}
export default Index;