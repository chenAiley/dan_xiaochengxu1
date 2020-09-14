const dict = {
  accountDict: new Map([
    [ 'zfb',"支付宝"],
    [ 'wx',"微信"],
    [ 'xj',"现金"],
    [ 'cxk',"储蓄卡"],
    [ 'xyk',"信用卡"],
  ]),
  outTypeDict_f: new Map([
    [ 'chi',"吃"],
    [ 'chuan',"穿"],
    [ 'yong',"用"],
    [ 'zhu',"住"],
    [ 'xing',"行"],
  ]),
  outTypeDict_s: new Map([
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
  inTypeDict_f: new Map([
    ['work', "工作"],
    ['favor', "人情"],
    ['pt', "兼职"],
    ['other', "其他"],
  ]),
  inTypeDict_s: new Map([
    [ "work_1","工资" ],
    [ "work_2", "奖金" ],
    [ "work_3", "福利" ],
    ["work_4", "报销" ],
    ["work_99", "其他" ],

    [ "favor_1", "生活费" ],
    [ "favor_2", "零花钱" ],
    [ "favor_3", "红包" ],
    [ "favor_4", "礼金" ], 
    [ "favor_5", "压岁钱" ],
    [ "favor_99", "其他" ],

    [ "pt_1", "兼职" ],
    [ "pt_2", "打赏" ], 
    [ "pt_3", "广告费" ],
    [ "pt_99", "其他" ],

    [ "other_1", "理财" ],
    [ "other_2", "利息" ],
    [ "other_3", "借款" ], 
    [ "other_4", "退款" ], 
    [  "other_99", "其他",]
  ]),
}

module.exports = {
  dict: dict
}