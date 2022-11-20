import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 跳转此页面时需要传歌单id
     let id=options.id;
    //  获取歌单详情
    this.getPlayListInfo(id)
    this.getPlayComment(id);
  },
  // 获取歌单详情
  async getPlayListInfo(id){
    let result =await request('/playlist/detail',{id:id})
    
    this.setData({
      playlist:result.playlist
    })
    console.log(this.data.playlist);
  },
  bofang(event){
    let musicId = event.currentTarget.dataset.id;
    console.log(musicId);
    PubSub.publish('GetmusicId', musicId)
    wx: wx.navigateTo({
      url: '/pages/SongDetail/songdetail?musicId=' + musicId,
    })

  },
  //评论
  async getPlayComment(id){
    let result=await request('/comment/playlist',{id:id})
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