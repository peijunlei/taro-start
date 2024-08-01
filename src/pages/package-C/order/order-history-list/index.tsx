import React, { useEffect } from 'react';
import Taro from '@tarojs/taro'
import { View, ScrollView, Image, Text } from "@tarojs/components";
import api from 'api'
import { useSetState, _ } from 'wmkit';
import { MyContext } from './context';
import { DataProps } from './types';
import WMLoading from '@/pages/common/loading';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/coupon/empty.png';
import { Const } from 'config';
import './index.less'
import dayjs from 'dayjs';

const isH5 = __TARO_ENV === 'h5'
const tabStatus = [
  { label: '全部订单', key: '' },
  { label: '待付款', key: '1' },
  { label: '待收货', key: '2' },
  { label: '已完成', key: '3' },
];

const orderStatusMap = {
  NOTPAY: '未支付',
  DONE: '已完成',
  CANCEL: '已取消',
  PART_PAYMENT: '部分付款',
  WAIT_GROUPS_SUCCESS: '等待拼团成功',
  PAYED: '已支付',
  WAIT_BUYER_CONFIRM: '待用户收货'
}
export default function Index() {
  const [state, setState] = useSetState<DataProps>({
    tabKey: '',
    loading: false,
    list: [],
    total: 0,
    pageNum: 0,
    pageSize: 10,
    reload: false
  })
  const { loading, list, pageNum, pageSize, total, reload, tabKey } = state

  async function getData() {
    try {
      setState({ loading: true })
      const res = await api.customerFundsController.fetchHistoryOrderPage({ pageNum, pageSize, orderStateQuery: tabKey }) as any
      setState({
        list: pageNum === 0 ? res.ordersNormalOrdersVOPage?.content : list.concat(res.ordersNormalOrdersVOPage?.content),
        total: res.ordersNormalOrdersVOPage?.total,
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
  useEffect(() => {
    getData()
  }, [pageNum, reload, tabKey])
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <View className='give-gift-record'>
        <View className='nav-bar'>
          <View className="bar">
            {tabStatus.map((tabItem, index) => {
              return (
                <View
                  key={index}
                  className="nav"
                  onClick={() => {
                    if(tabKey === tabItem.key) return
                    setState({ tabKey: tabItem.key, pageNum: 0, list: [], total: 0 })
                  }}
                >
                  <Text
                    className={tabKey === tabItem.key ? 'order-list-top-item itemSelected' : 'order-list-top-item'}
                  >
                    {tabItem.label}
                  </Text>
                  <View className="active">
                    {tabKey == tabItem.key ? <View className="activeLine" /> : <View className="noActiveLine" />}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <ScrollView scrollY onScrollToLower={nextPage} scrollWithAnimation className='scroll-view'>
          <View>
            {
              list.length > 0 ?
                <View className='list'>
                  {
                    list.map(item => {
                      return (
                        <View
                          className='list-item'
                        >
                          <View className='top'>
                            <View className='createTime grey'>
                              {dayjs(item.createTime*1000).format(Const.SECONDS_FORMAT)}
                            </View>
                            <View className='orderNo grey'>
                              订单号：{item.orderId}
                            </View>
                          </View>
                          <View className='middle'>
                            <View className='box-left'>
                              <Image src={item.pic} className='img' />
                            </View>
                            <View className='box-mid'>
                              <View className='title'> {item.title}  </View>
                              <View className='num grey'> 数量：{item.num}  </View>
                              {
                                item.itemSpecDesc && <View className='num grey'> 规格：{item.itemSpecDesc}  </View>
                              }
                            </View>
                            <View className='box-right'>
                              ¥{_.div(item.itemFee, 100).toFixed(2)}
                            </View>
                          </View>
                          <View className='bottom'>
                            <View className='total'>
                              合计：¥{_.div(item.totalFee, 100).toFixed(2)}
                            </View>
                            <View className='btns'>
                              <View className='status'>
                                {orderStatusMap[item.orderStatus]}
                              </View>
                              <View
                                className='btn btn-detail'
                                onClick={() => Taro.navigateTo({
                                  url: `/pages/package-C/order/order-history-detail/index?id=${item.orderId}`
                                })}
                              >
                                订单详情
                            </View>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  }
                  {list.length !== total && <View className='status'>加载中...</View>}
                  {list.length === total && !loading && <View className='status'>没有更多了</View>}
                </View>
                : !loading && <Blank img={noneImg} content='暂无订单数据' />
            }
          </View>
        </ScrollView>
        {loading && <WMLoading />}
      </View>
    </MyContext.Provider>
  )
}