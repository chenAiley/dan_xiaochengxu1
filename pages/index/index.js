//index.js
//获取应用实例
const app = getApp()
var dateJS = require('../../js/date.js');  
var constant2 = require('../../js/constant2.js');  

Page({
  data: {
    userInfo: {},
    activeTab: app.globalData.activeTab,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    two_daysList: [], //两天的账单记录
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

  onShow: function () {
    this.getRecordList();

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
      activeTab: detail
    });
    app.globalData.activeTab = detail;
  },

  // 获取昨天和今天的账单记录
  getRecordList() {
    let lastDay = new Date().getTime() - 24*60*60*1000;
    let lastDayStr = dateJS.formatTime(new Date(lastDay)).substring(0,10);
    let todayStr = dateJS.formatTime(new Date()).substring(0,10);
    let dayStrMap = new Map([
      [lastDayStr, '昨天'],
      [todayStr, '今天'],
    ])
    let that = this;
    wx.cloud.callFunction({
      name: 'getRecordList',// 云函数名称
      data: {
        startDate: lastDayStr + " 00:00:00",
        endDate: todayStr + " 23:59:59",
        sortField: 'recordDate',
        sortType: 'asc'
      },
      success: function(res) {
        console.log(res.result) 
        let tempArr = res.result.data.map(item => {
          let tempList = item.list.map(recordItem => {
            return {
              ...recordItem,
              amount : recordItem.amount.toFixed(2),
              remark: recordItem.remark.length > 8 ? recordItem.remark.substring(0,8) + '...' : recordItem.remark,
              recordType_fStr : constant2.dict.typeDict_f.get(recordItem.recordType_f),
              recordType_sStr : constant2.dict.typeDict_s.get(recordItem.recordType_s),
            }
          })
          return {
            //recordDateStr: recordDateStr
            list: tempList,
            label: dayStrMap.get(item.recordDateStr),
            totalAmount: item.totalAmount.toFixed(2) 
          }
        })
        console.log(tempArr)
        that.setData({
          two_daysList: tempArr,
        });
      },
      fail: console.error
    })
  },
})
