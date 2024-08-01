import {cache } from 'config';
import {msg, WMkit} from 'wmkit';
import Taro from '@tarojs/taro';
import api from 'api';
import * as configTmp from '@/service/config';
const {getGlobalData, default: config} = configTmp;

import material from '@/assets/image/tab/material.png';
import materialRed from '@/assets/image/tab/material-red.png';
import goods from '@/assets/image/tab/goods.png';
import goodsCurr from '@/assets/image/tab/goods-curr.png';
import distribution from '@/assets/image/tab/distribution.png';
import distributionCurr from '@/assets/image/tab/distribution-curr.png';
import reward from '@/assets/image/tab/reward.png';
import rewardCurr from '@/assets/image/tab/reward-curr.png';
import goodsItem from '@/assets/image/tab/goods-item.png';
import goodsItemCurr from '@/assets/image/tab/goods-item-curr.png';

let overtime = true;
/**
 * 判断是否登陆 & 设置参数
 */
export const isLogin = (): boolean => {
  return Boolean(Taro.getStorageSync(cache.LOGIN_DATA));
};

/**
 * 是否以小B身份登录(同时满足：当前登录用户是分销员、邀请人id为空)
 */
export const isDistributorLogin = (): boolean => {
  return isDistributor() && !Taro.getStorageSync(cache.INVITEE_ID);
};
/**
 * 当前登陆人是否是小B
 */
export const isDistributor = (): boolean => {
  const flag = isLogin() && Taro.getStorageSync(cache.IS_DISTRIBUTOR) == '1';
  if (overtime && isLogin()) {
    overtime = false;
    setIsDistributor().then((_res) => {
      setTimeout(() => (overtime = true), 1000 * 60 * 10);
    });
  }
  return flag;
};

/**
 * 是否开启分销
 */
export const isOpenDistributor = async () => {
  const res = await api.distributionSettingController.findOne();
  await Taro.setStorageSync(
    cache.IS_OPEN_DISTRIBUTOR,
    res.distributionSettingSimVO && res.distributionSettingSimVO.openFlag ? true : false,
  );
  return res.distributionSettingSimVO && res.distributionSettingSimVO.openFlag ? true : false;
};

/**
 * 是否开启直播 sass 业务线没有小程序直播
 */
export const isLiveOpen = async () => {
  // const res = await api.liveRoomController.isLiveOpen();
  await Taro.setStorageSync(
    cache.IS_OPEN_LIVE,
    false
    // res.configVOList && res.configVOList[0] && res.configVOList[0].status ? true : false,
  );
  return false;
};

/**
 * 是否有分销员资格
 */
export const isDistributorFlag = (): boolean => {
  const flag = isLogin() && Taro.getStorageSync(cache.DISTRIBUTOR_FLAG) == '1';
  // if overtime && isLogin()) {
  //   overtime = false;
  //   api.distributionController.queryDistributorInfoByCustomerId().then(res=>{
  //     Taro.setStorageSync(cache.DISTRIBUTOR_FLAG, res.distributionCustomerVO.distributorFlag ? '1' : '0');
  //      //如果有分销员资格，需将tarbar的名称改为分销中心
  //     if (res.distributionCustomerVO.distributorFlag==1) {
  //       Taro.setTabBarItem({
  //         index: 2,
  //         text: '分销中心',
  //       });
  //     } else {
  //       //显示奖励中心
  //       Taro.setTabBarItem({
  //         index: 2,
  //         text: '奖励中心',
  //       });
  //     }
  //     setTimeout(() => (overtime = true), 1000 * 1);
  //   })
  // }
  return flag;
};

//是否拥有分销员资格
export const setIsDistributorFlag = async () => {
  const res = await api.distributionController.queryDistributorInfoByCustomerId();
  Taro.setStorageSync(
    cache.DISTRIBUTOR_FLAG,
    res.distributionCustomerVO && res.distributionCustomerVO.distributorFlag ? '1' : '0',
  );
};

/**
 * 查询并缓存是否分销员字段
 */
