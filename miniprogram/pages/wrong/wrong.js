// pages/listenbook/listenbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    wrongwords:[],
    selectall: false,
    canListen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取本地存储
    var that = this;
    wx.getStorage({
      key: 'wrong',
      success(res) {
        console.log(res.data)
        that.setData({
          wrongwords: res.data
        })
      }
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
  selectWrong(event){
    let wrongword = this.data.wrongwords;
    const index = event.currentTarget.dataset.idx;
    console.log(index)
    if(wrongword[index].selected){
      wrongword[index].selected = false
    }
    else{wrongword[index].selected = true}
    //遍历查看是否可以听写
    for(let i = 0; i < wrongword.length; i++){
      if(wrongword[i].selected){
        this.setData({
          canListen: true
        })
        break
      }
      else{
        this.setData({
          canListen: false
        })
      }
    }
    
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
    if(this.data.selectall){
      getApp().globalData.listenwords = words
    }else{
      const filteredWords = words.filter(word => word.selected == true || false);
      console.log('filter==>',filteredWords)
      getApp().globalData.listenwords = filteredWords
    }
    console.log(getApp().globalData.listenwords)
    // 构造跳转路径，并将参数传递过去
    
    var url = '/pages/listen/listen?relisten=true';
    // console.log(indexes.join('-'))
    wx.navigateTo({
        url: url
    });
  }
})