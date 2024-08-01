import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import Taro from '@tarojs/taro';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {_, UploadImage, FormRegexUtil,immutable} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 修改sku数量
     * @param skuId
     * @param skuNum
     */
    changeNum(skuId: string, skuNum: number) {
      const {
        main: {skus},
      } = getData();
      // 1.修改退货商品数量
      const index = skus.findIndex((sku) => sku.skuId == skuId);
      skus[index].num = skuNum;
      action.commonChange({paths: 'main.skus', value: skus});
      const skuIndex = skus.findIndex((item) => item.skuId == skuId && item.skuChecked);
      if (skuIndex > -1) {
        this._setReturnGifts();
      }
      this._checkedAllPrice();
    },
    /**
     * 设置退货赠品数量
     */
    async _setReturnGifts() {
      const tradeState = getData().main;
      // const allReturnGifts = tradeState.allReturnGifts;
      const tradeMarketings = immutable.fromJS(tradeState.tradeMarketings);
      if (tradeMarketings && tradeMarketings.size > 0) {
        const giftMarketings = tradeMarketings.filter((tradeMarketing) => tradeMarketing.get('marketingType') == 2); //找到满赠活动
        if (giftMarketings && giftMarketings.size > 0) {
          const tradeItems = immutable.fromJS(tradeState.originTradeItems); //订单中的所有商品
          const giftItems = immutable.fromJS(tradeState.gifts); //订单中的赠品
          const comReturnOrders = immutable.fromJS(tradeState.returnOrderList); //该订单之前已完成的退单list(分批退单的场景)
          let comReturnSkus = immutable.fromJS({}); //已经退的商品汇总(根据skuId汇总所有商品的数量)
          const currReturnSkus = immutable.fromJS(tradeState.skus).filter((item) => item.get('skuChecked')); //本次勾选需要退的商品汇总
          // let allReturnGifts = immutable.fromJS({}); //可能需要退的赠品汇总
          action.commonChange([{paths: 'main.allReturnGifts', value: {}}]);
          let comReturnGifts = immutable.fromJS({}); //已经退的赠品汇总

          // 1.汇总已经退的商品与赠品
          comReturnOrders.forEach(async (reOrder) => {
            reOrder.get('returnItems').forEach((returnItem) => {
              const currItem = comReturnSkus.get(returnItem.get('skuId'));
              if (currItem) {
                comReturnSkus = comReturnSkus.set(
                  returnItem.get('skuId'),
                  currItem.set('num', currItem.get('num') + returnItem.get('num')),
                );
              } else {
                comReturnSkus = comReturnSkus.set(returnItem.get('skuId'), returnItem);
              }
            });

            if (reOrder.get('returnGifts')) {
              reOrder.get('returnGifts').forEach((returnGift) => {
                // 赠品的拼接id 多处需要使用
                const id = returnGift.get('marketingId') + '_' + returnGift.get('skuId');
                const currGiftItemNum = comReturnGifts.get(id);
                if (currGiftItemNum) {
                  comReturnGifts = comReturnGifts.set(id, currGiftItemNum + returnGift.get('num'));
                } else {
                  comReturnGifts = comReturnGifts.set(id, returnGift.get('num'));
                }
              });
            }
          });

          // 2.遍历满赠营销活动list,验证每个活动对应的剩余商品(购买数量或金额-已退的总数或总金额)是否还满足满赠等级的条件
          //   PS: 已退的总数或总金额分为两部分: a.该订单关联的所有已完成的退单的商品 b.本次用户准备退货的商品
          giftMarketings.forEach((giftMarketing) => {
            if (4 == giftMarketing.get('subType')) {
              const leftSkuAmount = giftMarketing
                .get('skuIds')
                .map((skuId) => {
                  // 订单中全部商品中包含赠品的index
                  const skuItem = tradeItems.get(tradeItems.findIndex((item) => item.get('skuId') == skuId));
                  // 已退商品中包含赠的item
                  const comReSkuCount = comReturnSkus.get(skuId) ? comReturnSkus.get(skuId).get('num') : 0;
                  // 当前选中商品中包含对应赠品的index
                  const indexTmp = currReturnSkus.findIndex((item) => item.get('skuId') == skuId);
                  const currReSkuCount = indexTmp > -1 ? currReturnSkus.get(indexTmp).get('num') : 0;
                  return skuItem.get('levelPrice') * (skuItem.get('deliveredNum') - comReSkuCount - currReSkuCount); //某商品的发货商品价格 - 已退商品价格 - 当前准备退的商品价格
                })
                .reduce((sum, x) => sum + x, 0); //剩余商品价格汇总

              // 3.若不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中(若满足满赠条件,则无需退赠品)
              if (leftSkuAmount < giftMarketing.get('giftLevel').get('fullAmount')) {
                action.commonChange([{paths: 'main.giftFlag', value: 1}]);
                this._setReturnGiftsMap(immutable.fromJS(getData().main.allReturnGifts), giftMarketing);
                // allReturnGifts = this._setReturnGiftsMap(
                //   allReturnGifts,
                //   giftMarketing
                // );
              } else {
                action.commonChange([{paths: 'main.giftFlag', value: 0}]);
              }
            } else if (5 == giftMarketing.get('subType')) {
              const leftSkuCount = giftMarketing
                .get('skuIds')
                .map((skuId) => {
                  const skuItem = tradeItems.get(tradeItems.findIndex((item) => item.get('skuId') == skuId));
                  const comReSkuCount = comReturnSkus.get(skuId) ? comReturnSkus.get(skuId).get('num') : 0;
                  const indexTmp = currReturnSkus.findIndex((item) => item.get('skuId') == skuId);
                  const currReSkuCount = indexTmp > -1 ? currReturnSkus.get(indexTmp).get('num') : 0;
                  return skuItem.get('deliveredNum') - comReSkuCount - currReSkuCount; //某商品的发货商品数 - 已退商品数 - 当前准备退的商品数
                })
                .reduce((sum, x) => sum + x, 0); //剩余商品数量汇总

              // 3.若不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中(若满足满赠条件,则无需退赠品)
              if (leftSkuCount < giftMarketing.get('giftLevel').get('fullCount')) {
                action.commonChange([{paths: 'main.giftFlag', value: 1}]);
                this._setReturnGiftsMap(immutable.fromJS(getData().main.allReturnGifts), giftMarketing);
                // allReturnGifts = this._setReturnGiftsMap(
                //   allReturnGifts,
                //   giftMarketing
                // );
              } else {
                action.commonChange([{paths: 'main.giftFlag', value: 0}]);
              }
            }
          });
          // 4.设置具体的退单赠品信息
          setTimeout(async () => {
            await this._updateReturnGift(giftItems, immutable.fromJS(getData().main.allReturnGifts), comReturnGifts);
          }, 0);
        }
      }
    },

    /**
     * 更新具体的退单赠品数量信息
     * @param giftItems 订单中可退的赠品
     * @param allReturnGifts 不满足满赠条件,满赠营销活动中所有需要退的赠品信息
     * @param comReturnGifts 所有已完成退单中的退掉的赠品信息
     */
    async _updateReturnGift(giftItems, allReturnGifts, comReturnGifts) {
      // 本次退单的退货赠品总数: 每个商品所有退货赠品数量 - 之前所有退单中已经退掉的赠品总数
      //   PS: 为了保证退单中赠品顺序与订单中的赠品顺序一致,遍历订单赠品,依次计算得出本次退单需要退的赠品list
      let newGiftItems = giftItems.map((tradeItem) => {
        // 赠品商品的拼接id 多处需要使用
        const id = tradeItem.get('marketingIds').first() + '_' + tradeItem.get('skuId');
        let readyGiftItemNum = immutable.fromJS(allReturnGifts).get(id) || 0; //准备退的数量
        const totalNum = tradeItem.get('deliveredNum') || 0; //发货总数
        readyGiftItemNum = readyGiftItemNum < totalNum ? readyGiftItemNum : totalNum;
        const comGiftItemNum = comReturnGifts.get(id) || 0; //之前已完成退单已经退掉的数量
        const currNum = readyGiftItemNum - comGiftItemNum;
        if (currNum > 0) {
          return tradeItem.set('num', currNum); //设置退的赠品数量,并勾选赠品
        } else {
          return tradeItem.set('num', 0);
        }
      });
      const {
        main: {giftFlag},
      } = getData();
      if (giftFlag === 1) {
        newGiftItems = newGiftItems.map((gift) => gift.set('giftChecked', true));
      }
      action.commonChange([{paths: 'main.gifts', value: newGiftItems.toJS()}]);
    },

    /**
     * 不满足满赠条件时,需要退的所有赠品
     * @param allReturnGifts 可能需要退的赠品汇总
     * @param giftMarketing 某个满赠营销活动
     * @return allReturnGifts 返回 不满足满赠条件,满赠营销活动中所有需要退的赠品信息,形如{'sku001':3,'sku002':1}
     */
    _setReturnGiftsMap(allReturnGifts, giftMarketing) {
      // let allReturnGifts = allReturnGifts;
      // 不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中
      giftMarketing
        .get('giftLevel')
        .get('fullGiftDetailList')
        .forEach((gift) => {
          // 赠品的拼接id 多处需要使用
          const id = gift.get('marketingId') + '_' + gift.get('productId');
          let currGiftItemCount = allReturnGifts.get(id);
          if (currGiftItemCount) {
            allReturnGifts = allReturnGifts.set(id, currGiftItemCount + gift.get('productNum'));
          } else {
            allReturnGifts = allReturnGifts.set(id, gift.get('productNum'));
          }
        });
      action.commonChange([{paths: 'main.allReturnGifts', value: allReturnGifts.toJS()}]);
    },
    /**
     * 退货商品全选
     * @param checked
     */
    checkAll(checked) {
      const {
        main: {skus, gifts},
      } = getData();
      const skusNew = immutable.fromJS(skus).map((sku) => sku.set('skuChecked', !checked));
      const giftNew = immutable.fromJS(gifts).map((sku) => sku.set('giftChecked', !checked));
      // 1.全选退货商品
      action.commonChange([{paths: 'main.skus', value: skusNew.toJS()}]);
      action.commonChange([{paths: 'main.gifts', value: giftNew.toJS()}]);
      this._checkedAllPrice();
      // 2.判断是否需要勾选赠品,以及赠品数量
      this._setReturnGifts();
    },
    /*
      单选
    */
    checkOne(skuId) {
      let {
        main: {skus},
      } = getData();
      const index = skus.findIndex((sku) => skuId == sku.skuId);
      const skusNew = immutable.fromJS(getData().main).setIn(['skus', index, 'skuChecked'], !skus[index].skuChecked);

      action.commonChange([{paths: 'main.skus', value: skusNew.toJS().skus}]);
      this._checkedAllPrice();
      this._setReturnGifts();
    },

    /*
     赠品选择
     */
    checkGift(skuId) {
      let {
        main: {gifts, giftFlag},
      } = getData();
      if (giftFlag !== 1) {
        const giftNew = immutable.fromJS(gifts).map((sku) => sku.set('giftChecked', !sku.get('giftChecked')));
        action.commonChange([{paths: 'main.gifts', value: giftNew.toJS()}]);
      }

      // 2.判断是否需要勾选赠品,以及赠品数量
      this._setReturnGifts();
    },
    /**
     * 检测可退数量(退货退款的第一步)
     * @param cb
     */
    async returnSkuSecond() {
      const {
        main: {tid, skus, gifts, newPoints, newPrice},
      } = getData();
      let param = immutable.Map();
      param = param.set('tid', tid);
      // 退货商品信息
      let tradeItems = skus;
      // 只保存退货商品数量大于0的商品
      tradeItems = tradeItems.filter((item) => item.skuChecked && item.num > 0);
      let returnGift = false;
      if (gifts && gifts.length > 0) {
        returnGift = gifts.every((sku) => sku.giftChecked) || false;
      }
      // 如果所有商品的退货数量都为0
      if (tradeItems.length == 0) {
        Taro.showToast({
          title: '请选择退货商品',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      param = param.set('returnItems', tradeItems);
      param = param.set('returnPrice', {
        totalPrice: newPrice,
      });
      param = param.set('returnPoints', {
        applyPoints: Math.floor(newPoints),
      });
      param = param.set('returnGift', returnGift);
      await api.returnOrderController.transfer(param.toJS());
      Taro.navigateTo({
        url: `/pages/package-C/order/return-refund/return-second-step/index?tid=${tid}`,
      });
      return;
    },
    /**
     * 获取全部选中sku的价格，如果是退款申请，直接取订单应付金额
     * 1.选中
     * 2.可退数量 > 0
     * 3.价格*可退数量
     * 4.累加
     */
    _checkedAllPrice() {
      let {
        main: {skus, isReturn, totalPrice, tradePoints},
      } = getData();
      if (isReturn) {
        const price =
          skus
            .filter((sku) => sku.skuChecked)
            .map((sku) => {
              if (sku.num < sku.canReturnNum) {
                //小于可退数量,直接单价乘以数量
                return _.mul(sku.price, sku.num);
              } else {
                //大于等于可退数量 , 使用分摊小计金额 - 已退金额(单价*(购买数量-可退数量))
                return _.sub(sku.splitPrice, _.mul(sku.price, _.sub(sku.skuBuyNum, sku.canReturnNum)));
              }
            })
            .reduce((one, two) => _.add(one, two), 0) || 0;
        const points =
          skus
            .filter((sku) => sku.skuChecked)
            .map((sku) => {
              if (sku.num < sku.canReturnNum) {
                //小于可退数量,直接单价乘以数量
                return _.mul(sku.skuPoint, sku.num);
              } else {
                //大于等于可退数量 , 使用分摊小计金额 - 已退金额(单价*(购买数量-可退数量))
                return _.sub(sku.points || 0, Math.floor(_.mul(sku.skuPoint, _.sub(sku.skuBuyNum, sku.canReturnNum))));
              }
            })
            .reduce((one, two) => _.add(one, two), 0) || 0;

        action.commonChange([
          {paths: 'main.newPrice', value: price},
          {paths: 'main.newPoints', value: points},
        ]);
      } else {
        action.commonChange([
          {paths: 'main.newPrice', value: totalPrice},
          {paths: 'main.newPpoints', value: tradePoints},
        ]);
      }
    },
    /**
     * 修改退货方式/原因/说明
     */
    changeFromValue(path, v) {
      action.commonChange([{paths: `main.${path}`, value: v}]);
    },
    //上传图片
    async _chooseImage(images) {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      //图片大小不能超过5M
      const FILE_MAX_SIZE = 500 * 1024 * 10;
      const {context} = await UploadImage(FILE_MAX_SIZE);
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.images',
          value: (images) => {
            return images.push(context[0]);
          },
        },
      });
    },
    //删除图片
    async _deleteImage(key) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.images',
          value: (images) => {
            images.splice(key, 1);
          },
        },
      });
    },
    /**
     * 提交申请(仅退款的提交 / 退货退款第二步)
     */
    async applyReturns() {
      let {
        main: {
          skus,
          gifts,
          tid,
          selectedReturnReason,
          newPrice,
          images,
          isReturn,
          selectedReturnWay,
          description,
          totalPrice,
          giftSecond,
          returnOrderList,
        },
      } = getData();
      let param = immutable.Map();
      let isProviderOrder = false;
      param = param.set('tid', tid);

      if (
        !FormRegexUtil(selectedReturnReason, '退货原因', {
          required: true,
        })
      ) {
        return;
      }

      // 退货原因
      param = param.set('returnReason', immutable.Map().set(selectedReturnReason, 0));
      // 退单附件
      param = param.set(
        'images',
        images.map((item, i) => {
          // 上传成功的图片才保存
          return JSON.stringify({
            uid: i + 1,
            status: 'done',
            url: item,
          });
        }),
      );

      // 退货申请
      if (isReturn) {
        // 只保存退货商品数量大于0的商品
        skus = skus.filter((item) => item.num > 0);
        // 如果所有商品的退货数量都为0
        if (skus.length == 0) {
          Taro.showToast({
            title: '请填写退货数量',
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        if (
          !FormRegexUtil(selectedReturnWay, '退货方式', {
            required: true,
          })
        ) {
          return;
        }
        // 退货方式
        param = param.set('returnWay', immutable.Map().set(selectedReturnWay, 0));

        //退货申请需要判断 退货的商品和赠品 是否存在
        // 1、至少一个商家商品和一个供应商商品
        // 2、只有供应商商品，供应商商家需要大于等于两家
        // 才会进行弹框提示

        //商家商品List
        let goodsZiYing = skus.concat(giftSecond).filter((item) => !item.providerId);

        //供应商商品List
        let obj = {};
        let goodsProvider = skus
          .concat(giftSecond)
          .filter((item) => item.providerId != null && item.providerId != undefined)
          .reduce((cur, next) => {
            obj[next.providerId] ? '' : (obj[next.providerId] = true && cur.push(next));
            return cur;
          }, []);

        if (goodsProvider.length > 1 || (goodsZiYing.length > 0 && goodsProvider.length > 0)) {
          isProviderOrder = true;
        }
      } else {
        //如果拆分成多笔退单则弹出提示
        let providerGoodsInfo = skus.concat(gifts).filter((item) => {
          //过滤已退款完成的商品
          const flag = getReturnVal(returnOrderList, item);
          return !flag && item.providerId != null && item.providerId != undefined;
        });
        let goodsInfo = skus.concat(gifts).filter((item) => {
          //过滤已退款完成的商品
          const flag = getReturnVal(returnOrderList, item);
          return !flag && !item.providerId;
        });
        let providerIds = providerGoodsInfo.map((goodsInfo) => {
          return goodsInfo.providerId;
        });
        providerIds = Array.from(new Set(providerIds)); //供应商Id去重
        if (providerIds.length > 1 || (goodsInfo.length > 0 && providerIds.length > 0)) {
          isProviderOrder = true;
        }
      }
      if (
        !FormRegexUtil(description.trim(), '退货说明', {
          required: true,
          minLength: 1,
          maxlength: 100,
        })
      ) {
        return;
      }
      // 退货说明
      param = param.set('description', description.trim());
      param = param.set('returnItems', skus);
      this._checkedAllPrice();
      // 退款金额，退货是商品总额，退款是应付金额
      totalPrice = isReturn ? newPrice : totalPrice;
      param = param.set('returnPrice', {
        applyStatus: false,
        applyPrice: 0,
        totalPrice: totalPrice,
      });

      let returnGift;
      if (gifts && gifts.length > 0) {
        returnGift = gifts.every((sku) => sku.giftChecked) || false;
      }
      param = param.set('returnGift', returnGift);
      let result;
      if (isReturn) {
        result = await api.returnOrderController.create(param.toJS());
      } else {
        result = await api.returnOrderController.createRefund(param.toJS());
      }
      Taro.showToast({
        title: '退单提交成功',
        icon: 'none',
        duration: 2000,
        success: () => {
          console.log('haha');
          setTimeout(async () => {
            if (isProviderOrder) {
              Taro.showModal({
                title: '',
                content: '您的申请包含多个仓库或发货地址发出的商品，已自动为您拆分为多笔退单',
                showCancel: false,
                confirmText: '好的',
              }).then(async (res) => {
                if (res.confirm) {
                  try {
                    await Taro.navigateTo({
                      url: '/pages/package-C/order/refund-list/index',
                    });
                  } catch (e) {}
                }
              });
            } else {
              await Taro.redirectTo({
                url: `/pages/package-C/order/return-refund/return-refund-success/index?rid=${result}`,
              });
            }
          }, 2000); //延迟时间
        },
      });

      // if (result.code == 'K-000000') {
      //   history.push(`/applySuccess/${result.context}`);
      // } else {
      //   Alert({
      //     text: result.message
      //   });
      //   return;
      // }
    },

    /**
     *
     */
    async() {},
  };
  return action;
};

/**
 * 判断sku是否退款完成
 * @param returnOrderList
 * @param sku
 */
function getReturnVal(returnOrderList, sku) {
  let flag = false;
  returnOrderList.forEach((returnOrder) => {
    returnOrder.returnItems.forEach((returnItem) => {
      if (returnItem.skuId == sku.skuId) {
        flag = true;
      }
    });
    returnOrder.returnGifts.forEach((returnItem) => {
      if (returnItem.skuId == sku.skuId) {
        flag = true;
      }
    });
  });
  return flag;
}

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCReturnRefundMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
