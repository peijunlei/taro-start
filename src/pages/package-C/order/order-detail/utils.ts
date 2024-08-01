//201: 卡密+卡号 202: 卡号或卡密 203: 卡号+卡密+校验码 301: 链接类 302: 链接+验证码 303: 卡号+短链接+验证码 304：卡号+短链接
export type CardType = '201' | '202' | '203' | '301' | '302' | '303' | '304';
export const getCardType = (item: any) => {
  const type = item.type as CardType;
  const { code, pass, h5Url, urlPass, crc } = item
  const cardList = []
  switch (type) {
    case '201':
    case '202':
      if(code){
        cardList.push({ label: '卡号', value: code })
      }
      if(pass){
        cardList.push({ label: '卡密', value: pass })
      }
      break;
    case '203':
      cardList.push({ label: '卡号', value: code }, { label: '卡密', value: pass }, { label: '校验码', value: crc })
      break;
    case '301':
      cardList.push({ label: '链接', value: h5Url })
      break;
    case '302':
      cardList.push({ label: '链接', value: h5Url }, { label: '验证码', value: urlPass })
      break;
    case '303':
      cardList.push({ label: '卡号', value: code }, { label: '链接', value: h5Url }, { label: '验证码', value: urlPass })
      break;
    case '304':
      cardList.push({ label: '卡号', value: code }, { label: '链接', value: h5Url })
      break;
    default:
      break;
  }
  return cardList
}

// `卡号: ${item.code}, 密码: ${item.pass}`
export const getCardCopyText = (item: any) => {
  const type = item.type as CardType;
  const { code, pass, h5Url, urlPass, crc } = item
  switch (type) {
    case '201':
    case '202':
      return `卡号: ${code}, 密码: ${pass}`
    case '203':
      return `卡号: ${code}, 密码: ${pass}, 校验码: ${crc}`
    case '301':
      return `链接: ${h5Url}`
    case '302':
      return `链接: ${h5Url}, 验证码: ${urlPass}`
    case '303':
      return `卡号: ${code}, 链接: ${h5Url}, 验证码: ${urlPass}`
    case '304':
      return `卡号: ${code}, 链接: ${h5Url}`
    default:
      return ''
  }
}