const dict = {
  accountDict: new Map([
    ["支付宝",'zfb'],
    ["微信",'wx'],
    ["现金",'xj'],
    ["储蓄卡",'cxk'],
    ["信用卡",'xyk'],
  ]),
  typeDict_f: new Map([
    ["吃",'chi'],
    ["穿",'chuan'],
    ["用",'yong'],
    ["住",'zhu'],
    ["行",'xing'],
  ]),
  typeDict_s: new Map([
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
}

module.exports = {
  dict: dict
}