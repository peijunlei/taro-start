import { useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import api from 'api'
import { cache } from "config";

function LoginMiddle() {
  const params = useRouter().params as any

  async function init() {
    Taro.showLoading({ title: '登录中...' })
    const accessToken = params?.accessToken ? decodeURIComponent(params?.accessToken) : ''
    console.log('accessToken', accessToken)

    Taro.setStorageSync(cache.AUTH_TOKEN, accessToken)
    const context = await api.customerBaseController.autoLoginByToken() as any
    console.log('login', context)
    Taro.clearStorageSync()
    Taro.setStorageSync(cache.AUTH_TOKEN, context.token)
    Taro.setStorageSync(cache.LOGIN_DATA, context)
    Taro.hideLoading()
    Taro.switchTab({ url: '/pages/user-center/index' })
  }
  useEffect(() => {
    init()
  }, [])
  return null
}

export default LoginMiddle;