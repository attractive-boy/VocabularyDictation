// pages/list/list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tab: 0,
    activeTab: 'one',
    booklist: [{
      bookTitle: "一年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb1dee80684e98aeef67a.jpg#f1d62735052a7b00ba7e07e0b1525191",
      param: "grade=1&term=0"
    }, {
      bookTitle: "一年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb2332630b9791a594e24.jpg#30cd975510008120a386698280c7dd4b",
      param: "grade=1&term=1"
    }, {
      bookTitle: "二年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb2742630b9791a595903.jpg#15f1f4168bf94da2a79df7b01e144a3c",
      param: "grade=2&term=0"
    }, {
      bookTitle: "二年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb2b2e80684e98aef1a09.jpg#8bff5834c0b5a221f3a7909c2b173514",
      param: "grade=2&term=1"
    }, {
      bookTitle: "三年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb2e32630b9791a596b82.jpg#bb8744b0959d4beb07359e8e796e54ed",
      param: "grade=3&term=0"
    }, {
      bookTitle: "三年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb3192630b9791a597434.jpg#c1e81c6578b39e22e5a32a8f1720e6d5",
      param: "grade=3&term=1"
    }, {
      bookTitle: "四年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb3487571242e97edfb4a.jpg#69771b6cc477672a832ad6a9c0709e5a",
      param: "grade=4&term=0"
    }, {
      bookTitle: "四年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb372553a161121054c92.jpg#10538236f068367727eb46651439e1f1",
      param: "grade=4&term=1"
    }, {
      bookTitle: "五年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb393c1f5099b518e04ca.jpg#9b1a0000dcc9a23685ac25f78e0d079b",
      param: "grade=5&term=0"
    }, {
      bookTitle: "五年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb3b5bd19fca7429c06fd.jpg#f80a765b8a199b83fecf38c4c5e28468",
      param: "grade=5&term=1"
    }, {
      bookTitle: "六年级（上册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb3d1553a161121055a59.jpg#e3b42bb66341ddc9638155c098c59bd3",
      param: "grade=6&term=0"
    }, {
      bookTitle: "六年级（下册）语文课本同步字词",
      backgroudImg: "https://img.js.design/assets/img/65fbb3ec4d2a1e00b47db533.jpg#7b1e00735a83e010930eab19a6c84f1d",
      param: "grade=6&term=1"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    },

    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
    },
    changeTabs(event) {
      console.log(event)
      this.setData({
        activeTab: event.detail.activeKey
      })
    },
    selectBook(event) {
      // 获取点击元素的 id
      const bookId = event.currentTarget.id;
      // 跳转到新页面，并携带参数 bookId
      console.log(event)
      wx.navigateTo({
        url: '/pages/unit/unit?' + bookId
      });
    }
  }
})