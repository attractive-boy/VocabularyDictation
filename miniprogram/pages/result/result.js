// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightwords:[],
    wrongwords:[],
    selectall: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const words = getApp().globalData.listenwords;
    const right = words?.filter(word => {
      return word.isRight;
    })
    const wrong = words?.filter(word => {
      return !word.isRight;
    })
    this.setData({
      rightwords:right,
      wrongwords:wrong
    })
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
  handleBack() {
    wx.navigateBack({
      delta: 1 // 返回上一页，delta 表示返回的页面数，1表示返回上一页，2表示返回上两页，以此类推
    });
  },
  selectWrong(event){
    let wrongword = this.data.wrongwords;
    const index = event.currentTarget.dataset.idx;
    console.log(index)
    if(wrongword[index].selected){
      wrongword[index].selected = false
    }
    else{wrongword[index].selected = true}
    
    console.log(wrongword)
    this.setData({
      wrongwords: wrongword
    })
  },
  selectall(event){
    this.setData({
      selectall: this.data.selectall ? false : true
    })
  },
  relisten(event){

    let words = this.data.wrongwords
    if(this.selectall){
      getApp().globalData.listenwords = words
    }else{
      getApp().globalData.listenwords = words?.filter(word => {
        return word.selected;
      })
    }
    // 构造跳转路径，并将参数传递过去
    
    var url = '/pages/listen/listen?relisten=true';
    // console.log(indexes.join('-'))
    wx.navigateTo({
        url: url
    });
  }
})