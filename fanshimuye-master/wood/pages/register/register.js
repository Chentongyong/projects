// pages/register/register.js
import {
    msg,
    success
} from "../../utils/util";
import {
    deal,
    register,
    getSms,
    areaData
} from "../../utils/api";
// var mapApi = require('../../utils/qqmap-wx-jssdk.min.js');
// // 实例化API核心类
// var demo = new mapApi({
//     key: 'ANRBZ-MJIKK-YKKJA-AV567-AQW37-XEFZW'
// });
import {
    wxParse
} from "../../wxParse/wxParse.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeTips: '获取验证码',
        phone: '',
        codeDisabled: false,
        disabled: false,
        isCheck: true,
        showTips: false,
        showDeal: false, 
        cityCode: [],
        pid: '',
        provice: '',
        city: '',
        area: '',
        proviceData: [],
        cityData: [],
        areaData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        deal({
            success: function(res) {
                wxParse('content', 'html', res.data, that, 10);
            },
            fail: function() {
                wxParse('content', 'html', '<p>暂无数据</p>', that, 10);
            }
        });
        // 获取地区数据
        this.getArea();
    },
    getArea: function(params) {
        let that = this;
        areaData({
            data: {
                pid: that.data.pid
            },
            success: function(res) {
                if (!params) {
                    that.setData({
                        proviceData: res.data
                    });
                    return false
                }
                //市
                if (params == 2) {
                    let arr = res.data;
                    if (arr.length > 0) {
                        that.setData({
                            cityData: res.data
                        });
                    } else {
                        that.setData({
                            city: '无下级市',
                            area: '无下级区'
                        });
                    }
                    return false
                }
                //区
                if (params == 3) {
                    let arr = res.data;
                    if (arr.length > 0) {
                        that.setData({
                            areaData: res.data
                        });
                    } else {
                        that.setData({
                            area: '无下级区'
                        });
                    }
                    return false
                }
            }
        })
    },
    //省份选择
    bindProvice: function(e) {
        let index = e.detail.value;
        let proviceData = this.data.proviceData;
        let pid = proviceData[index].id;
        let provice = proviceData[index].areaName;
        let cityCode = this.data.cityCode;
        cityCode[0] = proviceData[index].areaCode;
        cityCode[1] = 0;
        cityCode[2] = 0;
        this.setData({
            pid: pid,
            provice: provice,
            cityCode: cityCode,
            city: '',
            cityData: [],
            area: '',
            areaData: []
        });
        this.getArea(2);
    },
    //城市选择
    bindCity: function(e) {
        let index = e.detail.value;
        let cityData = this.data.cityData;
        let pid = cityData[index].id;
        let city = cityData[index].areaName;
        let cityCode = this.data.cityCode;
        cityCode[1] = cityData[index].areaCode;
        cityCode[2] = 0;
        this.setData({
            pid: pid,
            city: city,
            cityCode: cityCode,
            area: '',
            areaData: []
        });
        this.getArea(3);
    },
    //区选择
    bindArea: function(e) {
        let index = e.detail.value;
        let areaData = this.data.areaData;
        let pid = areaData[index].id;
        let area = areaData[index].areaName;
        let cityCode = this.data.cityCode;
        cityCode[2] = areaData[index].areaCode;
        this.setData({
            pid: pid,
            area: area,
            cityCode: cityCode
        });
    },
    //输入手机号码
    bindphone: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    //获取验证码
    getCode: function(e) {
        var phone = this.data.phone;
        var reg = /^1[3456789][0-9]{9}$/;
        var disabled = e.currentTarget.dataset.disabled;
        var that = this;
        if (disabled) {
            return false;
        }
        if (phone == '') {
            msg('请输入手机号码');
            return false
        }
        if (!reg.test(phone)) {
            msg("手机号码格式错误");
            return false
        }
        that.setData({
            codeDisabled: true
        });
        getSms({
            method: 'post',
            data: {
                phone: phone,
                type: 2
            },
            success: function() {
                msg("发送成功,请耐心等待短信");
                that.countDown();
            },
            fail: function(res) {
                that.setData({
                    codeDisabled: false
                });
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        });
    },
    countDown: function() {
        var time = 60;
        var code = this.data.codeTips;
        let that = this;
        var interver = setInterval(function() {
            time--;
            code = time + 's后重新获取';
            if (time < 0) {
                clearInterval(interver);
                code = '获取验证码';
                that.setData({
                    codeDisabled: false
                })
            }
            that.setData({
                codeTips: code
            })
        }, 1000)
    },
    //是否同意协议
    chooseDeal: function(e) {
        let isCheck = this.data.isCheck;
        this.setData({
            isCheck: !isCheck
        })
    },
    //打开用户协议
    openDeal: function() {
        this.setData({
            showDeal: true
        })
    },
    //不同意用户协议
    cancel: function() {
        this.setData({
            isCheck: false,
            showDeal: false
        })
    },
    confirm: function() {
        this.setData({
            isCheck: true,
            showDeal: false
        })
    },
    formSubmit: function(e) {
        var data = e.detail.value;
        var reg = /^1[3456789][0-9]{9}$/;
        var that = this;
        let isCheck = this.data.isCheck;
        let provice = this.data.provice;
        let city = this.data.city;
        let area = this.data.area;
        let cityCode = this.data.cityCode;
        if (data.phone == '') {
            msg("请输入手机号码");
            return false
        }
        if (!reg.test(data.phone)) {
            msg("手机号码格式错误");
            return false
        }
        if (data.code == '') {
            msg("请输入验证码");
            return false
        }
        if (data.name == '') {
            msg("请输入姓名");
            return false
        }
        if (provice == '') {
            msg("请选择所在省份");
            return false
        }
        if (city == '') {
            msg("请选择所在城市");
            return false
        }
        if (area == '') {
            msg("请选择所在区");
            return false
        }
        if (data.market == '') {
            msg("请输入所在市场名称");
            return false
        }
        if (!isCheck) {
            msg("请阅读并同意用户注册协议");
            return false
        }
        that.setData({
            disabled: true
        });
        register({
            method: 'post',
            data: {
                phone: data.phone,
                name: data.name,
                province: provice,
                city: city == '无下级市' ? 0 : city,
                area: area == '无下级区' ? 0 : area,
                market_name: data.market,
                province_code: cityCode[0],
                city_code: cityCode[1],
                area_code: cityCode[2],
                code: data.code
            },
            success: function() {
                that.setData({
                    showTips: true
                })
            },
            fail: function(res) {
                that.setData({
                    disabled: false
                });
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误")
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    }
})