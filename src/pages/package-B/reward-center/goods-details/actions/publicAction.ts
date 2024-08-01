import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {pvUvStatics} from 'wmkit';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 查询spu详情
     */
    async findSpuDetails(skuId, isShow) {
      await action.commonChange('main.isLoadingFlag', true);
      let result = null;
      let token = Taro.getStorageSync('authInfo:token');
      //判断是否登录
      if (token) {
        result = await api.goodsBaseController.detail(skuId);
      } else {
        result = await api.goodsBaseController.unLoginDetail(skuId);
      }

      //批发类型按照以往逻辑取第一个显示状态，零售类型则是按照列表页点选进来的sku进行展示
      if (token) {
        let saleType = result.goods.saleType;
        //获取第一个sku的关注情况
        const followRes = await api.goodsFollowBaseController.info({
          goodsInfoId: saleType == 0 ? result.goodsInfos[0].goodsInfoId : skuId,
        });
        action.commonChange('main.collect', followRes.goodsInfos.totalElements > 0);
      }
      //拼接规格值  照搬H5
      if (result.goodsSpecDetails) {
        result.goodsInfos.forEach((e) => {
          //遍历该规格项对应的所有规格值
          let specStr = result.goodsSpecDetails
            .filter((specDetail) => e.mockSpecDetailIds.includes(specDetail.specDetailId))
            .map((spec) => {
              return spec.detailName;
            })
            .join(' ');
          e.specText = specStr;
        });
      }

      //查询商品详情评价信息
      if (isShow) {
        await this._initEvaluate(result.goods.goodsId);
      }

      await this.initGoodsProperDetail(skuId);

      /**商品详情pv/uv埋点*/
      pvUvStatics.myPvUvStatis({
        skuId: skuId,
        shopId: result.goodsInfos[0].companyInfoId,
      });

      let storeInfo;
      //查询店铺信息
      if (token) {
        //已登录查询店铺信息
        storeInfo = await this.findStoreInfo(result.goodsInfos[0].storeId);
      } else {
        //未登录查询店铺信息
        storeInfo = await this.noLoginFindStoreInfo(result.goodsInfos[0].storeId);
      }
      //获取轮播平图片
      let allImgsIm = await this.getSlideImgs(skuId, result);

      //筛选出单条sku信息
      let goodsInfo = result.goodsInfos.find((item) => {
        return item.goodsInfoId == skuId;
      });

      //初始化属性信息
      let goodsProps = await this._initProps(result.goods.cateId);

      //初始化品牌信息
      let goodsBrand = await this._initBrand(result.goods.brandId);

      //商品规格里面添加一个默认值
      if (result.goodsSpecs) {
        result.goodsSpecs.forEach((e) => {
          goodsInfo.mockSpecDetailIds.forEach((id) => {
            if (e.specDetailIds.includes(id)) {
              //默认选中第一个规格值
              e.defaultVal = id;
            }
          });
        });
      }

      //查询客服信息
      let type: any = 1;
      let serviceRes = await api.qQServiceController.qqDetail(storeInfo.storeId, type);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            slideImages: allImgsIm || [],
            goodsDetail: result, //商品列表
            goodsInfo, //单挑sku信息
            storeInfo, //店铺信息
            goodsProps, //属性信息
            goodsBrand, //品牌信息
            descData: result.goods.goodsDetail, //副文本商品详情
            isServiceOpen: serviceRes && serviceRes.qqOnlineServerRop.effectiveMobile ? true : false,
          },
        },
      });
      await action.commonChange('main.isLoadingFlag', false);
    },

    //初始化图文信息和属性
    async initGoodsProperDetail(skuId) {
      //初始化图文信息
      let result = await api.goodsBaseController.goodsDetailProper(skuId);
      action.commonChange([
        {paths: 'main.descData', value: result.goodsDetail},
        {paths: 'main.goodsPropDetailRels', value: result.goodsPropDetailRels},
      ]);
    },

    /**
     * 初始化 评价信息
     * @param goodsId
     * @private
     */
    async _initEvaluate(goodsId) {
      let result = await api.evaluateController.top3EvaluateAndPraise(goodsId);
      action.commonChange('main.top3Evaluate', result);
    },

    /**
     * 未登录时查询店铺信息
     */
    async noLoginFindStoreInfo(storeId) {
      let retult = await api.storeBaseController.queryStoreUnlogin({storeId});
      return retult;
    },

    /**
     * 登录时查询店铺信息
     */
    async findStoreInfo(storeId) {
      let retult = await api.storeBaseController.queryStore({storeId});
      return retult;
    },

    /**
     * 获取轮播图片
     */
    async getSlideImgs(skuId, res) {
      //从H5搬过来的逻辑
      let allImgsIm = [];
      let goodsInfoList = res.goodsInfos;
      let goodsInfo = goodsInfoList.find((item) => {
        return item.goodsInfoId == skuId;
      });
      //批发销售--spu+sku图片拼接
      if (res.goods.saleType == 0) {
        allImgsIm = res.images.map((i) => i.artworkUrl);
        goodsInfoList
          .filter((i) => i.goodsInfoImg)
          .forEach((v) => {
            if (allImgsIm.length >= 10) {
              //最多显示10张图片
              return;
            }
            allImgsIm.push(v.goodsInfoImg);
          });
      }

      //零售销售--当前sku+spu的图片,sku图片为空时，取spu的第一张图片作为sku的图片，spu也没有图片时，就是空数组
      if (res.goods.saleType == 1) {
        goodsInfo.goodsInfoImg
          ? allImgsIm.push(goodsInfo.goodsInfoImg)
          : res.images.length > 0
          ? allImgsIm.push(res.images[0].artworkUrl)
          : allImgsIm.push('');
        if (allImgsIm.length > 0) {
          res.images.map((image) => {
            if (allImgsIm.length >= 10) {
              return;
            }
            allImgsIm.push(image.artworkUrl);
          });
        }
      }
      return allImgsIm;
    },

    /**
     * 初始化属性信息
     */
    async _initProps(cateId) {
      if (cateId) {
        const goodsProps = await api.goodsInfoBaseController.propsList(cateId);
        return goodsProps;
      }
    },

    /**
     * 初始化品牌信息
     */
    async _initBrand(brandId) {
      if (brandId) {
        const goodsBrand = await api.goodsBrandBaseController.list(brandId);
        return goodsBrand;
      }
    },

    /**
     * 收藏切换
     */
    async changeFollow(status, goodsInfoId) {
      //判断是否登录
      try {
        if (status) {
          await api.goodsFollowBaseController.add({goodsInfoId});
        } else {
          await api.goodsFollowBaseController.delete_({goodsInfoIds: [goodsInfoId]});
        }
        action.commonChange('main.collect', status);
      } catch (error) {}
    },

    /**
     * 查看促销活动详情
     */
    async marketingDetail(id) {
      let token = Taro.getStorageSync('authInfo:token');
      if (!id) return;
      let context;
      if (token) {
        context = await api.marketingFullGiftController.getGiftByMarketingId(id);
      } else {
        context = await api.marketingFullGiftController.getGiftByMarketingIdWithOutLogin(id);
      }
      console.log(context);
      action.commonChange([
        {paths: 'main.gift', value: context.giftList},
        {paths: 'main.fullGiftLevelList', value: context.levelList},
        {paths: 'main.isPromotionShow', value: true},
      ]);
    },

    /**
     * 打开规格弹窗
     */
    async openSpecModal(saleType) {
      //该商品均为零售商品
      action.commonChange('main.retailSpecIsShow', true);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('rewardGoodsDetailsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
