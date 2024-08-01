import {immutable} from 'wmkit';
import {getProvinces, getAreas, getCities, loadData} from './area-data';
import api from 'api';

/**
 * 获取省份与地市的层级结构数据
 */
export function findProvinceCity(ids) {
  return immutable
    .fromJS(getProvinces() || [])
    .map((p) => {
      let pChx = false,
        cChx = false,
        pChx2 = false;
      if (immutable.fromJS(ids).find((id) => id == p.get('code'))) {
        pChx = true;
      }
      let children = p.get('children').map((c) => {
        cChx = pChx;
        if (!cChx && immutable.fromJS(ids).find((id) => id == c.get('value'))) {
          cChx = true;
          pChx2 = true;
        }
        return immutable.fromJS({
          label: c.get('label'),
          value: c.get('value'),
          key: c.get('value'),
          disabled: cChx,
        });
      });
      return immutable.fromJS({
        label: p.get('name'),
        value: p.get('code'),
        key: p.get('code'),
        children: children,
        disabled: pChx || pChx2,
      });
    })
    .toJS();
}

/**
 * 查询省
 * @param code
 * @returns {string}
 */
export function findProviceName(code: string) {
  for (let p of getProvinces()) {
    if (p.id == code) {
      return p.name;
    }
  }
  return '';
}

function findArea(areaCode) {
  for (let a of getAreas()) {
    if (areaCode == a.id) {
      return a.name;
    }
  }
  return '';
}

function findCity(code: string) {
  for (let c of getCities()) {
    if (code == c.id) {
      return c.name;
    }
  }
  return '';
}

export function findCityCode(code: string) {
  for (let c of getCities()) {
    if (code == c.id) {
      return c.id;
    }
  }
  return '';
}

export function findCityAndParentId(code: string) {
  for (let c of getCities()) {
    if (code == c.code) {
      return {name: c.name, parent_code: c.parent_code};
    }
  }
  return {name: null, parent_code: null};
}

/**
 *  省市区字符串 返回 `江苏省/南京市/雨花台区`
 * @param provinceCode
 * @param cityCode
 * @param areaCode
 * @param splitter 分隔符
 * @returns {string}
 */
export function addressInfoOld(provinceCode, cityCode, areaCode) {
  loadData(provinceCode, cityCode, areaCode);
  if (provinceCode) {
    if (cityCode) {
      let proviceName = `${findProviceName(provinceCode) || ''}`;
      let cityName = `${findCity(cityCode) || ''}`;

      if (proviceName === cityName) {
        return `${cityName}${findArea(areaCode) || ''}`;
      } else {
        return `${proviceName}${cityName}${findArea(areaCode)}`;
      }
    } else {
      return `${findProviceName(provinceCode)}`;
    }
  }

  return '';
}

/**
 * 获取地址字符串
 * @param provinceCode
 * @param cityCode
 * @param areaCode
 * @param streetCode
 */
export async function addressInfo(provinceCode, cityCode, areaCode, streetCode?) {
  if (!(provinceCode && cityCode && areaCode)) return '';
  const res = await api.platformAddressController.listByIds({
    addrIdList: [provinceCode, cityCode, areaCode, streetCode],
  });
  let codeNameMap = {},
    addressInfoStr = '';
  res.platformAddressVOList.forEach((v) => (codeNameMap[v.addrId] = v.addrName));
  if (provinceCode) {
    addressInfoStr += codeNameMap[provinceCode];
    if (cityCode) {
      addressInfoStr += codeNameMap[cityCode];
      if (areaCode) {
        addressInfoStr += codeNameMap[areaCode];
        if (streetCode && streetCode != -1) {
          addressInfoStr += codeNameMap[streetCode];
        }
      }
    }
  }

  // todo 临时的兼容代码
  if (addressInfoStr === '' || addressInfoStr == 'undefined') {
    return await addressInfoOld(provinceCode, cityCode, areaCode);
  }

  return addressInfoStr;
}
