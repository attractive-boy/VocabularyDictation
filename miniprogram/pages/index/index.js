Page({
  data: {
    value: 'index',
    list: [{
        value: 'index',
        label: '主页',
        icon: '/images/tabBar/index.png',
        selectedIcon: '/images/tabBar/index_select.png'
      },
      {
        value: 'me',
        label: '我的',
        icon: '/images/tabBar/me.png',
        selectedIcon: '/images/tabBar/me_select.png'
      },
    ],
    selected:"",
    showPopup:true
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
    });
  },
  onLoad() {
    
  },
  showpopup() {

  },
  selectPeople(event) {
    this.setData({
      selected:"selected"
    })
  },
  close(){
    this.setData({
      showPopup:false
    })
  }
});