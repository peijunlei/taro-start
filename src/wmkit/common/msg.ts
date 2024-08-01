/**
 * @desc
 * @使用场景
 *
 * @coder  surenjun
 * @Date   2020/03/05
 */

import mitt from 'mitt';

const bus = mitt();

type TMsgListeners = {[eventName: string]: mitt.Handler};

function on(listener: TMsgListeners = {}) {
  const keys = Object.keys(listener);

  for (let key of keys) {
    bus.on(key, listener[key]);
  }

  return () => {
    for (let key of keys) {
      bus.off(key, listener[key]);
    }
  };
}

function emit(eventName: string, payload?: any) {
  bus.emit(eventName, payload);
}

export const msg = {
  on,
  bus,
  emit,
};
