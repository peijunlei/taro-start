import React, { useEffect } from 'react';
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button } from "@tarojs/components";
import api from 'api'
import { useSetState, _ } from 'wmkit';
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
import IconFont from '@/wmkit/common/iconfont';
import dayjs from 'dayjs';
import { Const } from 'config';
const orderStatusMap = {
  NOTPAY: '未支付',
  DONE: '已完成',
  CANCEL: '已取消',
  PART_PAYMENT: '部分付款',
  WAIT_GROUPS_SUCCESS: '等待拼团成功',
  PAYED: '已支付',
  WAIT_BUYER_CONFIRM: '待用户收货'
}

const payTypeMap = {
  wxpay: '微信支付',
  localPay: '余额支付',
  deposit: '押金支付',
  alipay: '支付宝支付'
}
const isH5 = __TARO_ENV === 'h5'
export default function Index() {
  const params = Taro.getCurrentInstance().router?.params || {}
  const [state, setState] = useSetState<DataProps>({
    loading: false,
    list: [],
    total: 0,
    pageNum: 0,
    pageSize: 10,
    reload: false,
    order: null,
    goodsItems: []
  })
  const { loading, list, pageNum, pageSize, total, goodsItems, order } = state

  async function getData() {
    try {
      const res = await api.customerFundsController.fetchHistoryOrderDetail(params.id) as any
      if (res.order) {
        setState({ order: res.order, goodsItems: res.ordersNormalOrdersItemsList })
      }
    } catch (error) {

    }

  }

  useEffect(() => {
    getData()
  }, [])
  if (!order) return null
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <ScrollView className='order-history-detail' scrollY>
        <View className='order-status cell'>
          <View className='text'>{orderStatusMap[order.orderStatus]}</View>
          <View className='text-small'>订单{orderStatusMap[order.orderStatus]}</View>
        </View>
        <View className='address-info cell'>
          <View className='address'>
            <IconFont value="dingwei" size={15} color="#666" />
            <View className='text'> {order.receiverAddress}</View>
          </View>
          <View className='buyer grey'>
            {order.receiverName} {order.receiverMobile}
          </View>
        </View>
        <View className='orderNo text'>
          订单号： {order.orderId}
        </View>
        <View className='goods'>
          {
            goodsItems.map((item, index) => {
              return (
                <View className='goods-item'>
                  <View className='goods-num'>
                    第{index + 1}件商品
                  </View>
                  <View className='middle'>
                    <View className='box-left'>
                      <Image src={item.pic} className='img' />
                    </View>
                    <View className='box-mid'>
                      <View className='title'> {item.itemName}  </View>
                      <View className='num grey'> 数量：{item.num}  </View>
                      {
                        item.itemSpecDesc && <View className='num grey'> 规格：{item.itemSpecDesc}  </View>
                      }
                    </View>
                    <View className='box-right'>
                      ¥{_.div(item.itemFee, 100).toFixed(2)}
                    </View>
                  </View>

                </View>
              )
            })
          }
          <View className='total'>
            总计：¥{_.div(order.totalFee, 100).toFixed(2)}
          </View>
        </View>
        <View className='pay-con'>
          <View className='box'>
            <Text className='label'>下单时间</Text>
            <Text className='value'>{dayjs(order.createTime*1000).format(Const.SECONDS_FORMAT)}</Text>
          </View>
          <View className='box'>
            <Text className='label'>商品金额</Text>
            <Text className='value'> ¥{_.div(order.totalFee, 100).toFixed(2)}</Text>
          </View>
          <View className='box'>
            <Text className='label'>运费</Text>
            <Text className='value'>¥{_.div(order.freightFee, 100).toFixed(2)}</Text>
          </View>
          <View className='box'>
            <Text className='label'>优惠</Text>
            <Text className='value'> - ¥{_.div(order.couponDiscount, 100).toFixed(2)}</Text>
          </View>
          <View className='box'>
            <Text className='label'>支付</Text>
            <Text className='value'>¥{_.div(order.totalFee, 100).toFixed(2)} {payTypeMap[order.payType]}</Text>
          </View>
        </View>
      </ScrollView>
    </MyContext.Provider>
  )
}