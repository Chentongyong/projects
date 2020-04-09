const shengfen =require('../../utils/shengfen.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: { name: '', chiku: '', phone: '', dizi: '',bpain:'',mor:'' },
    show:false,
    bpian:['家','公司','学校'],
    bpianIndex:0,
    icon:0,
    default:0,
    del:0,
    blur:0,
    value:'',
    list:[],
    zt:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = { name: '', chiku: '', phone: '', dizi: '', bpain:'', mor:'' }
    let list = []
    let zt
    if (options.data){data = JSON.parse(options.data)}
    if (options.list){list = JSON.parse(options.list)}
    if(options.zt){zt = options.zt}
    console.log(data)
    this.setData({
      shengfen: shengfen.default,
      data,
      list,
      zt
    })
  },
  add:function(){
    this.setData({
      show:true
    })
  },

  onClose() {
    this.setData({ show: false });
  },


  confirm:function(e){
    console.log(e)
    let value = e.detail.values
    let data= this.data.data
    console.log(value)
    let sheng = value[0].name
    let shi = value[1].name
    let qu = value[2].name
    data.chiku = `${sheng} - ${shi} - ${qu}`
    this.setData({ 
      show: false ,
      diqu:`${sheng} - ${shi} - ${qu}`,
      data
    });
  },

  bpian:function(e){
    let index = e.currentTarget.dataset.index
    let bpian = this.data.bpian
    let data = this.data.data
    data.bpian = bpian[index]
    this.setData({
      bpianIndex:index,
      data
    })
    console.log(data)
  },

  del:function(e){
    let that = this 
    let index = e.currentTarget.dataset.index
    let bpian = that.data.bpian
    bpian.splice(index,1)
    that.setData({
      bpian
    })
  },

  icon:function(){//是否设置新的标签
    let value = this.data.value
    let bpian = this.data.bpian
    if(value!=''){
      bpian.push(value)
      this.setData({
        bpian,
        value: ''
      })
    }
    
   },

  newIcon:function(e){
    let value = e.detail.value
    this.setData({
      value,
    })  
  },

  default:function(){//是否设置为默认地址
    this.setData({
      default: !this.data.default
    })
  },

  long_press:function(){
    console.log('eee')
    this.setData({
      del:!this.data.del
    })
  },


  inp:function(e){
    let value = e.detail.value
    let data = this.data.data
    data.dizi = value
    this.setData({
      data
    })  
  },

  blur:function(){
    this.setData({
      blur: !this.data.blur
    })
  },
  show:function(){
    this.setData({
      blur: !this.data.blur
    })
  },
  
  shouh:function(e){
    let value = e.detail.value
    let data = this.data.data
    data.name = value
    this.setData({
      data
    })
  },

  phone: function (e) {
    let value = e.detail.value
    let data = this.data.data
    data.phone = value
    this.setData({
      data
    })
  },

  dizi:function(e){
    let value = e.detail.value
    let data = this.data.data
    data.dizi = value
    this.setData({
      data
    })
  },


  submit:function(){
    let zt = this.data.zt
    let data = this.data.data
    let list = this.data.list
    if(zt == 1){
      list.splice(data.index, 1, data)
    } else if (zt == 0){
      list.push(data)
    }
    
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      list:list
    })
    console.log(pages, prevPage)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})