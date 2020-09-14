// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let resData = null;
  return new Promise((resolve, reject) => {
    const db = cloud.database({
      env: 'ccdan-3mopj'
    });
    db.collection('records').doc(event.id).get().then(res => {
      console.log(res);
      resData = {
        code: 0,
        data: res.data,
        message: "操作成功！"
      }
      resolve(resData);
    }).catch(res => {
      console.log(res);
      resData = {
        code: -1,
        data: null,
        message: "操作失败！"
      }
      reject(resData);
    })
  })
}