// pages/listenbook/listenbook.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordsByDay: {},
    daysWithData: [],
    selectDay: null,
    infoName:'',
    rightwords:[],
    wrongwords:[],
    lessonName:"",
    unit:"",
    onlyRead: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.queryMonthlyRecords();
    
  },
  queryMonthlyRecords() {
    wx.cloud.callFunction({
      name: "queryMonthlyRecords",
      success: (res) => {
        if (res.result.success) {
          this.setData({
            recordsByDay: res.result.recordsByDay,
            daysWithData: res.result.daysWithData,
            // onlyRead: 
          });
          const now = new Date();
          const day = now.getDate();
          this.selectDayFun({detail: { day }}); // 传递参数调用方法
        } else {
          console.error("查询失败", res.result.error);
          wx.showToast({
            title: "查询失败",
            icon: "none",
          });
        }
      },
      fail: (err) => {
        console.error("调用云函数失败", err);
        wx.showToast({
          title: "调用云函数失败",
          icon: "none",
        });
      },
    });
  },
  selectDayFun(event) {
    const { day, month, year } = event.detail;
    let recordsByDay =  this.data.recordsByDay[`${day}`] && JSON.parse(JSON.stringify(this.data.recordsByDay[`${day}`]));
    console.log(recordsByDay)
    if(!recordsByDay){
      this.setData({
        selectDay: null,
      });
        return;
    }
    recordsByDay = recordsByDay[0]
    console.log(recordsByDay);
    // 假设 recordsByDay.startTime 是一个时间戳，例如：1621113675000（毫秒）
    let timestamp = recordsByDay.startTime;

    // 使用 Date 对象创建一个表示给定时间戳的日期对象
    let date = new Date(timestamp);

    // 提取小时和分钟
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 如果小时或分钟是个位数，可以在前面补零
    let formattedHours = hours < 10 ? "0" + hours : hours;
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // 格式化后的时间字符串
    let formattedTime = formattedHours + ":" + formattedMinutes;
    recordsByDay.startTime = formattedTime;

    // 使用 Date 对象解析日期字符串
    date = new Date(recordsByDay.endTime);

    // 提取小时和分钟
    hours = date.getUTCHours();
    minutes = date.getUTCMinutes();

    // 如果小时或分钟是个位数，可以在前面补零
    formattedHours = hours < 10 ? "0" + hours : hours;
    formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // 格式化后的时间字符串
    formattedTime = formattedHours + ":" + formattedMinutes;
    recordsByDay.endTime = formattedTime;

    //completion accuracy 最多两位小数 可以没有
    recordsByDay.completion = recordsByDay.completion.toFixed(0);
    recordsByDay.accuracy = recordsByDay.accuracy.toFixed(0);
    
    // 获取所有正确的和错误的单词
    console.log(recordsByDay)
    const right = recordsByDay.listenwords?.filter(word => {
      return word.isRight;
    })
    const wrong = recordsByDay.listenwords?.filter(word => {
      return !word.isRight;
    })
    const that = this
    this.setData({
      rightwords:right,
      wrongwords:wrong,
      lessonName:recordsByDay.listenwords[0].lessonName,
      unit:that.numberToChinese(recordsByDay.unit + 1),
      onlyRead: recordsByDay.cloudpng
    })
    this.setData({
      selectDay: recordsByDay,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  numberToChinese(num) {
    const digits = '零一二三四五六七八九';
    const units = ['', '十', '百', '千', '万'];
    console.log(num)
    const digitArr = num.toString().split('').reverse();
    let result = '';
    
    for (let i = 0; i < digitArr.length; i++) {
      const digit = digitArr[i];
      result = digits[digit] + units[i] + result;
    }
  
    // 处理零的情况
    result = result.replace(/零[十百千]/g, '零').replace(/零+/g, '零');
    result = result.replace(/^零/, '');
  
    return result;
  },
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
  onShareAppMessage() {}
});
