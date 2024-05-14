// pages/listen/listen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: true,
    selected:"",
    selected_update:"",
    pause:true,
    words:[],
    index: 0,
    readCount:2,
    readSpace:2,
    readOrder:1,
    showSetting:false,
    Image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    const { all, lessonid, index } = options
    const that = this
    // 发送请求
    //获取更多字
    wx.request({
      url: `https://course.igetcool.com/api/dictation/lesson/details?lessonId=${lessonid}&typeList=`,
      header: {
        'Host': 'course.igetcool.com',
        'Connection': 'keep-alive',
        'xweb_xhr': '1',
        'App-Wechat-UnionId': 'oDQBv07hD-oxDgtUZ2e9zqFoPABI',
        'App-User-Pid': '0',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Referer': 'https://servicewechat.com/wx3fc3618ecdedcbac/24/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9'
      },
      method: 'GET',
      success: function(res) {
        // 请求成功的处理逻辑
        const words = res.data.data.words;
        console.log(res.data.data)
        let word = [];
        if(all != '1'){
          const indexs = index.split("-")
          // 只需要 index 中 的
          for(var i = 0; i < words.length; i++){
            if(indexs.includes(words[i].id.toString())){
              word.push(words[i]);
            }
          }
        }else{
          word = words;
        }
        console.log(word)
        that.setData({
          words: word
        })
      },
      fail: function(err) {
        // 请求失败的处理逻辑
        console.error(err);
      }
    });
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
  selectPeople(event) {
    this.setData({
      selected:"selected",
      selected_update:""
    })
  },
  selectUpdate(event) {
    this.setData({
      selected_update:"selected",
      selected:""
    })
  },
  close(){
    this.setData({
      showPopup:false
    })
  },
  // 监听子组件触发的自定义事件，接收签名图片数据
  handleSignatureData: function (e) {
    const signatureImage = e.detail.image;
    this.setData({
      Image:signatureImage
    })
    console.log(signatureImage)
  },
  setting(){
    this.setData({
      showSetting:true
    })
  },
  closeSetting(){
    this.setData({
      showSetting:false
    })
  },
  pre(){
    if(this.data.index==0){
      return
    }
    this.setData({
      index:this.data.index-1
    })
  },
  next(){
    const component = this.selectComponent('#signature');
    component.canvasClear();

    //判断当前图片是否正确
    if(this.data.index==this.data.words.length-1){
      return
    }
    this.setData({
      index:this.data.index+1
    })
  },
  addtocollection(event) {
    // 获取本地存储中的收藏集合
    let collection = wx.getStorageSync('collection') || [];
    let data = this.data.words;
    let wordToAdd = data[this.data.index];
    
    // 检查要添加的 word 是否已经存在于 collection 中
    let exists = collection.some(item => item.word === wordToAdd.word);

    if (!exists) {
        // 如果不存在，添加到收藏集合中
        collection.push(wordToAdd);
        data[this.data.index]['iscollection'] = true;
        this.setData({
            words: data
        });
        wx.setStorageSync('collection', collection);
        wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
        });
    } else {
        // 如果存在，提示已经收藏
        wx.showToast({
            title: '已收藏',
            icon: 'none',
            duration: 2000
        });
    }
}

})