// pages/unit/unit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unitlist: [],
    booklist:[{
        grade: "1",
        term: "0",
        title: [
          ["天地人", "金木水火土", "口耳目", "日月水火", "对韵歌", "语文园地一"],
          ["画", "大小多少", "小书包", "日月明", "升国旗", "语文园地五"],
          ["b p m f", "d t n l", "g k h", "j q x", "z c s", "zh ch sh r", "ai ei ui", "ao ou iu", "ie üe er", "an en in un ün", "ang eng ing ong", "语文园地二"],
          ["秋天", "小小的船", "江南", "四季", "语文园地四"],
          ["影子", "比尾巴", "青蛙写诗", "雨点儿", "明天要远足", "大还是小", "项链", "雪地里的小画家", "乌鸦喝水", "小蜗牛", "语文园地七", "语文园地八"]
        ]
      },
      {
        grade: "1",
        term: "1",
        title: [
          ["春夏秋冬", "姓氏歌", "小青蛙", "猜字谜", "语文园地一"],
          ["吃水不忘挖井人", "我多想去看看", "四个太阳", "语文园地二"],
          ["小公鸡和小鸭子", "树和喜鹊", "怎么都快乐", "静夜思", "夜色", "端午粽", "彩虹", "语文园地四"],
          ["动物儿歌", "古对今", "操场上", "人之初", "语文园地五"],
          ["古诗二首", "荷叶圆圆", "要下雨了", "语文天地六"],
          ["文具的家", "一分钟", "动物王国开大会", "小猴子下山", "语文园地七"],
          ["棉花姑娘", "咕咚", "小壁虎借尾巴", "语文园地八"]
        ]
      },
      {
        grade: "2",
        term: "0",
        title: [
          ["小蝌蚪找妈妈", "我是什么", "植物妈妈有办法", "语文园地一"],
          ["场景歌", "树之歌", "拍手歌", "田家四季歌", "语文园地二"],
          ["曹冲称象", "玲玲的画", "一封信", "妈妈睡了", "语文园地三"],
          ["古诗二首", "黄山奇石", "日月潭", "葡萄沟", "语文园地四"],
          ["坐井观天", "寒号鸟", "我要的是葫芦", "语文园地五"],
          ["八角楼上", "朱德的扁担", "难忘的泼水节", "刘胡兰", "语文园地六"],
          ["古诗二首", "雾在哪里", "雪孩子", "语文园地七"],
          ["狐假虎威", "风娃娃", "纸船和风筝", "语文园地八"]
        ]
      },
      {
        grade: "2",
        term: "1",
        title: [
          ["古诗两首", "找春天", "开满鲜花的小路", "邓小平爷爷植树", "语文园地一"],
          ["雷锋叔叔，你在哪里", "千人糕", "一匹出色的马", "语文园地二"],
          ["神州谣", "传统节日", "“贝”的故事", "中国美食", "语文园地三"],
          ["彩色的梦", "枫树上的喜鹊", "沙滩上的童话", "我是一只小虫子", "语文园地四"],
          ["寓言二则", "画杨桃", "小马过河", "语文园地五"],
          ["古诗二首", "雷雨", "要是你在野外迷了路", "太空生活趣事多", "语文园地六"],
          ["大象的耳朵", "蜘蛛开店", "青蛙卖泥塘", "小毛虫", "语文园地七"],
          ["祖先的摇篮", "羿射九日", "黄帝的传说", "语文园地八"]
        ]
      }, {
        grade: "3",
        term: "0",
        title: [
          ["大青树下的小学", "花的学校", "不懂就要问"],
          ["古诗三首", "铺满金色巴掌的水泥道", "秋天的雨", "听听，秋的声音"],
          ["卖火柴的小女孩", "那一定会很好", "在牛肚子里旅行", "一块奶酪", "语文园地三"],
          ["总也倒不了的老屋", "胡萝卜先生的长胡子", "小狗学叫", "语文园地四"],
          ["搭船的鸟", "金色的草地"],
          ["古诗三首", "富饶的西沙群岛", "海滨小城", "美丽的小兴安岭", "语文园地六"],
          ["大自然的声音", "读不完的大书", "父亲、树林和鸟"],
          ["司马光", "灰雀", "手术台就是阵地", "一个粗瓷大碗", "语文园地八"]
        ]
      }, {
        grade: "3",
        term: "1",
        title: [
          ["古诗三首", "燕子", "荷花", "昆虫备忘录", "语文园地一"],
          ["守株待兔", "陶罐和铁罐", "鹿角和鹿腿", "池子和河流"],
          ["古诗三首", "纸的发明", "赵州桥", "一副名扬中外的画", "语文园地三"],
          ["花种", "蜜蜂", "小虾"],
          ["宇宙的另一边", "我变成了一棵树"],
          ["童年的水墨画", "剃头大师", "肥皂泡", "我不能失信", "语文园地六"],
          ["我们的奇妙世界", "海底世界", "方帽子店", "火烧云"],
          ["慢性子裁缝和急性子顾客", "漏", "枣核", "语文园地八"]
        ]
      }
    ],
    grade:1,
    term:0,
    activeValues: [99],
    arrowlist:[],
    selectall:[],
    selectindex:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    let key = 0;
    // 获取传递过来的参数
    const grade = options.grade || '1'; // 默认值为 '1'
    const term = options.term || '0'; // 默认值为 '0'
  
    // 构造请求的 URL
    const url = `https://course.igetcool.com/api/dictation/lesson/list?grade=${grade}&term=${term}`;
    const that = this
    // 发送请求
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Host': 'course.igetcool.com',
        'xweb_xhr': '1',
        'App-Wechat-UnionId': 'oDQBv07hD-oxDgtUZ2e9zqFoPABI',
        'App-User-Pid': '0',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Referer': 'https://servicewechat.com/wx3fc3618ecdedcbac/24/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9'
      },
      success(res) {
        // 请求成功时的回调函数
        console.log('请求成功', res.data);
        const data = res.data.data.lessons
        const list = that.data.booklist.find(book => {
          return book.grade == grade && book.term == term
        }).title.map(item => {
            // console.log(item)
            let lessonInfo = item.map(lesson => {
              let res = data.find(i => {
                return lesson.trim() == i.lessonName.trim()
              })
              if(res == undefined){
                return
              }
              res.key = key;
              key ++;
              return res;
            })
            return lessonInfo
        });
        that.setData({
          unitlist: list,
          grade: that.numberToChinese(grade),
          term:term == 0 ? "上" : "下",
          arrowlist: new Array(key).fill(0),
          selectall: new Array(key).fill(0),
          selectindex : new Array(key).fill(new Array())
        })
      },
      fail(err) {
        // 请求失败时的回调函数
        console.error('请求失败', err);
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
  handleChange(e) {
    this.setData({
      activeValues: e.detail.value,
    });
  },
  // 定义 toggleArrow 函数
  toggleArrow: function(event) {
    // 获取点击事件的目标元素
    var target = event.currentTarget;
    // 获取目标元素的数据绑定值 data-arrow
    var index = target.dataset.index;
    var list = this.data.arrowlist;
    // 切换箭头状态
    if (list[index] == 0) {
      // 如果当前箭头是向上的，则切换为向下
      list[index] = 1;
    } else {
      // 如果当前箭头是向下的，则切换为向上
      list[index] = 0;
    }
    this.setData({
      arrowlist : list
    })
  },
  selectallfun(event){
     // 获取点击事件的目标元素
     var target = event.currentTarget;
     // 获取目标元素的数据绑定值 data-arrow
     var index = target.dataset.index;
     var list = this.data.selectall;
     // 切换箭头状态
     if (list[index] == 0) {
       // 如果当前箭头是向上的，则切换为向下
       list[index] = 1;
     } else {
       // 如果当前箭头是向下的，则切换为向上
       list[index] = 0;
     }
     this.setData({
      selectall : list
     })
  },
  selectfont(event){
    // 获取点击事件的目标元素
    var target = event.currentTarget;
    // 获取目标元素的数据绑定值 data-arrow
    var index = target.dataset.index;
    var fontIdx = target.dataset.fontidx;
    var length = target.dataset.length;
    var list = this.data.selectindex;
    if(list[index].length == 0){
      list[index] = new Array(length).fill(0);
    }

    if(list[index][fontIdx] == 0){
      list[index][fontIdx] = 1
    }else{
      list[index][fontIdx] = 0
    }

    this.setData({
      selectindex : list
     })
  }
})