const dict = {
  accountDict: new Map([
    [ 'zfb',"支付宝"],
    [ 'wx',"微信"],
    [ 'xj',"现金"],
    [ 'cxk',"储蓄卡"],
    [ 'xyk',"信用卡"],
  ]),
  typeDict_f: new Map([
    [ 'chi',"吃"],
    [ 'chuan',"穿"],
    [ 'yong',"用"],
    [ 'zhu',"住"],
    [ 'xing',"行"],
  ]),
  typeDict_s: new Map([
    [ "chi_1","餐饮"],
    [ "chi_2","水果"],
    [ "chi_3", "零食"],
    [ "chi_4", "饮料"],
    [ "chi_99", "其他"],
    [ "chuan_1", "衣服"],
    [ "chuan_2", "鞋子"],
    [ "chuan_3", "配饰"],
    [ "chuan_99", "其他"], 
    [ "yong_1", "护肤"],
    [ "yong_2", "美妆"],
    [ "yong_3", "清洁"],
    [ "yong_99", "其他"], 
    [ "zhu_1", "居住"],
    [ "zhu_1", "家用"],
    [ "zhu_99", "其他"],
    [ "xing_1", "地铁公交"],
    [ "xing_2", "出租车"], 
    [ "xing_3", "火车高铁"], 
    [ "xing_4", "飞机"],
    [  "xing_99", "其他"]
  ]),
}

module.exports = {
  dict: dict
}