// pages/mine_data/mine_data.js
import {
    msg,
    success
} from "../../utils/util";
import {
    getUserInfo,
    editUserInfo,
    uploadImage,
    areaData
} from "../../utils/api";
// var mapApi = require('../../utils/qqmap-wx-jssdk.min.js');
// // 实例化API核心类
// var demo = new mapApi({
//       key: 'ANRBZ-MJIKK-YKKJA-AV567-AQW37-XEFZW'
// });
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {
            nickName: '',
            phone: '',
            sexy: 1,
            avatar: '',
            area: null,
            address: '',
            date: ''
        },
        endTime: '',
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
        let endTime = this.formatTime(new Date(), 'yyyy-MM-dd');
        this.setData({
            endTime: endTime
        });
        let that = this;
        getUserInfo({
            success: function(res) {
              console.log(res.data)
                var detail = that.data.detail;
                detail.nickName = res.data.nickname;
                detail.phone = res.data.phone;
                detail.avatar = res.data.headimg;
                detail.address = res.data.address;
                detail.date = res.data.birth;
                detail.sexy = res.data.sex > 0 ? res.data.sex : 1;
                let cityCode = [];
                cityCode.push(res.data.province_code, res.data.city_code, res.data.area_code);
                that.setData({
                    detail: detail,
                    provice: res.data.province,
                    city: res.data.city,
                    area: res.data.area,
                    cityCode: cityCode
                });
                that.getArea();
            }
        });
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
    }, //省份选择
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
    formatTime: function(curTime, type) {
        if (!curTime) {
            return ''
        }
        var nd = new Date(curTime)
        var y = nd.getFullYear()
        var mm = nd.getMonth() + 1
        var d = nd.getDate()
        var h = nd.getHours()
        var m = nd.getMinutes()
        if (mm < 10) {
            mm = '0' + mm
        }
        if (d < 10) {
            d = '0' + d
        }
        if (h < 10) {
            h = '0' + h
        }
        if (m < 10) {
            m = '0' + m
        }
        if (type == 'MM-DD') {
            return mm + '-' + d
        } else if (type == 'yyyy-MM-dd') {
            return y + '-' + mm + '-' + d
        }
        return y + '-' + mm + '-' + d + ' ' + h + ':' + m
    },
    //上传头像
    chooseAvatar: function(e) {
        let str = 'detail.avatar';
        let that = this;
        uploadImage(1, function(arr) {
            that.setData({
                [str]: arr[0]
            });
        })
    },
    //选择性别
    chooseSexy: function(e) {
        let type = e.currentTarget.dataset.type;
        let str = 'detail.sexy';
        this.setData({
            [str]: type
        })
    },
    //选择出生日期
    bindDateChange: function(e) {
        let str = 'detail.date';
        this.setData({
            [str]: e.detail.value
        })
    },
    //保存
    formSubmit: function(e) {
        let that = this;
        let data = e.detail.value;
        let detail = this.data.detail;
        let cityCode = this.data.cityCode;
        let provice = this.data.provice;
        let city = this.data.city;
        let area = this.data.area;
        if (data.nickName == '') {
            msg("请输入昵称");
            return false
        }
        if (data.phone == '') {
            msg("请输入手机号码");
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
        if (data.address == '') {
            msg("请输入详细地址");
            return false
        }
        if (!data.date) {
            msg("请选择出生日期");
            return false
        }
        this.setData({
            disabled: true
        })
        editUserInfo({
            method: 'put',
            data: {
                headimg: detail.avatar,
                nickname: data.nickName,
                phone: data.phone,
                province: provice,
                city: city == '无下级市' ? 0 : city,
                area: area == '无下级区' ? 0 : area,
                address: data.address,
                birth: data.date,
                sex: detail.sexy,
                province_code: cityCode[0],
                city_code: cityCode[1],
                area_code: cityCode[2]
            },
            success: function() {
                success("修改成功");
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 500);
            },
            fail: function(res) {
                that.setData({
                    disabled: false
                })
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    }
})