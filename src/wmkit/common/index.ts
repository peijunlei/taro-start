import immutable from 'immutable';

import * as _ from './util';
import Fetch from './fetch';
import * as giftCard from './gift-card';
import noop from './noop';
import {storage} from './storage';
import {fetchModal, setModalShow, handleUrl} from './adv-modal';
import OrderWrapper from './order-wrapper';
import ValidConst from './validate';
import {setShopCartNum, getShopCartNum} from './shop-cart-num';
import UploadImage from './upload';
import FormRegexUtil from './form-regex';
import {msg} from './msg';
import * as WMkit from './kit';
import * as VAS from './vas';
import * as wxAuth from './wx-auth';
import * as pvUvStatics from './pv_uv_statics';
import {wxShare} from './wx-share';
import {hijackRenderHoc} from './hijack-component';
import fetchMock from './fetch-mock';
import useSetState from './useSetState';
import getPrivacySetting from './wx-getPrivacySetting';
import * as AMapService from './AMapService';

export {
  _,
  AMapService,
  storage,
  noop,
  Fetch,
  OrderWrapper,
  ValidConst,
  setShopCartNum,
  getShopCartNum,
  UploadImage,
  msg,
  FormRegexUtil,
  WMkit,
  VAS,
  wxAuth,
  pvUvStatics,
  fetchModal,
  setModalShow,
  handleUrl,
  wxShare,
  hijackRenderHoc,
  immutable,
  fetchMock,
  useSetState,
  giftCard,
  getPrivacySetting,
};
