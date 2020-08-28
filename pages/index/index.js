//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    currentTab: app.globalData.currentTab,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 跳转记账页面
  gotoAdd: function() {
    wx.navigateTo({ url: '../../pages/add/index?id=1&other=111' })
  },
  // 跳转历史账单页面
  getHistory: function() {
    wx.navigateTo({ url: '../../pages/history/index?id=2&other=222' })
  },
  // 跳转账单详情页面
  getDetail: function() {
    wx.navigateTo({ url: '../../pages/detail/index?id=3&other=333' })
  },
  onPullDownRefresh: function() {
    // 用户触发了下拉刷新操作
    wx.showToast({ // 显示Toast
      title: '上拉刷新了',
      icon: 'success',
      duration: 1500
    })
  },
  onReachBottom: function() {
    // 当界面的下方距离页面底部距离小于100像素时触发回调
    wx.showToast({ // 显示Toast
      title: '下拉触发',
      icon: 'success',
      duration: 1500
    })
  },
  handleTabChange: function ({ detail }) {
    this.setData({
      currentTab: detail.key
    });
    app.globalData.currentTab = deatil.key;
  }
})
