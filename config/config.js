

module.exports = {
  weapp: "wx52cdf5af93498a6e",
  h5: "",
  host: "/mbff",
  magicHost: "https://wm-test.800890.com/magic",
  magicPage: "https://wm-test.800890.com/mbff/magic-page/main.html",
  renderHost: "https://wm-test.800890.com/app-render",
  ossHost: "https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/mini",
  pvUvHost: "https://wm-test.800890.com/perseus",
  wechatDsn: "",
  mobileDsn: "",
  envVersion: "trial",
  livePlayerId: "wx2b03c6e691cd7370",
  gh_Id: "gh_761b12a4402b",
  mobileAmapKey: "6870943781e6dbf08f37fd59a7ec244c",
  amapWebKey: "d7639f281333d3318e449f09adbf0352",
  aMapServiceHost: "https://wm-test.800890.com/_AMapService",
  securityJsCode: "889cf083bf628a75a3a595f32ea19a26",
  proxy: [
    {
      context: [
        "/mbff",
        "/perseus",
        "/magic",
        "/app-render",
        "/_AMapService",
      ],
      target: "https://wm-test.800890.com/mbff",
      headers: {
        Origin: "https://wm-test.800890.com",
        Referer: "https://wm-test.800890.com",
      },
      changeOrigin: true,
      pathRewrite: {
        "^/mbff": "/",
      },
    },
  ],
}