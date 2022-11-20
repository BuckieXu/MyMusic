// pages/index/index.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommentlist:[],
    ranklist:[]
  },
  // 跳转到每日推荐页面

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取轮播图数据
    let bannerListDate = await request('/banner',{type:2});
    this.setData({
    bannerList:bannerListDate.banners
    })
    // 获取推荐歌单
    let recommentlist=await request('/personalized',{limit:10})
    this.setData({
      recommentlist:recommentlist.result
    })
    // 获取榜单
    let result=await request('/toplist/detail')
    
    this.setData({
      ranklist:result.list.slice(0,10)
    })

  },
  toRecommend(){
    wx.reLaunch({
      url:"/pages/recommendpage/recommend"
    })
  },
  toPlaySquare(){
    wx.reLaunch({
      url:"/pages/SongSingleSquare/songsinglesquare"
    })
  },
  goPlaylist(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/playlist/playlist?id='+id,
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