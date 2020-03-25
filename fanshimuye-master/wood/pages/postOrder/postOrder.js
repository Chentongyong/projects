// pages/postOrder/postOrder.js
import {
    msg,
    success
} from "../../utils/util";
import {
    orderRefund,
    uploadImage,
    postRefund
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        service_type: 1,
        result: [],
        disabled: false,
        id: '',
        detail: [],
        money: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            id: options.id,
            money: options.money
        });
        this.getData();
    },
    //获取数据
    getData: function() {
        let that = this;
        orderRefund({
            data: {
                order_id: this.data.id
            },
            success: function(res) {
                that.setData({
                    detail: res.data
                });
            },
            fail: function(res) {
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知原因")
            }
        })
    },
    //选择售后服务
    chooseService: function(e) {
        let type = e.currentTarget.dataset.type;
        this.setData({
            service_type: type
        })
    },
    //上传截图
    upload: function(e) {
        let that = this;
        let num = this.data.result.length;
        let result = this.data.result;
      uploadImage({
        num: 3 - num,
        success: function (res) {
          result = result.concat(res);
          console.log(res)
          that.setData({
            result: result
          })
        }
      })
        
    },
    //删除照片
    del: function(e) {
        let result = this.data.result;
        let index = e.currentTarget.dataset.index;
        let that = this;
        result.splice(index, 1);
        that.setData({
            result: result
        })
    },
    //提交
    formSubmit: function(e) {
        let that = this;
        let desc = e.detail.value.desc;
        let result = this.data.result;
        let service_type = this.data.service_type;
        let id = this.data.id;
        let order_good_id = [];
        let detail = this.data.detail;
        let money = this.data.money;
        if (desc == '') {
            msg("请输入问题描述");
            return false
        }
        detail.forEach(e => {
            order_good_id.push(e.order_good_id);
        });
        postRefund({
            method: 'post',
            data: {
                order_good_id: order_good_id,
                type: service_type,
                desc: desc,
                img: result,
                order_id: id,
                money: money
            },
            success: function() {
                success("提交成功");
                that.setData({
                    disabled: true
                });
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 500);
            },
            fail: function(res) {
                that.setData({
                    disabled: false
                });
                if (res.msg) {
                    msg(res.msg)
                    return false
                }
                msg("未知原因");
            }
        });
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