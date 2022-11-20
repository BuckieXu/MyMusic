import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userinfo:{},
     recentPlayList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    this.setData({
      userinfo: JSON.parse(wx.getStorageSync('userinfo'))
    })
      const userid=this.data.userinfo.userId;
    this.getUserPlay(userid);
  },
   
  // 获取用户播放记录
  async getUserPlay(userid){
    let result=await request('/user/record',{uid:userid,type:1})
    this.setData({
      recentPlayList:result.weekData.slice(0,10)
    })
  },
  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },
  /**
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