Page({
  data: {
    value: 'index',
    list: [{
        value: 'index',
        label: '主页',
        icon: 'https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/index.png?sign=c51412b5f9a54e358895bb0e55a1a7f8&t=1715585832',
        selectedIcon: 'https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/index_select.png?sign=11623c7855cd06b136f81e28048206ee&t=1715585896'
      },
      {
        value: 'me',
        label: '我的',
        icon: 'https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/me.png?sign=8f4162f18edbece5774c89afbee1e8e6&t=1715585910',
        selectedIcon: 'https://636c-cloud1-5gyggp5lb23fabcc-1326102059.tcb.qcloud.la/me_select.png?sign=8f681c6e1d9daba674f25c1ea5f52596&t=1715585922'
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