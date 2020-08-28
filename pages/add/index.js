// pages/add/index.js
var util = require('../../utils/util.js');  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'tab1',
    date: util.formatTime(new Date()).substring(0,10),
    account: '支付宝',
    accountList: ["支付宝","微信","现金","储蓄卡","信用卡"],
    objectAccountList: [
      {name: "支付宝", id: "zfb"},
      {name: "微信", id: "wx"},
      {name: "现金", id: "xj"},
      {name: "储蓄卡", id: "cxk"},
      {name: "信用卡", id: "xyk"},
    ],
    amount: 17.5,
    typeList: [["餐饮","水果","零食","饮料", "其他"],["衣服", "鞋子", "配饰", "其他"], ["护肤", "美妆", "清洁", "其他"], ["居住", "家用", "其他"],["地铁公交", "出租车", "火车高铁", "飞机", "其他"]],
    recordTypeList: [["吃", "穿", "用", "住", "行"], ["餐饮","水果","零食","饮料", "其他"]],
    recordType:[0,0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleTypeChange: function ({detail}) {
    this.setData({
      currentType: detail.key
    });
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      recordTypeList: this.data.recordTypeList,
      recordType: this.data.recordType
    };
    data.recordType[e.detail.column] = e.detail.value;
    data.recordTypeList[1] = this.data.typeList[this.data.recordType[0]];
    this.setData(data);
  },
  moneyInput({detail}) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(detail.detail.value)) { //正则验证，金额小数点后不能大于两位数字
      money = detail.detail.value;
    } else {
      money = detail.detail.value.substring(0, detail.detail.value.length - 1);
    }
    this.setData({
      amount: money,
    })
  },
})