export const setIsDistributor = async () => {
  try {
    const res = await api.distributionController.loginIsDistributor();
    Taro.setStorageSync(cache.IS_DISTRIBUTOR, res ? '1' : '0');
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    loginData.customerDetail.isDistributor = res ? 1 : 0;
    Taro.setStorageSync(cache.LOGIN_DATA, loginData);
    return res;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 是否以小B身份登录(同时满足：登录,当前登录用户是分销员,通过邀请链接进行访问)
 */
export const isDistributorLoginForShare = (): boolean => {
  return isDistributor() && !!Taro.getStorageSync(cache.INVITEE_ID) && WMkit.channelType() !== '1';
};

/**
 * 根据登录后的返回参数跳转到相应页面
 * @param context
 */
export const switchLogin = async (context, routers) => {
  const couponResponse = context.couponResponse;
  // 首先区分企业会员
  if (context.enterpriseCheckState === 1 || context.enterpriseCheckState === 3) {
    clearLoginCache();
    //将审核中的账户信息存入本地缓存
    await Taro.setStorage({
      key: cache.PENDING_AND_REFUSED,
      data: context,
    });
    // a.设置完善信息的token
    await Taro.setStorage({
      key: cache.ACCOUNT_TOKEN,
      data: context.token,
    });
    //跳转到完善账户信息页面
    Taro.navigateTo({
      url: `/pages/package-A/login/improve-iep-info/index?customerId=${context.customerId}`,
    });
    return;
  }
  switch (context.checkState) {
    /**审核中*/
    case 0:
      clearLoginCache();
      //将审核中的账户信息存入本地缓存
      await Taro.setStorage({
        key: cache.PENDING_AND_REFUSED,
        data: context,
      });
      // a.设置完善信息的token
      await Taro.setStorage({
        key: cache.ACCOUNT_TOKEN,
        data: context.token,
      });
      //跳转到完善账户信息页面
      Taro.navigateTo({
        url: `/pages/package-A/login/account/index?customerId=${context.customerDetail.customerId}`,
      });
      showRegisterModel(couponResponse, false);
      break;
    /**审核通过，成功登录*/
    case 1:
      // a.设置登陆后token以及登陆信息缓存
      await Taro.setStorage({
        key: 'authInfo:token',
        data: context.token,
      });
      await Taro.setStorage({
        key: cache.LOGIN_DATA,
        data: context,
      });
      if (context.token) {
        await setIsDistributor();
      }
      await setIsDistributorFlag();
      // 登录成功，发送消息，查询分销员信息 footer/index.tsx
      // msg.emit('userLoginRefresh');
      // b.登陆成功,需要合并登录前和登陆后的购物车
      await mergePurchase(null);
      await msg.emit('refresh-reward');
      // c.登陆成功,跳转拦截前的路由
      Taro.showToast({
        title: '登录成功',
        duration: 2000,
      });

      if (__TARO_ENV === 'h5') {
        await changeTabBarText();
      }

      if (__TARO_ENV == 'h5' && routers == 'bind-tel') {
        Taro.switchTab({
          url: `/pages/index/index`,
        });
        return false;
      }
      //登陆成功返回上一级页面
      //获取要跳转的路由 以及要拼接的参数
      //如果是重定向方式过来的且是未登录时候点击分销中心或奖励中心的情形
      //@ts-ignore
      if (__TARO_ENV !== 'h5' && routers[0].options && routers[0].options.source == 'loadpage') {
        Taro.switchTab({
          url: `/pages/load-page/index`,
        });
        return false;
      }
      if (
        __TARO_ENV !== 'h5' &&
        routers[0] &&
        routers[0].route == 'pages/package-B/distribution/store/social-c/shop-my-c/index'
      ) {
        Taro.redirectTo({
          url: `/pages/package-B/distribution/store/social-c/shop-my-c/index`,
        });
        return false;
      }

      if (
        __TARO_ENV !== 'h5' &&
        routers[0] &&
        routers[0].route == 'pages/package-B/distribution/store/social-c/shop-cart-c/index'
      ) {
        Taro.redirectTo({
          url: `/pages/package-B/distribution/store/social-c/shop-cart-c/index`,
        });
        return false;
      }

      if (
        __TARO_ENV !== 'h5' &&
        routers[1] &&
        routers[1].route == 'pages/package-B/distribution/store/social-c/shop-cart-c/index'
      ) {
        Taro.redirectTo({
          url: `/pages/package-B/distribution/store/social-c/shop-cart-c/index`,
        });
        return false;
      }

      //从注册页点击已有账号去登陆 成功之后返回首页
      if (
        __TARO_ENV !== 'h5' &&
        routers[routers.length - 1].options &&
        routers[routers.length - 1].options.source == 'home'
      ) {
        if (WMkit.inviteeId() && WMkit.channelType() == '2') {
          Taro.redirectTo({
            url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
          });
        } else {
          Taro.switchTab({
            url: `/pages/index/index`,
          });
        }
      }
      //点击发现
      //@ts-ignore
      if (__TARO_ENV !== 'h5' && routers[0].options && routers[0].options.source == 'find') {
        Taro.switchTab({
          url: `/pages/material-circle/index`,
        });
      } else {
        //@ts-ignore
        if (__TARO_ENV === 'h5') {
          let url = routers[routers.length - 1];
          if (url?.options?.source == 'home') {
            if (!!WMkit.inviteeId() && WMkit.channelType() == '2') {
              Taro.redirectTo({
                url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
              });
            } else {
              Taro.switchTab({
                url: `/pages/index/index`,
              });
            }
          }
        }

        //@ts-ignore
        if (__TARO_ENV === 'h5') {
          //h5兼容处理tabbar页面，主要针对发现和分销/奖励中心的跳转
          let url = routers[routers.length - 2];
          if (url) {
            let route = url.path;
            //修改密码进入登陆页返回到首页
            if (route == '/pages/package-A/customer/user-pw-next/index') {
              Taro.switchTab({
                url: `/pages/index/index`,
              });
              return false;
              //从注册页点击已有账号去登陆 成功之后返回首页
            } else if (route == '/pages/package-A/login/register/index') {
              Taro.switchTab({
                url: `/pages/index/index`,
              });
              return false;
            } else if (route == '/pages/package-A/login/account/index') {
              Taro.switchTab({
                url: `/pages/index/index`,
              });
              return;
            } else if (route == '/pages/user-center/index') {
              Taro.switchTab({
                url: '/pages/user-center/index',
              });
              return;
            } else if (route == '/pages/package-B/goods/goods-details/index') {
              let raw = url['vnode']['_owner']['vnode']['props']['currentLocation']['search'];
              Taro.navigateTo({
                url: `${route}${raw}`,
              });
              return;
            } else {
              // boss后台开启客户审核、完善信息 前端注册死循环     小程序h5 问题79 https://www.tapd.cn/68416908/s/1593849
              if (route.includes('/pages/package-A/login/account/index')) {
                Taro.switchTab({
                  url: `/pages/index/index`,
                });
                return;
              } else if (route.includes('/pages/package-A/customer/user-mobile-next/index')) {
                // 修改用户绑定手机号码后接着登录页面跳转错误   小程序和H5问题90 https://www.tapd.cn/68416908/s/1610553
                Taro.switchTab({
                  url: `/pages/user-center/index`,
                });
                return;
              } else {
                Taro.navigateBack({
                  delta: 1,
                });
                return false;
              }
            }
          }
        }

        //一般情形
        let url = routers[routers.length - 2];
        if (!url) {
          Taro.switchTab({
            url: `/pages/index/index`,
          });
        }
        let obj = url?.options;
        if (__TARO_ENV === 'h5') {
          let route = url.path;
          if (route == '/pages/package-A/login/login/index' || route == '/pages/package-A/login/account/index') {
            Taro.navigateTo({
              url: '/pages/user-center/index',
            });
          } else if (route != '/pages/package-A/customer/user-pw-next/index') {
            //登录跳转
            loginJump(url, obj);
          }
        } else {
          //登录跳转
          if (url.route == 'pages/package-A/login/account/index' || url.route == 'pages/package-A/login/login/index') {
            url = routers[0];
            obj = url.options;
          }
          if (url.route == 'pages/package-A/login/register/index') {
            Taro.switchTab({
              url: `/pages/index/index`,
            });
          } else {
            loginJump(url, obj);
          }
        }
      }
      //要跳转以后再切换tabbar的名称才有用,也就是只有拥有tabbar的页面才能去修改tabbar
      changeTabBarText();
      showRegisterModel(couponResponse, true);
      break;
    /**审核未通过*/
    default:
      clearLoginCache();
      //将审核中的账户信息存入本地缓存
      await Taro.setStorage({
        key: cache.PENDING_AND_REFUSED,
        data: context,
      });
      // a.设置完善信息的token
      await Taro.setStorage({
        key: cache.ACCOUNT_TOKEN,
        data: context.token,
      });
      //跳转到完善账户信息页面
      Taro.navigateTo({
        url: `/pages/package-A/login/account/index?customerId=${context.customerDetail.customerId}`,
      });
  }
};
/**
 * 设置tabBar
 */
export const setTabBarItem = (index, text, iconPath, selectedIconPath) => {
  Taro.setTabBarItem({
    index: index,
    text: text,
    iconPath: iconPath,
    selectedIconPath: selectedIconPath,
    fail: () => {
      Taro.setStorage({
        key: cache.NEED_TABBAR_RELOAD,
        data: true,
      });
    },
    success: () => {
      Taro.setStorage({
        key: cache.NEED_TABBAR_RELOAD,
        data: false,
      });
    },
  });
};

export const changeTabBarText = async () => {
  try {
    //是否开启分销功能
  const isOpen = await isOpenDistributor(); //是否开启分销功能
  const isOpenLive = await isLiveOpen(); //是否开启直播功能
console.log('isOpen',isOpen)
console.log('isOpenLive',isOpenLive)
  //分销直播功能都开启：分销员登录 展示发现和分销中心， 未登录||非分销员 展示发现和奖励中心
  //分销开启直播未开启：分销员登录 展示分类和分销中心， 未登录||非分销员 展示分类和奖励中心
  //分销未开启直播开启：登录前后一致 展示分类和发现
  //分销直播均为未开启：登录前后一致 展示分类和商品

  //分销功能开启
  if (isOpen) {
    //直播功能开启
    if (isOpenLive) {
      const iconPath = material;
      const selectedIconPath = materialRed;
      setTabBarItem(1, '发现', iconPath, selectedIconPath);
      //直播功能未开启
    } else {
      const iconPath = goods;
      const selectedIconPath = goodsCurr;
      setTabBarItem(1, '分类', iconPath, selectedIconPath);
    }

    //分销员登陆
    if (Taro.getStorageSync(cache.DISTRIBUTOR_FLAG) == '1') {
      //显示分销中心
      const iconPath = distribution;
      const selectedIconPath = distributionCurr;
      setTabBarItem(2, '分销中心', iconPath, selectedIconPath);
    } else {
      //显示奖励中心
      const iconPath = reward;
      const selectedIconPath = rewardCurr;
      setTabBarItem(2, '奖励中心', iconPath, selectedIconPath);
    }

    //分销功能未开启
  } else {
    const iconPath = goods;
    const selectedIconPath = goodsCurr;
    setTabBarItem(1, '分类', iconPath, selectedIconPath);

    //直播功能开启
    if (isOpenLive) {
      const iconPath = material;
      const selectedIconPath = materialRed;
      // setTabBarItem(2, '发现', iconPath, selectedIconPath);
      //直播功能未开启
    } else {
      const iconPath = goodsItem;
      const selectedIconPath = goodsItemCurr;
      // setTabBarItem(2, '商品', iconPath, selectedIconPath);
    }
  }
  } catch (error) {
    
  }
  
};

/**
 * 清空登录缓存信息
 */
export const clearLoginCache = () => {
  Taro.removeStorageSync(cache.LOGIN_DATA);
  Taro.removeStorageSync(cache.AUTH_INFO);
  Taro.removeStorageSync(cache.IS_DISTRIBUTOR);
};

/**
 * 展示注册赠券信息
 * @param couponResponse
 * @param isShowButton
 */
export const showRegisterModel = (couponResponse, isShowButton?) => {
  if (couponResponse && couponResponse.couponList.length > 0) {
    let coupon = {
      // 是否显示弹框
      visible: isShop() == undefined ? true : !isShop(),
      // 是否展示我的优惠券按钮
      isShowButton: isShowButton,
      //优惠券列表
      couponList: couponResponse.couponList,
      //活动标题
      title: couponResponse.title,
      //活动描述
      desc: couponResponse.desc,
      // true  为注册赠券  false 进店赠券
      isStoreModel: true,
    };
    if (isShowButton != undefined) {
      // 是否展示我的优惠券按钮
      coupon['isShowButton'] = isShowButton;
      coupon['isStoreModel'] = false;
    }
    msg.emit('registerCouponVisible', coupon);
  }
};

/**
 * 获取分销渠道
 */
export const channelType = (): string => {
  return Taro.getStorageSync(cache.CHANNEL_TYPE);
};

/**
 * H5端获取微信静默授权信息
 */
export const wechatOpenIdByH5 = () => {
  const {openId} = Taro.getStorageSync(cache.AUTH_INFO);
  return openId;
};

/**
 * 小程序获取openid
 */
export const getOpenIdByMini = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
        if (res.code) {
          const openid = await api.payController.getLittleProgramOpenId(res.code);
          resolve(openid);
        } else {
          reject(res.errMsg);
        }
      },
    });
  });
};

