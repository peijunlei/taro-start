import dayjs from 'dayjs';

export function priceFormat(price) {
  return Number((price + '').match(/^\d+(?:\.\d{0,2})?/)) || 0;
}

export function getDate(time) {
  let arr = [];
  if (time) {
    arr = time.split(/[- : \/]/).map((item) => +item);
  }
  if (arr[1]) {
    arr[1] = arr[1] - 1;
  }
  //@ts-ignore
  return new Date(...arr) || '';
}

export function weekFormat(time, type) {
  let date = dayjs(getDate(time));
  return getWeek(date.day()) + ' ' + date.format(type ? 'MM-DD HH:mm' : 'MM-DD') || '';
}

export function getWeek(date) {
  let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  if (date >= 0 && date <= 6) {
    return weeks[date];
  } else {
    return '';
  }
}

export function getWeekCh(date) {
  let weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (date >= 0 && date <= 6) {
    return weeks[date];
  } else {
    return '';
  }
}

function decimalLength(num) {
  if (!num) return;
  const str = num.toString();
  const index = str.indexOf('.');
  return index == -1 ? 0 : str.substr(index + 1).length;
}

/**
 * 小数点后补齐0作为整数
 * @author zhongjiewang
 * @param  {Number} num    数字
 * @param  {Number} length 补齐的长度
 * @return {Number}        整数
 */
function suffixInteger(num, length) {
  let str = num.toString();
  const decimalLen = decimalLength(num);
  str += Math.pow(10, length - decimalLen)
    .toString()
    .substr(1);
  return Number(str.replace('.', ''));
}

export const sub = function(num1, num2) {
  const r1 = decimalLength(num1);
  const r2 = decimalLength(num2);

  const max = Math.max(r1, r2);

  const n1 = suffixInteger(num1, max);
  const n2 = suffixInteger(num2, max);

  return Number(((n1 - n2) / Math.pow(10, max)).toFixed(max));
};

/**
 * 不四舍五入的取两位小数
 */
export const toFixed2 = (number: number | string) => {
  if (typeof number != 'string') {
    number = number.toString();
  }
  let numberArray = number.split('.');
  if (numberArray[1]) {
    if (numberArray[1].length == 1) {
      numberArray[1] = numberArray[1] + '0';
    } else if (numberArray[1].length > 2) {
      numberArray[1] = numberArray[1].substring(0, 2);
    }
  } else {
    numberArray[1] = '00';
  }
  return parseFloat(numberArray.join('.')).toFixed(2);
};

export const add = function(num1, num2) {
  const r1 = decimalLength(num1);
  const r2 = decimalLength(num2);

  const max = Math.max(r1, r2);

  const n1 = suffixInteger(num1, max);
  const n2 = suffixInteger(num2, max);
  return Number(((n1 + n2) / Math.pow(10, max)).toFixed(max));
};

/**
 * 除法函数
 * @param num1
 * @param num2
 * @returns {number}
 */
export function div(num1, num2) {
  const r1 = decimalLength(num1);
  const r2 = decimalLength(num2);

  const max = Math.max(r1, r2);

  const n1 = suffixInteger(num1, max);
  const n2 = suffixInteger(num2, max);

  return n1 / n2;
}

/**
 * 浮点数相乘
 * 使用：num1.mul(num2);
 * return 相乘结果
 */
export const mul = function(num1, num2) {
  const r1 = decimalLength(num1);
  const r2 = decimalLength(num2);

  const max = Math.max(r1, r2);

  const n1 = suffixInteger(num1, max);
  const n2 = suffixInteger(num2, max);

  return (n1 * n2) / Math.pow(10, max * 2);
};

/**
 * 产生指定位数的随机数
 * @param n
 * @returns {string}
 */
export const rndNum = (n) => {
  let rnd = '';
  for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
  return rnd;
};
