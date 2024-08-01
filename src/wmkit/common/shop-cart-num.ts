import Taro from '@tarojs/taro';
import api from 'api';
export async function setShopCartNum(isFromC) {
  // const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
  // let num = 0;
  // if (isLogin) {
  //   num = await api.purchaseBaseController.countGoods();
  // } else {
  //   num = (Taro.getStorageSync('mini::shopCartSku') || []).length;
  // }
  // if (isFromC) {
  //   msg.emit('shopCart-C-num', {num});
  // } else {
  //   num
  //     ? await Taro.setTabBarBadge({
  //         index: 3,
  //         text: num.toString(),
  //       })
  //     : await Taro.removeTabBarBadge({index: 3});
  // }
}
//取得购物车角标数量
export async function getShopCartNum() {
  const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
  let num = 0;
  if (isLogin) {
    num = await api.purchaseBaseController.countGoods();
  } else {
    num = (Taro.getStorageSync('mini::shopCartSku') || []).length;
  }

  return num;
}