/**
 * 是否shop购买
 */
export const isShop = (): boolean => {
  return channelType() == '2';
};

/**
 * 登陆成功后,合并登录前与登陆后的购物车
 */
export const mergePurchase = async (callBack) => {
  // 合并登录前/后的购物车

  //获取购物车本地缓存数据
  let purchaseData = Taro.getStorageSync('mini::shopCartSku');
  if (purchaseData && purchaseData.length > 0) {
    //合并购物车数据
    await api.purchaseBaseController.mergePurchase({purchaseMergeDTOList: purchaseData});
    //清楚登录缓存信息
    Taro.removeStorageSync('mini::shopCartSku');
    Taro.removeStorageSync(cache.SKU_MARKETING_CACHE);
  }
};

/**
 * 是否显示分享赚、发圈素材、只看分享赚按钮
 * @returns {boolean}
 */
export const isShowDistributionButton = (): boolean => {
  return isDistributor();
};

/**
 * 查询分销员状态
 */
export const getDistributorStatus = () => {
  let result = api.distributionController.getDistributorStatus();
  return result;
};

/**
 * 缓存分享链接信息
 * @param inviteeId 邀请人-会员ID
 * @param channelType  分销渠道 1:商城 2:小店
 */
export const setShareInfoCache = (inviteeId, channelType) => {
  if (inviteeId) {
    Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
  }
  if (channelType) {
    Taro.setStorageSync(cache.CHANNEL_TYPE, String(channelType));
  }
};
/**
 * 退出分享链接到商城首页,并更新邀请人和分销渠道缓存(分销渠道变为商城)
 */
