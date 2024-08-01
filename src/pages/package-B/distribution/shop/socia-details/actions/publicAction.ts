import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {pvUvStatics, WMkit, _, wxShare} from 'wmkit';

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
    async findSpuDetails(id, goodsId, skuId) {
      let result;
      let storeInfo;
      let token = Taro.getStorageSync('authInfo:token');
      try {
        result = await api.goodsBaseController.shopGoodsDetail(id, goodsId, skuId);
        if (!result)
          return Taro.redirectTo({
            url: '/pages/package-B/goods/goods-failure/index',
          });
      } catch (e) {
        action.commonChange('main.isExist', false);
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

      //获取轮播平图片
      let allImgsIm = await this.getSlideImgs(skuId, result);

      //筛选出单条sku信息
      let goodsInfo = result.goodsInfos.find((item) => {
        return item.goodsInfoId == skuId;
      });
      //如果sku没图片，则将spu的图片视为sku图片
      if (!goodsInfo.goodsInfoImg) {
        goodsInfo.goodsInfoImg = result.goods.goodsImg;
      }

      if (goodsInfo) {
        if (WMkit.isLogin()) {
          let result = await api.storeBaseController.queryStore({storeId: goodsInfo.storeId});
          storeInfo = result;
          /**店铺pv/uv埋点*/
          pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
        } else {
          let result = await api.storeBaseController.queryStoreUnlogin({storeId: goodsInfo.storeId});
          storeInfo = result;
          /**店铺pv/uv埋点*/
          pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
        }
      }
      //初始化属性信息
      let goodsProps = await this._initProps(result.goods.cateId);

      //初始化品牌信息
      let goodsBrand = await this._initBrand(result.goods.brandId);

      //初始化抢购信息
      await this._initFlashSaleGoods(result.goods.goodsId);

      if (_.isWeixin()) {
        wxShare.initShare(
          goodsInfo.goodsInfoName,
          '我发现了一件超值商品，赶快来看看吧…',
          allImgsIm && allImgsIm.length != 0 && allImgsIm[0] != ''
            ? allImgsIm[0]
            : 'https://sbc-img.obs.cn-north-4.myhuaweicloud.com/202004011138219745.jpg',
          2,
        );
      }

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
      let serviceRes = await api.qQServiceController.qqDetail(goodsInfo.storeId, type);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            slideImages: allImgsIm || [],
            goodsDetail: result, //商品列表
            goodsInfo, //单挑sku信息
            goodsProps, //属性信息
            goodsBrand, //品牌信息
            descData: result.goods.goodsDetail, //副文本商品详情
            isServiceOpen: serviceRes && serviceRes.qqOnlineServerRop.effectiveMobile ? true : false,
            storeInfo: storeInfo,
          },
        },
      });
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
        //如果sku没图片，则将spu的图片视为sku图片
        if (!goodsInfo.goodsInfoImg) {
          goodsInfo.goodsInfoImg = res.goods.goodsImg;
        }
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
     * 初始化抢购信息
     * @param goodsId
     * @private
     */
    async _initFlashSaleGoods(goodsId) {
      const flashsaleGoods = await api.flashsaleGoodsController.isInProgress(goodsId);
      action.commonChange('main.flashsaleGodos', flashsaleGoods.flashSaleGoodsVOS);
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
      action.commonChange([{paths: 'main.isPromotionShow', value: true}]);
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
      ]);
    },

    /**
     * 打开规格弹窗
     */
    async openSpecModal(saleType, isPay) {
      if (saleType == 0) {
        //批发规格弹窗
        action.commonChange('main.batchSpecIsShow', true);
        if (isPay) action.commonChange('main.isPay', true);
      } else {
        //零售规格弹窗
        action.commonChange('main.retailSpecIsShow', true);
        if (isPay) action.commonChange('main.isPay', true);
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('sociaDetailsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
