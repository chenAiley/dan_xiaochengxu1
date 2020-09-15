// pages/add/index.js
var dateJS = require('../../js/date.js');  
var constant = require('../../js/constant.js'); 
var constant2 = require('../../js/constant2.js');  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'out',
    date: dateJS.formatTime(new Date()).substring(0,10),
    endDate: dateJS.formatTime(new Date()).substring(0,10),
    account: 'zfb',
    accountList: [
      {text: "支付宝", value: 'zfb'},
      {text: "微信", value: 'wx'},
      {text: "现金", value: 'xj'},
      {text: "储蓄卡", value: 'cxk'},
      {text: "信用卡", value: 'xyk'}
    ],
    amount: '0.00',
    //支出记账类型
    outTypeList: [
      ["餐饮","水果","零食","饮料", "其他"],
      ["衣服", "鞋子", "配饰", "其他"], 
      ["护肤", "美妆", "清洁", "其他"], 
      ["居住", "家用", "其他"],
      ["地铁公交", "出租车", "火车高铁", "飞机", "其他"]
    ],
    outTypeObj: [
      {key:"chi", index: 0, list: ["餐饮","水果","零食","饮料", "其他"]},
      {key:"chuan",  index: 1, list: ["衣服", "鞋子", "配饰", "其他"]}, 
      {key:"yong",  index: 2, list: ["护肤", "美妆", "清洁", "其他"]}, 
      {key:"zhu",  index: 3, list: ["居住", "家用", "其他"]},
      {key:"xing",  index: 4, list: ["地铁公交", "出租车", "火车高铁", "飞机", "其他"]}
    ],
    outRecordTypeList: [["吃", "穿", "用", "住", "行"], ["餐饮","水果","零食","饮料", "其他"]],
    //收入记账类型
    inTypeList: [
      ["工资","奖金","福利","报销", "其他"],
      ["生活费", "零花钱", "红包", "礼金", "压岁钱", "其他"], 
      ["兼职", "打赏", "广告费", "其他"],
      ["理财", "利息", "借款", "退款", "其他"]
    ],
    inTypeObj: [
      {key:"work", index: 0, list: ["工资","奖金","福利","报销", "其他"]},
      {key:"favor",  index: 1, list: ["生活费", "零花钱", "红包", "礼金", "压岁钱", "其他"]}, 
      {key:"pt",  index: 2, list: ["兼职", "打赏", "广告费", "其他"]}, 
      {key:"other",  index: 3, list:  ["理财", "利息", "借款", "退款", "其他"]}
    ],
    inRecordTypeList: [["工作",  "人情", "兼职", "其他"], ["工资","奖金","福利","报销", "其他"]],
    //页面显示用： 记账类型
    recordTypeList: [["吃", "穿", "用", "住", "行"], ["餐饮","水果","零食","饮料", "其他"]],
    recordType: [0,0],
    remark: '', //备注
    fileList: [],
    autoHeight: {maxHeight: 30},
    recordId: '', //账单id，编辑用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    if(!id){
      return;
    }
    console.log(id);
    wx.cloud.callFunction({
      name: 'findRecordById',// 云函数名称
      data: { id: id },
      success: function(res) {
        console.log(res.result)
        let resData = res.result.data;
        let recordType_fStr = constant2.dict[resData.status + 'TypeDict_f'].get(resData.recordType_f);
        let recordType_sStr = constant2.dict[resData.status + 'TypeDict_s'].get(resData.recordType_s);
        let typeF_index = that.data[resData.status + 'RecordTypeList'][0].indexOf(recordType_fStr);
        let typeS_index = [0,0];
        let arr = that.data[resData.status + 'TypeObj'];
        for(let item in arr){
          if(resData.recordType_f == arr[item].key){
            typeS_index = [arr[item].index, arr[item].list.indexOf(recordType_sStr)]
            break;
          }
        }
      
        that.setData({
          //改变类型数组
          recordTypeList: [that.data.recordTypeList[0], that.data[resData.status + 'TypeList'][typeS_index[0]]],
          currentType: resData.status,
          date: resData.recordDateStr,
          account: resData.account,
          amount: Math.abs(resData.amount).toFixed(2),
          remark: resData.remark,
          recordType: [typeF_index, typeS_index[1]],
          recordId: resData._id
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '错误提示',
          content: res.result.data.message,
          confirmText: '返回',
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack();
            }   
          }
        })
      }
    })
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
    let that = this;
    let arr = detail.name == 'out' ? 
    this.data.outRecordTypeList : this.data.inRecordTypeList;
    let arr2 = detail.name == 'out' ? 
    this.data.outTypeList : this.data.inTypeList;
    //处理： 切换类型数组下标较切换之前小
    let recordIndex = that.data.recordType;
    recordIndex[0] = (recordIndex[0] > arr[0].length - 1) ? arr[0].length - 1 : recordIndex[0]
    recordIndex[1] = (recordIndex[1] > arr2[recordIndex[0]].length - 1) ? arr2[recordIndex[0]].length - 1 : recordIndex[1]

    that.setData({
      currentType: detail.name,
      recordType: recordIndex,
      recordTypeList: [arr[0], arr2[recordIndex[0]]]
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
    let tempTypeArr = this.data.currentType == 'out' ? this.data.outTypeList : this.data.inTypeList;
    data.recordTypeList[1] = tempTypeArr[this.data.recordType[0]];
    
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
      amount:detail.value ? parseFloat(detail.value).toFixed(2) : '0.00',
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
        fail: function(res){
          wx.showModal({
            title: '错误提示',
            content: res.result.data.message,
            confirmText: '确定',
            success: function(res) {
            }
          })
        }
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
    let { account,amount,remark,recordType,fileList,recordId } = this.data;
    let recordType_f = constant.dict[this.data.currentType + 'TypeDict_f'].get(this.data.recordTypeList[0][recordType[0]]);//第一分类 
    let recordType_s = constant.dict[this.data.currentType + 'TypeDict_s'].get(this.data.recordTypeList[1][recordType[1]]);//第二分类
    let fileUrl = fileList.map( item => {
      return item.url;
    }).join(";");
    let data = {
      status: this.data.currentType,
      recordDateStr: this.data.date,
      account,
      amount: this.data.currentType == 'in' ? amount : ('-' + amount),
      remark,fileUrl,
      recordType_f,
      recordType_s,
      recordId
    }
    wx.cloud.callFunction({
      name: 'add',// 云函数名称
      data: data,
      success: function(res) {
        console.log(res.result) 
        wx.navigateBack({})
      },
      fail: function(res){
        wx.showModal({
          title: '错误提示',
          content: res.result.data.message,
          confirmText: '确定',
          success: function(res) {
          }
        })
      }
    })
  },
})