export const toMainPageAndClearInviteCache = () => {
  Taro.removeStorageSync(cache.INVITEE_ID);
  Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
  Taro.switchTab({url: '/pages/index/index'});
  Taro.setStorageSync(cache.MAIN_RELOAD, '1');
};

/**
 * 获取邀请人id
 */
export const inviteeId = (): string => {
  return Taro.getStorageSync(cache.INVITEE_ID);
};

/**
 * 校验验证码
 */
export const testInviteCode = (inviteCode: string) => {
  const regex = /^[A-Z0-9]{8}$/;
  return regex.test(inviteCode);
};

let tabBarRoutes = [
  'pages/index/index',
  'pages/classify-circle-load-page/index',
  'pages/load-page/index',
  'pages/shop-cart/index',
  'pages/user-center/index',
];

/**
 * 登录跳转
 */
export const loginJump = (url, obj) => {
  //@ts-ignore
  // if (__TARO_ENV === 'h5') {
  //   let raw = url['vnode']['_owner']['vnode']['props']['currentLocation']['search'];
  //   let route = url['vnode']['_owner']['vnode']['props']['path'];
  //   if (raw == '?source=home') {
  //     Taro.switchTab({
  //       url: `/pages/index/index`,
  //     });
  //   } else if (raw != '') {
  //     Taro.navigateTo({
  //       url: `${route}${raw}`,
  //     });
  //   } else {
  //     if (tabBarRoutes.includes(route)) {
  //       Taro.switchTab({
  //         url: `${route}`,
  //       });
  //     } else {
  //       Taro.navigateTo({
  //         url: `${route}`,
  //       });
  //     }
  //   }
  // } else {
  // 判断 拼接的参数是否存在 __key__
  if (JSON.stringify(obj) != '{}') {
    if (obj['__key_']) {
      delete obj['__key_'];
    }
    //删除后判断是否是空对象
    if (JSON.stringify(obj) != '{}') {
      //循环拼接参数 确保能跳转回前一个页面
      let raw = Object.keys(obj)
        .sort()
        .reduce((acc, key) => `${acc}&${key}=${obj[key]}`, '')
        .substr(1);
      Taro.navigateTo({
        url: `/${url.route}?${raw}`,
      });
    } else {
      Taro.navigateTo({
        url: `/${url.route}`,
      });
    }
  } else {
    if (tabBarRoutes.includes(url.route)) {
      Taro.switchTab({
        url: `/${url.route}`,
      });
      changeTabBarText();
      // if (Taro.getEnv() == 'WEAPP') {
      //   changeTabBarText();
      // }
    } else {
      Taro.navigateTo({
        url: `/${url.route}`,
      });
    }
  }
  // }
};

