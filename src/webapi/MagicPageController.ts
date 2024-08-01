import * as sdk from './fetch';

import isMock from './mock-util';
const serverInfo = '';
const controllerName = 'MagicPageController';

/**
 *
 * 获取魔方首页配置信息
 *
 */
async function getMainConfig(): Promise<GetMainConfiggetRes> {
  let result = await sdk.get<GetMainConfiggetRes>(
    '/magic-page/main-config',

    {},
    {serverInfo, controllerName},
  );
  return result.context;
}

/**
 *
 * 获取魔方首页缓存html
 *
 */
async function getMainHtml(): Promise<GetMainHtmlgetRes> {
  let result = await sdk.get<GetMainHtmlgetRes>(
    '/magic-page/main.html',

    {},
    {serverInfo, controllerName},
  );
  return result.context;
}

export default {
  getMainConfig,

  getMainHtml,
};

/**
 */
export type GetMainConfiggetRes = string;
/**
 */
export type GetMainConfiggetRes1 = string;
/**
 */
export type GetMainHtmlgetRes = string;

export interface IgnoreType {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
