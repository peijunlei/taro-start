import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import couponInfoController from 'api/CouponInfoController';
import goodsInfoBaseController from 'api/GoodsInfoBaseController';
import configController from 'api/ConfigController';
import purchaseBaseController from 'api/PurchaseBaseController';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
let getBrandsType = false;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
         *
              普通条件查询可以走,commonChange

         */
    async modifySearch(
      param,
      options: {
        isQuery: boolean;
        isResetPage: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      dispatch({type: Command.modifyRequest, payload: param});
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage);
      }
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {request, goods} = getData().main;
      // request.pageNum = request.pageNum + 1;
      action.commonChange('main.isLoadingFlag',true)
      dispatch({type: Command.modifyRequest, payload: {pageNum: request.pageNum + 1}});

      //优惠券可用列表查询结果
      let {couponInfo, esGoodsInfoResponse} = await this.findCouponGoods(request.activity, request.couponId);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            isLoadingFlag:false,
            goods: [...goods, ...esGoodsInfoResponse.esGoodsInfoPage.content],
          },
        },
      });
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false, activity, couponId) {
      action.commonChange('main.isLoadingFlag',true)
      if (isResetPage) {
        await dispatch({type: Command.modifyRequest, payload: {pageNum: 0}});
      }
      let {goods} = getData().main;
      //优惠券可用列表查询结果
      let {couponInfo, esGoodsInfoResponse} = await this.findCouponGoods(activity, couponId);
      esGoodsInfoResponse.esGoodsInfoPage.content.forEach((v)=>{
        const gs = v.goodsInfo.goodsStatus
        if(gs===5){
          v.goodsInfo.stock = 9999999
        }
      })
      dispatch({
        type: Command.init,
        payload: {
          main: {
            goods: esGoodsInfoResponse.esGoodsInfoPage.content, //商品列表
            goodsCates: esGoodsInfoResponse.cateList || [], //分类集合
            goodsBrands: esGoodsInfoResponse.brands || [], //品牌集合
            couponInfo,
            isLoadingFlag:false
          },
        },
      });
      action.commonChange('main.loadSkeleton', false);
    },

    /**
     * 登录时查询优惠券商品
     */
    async findCouponGoods(activity, couponId) {
      let {request} = getData().main;
      let retult = await couponInfoController.listGoodsByCouponId({...request, activity, couponId});
      return retult;
    },

    /**
     * sku直接添加购物车
     */
    async skuAddShopCart(goodsInfoId, count) {
      try {
        await purchaseBaseController.edit({goodsInfoId, goodsNum: count});
      } catch (error) {
        Taro.showToast({
          title: error,
          icon: 'none',
          duration: 2000,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListCouponMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
