const dict = {
  accountDict: new Map([
    ["支付宝",'zfb'],
    ["微信",'wx'],
    ["现金",'xj'],
    ["储蓄卡",'cxk'],
    ["信用卡",'xyk'],
  ]),
  outTypeDict_f: new Map([
    ["吃",'chi'],
    ["穿",'chuan'],
    ["用",'yong'],
    ["住",'zhu'],
    ["行",'xing'],
  ]),
  outTypeDict_s: new Map([
    [ "餐饮","chi_1"],
    [ "水果","chi_2"],
    [ "零食","chi_3"],
    [ "饮料","chi_4"],
    [ "其他","chi_99"],
    [ "衣服","chuan_1"],
    [ "鞋子","chuan_2"],
    [ "配饰","chuan_3"],
    [ "其他","chuan_99"], 
    [ "护肤","yong_1"],
    [ "美妆","yong_2"],
    [ "清洁","yong_3"],
    [ "其他","yong_99"], 
    [ "居住","zhu_1"],
    [ "家用","zhu_1"],
    [ "其他","zhu_99"],
    [ "地铁公交","xing_1"],
    [ "出租车","xing_2"], 
    [ "火车高铁","xing_3"], 
    [ "飞机","xing_4"],
    [ "其他", "xing_99"]
  ]),
  inTypeDict_f: new Map([
    ["工作",'work'],
    ["人情",'favor'],
    ["兼职",'part-time'],
    ["其他",'other'],
  ]),
  inTypeDict_s: new Map([
    [ "工资","work_1"],
    [ "奖金","work_2"],
    [ "福利","work_3"],
    [ "报销","work_4"],
    [ "其他","work_99"],

    [ "生活费","favor_1"],
    [ "零花钱","favor_2"],
    [ "红包","favor_3"],
    [ "礼金","favor_4"], 
    [ "压岁钱","favor_5"],
    [ "其他","favor_99"],

    [ "兼职","pt_1"],
    [ "打赏","pt_2"], 
    [ "广告费","pt_3"],
    [ "其他","pt_99"],

    [ "理财","other_1"],
    [ "利息","other_2"],
    [ "借款","other_3"], 
    [ "退款","other_4"], 
    [ "其他", "other_99"]
  ]),
}

module.exports = {
  dict: dict
}