import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {UploadImage} from 'wmkit';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //上传图片
    async _chooseImage() {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      const {context} = await UploadImage();
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.enclosures',
          value: (enclosures) => {
            return enclosures.push(context[0]);
          },
        },
      });
    },
    //删除图片
    async _deleteImage(key) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.enclosures',
          value: (enclosures) => {
            enclosures.splice(key, 1);
          },
        },
      });
    },

    async save() {
      const {
        isShow,
        evaluateType,
        storeEvaluate,
        orderEvaluate,
        enclosures,
        storeInfo,
        orderBaseInfo,
        tid,
      } = getData().main;
      const {goodsScore, serverScore, logisticsScore} = storeEvaluate;
      const {evaluateScore, evaluateContent} = orderEvaluate;
      if (evaluateType == 0) {
        if (isShow == 0) {
          if (!goodsScore && !serverScore && !logisticsScore) {
            if (!evaluateScore) {
              Taro.showToast({
                title: '商品评分不可为空',
                icon: 'none',
                duration: 2000,
              });
              return false;
            } else if (!evaluateContent || evaluateContent.trim() == '') {
              Taro.showToast({
                title: '评价晒图文本不可为空',
                icon: 'none',
                duration: 2000,
              });
              return false;
            }
          } else if (!evaluateScore) {
            Taro.showToast({
              title: '商品评分不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          } else if (!evaluateContent || evaluateContent.trim() == '') {
            Taro.showToast({
              title: '评价晒图文本不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          } else if (!goodsScore) {
            Taro.showToast({
              title: '商品质量不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          } else if (!serverScore) {
            Taro.showToast({
              title: '店家服务态度不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          } else if (!logisticsScore) {
            Taro.showToast({
              title: '物流发货速度不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          }
        } else if (isShow != 0) {
          //待评价标签点击进来且服务已评价
          if (!evaluateScore) {
            Taro.showToast({
              title: '商品评分不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          } else if (!evaluateContent || evaluateContent.trim() == '') {
            Taro.showToast({
              title: '评价晒图文本不可为空',
              icon: 'none',
              duration: 2000,
            });
            return false;
          }
        }
      } else if (evaluateType == 1) {
        //评价服务标签点击进来的时候
        if (!goodsScore) {
          Taro.showToast({
            title: '商品质量不可为空',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else if (!serverScore) {
          Taro.showToast({
            title: '店家服务态度不可为空',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else if (!logisticsScore) {
          Taro.showToast({
            title: '物流发货速度不可为空',
            icon: 'none',
            duration: 2000,
          });
          return false;
        }
      }
      const evaluateAddRequest = {
        storeEvaluateAddRequestList: {
          ...storeEvaluate,
          orderNo: tid,
        },
        goodsEvaluateAddRequest: {
          ...orderEvaluate,
          goodsInfoId: orderBaseInfo.skuId,
          orderNo: tid,
        },
        goodsEvaluateImageAddRequest: enclosures.map((item) => {
          return {
            imageName: item.toString().substring(item.length - 15, item.length),
            artworkUrl: item,
          };
        }),
      };
      await api.goodsEvaluateController.addGoodsEvaluate(evaluateAddRequest);
      // Taro.navigateTo({
      //   url: `/pages/package-A/customer/evaluate-center/index?refresh=0`,
      // });
      Taro.navigateBack({delta: 1});
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerEvaluateDryingMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
