// pages/add/index.js
var dateJS = require('../../js/date.js');  
var constant = require('../../js/constant.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'out',
    date: dateJS.formatTime(new Date()).substring(0,10),
    account: '支付宝',
    accountList: ["支付宝","微信","现金","储蓄卡","信用卡"],
    amount: 17.5,
    typeList: [["餐饮","水果","零食","饮料", "其他"],["衣服", "鞋子", "配饰", "其他"], ["护肤", "美妆", "清洁", "其他"], ["居住", "家用", "其他"],["地铁公交", "出租车", "火车高铁", "飞机", "其他"]],
    recordTypeList: [["吃", "穿", "用", "住", "行"], ["餐饮","水果","零食","饮料", "其他"]],
    recordType:[0,0],
    remark: '', //备注
    fileList: [],
    autoHeight: {maxHeight: 30},
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
      currentType: detail.name
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
  amountChange({detail}) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(detail)) { //正则验证，金额小数点后不能大于两位数字
      money = detail;
    } else {
      money = detail.substring(0, detail.length - 1);
    }
    this.setData({
      amount: money,
    })
  },
  // 失焦时补0
  amountBlur({detail}) {
    this.setData({
      amount:parseFloat(detail.value).toFixed(2),
    })
  },

  handleDateChange({detail}) {
    this.setData({
      date: detail.value,
    });
  },

  // 图片上传至云
  uploadPicture(event) {
    const { file } = event.detail;
    if(file){
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: `my-photo${event.timeStamp}.png`,
        // 指定要上传的文件的小程序临时文件路径
        filePath: file.path,
        // 成功回调
        success: res => {
          console.log('上传成功', res);
         // let newFileList = data.fileList.concat([{url: res.fileID}]);
         let newFileList = [
           ...this.data.fileList,
           {url: res.fileID}
          ];
          this.setData({fileList: newFileList });
        },
        fail: console.error
      })
    }
  },
  //删除图片
  picListChange( {detail}) {
    let newFileList = this.data.fileList.filter((item,index) => {
      detail.index != index
    })
    this.setData({fileList: newFileList });
  },

  // 添加记账
  handleOk() {
    let { account,amount,remark,recordType,fileList } = this.data;
    let recordType_f = constant.dict.typeDict_f.get(this.data.recordTypeList[0][recordType[0]]);//第一分类 
    let recordType_s = constant.dict.typeDict_s.get(this.data.recordTypeList[1][recordType[1]]);//第二分类
    let fileUrl = fileList.map( item => {
      return item.url;
    }).join(";");
    let data = {
      status: this.data.currentType,
      recordDateStr: this.data.date,
      account: constant.dict.accountDict.get(account),
      amount: this.data.currentType == 'in' ? amount : ('-' + amount),
      remark,fileUrl,
      recordType_f,
      recordType_s,
    }
    wx.cloud.callFunction({
      name: 'add',// 云函数名称
      data: data,
      success: function(res) {
        //console.log(res.result) 
        wx.navigateBack({})
      },
      fail: console.error
    })
  },
})