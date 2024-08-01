// 校验规则常量
export default {
  // 手机号码 1开头 11位即可
  phone: /^1\d{10}$/,
  pwd:/^[a-zA-Z0-9!@#$%^&*()-_+=<>?/\\|{}[\],.~]{6,16}$/,
  //0.01~1之间的小数，eg:折扣率
  zeroOne: /(^0\.[1-9][0-9]{0,1}$)|(^0\.0[1-9]{1}$)|(^1((\.0)|(\.00))?$)/,
  //数字
  number: /^\d+$/,
  //价格 不能为0
  price: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/,
  //价格 可以为0
  zeroPrice: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  //数字,不包含0
  noZeroNumber: /^[1-9]\d{0,}$/,
  // 固定电话
  telephone: /(^\d{0,9}-\d{0,10}$)|(^\d{1,20}$)/,
  // 纳税人识别号
  tax: /^[A-Za-z0-9]{15,20}$/,
  // 银行户号
  bankNumber: /^\d{1,30}$/,
  //仅中文或英文，不允许含有数字
  noNumber: /^[a-zA-Z\u4E00-\u9FA5]*$/,
  //不允许含有特殊字符
  noChar: /^[0-9a-zA-Z\u4E00-\u9FA5]*$/,
  //有emoji表情
  emoji: /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/,
  //统一社会信用代码
  socialCreditCode: /^[A-Za-z0-9]{15,20}$/,
  //统一社会信用代码
  enterpriseSocialCreditCode: /^[A-Z0-9]{8,30}$/,
  //邮箱
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  //折扣率0.00-100.00, 可以为0
  discount: /^\d(\.\d{1,2})?$|^[1-9]\d(\.\d{1,2})?$|^100(\.(0){1,2})?$/,
  //排序合法数字 0-999
  sortNum: /^([1-9](\d{1,2})?)$|^0$/,
  //不允许输入中文
  noChinese: /^[^\u4e00-\u9fa5]{1,20}$/,
  //密码为6-16位字母或数字密码
  password: /^[0-9a-zA-Z]{6,16}$/,
  //结算日校验
  accountDay: /(^[1-9]{1}$)|(^[1-2]{1}[0-9]{1}$)|(^[3][0,1]$)/,
  //中文、英文、数字及“_”、“-”、()、（）
  companyName: /^[\(\)\（\）0-9a-zA-Z_\-\u4E00-\u9FA5]*$/,
};