//登录判断
export const switchModalLogin = (context) => {
  switch (context.checkState) {
    /**审核中*/
    case 0:
      clearLoginCache();
      //将审核中的账户信息存入本地缓存
      Taro.setStorage({
        key: cache.PENDING_AND_REFUSED,
        data: context,
      });
      // a.设置完善信息的token
      Taro.setStorage({
        key: cache.ACCOUNT_TOKEN,
        data: context.token,
      });
      //跳转到完善账户信息页面
      Taro.navigateTo({
        url: `/pages/package-A/login/improve-iep-info/index?customerId=${context.customerId}`,
      });
      break;
    /**审核通过，成功登录*/
    case 1:
      // a.设置登陆后token以及登陆信息缓存
      Taro.setStorage({
        key: 'authInfo:token',
        data: context.token,
      });
      Taro.setStorage({
        key: cache.LOGIN_DATA,
        data: context,
      });
      setIsDistributorFlag();
      //停在当前页面
      Taro.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 2000,
      });

      Taro.switchTab({
        url: `/pages/index/index`,
      });
      setTimeout(() => {
        //要跳转以后再切换tabbar的名称才有用,也就是只有拥有tabbar的页面才能去修改tabbar
        changeTabBarText();
      }, 1000);
      break;
    /**审核未通过*/
    default:
      clearLoginCache();
      //将审核中的账户信息存入本地缓存
      Taro.setStorage({
        key: cache.PENDING_AND_REFUSED,
        data: context,
      });
      // a.设置完善信息的token
      Taro.setStorage({
        key: cache.ACCOUNT_TOKEN,
        data: context.token,
      });
      //跳转到完善账户信息页面
      Taro.navigateTo({
        url: `/pages/package-A/login/improve-iep-info/index?customerId=${context.customerId}`,
      });
  }
};

