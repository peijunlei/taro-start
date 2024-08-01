import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import api from 'api';

const windowWidth = Taro.getSystemInfoSync().windowWidth;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async page() {
      let {form, goodsList} = getData().main;
      const res = await api.goodsInfoBaseController.shopSkuList(form);
      action.commonChange([
        {paths: 'main.isLoadingList', value: true},
        {paths: 'main.load', value: true},
        {paths: 'main.totalSmallPages', value: (res as any).esGoodsInfoPage.totalPages},
      ]);
      if (form.pageNum == 0) {
        let newRows = res.esGoodsInfoPage.content.map((item, index) => {
          return {
            y: index * 114,
            tranX: 0,
            tranY: index * 114,
            index: index,
            ...item,
          };
        });
        action.commonChange([
          {paths: 'main.movableViewHeight', value: newRows.length * 114},
          {paths: 'main.goodsList', value: newRows},
        ]);
      } else {
        let newdatas = goodsList.concat(res.esGoodsInfoPage.content).map((item, index) => {
          return {
            y: index * 114,
            tranX: 0,
            tranY: index * 114,
            index: index,
            ...item,
          };
        });
        action.commonChange([
          {paths: 'main.movableViewHeight', value: newdatas.length * 114},
          {paths: 'main.goodsList', value: newdatas},
        ]);
      }
      action.commonChange('main.isLoadingList', false);
    },
    async pageSmall() {
      let {formSmall = {}, goodsListSmall} = getData().main;
      const res1 = await api.goodsInfoBaseController.shopSkuList(formSmall);
      action.commonChange([{paths: 'main.totalPages', value: (res1 as any).esGoodsInfoPage.totalPages}]);

      let widthInfo = Math.ceil((windowWidth - 24) / 3);
      if (formSmall.pageNum == 0) {
        let sHeight = Math.ceil(res1.esGoodsInfoPage.content.length / 3) * widthInfo;
        action.commonChange([{paths: 'main.movableSmallHeight', value: sHeight}]);
        let newRows = res1.esGoodsInfoPage.content.map((item, index) => {
          return {
            index: index,
            ...item,
          };
        });
        //一维数组转三维数组
        let datas = await this.splitArray(newRows, 3);
        datas.forEach((data, yIndex) => {
          data.forEach((item, xIndex) => {
            item.y = yIndex * widthInfo;
            item.x = xIndex * widthInfo;
            item.tranX = xIndex * widthInfo;
            item.tranY = yIndex * widthInfo;
          });
        });
        //多维数组转一维
        let newArr = datas.flat();
        action.commonChange([{paths: 'main.goodsListSmall', value: newArr}]);
      } else {
        let newDatas = goodsListSmall.concat(res1.esGoodsInfoPage.content).map((item, index) => {
          return {
            index: index,
            ...item,
          };
        });
        let smHeight = Math.ceil(newDatas.length / 3) * widthInfo;
        action.commonChange([{paths: 'main.movableSmallHeight', value: smHeight}]);
        //一维数组转三维数组
        let datums = await this.splitArray(newDatas, 3);
        datums.forEach((data, yIndex) => {
          data.forEach((item, xIndex) => {
            item.y = yIndex * widthInfo;
            item.x = xIndex * widthInfo;
            item.tranX = xIndex * widthInfo;
            item.tranY = yIndex * widthInfo;
          });
        });
        //多维数组转一维
        let lists = datums.flat();
        action.commonChange([{paths: 'main.goodsListSmall', value: goodsListSmall.concat(lists)}]);
      }
    },
    //一维数组转多维数组
    async splitArray(aim, size) {
      var result = [];
      var tempArray;
      for (var count = 0; count < aim.length; count++) {
        if (count % size == 0) {
          if (tempArray) {
            result.push(tempArray);
          }
          tempArray = [];
        }

        tempArray[tempArray.length] = aim[count];
        if (count + 1 == aim.length) {
          result.push(tempArray);
        }
      }
      return result;
    },

    async save(data) {
      let {isLarge} = getData().main;
      let goodsArray = new Array();
      data.map((value, index, array) => {
        const goods = {
          id: value.goodsInfo.distributionGoodsInfoId,
          goodsInfoId: value.goodsInfo.goodsInfoId,
          goodsId: value.goodsInfo.goodsId,
          sequence: index,
          storeId: value.goodsInfo.storeId,
        };
        goodsArray.push(goods);
      });
      await api.distributorGoodsInfoController.modifySequence({distributorGoodsInfoDTOList: goodsArray});
      if (isLarge) {
        await this.page();
      } else {
        await this.pageSmall();
      }
    },

    //h5保存
    async saveH5(data) {
      let goodsArray = new Array();
      data.map((value, index, array) => {
        const goods = {
          id: value.goodsInfo.distributionGoodsInfoId,
          goodsInfoId: value.goodsInfo.goodsInfoId,
          goodsId: value.goodsInfo.goodsId,
          sequence: index,
          storeId: value.goodsInfo.storeId,
        };
        goodsArray.push(goods);
      });
      await api.distributorGoodsInfoController.modifySequence({distributorGoodsInfoDTOList: goodsArray});
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {form, totalSmallPages} = getData().main;
      let num = form.pageNum + 1;
      if (num == totalSmallPages) return;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.page();
    },
    /**
     * 查询下一页
     */
    async nextPageSmall() {
      let {formSmall = {}, totalPages} = getData().main || {};
      let num = formSmall.pageNum + 1;
      if (num == totalPages) return;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.formSmall.pageNum',
          value: num,
        },
      });
      await this.pageSmall();
    },
    async delete(goodsInfoId) {
      let {isLarge} = getData().main;
      //删除分销商品
      await api.distributorGoodsInfoController.deleteF({goodsInfoId: goodsInfoId});
      if (isLarge) {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.form.pageNum',
            value: 0,
          },
        });
        Taro.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        });
        action.page();
      } else {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.formSmall.pageNum',
            value: 0,
          },
        });
        Taro.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        });
        action.pageSmall();
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageBDistributionShopShopIndexCMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
