// pages/listen/listen.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPopup: true,
    selected: "",
    selected_update: "",
    pause: true,
    words: [],
    index: 0,
    readCount: 2,
    readSpace: 2,
    readOrder: 1,
    showSetting: false,
    Image: "",
    type: "write",
    showhelp: false,
    helpInfo: {},
    showresult: false,
    startTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      startTime: Date.now(),
    });
    const { all, lessonid, index, relisten } = options;
    const that = this;
    if (relisten) {
      this.setData({
        words: getApp().globalData.listenwords,
      });
      return;
    }
    // 发送请求
    //获取更多字
    wx.request({
      url: `https://course.igetcool.com/api/dictation/lesson/details?lessonId=${lessonid}&typeList=`,
      header: {
        Host: "course.igetcool.com",
        Connection: "keep-alive",
        xweb_xhr: "1",
        "App-Wechat-UnionId": "oDQBv07hD-oxDgtUZ2e9zqFoPABI",
        "App-User-Pid": "0",
        "Content-Type": "application/json",
        Accept: "*/*",
        Referer:
          "https://servicewechat.com/wx3fc3618ecdedcbac/24/page-frame.html",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
      method: "GET",
      success: function (res) {
        // 请求成功的处理逻辑
        const words = res.data.data.words;
        console.log(res.data.data);
        let word = [];
        if (all != "1") {
          const indexs = index.split("-");
          // 只需要 index 中 的
          for (var i = 0; i < words.length; i++) {
            if (indexs.includes(words[i].id.toString())) {
              words[i].allWordslength = words.length;
              word.push(words[i]);
            }
          }
        } else {
          word = words;
        }
        console.log(word);
        that.setData({
          words: word,
        });
      },
      fail: function (err) {
        // 请求失败的处理逻辑
        console.error(err);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  selectPeople(event) {
    this.setData({
      selected: "selected",
      selected_update: "",
    });
  },
  selectUpdate(event) {
    this.setData({
      selected_update: "selected",
      selected: "",
    });
  },
  close() {
    this.setData({
      showPopup: false,
    });
  },
  // 监听子组件触发的自定义事件，接收签名图片数据
  handleSignatureData: function (e) {
    const signatureImage = e.detail.image;
    this.setData({
      Image: signatureImage,
    });
    console.log(signatureImage);
  },
  setting() {
    this.setData({
      showSetting: true,
    });
  },
  closeSetting() {
    this.setData({
      showSetting: false,
    });
  },
  pre() {
    if (this.data.index == 0) {
      return;
    }
    this.setData({
      index: this.data.index - 1,
    });
  },
  next() {
    const component = this.selectComponent("#signature");
    component.canvasClear();
    const imageBase64 = this.data.Image.replace(/^data:image\/\w+;base64,/, "");
    //判断当前图片是否正确
    // 使用微信小程序的 wx.request() 发送网络请求
    const that = this;
    wx.cloud.callFunction({
      name: "getimgcontext",
      data: {
        imageData: imageBase64,
      },
      success: (res) => {
        console.log("云函数调用成功", res);
        let word = that.data.words;
        let idx = that.data.index;
        word[idx].writeImg = that.data.Image;
        word[idx].isRight =
          res.result.result?.TextDetections[0].DetectedText == word[idx].word;
        console.log("word====>", word);
        if (idx == word.length - 1) {
          that.setData({
            showresult: true,
          });
        } else {
          that.setData({
            index: idx + 1,
          });
        }
      },
      fail: (err) => {
        console.error("云函数调用失败", err);
      },
    });
  },
  addtocollection(event) {
    // 获取本地存储中的收藏集合
    let collection = wx.getStorageSync("collection") || [];
    let data = this.data.words;
    let wordToAdd = data[this.data.index];

    // 检查要添加的 word 是否已经存在于 collection 中
    let exists = collection.some((item) => item.word === wordToAdd.word);

    if (!exists) {
      // 如果不存在，添加到收藏集合中
      collection.push(wordToAdd);
      data[this.data.index]["iscollection"] = true;
      this.setData({
        words: data,
      });
      wx.setStorageSync("collection", collection);
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        duration: 2000,
      });
    } else {
      // 如果存在，提示已经收藏
      wx.showToast({
        title: "已收藏",
        icon: "none",
        duration: 2000,
      });
    }
  },

  play(event) {
    const audio = event.currentTarget.dataset.audio;
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true, // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
    });
    innerAudioContext.src = audio;
    innerAudioContext.play(); // 播放
    //innerAudioContext.destroy()
  },
  help(event) {
    const that = this;
    wx.cloud.callFunction({
      name: "getwordinfo", // 云函数名称
      data: {
        word: that.data.words[that.data.index].word,
      },
      success: (res) => {
        console.log("云函数调用成功", res.result);
        // 在这里处理云函数返回的结果
        const result = res.result[0];
        const fileid = `cloud://cloud1-5gyggp5lb23fabcc.636c-cloud1-5gyggp5lb23fabcc-1326102059/汉字/${
          that.data.words[that.data.index].word
        }.png`;
        console.log("fileid=====>", fileid);
        wx.cloud.downloadFile({
          fileID: fileid,
          success: (res) => {
            // get temp file path
            console.log(res.tempFilePath);
            result.Basic_Definition_ImgUrl = res.tempFilePath;

            this.setData({
              showhelp: true,
              helpInfo: result,
            });
          },
          fail: (err) => {
            // handle error
          },
        });
      },
      fail: (err) => {
        console.error("云函数调用失败", err);
        // 在这里处理调用失败的情况
      },
    });
  },
  closehelp(event) {
    this.setData({
      showhelp: false,
    });
  },
  toResult(event) {
    getApp().globalData.listenwords = this.data.words;
    const that = this;
    const endTime = new Date();
    const accuracy =
      (that.data.words.filter((item) => item.isRight).length /
        that.data.words.length) *
      100;
      const completion =
      (that.data.words.length / that.data.words[0].allWordslength) *
      100;
    //发送请求，存储数据
    var lastUnit = wx.getStorageSync("last-unit");
    // 调用云函数存储数据
    wx.cloud.callFunction({
      name: "addRecords",
      data: {
        listenwords: that.data.words,
        startTime: that.data.startTime,
        endTime: endTime,
        accuracy: accuracy,
        completion: completion,
        unit:lastUnit.unitindex
      },
      success: (res) => {
          // 跳转到另一个页面
          wx.navigateTo({
            url: "/pages/result/result",
          });
      },
      fail: (err) => {
        console.error("云函数调用失败", err);
      },
    });
  }
});
