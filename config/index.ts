import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";
import devConfig from "./dev";
import prodConfig from "./prod";
import config from "./config";

const __TARO_ENV = JSON.stringify(process.env.TARO_ENV);
const WEB_SITE = "/mobile";
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: "taro-start",
    date: "2024-7-31",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {
      //是否为开发模式
      __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
      //终端类型
      __TARO_ENV,
      //地址配置
      __Config__: JSON.stringify(config),
      //mock配置
      __ApiMock__: JSON.stringify({}),
    },
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "webpack5",
      prebundle:{
        cacheDir: path.resolve(__dirname, '..', 'cache'),
        exclude:['@wanmi/ui-taro','taro-ui'],
      }
    },
    cache: {
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    sass: {
      resource: [
        path.resolve(__dirname, '..', 'src/pages/common/style/swipe.scss'),
        path.resolve(__dirname, '..', 'node_modules/taro-ui/dist/style/components/modal.scss'),
        path.resolve(__dirname, '..', 'node_modules/taro-ui/dist/style/components/switch.scss'),
        path.resolve(__dirname, '..', 'node_modules/taro-ui/dist/style/components/tab-bar.scss'),
        path.resolve(__dirname, '..', 'node_modules/taro-ui/dist/style/components/badge.scss'),
      ],
      projectDirectory: path.resolve(__dirname, '..'),
      data: '$nav-height: 48px;',
    },
    mini: {
      commonChunks(commonChunks) {
        // 添加 lodash 公共文件
        commonChunks.push('lodash');
        return commonChunks;
      },
      lessLoaderOption:{
        lessOptions: {
          paths: [
            // path.resolve(__dirname, "node_modules",'@wanmi/ui-taro'),
            path.resolve(__dirname, "..", "src"),
          ],
        },
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    h5: {
      lessLoaderOption: {
        lessOptions: {
          paths: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "..", "src"),
          ],
        },
      },

      devServer: {
        proxy: config.proxy,
        hot: true,
      },
      router: {
        mode: "browser", 
        basename: WEB_SITE,
      },
      publicPath: WEB_SITE,
      staticDirectory: "static",
      esnextModules: ['@wanmi/ui-taro','taro-ui'],
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[hash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash:8].css",
        chunkFilename: "css/[name].[hash:8].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
