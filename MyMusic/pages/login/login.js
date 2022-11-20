// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    
  },
  // 表单项内容发生改变的回调
  handleInput:function(event){
    let type=event.currentTarget.dataset.type;
    this.setData({
      [type]:event.detail.value
    })
    // 检验手机号是否输入

  },
  async login(){
    const {phone,password}=this.data;
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return;
    }
      // 定义正则表达式
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if(!phoneReg.test(phone)){
        wx.showToast({
          title: '手机号格式错误,重新输入',
          icon: 'none'
        })
        return;
      }
      // 判断密码
      if(!password){
        wx.showToast({
          title: '密码不能为空',
          icon:'none'
        })
        return;
      }
      let cookie=''
      // 向后端发起请求  进行后端验证
      let result= await request('/login/cellphone',{phone,password,isLogin:true})
      if(result.code==200){
        wx.showToast({
          title: '登录成功',        
        })
        // 本地存储用户信息
        wx.setStorageSync('userinfo', JSON.stringify(result.profile))
        // 跳转到个人主页
        wx.reLaunch({
          url: '/pages/personal/personal'
        })
      }else if(result.code==400){
        wx.showToast({
          title: '手机号错误',
          icon: 'none'
        })
      }else if(result.code==502){
        wx.showToast({
          title: '密码',
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: '登录失败，请稍后再试',
          icon: 'none'
        })
      }
  },  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})