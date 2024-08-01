import Taro from '@tarojs/taro';
import {WMkit} from "wmkit";
import config from "@/service/config";

type uploadRes = {
  context: [string];
};

/**
 * 上传图片
 */
export default async function UploadImage(fileSize): Promise<uploadRes> {
  return new Promise(async (resolve, reject) => {
    const env = Taro.getEnv();
    if (env === Taro.ENV_TYPE.WEB) {
      h5Upload(resolve, reject, fileSize);
    } else {
      taroUpload(resolve, reject, fileSize);
    }
  });
}

const taroUpload = async (resolve, reject, fileSize) => {
  await Taro.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: '#ff6600',
    success: async function(res) {
      if (!res.cancel) {
        await chooseWxImage(res.tapIndex);
      }
    },
  })
    .then((res) => res)
    .catch((err) => err);

  async function chooseWxImage(tapIndex) {
    const type = tapIndex ? 'camera' : 'album';
    const token = Taro.getStorageSync('authInfo:token');
    await Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: async function(res) {
        let toUploadPath = res.tempFilePaths[0];
        let fileName = res.tempFiles[0].path.toLowerCase();
        //判断是否 是标准格式，是否超过文件大小
        if (
          fileName.endsWith('.jpg') ||
          fileName.endsWith('.jpeg') ||
          fileName.endsWith('.png') ||
          fileName.endsWith('.gif')
        ) {
          if (res.tempFiles[0].size >= fileSize) {
            if (fileSize == 500 * 1024 * 10) {
              await Taro.showToast({
                title: '图片大小不能超过5M',
                icon: 'none',
                duration: 1000,
              });
            }
            return;
          }
        } else {
          await Taro.showToast({
            title: '仅支持jpg、jpeg、png、gif文件',
            icon: 'none',
            duration: 1000,
          });
          return;
        }

        await Taro.uploadFile({
          //@ts-ignore
          url: `${config.host}/common/uploadResource?resourceType=IMAGE`, //测试
          header: {
            // 'content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, // 上传需要单独处理cookie
          },
          // url: '/common/uploadResource',
          filePath: res.tempFilePaths[0],
          formData: {},
          name: 'uploadFile',
          success: async function(res) {
            const data = JSON.parse(res.data); //坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
            resolve({context: data.context});
          },
          fail: async function(res) {
            //失败后这个没有值 res.tempFilePaths[0]
            setTimeout(async () => {
              await Taro.showToast({
                title: 'fail: ' + JSON.stringify(res || {}) + '-' + toUploadPath,
                icon: 'none',
                duration: 3000,
              });
            }, 3000);
            reject(res);
          },
        });
      },
    });
  }
};

const h5Upload = (resolve, reject, fileSize) => {
  (document.getElementById('uploadForm') as any).reset();
  const uploadInput = document.getElementById('uploadInput');
  uploadInput.onchange = async (e: any) => {
    let files = e.target.files;
    let fileName = files[0].name.toLowerCase();
    //判断是否 是标准格式，是否超过文件大小
    if (
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.png') ||
      fileName.endsWith('.gif')
    ) {
      if (files[0].size >= fileSize) {
        if (fileSize == 500 * 1024 * 10) {
          await Taro.showToast({
            title: '图片大小不能超过5M',
            icon: 'none',
            duration: 1000,
          });
        }
        return;
      }
    } else {
      await Taro.showToast({
        title: '仅支持jpg、jpeg、png、gif文件',
        icon: 'none',
        duration: 1000,
      });
      return;
    }

    if (files && files[0]) {
      let formData = new FormData();
      formData.append('uploadFile', files[0]);
      const url = `${WMkit.prefixUrl(config.host)}/common/uploadResource?resourceType=IMAGE`;
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + Taro.getStorageSync('authInfo:token'),
        },
      })
        .then((res) => res.json())
        .then((res) => resolve({context: res.context}))
        .catch((err) => reject(err));
    }
  };
  uploadInput.click();
};
