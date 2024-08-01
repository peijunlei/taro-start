import Taro from '@tarojs/taro';

interface ICheckParams {
  required?: boolean; //是否必填
  maxlength?: number; //最长长度
  minLength?: number; //最短长度
  regexString?: string; //直接传入正则表达式
  regexType?: string; //RegexMap中定义的公用正则
}

/**
 * 表单判断组件
 *
 * 调用方式：
 *     let checkType = {required : true , maxlength : 100 };
 *     let flag = FormRegexUtil( params , "开户行" , checkType );
 *
 * @param value
 * @param keyString
 * @param checkParams
 * @returns {boolean}
 * @constructor
 */

export default function FormRegexUtil(
  value,
  keyString,
  checkParams: ICheckParams = {required: false, maxlength: null, minLength: null, regexString: null, regexType: null},
) {
  //公用的正则可以在这配置，通过{regexType}参数传入
  let RegexMap = {
    accountNo: '^([1-9]{1})(\\d{15}|\\d{18})$',
    mobile: /^1(3|4|5|7|8|9)\d{9}$/,
    number: '^[0-9]*$',
    letter: '^[a-zA-Z]*$',
    'number&-': '^[0-9-]*$',
    'number&letter': '^[0-9a-zA-Z]*$',
  };

  let alertString;
  let flag = true;
  if (checkParams.required) {
    if (typeof value === 'string' || value == null) {
      if (!value || '' == value.trim()) {
        alertString = '请填写' + keyString;
        flag = false;
      }
    }
  }
  if (flag && value && (checkParams.maxlength || checkParams.minLength)) {
    if (checkParams.maxlength && checkParams.minLength) {
      if (value.length < checkParams.minLength || value.length > checkParams.maxlength) {
        alertString = keyString + ' 应该在' + checkParams.minLength + '～' + checkParams.maxlength + '个字符之间';
        flag = false;
      }
    } else if (checkParams.maxlength && value.length > checkParams.maxlength) {
      alertString = keyString + ' 不能大于' + checkParams.maxlength + '个字符';
      flag = false;
    } else if (checkParams.minLength && value.length < checkParams.minLength) {
      alertString = keyString + ' 不能小于' + checkParams.minLength + '个字符';
      flag = false;
    }
  }

  if (flag) {
    //{regexString},{regexType}同为正则判断
    //{regexString}优先级高于{regexType}
    //假如传如的{regexType}在RegexMap中不存在，则提示error
    if (checkParams.regexString && '' != checkParams.regexString) {
      flag = new RegExp(checkParams.regexString).test(value);
      if (!flag) {
        alertString = keyString + ' 输入错误';
      }
    } else if (checkParams.regexType && '' != checkParams.regexType) {
      let _regexType = checkParams.regexType;
      if (RegexMap.hasOwnProperty(_regexType)) {
        flag = new RegExp(RegexMap[_regexType]).test(value);
        if (!flag) {
          alertString = keyString + ' 输入错误';
        }
      } else {
        flag = false;
        console.log(' config[regexType not found] err...'); //正则Type未配置
      }
    }
  }
  if (alertString && alertString != '') {
    // Alert({ text: alertString });
    Taro.showToast({
      title: alertString,
      icon: 'none',
      duration: 2000,
    });
  }
  return flag;
}