/**
 * 已登录 或 没有开放访问
 *   反之 未登录 且 开放访问
 * @returns {boolean}
 */
export const isLoginOrNotOpen = (): boolean => {
  return isLogin() || getGlobalData('needLogin');
};

/**
 * 用户是否需要登录才能访问
 */
export const needLogin = (): boolean => {
  return getGlobalData('needLogin') && !Taro.getStorageSync('authInfo:token');
};

/**
 * 获取分享人id
 */
export const shareUserId = (): string => {
  return Taro.getStorageSync(cache.SHARE_USER_ID);
};
/**
 * 是否开启微信设置
 */
export const isOpenWechat = async () => {
  const type = __TARO_ENV == 'h5' ? 'H5' : 'MINI';
  const res = await api.wechatSetController.status(type);
  return res.toString() === '1' ? true : false;
};

/**
 * 前缀
 */
export const prefixUrl = (type?: string) => {
  if (type){
    return type.startsWith('http') ? type : window.location.origin + type;
  }else {
    return config.host.startsWith('http') ? config.host : window.location.origin + config.host;
  }
}
/**
 * 判断是否是品牌商城
 */
export const isMall = () => {
  const storeId: string = Taro.getStorageSync(cache.STORE_ID);
  return storeId != null && storeId != '-1';
}

// 判断是否是虚拟商品电子卡券
export const isVirtualGoods = (goodsType) => {
  if (goodsType === 1 || goodsType === 2) {
    return true;
  } else {
    return false;
  }
};
