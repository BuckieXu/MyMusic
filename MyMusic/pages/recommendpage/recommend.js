// pages/recommendpage/recommend.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', // 天
    month: '', // 月,
    recommendlist:[],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    }),
    this.getRecommendMusic()
    // 消息订阅获取音乐详情页传来的类型
    PubSub.subscribe('GetType',(msg,type)=>{
      let {recommendlist,index}=this.data
      if(type ==='pre'){
        (index==0)&&(index = recommendlist.dailySongs.length)
        index -=1
      }else{ 
        (index==recommendlist.dailySongs.length-1)&&(index=-1)
        index +=1
      }
      this.setData({
        index
      })
       let musicId=recommendlist.dailySongs[index].id
       PubSub.publish('GetmusicId',musicId)
    })
  },
  // 获取每日推荐歌曲
  async getRecommendMusic(){
    let result= await request('/recommend/songs')
    this.setData({
      recommendlist:result.data,   
    })
    // console.log(this.data.recommendlist);
  },
  // 去歌曲详情页
  toSongDetail(event){
    // 给歌曲详情页传递参数
    let song= event.currentTarget.dataset.song;
    let index=event.currentTarget.dataset.index
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/pages/SongDetail/songdetail?musicId='+song.id,    
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