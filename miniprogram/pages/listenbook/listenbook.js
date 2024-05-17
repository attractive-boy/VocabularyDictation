// pages/listenbook/listenbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  download(event){
    // 获取要保存的图片地址，假设为 imageUrl
  const imageUrl = 'https://img.js.design/assets/img/661e3e6e4eb2224151693763.png#526355d3ab2231e06724ad128ae8927e';

  wx.downloadFile({
    url: imageUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        // 下载成功，保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (saveRes) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            });
          },
          fail: (saveErr) => {
            console.error('保存失败', saveErr);
          }
        });
      } else {
        console.error('下载失败', res);
      }
    },
    fail: (downloadErr) => {
      console.error('下载失败', downloadErr);
    }
  });
  }
})