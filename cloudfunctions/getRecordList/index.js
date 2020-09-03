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
    const _ = db.command
    let date1 = new Date(event.startDate);
    let date2 = new Date(event.endDate);
    db.collection('records').where({
      recordDate: _.gte(date1).and(_.lte(date2))
    }).orderBy(event.sortField, event.sortType)
    .get().then(res => {
      console.log(res);
      let groupMap = new Map();
      let tempData = {};
      res.data.map( item => {
        tempData = groupMap.get(item.recordDateStr);
        if(!tempData){
          tempData = {
            recordDateStr: item.recordDateStr
          }
        }
        tempData.list = [
          ...(tempData.list ? tempData.list : []),
          item
        ];
        tempData.totalAmount = (tempData.totalAmount ? tempData.totalAmount : 0) + item.amount;
        groupMap.set(item.recordDateStr, tempData)
      })
      let arr = Array.from(groupMap).map(item => item[1]);
      resData = {
        code: 0,
        data: arr,
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