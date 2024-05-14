// app.js
App({
  globalData: {
    listenwords: {} // 定义一个全局变量用来存储大对象
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};

    wx.loadFontFace({
      family: 'PingFangSC-regular',
      source: 'url("https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/%E8%8B%B9%E6%96%B9%E9%BB%91%E4%BD%93-%E5%87%86-%E7%AE%80.ttf?sign=c5fd5ca1619080a61c52657b2f5c7898&t=1714837862")',
      global: true
      })
      wx.loadFontFace({
        family: 'FangZhengKaiTiJianTi',
        source: 'url("https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/FangZhengKaiTiJianTi-1.ttf?sign=309d6a4af3c43d38357fcc97ed2fc3e2&t=1714971360")',
        global: true
        })
  }
});
