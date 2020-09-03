// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let resData = null;
  return new Promise((resolve, reject) => {
    let data = {
      ...event,
      recordDate: new Date(event.recordDateStr),
      createDate: new Date(),
      amount: parseFloat(event.amount)
    }
    console.log(data);
    const db = cloud.database({
      env: 'ccdan-3mopj'
    });
    db.collection('records').add({
      // data 字段表示需新增的 JSON 数据
      data: data,// 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    }).then(res => {
      resData = {
        code: 0,
        data: null,
        message: "操作成功！"
      }
      resolve(resData);
    }).catch(res => {
      resData = {
        code: -1,
        data: null,
        message: "操作失败！"
      }
      reject(resData);
    })
  })
}