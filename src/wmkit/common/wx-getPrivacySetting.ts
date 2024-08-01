const getPrivacySetting = async () => {
  return new Promise((resolve, reject) => {
    if (wx.getPrivacySetting) {
      wx.getPrivacySetting({
        success: (res) => {
          resolve(res);
        },
        fail: () => {
          resolve(false);
        },
      });
    } else {
      resolve(false);
    }
  });
};

export default getPrivacySetting;
