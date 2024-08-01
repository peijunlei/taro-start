/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production',
    /** 当前构建的平台 */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd',
    /**
     * 当前构建的小程序 appid
     * @description 若不同环境有不同的小程序，可通过在 env 文件中配置环境变量`TARO_APP_ID`来方便快速切换 appid， 而不必手动去修改 dist/project.config.json 文件
     * @see https://taro-docs.jd.com/docs/next/env-mode-config#特殊环境变量-taro_app_id
     */
    TARO_APP_ID: string
  }
}

// wx
declare const wx: Wx;
declare const __DEV__: boolean;

declare const __TARO_ENV: 'weapp' | 'alipay' | 'h5' | 'tt';

declare interface AsyncResult<T> {
  res: T;
  err: Error;
}

declare interface TResult {
  code: string
  message: string
  context: any
}

declare interface Wx {
  [name: string]: any;
}

declare type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

interface Window {
  qimoChatClick: ()=>void;
  qimo_loaded: boolean;
}
interface ILocation{
  /**经度 */
  longitude: number;
  /**纬度 */
  latitude: number;
}
declare type POJO<T = any> = {
  [key: string]: T;
};
declare type Primitive = string | boolean | number | null | undefined | any;
declare const AMap:{
  plugin:any;
  service:any;
  Geolocation:any;
  PlaceSearch:any;
};
