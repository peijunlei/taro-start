import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    /**
     * 查询 会员最爱买 列表
     */
    async query() {
      const isLogin = WMkit.isLogin();
      if (!isLogin) {
        const res = await Promise.all([
          api.pointsMallController.getCateList(), //积分商品分类
          api.pointsMallController.hotExchange({pageSize: 10}), //获取热门兑换
          api.systemPointsConfigController.query(),
        ]);
        if (!res[2].status) {
          await this.integralVisible();
          Taro.redirectTo({
            url: '/pages/package-A/customer/user/points-none/index',
          });
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              cateList: res[0].pointsGoodsCateVOList,
              hotExchange: res[1].pointsGoodsVOPage.content,
              pointsRule: res[2].remark,
            },
          },
        });

        return false;
      }

      const res = await Promise.all([
        api.customerLevelBaseController.getCustomerLevelRightsInfos(), //获取用户信息,不包含积分
        api.pointsMallController.getCateList(), //积分商品分类
        api.pointsMallController.hotExchange({pageSize: 10}), //获取热门兑换
        api.pointsMallController.findCustomerInfo(), //获取用户积分信息
        api.customerBaseController.findCustomerCenterInfo(),
        api.systemPointsConfigController.query(),
      ]);
      if (!res[5].status) {
        await this.integralVisible();
        Taro.redirectTo({
          url: '/pages/package-A/customer/user/points-none/index',
        });
      }
      console.log('query res=', res);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cateList: res[1].pointsGoodsCateVOList,
            userInfo: res[4],
            hotExchange: res[2].pointsGoodsVOPage.content,
            pointsAvailable: res[3] && res[3].pointsAvailable ? res[3].pointsAvailable : null,
            pointsRule: res[5].remark,
          },
        },
      });
    },
    //设置积分商城是否可用
    integralVisible() {
      action.commonChange('main.integralVisible', false);
    },

    /**
     * 设置排序
     */
    setSort(type) {
      const {
        main: {sortType},
      } = getData();
      let newType = type;
      let newSort = '';

      // 是否切换排序类型？
      if (newType !== sortType.type) {
        newSort = 'asc';
      } else {
        // 同一种排序类型，切换升降顺序，我能兑换无顺序
        if (sortType.sort === 'asc') {
          newSort = 'desc';
        } else if (sortType.sort === 'desc') {
          newSort = 'asc';
        }
      }
      action.commonChange([
        {paths: 'main.sortType', value: {type: newType, sort: newSort}},
        {paths: 'main.canExchange', value: false},
      ]);
    },
    /**
     * 校验会员支付密码是否可用
     */
    async isPayPwdValid(pointsCoupon, couponInfo) {
      try {
        await api.customerBalanceBaseController.isPayPwdValid();
        action.commonChange([
          {
            paths: 'main.couponVisible',
            value: true,
          },
          {
            paths: 'main.pointsCoupon',
            value: pointsCoupon,
          },
          {
            paths: 'main.couponInfo',
            value: couponInfo,
          },
        ]);
      } catch (e) {
        if (e.code === 'K-010206') {
          Taro.showModal({
            title: '设置支付密码',
            content: '您还没有设置支付密码，\r\n暂时无法使用积分支付',
          }).then(async (res) => {
            if (res.confirm) {
              await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            }
          });
        }
      }
    },
    async nativeTo(goodsInfoId, pointsGoodsId) {
      const res = await api.systemPointsConfigController.query();
      if (!res.status) {
        Taro.navigateTo({
          url: '/pages/package-A/customer/user/goods-failure/index',
        });
      } else {
        if (!goodsInfoId || !pointsGoodsId) {
          return;
        }
        Taro.navigateTo({
          url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfoId}&pointsGoodsId=${pointsGoodsId}`,
        });
      }
    },

    async loginNativeTo(isLogin) {
      const res = await api.systemPointsConfigController.query();
      if (!isLogin) {
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index`,
        });
      } else if (res.status) {
        Taro.navigateTo({
          url: '/pages/package-A/customer/user/points-order-list/index',
        });
      } else {
        Taro.navigateTo({
          url: '/pages/package-A/customer/user/goods-failure/index',
        });
      }
    },
    /**
     * 校验输入支付密码
     * @param payPassword
     */
    async checkCustomerPayPwd(payPassword) {
      try {
        await api.customerBalanceBaseController.checkCustomerPayPwd(payPassword);
      } catch (e) {
        if (e.code === 'K-010206') {
          Taro.showModal({
            title: '设置支付密码',
            content: '您还没有设置支付密码，\r\n暂时无法使用积分支付',
          }).then(async (res) => {
            if (res.confirm) {
              await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            }
          });
        }
      }
    },
    //余额支付 校验密码
    async checckPayPwd(payPassword) {
      const {
        main: {pointsCouponId, sortType, canExchange},
      } = getData();
      if (pointsCouponId == '') {
        Taro.showToast({
          title: '积分优惠券不存在，请重新兑换',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await Promise.all([
          api.customerBalanceBaseController.checkCustomerPayPwd({payPassword}),
          api.pointsMallController.fetchPointsCoupon(pointsCouponId),
        ]);
        const type = sortType.type;
        // 排序方式：升序 降序
        const sort = sortType.sort;
        let sortFlag = null;
        if (type == 'points' && sort == 'asc') {
          sortFlag = 0;
        } else if (type == 'points' && sort == 'desc') {
          sortFlag = 1;
        } else if (type == 'price' && sort == 'asc') {
          sortFlag = 2;
        } else if (type == 'price' && sort == 'desc') {
          sortFlag = 3;
        }

        const listCou = await api.pointsMallController.pageCoupon(!canExchange && {sortFlag: sortFlag});
        action.commonChange([
          {
            paths: 'main.listCou',
            value: listCou.pointsCouponVOPage.content,
          },
        ]);
        //支付成功
        await action.commonChange([
          {paths: 'main.visible', value: false},
          {paths: 'main.payErrorTime', value: 0},
        ]);
        await Taro.showToast({title: '兑换成功!'});
        await action.query();
      } catch (e) {
        const {payErrorTime} = await api.customerBaseController.getLoginCustomerInfo();
        await action.commonChange('main.payErrorTime', payErrorTime);
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserPointsMallMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
