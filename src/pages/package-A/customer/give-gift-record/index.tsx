import React, { useEffect } from 'react';
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView, Image, Button } from "@tarojs/components";
import api from 'api'
import { useSetState } from 'wmkit';
import { MyContext } from './context';
import { DataProps } from './types';
import logo from '@/assets/image/customer/give-gift/logo.png'
import receivedImg from '@/assets/image/customer/give-gift/receivedImg.png'
import expiredImg from '@/assets/image/customer/give-gift/expiredImg.png'
import './index.less'
import WMLoading from '@/pages/common/loading';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/coupon/empty.png';
import moment from 'dayjs'

const isH5 = __TARO_ENV === 'h5'
export default function Index() {
  const [state, setState] = useSetState<DataProps>({
    loading: false,
    list: [],
    total: 0,
    pageNum: 0,
    pageSize: 10,
    reload: false
  })
  const { loading, list, pageNum, pageSize, total, reload } = state

  async function getData() {
    try {
      setState({ loading: true })
      const res = await api.customerFundsController.fetchCustomergrantinfoPage({ pageNum, pageSize }) as any
      setState({
        list: pageNum === 0 ? res.customerGrantInfoVOPage?.content : list.concat(res.customerGrantInfoVOPage?.content),
        total: res.customerGrantInfoVOPage?.total,
        loading: false
      })
    } catch (error) {
      setState({
        list: [],
        total: 0,
        loading: false
      })
    }

  }

  function nextPage() {
    if (list.length === total) return
    setState({ pageNum: pageNum + 1 })
  }
  function handleShare(id: string) {
    const url = `${window.location.origin}/mobile/pages/package-A/customer/give-gift-red-packet/index?id=${id}`
    Taro.setClipboardData({
      data: url
    }).then((res) => {
      Taro.showToast({
        title: '已复制',
        icon: 'none',
      });
    });
  }
  useShareAppMessage(res => {
    if (res.from === 'button') {
      const info = res.target.dataset.info || {}
      return {
        title: info.grantMsg,
        imageUrl: 'https://ori-wanmi-dev.oss-cn-hangzhou.aliyuncs.com/mini/assets/image/customer/give-gift/share_cover.png',
        path: `/pages/package-A/customer/give-gift-red-packet/index?id=${info.id}`
      }
    }
  })
  useEffect(() => {
    getData()
  }, [pageNum, reload])
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <View className='give-gift-record'>
        <ScrollView scrollY onScrollToLower={nextPage} scrollWithAnimation className='scroll-view'>
          {
            list.length > 0 ?
              <View className='list'>
                {
                  list.map(v => {
                    return (
                      <View className='list-item'>
                        <View className='time'>{v.grantDate ? moment(v.grantDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</View>
                        <View className='container'>
                          <View className='logo'>
                            <Image src={logo} className='img' />
                          </View>
                          <View className='info'>
                            <View className='info-top'>
                              <View className='title'>
                                转赠余额
                                </View>
                              {
                                v.grantState === 0 && <View className='no-receive'> 未领取  </View>
                              }

                            </View>
                            <View className='info-bottom'>
                              {v.grantAmount?.toFixed(2)}
                            </View>
                          </View>
                          <View className='action'>
                            {
                              v.grantState === 0 ?
                                isH5 ? <View className='give-other' onClick={() => handleShare(v.id)} > 转赠他人 </View> : <Button className='give-other share' openType='share' data-info={v} > 转赠他人 </Button>
                                : <Image src={v.grantState === 1 ? receivedImg : expiredImg} className='img' />
                            }
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
                {list.length !== total && <View className='status'>加载中...</View>}
                {list.length === total && !loading && <View className='status'>没有更多了</View>}
              </View>
              : !loading && <Blank img={noneImg} content='暂无余额转赠记录数据' />
          }
        </ScrollView>
        {loading && <WMLoading />}
      </View>
    </MyContext.Provider>
  )
}