import dayjs from 'dayjs';
import {getDate} from './priceFormat';

export function calAge(birthday) {
  if (birthday) {
    let day = dayjs(new Date()).diff(dayjs(getDate(birthday)), 'day');
    if (day < 7) {
      return '1周龄';
    }
    let year = Math.floor(day / 365);
    day = day % 365;
    let month = Math.floor(day / 30);
    day = day % 30;
    let week = Math.floor(day / 7);
    let arr = [year > 0 ? year + '岁' : '', month > 0 ? month + '个月' : '', week > 0 ? week + '周龄' : ''];
    return arr.join('');
  } else {
    return '';
  }
}
