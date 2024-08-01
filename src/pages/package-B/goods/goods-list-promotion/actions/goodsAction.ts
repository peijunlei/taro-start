import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import goodsBaseController from 'api/GoodsBaseController';
import goodsInfoBaseController from 'api/GoodsInfoBaseController';
import configController from 'api/ConfigController';
import purchaseBaseController from 'api/PurchaseBaseController';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
//更新购物车角标
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
      if (!getData() || !getData().main) {
        action.commonChange('main.isWMLoading', false);
        return;
      }
      let {request, totalPages} = getData().main;
      if (request.pageNum + 1 == totalPages) {
        action.commonChange('main.isWMLoading', false);
        return;
      }
      // request.pageNum = request.pageNum + 1;
      dispatch({type: Command.modifyRequest, payload: {pageNum: request.pageNum + 1}});
      let {goods, marketingId} = getData().main;
      let esGoodsInfoDTOList = Taro.getStorageSync('mini::shopCartSku') || [];
      let token = Taro.getStorageSync('authInfo:token');
      //商品列表查询结果
      let result;
      if (token) {
        //已登录 0:sku列表,1:spu列表
        result = await this.findSkuGoods(marketingId, esGoodsInfoDTOList);
      } else {
        //未登录 0:sku列表,1:spu列表
        result = await this.noLoginSkuFindGoods(marketingId, esGoodsInfoDTOList);
      }

      dispatch({
        type: Command.init,
        payload: {
          main: {
            goods: [...goods, ...result.esGoodsInfoPage.content],
          },
        },
      });
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false, marketingId) {
      let token = Taro.getStorageSync('authInfo:token');
      if (isResetPage) {
        await dispatch({type: Command.modifyRequest, payload: {pageNum: 0}});
      }
      let esGoodsInfoDTOList = Taro.getStorageSync('mini::shopCartSku') || [];
      //商品列表查询结果
      let result;
      if (token) {
        //已登录 0:sku列表,1:spu列表
        result = await this.findSkuGoods(marketingId, esGoodsInfoDTOList);
      } else {
        //未登录 0:sku列表,1:spu列表
        result = await this.noLoginSkuFindGoods(marketingId, esGoodsInfoDTOList);
      }
      result.esGoodsInfoPage.content.forEach((v)=>{
        const gs = v.goodsInfo.goodsStatus
        if(gs===5){
          v.goodsInfo.stock = 9999999
        }
      })
      action.commonChange('main.total', result.esGoodsInfoPage.totalElements);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            goods: result.esGoodsInfoPage.content, //商品列表
            totalPages: result.esGoodsInfoPage.totalPages,
            goodsIntervalPrices: result.goodsIntervalPrices,
          },
        },
      });
      action.commonChange('main.loadSkeleton', false);
      return result;
    },

    /**
     * 未登录时查询sku维度商品
     */
    async noLoginSkuFindGoods(marketingId, esGoodsInfoDTOList) {
      if (!getData() || !getData().main) {
        return;
      }
      let {request} = getData().main;
      let retult = await goodsInfoBaseController.skuListFront({...request, marketingId, esGoodsInfoDTOList});
      return retult;
    },

    /**
     * 登录时查询sku维度商品
     */
    async findSkuGoods(marketingId, esGoodsInfoDTOList) {
      if (!getData() || !getData().main) {
        return;
      }
      let {request} = getData().main;
      let retult = await goodsInfoBaseController.list({...request, marketingId, esGoodsInfoDTOList});
      return retult;
    },

    /**
     * sku直接添加购物车
     */
    async skuAddShopCart(goodsInfoId, count) {
      let token = Taro.getStorageSync('authInfo:token');
      //获取缓存到本地的购物车数据
      let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
      if (count == 0) {
        if (token) {
          try {
            await purchaseBaseController.delete_({goodsInfoIds: [goodsInfoId]});
          } catch (error) {
            Taro.showToast({
              title: error,
              icon: 'none',
              duration: 2000,
            });
          }
        } else {
          let index = purchaseData.findIndex((item) => item.goodsInfoId == goodsInfoId);
          purchaseData.splice(index, 1);
          //存到本地缓存
          Taro.setStorage({
            key: 'mini::shopCartSku',
            data: purchaseData,
          });
        }
      } else {
        if (token) {
          try {
            await purchaseBaseController.edit({goodsInfoId, goodsNum: count, verifyStock: true});
          } catch (error) {
            Taro.showToast({
              title: error,
              icon: 'none',
              duration: 2000,
            });
          }
        } else {
          //判断之前当前购买过的商品在购物车中有没有存在，如果存在购买的数量相加 如果不存在 重新增加一条数据
          let index = purchaseData.findIndex((item) => item.goodsInfoId == goodsInfoId);
          if (index > -1) {
            purchaseData[index].goodsNum = count;
          } else {
            purchaseData.push({goodsInfoId, goodsNum: count});
          }
          //存到本地缓存
          Taro.setStorage({
            key: 'mini::shopCartSku',
            data: purchaseData,
          });
        }
      }

      // await setShopCartNum();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListPromotionMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
