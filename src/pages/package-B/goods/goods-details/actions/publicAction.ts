import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro, { getStorageSync as _getStorageSync } from '@tarojs/taro';
import { _, pvUvStatics, WMkit, wxShare } from 'wmkit';
import moment from 'dayjs';
import { cache } from 'config';
import isBetween from 'dayjs/plugin/isBetween';
import { findAddressList } from 'api/CustomerDeliveryAddressBaseController';


moment.extend(isBetween);
function convertToHTML(arr: any[]) {

  let htmlString = '';
  if (arr.length === 0) return
  arr.forEach(item => {
    const { mpath } = item;
    const imgTag = `<p><img src="${mpath}" title="" alt="/"/></p>`;
    htmlString += imgTag;
  });

  return htmlString;
}
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async getMenuList() {
      const result = await api.HoverNavMobileController.getByMain(2);
      action.commonChange('main.menuList', result && result.hoverNavMobileVO.navItems);
    },

    async isGoodsEvaluate() {
      //判断商品详情评价是否展示
      let res = await api.systemPointsConfigController.isGoodsEvaluate();
      action.commonChange('main.isShow', res.evaluate);
      return res.evaluate;
    },

    /**
     * 查询spu详情
     */
    async findSpuDetails(skuId, pointsGoodsId) {
      const { isRun, address } = getData().main || {};
      let result = null;
      const token = Taro.getStorageSync('authInfo:token');
      //判断是否登录
      if (token) {
        try {
          if (pointsGoodsId) {
            const pointsConfig = await api.systemPointsConfigController.query();
            if (!pointsConfig.status) {
              Taro.navigateTo({
                url: '/pages/package-A/customer/user/goods-failure/index',
              });
            }
            result = await api.goodsBaseController.pointsGoodsDetail(pointsGoodsId);
          } else {
            result = await api.goodsBaseController.detail(skuId, address.deliveryAddressId || null);
          }
        } catch (e) {
          // debugger;
          // if (!isRun) {
          //   Taro.redirectTo({
          //     url: '/pages/package-B/goods/goods-failure/index',
          //   });
          //   this.commonChange('main.isRun', true);
          // }
          if (e.code === 'K-030001') {
            Taro.redirectTo({
              url: '/pages/package-B/goods/goods-failure/index',
            });
            return;
          }
          setTimeout(() => {
            Taro.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000,
            });
          }, 50);
        }
      } else {
        try {
          if (pointsGoodsId) {
            const pointsConfig = await api.systemPointsConfigController.query();
            if (!pointsConfig.status) {
              Taro.navigateTo({
                url: '/pages/package-A/customer/user/goods-failure/index',
              });
            }
            result = await api.goodsBaseController.pointsGoodsDetail(pointsGoodsId);
          } else {
            result = await api.goodsBaseController.unLoginDetail(skuId);
          }
        } catch (e) {
          if (!isRun) {
            Taro.redirectTo({
              url: '/pages/package-B/goods/goods-failure/index',
            });
            this.commonChange('main.isRun', true);
          }
          if (e.code === 'K-030001') {
            return;
          }
          setTimeout(() => {
            Taro.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000,
            });
          }, 50);
        }
      }

      if (!result) {
        return '';
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
      result.goodsInfos.forEach((v) => {
        const gs = result.goods.goodsStatus
        if (gs === 5) {
          v.goodsStatus = 5;
          v.stock = 9999999
        }
      });
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

      //划线价存在
      if (result.goods && result.goods.linePrice) {
        goodsInfo.lineShowPrice = result.goods.linePrice;
      }

      //如果根据这个sku没找到对应商品，取第一个非失效SKU
      if (!goodsInfo) {
        goodsInfo = result.goodsInfos.find((item) => {
          return item.addedFlag === 1;
        });
      }

      this.getRuleContent();

      //初始化属性信息
      // let goodsProps = await this._initProps(result.goods.cateId);
      let goodsProps = await this._initProperty(result.goods.goodsId);

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
      //如果sku没图片，则将spu的图片视为sku图片
      if (!goodsInfo.goodsInfoImg) {
        goodsInfo.goodsInfoImg = result.goods.goodsImg;
      }
      let pointsGoods =
        result.pointsGoodsList &&
        result.pointsGoodsList.find((item) => {
          return item.pointsGoodsId == pointsGoodsId;
        });
      result.pointsGoods = pointsGoods;

      // todo
      // action.commonChange('main.[]')main
      action.commonChange([
        { paths: 'main.slideImages', value: allImgsIm || [] },
        { paths: 'main.goodsDetail', value: result },
        { paths: 'main.goodsInfo', value: goodsInfo },
        { paths: 'main.goodsProps', value: goodsProps },
        { paths: 'main.goodsBrand', value: goodsBrand },
        { paths: 'main.pointsGoods', value: pointsGoods },
        { paths: 'main.skuId', value: skuId },
      ]);
      // dispatchch({
      //   type: Command.init,
      //   payload: {
      //     main: {
      //       slideImages: allImgsIm || [],
      //       goodsDetail: result, //商品列表
      //       goodsInfo, //单条sku信息
      //       goodsProps, //属性信息
      //       goodsBrand, //品牌信息
      //       pointsGoods, //积分商品信息
      //     },
      //   },
      // });
      this.queryServerTime();
      //
      this.initRestrictedTemplate(result.goods.goodsId);
      if (result.goods.goodsType === 8) {
        this.initDangaoRestricted(result.goods.goodsNo, goodsInfo.goodsInfoNo, goodsBrand.thirdBrandId)
      }
      //初始化抢购信息
      this._initFlashSaleGoods(result.goods.goodsId);
      //预约
      this.initqueryPreBuyTime(goodsInfo.goodsInfoId);
      //预售
      this.initQueryPresaleisInProgress(goodsInfo.goodsInfoId);
      this.initShare(allImgsIm);
    },
    /**商品详情pv/uv埋点*/
    pvUvStaticsMyPvUvStatis(result, goodsInfo, skuId) {
      //编辑参数
      let params;
      const { marketingSuits } = getData().main || {}; // 组合购

      // 编辑参数
      // marketingType: 0,"满减优惠" 1,"满折优惠" 2,"满赠优惠" 3,"一口价优惠" 4,"第二件半价优惠活动"
      // 5,"秒杀" 6,"组合套餐" 101,"拼团" 102,"预约" 103,"全款预售" 104,"分销" 105,"定金预售"
      let getMarketingList = (goodsInfo, distributionGoods) => {
        let marketingList = [];
        const { bookingSaleGoods, bookingType, handSelEndTime, handSelStartTime } = goodsInfo?.bookingSaleVO || {};

        //秒杀
        const flashsaleGoodsFlag = goodsInfo?.marketingLabels?.find((v) => v.marketingType == '5');
        const flashsaleGodosList = getData().main.flashsaleGodos;
        const flashsaleGodos = flashsaleGodosList?.find((v) => v.goodsInfoId == skuId);
        let flashTime;
        if (flashsaleGodos) {
          const activityFullTime = flashsaleGodos.activityFullTime;
          flashTime = moment(activityFullTime).format('YYYYMMDDHHmmss');
        }

        // 组合购
        if (marketingSuits && marketingSuits.length > 0) {
          marketingList.push({
            marketingId: marketingSuits[0].marketingSuitsGoodsInfoDetailVO.marketingId,
            marketingType: '6',
          });
        }

        // 预约
        if (goodsInfo?.appointmentSaleVO?.appointmentSaleGood) {
          marketingList.push({
            marketingId: goodsInfo.appointmentSaleVO.appointmentSaleGood.id,
            marketingType: '102',
          });
          // 预售    定金预售 支付定金结束后为普通商品
        } else if (
          bookingSaleGoods &&
          (bookingType == 0 ||
            (bookingType == 1 && moment(getData().main.serverTime).isBetween(handSelStartTime, handSelEndTime)))
        ) {
          //全款预售103 定金预售105
          //bookingType 0:全款 1:定金
          marketingList.push({
            marketingId: bookingSaleGoods.id,
            marketingType: bookingType ? '105' : '103',
          });
          //秒杀
        } else if (flashsaleGoodsFlag) {
          marketingList.push({
            marketingId: flashTime,
            marketingType: flashsaleGoodsFlag.marketingType,
          });
          // 分销
        } else if (distributionGoods) {
          marketingList.push({
            marketingId: skuId,
            marketingType: '104',
          });
        } else {
          goodsInfo?.marketingLabels?.forEach((label) => {
            marketingList.push({
              marketingId: label.marketingId,
              marketingType: label.marketingType,
            });
          });
        }

        return marketingList;
      };

      //0:批发/1:零售
      if (result?.goods?.saleType) {
        const list = getMarketingList(goodsInfo, result?.distributionGoods);
        params = {
          skuId: skuId,
          shopId: goodsInfo.companyInfoId,
          marketingList: list,
        };
      } else {
        params = [];
        // 遍历sku
        result?.goodsInfos?.forEach((goodsInfo) => {
          const list = getMarketingList(goodsInfo, result?.distributionGoods);

          params.push({
            skuId: goodsInfo.goodsInfoId,
            shopId: goodsInfo.companyInfoId,
            marketingList: list,
          });
        });
      }
      pvUvStatics.myPvUvStatis(params, result?.goods?.saleType);
    },
    //初始化查询信息
    async inintGoodsInfo(skuId, _pointsGoodsId) {
      await this.findSpuDetails(skuId, _pointsGoodsId);
      this.isGoodsEvaluate().then((re) => {
        if (re) {
          this.initEvaluate(skuId);
        }
      });
      this.initGoodsProperDetail(skuId);
      this.initGoodsDetailSimple(skuId);
      await this.initStoreInfo(skuId);
      await this.initMoreSuitInfo(skuId);
    },
    //初始化商品详情信息
    async initEvaluate(skuId) {
      //查询商品详情评价信息
      await this._initEvaluateBySkuId(skuId);
    },
    //初始化店铺信息
    async initStoreInfo(skuId) {
      let token = Taro.getStorageSync('authInfo:token');

      let storeInfo;
      try {
        //查询店铺信息
        if (token) {
          //已登录查询店铺信息
          storeInfo = await api.storeBaseController.queryStoreBySkuId({ skuId: skuId });
        } else {
          //未登录查询店铺信息
          storeInfo = await api.storeBaseController.queryStoreBySkuIdUnlogin({ skuId: skuId });
        }
        //查询客服信息
        let type: any = 3;
        let isServiceOpen = false;
        let enterpriseId = '';
        let serviceUrl = '';
        const res = await Promise.all([
          api.qQServiceController.qqDetail(0, type),
          api.qQServiceController.weChatDetail(storeInfo.storeId),
        ]);
        if (WMkit.isLogin() && res[0]?.qqOnlineServerRop?.status === 1) {
          isServiceOpen = true;
        }
        if (res[1]?.weChatOnlineServerRop?.status === 1) {
          isServiceOpen = true;
          if (res[1].weChatOnlineServerRop.groupStatus === 0) {
            enterpriseId = res[1].weChatOnlineServerRop.enterpriseId;
            serviceUrl = res[1].weChatOnlineServerRop.serviceUrl;
          }
        }
        // const testRes = await weChatPublicPlatformController.getSign({terminalType: 'MINI',url: encodeURI(window.location.href)});
        // console.log(testRes);
        // console.log(window.location.href);
        // let serviceRes = await qQServiceController.qqDetail(storeInfo.storeId, type);
        action.commonChange([
          { paths: 'main.storeInfo', value: storeInfo },
          { paths: 'main.isServiceOpen', value: isServiceOpen },
          { paths: 'main.enterpriseId', value: enterpriseId },
          { paths: 'main.serviceUrl', value: serviceUrl },
          // {paths: 'main.goodsLink', value: serviceUrl},
        ]);

        // 如果店铺 关店，过期，不存在，那么该店铺下的商品 都不能访问，不跳错误页面，展示失效
        if (storeInfo.storeResponseState !== 0) {
          action.commonChange('main.isItInvalid', true);
          // Taro.navigateTo({
          //   url: '/pages/package-B/goods/goods-failure/index',
          // });
        }
      } catch (e) {
        // 店铺已过期，展示失效商品
        if (e.code == 'K-110207') {
          action.commonChange('main.isItInvalid', true);
        }
      }
    },

    //初始化图文信息和属性
    async initGoodsProperDetail(skuId) {
      const { goodsDetail } = getData().main;
      const goodsType = goodsDetail.goods?.goodsType;
      const imgs = goodsDetail.detailImages;
      let result = await api.goodsBaseController.goodsDetailProper(skuId);
      if (goodsType === 5 && goodsDetail.goods.subGoodsDetail) {
        result.goodsDetail += goodsDetail.goods.subGoodsDetail
      }
      let detailStr = result.goodsDetail
      if (goodsType === 8 && !detailStr && imgs && imgs.length > 0) {
        detailStr = convertToHTML(imgs)
      }
      action.commonChange([
        { paths: 'main.descData', value: detailStr },
        { paths: 'main.goodsPropDetailRels', value: result.goodsPropDetailRels },
      ]);
    },

    //初始化商品简易信息
    async initGoodsDetailSimple(skuId) {
      //初始化图文信息
      let result;
      try {
        result = await api.goodsBaseController.goodsDetailSimple(skuId);
      } catch (e) {
        if (e.code === 'K-030001') {
          Taro.redirectTo({
            url: '/pages/package-B/goods/goods-failure/index',
          });
          return;
        }
      }
      action.commonChange([
        { paths: 'main.goodsName', value: result.goods.goodsName },
        { paths: 'main.goodsSubtitle', value: result.goods.goodsSubtitle },
      ]);
    },

    async initqueryPreBuyTime(skuId) {
      //判断商品是否预约中
      await this.queryPreBuyTime(skuId);
    },

    async initQueryPresaleisInProgress(skuId) {
      //判断商品是否预售中
      await this.queryPresaleisInProgress(skuId);
    },

    //判断当前的预约状态
    async isBuyStatus(status) {
      if (!status) return;
      let appointmentStartTime = status.appointmentStartTime;
      let appointmentEndTime = status.appointmentEndTime;
      let snapUpStartTime = status.snapUpStartTime;
      let snapUpEndTime = status.snapUpEndTime;

      let isAppointmentStart = appointmentStartTime ? moment(appointmentStartTime).isBefore(new Date()) : null;
      let isAppointmentEnd = appointmentEndTime ? moment(new Date()).isBefore(appointmentEndTime) : null;

      let isSnapUpStartTime = snapUpStartTime ? moment(snapUpStartTime).isBefore(new Date()) : null;
      let isSnapUpEndTime = snapUpEndTime ? moment(new Date()).isBefore(snapUpEndTime) : null;

      let result = '';
      if (isAppointmentStart && isAppointmentEnd) result = '预约中';
      if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
      if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
      return result;
    },

    //判断当前的预售状态
    async isPresaleStatus(item) {
      const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
      let isBetween = false;

      //预售起止时间内 0:全款 1:定金
      if (bookingType == 0) {
        isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
      }

      //定金支付起止时间内
      if (bookingType == 1) {
        isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
      }
      return isBetween;
    },

    async fetchRule() {
      let ruleContent = await api.RuleInfoBaseController.getRuleContentAll();
      action.commonChange('main.ruleContent', ruleContent);
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
     * 初始化 评价信息
     * @param goodsId
     * @private
     */
    async _initEvaluateBySkuId(skuId) {
      let result = await api.evaluateController.top3EvaluateAndPraiseBySkuId(skuId);
      action.commonChange('main.top3Evaluate', result);
    },

    /**
     * 未登录时查询店铺信息
     */
    async noLoginFindStoreInfo(storeId) {
      let retult = await api.storeBaseController.queryStoreUnlogin({ storeId });
      return retult;
    },

    /**
     * 登录时查询店铺信息
     */
    async findStoreInfo(storeId) {
      let retult = await api.storeBaseController.queryStore({ storeId });
      return retult;
    },
    /**
     *
     * 获取当前用户是否预约该商品
     */
    async isSubscriptionFlag(skuId) {
      let ruleContent = await api.AppointmentSaleBaseController.isSubscriptionFlag(skuId);
      action.commonChange('main.subscriptionFlag', ruleContent);
    },

    /**
     *
     * 切换规格时判断预约活动
     */
    async queryAppointmentOpentype(appointmentSaleVO) {
      const { main = { openType: '', goodsInfo: { buyPoint: null } } } = getData();
      let { openType, goodsInfo } = main;
      //积分价格优先
      if (!goodsInfo.buyPoint) {
        if (appointmentSaleVO && (await this.isBuyStatus(appointmentSaleVO))) {
          openType = '5'; //预约
          action.commonChange('main.appointmentSaleVO', appointmentSaleVO);
        } else {
          action.commonChange('main.appointmentSaleVO', {});
        }
        action.commonChange('main.openType', openType);
      } else {
        action.commonChange('main.appointmentSaleVO', {});
      }
    },

    /**
     *
     * 切换规格时判断预售活动
     */
    async queryBookingOpentype(bookingSaleVO) {
      const { main = { openType: '', goodsInfo: { buyPoint: null } } } = getData();
      let { openType, goodsInfo } = main;

      //积分价格优先
      if (!goodsInfo.buyPoint) {
        if (bookingSaleVO && (await this.isPresaleStatus(bookingSaleVO))) {
          openType = '6'; //预售
          action.commonChange('main.bookingSaleVO', bookingSaleVO);
        } else {
          action.commonChange('main.bookingSaleVO', {});
        }
        action.commonChange('main.openType', openType);
      } else {
        action.commonChange('main.bookingSaleVO', {});
      }
    },

    /**
     * 获取预约时间
     */
    async queryPreBuyTime(id) {
      let token = Taro.getStorageSync('authInfo:token');
      let result = token
        ? await api.AppointmentSaleBaseController.isInProgress(id)
        : await api.AppointmentSaleBaseController.isInProgressUnLogin(id);
      const { appointmentSaleVO } = result;

      if (token) {
        if (result.appointmentSaleVO) {
          this.isSubscriptionFlag(id);
        }
      }
      this.queryAppointmentOpentype(appointmentSaleVO);
      // action.commonChange('main.appointmentSaleVO', appointmentSaleVO);
    },

    /**
     * 获取服务时间
     */
    async queryServerTime() {
      const result: any = await api.systemController.queryServerTime();
      action.commonChange('main.serverTime', result);
    },

    /**
     * 获取预约时间
     */
    async queryPreBuyTimes(id) {
      let token = Taro.getStorageSync('authInfo:token');
      const result = token
        ? await api.AppointmentSaleBaseController.isInProgress(id)
        : await api.AppointmentSaleBaseController.isInProgressUnLogin(id);
      const { appointmentSaleVO } = result;
      this.queryAppointmentOpentype(appointmentSaleVO);
    },

    /**
     * 判断商品是否预售中
     */
    async queryPresaleisInProgress(id) {
      let token = Taro.getStorageSync('authInfo:token');
      let result = token
        ? await api.bookingSaleBaseController.isInProgress(id)
        : await api.bookingSaleBaseController.isInProgressUnLogin(id);
      await this.queryBookingOpentype(result.bookingSaleVO);

      action.commonChange('main.serverTime', result.serverTime);
    },

    /**
     *
     * 获取规则说明
     * @param res
     */
    async getRuleContent() {
      let res = await api.RuleInfoBaseController.getRuleContentAll();
      action.commonChange('main.ruleContent', res);
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

      //如果根据这个sku没找到对应商品，取第一个非失效SKU
      if (!goodsInfo) {
        goodsInfo = goodsInfoList.find((item) => {
          return item.addedFlag == 1;
        });
      }
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
        // goodsInfo.goodsInfoImg
        //   ? allImgsIm.push(goodsInfo.goodsInfoImg)
        //   : res.images.length > 0
        //   ? allImgsIm.push(res.images[0].artworkUrl)
        //   : allImgsIm.push('');
        // 拼接套餐子商品的图片
        goodsInfo.goodsInfoImg && allImgsIm.push(goodsInfo.goodsInfoImg);
        // if (allImgsIm.length > 0) {
        res.images.map((image) => {
          if (allImgsIm.length >= 10) {
            return;
          }
          allImgsIm.push(image.artworkUrl);
        });
        // }
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
     * 初始化属性信息
     */
    async _initProperty(goodsId) {
      if (goodsId) {
        const {
          goodsPropertyDetailRelVOList,
          goodsPropertyDetailVOList,
          goodsPropertyVOList,
          provinceVOList,
          countryVOList,
        } = await api.goodsInfoBaseController.getGoodsPropertyListForGoods(goodsId);
        let goodsProperty = {};
        if (goodsPropertyVOList.length > 0) {
          let characterPropertyList = goodsPropertyVOList?.filter((prop) => prop.propCharacter == 1) || [];
          goodsProperty = {
            characterPropertyList: characterPropertyList,
            goodsPropertyVOList: goodsPropertyVOList || [],
            goodsPropertyDetailVOList: goodsPropertyDetailVOList || [],
            goodsPropertyDetailRelVOList: goodsPropertyDetailRelVOList || [],
            provinceVOList: provinceVOList || [],
            countryVOList: countryVOList || [],
          };
        } else {
          goodsProperty = {
            characterPropertyList: [],
            goodsPropertyVOList: [],
            goodsPropertyDetailVOList: [],
            goodsPropertyDetailRelVOList: [],
            provinceVOList: [],
            countryVOList: [],
          };
        }

        return goodsProperty;
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
      let token = Taro.getStorageSync('authInfo:token');
      const flashsaleGoods = token
        ? await api.flashsaleGoodsController.isInProgress(goodsId)
        : await api.flashsaleGoodsController.isInProgressUnLogin(goodsId);
      await action.commonChange([
        { paths: 'main.flashsaleGodos', value: flashsaleGoods.flashSaleGoodsVOS },
        { paths: 'main.serverTime', value: flashsaleGoods.serverTime },
      ]);
    },

    /**
     * 收藏切换
     */
    async changeFollow(status, goodsInfoId) {
      //判断是否登录
      try {
        if (status) {
          await api.goodsFollowBaseController.add({ goodsInfoId });
        } else {
          await api.goodsFollowBaseController.delete_({ goodsInfoIds: [goodsInfoId] });
        }
        action.commonChange('main.collect', status);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 查看促销活动详情
     */
    async marketingDetail(id) {
      action.commonChange([{ paths: 'main.isPromotionShow', value: true }]);
      let token = Taro.getStorageSync('authInfo:token');
      if (!id) return;
      let context;
      if (token) {
        context = await api.marketingFullGiftController.getGiftByMarketingId(id);
      } else {
        context = await api.marketingFullGiftController.getGiftByMarketingIdWithOutLogin(id);
      }
      action.commonChange([
        { paths: 'main.gift', value: context.giftList },
        { paths: 'main.fullGiftLevelList', value: context.levelList },
      ]);
    },

    /**
     * 打开规格弹窗
     * openType:打开方式 1:商品详情底部、2:商品详情规格、3:商品列表、4:购物车、5:预约 6:预售
     */
    async openSpecModal(saleType, isPay, openType) {
      let { isPointsGoods } = getData().main;
      action.commonChange('main.openType', openType);
      if (isPointsGoods) {
        //积分商品规格弹框
        action.commonChange('main.pointsExchangeVisible', true);
      } else if (saleType == 0) {
        //批发规格弹窗
        action.commonChange('main.batchSpecIsShow', true);
        if (isPay) action.commonChange('main.isPay', true);
      } else {
        //零售规格弹窗
        if (isPay) action.commonChange('main.isPay', true);
        action.commonChange('main.retailSpecIsShow', true);
      }
    },

    /**
     * 更新组合购信息
     */
    async initMoreSuitInfo(skuId) {
      let marketingSuits;
      let token = Taro.getStorageSync('authInfo:token');
      const { storeInfo } = getData().main || {};
      //判断是否登录
      if (token) {
        marketingSuits = await api.marketingController.getMoreSuitsInfoForLogin({
          goodsInfoId: skuId,
          storeId: storeInfo?.storeId,
        });
      } else {
        marketingSuits = await api.marketingController.getMoreSuitsInfo({
          goodsInfoId: skuId,
        });
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.marketingSuits',
          value: marketingSuits.marketingMoreGoodsInfoResponseList,
        },
      });
    },

    async initShare(allImgsIm) {
      let { isPointsGoods, appointmentSaleVO, bookingSaleVO, flashsaleGodos, goodsInfo } = getData().main;
      let isAppointment = appointmentSaleVO && appointmentSaleVO.id;
      let isBooking = bookingSaleVO && bookingSaleVO.id;
      let flashsaleGoodsFlag;
      if (flashsaleGodos && flashsaleGodos.length > 0) {
        flashsaleGodos.map((v) => {
          if (v.goodsInfoId == goodsInfo.goodsInfoId && v.stock >= v.minNum) {
            flashsaleGoodsFlag = true;
          }
        });
      }
      //是否为分享商品
      let isDistribution =
        WMkit.isDistributor() &&
        !isPointsGoods &&
        !isAppointment &&
        !isBooking &&
        !flashsaleGoodsFlag &&
        goodsInfo.distributionGoodsAudit == '2' &&
        !goodsInfo.buyPoint;

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
    },

    async goodsShareRecorAdd() {
      let { goodsInfo } = getData().main;
      const loginData = _getStorageSync(cache.LOGIN_DATA);
      let customerId = loginData.customerId ? loginData.customerId : uuid();
      api.goodsShareRecordController.add({
        storeId: goodsInfo.storeId,
        companyInfoId: goodsInfo.companyInfoId,
        customerId: customerId,
        goodsId: goodsInfo.goodsId,
        goodsInfoId: goodsInfo.goodsInfoId,
      });
    },

    /**
     * 是否展示商品属性特性参数弹框
     * @param visible
     */
    openPropsCharacterModal(visible) {
      action.commonChange('main.goodsPropertyModalVisible', visible);
    },

    async initAddress() {
      // 缓存默认地址
      let address = Taro.getStorageSync('mini::confirmAddress');
      let list = [];
      let defaultAddress = null;
      if (WMkit.isLogin()) {
        list = await findAddressList();
      }
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        // 省、市、区（县）、街道（乡）+ 详细地址
        item['addressInfo'] = _.getAddressInfoStr(item as any)
        if (item.isDefaltAddress != 0) {
          defaultAddress = item;
        }
      }
      if (!defaultAddress && list.length > 0) {
        defaultAddress = list[0];
      }
      if (address && address.deliveryAddressId) {
        // 是否有效
        const addr = list.find((item) => item.deliveryAddressId === address.deliveryAddressId);
        if (addr) {
          defaultAddress = addr;
        }
      }
      if (defaultAddress && defaultAddress.deliveryAddressId) {
        //地址缓存
        Taro.setStorageSync('mini::confirmAddress', defaultAddress);
        // 优先取缓存中的收货地址，接口返回的收货地址兜底
        Taro.setStorageSync('mini::shopCardAddress', defaultAddress);
        // 检验是否需要完善四级地址
        const r = await api.platformAddressController.verifyAddress({
          provinceId: defaultAddress.provinceId,
          cityId: defaultAddress.cityId,
          areaId: defaultAddress.areaId,
          streetId: defaultAddress.streetId,
          longitude: defaultAddress.longitude,
          latitude: defaultAddress.latitude,
          dangaossAddrId: defaultAddress.dangaossAddrId
        });
        if (r) {
          defaultAddress.needComplete = true;
        }
      }
      action.commonChange('main.address', defaultAddress || {});
      return defaultAddress
    },
    async initRestrictedTemplate(goodsId: string) {
      const { address } = getData().main
      const res = await api.goodsBaseController.getGoodsRestrictedTemplateInfo({
        goodsId,
        provinceId: address.provinceId,
        cityId: address.cityId,
        areaId: address.areaId,
        streetId: address.streetId,
      }) as any
      action.commonChange([
        { paths: 'main.goodsRestrictedTemplateVO', value: res.goodsRestrictedTemplateVO },
      ]);
    },
    async initDangaoRestricted(goodsNo: string, skuNo: string, thirdBrandId: string) {
      const { address } = getData().main
      const res = await api.goodsBaseController.getGoodsDangaoRestrictedInfo({
        goodsNo,
        skuNo,
        thirdBrandId,
        dangaossAddrId: address.dangaossAddrId,
        platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null
      }) as any
      action.commonChange([
        { paths: 'main.dangaoRestrictedVO', value: res },
      ]);
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsDetailsMain'),
  };
}

function uuid() {
  let s = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

//create by moon https://github.com/creasy2010/moon
