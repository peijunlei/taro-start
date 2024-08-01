import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import {ifLogin} from '@/utils/common-functions';

import {detailForWeb, unLoginDetail, lotteryDraw} from 'api/DrawActivityController';
import {cloneDeep} from 'lodash';
import thanks from '@/assets/image/draw/thanks.png';
import startBtn from '@/assets/image/draw/start-btn.png';
import startBtnDisable from '@/assets/image/draw/start-point-disable.png';
import whellEmpty from '@/assets/image/draw/whell-empty.png';
import dayjs from 'dayjs';
import {findCustomerInfo} from 'api/PointsMallController';

let toggle = {
  timer: null, // 定时器
  startTime: 0, // 开始时间
  endTime: 0, // 结束时间
  minDuration: 2000, // 至少转几秒
  index: -1, // 旋转过程中 选中的下标 index （0-7）
  countIndex: 0, // 旋转过程中 选中的下标 index （0-7）
  count: 8, //奖项数
  prizeId: -1, //奖品ID
  click: false, // 当前是否已点击过
  cycle: 10,
  speed: 60,
};

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async unloadTimer() {
      //清除定时器
      await clearTimeout(toggle.timer);
      //转盘配置初始化
      toggle = {
        timer: null, // 定时器
        startTime: 0, // 开始时间
        endTime: 0, // 结束时间
        minDuration: 2000, // 至少转几秒
        index: -1, // 旋转过程中 选中的下标 index （0-7）
        countIndex: 0, // 旋转过程中 选中的下标 index （0-7）
        count: 8, //奖项数
        prizeId: -1, //奖品ID
        click: false, // 当前是否已点击过
        cycle: 10,
        speed: 60,
      };
    },

    async initData(activityId) {
      const isLogin = ifLogin();
      action.commonChange('main.loading',true)
      try {
        //区分登录获取接口
        const res = isLogin ? await detailForWeb({activityId}) : await unLoginDetail({activityId});
        const points = isLogin && (await findCustomerInfo());
        const pointsAvailable = points && typeof points.pointsAvailable === 'number' ? points.pointsAvailable : null;
        const {
          activityName,
          drawTimesType,
          endTime,
          id,
          leftDrawCount,
          prizeVOList,
          startTime,
          activityContent,
          notAwardTip,
          maxAwardTip,
          pauseFlag,
          formType,
          drawType,
          consumePoints,
        } = res.drawDetail;
        let wheelButtons;
        // 此处prizes如提到方法外会导致初次转盘展示异常
        let prizes = [
          {
            fonts: [{text: '0', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '1', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '2', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '3', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '4', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '5', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '6', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
          {
            fonts: [{text: '7', top: '10%', fontColor: '#ff6600', fontSize: 12, lineClamp: 1}],
            imgs: [
              {
                src: thanks,
                width: 50,
                height: 50,
                top: '30%',
              },
            ],
            background: '#fff',
          },
        ];
        // 大转盘抽奖需要处理奖品列表数据
        if (formType === 1) {
          let prizeVOList2 = cloneDeep(prizeVOList);
          prizes.forEach((item, key) => {
            item.fonts[0].text = prizeVOList2[key].prizeName;
            item.imgs[0].src = prizeVOList2[key].prizeUrl || thanks;
          });
          wheelButtons = [
            {radius: '50px'},
            {
              pointer: true,
              fonts: [{text: '立即抽奖', top: 10, fontSize: 10, fontColor: '#fff'}],
              imgs: [{src: startBtn, width: 100, height: 120, top: -70}],
            },
          ];
          // 抽奖按钮
          if (dayjs().isAfter(startTime) && dayjs().isBefore(endTime) && pauseFlag != 1) {
            // 积分抽奖时
            if (drawType === 1 && consumePoints) {
              wheelButtons[1].fonts[0].text = `消耗${consumePoints}积分`;
            }
            if (leftDrawCount > 0) {
              wheelButtons[1].imgs[0].src = startBtn;
            } else {
              wheelButtons[1].imgs[0].src = startBtnDisable;
            }
          }
          // 活动未开始
          if (dayjs().isBefore(startTime)) {
            const fonts = [{text: '活动\n未开始', top: -20, fontSize: 18, fontColor: '#fff'}];
            wheelButtons[1].imgs[0].src = whellEmpty;
            wheelButtons[1].fonts = fonts;
          }
          // 活动已结束或已暂停
          if (dayjs().isAfter(endTime) || pauseFlag == 1) {
            const fonts = [
              {
                text: dayjs().isAfter(endTime) ? '活动\n已结束' : '活动\n已暂停',
                top: -20,
                fontSize: 18,
                fontColor: '#fff',
              },
            ];
            wheelButtons[1].imgs[0].src = whellEmpty;
            wheelButtons[1].fonts = fonts;
          }
        } else {
          prizes = [];
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              id,
              activityName,
              startTime,
              endTime,
              drawTimesType,
              leftDrawCount,
              formType,
              prizeList: prizeVOList,
              wheelPrizes: prizes,
              wheelButtons: wheelButtons,
              activityId,
              activityContent,
              tipsNotWin: notAwardTip,
              drawType,
              maxAwardTip,
              pauseFlag,
              pointsAvailable,
              consumePoints,
            },
          },
        });
        action.commonChange('main.loading',false)
      } catch (e) {
        console.log(e);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              leftDrawCount: 0,
              prizeList: [],
              wheelPrizes: [],
              activityId,
            },
          },
        });
        action.commonChange('main.loading',false)
      }
    },

    async startLuckyWheel(that) {
      const {maxAwardTip, drawType, consumePoints, startTime, activityId} = getData().main;
      if (that.props.main.startWheelLoading) {
        return;
      }
      const isLogin = ifLogin();
      if (!isLogin) {
        Taro.navigateTo({
          url: '/pages/package-A/login/login/index',
        });
        return;
      }
      //没有次数
      if (!that.props.main.leftDrawCount) {
        Taro.showModal({
          content: maxAwardTip,
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff6600',
        });
        return;
      }
      //区分登录获取接口
      const res = await detailForWeb({activityId});
      const {endTime, pauseFlag} = res.drawDetail;
      // 活动已结束或已暂停
      if (dayjs().isAfter(endTime) || pauseFlag == 1) {
        Taro.showModal({
          content: '抽奖活动已结束或已暂停',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff6600',
        });
        setTimeout(async () => {
          await action.initData(activityId);
        }, 800);
        return;
      }
      let flag = false;
      if (drawType === 1) {
        const points = isLogin && (await findCustomerInfo());
        const pointsAvailable = points && typeof points.pointsAvailable === 'number' ? points.pointsAvailable : null;
        if (pointsAvailable < consumePoints) {
          flag = true;
        }
      }
      if (flag) {
        Taro.showToast({
          title: '您的积分不足，无法抽奖',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      // 可点的抽奖按钮
      if (dayjs().isAfter(startTime) && dayjs().isBefore(endTime) && pauseFlag != 1) {
        // 点击抽奖按钮会触发star回调
        action.commonChange('main.startWheelLoading', true);
        const index = await action.startWheel(activityId);
        // 如果拿到中奖数据再加载动画
        if (index >= 0) {
          // 调用抽奖组件的play方法开始游戏
          that.myLucky.current.play();
          that.myLucky.current.stop(index);
        }
      }
      // 活动未开始或已结束或已暂停
      if (dayjs().isBefore(startTime) || dayjs().isAfter(endTime) || pauseFlag == 1) {
        return;
      }
    },

    async startPrizeDraw(activityId) {
      const {click, leftDrawCount, maxAwardTip, modalShow, drawType, consumePoints} = getData().main;
      const isLogin = ifLogin();
      if (!isLogin) {
        Taro.navigateTo({
          url: '/pages/package-A/login/login/index',
        });
        return;
      }
      //防止在弹出中奖结果的一瞬间再次抽奖
      if (modalShow || click) return;
      //没有次数
      if (!leftDrawCount) {
        Taro.showModal({
          content: maxAwardTip,
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff6600',
        });
        return;
      }
      //区分登录获取接口
      const res = await detailForWeb({activityId});
      const {endTime, pauseFlag} = res.drawDetail;
      // 活动已结束或已暂停
      if (dayjs().isAfter(endTime) || pauseFlag == 1) {
        Taro.showModal({
          content: '抽奖活动已结束或已暂停',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff6600',
        });
        setTimeout(async () => {
          await action.initData(activityId);
        }, 800);
        return;
      }
      let flag = false;
      if (drawType === 1) {
        const points = isLogin && (await findCustomerInfo());
        const pointsAvailable = points && typeof points.pointsAvailable === 'number' ? points.pointsAvailable : null;
        if (pointsAvailable < consumePoints) {
          flag = true;
        }
      }
      if (flag) {
        Taro.showToast({
          title: '您的积分不足，无法抽奖',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      if (!click) {
        action.commonChange('main.click', true);
        action.commonChange('main.checkId', '-1');
        action.commonChange('main.prizeId', '-1');
        action.startAnimate(activityId);
      }
    },

    async startWheel(activityId) {
      let result;
      try {
        result = await lotteryDraw({activityId});
      } catch (e) {
        toggle.prizeId = 1;
        // 如果异常重新查询列表数据
        getData().main && getData().main.activityId && action.initData(getData().main.activityId);
      }
      const prizeId = result?.drawResult.prizeId;
      const lessDrawCount = result?.drawResult.lessDrawCount;
      //防止抽奖过程中离开页面 redux数据被清空 转盘列表为空报错问题
      if (getData().main && getData().main.prizeList) {
        // 中奖了，获取到中奖的id，从prizeList中取到对应奖品
        let prize: any = getData().main.prizeList.find((prizeItem: any, index) => {
          if (prizeItem.id === prizeId) {
            prizeItem.checkId = index;
            return prizeItem;
          }
        });
        // 接口报错 前端兼容处理
        if (typeof lessDrawCount === 'number') {
          // 已中奖，弹窗
          action.commonChange([
            {paths: 'main.prizeId', value: prizeId},
            // {paths: 'main.modalShow', value: true},
            {paths: 'main.prizeInfo', value: prize},
            {paths: 'main.leftDrawCount', value: lessDrawCount},
          ]);
        } else {
          // 已中奖，弹窗
          action.commonChange([
            {paths: 'main.prizeId', value: prizeId},
            // {paths: 'main.modalShow', value: true},
            {paths: 'main.prizeInfo', value: prize},
          ]);
        }
        return prize?.checkId;
      } else {
        action.commonChange([
          {paths: 'main.modalShow', value: false},
          {paths: 'main.prizeInfo', value: null},
          {paths: 'main.leftDrawCount', value: 0},
        ]);
      }
    },

    startAnimate(activityId) {
      toggle.startTime = new Date().getTime();
      let doAnimate = new Promise((resolve, reject) => {
        this.showChecking(resolve, reject);
      });
      // eslint-disable-next-line no-async-promise-executor
      let doFetch = new Promise(async (resolve, reject) => {
        try {
          let result = await lotteryDraw({activityId});
          toggle.prizeId = 1;
          const lessDrawCount = result?.drawResult.lessDrawCount;
          action.commonChange([{paths: 'main.leftDrawCount', value: lessDrawCount}]);
          resolve(result);
        } catch (e) {
          toggle.prizeId = 1;
          reject(e);
        }
      });

      Promise.all([doAnimate, doFetch])
        .then((resultArr) => {
          let context = resultArr[1] as any;
          //防止抽奖过程中离开页面 redux数据被清空 转盘列表为空报错问题
          if (getData().main && getData().main.prizeList) {
            if (context && context.drawResult && context.drawResult.prizeId) {
              // 中奖了，获取到中奖的id，从prizeList中取到对应奖品
              let prize: any = getData().main.prizeList.find((prizeItem: any, index) => {
                if (prizeItem.id === context.drawResult.prizeId) {
                  prizeItem.checkId = index;
                  return prizeItem;
                }
              });
              const lessDrawCount = context.drawResult.lessDrawCount;
              // 接口报错 前端兼容处理
              if (typeof lessDrawCount === 'number') {
                // 已中奖，弹窗
                action.commonChange([
                  {paths: 'main.checkId', value: prize.checkId},
                  {paths: 'main.prizeId', value: '-1'},
                  {paths: 'main.modalShow', value: true},
                  {paths: 'main.prizeInfo', value: prize},
                  {paths: 'main.leftDrawCount', value: lessDrawCount},
                  {paths: 'main.click', value: false},
                ]);
              } else {
                // 已中奖，弹窗
                action.commonChange([
                  {paths: 'main.checkId', value: prize.checkId},
                  {paths: 'main.prizeId', value: '-1'},
                  {paths: 'main.modalShow', value: true},
                  {paths: 'main.prizeInfo', value: prize},
                  {paths: 'main.click', value: false},
                ]);
              }
            } else {
              let prize: any = getData().main.prizeList.find((prizeItem: any, index) => {
                if (!prizeItem.id) {
                  prizeItem.checkId = index;
                  return prizeItem;
                }
              });
              const lessDrawCount = context?.drawResult.lessDrawCount;
              // 接口报错 前端兼容处理
              if (typeof lessDrawCount === 'number') {
                action.commonChange([
                  {paths: 'main.checkId', value: prize.checkId},
                  {paths: 'main.prizeId', value: '-1'},
                  {paths: 'main.modalShow', value: true},
                  {paths: 'main.prizeInfo', value: null},
                  {paths: 'main.click', value: false},
                  {paths: 'main.leftDrawCount', value: lessDrawCount},
                ]);
              } else {
                action.commonChange([
                  {paths: 'main.checkId', value: prize.checkId},
                  {paths: 'main.prizeId', value: '-1'},
                  {paths: 'main.modalShow', value: true},
                  {paths: 'main.prizeInfo', value: null},
                  {paths: 'main.click', value: false},
                ]);
              }
            }
          } else {
            action.commonChange([
              {paths: 'main.checkId', value: '-1'},
              {paths: 'main.prizeId', value: '-1'},
              {paths: 'main.modalShow', value: false},
              {paths: 'main.prizeInfo', value: null},
              {paths: 'main.leftDrawCount', value: 0},
              {paths: 'main.click', value: false},
            ]);
          }
        })
        .then(() => {
          clearTimeout(toggle.timer);
          //防止抽奖过程中离开页面 redux数据被清空 获取活动id为空重查活动报错问题
          getData().main && getData().main.activityId && action.initData(getData().main.activityId);
        })
        .catch((e) => {
          action.commonChange([
            {paths: 'main.checkId', value: '-1'},
            {paths: 'main.prizeId', value: '-1'},
            {paths: 'main.modalShow', value: false},
            {paths: 'main.prizeInfo', value: null},
            {paths: 'main.leftDrawCount', value: 0},
            {paths: 'main.click', value: false},
          ]);
          clearTimeout(toggle.timer);
          if (!(e.code === 'K080070' || e.code === 'K080071' || e.code === 'K080063' || e.code === 'K080074')) {
            Taro.showToast({
              title: e.message,
              icon: 'none',
              duration: 2000,
            });
          }
          //抽奖结果报错要重新查询一次活动判断
          //防止抽奖过程中离开页面 redux数据被清空 获取活动id为空重查活动报错问题
          getData().main && getData().main.activityId && action.initData(getData().main.activityId);
        });
    },
    showChecking(resolve, reject) {
      toggle.endTime = new Date().getTime();
      if (toggle.prizeId != -1 && toggle.endTime - toggle.startTime > toggle.minDuration) {
        toggle.prizeId = -1;
        toggle.countIndex = 0;
        // toggle.speed = 20;
        resolve();
        clearTimeout(toggle.timer);
        return;
      }
      // else if (toggle.countIndex < toggle.cycle) {
      //   toggle.speed -= 10;
      // } else if (toggle.countIndex == toggle.cycle) {
      //   toggle.speed -= 10;
      // } else {
      //   if (toggle.countIndex > toggle.cycle + 10) {
      //     toggle.speed += 110;
      //   } else {
      //     toggle.speed += 20;
      //   }
      // }
      if (toggle.speed < 40) {
        toggle.speed = 40;
      }
      toggle.countIndex += 1;
      toggle.index = toggle.countIndex % toggle.count;
      //中奖位置
      action.commonChange('main.checkId', toggle.index);
      toggle.timer = setTimeout(() => {
        action.showChecking(resolve, reject);
      }, toggle.speed);
    },
  };

  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageAPrizeDrawMain'),
  };
}
